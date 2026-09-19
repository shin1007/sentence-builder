import { useEffect, useState } from 'react'

const CAPITALIZE_KEY = 'wordrush.capitalizeFirst'
const PRACTICE_MODE_KEY = 'wordrush.practiceMode'

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
  // Practice mode drops the timer and hearts so a learner can take their
  // time on each question without risking an early game-over.
  const [practiceMode, setPracticeMode] = useState(() => readBool(PRACTICE_MODE_KEY, false))

  useEffect(() => {
    try {
      localStorage.setItem(CAPITALIZE_KEY, capitalizeFirst ? '1' : '0')
    } catch {
      /* storage unavailable — preference just won't persist */
    }
  }, [capitalizeFirst])

  useEffect(() => {
    try {
      localStorage.setItem(PRACTICE_MODE_KEY, practiceMode ? '1' : '0')
    } catch {
      /* storage unavailable — preference just won't persist */
    }
  }, [practiceMode])

  return {
    capitalizeFirst,
    toggleCapitalizeFirst: () => setCapitalizeFirst((v) => !v),
    practiceMode,
    togglePracticeMode: () => setPracticeMode((v) => !v),
  }
}
