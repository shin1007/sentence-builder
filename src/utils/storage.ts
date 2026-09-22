import { normalizedScore } from './scoring'
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

/**
 * Persists the result if it beats the stored best. Returns true on a new best.
 *
 * Runs are compared on their 10-question-normalized score, not raw total, so
 * a long endless run can't win on length alone. Records saved before endless
 * mode existed were all 10-question runs, so their normalized score equals
 * the raw score they were stored with.
 */
export function saveBestResultIfBetter(result: LevelResult): boolean {
  try {
    const existing = loadBestResult(result.levelId)
    const isBetter =
      !existing ||
      normalizedScore(result.score, result.totalCount) >
        normalizedScore(existing.score, existing.totalCount)
    if (isBetter) {
      localStorage.setItem(KEY_PREFIX + result.levelId, JSON.stringify(result))
      return true
    }
  } catch {
    /* storage unavailable — session still works, just without a saved best */
  }
  return false
}
