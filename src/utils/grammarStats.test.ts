import { beforeEach, describe, expect, it } from 'vitest'
import {
  loadGrammarStats,
  loadWeakGrammar,
  MIN_ATTEMPTS_FOR_RANKING,
  recordGrammarResult,
  resetGrammarStats,
} from './grammarStats'

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

const record = (levelId: 'eiken4' | 'eiken3', grammar: 'passivePresent' | 'beCopula', results: boolean[]) => {
  for (const correct of results) recordGrammarResult(levelId, grammar, correct)
}

describe('grammarStats', () => {
  it('starts empty', () => {
    expect(loadGrammarStats()).toEqual([])
    expect(loadWeakGrammar()).toEqual([])
  })

  it('tallies attempts and accuracy per level and grammar point', () => {
    record('eiken3', 'passivePresent', [true, false, false, true])
    record('eiken4', 'passivePresent', [true])
    const stats = loadGrammarStats()
    expect(stats).toContainEqual({ levelId: 'eiken3', grammar: 'passivePresent', attempts: 4, correct: 2, accuracy: 0.5 })
    expect(stats).toContainEqual({ levelId: 'eiken4', grammar: 'passivePresent', attempts: 1, correct: 1, accuracy: 1 })
  })

  it('does not rank a point until it has enough attempts', () => {
    record('eiken3', 'passivePresent', new Array(MIN_ATTEMPTS_FOR_RANKING - 1).fill(false))
    expect(loadWeakGrammar()).toEqual([])
    recordGrammarResult('eiken3', 'passivePresent', false)
    expect(loadWeakGrammar().map((s) => s.grammar)).toEqual(['passivePresent'])
  })

  it('ranks least accurate first and leaves out perfect points', () => {
    record('eiken3', 'passivePresent', [true, false, false])
    record('eiken4', 'beCopula', [true, true, false])
    record('eiken4', 'passivePresent', [true, true, true])
    expect(loadWeakGrammar().map((s) => `${s.levelId}:${s.grammar}`)).toEqual(['eiken3:passivePresent', 'eiken4:beCopula'])
  })

  it('ignores tags that are no longer in the grammar ledger', () => {
    localStorage.setItem('wordrush.grammar', JSON.stringify({ 'eiken4:noSuchTag': { attempts: 5, correct: 0 } }))
    expect(loadGrammarStats()).toEqual([])
  })

  it('resets', () => {
    record('eiken3', 'passivePresent', [false, false, false])
    resetGrammarStats()
    expect(loadGrammarStats()).toEqual([])
  })
})
