import { beforeEach, describe, expect, it } from 'vitest'
import {
  MAX_TRACKED,
  dueReviewCount,
  isShakyAnswer,
  loadDueIds,
  recordCorrect,
  recordMiss,
  recordShaky,
} from './reviewQueue'
import { QUESTIONS } from '../data/questions'

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
    for (let i = 0; i < MAX_TRACKED + 5; i++) {
      recordMiss('eiken4', `q${i}`, NOW)
    }
    const ids = loadDueIds('eiken4', NOW)
    expect(ids).toHaveLength(MAX_TRACKED)
    expect(ids).not.toContain('q0')
    expect(ids).not.toContain('q4')
    expect(ids).toContain('q5')
    expect(ids).toContain(`q${MAX_TRACKED + 4}`)
  })

  it('keeps well over a few runs worth of misses', () => {
    expect(MAX_TRACKED).toBeGreaterThanOrEqual(100)
  })

  it('returns an empty list instead of throwing when stored data is corrupt', () => {
    localStorage.setItem('wordrush.missed.eiken4', '{not json')
    expect(loadDueIds('eiken4', NOW)).toEqual([])
  })

  it('migrates the old plain string[] format to due-now items', () => {
    localStorage.setItem('wordrush.missed.eiken4', JSON.stringify(['q1', 'q2']))
    expect(loadDueIds('eiken4', NOW).sort()).toEqual(['q1', 'q2'])
  })

  it('counts due questions that still exist in the bank, and only once they are due', () => {
    const [a, b] = QUESTIONS.eiken4
    recordMiss('eiken4', a.id, NOW)
    recordMiss('eiken4', b.id, NOW)
    recordMiss('eiken4', 'no-longer-in-bank', NOW)
    recordCorrect('eiken4', b.id, NOW)
    expect(dueReviewCount('eiken4', NOW)).toBe(1)
    expect(dueReviewCount('eiken4', NOW + DAY_MS)).toBe(2)
  })

  describe('shaky answers', () => {
    it('queues an untracked question for tomorrow, not now', () => {
      recordShaky('eiken4', 'q1', NOW)
      expect(loadDueIds('eiken4', NOW)).toEqual([])
      expect(loadDueIds('eiken4', NOW + DAY_MS)).toEqual(['q1'])
    })

    it('moves a due-now miss to tomorrow', () => {
      recordMiss('eiken4', 'q1', NOW)
      recordShaky('eiken4', 'q1', NOW)
      expect(loadDueIds('eiken4', NOW)).toEqual([])
      expect(loadDueIds('eiken4', NOW + DAY_MS)).toEqual(['q1'])
    })

    it('repeats the current interval instead of advancing', () => {
      recordMiss('eiken4', 'q1', NOW)
      recordCorrect('eiken4', 'q1', NOW) // step 1
      recordCorrect('eiken4', 'q1', NOW + DAY_MS) // step 2: 3 days
      const later = NOW + 4 * DAY_MS
      recordShaky('eiken4', 'q1', later)
      expect(loadDueIds('eiken4', later + 2 * DAY_MS)).toEqual([])
      expect(loadDueIds('eiken4', later + 3 * DAY_MS)).toEqual(['q1'])
    })

    it('flags answers that used most of the time or were reshuffled', () => {
      expect(isShakyAnswer({ timeLeft: 8, timeLimit: 10, removals: 0, timed: true })).toBe(false)
      expect(isShakyAnswer({ timeLeft: 2, timeLimit: 10, removals: 0, timed: true })).toBe(true)
      expect(isShakyAnswer({ timeLeft: 8, timeLimit: 10, removals: 1, timed: true })).toBe(false)
      expect(isShakyAnswer({ timeLeft: 8, timeLimit: 10, removals: 2, timed: true })).toBe(true)
    })

    it('ignores the clock when untimed', () => {
      expect(isShakyAnswer({ timeLeft: 0, timeLimit: 10, removals: 0, timed: false })).toBe(false)
      expect(isShakyAnswer({ timeLeft: 0, timeLimit: 10, removals: 2, timed: false })).toBe(true)
    })
  })
})
