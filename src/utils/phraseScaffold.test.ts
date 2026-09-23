import { beforeEach, describe, expect, it } from 'vitest'
import { q } from '../data/questionGen'
import type { Question } from '../types'
import { recordGrammarResult } from './grammarStats'
import { phraseChunks, phraseIsThePoint, unitsWithSpans } from './phraseScaffold'

class MemoryStorage {
  private store = new Map<string, string>()
  getItem(key: string) {
    return this.store.has(key) ? this.store.get(key)! : null
  }
  setItem(key: string, value: string) {
    this.store.set(key, value)
  }
}

const passive: Question = { ...q('t-0', '', 'The old castle was visited by many tourists.'), grammar: 'passivePast' }

describe('phraseChunks', () => {
  beforeEach(() => {
    globalThis.localStorage = new MemoryStorage() as unknown as Storage
  })

  it('merges nothing until the player is struggling with the grammar', () => {
    expect(phraseChunks('eikenPre2', passive)).toEqual([])
    recordGrammarResult('eikenPre2', 'passivePast', true)
    recordGrammarResult('eikenPre2', 'passivePast', true)
    recordGrammarResult('eikenPre2', 'passivePast', false)
    expect(phraseChunks('eikenPre2', passive)).toEqual([])
  })

  it('merges noun phrases while accuracy is low, on that level only', () => {
    for (let i = 0; i < 3; i++) recordGrammarResult('eikenPre2', 'passivePast', false)
    expect(unitsWithSpans(passive.words, phraseChunks('eikenPre2', passive))).toEqual([
      'The old castle',
      'was',
      'visited',
      'by',
      'many',
      'tourists.',
    ])
    expect(phraseChunks('eiken2', passive)).toEqual([])
  })

  it('leaves the phrase alone when it is the point of the question', () => {
    expect(phraseIsThePoint('article')).toBe(true)
    expect(phraseIsThePoint('superlativeEst')).toBe(true)
    expect(phraseIsThePoint('passivePast')).toBe(false)
    const article: Question = { ...passive, grammar: 'article' }
    for (let i = 0; i < 3; i++) recordGrammarResult('eikenPre2', 'article', false)
    expect(phraseChunks('eikenPre2', article)).toEqual([])
  })
})

describe('unitsWithSpans', () => {
  it('joins each span into one tile and keeps the sentence intact', () => {
    const words = 'I take care of my dog every day.'.split(' ')
    const units = unitsWithSpans(words, [[4, 6], [1, 4]])
    expect(units).toEqual(['I', 'take care of', 'my dog', 'every', 'day.'])
    expect(units.join(' ')).toBe(words.join(' '))
  })
})
