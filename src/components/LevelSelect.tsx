import { LEVELS } from '../data/levels'
import { loadBestResult } from '../utils/storage'
import { normalizedScore } from '../utils/scoring'
import { useSoundContext } from '../context/sound'
import { MODE_LABEL } from '../data/modes'
import type { GameMode, LevelId } from '../types'
import styles from './LevelSelect.module.css'

export default function LevelSelect({
  mode,
  onSelect,
  onBack,
}: {
  mode: GameMode
  onSelect: (levelId: LevelId) => void
  onBack: () => void
}) {
  const sound = useSoundContext()

  return (
    <div className={styles.screen}>
      <button className={styles.backButton} onClick={() => { sound.click(); onBack() }} aria-label="戻る">
        ←
      </button>

      <div className={styles.header}>
        <h2 className={styles.heading}>コースをえらぼう</h2>
        <p className={styles.sub}>
          <span className={styles.modeTag}>
            {mode === 'endless' ? '∞' : '▶'} {MODE_LABEL[mode]}
          </span>
        </p>
      </div>

      <div className={styles.cards}>
        {LEVELS.map((level, i) => {
          const best = loadBestResult(level.id)
          return (
            <button
              key={level.id}
              className={styles.card}
              style={{
                background: `linear-gradient(155deg, ${level.gradient[0]}, ${level.gradient[1]})`,
                animationDelay: `${i * 0.08}s`,
              }}
              onClick={() => {
                sound.click()
                onSelect(level.id)
              }}
            >
              <span className={styles.icon}>{level.icon}</span>
              <p className={styles.cardTitle}>{level.title}</p>
              <p className={styles.cardSubtitle}>{level.subtitle}</p>
              <p className={styles.cardDesc}>{level.description}</p>
              <div className={styles.stars}>
                {[1, 2, 3].map((n) => (
                  <span key={n} className={!best || best.stars < n ? styles.starDim : ''}>
                    ★
                  </span>
                ))}
              </div>
              <p className={styles.bestScore}>
                {best
                  ? `ベストスコア ${normalizedScore(best.score, best.totalCount)}`
                  : 'まだ記録なし'}
              </p>
              {best?.mode === 'endless' && (
                <p className={styles.bestSource}>∞ {best.totalCount}問を10問換算</p>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
