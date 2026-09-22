import { useCallback, useState } from 'react'
import { useForcedLandscape } from './hooks/useForcedLandscape'
import { SoundProvider } from './context/SoundContext'
import { useSoundContext } from './context/sound'
import { SettingsProvider } from './context/SettingsContext'
import TitleScreen from './components/TitleScreen'
import LevelSelect from './components/LevelSelect'
import GameScreen from './components/GameScreen'
import ResultScreen from './components/ResultScreen'
import ProgressScreen from './components/ProgressScreen'
import type { GameMode, LevelId, LevelResult } from './types'
import './styles/global.css'

type Screen =
  | { name: 'title' }
  | { name: 'levelSelect'; mode: GameMode }
  | { name: 'game'; levelId: LevelId; mode: GameMode }
  | { name: 'result'; result: LevelResult; isNewBest: boolean }
  | { name: 'progress' }

function Shell() {
  const [screen, setScreen] = useState<Screen>({ name: 'title' })
  const sound = useSoundContext()

  const goTitle = useCallback(() => setScreen({ name: 'title' }), [])
  const goLevelSelect = useCallback(
    (mode: GameMode) => setScreen({ name: 'levelSelect', mode }),
    [],
  )
  const goGame = useCallback(
    (levelId: LevelId, mode: GameMode) => setScreen({ name: 'game', levelId, mode }),
    [],
  )
  const goProgress = useCallback(() => setScreen({ name: 'progress' }), [])
  const goResult = useCallback(
    (result: LevelResult, isNewBest: boolean) =>
      setScreen({ name: 'result', result, isNewBest }),
    [],
  )

  const handleFirstPointer = useCallback(() => {
    sound.unlock()
  }, [sound])

  return (
    <div className="app-canvas" onPointerDown={handleFirstPointer}>
      {screen.name === 'title' && (
        <TitleScreen onStart={goLevelSelect} onProgress={goProgress} />
      )}
      {screen.name === 'levelSelect' && (
        <LevelSelect
          mode={screen.mode}
          onSelect={(levelId) => goGame(levelId, screen.mode)}
          onBack={goTitle}
        />
      )}
      {screen.name === 'game' && (
        <GameScreen
          levelId={screen.levelId}
          mode={screen.mode}
          onFinish={goResult}
          onExit={() => goLevelSelect(screen.mode)}
        />
      )}
      {screen.name === 'result' && (
        <ResultScreen
          result={screen.result}
          isNewBest={screen.isNewBest}
          onRetry={() => goGame(screen.result.levelId, screen.result.mode ?? 'challenge')}
          onLevelSelect={() => goLevelSelect(screen.result.mode ?? 'challenge')}
        />
      )}
      {screen.name === 'progress' && <ProgressScreen onBack={goTitle} />}
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
