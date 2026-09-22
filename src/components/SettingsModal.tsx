import { useSoundContext } from '../context/SoundContext'
import { useSettingsContext } from '../context/SettingsContext'
import styles from './SettingsModal.module.css'

export default function SettingsModal({ onClose }: { onClose: () => void }) {
  const sound = useSoundContext()
  const {
    capitalizeFirst,
    toggleCapitalizeFirst,
    practiceMode,
    togglePracticeMode,
    retryOnMiss,
    toggleRetryOnMiss,
  } = useSettingsContext()

  const handleSelectRetry = (enableRetry: boolean) => {
    sound.click()
    if (retryOnMiss !== enableRetry) {
      toggleRetryOnMiss()
    }
  }

  const handleSelectPractice = (enablePractice: boolean) => {
    sound.click()
    if (practiceMode !== enablePractice) {
      togglePracticeMode()
    }
  }

  const handleSelectCapitalize = (enableCap: boolean) => {
    sound.click()
    if (capitalizeFirst !== enableCap) {
      toggleCapitalizeFirst()
    }
  }

  const handleToggleSound = () => {
    sound.unlock()
    sound.toggleSfx()
  }

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="settings-title">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 id="settings-title" className={styles.title}>
            ⚙️ 設定
          </h2>
          <button className={styles.closeButton} onClick={onClose} aria-label="設定を閉じる">
            ✕
          </button>
        </div>

        <div className={styles.body}>
          {/* ミス時の動作 */}
          <div className={styles.section}>
            <div className={styles.sectionLabel}>
              <span>🎯</span> 間違えたときの動作
            </div>
            <div className={styles.optionGrid}>
              <button
                type="button"
                className={`${styles.optionCard} ${retryOnMiss ? styles.active : ''}`}
                onClick={() => handleSelectRetry(true)}
              >
                <div className={styles.optionHeader}>
                  <span className={styles.optionTitle}>🔄 やり直し</span>
                  <span className={styles.optionBadge}>基本</span>
                </div>
                <p className={styles.optionDesc}>
                  単語をタップした瞬間に順番を判定。間違えた単語はその場で震えて教えてくれるので、1語ずつ確実に並べられます。
                </p>
              </button>

              <button
                type="button"
                className={`${styles.optionCard} ${!retryOnMiss ? styles.active : ''}`}
                onClick={() => handleSelectRetry(false)}
              >
                <div className={styles.optionHeader}>
                  <span className={styles.optionTitle}>⏩ 一発勝負</span>
                </div>
                <p className={styles.optionDesc}>
                  最後まで自由に並べてから一括判定。間違えたら正解を表示して次の問題へ進みます。
                </p>
              </button>
            </div>
          </div>

          {/* プレイ形式 */}
          <div className={styles.section}>
            <div className={styles.sectionLabel}>
              <span>🎮</span> プレイ形式
            </div>
            <div className={styles.optionGrid}>
              <button
                type="button"
                className={`${styles.optionCard} ${!practiceMode ? styles.active : ''}`}
                onClick={() => handleSelectPractice(false)}
              >
                <div className={styles.optionHeader}>
                  <span className={styles.optionTitle}>⚡ 通常モード</span>
                  <span className={styles.optionBadge}>標準</span>
                </div>
                <p className={styles.optionDesc}>
                  制限時間（タイマー）とライフ（❤️×3）ありでスコアを競います。
                </p>
              </button>

              <button
                type="button"
                className={`${styles.optionCard} ${practiceMode ? styles.active : ''}`}
                onClick={() => handleSelectPractice(true)}
              >
                <div className={styles.optionHeader}>
                  <span className={styles.optionTitle}>🧪 練習モード</span>
                </div>
                <p className={styles.optionDesc}>
                  タイマーもライフ制限もなしで、自分のペースでじっくり学べます。
                </p>
              </button>
            </div>
          </div>

          {/* 文頭の大文字ヒント */}
          <div className={styles.section}>
            <div className={styles.sectionLabel}>
              <span>🔤</span> 文頭の大文字ヒント
            </div>
            <div className={styles.optionGrid}>
              <button
                type="button"
                className={`${styles.optionCard} ${capitalizeFirst ? styles.active : ''}`}
                onClick={() => handleSelectCapitalize(true)}
              >
                <div className={styles.optionHeader}>
                  <span className={styles.optionTitle}>Aa 大文字ON</span>
                  <span className={styles.optionBadge}>やさしい</span>
                </div>
                <p className={styles.optionDesc}>
                  文頭の単語を大文字にして、最初の単語のヒントにします。
                </p>
              </button>

              <button
                type="button"
                className={`${styles.optionCard} ${!capitalizeFirst ? styles.active : ''}`}
                onClick={() => handleSelectCapitalize(false)}
              >
                <div className={styles.optionHeader}>
                  <span className={styles.optionTitle}>aa 大文字OFF</span>
                </div>
                <p className={styles.optionDesc}>
                  すべての単語を小文字にして、並び順の実力試しができます。
                </p>
              </button>
            </div>
          </div>

          {/* 効果音・音声 */}
          <div className={styles.section}>
            <div className={styles.sectionLabel}>
              <span>🔊</span> 音声・効果音
            </div>
            <div className={styles.optionGrid}>
              <button
                type="button"
                className={`${styles.optionCard} ${sound.sfxOn ? styles.active : ''}`}
                onClick={handleToggleSound}
              >
                <div className={styles.optionHeader}>
                  <span className={styles.optionTitle}>🔊 音声 ON</span>
                </div>
                <p className={styles.optionDesc}>
                  効果音や日本語・英語の読み上げ音声を再生します。
                </p>
              </button>

              <button
                type="button"
                className={`${styles.optionCard} ${!sound.sfxOn ? styles.active : ''}`}
                onClick={handleToggleSound}
              >
                <div className={styles.optionHeader}>
                  <span className={styles.optionTitle}>🔈 ミュート</span>
                </div>
                <p className={styles.optionDesc}>
                  すべての音声・効果音を消音します。
                </p>
              </button>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button
            type="button"
            className={styles.doneButton}
            onClick={() => {
              sound.click()
              onClose()
            }}
          >
            完了
          </button>
        </div>
      </div>
    </div>
  )
}
