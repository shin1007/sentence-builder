import type { LevelId, LevelResult } from '../types'

const KEY_PREFIX = 'wordrush.best.'

export function loadBestResult(levelId: LevelId): LevelResult | null {
  try {
    const raw = localStorage.getItem(KEY_PREFIX + levelId)
    return raw ? (JSON.parse(raw) as LevelResult) : null
  } catch {
    return null
  }
}

/** Persists the result if it beats the stored best. Returns true on a new best. */
export function saveBestResultIfBetter(result: LevelResult): boolean {
  try {
    const existing = loadBestResult(result.levelId)
    if (!existing || result.score > existing.score) {
      localStorage.setItem(KEY_PREFIX + result.levelId, JSON.stringify(result))
      return true
    }
  } catch {
    /* storage unavailable — session still works, just without a saved best */
  }
  return false
}
