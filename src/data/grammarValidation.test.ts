import { describe, expect, it } from 'vitest'
import { validateQuestion, validateQuestionBank } from './grammarValidation'
import { QUESTIONS } from './questions'
import { q } from './questionGen'
import type { LevelId } from '../types'

describe('validateQuestion', () => {
  it('accepts a well-formed sentence', () => {
    expect(validateQuestion(q('ok', 'jp', 'This is my pen.'))).toEqual([])
  })

  it('accepts contractions and hyphenated compounds', () => {
    expect(validateQuestion(q('ok', 'jp', "You can't miss the face-to-face event."))).toEqual([])
  })

  it('flags a missing capital letter', () => {
    expect(validateQuestion(q('bad', 'jp', 'this is my pen.'))).toContain(
      'does not start with a capital letter: "this"',
    )
  })

  it('flags missing terminal punctuation', () => {
    expect(validateQuestion(q('bad', 'jp', 'This is my pen'))).toContain(
      'does not end with terminal punctuation: "pen"',
    )
  })

  it('flags a leftover template placeholder', () => {
    const question = q('bad', 'jp', 'This is my ${t.en}.')
    expect(validateQuestion(question).some((issue) => issue.includes('unexpected characters'))).toBe(true)
  })

  it('flags a doubled word', () => {
    expect(validateQuestion(q('bad', 'jp', 'This is is my pen.'))).toContain(
      'word 2 repeats the previous word: "is is"',
    )
  })

  it('flags a sentence with fewer than two words', () => {
    expect(validateQuestion(q('bad', 'jp', 'Hi.'))).toEqual(['sentence is too short (1 word)'])
  })
})

describe('question bank grammar sanity', () => {
  const LEVEL_IDS = Object.keys(QUESTIONS) as LevelId[]
  for (const levelId of LEVEL_IDS) {
    it(`${levelId}: every question passes structural sanity checks`, () => {
      expect(validateQuestionBank(QUESTIONS[levelId])).toEqual([])
    })
  }
})
