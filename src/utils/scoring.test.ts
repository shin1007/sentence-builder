import { describe, expect, it } from 'vitest'
import {
  MIN_RANKED_QUESTIONS,
  QUESTIONS_PER_SESSION,
  calcStars,
  normalizedScore,
} from './scoring'

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

describe('normalizedScore', () => {
  it('leaves a full challenge run untouched', () => {
    // A 10-question run is already the yardstick, so its own score is its
    // normalized score — old records keep the number they were saved with.
    expect(normalizedScore(1240, 10)).toBe(1240)
    expect(normalizedScore(0, 10)).toBe(0)
  })

  it('scales an endless run down to its 10-question equivalent', () => {
    expect(normalizedScore(8930, 42)).toBe(2126)
    expect(normalizedScore(600, 60)).toBe(100)
  })

  it('stops a long sloppy run from out-ranking a short sharp one', () => {
    // 60 questions at 100/question loses to 10 questions at 300/question,
    // even though its raw total is twice as big.
    const sloppyEndless = normalizedScore(6000, 60)
    const sharpChallenge = normalizedScore(3000, 10)
    expect(6000).toBeGreaterThan(3000)
    expect(sloppyEndless).toBeLessThan(sharpChallenge)
  })

  it('ranks two endless runs of different lengths on quality, not length', () => {
    expect(normalizedScore(2000, 10)).toBe(normalizedScore(10000, 50))
  })

  it('returns 0 rather than dividing by zero', () => {
    expect(normalizedScore(500, 0)).toBe(0)
    expect(normalizedScore(500, -1)).toBe(0)
  })
})
