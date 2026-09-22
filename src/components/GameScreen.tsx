import { useCallback, useEffect, useRef, useState } from 'react'
import { getLevel } from '../data/levels'
import { pickQuestions } from '../data/questions'
import { useSoundContext } from '../context/SoundContext'
import { useSettingsContext } from '../context/SettingsContext'
import { saveBestResultIfBetter } from '../utils/storage'
import { loadDueIds, recordCorrect, recordMiss } from '../utils/reviewQueue'
import { recordFirstTry, recordRecovered, recordMissedOnly } from '../utils/progressStats'
import { speakEnglish, speakJapanese } from '../audio/speech'
import { WordTile, AnswerSlot } from './WordTile'
import Confetti from './Confetti'
import { QUESTIONS_PER_SESSION, calcStars } from '../utils/scoring'
import type { GameMode, LevelId, LevelResult, Question } from '../types'
import styles from './GameScreen.module.css'

const START_LIVES = 10
/** How many questions an endless run draws at a time. Another batch is
 * appended before the current one runs out, so the run never hits an end. */
const ENDLESS_BATCH = 30
/** Append the next batch once this few questions are left in the queue. */
const ENDLESS_REFILL_AT = 5
const FEEDBACK_DELAY_CORRECT = 1100
const FEEDBACK_DELAY_WRONG = 1500
/** Grace window after the last tile lands before the answer is actually
 * scored, so a player who notices a misplaced word (or two swapped) can
 * still tap a filled slot to pull it back and fix it before it counts
 * against them — filling the board no longer locks the answer in instantly. */
const CONFIRM_GRACE_MS = 650

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
  mode,
  onFinish,
  onExit,
}: {
  levelId: LevelId
  mode: GameMode
  onFinish: (result: LevelResult, isNewBest: boolean) => void
  onExit: () => void
}) {
  const level = getLevel(levelId)!
  const sound = useSoundContext()
  const { capitalizeFirst, practiceMode, retryOnMiss } = useSettingsContext()

  const isEndless = mode === 'endless'

  // Challenge mode draws its ten questions once. Endless keeps the queue
  // topped up (see the refill effect below) so it never runs dry.
  const [questions, setQuestions] = useState<Question[]>(() =>
    pickQuestions(levelId, isEndless ? ENDLESS_BATCH : QUESTIONS_PER_SESSION, loadDueIds(levelId)),
  )
  const [qIndex, setQIndex] = useState(0)
  const question = questions[qIndex]

  const [tray, setTray] = useState<Tile[]>(() => buildTiles(questions[0]))
  const [slots, setSlots] = useState<(Tile | null)[]>(() =>
    new Array(questions[0].words.length).fill(null),
  )

  const [lives, setLives] = useState(START_LIVES)
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [bestCombo, setBestCombo] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  /** Questions actually resolved so far — an endless run is scored over this. */
  const [answeredCount, setAnsweredCount] = useState(0)

  const [status, setStatus] = useState<'playing' | 'correct' | 'wrong'>('playing')
  const [timeLeft, setTimeLeft] = useState(level.timeLimitSec)
  const [scorePop, setScorePop] = useState<{ id: number; value: number } | null>(null)
  const [shake, setShake] = useState(false)
  const [errorTileUid, setErrorTileUid] = useState<number | null>(null)
  // True for the brief window after the last tile lands but before it's
  // actually scored in advance mode.
  const [awaitingConfirm, setAwaitingConfirm] = useState(false)

  const lastTickSecond = useRef(-1)
  const advanceTimer = useRef<number | null>(null)
  const pendingAdvance = useRef<(() => void) | null>(null)
  const advanceGeneration = useRef(0)
  const popIdRef = useRef(0)
  const pendingCheck = useRef<{ timerId: number; isCorrect: boolean } | null>(null)
  /** Set of question IDs that were missed at least once in this session. */
  const missedInSession = useRef<Set<string>>(new Set())

  // Freeze the countdown while the tab/app is backgrounded so returning
  // players don't find their time silently drained (or the round already
  // timed out) by however long they were away.
  const [isHidden, setIsHidden] = useState(() => document.hidden)
  useEffect(() => {
    const onVisibilityChange = () => setIsHidden(document.hidden)
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [])

  // Top the endless queue up before it empties. A fresh draw re-consults the
  // review queue, so questions missed earlier in this same run can resurface.
  useEffect(() => {
    if (!isEndless) return
    if (questions.length - qIndex > ENDLESS_REFILL_AT) return
    setQuestions((current) => {
      const seen = new Set(current.map((q) => q.id))
      const next = pickQuestions(levelId, ENDLESS_BATCH, loadDueIds(levelId))
      // Avoid repeating a question that's still waiting in the queue; once the
      // pool is smaller than the queue this can come back empty, so fall back
      // to the unfiltered draw rather than stalling the run.
      const fresh = next.filter((q) => !seen.has(q.id))
      return [...current, ...(fresh.length > 0 ? fresh : next)]
    })
  }, [isEndless, qIndex, questions.length, levelId])

  const cancelPendingCheck = useCallback(() => {
    if (!pendingCheck.current) return
    window.clearTimeout(pendingCheck.current.timerId)
    pendingCheck.current = null
    setAwaitingConfirm(false)
  }, [])

  useEffect(() => {
    if (qIndex === 0) return
    cancelPendingCheck()
    const q = questions[qIndex]
    setTray(buildTiles(q))
    setSlots(new Array(q.words.length).fill(null))
    setStatus('playing')
    setTimeLeft(level.timeLimitSec)
    lastTickSecond.current = -1
  }, [qIndex, questions, level.timeLimitSec, cancelPendingCheck])

  // The countdown shouldn't start ticking while the Japanese prompt is still
  // being read aloud, so wait for that playback to finish before arming it.
  const [timerReady, setTimerReady] = useState(false)
  useEffect(() => {
    let cancelled = false
    setTimerReady(false)
    const done = sound.sfxOn ? speakJapanese(questions[qIndex].jp) : Promise.resolve()
    done.then(() => {
      if (!cancelled) setTimerReady(true)
    })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qIndex])

  useEffect(() => {
    if (status !== 'playing' || isHidden || practiceMode || !timerReady) return
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
  }, [status, qIndex, sound, isHidden, practiceMode, timerReady])

  useEffect(
    () => () => {
      advanceGeneration.current++
      if (advanceTimer.current) window.clearTimeout(advanceTimer.current)
      if (pendingAdvance.current) document.removeEventListener('visibilitychange', pendingAdvance.current)
      if (pendingCheck.current) window.clearTimeout(pendingCheck.current.timerId)
    },
    [],
  )

  const finishSession = useCallback(
    (finalScore: number, finalCorrect: number, finalBestCombo: number, finalAnswered: number) => {
      // A challenge run is always out of ten, even when hearts run out early.
      // An endless run is scored over however many questions were answered —
      // never zero, so the result screen can't divide by it.
      const total = isEndless ? Math.max(finalAnswered, 1) : QUESTIONS_PER_SESSION
      const stars = calcStars(finalCorrect, total)
      const result: LevelResult = {
        levelId,
        mode,
        score: finalScore,
        correctCount: finalCorrect,
        totalCount: total,
        bestCombo: finalBestCombo,
        stars,
        clearedAt: Date.now(),
      }
      // Practice sessions have no timer/lives pressure, so they aren't a fair
      // comparison against timed runs and shouldn't overwrite a real best —
      // and shouldn't count toward the daily streak either.
      const isNewBest = practiceMode ? false : saveBestResultIfBetter(result)
      if (stars >= 2) sound.win()
      else sound.lose()
      onFinish(result, isNewBest)
    },
    [levelId, mode, isEndless, onFinish, sound, practiceMode],
  )

  const resolve = useCallback(
    (isCorrect: boolean) => {
      setStatus(isCorrect ? 'correct' : 'wrong')

      let nextScore = score
      let nextCombo = combo
      let nextBestCombo = bestCombo
      let nextCorrect = correctCount
      let nextLives = lives
      const nextAnswered = answeredCount + 1
      setAnsweredCount(nextAnswered)

      if (isCorrect) {
        const tier = combo >= 5 ? 2 : combo >= 3 ? 1 : 0
        const multiplier = tier === 2 ? 2 : tier === 1 ? 1.5 : 1
        const timeBonus = practiceMode ? 0 : Math.round(timeLeft * 2)
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
        recordCorrect(levelId, question.id)
        // Record progress: first-try or recovered
        if (missedInSession.current.has(question.id)) {
          recordRecovered()
        } else {
          recordFirstTry()
        }
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
        // Mark this question as missed for the progress tracker
        missedInSession.current.add(question.id)
        window.setTimeout(() => setShake(false), 450)
      }

      // Endless only ends on hearts (or the やめる button) — the queue itself
      // is refilled before it can run out.
      const isLastQuestion = !isEndless && qIndex + 1 >= questions.length
      const outOfLives = !practiceMode && nextLives <= 0
      // A wrong answer on the final question (or when lives run out) can never
      // be recovered in this session — count it as missed-only.
      if (!isCorrect && (isLastQuestion || outOfLives)) {
        recordMissedOnly()
      }
      const generation = ++advanceGeneration.current

      // If the player backgrounds the app right after answering, don't let a
      // native setTimeout silently skip them ahead while they're away —
      // defer the advance until the tab is visible again.
      const advance = () => {
        if (generation !== advanceGeneration.current) return
        if (document.hidden) {
          pendingAdvance.current = advance
          document.addEventListener('visibilitychange', advance, { once: true })
          return
        }
        pendingAdvance.current = null
        if (isLastQuestion || outOfLives) {
          finishSession(nextScore, nextCorrect, nextBestCombo, nextAnswered)
        } else {
          setQIndex((i) => i + 1)
        }
      }

      // Don't advance while the English sentence is still being read aloud —
      // wait for playback to finish (in addition to the usual feedback
      // delay) so the audio for this question is never cut short. Read it
      // on a wrong answer too, alongside the "正解: ..." text, so missing a
      // question still reinforces how the correct sentence actually sounds.
      const speechDone = sound.sfxOn ? speakEnglish(question.words.join(' ')) : Promise.resolve()
      const minDelay = new Promise<void>((res) => {
        advanceTimer.current = window.setTimeout(res, isCorrect ? FEEDBACK_DELAY_CORRECT : FEEDBACK_DELAY_WRONG)
      })
      Promise.all([minDelay, speechDone]).then(() => advance())
    },
    [
      score,
      combo,
      bestCombo,
      correctCount,
      answeredCount,
      lives,
      timeLeft,
      qIndex,
      question,
      questions.length,
      sound,
      finishSession,
      practiceMode,
      isEndless,
      levelId,
    ],
  )

  useEffect(() => {
    if (status === 'playing' && timeLeft <= 0) {
      cancelPendingCheck()
      resolve(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, status])

  /** Back (challenge) / やめる (endless). An endless run the player stops is
   * still a finished run: it goes to the result screen with whatever was
   * scored, unless they quit before answering anything at all. */
  const handleQuit = () => {
    sound.click()
    if (!isEndless || answeredCount === 0) {
      onExit()
      return
    }
    cancelPendingCheck()
    // Drop any advance queued by the answer they just gave, so it can't fire
    // a second finish on top of this one.
    advanceGeneration.current++
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current)
    finishSession(score, correctCount, bestCombo, answeredCount)
  }

  const handleListen = () => {
    sound.click()
    speakEnglish(question.words.join(' '))
  }

  const confirmNow = () => {
    if (!pendingCheck.current) return
    const { isCorrect } = pendingCheck.current
    window.clearTimeout(pendingCheck.current.timerId)
    pendingCheck.current = null
    setAwaitingConfirm(false)
    sound.click()
    resolve(isCorrect)
  }

  const handleTrayTap = (tile: Tile) => {
    if (status !== 'playing' || awaitingConfirm) return
    const emptyIndex = slots.findIndex((s) => s === null)
    if (emptyIndex === -1) return

    if (retryOnMiss) {
      // 即時判定モード: タップした単語がこのスロットの正解と一致するか判定
      const expectedWord = question.words[emptyIndex]
      if (tile.word !== expectedWord) {
        // 間違えた単語をタップした瞬間に赤枠＆シェイクで通知！
        setErrorTileUid(tile.uid)
        sound.wrong()
        setCombo(0)
        recordMiss(levelId, question.id)
        missedInSession.current.add(question.id)
        const nextLives = practiceMode ? lives : lives - 1
        setLives(nextLives)
        window.setTimeout(() => setErrorTileUid(null), 450)

        if (!practiceMode && nextLives <= 0) {
          // Hearts ran out mid-question: it's never completed, but it was
          // attempted and missed, so it counts toward the answered total.
          finishSession(score, correctCount, bestCombo, answeredCount + 1)
        }
        return
      }

      // 正しい単語の場合: スロットに配置
      const nextSlots = [...slots]
      nextSlots[emptyIndex] = tile
      setSlots(nextSlots)
      sound.place()

      // すべての単語が正しく埋まったら正解処理
      if (nextSlots.every((s) => s !== null)) {
        resolve(true)
      }
    } else {
      // 一発勝負モード: 自由に並べてから一括判定
      const nextSlots = [...slots]
      nextSlots[emptyIndex] = tile
      setSlots(nextSlots)
      sound.place()

      if (nextSlots.every((s) => s !== null)) {
        const built = nextSlots.map((s) => (s as Tile).word).join(' ')
        const isCorrect = built === question.words.join(' ')
        setAwaitingConfirm(true)
        const timerId = window.setTimeout(() => {
          pendingCheck.current = null
          setAwaitingConfirm(false)
          resolve(isCorrect)
        }, CONFIRM_GRACE_MS)
        pendingCheck.current = { timerId, isCorrect }
      }
    }
  }

  const handleClearAll = () => {
    if (status !== 'playing') return
    if (!slots.some((s) => s !== null)) return
    cancelPendingCheck()
    setSlots(new Array(slots.length).fill(null))
    sound.remove()
  }

  const handleSlotTap = (index: number) => {
    if (status !== 'playing') return
    const tile = slots[index]
    if (!tile) return
    cancelPendingCheck()
    const nextSlots = [...slots]
    nextSlots[index] = null
    setSlots(nextSlots)
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
          {isEndless ? (
            <button
              className={styles.quitButton}
              onClick={handleQuit}
              aria-label={answeredCount === 0 ? 'レベル選択に戻る' : 'やめて結果を見る'}
            >
              ← やめる
            </button>
          ) : (
            <button className={styles.backButton} onClick={handleQuit} aria-label="レベル選択に戻る">
              ←
            </button>
          )}
          <span className={styles.levelTag}>
            {`${level.icon} ${level.title}`}
            {practiceMode && ` 🧪`}
          </span>
          <span className={styles.progress}>
            {isEndless ? `${qIndex + 1}問目` : `${qIndex + 1} / ${QUESTIONS_PER_SESSION}`}
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
          <div className={styles.timerTrack}>
            <div
              className={`${styles.timerFill} ${timerClass ? styles[timerClass] : ''}`}
              style={{ width: `${timerPct}%` }}
            />
          </div>
        )}

        <div className={styles.promptArea}>
          <div className={styles.jpRow}>
            <p className={styles.jpText}>{question.jp}</p>
            <button className={styles.speakButton} onClick={handleListen} aria-label="英語を再生する">
              🔊 英語を再生
            </button>
          </div>
          {question.source && (
            <span className={styles.sourceTag}>
              出典: {question.source.region} {question.source.year}
            </span>
          )}
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
                onClick={() => handleSlotTap(i)}
              />
            ))}
          </div>
        </div>

        {status === 'playing' && slots.some((s) => s !== null) && (
          <div className={styles.actionRow}>
            <button className={styles.clearAllButton} onClick={handleClearAll} aria-label="解答欄の単語をすべてトレイに戻す">
              ↺ 全て戻す
            </button>
            {awaitingConfirm && (
              <button className={styles.confirmButton} onClick={confirmNow} aria-label="この解答で決定する">
                ✓ これでOK（ちがう単語はタップで直せるよ）
              </button>
            )}
          </div>
        )}

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
                  error={errorTileUid === tile.uid}
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
