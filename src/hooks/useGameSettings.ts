import { useEffect, useState } from 'react'

const CAPITALIZE_KEY = 'wordrush.capitalizeFirst'
const PRACTICE_MODE_KEY = 'wordrush.practiceMode'
const RETRY_ON_MISS_KEY = 'wordrush.retryOnMiss'
const LISTENING_MODE_KEY = 'wordrush.listeningMode'

function readBool(key: string, fallback: boolean) {
  try {
    const raw = localStorage.getItem(key)
    return raw === null ? fallback : raw === '1'
  } catch {
    return fallback
  }
}

export function useGameSettings() {
  const [capitalizeFirst, setCapitalizeFirst] = useState(() => readBool(CAPITALIZE_KEY, false))
  // Practice mode drops the timer and hearts so a learner can take their
  // time on each question without risking an early game-over.
  const [practiceMode, setPracticeMode] = useState(() => readBool(PRACTICE_MODE_KEY, false))
  // Retry mode (default): returns placed tiles to the tray on wrong word order
  // so the player can retry the question until correct.
  const [retryOnMiss, setRetryOnMiss] = useState(() => readBool(RETRY_ON_MISS_KEY, true))
  // Listening mode hides the Japanese prompt and reads the English sentence
  // instead, so the player builds it from what they heard.
  const [listeningMode, setListeningMode] = useState(() => readBool(LISTENING_MODE_KEY, false))

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

  useEffect(() => {
    try {
      localStorage.setItem(RETRY_ON_MISS_KEY, retryOnMiss ? '1' : '0')
    } catch {
      /* storage unavailable — preference just won't persist */
    }
  }, [retryOnMiss])

  useEffect(() => {
    try {
      localStorage.setItem(LISTENING_MODE_KEY, listeningMode ? '1' : '0')
    } catch {
      /* storage unavailable — preference just won't persist */
    }
  }, [listeningMode])

  return {
    capitalizeFirst,
    toggleCapitalizeFirst: () => setCapitalizeFirst((v) => !v),
    practiceMode,
    togglePracticeMode: () => setPracticeMode((v) => !v),
    retryOnMiss,
    toggleRetryOnMiss: () => setRetryOnMiss((v) => !v),
    listeningMode,
    toggleListeningMode: () => setListeningMode((v) => !v),
  }
}
