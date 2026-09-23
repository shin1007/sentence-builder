import { describe, expect, it } from 'vitest'
import { QUESTIONS } from './questions'

const IDIOM_QUESTIONS = Object.values(QUESTIONS)
  .flat()
  .filter((question) => question.idiom)

describe('idiom questions', () => {
  it('are in every level', () => {
    for (const [levelId, questions] of Object.entries(QUESTIONS)) {
      expect(questions.some((question) => question.idiom), levelId).toBe(true)
    }
  })

  it('mark a span inside the sentence that ends on the phrase’s last word', () => {
    for (const question of IDIOM_QUESTIONS) {
      const { start, end, phrase } = question.idiom!
      expect(start, question.id).toBeGreaterThanOrEqual(0)
      expect(end, question.id).toBeGreaterThan(start)
      expect(end, question.id).toBeLessThanOrEqual(question.words.length)
      const lastWord = question.words[end - 1].replace(/[.,?!]/g, '').toLowerCase()
      expect(lastWord, question.id).toBe(phrase.split(' ').at(-1))
    }
  })

  it('give every phrase more than one sentence in its level, so review has a sibling', () => {
    for (const [levelId, questions] of Object.entries(QUESTIONS)) {
      const counts = new Map<string, number>()
      for (const question of questions) {
        if (question.idiom) counts.set(question.idiom.phrase, (counts.get(question.idiom.phrase) ?? 0) + 1)
      }
      for (const [phrase, count] of counts) expect(count, `${levelId}: ${phrase}`).toBeGreaterThan(1)
    }
  })
})
