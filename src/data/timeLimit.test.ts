import { describe, expect, it } from 'vitest'
import { BASE_TIME_SEC, timeLimitFor } from './timeLimit'
import { LEVELS } from './levels'
import { QUESTIONS, MAX_WORDS_PER_QUESTION } from './questions'

describe('timeLimitFor', () => {
  it('grows with the length of the sentence', () => {
    for (const level of LEVELS) {
      expect(timeLimitFor(level, 10)).toBeGreaterThan(timeLimitFor(level, 5))
    }
  })

  it('gives every level the same per-word rate it declares', () => {
    for (const level of LEVELS) {
      expect(timeLimitFor(level, 4)).toBe(Math.round(BASE_TIME_SEC + level.secPerWord * 4))
    }
  })

  it('keeps a real difficulty gradient across the levels', () => {
    // Later levels are given less time per word — the curve is meant to get
    // tighter as the player improves. What it must not do is invert.
    const rates = LEVELS.map((level) => level.secPerWord)
    const hardest = Math.min(...rates)
    const easiest = Math.max(...rates)
    expect(easiest).toBeGreaterThan(hardest)
    expect(LEVELS[0].secPerWord).toBe(easiest)
  })

  it('leaves every servable question enough time per word to be winnable', () => {
    // The bug this replaced: a 21-word question on a flat 20s limit left
    // under a second per word. Nothing in any bank may drop that low again.
    for (const level of LEVELS) {
      for (const question of QUESTIONS[level.id]) {
        const perWord = timeLimitFor(level, question.words.length) / question.words.length
        expect(perWord).toBeGreaterThan(2)
      }
    }
  })

  it('stays within a sane ceiling for the longest question it can be asked', () => {
    for (const level of LEVELS) {
      expect(timeLimitFor(level, MAX_WORDS_PER_QUESTION)).toBeLessThanOrEqual(60)
    }
  })
})
