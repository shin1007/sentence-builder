/**
 * Checks each level's vocabulary against the CEFR-J Wordlist:
 * `npm run vocab:audit` (add `--all` to print every word, not just the top).
 *
 * The banks were built grammar-first — vocabulary was whatever filled the
 * templates — so nothing checked whether a 英検4級 question uses 4級 words.
 * This report shows, per level:
 *   - how the level's words spread over A1〜B2,
 *   - words above the level's target that aren't on the allowlist (these
 *     fail vocabulary.test.ts; replace them or allowlist them with a reason),
 *   - words above the target that the allowlist accepts, and why,
 *   - words the list doesn't have (names, or forms the lemmatizer missed),
 *   - how much of the target-level vocabulary the level actually uses.
 *
 * Word levels come from the CEFR-J Wordlist Version 1.5 (Tono Laboratory,
 * TUFS), bundled in scripts/data — see scripts/data/README.md.
 */
import { QUESTIONS } from '../src/data/questions'
import { getLevel } from '../src/data/levels'
import type { LevelId } from '../src/types'
import { ALLOWED_WORDS } from './vocab-audit/allowlist'
import { analyzeLevel, loadWordlist } from './vocab-audit/analyze'
import { CEFR_ORDER, type Cefr } from './vocab-audit/lexicon'

const TOP = 30
const showAll = process.argv.includes('--all')
const limit = <T,>(list: T[]) => (showAll ? list : list.slice(0, TOP))
const pct = (n: number, total: number) => (total ? `${Math.round((n / total) * 100)}%` : '-')

const wordlist = loadWordlist()

for (const levelId of Object.keys(QUESTIONS) as LevelId[]) {
  const questions = QUESTIONS[levelId]
  const report = analyzeLevel(levelId, questions, wordlist)
  const count = (level: Cefr | undefined) => report.words.filter((use) => use.level === level).length

  const level = getLevel(levelId)!
  console.log(`\n==== ${level.icon} ${level.title} (目標 ${report.target}) — ${questions.length}問 / 異なり語 ${report.words.length} ====`)
  console.log(
    '  内訳: ' +
      [...CEFR_ORDER, undefined]
        .map((l) => `${l ?? '未収録'} ${count(l)}語(${pct(count(l), report.words.length)})`)
        .join(' / '),
  )

  console.log(`\n  -- 目標より上の語 (${report.above.length}) 差し替えるか、理由を添えて許可リストへ --`)
  for (const use of limit(report.above)) {
    console.log(`    ${use.level} ${use.word.padEnd(16)} ${String(use.count).padStart(3)}回  例: ${use.example}`)
  }

  const byReason = new Map<string, string[]>()
  for (const use of report.allowedAbove) {
    const reason = ALLOWED_WORDS[use.word].reason
    byReason.set(reason, [...(byReason.get(reason) ?? []), use.word])
  }
  console.log(`\n  -- 目標より上だが許可している語 (${report.allowedAbove.length}) --`)
  for (const [reason, words] of byReason) console.log(`    ${reason}: ${limit(words).join(' ')}`)

  console.log(`\n  -- 未収録の語 (${report.unlisted.length}) 固有名詞や、原形に戻せなかった語 --`)
  console.log('    ' + limit(report.unlisted).map((use) => `${use.word}(${use.count})`).join(' '))

  const used = report.targetSize - report.unused.length
  console.log(
    `\n  -- 目標レベル以下の語のうち使っていない語: ${report.unused.length} / ${report.targetSize} (カバー率 ${pct(used, report.targetSize)}) --`,
  )
  console.log('    ' + limit(report.unused).join(' ') + (showAll || report.unused.length <= TOP ? '' : ' …'))
}
