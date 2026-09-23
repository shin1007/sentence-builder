import { countDueQuestions } from '../data/questions'
import type { LevelId } from '../types'

const KEY_PREFIX = 'wordrush.missed.'
/** Caps how many missed questions we track per level so the list can't grow
 * forever; the oldest entry is dropped first when it's exceeded. */
const MAX_TRACKED = 30

const DAY_MS = 24 * 60 * 60 * 1000

/** Light SM-2-style spacing: a freshly-missed question is due again right
 * away (step 0), and each time it's subsequently answered correctly it
 * jumps to the next, wider gap. Working through every step means it's
 * mastered and drops out of the queue instead of resurfacing at day 14+. */
const REVIEW_STEP_DAYS = [0, 1, 3, 7, 14]

interface ReviewItem {
  id: string
  /** Index into REVIEW_STEP_DAYS for how far this item has progressed. */
  step: number
  /** Epoch ms; the item resurfaces in session picks once this has passed. */
  dueAt: number
}

function isReviewItem(value: unknown): value is ReviewItem {
  return (
    !!value &&
    typeof value === 'object' &&
    typeof (value as ReviewItem).id === 'string' &&
    typeof (value as ReviewItem).step === 'number' &&
    typeof (value as ReviewItem).dueAt === 'number'
  )
}

function readItems(levelId: LevelId): ReviewItem[] {
  try {
    const raw = localStorage.getItem(KEY_PREFIX + levelId)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    // The pre-spaced-repetition format stored a plain string[] of missed
    // ids. Treat those as due-now items at step 0 instead of discarding a
    // player's existing review history when this ships.
    return parsed
      .map((entry): ReviewItem | null => {
        if (typeof entry === 'string') return { id: entry, step: 0, dueAt: 0 }
        return isReviewItem(entry) ? entry : null
      })
      .filter((entry): entry is ReviewItem => entry !== null)
  } catch {
    return []
  }
}

function writeItems(levelId: LevelId, items: ReviewItem[]) {
  try {
    localStorage.setItem(KEY_PREFIX + levelId, JSON.stringify(items))
  } catch {
    /* storage unavailable — review history just won't persist */
  }
}

/** Ids of questions due for review right now: missed previously and not
 * yet answered correctly enough times (with enough time passed) to clear
 * their spacing interval. Used to bias the next session's question picks
 * toward what the player is still shaky on. */
export function loadDueIds(levelId: LevelId, now = Date.now()): string[] {
  return readItems(levelId)
    .filter((item) => item.dueAt <= now)
    .map((item) => item.id)
}

/** How many questions on this level are due for review right now — what a
 * review run (FocusSession 'review') would draw from. */
export function dueReviewCount(levelId: LevelId, now = Date.now()): number {
  return countDueQuestions(levelId, loadDueIds(levelId, now))
}

/** Marks a question as missed, resetting it to step 0 (due immediately) —
 * whether it's new to the queue or was partway through being mastered. */
export function recordMiss(levelId: LevelId, questionId: string, now = Date.now()) {
  const items = readItems(levelId).filter((item) => item.id !== questionId)
  items.push({ id: questionId, step: 0, dueAt: now })
  writeItems(levelId, items.slice(-MAX_TRACKED))
}

/** Answering a previously-missed question correctly advances it to the
 * next, wider review interval rather than clearing it outright — it only
 * leaves the queue (mastered) once it's worked through every step. A
 * question that was never missed isn't tracked, so this is a no-op for it. */
export function recordCorrect(levelId: LevelId, questionId: string, now = Date.now()) {
  const items = readItems(levelId)
  const index = items.findIndex((item) => item.id === questionId)
  if (index === -1) return

  const nextStep = items[index].step + 1
  if (nextStep >= REVIEW_STEP_DAYS.length) {
    writeItems(
      levelId,
      items.filter((item) => item.id !== questionId),
    )
    return
  }
  items[index] = { id: questionId, step: nextStep, dueAt: now + REVIEW_STEP_DAYS[nextStep] * DAY_MS }
  writeItems(levelId, items)
}
