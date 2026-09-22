import { describe, expect, it } from 'vitest'
import { MIN_RANKED_QUESTIONS, QUESTIONS_PER_SESSION, calcStars } from './scoring'

describe('calcStars', () => {
  it('awards 3 stars at 90% accuracy or better', () => {
    expect(calcStars(10, 10)).toBe(3)
    expect(calcStars(9, 10)).toBe(3)
    expect(calcStars(18, 20)).toBe(3)
  })

  it('awards 2 stars from 70% up to 90%', () => {
    expect(calcStars(7, 10)).toBe(2)
    expect(calcStars(8, 10)).toBe(2)
  })

  it('awards 1 star from 40% up to 70%', () => {
    expect(calcStars(4, 10)).toBe(1)
    expect(calcStars(6, 10)).toBe(1)
  })

  it('awards no stars below 40%', () => {
    expect(calcStars(3, 10)).toBe(0)
    expect(calcStars(0, 10)).toBe(0)
  })

  it('gives no stars to a run shorter than the ranked minimum', () => {
    // An endless run stopped early is 100% accurate but must not out-rank a
    // full session — this is what keeps the shared best-score record honest.
    for (let total = 1; total < MIN_RANKED_QUESTIONS; total++) {
      expect(calcStars(total, total)).toBe(0)
    }
  })

  it('ranks a long endless run on accuracy, same as a challenge run', () => {
    expect(calcStars(40, 42)).toBe(3)
    expect(calcStars(30, 42)).toBe(2)
    expect(calcStars(20, 42)).toBe(1)
    expect(calcStars(5, 42)).toBe(0)
  })

  it('keeps the ranked minimum aligned with a full challenge session', () => {
    expect(MIN_RANKED_QUESTIONS).toBe(QUESTIONS_PER_SESSION)
  })
})
