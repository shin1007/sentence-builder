import { useEffect } from 'react'
import { useSoundContext } from '../context/SoundContext'
import { getLevel } from '../data/levels'
import Confetti from './Confetti'
import type { LevelResult } from '../types'
import styles from './ResultScreen.module.css'

export default function ResultScreen({
  result,
  isNewBest,
  onRetry,
  onLevelSelect,
}: {
  result: LevelResult
  isNewBest: boolean
  onRetry: () => void
  onLevelSelect: () => void
}) {
  const sound = useSoundContext()
  const level = getLevel(result.levelId)!
  const accuracyPct = Math.round((result.correctCount / result.totalCount) * 100)

  useEffect(() => {
    for (let i = 0; i < result.stars; i++) {
      sound.starPop(i * 0.18)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const showNewBest = isNewBest && result.score > 0

  return (
    <div className={styles.screen}>
      {(result.stars === 3 || showNewBest) && <Confetti pieceCount={48} />}

      <p className={styles.badge}>
        {level.icon} {level.title} クリア！
      </p>
      {showNewBest && <p className={styles.newBest}>🏆 New Best!</p>}

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

      <div className={styles.buttonRow}>
        <button
          className={`${styles.button} ${styles.secondary}`}
          onClick={() => {
            sound.click()
            onLevelSelect()
          }}
        >
          レベル選択へ
        </button>
        <button
          className={`${styles.button} ${styles.primary}`}
          onClick={() => {
            sound.click()
            onRetry()
          }}
        >
          もう一度
        </button>
      </div>
    </div>
  )
}
