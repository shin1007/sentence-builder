import { LEVELS } from '../data/levels'
import { QUESTIONS } from '../data/questions'
import type { LevelId, Question } from '../types'

const DAILY_QUESTION_COUNT = 10
const STREAK_KEY = 'wordrush.daily.streak'
const LAST_CLEARED_KEY = 'wordrush.daily.lastCleared'

/** Deterministic PRNG (mulberry32) seeded from the date, so every player
 * gets the same daily set and it only changes at local midnight — unlike
 * Math.random(), which would differ per shuffle call. */
function mulberry32(seed: number): () => number {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function hashString(input: string): number {
  let h = 0
  for (let i = 0; i < input.length; i++) {
    h = (Math.imul(31, h) + input.charCodeAt(i)) | 0
  }
  return h >>> 0
}

function seededShuffle<T>(items: readonly T[], rng: () => number): T[] {
  const shuffled = [...items]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

/** Local (not UTC) date key, so the challenge and the streak both turn
 * over at the player's own midnight rather than Greenwich's. */
export function dateKey(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function previousDateKey(date: Date): string {
  const prev = new Date(date)
  prev.setDate(prev.getDate() - 1)
  return dateKey(prev)
}

export interface DailyChallenge {
  /** The underlying level this daily set is drawn from — scores/reviews
   * from playing it feed that level's normal best-score and review-queue
   * storage, same as playing it directly. */
  levelId: LevelId
  questions: Question[]
}

/** Builds today's challenge: a seeded 10-question shuffle of one level's
 * pool, rotating which level by day-of-year so the daily challenge varies
 * in difficulty day to day. Deterministic per date — replaying the same
 * day shows the same set, but it reshuffles at local midnight. */
export function pickDaily(date: Date = new Date()): DailyChallenge {
  const key = dateKey(date)
  const seed = hashString(key)
  const rng = mulberry32(seed)
  const levelId = LEVELS[hashString(key + ':level') % LEVELS.length].id
  const questions = seededShuffle(QUESTIONS[levelId], rng).slice(0, DAILY_QUESTION_COUNT)
  return { levelId, questions }
}

export interface DailyStatus {
  /** Consecutive local days the daily challenge has been cleared, ending
   * today or yesterday (a gap resets it back to 0 on the next clear). */
  streak: number
  /** Whether today's challenge has already been cleared once. */
  clearedToday: boolean
}

function readStreak(): number {
  try {
    const raw = Number(localStorage.getItem(STREAK_KEY))
    return Number.isFinite(raw) && raw >= 0 ? raw : 0
  } catch {
    return 0
  }
}

function readLastCleared(): string | null {
  try {
    return localStorage.getItem(LAST_CLEARED_KEY)
  } catch {
    return null
  }
}

export function getDailyStatus(date: Date = new Date()): DailyStatus {
  return { streak: readStreak(), clearedToday: readLastCleared() === dateKey(date) }
}

/** Call once when a daily-challenge session finishes (outside practice
 * mode). Extends the streak when yesterday was the last clear, restarts it
 * at 1 after a gap, and no-ops on a same-day replay so retrying for a
 * better score can't inflate it. */
export function recordDailyClear(date: Date = new Date()): DailyStatus {
  const today = dateKey(date)
  const last = readLastCleared()
  if (last === today) return { streak: readStreak(), clearedToday: true }

  const streak = last === previousDateKey(date) ? readStreak() + 1 : 1
  try {
    localStorage.setItem(STREAK_KEY, String(streak))
    localStorage.setItem(LAST_CLEARED_KEY, today)
  } catch {
    /* storage unavailable — streak just won't persist */
  }
  return { streak, clearedToday: true }
}
