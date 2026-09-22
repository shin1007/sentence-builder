import { createContext, useContext } from 'react'
import type { useSound } from '../hooks/useSound'

export type SoundApi = ReturnType<typeof useSound>

/**
 * Kept apart from SoundContext.tsx so that file exports only its provider
 * component — a module mixing components with other exports opts out of React
 * Fast Refresh.
 */
export const SoundContext = createContext<SoundApi | null>(null)

export function useSoundContext(): SoundApi {
  const ctx = useContext(SoundContext)
  if (!ctx) throw new Error('useSoundContext must be used within SoundProvider')
  return ctx
}
