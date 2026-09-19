import type { LevelId } from '../types'

const KEY_PREFIX = 'wordrush.missed.'
/** Caps how many misses we remember per level so the list can't grow
 * forever; the oldest miss is dropped first when it's exceeded. */
const MAX_TRACKED = 30

function readIds(levelId: LevelId): string[] {
  try {
    const raw = localStorage.getItem(KEY_PREFIX + levelId)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : []
  } catch {
    return []
  }
}

function writeIds(levelId: LevelId, ids: string[]) {
  try {
    localStorage.setItem(KEY_PREFIX + levelId, JSON.stringify(ids))
  } catch {
    /* storage unavailable — review history just won't persist */
  }
}

/** Ids of questions the player has gotten wrong on this level and hasn't
 * since answered correctly. Used to bias the next session's question picks
 * toward what they're still shaky on. */
export function loadMissedIds(levelId: LevelId): string[] {
  return readIds(levelId)
}

/** Marks a question as missed, moving it to the front of the review queue
 * if it was already there. */
export function recordMiss(levelId: LevelId, questionId: string) {
  const ids = readIds(levelId).filter((id) => id !== questionId)
  ids.push(questionId)
  writeIds(levelId, ids.slice(-MAX_TRACKED))
}

/** Clears a question from the review queue once it's been answered
 * correctly — it's no longer something to prioritize reviewing. */
export function recordMastered(levelId: LevelId, questionId: string) {
  writeIds(
    levelId,
    readIds(levelId).filter((id) => id !== questionId),
  )
}
