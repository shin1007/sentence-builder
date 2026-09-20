import { describe, expect, it } from 'vitest'
import { easeInOpener, pickQuestions, QUESTIONS } from './questions'
import type { LevelId, Question } from '../types'

const LEVEL_IDS = Object.keys(QUESTIONS) as LevelId[]

describe('pickQuestions', () => {
  it('returns the requested count when the pool is large enough', () => {
    for (const levelId of LEVEL_IDS) {
      expect(pickQuestions(levelId, 10)).toHaveLength(10)
    }
  })

  it('never returns the same question twice within one session', () => {
    for (const levelId of LEVEL_IDS) {
      const ids = pickQuestions(levelId, 10).map((question) => question.id)
      expect(new Set(ids).size).toBe(ids.length)
    }
  })

  it('caps at the pool size when asked for more questions than exist', () => {
    for (const levelId of LEVEL_IDS) {
      const poolSize = QUESTIONS[levelId].length
      expect(pickQuestions(levelId, poolSize + 1000)).toHaveLength(poolSize)
    }
  })

  it('does not mutate the underlying question bank', () => {
    for (const levelId of LEVEL_IDS) {
      const before = QUESTIONS[levelId].map((question) => question.id)
      pickQuestions(levelId, 5)
      expect(QUESTIONS[levelId].map((question) => question.id)).toEqual(before)
    }
  })

  it('includes every priority id when it fits within count', () => {
    const levelId = LEVEL_IDS[0]
    const priorityIds = QUESTIONS[levelId].slice(0, 3).map((question) => question.id)
    const picked = pickQuestions(levelId, 10, priorityIds)
    const pickedIds = picked.map((question) => question.id)
    for (const id of priorityIds) {
      expect(pickedIds).toContain(id)
    }
  })

  it('ignores priority ids that are not in the level pool', () => {
    const levelId = LEVEL_IDS[0]
    expect(() => pickQuestions(levelId, 10, ['does-not-exist'])).not.toThrow()
    expect(pickQuestions(levelId, 10, ['does-not-exist'])).toHaveLength(10)
  })

  it('still returns the requested count with no priority ids given', () => {
    for (const levelId of LEVEL_IDS) {
      expect(pickQuestions(levelId, 10, [])).toHaveLength(10)
    }
  })
})

describe('easeInOpener', () => {
  const mk = (id: string, wordCount: number): Question => ({
    id,
    jp: 'dummy',
    words: Array.from({ length: wordCount }, (_, i) => `w${i}`),
  })

  it('swaps in an easier question when the first pick is a long sentence', () => {
    const pool = [mk('a', 3), mk('b', 3), mk('c', 9)]
    const session = [mk('c', 9), mk('a', 3), mk('b', 3)]
    const result = easeInOpener(session, pool)
    expect(result[0].id).toBe('a')
    expect(new Set(result.map((question) => question.id))).toEqual(new Set(session.map((question) => question.id)))
  })

  it('leaves the session untouched when the first question is already at or below the median', () => {
    const pool = [mk('a', 3), mk('b', 3), mk('c', 9)]
    const session = [mk('a', 3), mk('c', 9), mk('b', 3)]
    expect(easeInOpener(session, pool)).toEqual(session)
  })

  it('leaves the session untouched when no easier question is available', () => {
    const pool = [mk('a', 9), mk('b', 9), mk('c', 9)]
    const session = [mk('a', 9), mk('b', 9), mk('c', 9)]
    expect(easeInOpener(session, pool)).toEqual(session)
  })

  it('leaves a single-question session untouched', () => {
    const pool = [mk('a', 9)]
    expect(easeInOpener(pool, pool)).toEqual(pool)
  })
})

describe('question bank data integrity', () => {
  for (const levelId of LEVEL_IDS) {
    it(`${levelId}: every question has a non-empty jp prompt and non-empty words`, () => {
      for (const question of QUESTIONS[levelId]) {
        expect(question.jp.length).toBeGreaterThan(0)
        expect(question.words.length).toBeGreaterThan(0)
        for (const word of question.words) {
          expect(word.length).toBeGreaterThan(0)
        }
      }
    })

    it(`${levelId}: has enough questions for a full 10-question session`, () => {
      expect(QUESTIONS[levelId].length).toBeGreaterThanOrEqual(10)
    })

    it(`${levelId}: has no duplicate question ids`, () => {
      const ids = QUESTIONS[levelId].map((question) => question.id)
      expect(new Set(ids).size).toBe(ids.length)
    })
  }
})
