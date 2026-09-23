import { describe, expect, it } from 'vitest'
import { QUESTIONS } from '../../src/data/questions'
import type { LevelId } from '../../src/types'
import { ALLOWED_WORDS } from './allowlist'
import { analyzeLevel, loadWordlist } from './analyze'

const wordlist = loadWordlist()
const reports = Object.fromEntries(
  (Object.keys(QUESTIONS) as LevelId[]).map((levelId) => [levelId, analyzeLevel(levelId, QUESTIONS[levelId], wordlist)]),
)

describe('question bank vocabulary', () => {
  // A word above the level's CEFR target has to be either replaced or put on
  // the allowlist with a reason — see `npm run vocab:audit` for the details.
  it.each(Object.keys(QUESTIONS) as LevelId[])('%s uses no unexplained above-level words', (levelId) => {
    expect(reports[levelId].above.map((use) => `${use.level} ${use.word}: ${use.example}`)).toEqual([])
  })

  it('has no allowlist entries that no level needs any more', () => {
    const needed = new Set(Object.values(reports).flatMap((report) => report.allowedAbove.map((use) => use.word)))
    const stale = Object.keys(ALLOWED_WORDS).filter((word) => !needed.has(word))
    expect(stale).toEqual([])
  })
})
