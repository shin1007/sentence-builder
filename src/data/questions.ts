import type { LevelId, Question } from '../types'
import { grammarIdForNote, type GrammarId } from './grammar'
import { eiken4Questions } from './templates/eiken4'
import { eiken4ExtraQuestions } from './templates/eiken4Extra'
import { eiken3Questions } from './templates/eiken3'
import { eiken3ExtraQuestions } from './templates/eiken3Extra'
import { eikenPre2Questions } from './templates/eikenPre2'
import { eikenPre2ExtraQuestions } from './templates/eikenPre2Extra'
import { eiken2Questions } from './templates/eiken2'
import { eiken2ExtraQuestions } from './templates/eiken2Extra'
import { koukoNyushiQuestions } from './templates/koukoNyushi'
import { koukoNyushiRealQuestions } from './templates/koukoNyushiReal'
import { idiomQuestions } from './templates/idioms'
import { eiken4VocabQuestions } from './templates/eiken4Vocab'
import { eiken3VocabQuestions } from './templates/eiken3Vocab'

/**
 * Longest answer the game will serve, in words.
 *
 * The banks are mostly short (90% of questions are 10 words or fewer), but
 * the real past-exam set reached 21 words — a sentence that can't be solved
 * inside any sane time limit and whose 21 tiles don't fit the tray on a
 * phone-sized landscape screen. Anything past this cap is held back rather
 * than served as an unwinnable question. Raise it if the tray layout ever
 * grows to handle longer sentences; the bank keeps the data either way.
 */
export const MAX_WORDS_PER_QUESTION = 12

/**
 * Filters out over-long questions and stamps each survivor with its grammar
 * tag. Templates only write the display `note`; the normalized tag is derived
 * here so a template author has one thing to keep in sync rather than two
 * (grammar.test.ts fails if a note has no mapping).
 */
const buildBank = (questions: Question[]): Question[] =>
  questions
    .filter((question) => question.words.length <= MAX_WORDS_PER_QUESTION)
    .map((question) => ({ ...question, grammar: grammarIdForNote(question.note) }))

/**
 * Each level's bank is generated from a small set of grammar templates
 * combined with shared vocabulary banks (see data/templates/*.ts and
 * data/vocab.ts), so the pool stays grammatically correct while covering
 * far more lexical variety than hand-typing every sentence would allow.
 */
export const QUESTIONS: Record<LevelId, Question[]> = {
  eiken4: buildBank([...eiken4Questions, ...eiken4ExtraQuestions, ...eiken4VocabQuestions, ...idiomQuestions.eiken4]),
  eiken3: buildBank([...eiken3Questions, ...eiken3ExtraQuestions, ...eiken3VocabQuestions, ...idiomQuestions.eiken3]),
  eikenPre2: buildBank([...eikenPre2Questions, ...eikenPre2ExtraQuestions, ...idiomQuestions.eikenPre2]),
  eiken2: buildBank([...eiken2Questions, ...eiken2ExtraQuestions, ...idiomQuestions.eiken2]),
  koukoNyushi: buildBank([...koukoNyushiQuestions, ...koukoNyushiRealQuestions, ...idiomQuestions.koukoNyushi]),
}

/**
 * Each level's questions indexed by grammar tag. Review that resurfaces a
 * grammar point needs *other* sentences drilling the same point, and this is
 * the lookup for them; it also makes thin tags (one or two sentences, where
 * "review" would just replay the same sentence) easy to spot.
 */
export const QUESTIONS_BY_GRAMMAR: Record<LevelId, Partial<Record<GrammarId, Question[]>>> = Object.fromEntries(
  Object.entries(QUESTIONS).map(([levelId, questions]) => {
    const byGrammar: Partial<Record<GrammarId, Question[]>> = {}
    for (const question of questions) {
      if (!question.grammar) continue
      ;(byGrammar[question.grammar] ??= []).push(question)
    }
    return [levelId, byGrammar]
  }),
) as Record<LevelId, Partial<Record<GrammarId, Question[]>>>

/** How many questions exist for each grammar tag, across every level. */
export function grammarCoverage(): Map<GrammarId, number> {
  const counts = new Map<GrammarId, number>()
  for (const questions of Object.values(QUESTIONS)) {
    for (const question of questions) {
      if (!question.grammar) continue
      counts.set(question.grammar, (counts.get(question.grammar) ?? 0) + 1)
    }
  }
  return counts
}

function shuffle<T>(items: T[]): T[] {
  const shuffled = [...items]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

/**
 * Relative draw weight per grammar tag (see utils/grammarStats.ts's
 * grammarWeights). A tag left out is weighted 1.
 */
export type GrammarWeights = Partial<Record<GrammarId, number>>

/**
 * Shuffles so that heavier items tend to come first (Efraimidis–Spirakis
 * weighted sampling without replacement: each item's key is u^(1/w)). With
 * every weight 1 this is a plain uniform shuffle.
 */
function weightedShuffle<T>(items: readonly T[], weightOf: (item: T) => number): T[] {
  return items
    .map((item) => ({ item, key: Math.random() ** (1 / Math.max(weightOf(item), 1e-6)) }))
    .sort((a, b) => b.key - a.key)
    .map(({ item }) => item)
}

/**
 * The review questions among `priorityIds` found in this level, each followed
 * by one *other* sentence drilling the same grammar point.
 *
 * Replaying only the exact sentence that was missed lets a player pass review
 * by remembering that sentence's tile order; a sibling on the same point
 * checks the grammar has actually stuck. They're interleaved so that, when
 * there's more review due than fits, a session still covers pairs rather than
 * spending every slot on repeats and none on siblings.
 */
function reviewWithSiblings(levelId: LevelId, priorityIds: readonly string[]): Question[] {
  const prioritySet = new Set(priorityIds)
  const priority = shuffle(QUESTIONS[levelId].filter((question) => prioritySet.has(question.id)))
  const chosen = new Set(priority.map((question) => question.id))

  const review: Question[] = []
  for (const question of priority) {
    review.push(question)
    const sameGrammar = question.grammar ? (QUESTIONS_BY_GRAMMAR[levelId][question.grammar] ?? []) : []
    const sibling = shuffle(sameGrammar).find((candidate) => !chosen.has(candidate.id))
    if (sibling) {
      review.push(sibling)
      chosen.add(sibling.id)
    }
  }
  return review
}

/**
 * Picks `count` questions for a session, biased toward `priorityIds` —
 * questions the player previously got wrong on this level (see
 * utils/reviewQueue.ts) — so they resurface instead of only ever seeing a
 * fresh random slice of the pool. Each comes with a same-grammar sibling (see
 * reviewWithSiblings).
 *
 * The rest of the session is drawn at random, weighted by `grammarWeights`, so
 * that grammar the player keeps missing comes up more often and grammar
 * they've clearly got comes up less, instead of every point getting equal
 * time. Priority questions aren't clustered at the front of the session; the
 * final order is shuffled.
 */
export function pickQuestions(
  levelId: LevelId,
  count: number,
  priorityIds: readonly string[] = [],
  grammarWeights: GrammarWeights = {},
): Question[] {
  const pool = QUESTIONS[levelId]
  const review = reviewWithSiblings(levelId, priorityIds)
  const chosen = new Set(review.map((question) => question.id))

  const rest = weightedShuffle(
    pool.filter((question) => !chosen.has(question.id)),
    (question) => (question.grammar ? (grammarWeights[question.grammar] ?? 1) : 1),
  )
  const ordered = [...review, ...rest].slice(0, Math.min(count, pool.length))
  return shuffle(ordered)
}

/**
 * Questions for a dedicated review run: only what's due (`dueIds`) and each
 * one's same-grammar sibling, capped at `count`. Empty when nothing is due.
 */
export function pickReviewQuestions(levelId: LevelId, dueIds: readonly string[], count: number): Question[] {
  return shuffle(reviewWithSiblings(levelId, dueIds).slice(0, count))
}

/** How many of `dueIds` still exist in this level's bank — the review count
 * worth showing, since ids of questions dropped from the bank can linger in
 * a player's saved queue. */
export function countDueQuestions(levelId: LevelId, dueIds: readonly string[]): number {
  return questionsByIds(levelId, dueIds).length
}

/** Questions for a practice run on one grammar point within a level. */
export function pickGrammarQuestions(levelId: LevelId, grammar: GrammarId, count: number): Question[] {
  return shuffle(QUESTIONS_BY_GRAMMAR[levelId][grammar] ?? []).slice(0, count)
}

/** Looks questions up by id in a level, in the order given, skipping unknown ids. */
export function questionsByIds(levelId: LevelId, ids: readonly string[]): Question[] {
  const byId = new Map(QUESTIONS[levelId].map((question) => [question.id, question]))
  return ids.flatMap((id) => byId.get(id) ?? [])
}
