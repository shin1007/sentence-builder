import type { LevelId, Question } from '../types'
import { eiken4Questions } from './templates/eiken4'
import { eiken3Questions } from './templates/eiken3'
import { eikenPre2Questions } from './templates/eikenPre2'
import { eiken2Questions } from './templates/eiken2'

/**
 * Each level's bank is generated from a small set of grammar templates
 * combined with shared vocabulary banks (see data/templates/*.ts and
 * data/vocab.ts), so the pool stays grammatically correct while covering
 * far more lexical variety than hand-typing every sentence would allow.
 */
export const QUESTIONS: Record<LevelId, Question[]> = {
  eiken4: eiken4Questions,
  eiken3: eiken3Questions,
  eikenPre2: eikenPre2Questions,
  eiken2: eiken2Questions,
}

function shuffle<T>(items: T[]): T[] {
  const shuffled = [...items]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function medianWordCount(pool: Question[]): number {
  const counts = pool.map((question) => question.words.length).sort((a, b) => a - b)
  const mid = Math.floor(counts.length / 2)
  return counts.length % 2 === 0 ? (counts[mid - 1] + counts[mid]) / 2 : counts[mid]
}

/**
 * Tile count is an imperfect stand-in for grammatical difficulty, but it's
 * the only signal available without hand-rating every question, and it's
 * only used to avoid the worst case: a fully-random session order can open
 * on the longest, most complex sentence in the pool. If that happens, swap
 * in the first question at-or-below the pool's median tile count instead.
 * The rest of the session's order is left untouched.
 */
export function easeInOpener(session: Question[], pool: Question[]): Question[] {
  if (session.length < 2) return session
  const threshold = medianWordCount(pool)
  if (session[0].words.length <= threshold) return session
  const easyIndex = session.findIndex((question) => question.words.length <= threshold)
  if (easyIndex <= 0) return session
  const eased = [...session]
  ;[eased[0], eased[easyIndex]] = [eased[easyIndex], eased[0]]
  return eased
}

/**
 * Picks `count` questions for a session, biased toward `priorityIds` —
 * questions the player previously got wrong on this level (see
 * utils/reviewQueue.ts) — so they resurface instead of only ever seeing a
 * fresh random slice of the pool. Priority questions aren't clustered at
 * the front of the session; the final order is shuffled too (aside from
 * `easeInOpener` steering away from a hard opener).
 */
export function pickQuestions(levelId: LevelId, count: number, priorityIds: readonly string[] = []): Question[] {
  const pool = QUESTIONS[levelId]
  const prioritySet = new Set(priorityIds)
  const priority = pool.filter((question) => prioritySet.has(question.id))
  const rest = pool.filter((question) => !prioritySet.has(question.id))
  const ordered = [...shuffle(priority), ...shuffle(rest)].slice(0, Math.min(count, pool.length))
  return easeInOpener(shuffle(ordered), pool)
}
