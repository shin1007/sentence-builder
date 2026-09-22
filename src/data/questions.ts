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
  eiken4: buildBank([...eiken4Questions, ...eiken4ExtraQuestions]),
  eiken3: buildBank([...eiken3Questions, ...eiken3ExtraQuestions]),
  eikenPre2: buildBank([...eikenPre2Questions, ...eikenPre2ExtraQuestions]),
  eiken2: buildBank([...eiken2Questions, ...eiken2ExtraQuestions]),
  koukoNyushi: buildBank([...koukoNyushiQuestions, ...koukoNyushiRealQuestions]),
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
 * Picks `count` questions for a session, biased toward `priorityIds` —
 * questions the player previously got wrong on this level (see
 * utils/reviewQueue.ts) — so they resurface instead of only ever seeing a
 * fresh random slice of the pool. Priority questions aren't clustered at
 * the front of the session; the final order is shuffled too.
 */
export function pickQuestions(levelId: LevelId, count: number, priorityIds: readonly string[] = []): Question[] {
  const pool = QUESTIONS[levelId]
  const prioritySet = new Set(priorityIds)
  const priority = pool.filter((question) => prioritySet.has(question.id))
  const rest = pool.filter((question) => !prioritySet.has(question.id))
  const ordered = [...shuffle(priority), ...shuffle(rest)].slice(0, Math.min(count, pool.length))
  return shuffle(ordered)
}
