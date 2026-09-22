import type { LevelInfo } from '../types'

/**
 * Seconds granted before the per-word allowance, covering the part of a
 * question that doesn't scale with sentence length: reading the Japanese
 * prompt and working out the construction to aim for.
 *
 * Deliberately shared by every level. Higher-level prompts are somewhat
 * longer to read, but the dial that's meant to express difficulty is
 * `secPerWord` — keeping the base fixed makes that the only knob, so the
 * curve stays readable.
 */
export const BASE_TIME_SEC = 7

/**
 * How long a question is given, from the level's per-word rate.
 *
 * Levels used to carry one fixed `timeLimitSec` each, which produced a
 * difficulty curve that ran backwards. The limit shrank as the level rose
 * (26s → 19s) while sentences grew (5.2 → 8.2 words on average), so the time
 * available *per word* fell from ~5.0s to ~2.3s: higher levels were squeezed
 * from both ends at once. It was uneven inside a level too, since a 5-word
 * and a 12-word question in the same bank shared one budget.
 *
 * Scaling with the actual word count fixes both. The per-word rate still
 * falls as the level rises, so there's a real gradient — it's just a gradient
 * that was chosen rather than one that fell out of two unrelated numbers.
 */
export function timeLimitFor(level: LevelInfo, wordCount: number): number {
  return Math.round(BASE_TIME_SEC + level.secPerWord * wordCount)
}
