import { beforeEach, describe, expect, it } from 'vitest'
import { loadMissedIds, recordMastered, recordMiss } from './reviewQueue'

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

describe('reviewQueue', () => {
  beforeEach(() => {
    globalThis.localStorage = new MemoryStorage() as unknown as Storage
  })

  it('starts with no missed questions', () => {
    expect(loadMissedIds('eiken4')).toEqual([])
  })

  it('tracks a missed question', () => {
    recordMiss('eiken4', 'q1')
    expect(loadMissedIds('eiken4')).toEqual(['q1'])
  })

  it('clears a question once answered correctly', () => {
    recordMiss('eiken4', 'q1')
    recordMastered('eiken4', 'q1')
    expect(loadMissedIds('eiken4')).toEqual([])
  })

  it('mastering a question that was never missed is a no-op', () => {
    recordMastered('eiken4', 'never-missed')
    expect(loadMissedIds('eiken4')).toEqual([])
  })

  it('does not duplicate a question missed more than once, and bumps it to most-recent', () => {
    recordMiss('eiken4', 'q1')
    recordMiss('eiken4', 'q2')
    recordMiss('eiken4', 'q1')
    expect(loadMissedIds('eiken4')).toEqual(['q2', 'q1'])
  })

  it('keeps different levels independent', () => {
    recordMiss('eiken4', 'q1')
    recordMiss('eiken2', 'q9')
    expect(loadMissedIds('eiken4')).toEqual(['q1'])
    expect(loadMissedIds('eiken2')).toEqual(['q9'])
  })

  it('caps the tracked list, dropping the oldest miss first', () => {
    for (let i = 0; i < 35; i++) {
      recordMiss('eiken4', `q${i}`)
    }
    const ids = loadMissedIds('eiken4')
    expect(ids).toHaveLength(30)
    expect(ids).not.toContain('q0')
    expect(ids).not.toContain('q4')
    expect(ids).toContain('q5')
    expect(ids).toContain('q34')
  })

  it('returns an empty list instead of throwing when stored data is corrupt', () => {
    localStorage.setItem('wordrush.missed.eiken4', '{not json')
    expect(loadMissedIds('eiken4')).toEqual([])
  })
})
