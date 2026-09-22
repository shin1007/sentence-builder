import { beforeEach, describe, expect, it } from 'vitest'
import { loadBestResult, saveBestResultIfBetter } from './storage'
import type { LevelResult } from '../types'

/** Minimal Storage stand-in — Node has no global localStorage, and pulling in
 * jsdom just for this would be a heavy dependency for one small interface. */
class MemoryStorage {
  private store = new Map<string, string>()
  getItem(key: string) {
    return this.store.has(key) ? this.store.get(key)! : null
  }
  setItem(key: string, value: string) {
    this.store.set(key, value)
  }
}

function makeResult(overrides: Partial<LevelResult> = {}): LevelResult {
  return {
    levelId: 'eiken4',
    score: 100,
    correctCount: 8,
    totalCount: 10,
    bestCombo: 4,
    stars: 2,
    clearedAt: Date.now(),
    ...overrides,
  }
}

describe('storage', () => {
  beforeEach(() => {
    globalThis.localStorage = new MemoryStorage() as unknown as Storage
  })

  it('returns null when nothing has been saved yet', () => {
    expect(loadBestResult('eiken4')).toBeNull()
  })

  it('saves the first result as the new best', () => {
    const result = makeResult({ score: 100 })
    expect(saveBestResultIfBetter(result)).toBe(true)
    expect(loadBestResult('eiken4')).toEqual(result)
  })

  it('keeps the higher-scoring result and reports whether it was a new best', () => {
    saveBestResultIfBetter(makeResult({ score: 100 }))

    expect(saveBestResultIfBetter(makeResult({ score: 50 }))).toBe(false)
    expect(loadBestResult('eiken4')?.score).toBe(100)

    expect(saveBestResultIfBetter(makeResult({ score: 150 }))).toBe(true)
    expect(loadBestResult('eiken4')?.score).toBe(150)
  })

  it('keeps different levels independent', () => {
    saveBestResultIfBetter(makeResult({ levelId: 'eiken4', score: 100 }))
    saveBestResultIfBetter(makeResult({ levelId: 'eiken2', score: 999 }))

    expect(loadBestResult('eiken4')?.score).toBe(100)
    expect(loadBestResult('eiken2')?.score).toBe(999)
  })

  it('returns null instead of throwing when stored data is corrupt', () => {
    localStorage.setItem('wordrush.best.eiken4', '{not json')
    expect(loadBestResult('eiken4')).toBeNull()
  })
})

describe('best-score ranking across game modes', () => {
  beforeEach(() => {
    globalThis.localStorage = new MemoryStorage() as unknown as Storage
  })

  it('does not let a long endless run win on length alone', () => {
    const challenge = makeResult({ mode: 'challenge', score: 3000, totalCount: 10 })
    expect(saveBestResultIfBetter(challenge)).toBe(true)

    // Twice the raw total, but spread over six times as many questions.
    const sloppyEndless = makeResult({ mode: 'endless', score: 6000, totalCount: 60 })
    expect(saveBestResultIfBetter(sloppyEndless)).toBe(false)
    expect(loadBestResult('eiken4')).toEqual(challenge)
  })

  it('accepts an endless run that is genuinely better per question', () => {
    const challenge = makeResult({ mode: 'challenge', score: 1000, totalCount: 10 })
    saveBestResultIfBetter(challenge)

    const sharpEndless = makeResult({ mode: 'endless', score: 4500, totalCount: 30 })
    expect(saveBestResultIfBetter(sharpEndless)).toBe(true)
    expect(loadBestResult('eiken4')).toEqual(sharpEndless)
  })

  it('compares a record saved before endless mode on the same footing', () => {
    // Pre-endless records have no `mode` but do carry totalCount: 10, so they
    // normalize to exactly the score they were stored with.
    const legacy = makeResult({ score: 2000, totalCount: 10 })
    delete legacy.mode
    saveBestResultIfBetter(legacy)

    expect(saveBestResultIfBetter(makeResult({ mode: 'endless', score: 5700, totalCount: 30 }))).toBe(
      false,
    )
    expect(saveBestResultIfBetter(makeResult({ mode: 'endless', score: 6300, totalCount: 30 }))).toBe(
      true,
    )
  })
})
