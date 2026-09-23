import { beforeEach, describe, expect, it } from 'vitest'
import { IDIOM_CHUNKED_UNTIL, answerUnits, recordIdiomResult, shouldChunkIdiom } from './idiomProgress'
import { idiomQuestion } from '../data/templates/idioms'
import { q } from '../data/questionGen'

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

const IDIOM = { phrase: 'take care of', meaning: '〜の世話をする', note: '動詞中心の熟語', sentences: [] }
const question = idiomQuestion('t-0', IDIOM, '私は犬の世話をします。', 'I [take care of] my dog.')

describe('idiomQuestion', () => {
  it('locates the bracketed span and strips the brackets', () => {
    expect(question.words).toEqual(['I', 'take', 'care', 'of', 'my', 'dog.'])
    expect(question.idiom).toMatchObject({ phrase: 'take care of', start: 1, end: 4 })
  })

  it('handles a span at the start and one carrying the final punctuation', () => {
    const first = idiomQuestion('t-1', IDIOM, '', '[Take care of] yourself.')
    expect(first.idiom).toMatchObject({ start: 0, end: 3 })
    const last = idiomQuestion('t-2', IDIOM, '', 'Please [come back].')
    expect(last.words).toEqual(['Please', 'come', 'back.'])
    expect(last.idiom).toMatchObject({ start: 1, end: 3 })
  })

  it('refuses a sentence with no span', () => {
    expect(() => idiomQuestion('t-3', IDIOM, '', 'I take care of my dog.')).toThrow()
  })
})

describe('answerUnits', () => {
  it('joins the idiom into one unit when chunked', () => {
    expect(answerUnits(question, true)).toEqual(['I', 'take care of', 'my', 'dog.'])
    expect(answerUnits(question, true).join(' ')).toBe(question.words.join(' '))
  })

  it('leaves the words alone when not chunked or not an idiom question', () => {
    expect(answerUnits(question, false)).toEqual(question.words)
    const plain = q('p-0', '', 'This is a pen.')
    expect(answerUnits(plain, true)).toEqual(plain.words)
  })
})

describe('idiom progress', () => {
  beforeEach(() => {
    globalThis.localStorage = new MemoryStorage() as unknown as Storage
  })

  it('serves a new idiom as one tile until it has been answered cleanly enough', () => {
    for (let i = 0; i < IDIOM_CHUNKED_UNTIL; i++) {
      expect(shouldChunkIdiom(question)).toBe(true)
      recordIdiomResult(question, true)
    }
    expect(shouldChunkIdiom(question)).toBe(false)
  })

  it('goes back to one tile after a miss once split', () => {
    for (let i = 0; i < IDIOM_CHUNKED_UNTIL; i++) recordIdiomResult(question, true)
    recordIdiomResult(question, false)
    expect(shouldChunkIdiom(question)).toBe(true)
  })

  it('never counts below zero', () => {
    recordIdiomResult(question, false)
    recordIdiomResult(question, false)
    recordIdiomResult(question, true)
    recordIdiomResult(question, true)
    expect(shouldChunkIdiom(question)).toBe(false)
  })

  it('is shared by every sentence using the same phrase', () => {
    const other = idiomQuestion('t-9', IDIOM, '', '[Take care of] yourself.')
    for (let i = 0; i < IDIOM_CHUNKED_UNTIL; i++) recordIdiomResult(question, true)
    expect(shouldChunkIdiom(other)).toBe(false)
  })

  it('never chunks a question without an idiom', () => {
    expect(shouldChunkIdiom(q('p-1', '', 'This is a pen.'))).toBe(false)
  })
})
