import { loadProgressRecord, resetProgress } from '../utils/progressStats'
import { loadWeakGrammar, MIN_ATTEMPTS_FOR_RANKING, resetGrammarStats } from '../utils/grammarStats'
import { useSoundContext } from '../context/sound'
import { getLevel } from '../data/levels'
import { grammarLabel, type GrammarId } from '../data/grammar'
import { QUESTIONS_BY_GRAMMAR } from '../data/questions'
import { useState } from 'react'
import type { LevelId } from '../types'
import styles from './ProgressScreen.module.css'

export default function ProgressScreen({
  onBack,
  onPracticeGrammar,
}: {
  onBack: () => void
  onPracticeGrammar: (levelId: LevelId, grammar: GrammarId) => void
}) {
  const sound = useSoundContext()
  const [rec, setRec] = useState(() => loadProgressRecord())
  // Only points that still have questions in their level can be drilled.
  const [weak, setWeak] = useState(() =>
    loadWeakGrammar().filter((stat) => (QUESTIONS_BY_GRAMMAR[stat.levelId][stat.grammar]?.length ?? 0) > 0),
  )
  const [confirmReset, setConfirmReset] = useState(false)

  const total = rec.totalAnswered
  const firstPct = total > 0 ? Math.round((rec.firstTry / total) * 100) : 0
  const recoveredPct = total > 0 ? Math.round((rec.recovered / total) * 100) : 0
  const missedPct = total > 0 ? Math.round((rec.missedOnly / total) * 100) : 0

  const handleReset = () => {
    if (!confirmReset) {
      setConfirmReset(true)
      return
    }
    resetProgress()
    resetGrammarStats()
    setRec(loadProgressRecord())
    setWeak([])
    setConfirmReset(false)
    sound.click()
  }

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
        <h2 className={styles.heading}>成長記録</h2>
        <p className={styles.sub}>あなたのこれまでの取り組み</p>
      </div>

      {total === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyIcon}>📖</p>
          <p className={styles.emptyText}>まだ記録がありません。</p>
          <p className={styles.emptyHint}>ゲームをプレイすると成長が記録されます！</p>
        </div>
      ) : (
        <>
          <div className={styles.totalCard}>
            <span className={styles.totalNum}>{total}</span>
            <span className={styles.totalLabel}>問 解いた</span>
          </div>

          <div className={styles.barSection}>
            {/* First-try bar */}
            <div className={styles.barRow}>
              <div className={styles.barLabelGroup}>
                <span className={styles.barIcon}>✅</span>
                <span className={styles.barLabel}>最初から正解</span>
                <span className={styles.barCount}>{rec.firstTry}問</span>
              </div>
              <div className={styles.barTrack}>
                <div
                  className={`${styles.barFill} ${styles.barFirst}`}
                  style={{ width: `${firstPct}%` }}
                />
              </div>
              <span className={styles.barPct}>{firstPct}%</span>
            </div>

            {/* Recovered bar */}
            <div className={styles.barRow}>
              <div className={styles.barLabelGroup}>
                <span className={styles.barIcon}>🔄</span>
                <span className={styles.barLabel}>間違えてから正解</span>
                <span className={styles.barCount}>{rec.recovered}問</span>
              </div>
              <div className={styles.barTrack}>
                <div
                  className={`${styles.barFill} ${styles.barRecovered}`}
                  style={{ width: `${recoveredPct}%` }}
                />
              </div>
              <span className={styles.barPct}>{recoveredPct}%</span>
            </div>

            {/* Missed-only bar */}
            <div className={styles.barRow}>
              <div className={styles.barLabelGroup}>
                <span className={styles.barIcon}>❌</span>
                <span className={styles.barLabel}>正解できなかった</span>
                <span className={styles.barCount}>{rec.missedOnly}問</span>
              </div>
              <div className={styles.barTrack}>
                <div
                  className={`${styles.barFill} ${styles.barMissed}`}
                  style={{ width: `${missedPct}%` }}
                />
              </div>
              <span className={styles.barPct}>{missedPct}%</span>
            </div>
          </div>

          <div className={styles.stackedBar}>
            <div
              className={`${styles.stackSegment} ${styles.segFirst}`}
              style={{ flex: rec.firstTry }}
              title={`最初から正解: ${rec.firstTry}問`}
            />
            <div
              className={`${styles.stackSegment} ${styles.segRecovered}`}
              style={{ flex: rec.recovered }}
              title={`間違えてから正解: ${rec.recovered}問`}
            />
            <div
              className={`${styles.stackSegment} ${styles.segMissed}`}
              style={{ flex: rec.missedOnly }}
              title={`正解できなかった: ${rec.missedOnly}問`}
            />
          </div>
          <p className={styles.stackedNote}>
            ✅ 最初から正解 &nbsp;／&nbsp; 🔄 間違えてから正解 &nbsp;／&nbsp; ❌ 正解できなかった
          </p>

          <section className={styles.weakSection} aria-labelledby="weak-heading">
            <h3 id="weak-heading" className={styles.weakHeading}>
              🎯 にがてな文法
            </h3>
            {weak.length === 0 ? (
              <p className={styles.weakEmpty}>
                同じ文法を{MIN_ATTEMPTS_FOR_RANKING}問以上解くと、ここに にがてな文法が出てきます。
              </p>
            ) : (
              <ul className={styles.weakList}>
                {weak.map((stat) => {
                  const pct = Math.round(stat.accuracy * 100)
                  const level = getLevel(stat.levelId)!
                  return (
                    <li key={`${stat.levelId}:${stat.grammar}`} className={styles.weakRow}>
                      <div className={styles.weakLabelGroup}>
                        <span className={styles.weakLabel}>{grammarLabel(stat.grammar)}</span>
                        <span className={styles.weakLevel}>
                          {level.icon} {level.title}・{stat.correct}/{stat.attempts}問
                        </span>
                      </div>
                      <div className={styles.barTrack}>
                        <div className={`${styles.barFill} ${styles.barWeak}`} style={{ width: `${pct}%` }} />
                      </div>
                      <span className={styles.barPct}>{pct}%</span>
                      <button
                        className={styles.practiceButton}
                        onClick={() => {
                          sound.click()
                          onPracticeGrammar(stat.levelId, stat.grammar)
                        }}
                        aria-label={`${grammarLabel(stat.grammar)}を練習する`}
                      >
                        練習する
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </section>

          <div className={styles.message}>
            {rec.firstTry + rec.recovered > 0 && (
              <p className={styles.messageText}>
                {rec.recovered > 0
                  ? `間違えた問題のうち ${rec.recovered}問 を克服しました！🎉`
                  : 'まだ「やり直し正解」はありませんが、これからです！'}
              </p>
            )}
          </div>
        </>
      )}

      <div className={styles.resetArea}>
        <button
          className={`${styles.resetButton} ${confirmReset ? styles.resetConfirm : ''}`}
          onClick={handleReset}
        >
          {confirmReset ? '⚠️ 本当にリセットする' : '記録をリセット'}
        </button>
        {confirmReset && (
          <button className={styles.cancelButton} onClick={() => setConfirmReset(false)}>
            キャンセル
          </button>
        )}
      </div>
    </div>
  )
}
