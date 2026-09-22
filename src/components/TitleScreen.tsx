import { useState } from 'react'
import { requestFullscreenLandscape } from '../hooks/useForcedLandscape'
import { useSoundContext } from '../context/sound'
import { useSettingsContext } from '../context/settings'
import SettingsModal from './SettingsModal'
import { MODE_LABEL } from '../data/modes'
import type { GameMode } from '../types'
import styles from './TitleScreen.module.css'

export default function TitleScreen({
  onStart,
  onProgress,
}: {
  onStart: (mode: GameMode) => void
  onProgress: () => void
}) {
  const sound = useSoundContext()
  const { retryOnMiss, practiceMode } = useSettingsContext()
  const [showSettings, setShowSettings] = useState(false)

  const handleStart = (mode: GameMode) => {
    sound.unlock()
    sound.click()
    void requestFullscreenLandscape()
    onStart(mode)
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

      <div className={styles.modeRow}>
        <button
          className={`${styles.startButton} ${styles.challenge}`}
          onClick={() => handleStart('challenge')}
        >
          <span className={styles.modeTitle}>▶ {MODE_LABEL.challenge}</span>
          <span className={styles.modeHint}>10問で スコアを きそう</span>
        </button>
        <button
          className={`${styles.startButton} ${styles.endless}`}
          onClick={() => handleStart('endless')}
        >
          <span className={styles.modeTitle}>∞ {MODE_LABEL.endless}</span>
          <span className={styles.modeHint}>やめるまで 出題しつづける</span>
        </button>
      </div>

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
