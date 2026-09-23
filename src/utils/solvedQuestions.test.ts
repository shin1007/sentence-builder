import { beforeEach, describe, expect, it } from 'vitest'
import { SOLVED_REST_DAYS, forgetSolved, recentlySolvedIds, recordSolved } from './solvedQuestions'

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

describe('solvedQuestions', () => {
  beforeEach(() => {
    globalThis.localStorage = new MemoryStorage() as unknown as Storage
  })

  it('starts empty', () => {
    expect(recentlySolvedIds('eiken4', NOW).size).toBe(0)
  })

  it('remembers a solved sentence per level until its rest period ends', () => {
    recordSolved('eiken4', 'q1', NOW)
    expect(recentlySolvedIds('eiken4', NOW).has('q1')).toBe(true)
    expect(recentlySolvedIds('eiken3', NOW).has('q1')).toBe(false)
    expect(recentlySolvedIds('eiken4', NOW + (SOLVED_REST_DAYS - 1) * DAY_MS).has('q1')).toBe(true)
    expect(recentlySolvedIds('eiken4', NOW + SOLVED_REST_DAYS * DAY_MS).has('q1')).toBe(false)
  })

  it('restarts the rest period when solved again', () => {
    recordSolved('eiken4', 'q1', NOW)
    recordSolved('eiken4', 'q1', NOW + 20 * DAY_MS)
    expect(recentlySolvedIds('eiken4', NOW + 40 * DAY_MS).has('q1')).toBe(true)
  })

  it('forgets a sentence as soon as it is missed', () => {
    recordSolved('eiken4', 'q1', NOW)
    recordSolved('eiken4', 'q2', NOW)
    forgetSolved('eiken4', 'q1')
    expect([...recentlySolvedIds('eiken4', NOW)]).toEqual(['q2'])
  })

  it('drops expired entries from storage on the next write', () => {
    recordSolved('eiken4', 'old', NOW)
    recordSolved('eiken4', 'new', NOW + SOLVED_REST_DAYS * DAY_MS)
    expect(Object.keys(JSON.parse(localStorage.getItem('wordrush.solved.eiken4')!))).toEqual(['new'])
  })

  it('ignores corrupt storage', () => {
    localStorage.setItem('wordrush.solved.eiken4', '[1,2]')
    expect(recentlySolvedIds('eiken4', NOW).size).toBe(0)
    localStorage.setItem('wordrush.solved.eiken4', '{"q1":"x","q2":5}')
    expect([...recentlySolvedIds('eiken4', 0)]).toEqual(['q2'])
  })
})
