import { LEVELS } from '../data/levels'
import { loadBestResult } from '../utils/storage'
import { normalizedScore } from '../utils/scoring'
import { useSoundContext } from '../context/sound'
import { MODE_LABEL, REVIEW_LABEL } from '../data/modes'
import { dueReviewCount } from '../utils/reviewQueue'
import type { LevelId, LevelSelectMode } from '../types'
import styles from './LevelSelect.module.css'

export default function LevelSelect({
  mode,
  onSelect,
  onBack,
}: {
  mode: LevelSelectMode
  onSelect: (levelId: LevelId) => void
  onBack: () => void
}) {
  const sound = useSoundContext()
  const isReview = mode === 'review'

  return (
    <div className={styles.screen}>
      <button className={styles.backButton} onClick={() => { sound.click(); onBack() }} aria-label="戻る">
        ←
      </button>

      <div className={styles.header}>
        <h2 className={styles.heading}>{isReview ? '復習するコースをえらぼう' : 'コースをえらぼう'}</h2>
        <p className={styles.sub}>
          <span className={styles.modeTag}>
            {isReview ? REVIEW_LABEL : `${mode === 'endless' ? '∞' : '▶'} ${MODE_LABEL[mode]}`}
          </span>
        </p>
      </div>

      <div className={styles.cards}>
        {LEVELS.map((level, i) => {
          const best = loadBestResult(level.id)
          const due = dueReviewCount(level.id)
          return (
            <button
              key={level.id}
              className={styles.card}
              disabled={isReview && due === 0}
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
              {isReview ? (
                <p className={styles.dueCount}>{due > 0 ? `復習 ${due}問` : '復習なし'}</p>
              ) : (
                <>
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
                  {due > 0 && <p className={styles.dueNote}>📚 復習 {due}問 たまってるよ</p>}
                </>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
