import { beforeEach, describe, expect, it } from 'vitest'
import {
  grammarWeights,
  loadGrammarStats,
  loadWeakGrammar,
  MASTERED_GRAMMAR_WEIGHT,
  MIN_ATTEMPTS_FOR_RANKING,
  RECENT_WINDOW,
  recordGrammarResult,
  resetGrammarStats,
  UNSEEN_GRAMMAR_WEIGHT,
  WEAKEST_GRAMMAR_WEIGHT,
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
    expect(stats).toContainEqual({ levelId: 'eiken3', grammar: 'passivePresent', attempts: 4, correct: 2, accuracy: 0.5, totalAttempts: 4 })
    expect(stats).toContainEqual({ levelId: 'eiken4', grammar: 'passivePresent', attempts: 1, correct: 1, accuracy: 1, totalAttempts: 1 })
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

  it('judges accuracy over the recent window only, so an early slump stops counting', () => {
    record('eiken3', 'passivePresent', new Array(RECENT_WINDOW).fill(false))
    record('eiken3', 'passivePresent', new Array(RECENT_WINDOW).fill(true))
    const [stat] = loadGrammarStats()
    expect(stat).toMatchObject({ attempts: RECENT_WINDOW, correct: RECENT_WINDOW, accuracy: 1, totalAttempts: RECENT_WINDOW * 2 })
    expect(loadWeakGrammar()).toEqual([])
  })

  it('rebuilds a recent window at the same accuracy from tallies saved before it existed', () => {
    localStorage.setItem('wordrush.grammar', JSON.stringify({ 'eiken3:passivePresent': { attempts: 40, correct: 10 } }))
    const [stat] = loadGrammarStats()
    expect(stat).toMatchObject({ attempts: RECENT_WINDOW, accuracy: 0.3, totalAttempts: 40 })
    // New results then push the rebuilt ones out as usual.
    record('eiken3', 'passivePresent', new Array(RECENT_WINDOW).fill(true))
    expect(loadGrammarStats()[0]).toMatchObject({ accuracy: 1, totalAttempts: 40 + RECENT_WINDOW })
  })

  it('resets', () => {
    record('eiken3', 'passivePresent', [false, false, false])
    resetGrammarStats()
    expect(loadGrammarStats()).toEqual([])
  })
})

describe('grammarWeights', () => {
  it('slightly favours grammar not yet answered on the level', () => {
    expect(grammarWeights('eiken3').passivePresent).toBe(UNSEEN_GRAMMAR_WEIGHT)
  })

  it('favours points missed lately and disfavours points got right lately', () => {
    record('eiken3', 'passivePresent', [false, false, false])
    record('eiken3', 'beCopula', [true, true, true])
    const weights = grammarWeights('eiken3')
    expect(weights.passivePresent).toBeCloseTo(WEAKEST_GRAMMAR_WEIGHT)
    expect(weights.beCopula).toBeCloseTo(MASTERED_GRAMMAR_WEIGHT)
  })

  it('pulls a thinly-sampled point toward neutral', () => {
    recordGrammarResult('eiken3', 'passivePresent', false)
    const weight = grammarWeights('eiken3').passivePresent!
    expect(weight).toBeGreaterThan(1)
    expect(weight).toBeLessThan(WEAKEST_GRAMMAR_WEIGHT)
  })

  it('only uses results from the level asked about', () => {
    record('eiken4', 'passivePresent', [false, false, false])
    expect(grammarWeights('eiken3').passivePresent).toBe(UNSEEN_GRAMMAR_WEIGHT)
  })
})
