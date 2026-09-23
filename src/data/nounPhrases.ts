import { isOnly, normalizeToken, posOf } from './pos'

/** Words that open a noun phrase. `that` is left out: it's as often a
 * conjunction or relative pronoun ("I think that people …"). */
const DETERMINERS = new Set(['a', 'an', 'the', 'my', 'your', 'his', 'her', 'our', 'their', 'its', 'this', 'these', 'those'])

/** Verbs that take two objects, after which `her` is more likely the first
 * object than a possessive ("I gave her books"). */
const TWO_OBJECT_VERBS = new Set(
  'give gives gave given giving show shows showed shown tell tells told buy buys bought send sends sent teach teaches taught make makes made bring brings brought lend lends lent pass passes passed ask asks asked get gets got find finds found cook cooks cooked write writes wrote read reads'.split(
    ' ',
  ),
)

/** At most this many adjectives between the determiner and the noun. */
const MAX_ADJECTIVES = 2

/** Punctuation inside the sentence (a comma, `Mr.`) ends any phrase there. */
const hasInnerPunct = (word: string, isLast: boolean) => (isLast ? /[,;:]$/.test(word) : /[.,;:!?]$/.test(word))

/**
 * Simple noun phrases in a sentence, as [start, end) word ranges: a
 * determiner, up to two adjectives, and a noun — `the station`, `my father`,
 * `a red umbrella`. Deliberately cautious, since a wrong chunk would glue
 * together words that don't belong together:
 * - the noun has to be a word that can only be a noun (so `the boy plays`
 *   stops at `boy`),
 * - a phrase followed by another noun is skipped rather than guessed at
 *   (`the tennis club`), as is one followed by `of` (`a lot of`, `a cup of`),
 * - `her` right after a two-object verb is skipped (`gave her books`).
 */
export function nounPhraseSpans(words: readonly string[]): [number, number][] {
  const n = words.length
  const spans: [number, number][] = []
  for (let i = 0; i < n - 1; i++) {
    const det = normalizeToken(words[i])
    if (!DETERMINERS.has(det) || hasInnerPunct(words[i], false)) continue
    if (det === 'her' && i > 0 && TWO_OBJECT_VERBS.has(normalizeToken(words[i - 1]))) continue

    let j = i + 1
    while (j < n - 1 && j - i - 1 < MAX_ADJECTIVES && posOf(words[j]).has('a') && !isOnly(words[j], 'n')) {
      if (hasInnerPunct(words[j], false)) break
      j++
    }
    if (!isOnly(words[j], 'n') || /^[A-Z]/.test(words[j]) || hasInnerPunct(words[j], j === n - 1)) continue
    const after = words[j + 1]
    if (after !== undefined && (isOnly(after, 'n') || normalizeToken(after) === 'of')) continue
    spans.push([i, j + 1])
    i = j
  }
  return spans
}
