import type { LevelId } from '../types'

const KEY_PREFIX = 'wordrush.solved.'

const DAY_MS = 24 * 60 * 60 * 1000

/**
 * How long a sentence answered cleanly stays pushed to the back of the draw.
 *
 * A clean answer means the sentence is known, and serving it again soon only
 * spends a slot on something the player can already do — or lets them pass by
 * remembering that sentence's tile order rather than the grammar. After this
 * long it's back to an ordinary draw, which doubles as a light check that it
 * has stuck.
 */
export const SOLVED_REST_DAYS = 30

/**
 * Draw weight for a sentence inside its rest period, relative to 1 for one
 * not recently solved. Low rather than zero: once most of a level has been
 * solved, these still fill a session instead of it coming up short.
 */
export const RECENTLY_SOLVED_WEIGHT = 0.1

/** Epoch ms of the last clean answer, per question id. */
type Solved = Record<string, number>

function read(levelId: LevelId): Solved {
  try {
    const raw = localStorage.getItem(KEY_PREFIX + levelId)
    if (!raw) return {}
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {}
    return Object.fromEntries(
      Object.entries(parsed).filter((entry): entry is [string, number] => typeof entry[1] === 'number'),
    )
  } catch {
    return {}
  }
}

function write(levelId: LevelId, solved: Solved) {
  try {
    localStorage.setItem(KEY_PREFIX + levelId, JSON.stringify(solved))
  } catch {
    /* storage unavailable — draws just stay unaware of what was solved */
  }
}

/** Drops entries past their rest period so the record only holds what still
 * affects the draw. */
function prune(solved: Solved, now: number): Solved {
  const cutoff = now - SOLVED_REST_DAYS * DAY_MS
  return Object.fromEntries(Object.entries(solved).filter(([, at]) => at > cutoff))
}

/**
 * A first-try, unhesitating correct answer. Shaky answers (see isShakyAnswer)
 * and answers after a miss don't count: those sentences aren't known yet and
 * should keep coming up.
 */
export function recordSolved(levelId: LevelId, questionId: string, now = Date.now()) {
  const solved = prune(read(levelId), now)
  solved[questionId] = now
  write(levelId, solved)
}

/** A miss on a sentence means it isn't known after all; it goes back to an
 * ordinary draw straight away. */
export function forgetSolved(levelId: LevelId, questionId: string) {
  const solved = read(levelId)
  if (!(questionId in solved)) return
  delete solved[questionId]
  write(levelId, solved)
}

/** Ids of this level's sentences still inside their rest period. */
export function recentlySolvedIds(levelId: LevelId, now = Date.now()): Set<string> {
  return new Set(Object.keys(prune(read(levelId), now)))
}
