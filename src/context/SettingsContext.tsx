import { useMemo, type ReactNode } from 'react'
import { useGameSettings } from '../hooks/useGameSettings'
import { SettingsContext } from './settings'

export function SettingsProvider({ children }: { children: ReactNode }) {
  const settings = useGameSettings()
  const value = useMemo(() => settings, [settings])
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}
