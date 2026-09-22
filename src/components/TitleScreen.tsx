import { useState } from 'react'
import { requestFullscreenLandscape } from '../hooks/useForcedLandscape'
import { useSoundContext } from '../context/SoundContext'
import { useSettingsContext } from '../context/SettingsContext'
import SettingsModal from './SettingsModal'
import styles from './TitleScreen.module.css'

export default function TitleScreen({
  onStart,
  onProgress,
}: {
  onStart: () => void
  onProgress: () => void
}) {
  const sound = useSoundContext()
  const { retryOnMiss, practiceMode } = useSettingsContext()
  const [showSettings, setShowSettings] = useState(false)

  const handleStart = () => {
    sound.unlock()
    sound.click()
    void requestFullscreenLandscape()
    onStart()
  }

  return (
    <div className={styles.screen}>
      <div className={`${styles.orb} ${styles.orb1}`} />
      <div className={`${styles.orb} ${styles.orb2}`} />

      <div className={styles.settingsRow}>
        <button
          className={`${styles.iconButton} ${sound.sfxOn ? '' : styles.off}`}
          onClick={() => {
            sound.unlock()
            sound.toggleSfx()
          }}
          aria-label="効果音の切り替え"
          title={sound.sfxOn ? '音声: ON' : '音声: OFF'}
        >
          {sound.sfxOn ? '🔊' : '🔈'}
        </button>
        <button
          className={styles.settingsButton}
          onClick={() => {
            sound.click()
            setShowSettings(true)
          }}
          aria-label="ゲーム設定を開く"
        >
          ⚙️ 設定
        </button>
      </div>

      <div className={styles.tileRow}>
        <div className={styles.tile}>英</div>
        <div className={styles.tile}>単</div>
        <div className={styles.tile}>語</div>
      </div>

      <h1 className={styles.title}>英単語ならべ</h1>
      <p className={styles.subtitle}>並べかえて 英文を 作ろう！</p>

      <button className={styles.startButton} onClick={handleStart}>
        ▶ 始める
      </button>

      <div className={styles.badgeRow}>
        <button
          className={`${styles.badge} ${styles.badgeButton}`}
          onClick={() => {
            sound.click()
            setShowSettings(true)
          }}
          title="クリックして設定を変更"
        >
          {retryOnMiss ? '🔄 やり直しモード' : '⏩ 一発勝負モード'}
          {practiceMode && '・練習'}
        </button>
        <button
          className={`${styles.badge} ${styles.badgeButton}`}
          onClick={() => {
            sound.click()
            onProgress()
          }}
        >
          📈 成長記録
        </button>
      </div>

      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  )
}
