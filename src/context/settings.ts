import { createContext, useContext } from 'react'
import type { useGameSettings } from '../hooks/useGameSettings'

export type SettingsApi = ReturnType<typeof useGameSettings>

/**
 * Kept apart from SettingsContext.tsx so that file exports only its provider
 * component — a module mixing components with other exports opts out of React
 * Fast Refresh.
 */
export const SettingsContext = createContext<SettingsApi | null>(null)

export function useSettingsContext(): SettingsApi {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettingsContext must be used within SettingsProvider')
  return ctx
}
