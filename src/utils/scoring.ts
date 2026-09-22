/** A challenge run is always this many questions. */
export const QUESTIONS_PER_SESSION = 10

/**
 * A run scored over fewer than this many questions doesn't earn stars.
 *
 * Endless runs end whenever the player taps やめる, and both modes share one
 * best-score record per level. Without a floor, quitting an endless run after
 * a single correct answer would be 100% accuracy — an instant ★3 that a real
 * 10-question run has to work for.
 */
export const MIN_RANKED_QUESTIONS = QUESTIONS_PER_SESSION

/**
 * Stars from answer accuracy: 3 at 90%+, 2 at 70%+, 1 at 40%+.
 * Returns 0 for runs too short to rank (see MIN_RANKED_QUESTIONS).
 */
export function calcStars(correctCount: number, totalCount: number): 0 | 1 | 2 | 3 {
  if (totalCount < MIN_RANKED_QUESTIONS) return 0
  const accuracy = correctCount / totalCount
  return accuracy >= 0.9 ? 3 : accuracy >= 0.7 ? 2 : accuracy >= 0.4 ? 1 : 0
}
