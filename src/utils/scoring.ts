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
 * A run's score rescaled to what it would be over a full 10-question session.
 *
 * Both modes share one best-score record per level, and raw score is a
 * running total — so a 60-question endless run always out-totals a 10-question
 * one no matter how carelessly it was played, which would turn "ベストスコア"
 * into "longest session". Normalizing per question and scaling back up to ten
 * keeps the number in the range players already know (a challenge run's
 * normalized score is exactly its own score) while making the two modes
 * comparable.
 */
export function normalizedScore(score: number, totalCount: number): number {
  if (totalCount <= 0) return 0
  return Math.round((score / totalCount) * QUESTIONS_PER_SESSION)
}

/**
 * Stars from answer accuracy: 3 at 90%+, 2 at 70%+, 1 at 40%+.
 * Returns 0 for runs too short to rank (see MIN_RANKED_QUESTIONS).
 */
export function calcStars(correctCount: number, totalCount: number): 0 | 1 | 2 | 3 {
  if (totalCount < MIN_RANKED_QUESTIONS) return 0
  const accuracy = correctCount / totalCount
  return accuracy >= 0.9 ? 3 : accuracy >= 0.7 ? 2 : accuracy >= 0.4 ? 1 : 0
}
