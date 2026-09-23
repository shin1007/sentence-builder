/**
 * Checks each level's vocabulary against the CEFR-J Wordlist:
 * `npm run vocab:audit` (add `--all` to print every word, not just the top).
 *
 * The banks were built grammar-first — vocabulary was whatever filled the
 * templates — so nothing checked whether a 英検4級 question uses 4級 words.
 * This report shows, per level:
 *   - how the level's words spread over A1〜B2,
 *   - words above the level's target (candidates to swap for easier ones),
 *   - words the list doesn't have (names, or forms the lemmatizer missed),
 *   - how much of the target-level vocabulary the level actually uses.
 * It only reports; deciding what to change is left to whoever reads it.
 *
 * Word levels come from the CEFR-J Wordlist Version 1.5 (Tono Laboratory,
 * TUFS), bundled in scripts/data — see scripts/data/README.md.
 */
import { readFileSync } from 'node:fs'
import { QUESTIONS } from '../src/data/questions'
import { getLevel } from '../src/data/levels'
import type { LevelId } from '../src/types'
import { CEFR_ORDER, cefrRank, lookupTokens, parseWordlist, tokenize, type Cefr } from './vocab-audit/lexicon'

/**
 * The CEFR level each game level's vocabulary should sit within. The 英検
 * grades follow 英検's own CEFR mapping (3級 A1, 準2級 A2, 2級 B1; 4級 is
 * below A1, so A1 is already generous); 高校入試 follows the 学習指導要領's
 * aim of A1〜A2 by the end of 中学.
 */
const TARGET: Record<LevelId, Cefr> = {
  eiken4: 'A1',
  eiken3: 'A1',
  eikenPre2: 'A2',
  eiken2: 'B1',
  koukoNyushi: 'A2',
}

const TOP = 30
const showAll = process.argv.includes('--all')

const wordlist = parseWordlist(
  readFileSync(new URL('./data/cefrj-vocabulary-profile-1.5.csv', import.meta.url), 'utf8'),
)

interface WordUse {
  level: Cefr | undefined
  count: number
  example: string
}

const pct = (n: number, total: number) => (total ? `${Math.round((n / total) * 100)}%` : '-')
const limit = <T,>(list: T[]) => (showAll ? list : list.slice(0, TOP))

for (const [levelId, questions] of Object.entries(QUESTIONS) as [LevelId, (typeof QUESTIONS)[LevelId]][]) {
  const target = TARGET[levelId]
  const uses = new Map<string, WordUse>()
  for (const question of questions) {
    for (const { key, level } of lookupTokens(tokenize(question.words), wordlist)) {
      const use = uses.get(key) ?? { level, count: 0, example: question.words.join(' ') }
      use.count++
      uses.set(key, use)
    }
  }

  const entries = [...uses.entries()]
  const byLevel = new Map<Cefr | undefined, number>()
  for (const [, use] of entries) byLevel.set(use.level, (byLevel.get(use.level) ?? 0) + 1)

  const above = entries
    .filter(([, use]) => use.level && cefrRank(use.level) > cefrRank(target))
    .sort(([, a], [, b]) => cefrRank(b.level!) - cefrRank(a.level!) || b.count - a.count)
  const unlisted = entries.filter(([, use]) => !use.level).sort(([, a], [, b]) => b.count - a.count)

  const targetWords = [...wordlist.entries()].filter(([, level]) => cefrRank(level) <= cefrRank(target))
  const unused = targetWords.filter(([word]) => !uses.has(word)).map(([word]) => word)

  const level = getLevel(levelId)!
  console.log(`\n==== ${level.icon} ${level.title} (目標 ${target}) — ${questions.length}問 / 異なり語 ${entries.length} ====`)
  console.log(
    '  内訳: ' +
      [...CEFR_ORDER, undefined]
        .map((l) => `${l ?? '未収録'} ${byLevel.get(l) ?? 0}語(${pct(byLevel.get(l) ?? 0, entries.length)})`)
        .join(' / '),
  )

  console.log(`\n  -- 目標より上の語 (${above.length}) --`)
  for (const [word, use] of limit(above)) {
    console.log(`    ${use.level} ${word.padEnd(16)} ${String(use.count).padStart(3)}回  例: ${use.example}`)
  }

  console.log(`\n  -- 未収録の語 (${unlisted.length}) 固有名詞や、原形に戻せなかった語 --`)
  console.log('    ' + limit(unlisted).map(([word, use]) => `${word}(${use.count})`).join(' '))

  console.log(
    `\n  -- 目標レベル以下の語のうち使っていない語: ${unused.length} / ${targetWords.length} (カバー率 ${pct(targetWords.length - unused.length, targetWords.length)}) --`,
  )
  console.log('    ' + limit(unused).join(' ') + (showAll || unused.length <= TOP ? '' : ' …'))
}
