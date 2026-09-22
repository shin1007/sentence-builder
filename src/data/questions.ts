import type { LevelId, Question } from '../types'
import { eiken4Questions } from './templates/eiken4'
import { eiken3Questions } from './templates/eiken3'
import { eikenPre2Questions } from './templates/eikenPre2'
import { eiken2Questions } from './templates/eiken2'
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

const withinLength = (questions: Question[]): Question[] =>
  questions.filter((question) => question.words.length <= MAX_WORDS_PER_QUESTION)

/**
 * Each level's bank is generated from a small set of grammar templates
 * combined with shared vocabulary banks (see data/templates/*.ts and
 * data/vocab.ts), so the pool stays grammatically correct while covering
 * far more lexical variety than hand-typing every sentence would allow.
 */
export const QUESTIONS: Record<LevelId, Question[]> = {
  eiken4: withinLength(eiken4Questions),
  eiken3: withinLength(eiken3Questions),
  eikenPre2: withinLength(eikenPre2Questions),
  eiken2: withinLength(eiken2Questions),
  koukoNyushi: withinLength([...koukoNyushiQuestions, ...koukoNyushiRealQuestions]),
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
