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
 */

const KEY = 'wordrush.grammar'

/** Below this many attempts an accuracy figure is mostly noise, so the point
 * isn't ranked as weak yet. */
export const MIN_ATTEMPTS_FOR_RANKING = 3

interface Tally {
  attempts: number
  correct: number
}

type Store = Record<string, Tally>

export interface GrammarStat {
  levelId: LevelId
  grammar: GrammarId
  attempts: number
  correct: number
  /** 0–1. */
  accuracy: number
}

const keyFor = (levelId: LevelId, grammar: GrammarId) => `${levelId}:${grammar}`

function isTally(value: unknown): value is Tally {
  return (
    !!value &&
    typeof value === 'object' &&
    typeof (value as Tally).attempts === 'number' &&
    typeof (value as Tally).correct === 'number'
  )
}

function readStore(): Store {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return {}
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return {}
    const store: Store = {}
    for (const [key, value] of Object.entries(parsed)) {
      if (isTally(value)) store[key] = value
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
  const prev = store[key] ?? { attempts: 0, correct: 0 }
  store[key] = { attempts: prev.attempts + 1, correct: prev.correct + (correct ? 1 : 0) }
  writeStore(store)
}

export function loadGrammarStats(): GrammarStat[] {
  const stats: GrammarStat[] = []
  for (const [key, tally] of Object.entries(readStore())) {
    const [levelId, grammar] = key.split(':') as [LevelId, GrammarId]
    // A tag renamed or dropped from the ledger since it was recorded.
    if (!GRAMMAR_BY_ID[grammar] || tally.attempts <= 0) continue
    stats.push({ levelId, grammar, ...tally, accuracy: tally.correct / tally.attempts })
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

export function resetGrammarStats() {
  writeStore({})
}
