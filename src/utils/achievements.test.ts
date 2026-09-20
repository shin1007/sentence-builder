import { beforeEach, describe, expect, it } from 'vitest'
import { ACHIEVEMENTS, evaluateAchievements, loadUnlockedIds } from './achievements'
import { saveBestResultIfBetter } from './storage'
import { LEVELS } from '../data/levels'
import type { LevelResult } from '../types'

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

function makeResult(overrides: Partial<LevelResult> = {}): LevelResult {
  return {
    levelId: 'eiken4',
    score: 500,
    correctCount: 6,
    totalCount: 10,
    bestCombo: 3,
    stars: 1,
    clearedAt: Date.now(),
    ...overrides,
  }
}

describe('achievements', () => {
  beforeEach(() => {
    globalThis.localStorage = new MemoryStorage() as unknown as Storage
  })

  it('starts with nothing unlocked', () => {
    expect(loadUnlockedIds()).toEqual([])
  })

  it('unlocks first-clear on any finished session', () => {
    const newly = evaluateAchievements(makeResult())
    expect(newly.map((a) => a.id)).toEqual(['first-clear'])
    expect(loadUnlockedIds()).toContain('first-clear')
  })

  it('does not re-award an already-unlocked achievement', () => {
    evaluateAchievements(makeResult())
    const secondRun = evaluateAchievements(makeResult())
    expect(secondRun).toEqual([])
  })

  it('unlocks perfect only on a full-marks clear', () => {
    const partial = evaluateAchievements(makeResult({ correctCount: 9, totalCount: 10 }))
    expect(partial.map((a) => a.id)).not.toContain('perfect')

    const full = evaluateAchievements(makeResult({ correctCount: 10, totalCount: 10 }))
    expect(full.map((a) => a.id)).toContain('perfect')
  })

  it('unlocks combo-master at 8+ best combo but not below', () => {
    const low = evaluateAchievements(makeResult({ bestCombo: 7 }))
    expect(low.map((a) => a.id)).not.toContain('combo-master')

    const high = evaluateAchievements(makeResult({ bestCombo: 8 }))
    expect(high.map((a) => a.id)).toContain('combo-master')
  })

  it('unlocks three-stars only at 3 stars', () => {
    const two = evaluateAchievements(makeResult({ stars: 2 }))
    expect(two.map((a) => a.id)).not.toContain('three-stars')

    const three = evaluateAchievements(makeResult({ stars: 3 }))
    expect(three.map((a) => a.id)).toContain('three-stars')
  })

  it('unlocks all-clear only once every level has a saved best result', () => {
    // Clear every level except the last one.
    for (const level of LEVELS.slice(0, -1)) {
      saveBestResultIfBetter(makeResult({ levelId: level.id }))
    }
    const notYet = evaluateAchievements(makeResult({ levelId: LEVELS[0].id }))
    expect(notYet.map((a) => a.id)).not.toContain('all-clear')

    // Now clear the last level too.
    const lastLevel = LEVELS[LEVELS.length - 1]
    saveBestResultIfBetter(makeResult({ levelId: lastLevel.id }))
    const allDone = evaluateAchievements(makeResult({ levelId: lastLevel.id }))
    expect(allDone.map((a) => a.id)).toContain('all-clear')
  })

  it('can unlock multiple achievements from one session', () => {
    for (const level of LEVELS) {
      saveBestResultIfBetter(makeResult({ levelId: level.id }))
    }
    const newly = evaluateAchievements(
      makeResult({ correctCount: 10, totalCount: 10, bestCombo: 10, stars: 3 }),
    )
    const ids = newly.map((a) => a.id).sort()
    expect(ids).toEqual(['all-clear', 'combo-master', 'first-clear', 'perfect', 'three-stars'].sort())
  })

  it('every achievement id is unique and matches the catalog', () => {
    const ids = ACHIEVEMENTS.map((a) => a.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('unlocks daily-streak-3 and daily-streak-7 at their thresholds but not before', () => {
    const notYet = evaluateAchievements(makeResult(), 2)
    expect(notYet.map((a) => a.id)).not.toContain('daily-streak-3')

    const three = evaluateAchievements(makeResult(), 3)
    expect(three.map((a) => a.id)).toContain('daily-streak-3')
    expect(three.map((a) => a.id)).not.toContain('daily-streak-7')

    const seven = evaluateAchievements(makeResult(), 7)
    expect(seven.map((a) => a.id)).toContain('daily-streak-7')
  })

  it('does not unlock any daily-streak achievement without a streak argument', () => {
    const newly = evaluateAchievements(makeResult())
    expect(newly.map((a) => a.id)).not.toContain('daily-streak-3')
    expect(newly.map((a) => a.id)).not.toContain('daily-streak-7')
  })
})
