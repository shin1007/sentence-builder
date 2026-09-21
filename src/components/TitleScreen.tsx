import { useState } from 'react'
import { requestFullscreenLandscape } from '../hooks/useForcedLandscape'
import { useSoundContext } from '../context/SoundContext'
import { useSettingsContext } from '../context/SettingsContext'
import SettingsModal from './SettingsModal'
import styles from './TitleScreen.module.css'

export default function TitleScreen({
  onStart,
  onAchievements,
}: {
  onStart: () => void
  onAchievements: () => void
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
        <div className={styles.tile}>A</div>
        <div className={styles.tile}>B</div>
        <div className={styles.tile}>C</div>
      </div>

      <h1 className={styles.title}>英単語ならべ</h1>
      <p className={styles.subtitle}>ならべかえて えいぶんを つくろう！</p>

      <button className={styles.startButton} onClick={handleStart}>
        ▶ はじめる
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
          {practiceMode && '・れんしゅう'}
        </button>
        <button
          className={`${styles.badge} ${styles.badgeButton}`}
          onClick={() => {
            sound.click()
            onAchievements()
          }}
        >
          🏆 実績
        </button>
      </div>

      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  )
}
