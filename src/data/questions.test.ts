import { describe, expect, it } from 'vitest'
import {
  pickGrammarQuestions,
  pickQuestions,
  questionsByIds,
  QUESTIONS,
  QUESTIONS_BY_GRAMMAR,
  MAX_WORDS_PER_QUESTION,
} from './questions'
import type { GrammarId } from './grammar'
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

  it('brings along another sentence on the same grammar point for each review question', () => {
    for (const levelId of LEVEL_IDS) {
      const due = QUESTIONS[levelId].filter((question) => question.grammar).slice(0, 3)
      const picked = pickQuestions(levelId, 10, due.map((question) => question.id))
      for (const question of due) {
        const siblings = (QUESTIONS_BY_GRAMMAR[levelId][question.grammar!] ?? []).filter(
          (candidate) => candidate.id !== question.id,
        )
        if (siblings.length === 0) continue
        const hasSibling = picked.some(
          (candidate) => candidate.id !== question.id && candidate.grammar === question.grammar,
        )
        expect(hasSibling).toBe(true)
      }
    }
  })

  it('keeps the requested count and stays duplicate-free when more review is due than fits', () => {
    for (const levelId of LEVEL_IDS) {
      const due = QUESTIONS[levelId].slice(0, 30).map((question) => question.id)
      const ids = pickQuestions(levelId, 10, due).map((question) => question.id)
      expect(ids).toHaveLength(10)
      expect(new Set(ids).size).toBe(10)
    }
  })

  it('still returns the requested count with no priority ids given', () => {
    for (const levelId of LEVEL_IDS) {
      expect(pickQuestions(levelId, 10, [])).toHaveLength(10)
    }
  })
})

describe('pickGrammarQuestions', () => {
  it('returns only questions on the requested grammar point, capped at count', () => {
    for (const levelId of LEVEL_IDS) {
      for (const [grammar, questions] of Object.entries(QUESTIONS_BY_GRAMMAR[levelId])) {
        const picked = pickGrammarQuestions(levelId, grammar as GrammarId, 10)
        expect(picked).toHaveLength(Math.min(10, questions!.length))
        expect(picked.every((question) => question.grammar === grammar)).toBe(true)
      }
    }
  })
})

describe('questionsByIds', () => {
  it('keeps the given order and skips unknown ids', () => {
    const [a, b] = QUESTIONS.eiken4
    expect(questionsByIds('eiken4', [b.id, 'nope', a.id])).toEqual([b, a])
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

describe('question length cap', () => {
  it('never serves a question longer than the cap', () => {
    for (const levelId of LEVEL_IDS) {
      for (const question of QUESTIONS[levelId]) {
        expect(question.words.length).toBeLessThanOrEqual(MAX_WORDS_PER_QUESTION)
      }
    }
  })

  it('still leaves every level a pool worth drawing from', () => {
    // Filtering must not quietly gut a bank — the cap is meant to remove a
    // handful of outliers, not a meaningful share of the questions.
    for (const levelId of LEVEL_IDS) {
      expect(QUESTIONS[levelId].length).toBeGreaterThan(100)
    }
  })
})
