import { requestFullscreenLandscape } from '../hooks/useForcedLandscape'
import { useSoundContext } from '../context/SoundContext'
import { useSettingsContext } from '../context/SettingsContext'
import { getDailyStatus } from '../utils/dailyChallenge'
import styles from './TitleScreen.module.css'

export default function TitleScreen({
  onStart,
  onDaily,
  onAchievements,
}: {
  onStart: () => void
  onDaily: () => void
  onAchievements: () => void
}) {
  const sound = useSoundContext()
  const { capitalizeFirst, toggleCapitalizeFirst, practiceMode, togglePracticeMode } = useSettingsContext()
  const dailyStatus = getDailyStatus()

  const handleStart = () => {
    sound.unlock()
    sound.click()
    void requestFullscreenLandscape()
    onStart()
  }

  const handleDaily = () => {
    sound.unlock()
    sound.click()
    void requestFullscreenLandscape()
    onDaily()
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
        >
          {sound.sfxOn ? '🔊' : '🔈'}
        </button>
        <button
          className={`${styles.iconButton} ${sound.musicOn ? '' : styles.off}`}
          onClick={() => {
            sound.unlock()
            sound.toggleMusic()
          }}
          aria-label="音楽の切り替え"
        >
          {sound.musicOn ? '🎵' : '🚫'}
        </button>
        <button
          className={`${styles.iconButton} ${styles.textIcon} ${capitalizeFirst ? '' : styles.off}`}
          onClick={toggleCapitalizeFirst}
          aria-label="文頭を大文字にするかの切り替え"
          title="文頭を大文字にするか"
        >
          {capitalizeFirst ? 'Aa' : 'aa'}
        </button>
        <button
          className={`${styles.iconButton} ${practiceMode ? '' : styles.off}`}
          onClick={togglePracticeMode}
          aria-label="れんしゅうモード（タイマー・ハートなし）の切り替え"
          title="れんしゅうモード（タイマー・ハートなし）"
        >
          🧪
        </button>
      </div>

      <div className={styles.tileRow}>
        <div className={styles.tile}>A</div>
        <div className={styles.tile}>B</div>
        <div className={styles.tile}>C</div>
      </div>

      <h1 className={styles.title}>ワードオーダー・ラッシュ</h1>
      <p className={styles.subtitle}>ならべかえて えいぶんを つくろう！</p>

      <button className={styles.startButton} onClick={handleStart}>
        ▶ はじめる
      </button>

      <div className={styles.badgeRow}>
        <span className={styles.badge}>📱 横画面プレイ</span>
        <span className={styles.badge}>📡 オフライン対応</span>
        <button className={`${styles.badge} ${styles.badgeButton}`} onClick={handleDaily}>
          📅 デイリー
          {dailyStatus.streak > 0 && ` 🔥${dailyStatus.streak}`}
          {dailyStatus.clearedToday && ' ✓'}
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
    </div>
  )
}
