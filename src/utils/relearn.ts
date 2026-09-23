/**
 * Missed questions come back later in the same run ("🔁 もう一回"): being
 * shown the answer once and moving on leaves it at recognition, while
 * retrieving it again a few questions later — after other sentences have
 * pushed it out of short-term memory — is what makes it stick. The spaced
 * review queue then picks it up on later days.
 */

/** How many other questions to play before a missed one comes back. */
export const RELEARN_GAP = 3
/** Most repeats a fixed-length run adds, so a rough run doesn't double in length. */
export const MAX_RELEARN_PER_RUN = 5

export type Relearnable<T> = T & { relearn?: boolean }

/**
 * Returns `queue` with a repeat of `queue[index]` inserted RELEARN_GAP
 * questions later (or at the end, if the queue runs out first). The copy is
 * marked `relearn` so it isn't scored or repeated again.
 */
export function insertRelearn<T extends object>(queue: readonly Relearnable<T>[], index: number): Relearnable<T>[] {
  const at = Math.min(index + 1 + RELEARN_GAP, queue.length)
  const repeat: Relearnable<T> = { ...queue[index], relearn: true }
  return [...queue.slice(0, at), repeat, ...queue.slice(at)]
}

/** Scored (non-repeat) questions in `queue[0..end)`. */
export function countScored(queue: readonly { relearn?: boolean }[], end = queue.length): number {
  let count = 0
  for (let i = 0; i < end && i < queue.length; i++) if (!queue[i].relearn) count++
  return count
}
