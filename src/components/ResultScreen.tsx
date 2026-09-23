import { useEffect, useState } from 'react'
import { useSoundContext } from '../context/sound'
import { getLevel } from '../data/levels'
import { focusLabel, MODE_LABEL } from '../data/modes'
import { grammarLabel } from '../data/grammar'
import { speakEnglish } from '../audio/speech'
import { normalizedScore } from '../utils/scoring'
import { dueReviewCount } from '../utils/reviewQueue'
import Confetti from './Confetti'
import type { FocusSession, LevelResult, MissedQuestion } from '../types'
import styles from './ResultScreen.module.css'

export default function ResultScreen({
  result,
  isNewBest,
  missed,
  focus,
  onRetry,
  onRetryMissed,
  onLevelSelect,
  onProgress,
}: {
  result: LevelResult
  isNewBest: boolean
  /** Questions that went wrong in this run, in the order they were missed. */
  missed: MissedQuestion[]
  /** Set when this was a focus run (see FocusSession). */
  focus?: FocusSession
  onRetry: () => void
  onRetryMissed: (questionIds: string[]) => void
  onLevelSelect: () => void
  onProgress: () => void
}) {
  const sound = useSoundContext()
  const level = getLevel(result.levelId)!
  const mode = result.mode ?? 'challenge'
  // Records are ranked on the 10-question-normalized score, so an endless run
  // needs to see that number too — otherwise a big raw total that didn't beat
  // the record looks like a bug.
  const normalized = normalizedScore(result.score, result.totalCount)
  // An endless run that's stopped before the first answer never reaches this
  // screen, so totalCount is always at least 1 here.
  const accuracyPct = Math.round((result.correctCount / result.totalCount) * 100)
  const [showReview, setShowReview] = useState(false)

  useEffect(() => {
    for (let i = 0; i < result.stars; i++) {
      sound.starPop(i * 0.18)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const showNewBest = isNewBest && result.score > 0
  // A focus run is usually shorter than ten questions, so it never earns stars
  // (see MIN_RANKED_QUESTIONS); showing three dark stars would read as failure.
  const showStars = !focus
  // What's still due after this run decides where a review run's retry goes
  // (see App): more of this level, or the review picker for other levels.
  const [dueAfter] = useState(() => (focus?.kind === 'review' ? dueReviewCount(result.levelId) : 0))
  const retryLabel =
    focus?.kind !== 'review' ? 'もう一度' : dueAfter > 0 ? `つづけて復習 (${dueAfter}問)` : 'ほかのコースを復習'

  return (
    <div className={styles.screen}>
      {(result.stars === 3 || showNewBest) && <Confetti pieceCount={48} />}

      <p className={styles.badge}>
        {level.icon} {level.title} クリア！
      </p>
      <p className={styles.modeTag}>
        {focus
          ? `${focusLabel(focus)}・${result.totalCount}問`
          : mode === 'endless'
            ? `∞ ${MODE_LABEL[mode]}・${result.totalCount}問`
            : `▶ ${MODE_LABEL[mode]}`}
      </p>
      {showNewBest && <p className={styles.newBest}>🏆 New Best!</p>}

      {showStars && (
        <div className={styles.stars}>
          {[1, 2, 3].map((n) => (
            <span
              key={n}
              className={`${styles.star} ${result.stars >= n ? styles.lit : ''}`}
              style={{ animationDelay: `${n * 0.15}s` }}
            >
              ★
            </span>
          ))}
        </div>
      )}

      <div className={styles.statsRow}>
        <div className={styles.stat}>
          <span className={styles.statValue}>{result.score}</span>
          <span className={styles.statLabel}>スコア</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>
            {result.correctCount}/{result.totalCount}
          </span>
          <span className={styles.statLabel}>正解数 ({accuracyPct}%)</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>🔥{result.bestCombo}</span>
          <span className={styles.statLabel}>最大コンボ</span>
        </div>
      </div>

      {mode === 'endless' && (
        <p className={styles.normalizedNote}>記録は10問換算で {normalized} 点</p>
      )}

      <div className={styles.buttonRow}>
        <button
          className={`${styles.button} ${styles.secondary}`}
          onClick={() => {
            sound.click()
            if (focus?.kind === 'grammar') onProgress()
            else onLevelSelect()
          }}
        >
          {focus?.kind === 'grammar' ? '成長記録へ' : 'レベル選択へ'}
        </button>
        {missed.length > 0 && (
          <button
            className={`${styles.button} ${styles.review}`}
            onClick={() => {
              sound.click()
              setShowReview(true)
            }}
          >
            📝 間違えた問題 ({missed.length})
          </button>
        )}
        <button
          className={`${styles.button} ${styles.primary}`}
          onClick={() => {
            sound.click()
            onRetry()
          }}
        >
          {retryLabel}
        </button>
      </div>

      {showReview && (
        <div className={styles.reviewOverlay} role="dialog" aria-modal="true" aria-label="間違えた問題の振り返り">
          <div className={styles.reviewPanel}>
            <div className={styles.reviewHeader}>
              <h2 className={styles.reviewTitle}>📝 間違えた問題</h2>
              <button
                className={styles.reviewClose}
                onClick={() => {
                  sound.click()
                  setShowReview(false)
                }}
                aria-label="閉じる"
              >
                ✕
              </button>
            </div>
            <ul className={styles.reviewList}>
              {missed.map(({ question, recovered }) => (
                <li key={question.id} className={styles.reviewItem}>
                  <div className={styles.reviewText}>
                    <p className={styles.reviewJp}>
                      <span aria-label={recovered ? 'あとで正解' : '正解できなかった'}>{recovered ? '🔄' : '❌'}</span>{' '}
                      {question.jp}
                    </p>
                    <p className={styles.reviewEn}>{question.words.join(' ')}</p>
                    {(question.grammar || question.note) && (
                      <p className={styles.reviewNote}>
                        {question.grammar ? grammarLabel(question.grammar) : question.note}
                      </p>
                    )}
                  </div>
                  <button
                    className={styles.reviewSpeak}
                    onClick={() => speakEnglish(question.words.join(' '))}
                    aria-label={`英語を再生: ${question.words.join(' ')}`}
                  >
                    🔊
                  </button>
                </li>
              ))}
            </ul>
            <div className={styles.reviewFooter}>
              <button
                className={`${styles.button} ${styles.primary}`}
                onClick={() => {
                  sound.click()
                  onRetryMissed(missed.map(({ question }) => question.id))
                }}
              >
                🔁 この{missed.length}問をもう一度
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
