import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { getLevel } from '../data/levels'
import { pickQuestions } from '../data/questions'
import { useSoundContext } from '../context/SoundContext'
import { useSettingsContext } from '../context/SettingsContext'
import { saveBestResultIfBetter } from '../utils/storage'
import { loadMissedIds, recordMastered, recordMiss } from '../utils/reviewQueue'
import { evaluateAchievements, type Achievement } from '../utils/achievements'
import { isSpeechSupported, speakEnglish, speakJapanese } from '../audio/speech'
import { WordTile, AnswerSlot } from './WordTile'
import Confetti from './Confetti'
import type { LevelId, LevelResult, Question } from '../types'
import styles from './GameScreen.module.css'

const QUESTIONS_PER_SESSION = 10
const START_LIVES = 3
const FEEDBACK_DELAY_CORRECT = 1100
const FEEDBACK_DELAY_WRONG = 1500
/** Extra pause after the English sentence finishes being read aloud, before
 * advancing — long enough to not feel like it cuts off the instant speech
 * ends, short enough to not feel like a stall. */
const POST_SPEECH_DELAY = 600
/** Safety cap on how long we'll wait for a "speech finished" event before
 * advancing anyway. speechSynthesis exists in more browsers than it reliably
 * fires onend/onerror in (e.g. no TTS voices installed), and this game's
 * sentences are short enough that legitimate playback shouldn't get near it. */
const MAX_SPEECH_WAIT = 8000
/** Max bonus for answering with time to spare, well below the 100-pt base
 * for a correct answer so speed nudges the score without dominating it. */
const TIME_BONUS_CAP = 30

interface Tile {
  uid: number
  word: string
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildTiles(question: Question): Tile[] {
  return shuffle(question.words.map((word, uid) => ({ uid, word })))
}

/** The very first word is always sentence-capitalized; "I" stays capitalized
 * regardless (it's a mandatory pronoun capital, not a sentence-start hint). */
function displayFor(tile: Tile, capitalizeFirst: boolean): string {
  if (capitalizeFirst || tile.uid !== 0 || tile.word === 'I') return tile.word
  return tile.word.charAt(0).toLowerCase() + tile.word.slice(1)
}

export default function GameScreen({
  levelId,
  onFinish,
  onExit,
}: {
  levelId: LevelId
  onFinish: (result: LevelResult, isNewBest: boolean, newAchievements: Achievement[]) => void
  onExit: () => void
}) {
  const level = getLevel(levelId)!
  const sound = useSoundContext()
  const { capitalizeFirst, practiceMode } = useSettingsContext()

  const questions = useMemo(
    () => pickQuestions(levelId, QUESTIONS_PER_SESSION, loadMissedIds(levelId)),
    [levelId],
  )
  const [qIndex, setQIndex] = useState(0)
  const question = questions[qIndex]

  const [tray, setTray] = useState<Tile[]>(() => buildTiles(questions[0]))
  const [slots, setSlots] = useState<(Tile | null)[]>(() =>
    new Array(questions[0].words.length).fill(null),
  )
  // The empty slot the next tray tap should fill. Without this, tapping a
  // filled slot to fix a single wrong word (while other slots also happen
  // to be empty) could drop the replacement into the *wrong* empty slot,
  // since the default fill target is always the first empty one.
  const [activeSlot, setActiveSlot] = useState<number | null>(null)

  const [lives, setLives] = useState(START_LIVES)
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [bestCombo, setBestCombo] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)

  const [status, setStatus] = useState<'playing' | 'correct' | 'wrong'>('playing')
  const [timeLeft, setTimeLeft] = useState(level.timeLimitSec)
  const [scorePop, setScorePop] = useState<{ id: number; value: number } | null>(null)
  const [shake, setShake] = useState(false)

  const lastTickSecond = useRef(-1)
  const advanceTimer = useRef<number | null>(null)
  const pendingAdvance = useRef<(() => void) | null>(null)
  const popIdRef = useRef(0)
  const unmountedRef = useRef(false)

  // Freeze the countdown while the tab/app is backgrounded so returning
  // players don't find their time silently drained (or the round already
  // timed out) by however long they were away.
  const [isHidden, setIsHidden] = useState(() => document.hidden)
  useEffect(() => {
    const onVisibilityChange = () => setIsHidden(document.hidden)
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [])

  useEffect(() => {
    if (qIndex === 0) return
    const q = questions[qIndex]
    setTray(buildTiles(q))
    setSlots(new Array(q.words.length).fill(null))
    setActiveSlot(null)
    setStatus('playing')
    setTimeLeft(level.timeLimitSec)
    lastTickSecond.current = -1
  }, [qIndex, questions, level.timeLimitSec])

  useEffect(() => {
    if (sound.sfxOn) speakJapanese(questions[qIndex].jp)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qIndex])

  useEffect(() => {
    if (status !== 'playing' || isHidden || practiceMode) return
    const id = window.setInterval(() => {
      setTimeLeft((t) => {
        const next = Math.max(0, t - 0.1)
        const floorNext = Math.floor(next)
        if (floorNext <= 4 && floorNext !== lastTickSecond.current && next > 0) {
          lastTickSecond.current = floorNext
          sound.tick(true)
        }
        return next
      })
    }, 100)
    return () => window.clearInterval(id)
  }, [status, qIndex, sound, isHidden, practiceMode])

  useEffect(() => {
    // StrictMode's dev-only mount→unmount→mount cycle runs this cleanup
    // once before the "real" mount, so reset the flag on (re)mount too —
    // otherwise that synthetic unmount would permanently poison it to
    // true and the speech-completion handler below would never fire.
    unmountedRef.current = false
    return () => {
      unmountedRef.current = true
      if (advanceTimer.current) window.clearTimeout(advanceTimer.current)
      if (pendingAdvance.current) document.removeEventListener('visibilitychange', pendingAdvance.current)
      if (isSpeechSupported()) window.speechSynthesis.cancel()
    }
  }, [])

  const finishSession = useCallback(
    (finalScore: number, finalCorrect: number, finalBestCombo: number) => {
      const total = QUESTIONS_PER_SESSION
      const accuracy = finalCorrect / total
      const stars: 0 | 1 | 2 | 3 = accuracy >= 0.9 ? 3 : accuracy >= 0.7 ? 2 : accuracy >= 0.4 ? 1 : 0
      const result: LevelResult = {
        levelId,
        score: finalScore,
        correctCount: finalCorrect,
        totalCount: total,
        bestCombo: finalBestCombo,
        stars,
        clearedAt: Date.now(),
      }
      // Practice sessions have no timer/lives pressure, so they aren't a fair
      // comparison against timed runs and shouldn't overwrite a real best.
      const isNewBest = practiceMode ? false : saveBestResultIfBetter(result)
      const newAchievements = evaluateAchievements(result)
      if (stars >= 2) sound.win()
      else sound.lose()
      onFinish(result, isNewBest, newAchievements)
    },
    [levelId, onFinish, sound, practiceMode],
  )

  const resolve = useCallback(
    (isCorrect: boolean) => {
      setStatus(isCorrect ? 'correct' : 'wrong')

      let nextScore = score
      let nextCombo = combo
      let nextBestCombo = bestCombo
      let nextCorrect = correctCount
      let nextLives = lives

      if (isCorrect) {
        const tier = combo >= 5 ? 2 : combo >= 3 ? 1 : 0
        const multiplier = tier === 2 ? 2 : tier === 1 ? 1.5 : 1
        // Scaled by the *fraction* of time left rather than raw seconds, so
        // the bonus is comparable across levels even though higher levels
        // get a shorter timeLimitSec.
        const timeBonus = practiceMode ? 0 : Math.round(TIME_BONUS_CAP * (timeLeft / level.timeLimitSec))
        const gained = Math.round(100 * multiplier) + timeBonus

        nextScore = score + gained
        nextCombo = combo + 1
        nextBestCombo = Math.max(bestCombo, nextCombo)
        nextCorrect = correctCount + 1

        setScore(nextScore)
        setCombo(nextCombo)
        setBestCombo(nextBestCombo)
        setCorrectCount(nextCorrect)
        setScorePop({ id: popIdRef.current++, value: gained })
        sound.correct()
        recordMastered(levelId, question.id)
        if (nextCombo === 3 || (nextCombo >= 5 && nextCombo % 5 === 0)) {
          window.setTimeout(() => sound.combo(nextCombo >= 5 ? 2 : 1), 260)
        }
      } else {
        nextCombo = 0
        nextLives = practiceMode ? lives : lives - 1
        setCombo(0)
        setLives(nextLives)
        setShake(true)
        sound.wrong()
        recordMiss(levelId, question.id)
        window.setTimeout(() => setShake(false), 450)
      }

      const isLastQuestion = qIndex + 1 >= questions.length
      const outOfLives = !practiceMode && nextLives <= 0

      // If the player backgrounds the app right after answering, don't let a
      // native setTimeout silently skip them ahead while they're away —
      // defer the advance until the tab is visible again.
      const advance = () => {
        if (document.hidden) {
          pendingAdvance.current = advance
          document.addEventListener('visibilitychange', advance, { once: true })
          return
        }
        pendingAdvance.current = null
        if (isLastQuestion || outOfLives) {
          finishSession(nextScore, nextCorrect, nextBestCombo)
        } else {
          setQIndex((i) => i + 1)
        }
      }
      const scheduleAdvance = (delayMs: number) => {
        advanceTimer.current = window.setTimeout(advance, delayMs)
      }

      if (isCorrect && sound.sfxOn && isSpeechSupported()) {
        // Wait for the English sentence to actually finish being read aloud
        // instead of racing it against a fixed delay — a long sentence was
        // getting cut off by the next question before the player heard it.
        // Raced against a cap in case this browser never fires the
        // completion event (no TTS voices installed, etc.).
        const timeout = new Promise<void>((res) => window.setTimeout(res, MAX_SPEECH_WAIT))
        Promise.race([speakEnglish(question.words.join(' ')), timeout])
          .catch(() => undefined)
          .then(() => {
            if (!unmountedRef.current) scheduleAdvance(POST_SPEECH_DELAY)
          })
      } else {
        scheduleAdvance(isCorrect ? FEEDBACK_DELAY_CORRECT : FEEDBACK_DELAY_WRONG)
      }
    },
    [
      score,
      combo,
      bestCombo,
      correctCount,
      lives,
      timeLeft,
      qIndex,
      question,
      questions.length,
      sound,
      finishSession,
      practiceMode,
      levelId,
      level.timeLimitSec,
    ],
  )

  useEffect(() => {
    if (status === 'playing' && timeLeft <= 0) {
      resolve(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, status])

  const handleListen = () => {
    sound.click()
    speakEnglish(question.words.join(' '))
  }

  const handleTrayTap = (tile: Tile) => {
    if (status !== 'playing') return
    const targetIndex = activeSlot !== null && slots[activeSlot] === null ? activeSlot : slots.findIndex((s) => s === null)
    if (targetIndex === -1) return

    const nextSlots = [...slots]
    nextSlots[targetIndex] = tile
    setSlots(nextSlots)
    setActiveSlot(null)
    sound.place()

    if (nextSlots.every((s) => s !== null)) {
      const built = nextSlots.map((s) => (s as Tile).word).join(' ')
      const isCorrect = built === question.words.join(' ')
      window.setTimeout(() => resolve(isCorrect), 220)
    }
  }

  const handleFilledSlotTap = (index: number) => {
    if (status !== 'playing') return
    const tile = slots[index]
    if (!tile) return
    const nextSlots = [...slots]
    nextSlots[index] = null
    setSlots(nextSlots)
    setActiveSlot(index)
    sound.remove()
  }

  const handleEmptySlotTap = (index: number) => {
    if (status !== 'playing') return
    setActiveSlot(index)
  }

  const anyPlaced = slots.some((s) => s !== null)

  const handleClearAll = () => {
    if (status !== 'playing' || !anyPlaced) return
    setSlots(new Array(slots.length).fill(null))
    setActiveSlot(null)
    sound.remove()
  }

  const timerPct = (timeLeft / level.timeLimitSec) * 100
  const timerClass = timeLeft <= 4 ? 'urgent' : timeLeft <= level.timeLimitSec * 0.4 ? 'warn' : ''

  return (
    <div
      className={styles.screen}
      style={{ ['--bg1' as string]: level.gradient[1], ['--bg2' as string]: level.gradient[0] }}
    >
      <div className={`${styles.shakeTarget} ${shake ? 'shake' : ''}`}>
        <div className={styles.hud}>
          <button className={styles.backButton} onClick={onExit} aria-label="レベル選択に戻る">
            ←
          </button>
          <span className={styles.levelTag}>
            {level.icon} {level.title}
            {practiceMode && ` 🧪`}
          </span>
          <span className={styles.progress}>
            {qIndex + 1} / {questions.length}
          </span>
          <div className={styles.spacer} />
          {!practiceMode && (
            <div className={styles.hearts}>
              {Array.from({ length: START_LIVES }).map((_, i) => (
                <span key={i} className={i >= lives ? styles.heartLost : ''}>
                  ❤️
                </span>
              ))}
            </div>
          )}
          <div className={`${styles.comboBadge} ${combo >= 5 ? styles.hot : ''}`} style={{ opacity: combo > 0 ? 1 : 0.35 }}>
            <span className={styles.flame}>🔥</span> COMBO {combo}
          </div>
          <div className={styles.scoreWrap}>
            {score}
            {scorePop && (
              <span key={scorePop.id} className={styles.scorePop}>
                +{scorePop.value}
              </span>
            )}
          </div>
        </div>

        {!practiceMode && (
          <div className={styles.timerRow}>
            <div className={styles.timerTrack}>
              <div
                className={`${styles.timerFill} ${timerClass ? styles[timerClass] : ''}`}
                style={{ width: `${timerPct}%` }}
              />
            </div>
            {/* Numeric readout + icon so urgency doesn't rely on the bar's
                color shift alone (color-vision accessibility). */}
            <span className={`${styles.timerLabel} ${timerClass ? styles[timerClass] : ''}`}>
              {timerClass === 'urgent' && <span aria-hidden="true">⏰ </span>}
              {Math.ceil(timeLeft)}
            </span>
          </div>
        )}

        <div className={styles.promptArea}>
          <div className={styles.jpRow}>
            <p className={styles.jpText}>{question.jp}</p>
            <button className={styles.speakButton} onClick={handleListen} aria-label="英文を読み上げる">
              🔊
            </button>
          </div>
          {status === 'wrong' && (
            <>
              <p className={`${styles.note} ${styles.noteWrong}`}>正解: {question.words.join(' ')}</p>
              {question.note && <span className={styles.note}>{question.note}</span>}
            </>
          )}
          {status === 'correct' && question.note && <span className={styles.note}>{question.note}</span>}
        </div>

        <div className={styles.slotsArea}>
          <div className={styles.slotsRow} role="group" aria-label="解答欄">
            {slots.map((tile, i) => (
              <AnswerSlot
                key={i}
                word={tile ? tile.word : null}
                displayWord={tile ? displayFor(tile, capitalizeFirst) : undefined}
                colorIndex={tile ? tile.uid : i}
                position={i + 1}
                mismatch={status === 'wrong' && !!tile && tile.word !== question.words[i]}
                active={!tile && activeSlot === i}
                onClick={() => (tile ? handleFilledSlotTap(i) : handleEmptySlotTap(i))}
              />
            ))}
          </div>
          {status === 'playing' && anyPlaced && (
            <button className={styles.clearButton} onClick={handleClearAll} aria-label="置いた単語をすべて選択解除する">
              ↺ ぜんぶ もどす
            </button>
          )}
        </div>

        <div className={styles.trayArea}>
          <div className={styles.trayRow} role="group" aria-label="単語カード">
            {tray.map((tile) => {
              const placed = slots.some((s) => s?.uid === tile.uid)
              return (
                <WordTile
                  key={tile.uid}
                  word={tile.word}
                  displayWord={displayFor(tile, capitalizeFirst)}
                  colorIndex={tile.uid}
                  onClick={() => handleTrayTap(tile)}
                  disabled={status !== 'playing' || placed}
                  placed={placed}
                />
              )
            })}
          </div>
        </div>
      </div>

      {status === 'correct' && (
        <>
          <div className={`${styles.flashOverlay} ${styles.correct}`} />
          <Confetti key={qIndex} />
        </>
      )}
      {status === 'wrong' && <div className={`${styles.flashOverlay} ${styles.wrong}`} />}
    </div>
  )
}
