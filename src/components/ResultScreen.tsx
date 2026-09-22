import { useEffect } from 'react'
import { useSoundContext } from '../context/SoundContext'
import { getLevel } from '../data/levels'
import { MODE_LABEL } from '../data/modes'
import Confetti from './Confetti'
import type { LevelResult } from '../types'
import type { Achievement } from '../utils/achievements'
import styles from './ResultScreen.module.css'

export default function ResultScreen({
  result,
  isNewBest,
  newAchievements,
  onRetry,
  onLevelSelect,
}: {
  result: LevelResult
  isNewBest: boolean
  newAchievements: Achievement[]
  onRetry: () => void
  onLevelSelect: () => void
}) {
  const sound = useSoundContext()
  const level = getLevel(result.levelId)!
  const mode = result.mode ?? 'challenge'
  // An endless run that's stopped before the first answer never reaches this
  // screen, so totalCount is always at least 1 here.
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
      <p className={styles.modeTag}>
        {mode === 'endless'
          ? `∞ ${MODE_LABEL[mode]}・${result.totalCount}問`
          : `▶ ${MODE_LABEL[mode]}`}
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

      {newAchievements.length > 0 && (
        <div className={styles.achievementRow} role="status">
          {newAchievements.map((achievement) => (
            <div key={achievement.id} className={styles.achievementBadge}>
              <span className={styles.achievementIcon}>{achievement.icon}</span>
              <span className={styles.achievementText}>
                <span className={styles.achievementTitle}>実績解除：{achievement.title}</span>
                <span className={styles.achievementDesc}>{achievement.description}</span>
              </span>
            </div>
          ))}
        </div>
      )}

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
