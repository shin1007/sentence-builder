import { useEffect, useState } from 'react'

const CAPITALIZE_KEY = 'wordrush.capitalizeFirst'

function readBool(key: string, fallback: boolean) {
  try {
    const raw = localStorage.getItem(key)
    return raw === null ? fallback : raw === '1'
  } catch {
    return fallback
  }
}

export function useGameSettings() {
  const [capitalizeFirst, setCapitalizeFirst] = useState(() => readBool(CAPITALIZE_KEY, true))

  useEffect(() => {
    try {
      localStorage.setItem(CAPITALIZE_KEY, capitalizeFirst ? '1' : '0')
    } catch {
      /* storage unavailable — preference just won't persist */
    }
  }, [capitalizeFirst])

  return {
    capitalizeFirst,
    toggleCapitalizeFirst: () => setCapitalizeFirst((v) => !v),
  }
}
