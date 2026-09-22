import { beforeEach, describe, expect, it } from 'vitest'
import {
  loadProgressRecord,
  recordFirstTry,
  recordMissedOnly,
  recordRecovered,
  resetProgress,
} from './progressStats'

/** Minimal Storage stand-in — see storage.test.ts for why this is a manual
 * mock instead of jsdom. */
class MemoryStorage {
  private store = new Map<string, string>()
  getItem(key: string) {
    return this.store.has(key) ? this.store.get(key)! : null
  }
  setItem(key: string, value: string) {
    this.store.set(key, value)
  }
}

beforeEach(() => {
  globalThis.localStorage = new MemoryStorage() as unknown as Storage
})

describe('progress tallies', () => {
  it('starts empty', () => {
    expect(loadProgressRecord()).toEqual({
      totalAnswered: 0,
      firstTry: 0,
      recovered: 0,
      missedOnly: 0,
    })
  })

  it('counts each outcome toward the total', () => {
    recordFirstTry()
    recordFirstTry()
    recordRecovered()
    recordMissedOnly()

    expect(loadProgressRecord()).toEqual({
      totalAnswered: 4,
      firstTry: 2,
      recovered: 1,
      missedOnly: 1,
    })
  })

  it('resets everything back to zero', () => {
    recordFirstTry()
    recordMissedOnly(3)
    resetProgress()
    expect(loadProgressRecord().totalAnswered).toBe(0)
  })
})

describe('recordMissedOnly in bulk', () => {
  it('records a whole session worth of unrecovered misses in one call', () => {
    // GameScreen can only know which misses were never recovered once the
    // session is over, so it tallies them and calls this once.
    recordMissedOnly(3)
    expect(loadProgressRecord()).toEqual({
      totalAnswered: 3,
      firstTry: 0,
      recovered: 0,
      missedOnly: 3,
    })
  })

  it('does nothing for a session with no unrecovered misses', () => {
    recordFirstTry()
    recordMissedOnly(0)
    expect(loadProgressRecord()).toEqual({
      totalAnswered: 1,
      firstTry: 1,
      recovered: 0,
      missedOnly: 0,
    })
  })

  it('ignores a negative count rather than winding the totals back', () => {
    recordFirstTry()
    recordMissedOnly(-2)
    expect(loadProgressRecord().totalAnswered).toBe(1)
  })

  it('defaults to a single miss when called with no count', () => {
    recordMissedOnly()
    expect(loadProgressRecord().missedOnly).toBe(1)
  })

  it('adds up across several sessions', () => {
    recordMissedOnly(2)
    recordMissedOnly(1)
    expect(loadProgressRecord()).toEqual({
      totalAnswered: 3,
      firstTry: 0,
      recovered: 0,
      missedOnly: 3,
    })
  })
})

describe('a whole session adds up', () => {
  it('accounts for every question in a 10-question run', () => {
    // 6 right first time, 1 missed then recovered, 3 missed and never
    // recovered — the old accounting dropped mid-session misses entirely.
    for (let i = 0; i < 6; i++) recordFirstTry()
    recordRecovered()
    recordMissedOnly(3)

    const rec = loadProgressRecord()
    expect(rec.totalAnswered).toBe(10)
    expect(rec.firstTry + rec.recovered + rec.missedOnly).toBe(rec.totalAnswered)
  })
})
