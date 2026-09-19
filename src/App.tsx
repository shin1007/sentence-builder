import { useCallback, useState } from 'react'
import { useForcedLandscape } from './hooks/useForcedLandscape'
import { SoundProvider, useSoundContext } from './context/SoundContext'
import { SettingsProvider } from './context/SettingsContext'
import TitleScreen from './components/TitleScreen'
import LevelSelect from './components/LevelSelect'
import GameScreen from './components/GameScreen'
import ResultScreen from './components/ResultScreen'
import type { LevelId, LevelResult } from './types'
import './styles/global.css'

type Screen =
  | { name: 'title' }
  | { name: 'levelSelect' }
  | { name: 'game'; levelId: LevelId }
  | { name: 'result'; result: LevelResult; isNewBest: boolean }

function Shell() {
  const [screen, setScreen] = useState<Screen>({ name: 'title' })
  const sound = useSoundContext()

  const goTitle = useCallback(() => setScreen({ name: 'title' }), [])
  const goLevelSelect = useCallback(() => setScreen({ name: 'levelSelect' }), [])
  const goGame = useCallback((levelId: LevelId) => setScreen({ name: 'game', levelId }), [])
  const goResult = useCallback(
    (result: LevelResult, isNewBest: boolean) => setScreen({ name: 'result', result, isNewBest }),
    [],
  )

  const handleFirstPointer = useCallback(() => {
    sound.unlock()
  }, [sound])

  return (
    <div className="app-canvas" onPointerDown={handleFirstPointer}>
      {screen.name === 'title' && <TitleScreen onStart={goLevelSelect} />}
      {screen.name === 'levelSelect' && <LevelSelect onSelect={goGame} onBack={goTitle} />}
      {screen.name === 'game' && (
        <GameScreen levelId={screen.levelId} onFinish={goResult} onExit={goLevelSelect} />
      )}
      {screen.name === 'result' && (
        <ResultScreen
          result={screen.result}
          isNewBest={screen.isNewBest}
          onRetry={() => goGame(screen.result.levelId)}
          onLevelSelect={goLevelSelect}
        />
      )}
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
