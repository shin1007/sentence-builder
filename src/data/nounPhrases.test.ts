import { describe, expect, it } from 'vitest'
import { nounPhraseSpans } from './nounPhrases'
import { QUESTIONS } from './questions'

const phrases = (sentence: string) => {
  const words = sentence.split(' ')
  return nounPhraseSpans(words).map(([s, e]) => words.slice(s, e).join(' '))
}

describe('nounPhraseSpans', () => {
  it('finds a determiner, up to two adjectives and a noun', () => {
    expect(phrases('We met our teacher at the station.')).toEqual(['our teacher', 'the station.'])
    expect(phrases('I bought a red umbrella yesterday.')).toEqual(['a red umbrella'])
  })

  it('leaves compound nouns, `of` phrases and ambiguous words alone', () => {
    expect(phrases('I joined the tennis club.')).toEqual([])
    expect(phrases('There are a lot of melons.')).toEqual([])
    // `book` is a verb too, so it isn't taken as the noun.
    expect(phrases('This is my book.')).toEqual([])
  })

  it('does not read `her` after a two-object verb as a possessive', () => {
    expect(phrases('I gave her flowers yesterday.')).toEqual([])
    expect(phrases('I saw her dog in the kitchen.')).toEqual(['her dog', 'the kitchen.'])
  })

  it('never spans a comma or a name', () => {
    for (const question of Object.values(QUESTIONS).flat()) {
      for (const [s, e] of nounPhraseSpans(question.words)) {
        const inside = question.words.slice(s, e)
        expect(inside.slice(0, -1).some((w) => /[,.;:!?]$/.test(w))).toBe(false)
        expect(inside.slice(1).some((w) => /^[A-Z]/.test(w))).toBe(false)
      }
    }
  })
})
