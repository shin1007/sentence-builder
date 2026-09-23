import { describe, expect, it } from 'vitest'
import { QUESTIONS } from './questions'
import { SENTENCE_INITIAL_PROPER_NOUNS, keepsCapital } from './capitalization'

const firstWords = new Set(Object.values(QUESTIONS).flatMap((questions) => questions.map((q) => q.words[0].replace(/,$/, ''))))

describe('keepsCapital', () => {
  it('keeps I, its contractions, names, places and languages', () => {
    for (const word of ['I', "I'm", "I'll", 'Tom', 'Kyoto', 'English', 'Mr.', 'Yuki,', 'Christmas']) {
      expect(keepsCapital(word), word).toBe(true)
    }
  })

  it('drops an ordinary sentence-start capital', () => {
    for (const word of ['This', 'The', 'My', 'Please', "Don't", 'According', 'Dodgeball', 'Tennis']) {
      expect(keepsCapital(word), word).toBe(false)
    }
  })

  it('tells the modal May from the month', () => {
    expect(keepsCapital('May', 'I')).toBe(false)
    expect(keepsCapital('May', 'is')).toBe(true)
  })

  it('lists only proper nouns the banks still open a sentence with', () => {
    expect([...SENTENCE_INITIAL_PROPER_NOUNS].filter((word) => !firstWords.has(word))).toEqual([])
  })
})
