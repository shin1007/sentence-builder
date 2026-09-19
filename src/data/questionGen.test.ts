import { describe, expect, it } from 'vitest'
import { q } from './questionGen'

describe('q', () => {
  it('splits the English sentence into one word per tile', () => {
    const question = q('id1', '猫が魚を食べる。', 'The cat eats fish.')
    expect(question.words).toEqual(['The', 'cat', 'eats', 'fish.'])
  })

  it('collapses repeated whitespace between words', () => {
    const question = q('id2', 'jp', 'a   b\tc')
    expect(question.words).toEqual(['a', 'b', 'c'])
  })

  it('trims leading/trailing whitespace before splitting', () => {
    const question = q('id3', 'jp', '  a b  ')
    expect(question.words).toEqual(['a', 'b'])
  })

  it('carries the id, jp prompt, and optional grammar note through unchanged', () => {
    const question = q('id4', '例文', 'a b', 'note text')
    expect(question.id).toBe('id4')
    expect(question.jp).toBe('例文')
    expect(question.note).toBe('note text')
  })

  it('leaves note undefined when not given', () => {
    const question = q('id5', 'jp', 'a b')
    expect(question.note).toBeUndefined()
  })
})
