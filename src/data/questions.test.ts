import { describe, expect, it } from 'vitest'
import { pickQuestions, QUESTIONS } from './questions'
import type { LevelId } from '../types'

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
