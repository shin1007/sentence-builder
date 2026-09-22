/**
 * Prints how many questions back each grammar tag: `npm run grammar:coverage`.
 *
 * The taxonomy in src/data/grammar.ts deliberately runs ahead of the question
 * banks — we can't predict which points a player will be weak at, so it covers
 * the standard syllabus whether or not questions exist yet. This report is how
 * the holes stay visible: tags with 0 questions are points the game can't
 * teach at all, and thin tags (a handful of sentences) are points where
 * grammar-targeted review would just replay the same sentence.
 */
import { CATEGORY_LABELS, GRAMMAR_ITEMS, type GrammarCategory } from '../src/data/grammar'
import { grammarCoverage } from '../src/data/questions'

/** Below this, review can't offer enough different sentences to feel fresh. */
const THIN_THRESHOLD = 10

const counts = grammarCoverage()
const rows = GRAMMAR_ITEMS.map((item) => ({ ...item, count: counts.get(item.id) ?? 0 }))

const missing = rows.filter((row) => row.count === 0)
const thin = rows.filter((row) => row.count > 0 && row.count < THIN_THRESHOLD)

console.log(`タグ総数 ${rows.length} / 出題あり ${rows.length - missing.length} / 問題総数 ${[...counts.values()].reduce((a, b) => a + b, 0)}`)

const byCategory = (list: typeof rows) => {
  const groups = new Map<GrammarCategory, typeof rows>()
  for (const row of list) groups.set(row.category, [...(groups.get(row.category) ?? []), row])
  return [...groups.entries()]
}

console.log(`\n== 出題ゼロ (${missing.length}) ==`)
for (const [category, list] of byCategory(missing)) {
  console.log(`  ${CATEGORY_LABELS[category]}`)
  for (const row of list.sort((a, b) => a.stage - b.stage)) {
    console.log(`    [stage ${row.stage}] ${row.label}`)
  }
}

console.log(`\n== 手薄 (1〜${THIN_THRESHOLD - 1}問, ${thin.length}) ==`)
for (const row of thin.sort((a, b) => a.count - b.count || a.stage - b.stage)) {
  console.log(`  ${String(row.count).padStart(3)}問  [stage ${row.stage}] ${row.label}`)
}
