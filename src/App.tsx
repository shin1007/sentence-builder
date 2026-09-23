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
import type { FocusSession, GameMode, LevelId, LevelResult, MissedQuestion } from './types'
import './styles/global.css'

type Screen =
  | { name: 'title' }
  | { name: 'levelSelect'; mode: GameMode }
  | { name: 'game'; levelId: LevelId; mode: GameMode; focus?: FocusSession }
  | { name: 'result'; result: LevelResult; isNewBest: boolean; missed: MissedQuestion[]; focus?: FocusSession }
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
    (levelId: LevelId, mode: GameMode, focus?: FocusSession) =>
      setScreen({ name: 'game', levelId, mode, focus }),
    [],
  )
  const goProgress = useCallback(() => setScreen({ name: 'progress' }), [])

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
          focus={screen.focus}
          onFinish={(result, isNewBest, missed) =>
            setScreen({ name: 'result', result, isNewBest, missed, focus: screen.focus })
          }
          // A grammar drill is launched from the progress screen, so backing
          // out returns there rather than to a level picker never visited.
          onExit={() => (screen.focus?.kind === 'grammar' ? goProgress() : goLevelSelect(screen.mode))}
        />
      )}
      {screen.name === 'result' && (
        <ResultScreen
          result={screen.result}
          isNewBest={screen.isNewBest}
          missed={screen.missed}
          focus={screen.focus}
          onRetry={() => goGame(screen.result.levelId, screen.result.mode ?? 'challenge', screen.focus)}
          onRetryMissed={(questionIds) =>
            goGame(screen.result.levelId, 'challenge', { kind: 'retryMissed', questionIds })
          }
          onLevelSelect={() => goLevelSelect(screen.result.mode ?? 'challenge')}
          onProgress={goProgress}
        />
      )}
      {screen.name === 'progress' && (
        <ProgressScreen
          onBack={goTitle}
          onPracticeGrammar={(levelId, grammar) => goGame(levelId, 'challenge', { kind: 'grammar', grammar })}
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
