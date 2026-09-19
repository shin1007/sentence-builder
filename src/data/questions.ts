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

export function pickQuestions(levelId: LevelId, count: number): Question[] {
  const pool = [...QUESTIONS[levelId]]
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return pool.slice(0, Math.min(count, pool.length))
}
