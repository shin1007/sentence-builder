import type { Question } from '../types'

const KEY = 'wordrush.idioms'

/**
 * Clean correct answers an idiom needs before its words are served as
 * separate tiles. Until then the phrase is one tile, so it's met as a single
 * unit first and only later taken apart — a scaffold that comes off once the
 * player has shown they know the phrase.
 */
export const IDIOM_CHUNKED_UNTIL = 2

/** Clean correct answers per idiom phrase, across all levels (knowing a
 * phrase doesn't depend on which level it came up in). */
type Progress = Record<string, number>

function read(): Progress {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return {}
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {}
    return Object.fromEntries(
      Object.entries(parsed).filter((entry): entry is [string, number] => typeof entry[1] === 'number'),
    )
  } catch {
    return {}
  }
}

function write(progress: Progress) {
  try {
    localStorage.setItem(KEY, JSON.stringify(progress))
  } catch {
    /* storage unavailable — the idiom just stays chunked */
  }
}

/** Whether this question's idiom should be served as one tile right now. */
export function shouldChunkIdiom(question: Question): boolean {
  if (!question.idiom) return false
  return (read()[question.idiom.phrase] ?? 0) < IDIOM_CHUNKED_UNTIL
}

/**
 * Books a first-try result for the question's idiom. A clean correct answer
 * moves it toward separate tiles; a miss moves it one step back, so a phrase
 * that falls apart once split goes back to being one tile until it's solid
 * again.
 */
export function recordIdiomResult(question: Question, correct: boolean) {
  if (!question.idiom) return
  const progress = read()
  const current = progress[question.idiom.phrase] ?? 0
  progress[question.idiom.phrase] = correct ? current + 1 : Math.max(0, current - 1)
  write(progress)
}

/**
 * The answer as the tiles the player places: one entry per word, except that
 * a chunked idiom's words are joined into a single entry. Joining the result
 * with spaces always gives back the full sentence.
 */
export function answerUnits(question: Question, chunked: boolean): string[] {
  const { words, idiom } = question
  if (!chunked || !idiom) return words
  return [...words.slice(0, idiom.start), words.slice(idiom.start, idiom.end).join(' '), ...words.slice(idiom.end)]
}
