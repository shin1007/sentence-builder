/**
 * Regenerates src/data/posLexicon.generated.ts from the question banks and
 * the CEFR-J Wordlist: `npm run pos:generate`. Run it after adding or
 * changing questions; posLexicon.test.ts fails until the file is up to date.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { QUESTIONS } from '../src/data/questions'
import { buildPosLexicon, renderPosLexicon } from './pos-lexicon/build'

const csv = readFileSync(new URL('./data/cefrj-vocabulary-profile-1.5.csv', import.meta.url), 'utf8')
const table = buildPosLexicon(Object.values(QUESTIONS).flat(), csv)
writeFileSync(new URL('../src/data/posLexicon.generated.ts', import.meta.url), renderPosLexicon(table))
console.log(`${Object.keys(table).length} words`)
