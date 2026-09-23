import { GRAMMAR_BY_ID, type GrammarId } from '../data/grammar'
import type { LevelId } from '../types'

/**
 * Per-grammar accuracy, so the progress screen can say *what* to practise
 * rather than only how many questions were answered.
 *
 * Tallies are kept per level as well as per grammar point: the same tag can
 * sit in several levels (受動態 in both 英検3級 and 準2級), and a practice run
 * has to be launched inside one level — its time limits and question pool are
 * level-bound. Each question counts once per session, on its first result: a
 * miss that's later recovered in the same run is still a miss here, since
 * "got it on the first go" is the signal for whether the point has stuck.
 *
 * Accuracy is judged over the last RECENT_WINDOW results only, not the
 * lifetime total. A point the player has since got the hang of should stop
 * being "weak" (and stop being drawn extra often, see grammarWeights) once
 * they're getting it right, not only after enough right answers to outweigh
 * every early miss.
 */

const KEY = 'wordrush.grammar'

/** Below this many attempts an accuracy figure is mostly noise, so the point
 * isn't ranked as weak yet. */
export const MIN_ATTEMPTS_FOR_RANKING = 3

/** How many of the latest results per level×grammar accuracy is taken over. */
export const RECENT_WINDOW = 10

interface Tally {
  /** Lifetime totals. */
  attempts: number
  correct: number
  /** The latest results, oldest first, at most RECENT_WINDOW long: 1 = correct. */
  recent: (0 | 1)[]
}

type Store = Record<string, Tally>

export interface GrammarStat {
  levelId: LevelId
  grammar: GrammarId
  /** Results in the recent window (at most RECENT_WINDOW). */
  attempts: number
  /** Correct results in the recent window. */
  correct: number
  /** correct / attempts over the recent window, 0–1. */
  accuracy: number
  /** Lifetime attempts, however long ago. */
  totalAttempts: number
}

const keyFor = (levelId: LevelId, grammar: GrammarId) => `${levelId}:${grammar}`

interface LegacyTally {
  attempts: number
  correct: number
}

function isLegacyTally(value: unknown): value is LegacyTally {
  return (
    !!value &&
    typeof value === 'object' &&
    typeof (value as LegacyTally).attempts === 'number' &&
    typeof (value as LegacyTally).correct === 'number'
  )
}

/**
 * Reads a stored tally. Tallies saved before the recent window existed carry
 * only lifetime totals, with no record of order, so the window is rebuilt at
 * the same accuracy (up to RECENT_WINDOW results) rather than dropping them.
 */
function toTally(value: unknown): Tally | null {
  if (!isLegacyTally(value)) return null
  const recent = (value as Partial<Tally>).recent
  if (Array.isArray(recent) && recent.every((r) => r === 0 || r === 1)) {
    return { attempts: value.attempts, correct: value.correct, recent: recent.slice(-RECENT_WINDOW) }
  }
  const size = Math.min(value.attempts, RECENT_WINDOW)
  const correct = value.attempts > 0 ? Math.round((value.correct / value.attempts) * size) : 0
  return {
    attempts: value.attempts,
    correct: value.correct,
    recent: [...new Array<0>(size - correct).fill(0), ...new Array<1>(correct).fill(1)],
  }
}

function readStore(): Store {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return {}
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return {}
    const store: Store = {}
    for (const [key, value] of Object.entries(parsed)) {
      const tally = toTally(value)
      if (tally) store[key] = tally
    }
    return store
  } catch {
    return {}
  }
}

function writeStore(store: Store) {
  try {
    localStorage.setItem(KEY, JSON.stringify(store))
  } catch {
    /* storage unavailable — stats just won't persist */
  }
}

/** Records the first result of one question in a session. */
export function recordGrammarResult(levelId: LevelId, grammar: GrammarId, correct: boolean) {
  const store = readStore()
  const key = keyFor(levelId, grammar)
  const prev = store[key] ?? { attempts: 0, correct: 0, recent: [] }
  store[key] = {
    attempts: prev.attempts + 1,
    correct: prev.correct + (correct ? 1 : 0),
    recent: [...prev.recent, correct ? 1 : 0].slice(-RECENT_WINDOW) as (0 | 1)[],
  }
  writeStore(store)
}

export function loadGrammarStats(): GrammarStat[] {
  const stats: GrammarStat[] = []
  for (const [key, tally] of Object.entries(readStore())) {
    const [levelId, grammar] = key.split(':') as [LevelId, GrammarId]
    // A tag renamed or dropped from the ledger since it was recorded.
    if (!GRAMMAR_BY_ID[grammar] || tally.recent.length === 0) continue
    const correct = tally.recent.reduce<number>((sum, r) => sum + r, 0)
    stats.push({
      levelId,
      grammar,
      attempts: tally.recent.length,
      correct,
      accuracy: correct / tally.recent.length,
      totalAttempts: tally.attempts,
    })
  }
  return stats
}

/**
 * The grammar points the player is shakiest on, least accurate first. Only
 * points tried at least MIN_ATTEMPTS_FOR_RANKING times are ranked, and a point
 * answered perfectly isn't "weak" however often it was seen. Ties go to the
 * more-attempted point, whose low accuracy is the more reliable.
 */
export function loadWeakGrammar(limit = 5): GrammarStat[] {
  return loadGrammarStats()
    .filter((stat) => stat.attempts >= MIN_ATTEMPTS_FOR_RANKING && stat.accuracy < 1)
    .sort((a, b) => a.accuracy - b.accuracy || b.attempts - a.attempts)
    .slice(0, limit)
}

/** Draw weight for a grammar point the player hasn't answered yet on a
 * level: a little above neutral, so new points get tried rather than
 * crowded out by review. */
export const UNSEEN_GRAMMAR_WEIGHT = 1.3
/** Weight for a point answered right every time lately. */
export const MASTERED_GRAMMAR_WEIGHT = 0.4
/** Weight for a point answered wrong every time lately. */
export const WEAKEST_GRAMMAR_WEIGHT = 2

/**
 * How strongly a normal run's random draw should favour each grammar point on
 * this level (see pickQuestions): from WEAKEST_GRAMMAR_WEIGHT for a point
 * missed every time lately down to MASTERED_GRAMMAR_WEIGHT for one got right
 * every time, linear in recent accuracy. Below MIN_ATTEMPTS_FOR_RANKING
 * results the figure is mostly noise, so it's pulled toward neutral (1) in
 * proportion to how few there are. Points never answered on this level get
 * UNSEEN_GRAMMAR_WEIGHT.
 */
export function grammarWeights(levelId: LevelId): Partial<Record<GrammarId, number>> {
  const weights: Partial<Record<GrammarId, number>> = {}
  for (const grammar of Object.keys(GRAMMAR_BY_ID) as GrammarId[]) weights[grammar] = UNSEEN_GRAMMAR_WEIGHT
  for (const stat of loadGrammarStats()) {
    if (stat.levelId !== levelId) continue
    const byAccuracy = WEAKEST_GRAMMAR_WEIGHT - (WEAKEST_GRAMMAR_WEIGHT - MASTERED_GRAMMAR_WEIGHT) * stat.accuracy
    const confidence = Math.min(1, stat.attempts / MIN_ATTEMPTS_FOR_RANKING)
    weights[stat.grammar] = 1 + (byAccuracy - 1) * confidence
  }
  return weights
}

export function resetGrammarStats() {
  writeStore({})
}
