import { beforeEach, describe, expect, it } from 'vitest'
import { dateKey, getDailyStatus, pickDaily, recordDailyClear } from './dailyChallenge'
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

const DAY_1 = new Date('2026-01-15T09:00:00')
const DAY_2 = new Date('2026-01-16T09:00:00')
const DAY_AFTER_GAP = new Date('2026-01-20T09:00:00')

describe('dateKey', () => {
  it('formats using local year-month-day, zero-padded', () => {
    expect(dateKey(new Date(2026, 0, 5))).toBe('2026-01-05')
  })
})

describe('pickDaily', () => {
  it('picks a full session of real questions from one level', () => {
    const { levelId, questions } = pickDaily(DAY_1)
    expect(questions).toHaveLength(10)
    const ids = new Set(QUESTIONS[levelId].map((q) => q.id))
    for (const question of questions) {
      expect(ids.has(question.id)).toBe(true)
    }
  })

  it('is deterministic for the same date', () => {
    const a = pickDaily(DAY_1)
    const b = pickDaily(DAY_1)
    expect(b.levelId).toBe(a.levelId)
    expect(b.questions.map((q) => q.id)).toEqual(a.questions.map((q) => q.id))
  })

  it('has no duplicate questions within a single day', () => {
    const { questions } = pickDaily(DAY_1)
    expect(new Set(questions.map((q) => q.id)).size).toBe(questions.length)
  })
})

describe('daily streak tracking', () => {
  beforeEach(() => {
    globalThis.localStorage = new MemoryStorage() as unknown as Storage
  })

  it('starts at streak 0, not cleared', () => {
    expect(getDailyStatus(DAY_1)).toEqual({ streak: 0, clearedToday: false })
  })

  it('starts the streak at 1 on the first clear', () => {
    expect(recordDailyClear(DAY_1)).toEqual({ streak: 1, clearedToday: true })
    expect(getDailyStatus(DAY_1)).toEqual({ streak: 1, clearedToday: true })
  })

  it('does not inflate the streak on a same-day replay', () => {
    recordDailyClear(DAY_1)
    expect(recordDailyClear(DAY_1)).toEqual({ streak: 1, clearedToday: true })
  })

  it('extends the streak when cleared on the very next day', () => {
    recordDailyClear(DAY_1)
    expect(recordDailyClear(DAY_2)).toEqual({ streak: 2, clearedToday: true })
  })

  it('resets the streak to 1 after a gap of missed days', () => {
    recordDailyClear(DAY_1)
    recordDailyClear(DAY_2)
    expect(recordDailyClear(DAY_AFTER_GAP)).toEqual({ streak: 1, clearedToday: true })
  })

  it('is not cleared yet for a day that has not been recorded', () => {
    recordDailyClear(DAY_1)
    expect(getDailyStatus(DAY_2)).toEqual({ streak: 1, clearedToday: false })
  })
})
