import { describe, expect, it } from 'vitest'
import { GRAMMAR_ITEMS, GRAMMAR_BY_ID, CATEGORY_LABELS, grammarIdForNote, mappedNotes, normalizeNote } from './grammar'
import { QUESTIONS } from './questions'
import type { GrammarId } from './grammar'

const ALL_QUESTIONS = Object.values(QUESTIONS).flat()

describe('grammar taxonomy', () => {
  it('has no duplicate ids', () => {
    const ids = GRAMMAR_ITEMS.map((item) => item.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('has no duplicate labels, so two tags can never look the same in the UI', () => {
    const labels = GRAMMAR_ITEMS.map((item) => item.label)
    expect(new Set(labels).size).toBe(labels.length)
  })

  it('gives every item a known category and a stage in 1..5', () => {
    for (const item of GRAMMAR_ITEMS) {
      expect(CATEGORY_LABELS[item.category]).toBeTruthy()
      expect(item.stage).toBeGreaterThanOrEqual(1)
      expect(item.stage).toBeLessThanOrEqual(5)
    }
  })

  it('covers every category with at least one item', () => {
    const used = new Set(GRAMMAR_ITEMS.map((item) => item.category))
    for (const category of Object.keys(CATEGORY_LABELS)) {
      expect(used.has(category as keyof typeof CATEGORY_LABELS)).toBe(true)
    }
  })
})

describe('note → grammar mapping', () => {
  it('maps every note used by the question banks', () => {
    const unmapped = [...new Set(ALL_QUESTIONS.map((question) => question.note))]
      .filter((note): note is string => !!note)
      .filter((note) => !grammarIdForNote(note))
      .sort()
    expect(unmapped, `notes with no grammar tag: ${unmapped.join(', ')}`).toEqual([])
  })

  it('has no dead entries left over from notes that were renamed or removed', () => {
    const live = new Set(
      ALL_QUESTIONS.map((question) => question.note)
        .filter((note): note is string => !!note)
        .map(normalizeNote),
    )
    const dead = mappedNotes()
      .filter((note) => !live.has(note))
      .sort()
    expect(dead, `mapping entries no question bank uses: ${dead.join(', ')}`).toEqual([])
  })

  it('only maps onto ids that exist in the taxonomy', () => {
    for (const note of mappedNotes()) {
      const id = grammarIdForNote(note) as GrammarId
      expect(GRAMMAR_BY_ID[id]).toBeDefined()
    }
  })

  it('normalizes tilde width and whitespace so spelling variants agree', () => {
    expect(grammarIdForNote('too ~ to')).toBe(grammarIdForNote('too 〜 to'))
    expect(grammarIdForNote('  過去形  ')).toBe(grammarIdForNote('過去形'))
  })

  it('folds the same grammar point written several ways onto one tag', () => {
    expect(grammarIdForNote('比較級')).toBe(grammarIdForNote('整序作文(比較級)'))
    expect(grammarIdForNote('受動態')).toBe(grammarIdForNote('受動態(現在)'))
    expect(grammarIdForNote('not only A but also B')).toBe(grammarIdForNote('not only 〜 but also'))
  })
})

describe('question banks', () => {
  it('tags every question', () => {
    const untagged = ALL_QUESTIONS.filter((question) => !question.grammar)
    expect(untagged.map((question) => question.id)).toEqual([])
  })

  it('never gives one question two different tags across levels', () => {
    const byId = new Map<string, GrammarId>()
    for (const question of ALL_QUESTIONS) {
      const seen = byId.get(question.id)
      if (seen) expect(seen).toBe(question.grammar)
      else if (question.grammar) byId.set(question.id, question.grammar)
    }
  })
})
