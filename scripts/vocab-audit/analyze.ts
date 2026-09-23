import { readFileSync } from 'node:fs'
import type { LevelId, Question } from '../../src/types'
import { isAllowed } from './allowlist'
import { cefrRank, lookupTokens, parseWordlist, tokenize, type Cefr } from './lexicon'

/**
 * The CEFR level each game level's vocabulary should sit within. The 英検
 * grades follow 英検's own CEFR mapping (3級 A1, 準2級 A2, 2級 B1; 4級 is
 * below A1, so A1 is already generous); 高校入試 follows the 学習指導要領's
 * aim of A1〜A2 by the end of 中学.
 */
export const TARGET: Record<LevelId, Cefr> = {
  eiken4: 'A1',
  eiken3: 'A1',
  eikenPre2: 'A2',
  eiken2: 'B1',
  koukoNyushi: 'A2',
}

/** The bundled CEFR-J Wordlist (see scripts/data/README.md). */
export const loadWordlist = (): Map<string, Cefr> =>
  parseWordlist(readFileSync(new URL('../data/cefrj-vocabulary-profile-1.5.csv', import.meta.url), 'utf8'))

export interface WordUse {
  word: string
  level: Cefr | undefined
  count: number
  example: string
}

export interface LevelVocabulary {
  target: Cefr
  /** Every distinct word the level uses. */
  words: WordUse[]
  /** Above the target and not on the allowlist — should be replaced. */
  above: WordUse[]
  /** Above the target but on the allowlist (see allowlist.ts). */
  allowedAbove: WordUse[]
  /** Not in the wordlist at all: names, or forms the lemmatizer missed. */
  unlisted: WordUse[]
  /** Wordlist entries at or below the target the level never uses. */
  unused: string[]
  /** How many wordlist entries are at or below the target. */
  targetSize: number
}

export function analyzeLevel(levelId: LevelId, questions: readonly Question[], wordlist: Map<string, Cefr>): LevelVocabulary {
  const target = TARGET[levelId]
  const uses = new Map<string, WordUse>()
  for (const question of questions) {
    for (const { key, level } of lookupTokens(tokenize(question.words), wordlist)) {
      const use = uses.get(key) ?? { word: key, level, count: 0, example: question.words.join(' ') }
      use.count++
      uses.set(key, use)
    }
  }
  const words = [...uses.values()]
  const isAbove = (use: WordUse) => !!use.level && cefrRank(use.level) > cefrRank(target)
  const byDifficulty = (a: WordUse, b: WordUse) => cefrRank(b.level!) - cefrRank(a.level!) || b.count - a.count

  const targetWords = [...wordlist.entries()].filter(([, level]) => cefrRank(level) <= cefrRank(target))
  return {
    target,
    words,
    above: words.filter((use) => isAbove(use) && !isAllowed(use.word, levelId)).sort(byDifficulty),
    allowedAbove: words.filter((use) => isAbove(use) && isAllowed(use.word, levelId)).sort(byDifficulty),
    unlisted: words.filter((use) => !use.level).sort((a, b) => b.count - a.count),
    unused: targetWords.filter(([word]) => !uses.has(word)).map(([word]) => word),
    targetSize: targetWords.length,
  }
}
