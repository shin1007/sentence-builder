import type { Question } from '../types'
import type { GrammarId } from './grammar'
import { normalizeToken, posOf, type PosFlag } from './pos'

/**
 * Hints aimed at the word-order mistakes Japanese speakers typically make.
 *
 * Japanese puts the verb last, puts particles after the noun (「駅で」), and
 * puts every description before the noun it describes (「公園で遊んでいる男の子」).
 * English does the opposite on all three, and a learner falling back on the
 * Japanese order produces the same few mistakes over and over. Naming the
 * rule that was broken ("in / at は名詞の前") gives the player something more
 * useful than the grammar point's name, and more than the answer itself.
 *
 * Each rule looks at the first place the player's order parts from the
 * answer: the tile that belongs there (`expected`) and the one they put there
 * instead (`tried`, which belongs further on). Rules only fire when the
 * pattern is clear; otherwise there's no hint beyond the usual one.
 */

export type OrderMistake = 'questionAux' | 'indirectQuestion' | 'postModifier' | 'preposition' | 'verbLate'

export const ORDER_HINTS: Record<OrderMistake, string> = {
  questionAux: '疑問文は Do / Is / Can などを主語の前に置くよ',
  indirectQuestion: '文の中の疑問は「疑問詞 → 主語 → 動詞」の順。ふつうの文と同じ並びだよ',
  postModifier: '名詞をくわしく説明することば（〜している・〜された・who / which・前置詞のまとまり）は、名詞のうしろに置くよ',
  preposition: 'in / at / to などは名詞の前に置くよ（日本語の「〜で」「〜に」とは逆の順番）',
  verbLate: '英語は「だれが → どうする → 何を」の順。動詞を先に置こう',
}

/** Points that put a description after its noun. */
const POST_MODIFIER_GRAMMAR = new Set<GrammarId>([
  'participlePresentModifier',
  'participlePastModifier',
  'prepPhraseModifier',
  'relativeWho',
  'relativeWhich',
  'relativeThat',
  'relativeObject',
  'relativeOmitted',
  'relativeWhose',
  'relativeAdverbWhere',
  'relativeAdverbWhen',
  'infinitiveAdjective',
])

const RELATIVE_WORDS = new Set(['who', 'which', 'that', 'whose', 'where', 'when'])
/** Auxiliaries that move in front of the subject in a question. */
const QUESTION_AUX = new Set(
  'do does did is are am was were can could will would shall should may might must have has had'.split(' '),
)
const WH_WORDS = new Set(['what', 'where', 'why', 'how', 'when', 'who', 'which', 'whose', 'if', 'whether'])

/** Parts of speech of a tile — for a merged tile, of its first word. */
const posOfTile = (tile: string): ReadonlySet<PosFlag> => posOf(tile.split(' ')[0])
const has = (pos: ReadonlySet<PosFlag>, ...flags: PosFlag[]) => flags.some((f) => pos.has(f))
const isVerbish = (pos: ReadonlySet<PosFlag>) => has(pos, 'v', 'm')
/** Something that can start a subject or object: a noun, pronoun,
 * determiner or number, and not also a verb. */
const isNominal = (pos: ReadonlySet<PosFlag>) => has(pos, 'n', 'o', 'd', 'u') && !isVerbish(pos)
/** A word that can only be a preposition (`in`, `at`, `to`) — not `than`
 * (also a conjunction) or `like` (also a verb). */
const isPrepositionOnly = (pos: ReadonlySet<PosFlag>) => pos.has('p') && !has(pos, 'v', 'n', 'a', 'm', 'c')
/** A verb or auxiliary and nothing but — except that a noun-or-verb word
 * (`play`) counts right after a subject pronoun, where it's the verb. `last`
 * and `like` can be too many other things to say. */
const isVerbHere = (pos: ReadonlySet<PosFlag>, previous: ReadonlySet<PosFlag>) =>
  isVerbish(pos) && !has(pos, 'd', 'a', 'r', 'p', 'c', 'o') && (!pos.has('n') || previous.has('o'))
/** A description after a noun has to start right after it and the stray
 * tile has to come from near it — further on it's the main clause. */
const POST_MODIFIER_REACH = 4
const endsLikeParticiple = (tile: string) => /(ing|ed)$/.test(normalizeToken(tile.split(' ')[0]))
/** The noun a description would follow: a noun that isn't also a verb
 * (`look`), or a merged noun-phrase tile. */
function isHeadNoun(tile: string): boolean {
  const words = tile.split(' ')
  const last = posOf(words[words.length - 1])
  return last.has('n') && (words.length > 1 || (!isVerbish(last) && !last.has('a')))
}

/** The accepted order the placed tiles follow longest from the start. */
function closestOrder(placed: readonly (string | null)[], orders: readonly string[][]): string[] {
  let best = orders[0]
  let bestLen = -1
  for (const o of orders) {
    let len = 0
    while (len < placed.length && placed[len] === o[len]) len++
    if (len > bestLen) {
      best = o
      bestLen = len
    }
  }
  return best
}

/**
 * Which typical mistake the player's order shows, or null. `placed` is the
 * answer slots (null for an empty one); for the check-each-tile mode, pass
 * the slots with the rejected tile in the slot it was tried in.
 */
export function detectOrderMistake(
  question: Question,
  placed: readonly (string | null)[],
  orders: readonly string[][],
): OrderMistake | null {
  const order = closestOrder(placed, orders)
  const k = placed.findIndex((tile, i) => tile !== null && tile !== order[i])
  if (k === -1) return null
  const tried = placed[k]!
  const expected = order[k]
  // The tried tile has to belong further on — an earlier one is a different
  // kind of slip.
  const j = order.indexOf(tried, k + 1)
  if (j === -1) return null

  const exp = posOfTile(expected)
  const got = posOfTile(tried)
  const grammar = question.grammar
  const isQuestion = question.words[question.words.length - 1].endsWith('?')
  const before = order.slice(0, k).map((tile) => normalizeToken(tile.split(' ')[0]))

  if (grammar === 'indirectQuestion') {
    // After the question word, the subject comes before the verb.
    if (before.some((w) => WH_WORDS.has(w)) && isVerbish(got) && !got.has('n') && isNominal(exp)) return 'indirectQuestion'
    return null
  }
  if (isQuestion && QUESTION_AUX.has(normalizeToken(expected)) && isNominal(got)) return 'questionAux'
  if (grammar && POST_MODIFIER_GRAMMAR.has(grammar) && isHeadNoun(expected) && j <= k + POST_MODIFIER_REACH) {
    const next = order[k + 1] ?? ''
    const opensModifier =
      RELATIVE_WORDS.has(normalizeToken(next)) ||
      isPrepositionOnly(posOfTile(next)) ||
      endsLikeParticiple(next) ||
      normalizeToken(next) === 'to' ||
      // `the pen I bought`: a relative clause with its pronoun left out.
      posOfTile(next).has('o')
    if (opensModifier) return 'postModifier'
  }
  // `to` before a verb is the infinitive, not a preposition.
  const infinitiveTo = normalizeToken(expected) === 'to' && isVerbish(posOfTile(order[k + 1] ?? ''))
  if (isPrepositionOnly(exp) && !infinitiveTo && j <= k + 2 && isNominal(got)) return 'preposition'
  // Inside an idiom (`took care of`) the words aren't a free verb + object.
  const inIdiom = !!question.idiom && k >= question.idiom.start && k < question.idiom.end
  const previous = k > 0 ? posOfTile(order[k - 1]) : new Set<PosFlag>()
  if (!isQuestion && !inIdiom && isVerbHere(exp, previous) && isNominal(got)) return 'verbLate'
  return null
}
