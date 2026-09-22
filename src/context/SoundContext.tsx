import { useMemo, type ReactNode } from 'react'
import { useSound } from '../hooks/useSound'
import { SoundContext } from './sound'

export function SoundProvider({ children }: { children: ReactNode }) {
  const sound = useSound()
  const value = useMemo(() => sound, [sound])
  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
}
