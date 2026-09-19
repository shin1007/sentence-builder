import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { useGameSettings } from '../hooks/useGameSettings'

type SettingsApi = ReturnType<typeof useGameSettings>

const SettingsContext = createContext<SettingsApi | null>(null)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const settings = useGameSettings()
  const value = useMemo(() => settings, [settings])
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export function useSettingsContext(): SettingsApi {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettingsContext must be used within SettingsProvider')
  return ctx
}
