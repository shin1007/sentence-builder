import { ACHIEVEMENTS, loadUnlockedIds } from '../utils/achievements'
import { useSoundContext } from '../context/SoundContext'
import styles from './AchievementsScreen.module.css'

export default function AchievementsScreen({ onBack }: { onBack: () => void }) {
  const sound = useSoundContext()
  const unlockedIds = new Set(loadUnlockedIds())

  return (
    <div className={styles.screen}>
      <button
        className={styles.backButton}
        onClick={() => {
          sound.click()
          onBack()
        }}
        aria-label="タイトルに戻る"
      >
        ←
      </button>

      <div className={styles.header}>
        <h2 className={styles.heading}>実績</h2>
        <p className={styles.sub}>ACHIEVEMENTS</p>
      </div>

      <div className={styles.list} role="list">
        {ACHIEVEMENTS.map((achievement) => {
          const unlocked = unlockedIds.has(achievement.id)
          return (
            <div
              key={achievement.id}
              role="listitem"
              className={`${styles.card} ${unlocked ? styles.unlocked : styles.locked}`}
            >
              <span className={styles.icon}>{unlocked ? achievement.icon : '🔒'}</span>
              <div className={styles.text}>
                <p className={styles.title}>{unlocked ? achievement.title : '？？？'}</p>
                <p className={styles.desc}>{unlocked ? achievement.description : '未解除'}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
