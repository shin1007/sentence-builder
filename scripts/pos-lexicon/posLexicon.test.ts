import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { QUESTIONS } from '../../src/data/questions'
import { buildPosLexicon, renderPosLexicon } from './build'

describe('POS lexicon', () => {
  it('is up to date with the question banks (run `npm run pos:generate`)', () => {
    const csv = readFileSync(new URL('../data/cefrj-vocabulary-profile-1.5.csv', import.meta.url), 'utf8')
    const expected = renderPosLexicon(buildPosLexicon(Object.values(QUESTIONS).flat(), csv))
    const actual = readFileSync(new URL('../../src/data/posLexicon.generated.ts', import.meta.url), 'utf8')
    expect(actual === expected).toBe(true)
  })
})
