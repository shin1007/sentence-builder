import { beforeEach, describe, expect, it } from 'vitest'
import { loadDueIds, recordCorrect, recordMiss } from './reviewQueue'

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

const DAY_MS = 24 * 60 * 60 * 1000
const NOW = Date.parse('2026-01-15T00:00:00Z')

describe('reviewQueue', () => {
  beforeEach(() => {
    globalThis.localStorage = new MemoryStorage() as unknown as Storage
  })

  it('starts with no due questions', () => {
    expect(loadDueIds('eiken4', NOW)).toEqual([])
  })

  it('makes a missed question due immediately', () => {
    recordMiss('eiken4', 'q1', NOW)
    expect(loadDueIds('eiken4', NOW)).toEqual(['q1'])
  })

  it('pushes a question to a later due date once answered correctly during review', () => {
    recordMiss('eiken4', 'q1', NOW)
    recordCorrect('eiken4', 'q1', NOW)
    expect(loadDueIds('eiken4', NOW)).toEqual([])
    expect(loadDueIds('eiken4', NOW + DAY_MS)).toEqual(['q1'])
  })

  it('drops a question from the queue (mastered) after it clears every review step', () => {
    let now = NOW
    recordMiss('eiken4', 'q1', now)
    // Step through every interval in REVIEW_STEP_DAYS (0, 1, 3, 7, 14 days).
    for (let i = 0; i < 5; i++) {
      recordCorrect('eiken4', 'q1', now)
      now += 15 * DAY_MS
    }
    expect(loadDueIds('eiken4', now)).toEqual([])
  })

  it('resets progress to step 0 if missed again mid-review', () => {
    recordMiss('eiken4', 'q1', NOW)
    recordCorrect('eiken4', 'q1', NOW) // now due again in 1 day
    recordMiss('eiken4', 'q1', NOW + DAY_MS / 2) // missed again before that
    expect(loadDueIds('eiken4', NOW + DAY_MS / 2)).toEqual(['q1'])
  })

  it('answering a question that was never missed is a no-op', () => {
    recordCorrect('eiken4', 'never-missed', NOW)
    expect(loadDueIds('eiken4', NOW)).toEqual([])
  })

  it('does not duplicate a question missed more than once, and bumps it to due-now', () => {
    recordMiss('eiken4', 'q1', NOW)
    recordCorrect('eiken4', 'q1', NOW) // due in 1 day
    recordMiss('eiken4', 'q2', NOW)
    recordMiss('eiken4', 'q1', NOW) // missed again — due immediately
    expect(loadDueIds('eiken4', NOW).sort()).toEqual(['q1', 'q2'])
  })

  it('keeps different levels independent', () => {
    recordMiss('eiken4', 'q1', NOW)
    recordMiss('eiken2', 'q9', NOW)
    expect(loadDueIds('eiken4', NOW)).toEqual(['q1'])
    expect(loadDueIds('eiken2', NOW)).toEqual(['q9'])
  })

  it('caps the tracked list, dropping the oldest miss first', () => {
    for (let i = 0; i < 35; i++) {
      recordMiss('eiken4', `q${i}`, NOW)
    }
    const ids = loadDueIds('eiken4', NOW)
    expect(ids).toHaveLength(30)
    expect(ids).not.toContain('q0')
    expect(ids).not.toContain('q4')
    expect(ids).toContain('q5')
    expect(ids).toContain('q34')
  })

  it('returns an empty list instead of throwing when stored data is corrupt', () => {
    localStorage.setItem('wordrush.missed.eiken4', '{not json')
    expect(loadDueIds('eiken4', NOW)).toEqual([])
  })

  it('migrates the old plain string[] format to due-now items', () => {
    localStorage.setItem('wordrush.missed.eiken4', JSON.stringify(['q1', 'q2']))
    expect(loadDueIds('eiken4', NOW).sort()).toEqual(['q1', 'q2'])
  })
})
