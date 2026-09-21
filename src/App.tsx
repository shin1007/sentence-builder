import { useCallback, useState } from 'react'
import { useForcedLandscape } from './hooks/useForcedLandscape'
import { SoundProvider, useSoundContext } from './context/SoundContext'
import { SettingsProvider } from './context/SettingsContext'
import TitleScreen from './components/TitleScreen'
import LevelSelect from './components/LevelSelect'
import GameScreen from './components/GameScreen'
import ResultScreen from './components/ResultScreen'
import AchievementsScreen from './components/AchievementsScreen'
import type { LevelId, LevelResult } from './types'
import type { Achievement } from './utils/achievements'
import './styles/global.css'

type Screen =
  | { name: 'title' }
  | { name: 'levelSelect' }
  | { name: 'game'; levelId: LevelId }
  | {
      name: 'result'
      result: LevelResult
      isNewBest: boolean
      newAchievements: Achievement[]
    }
  | { name: 'achievements' }

function Shell() {
  const [screen, setScreen] = useState<Screen>({ name: 'title' })
  const sound = useSoundContext()

  const goTitle = useCallback(() => setScreen({ name: 'title' }), [])
  const goLevelSelect = useCallback(() => setScreen({ name: 'levelSelect' }), [])
  const goGame = useCallback((levelId: LevelId) => setScreen({ name: 'game', levelId }), [])
  const goAchievements = useCallback(() => setScreen({ name: 'achievements' }), [])
  const goResult = useCallback(
    (result: LevelResult, isNewBest: boolean, newAchievements: Achievement[]) =>
      setScreen({ name: 'result', result, isNewBest, newAchievements }),
    [],
  )

  const handleFirstPointer = useCallback(() => {
    sound.unlock()
  }, [sound])

  return (
    <div className="app-canvas" onPointerDown={handleFirstPointer}>
      {screen.name === 'title' && (
        <TitleScreen onStart={goLevelSelect} onAchievements={goAchievements} />
      )}
      {screen.name === 'levelSelect' && <LevelSelect onSelect={goGame} onBack={goTitle} />}
      {screen.name === 'game' && (
        <GameScreen levelId={screen.levelId} onFinish={goResult} onExit={goLevelSelect} />
      )}
      {screen.name === 'result' && (
        <ResultScreen
          result={screen.result}
          isNewBest={screen.isNewBest}
          newAchievements={screen.newAchievements}
          onRetry={() => goGame(screen.result.levelId)}
          onLevelSelect={goLevelSelect}
        />
      )}
      {screen.name === 'achievements' && <AchievementsScreen onBack={goTitle} />}
    </div>
  )
}

export default function App() {
  const isPortrait = useForcedLandscape()

  return (
    <div className={`app-root ${isPortrait ? 'is-portrait' : 'is-landscape'}`}>
      <SoundProvider>
        <SettingsProvider>
          <Shell />
        </SettingsProvider>
      </SoundProvider>
    </div>
  )
}
