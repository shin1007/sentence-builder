import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { useSound } from '../hooks/useSound'

type SoundApi = ReturnType<typeof useSound>

const SoundContext = createContext<SoundApi | null>(null)

export function SoundProvider({ children }: { children: ReactNode }) {
  const sound = useSound()
  const value = useMemo(() => sound, [sound])
  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
}

export function useSoundContext(): SoundApi {
  const ctx = useContext(SoundContext)
  if (!ctx) throw new Error('useSoundContext must be used within SoundProvider')
  return ctx
}
