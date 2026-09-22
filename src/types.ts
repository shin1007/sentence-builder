export type LevelId = 'eiken4' | 'eiken3' | 'eikenPre2' | 'eiken2' | 'koukoNyushi'

/**
 * How a session is bounded.
 * - 'challenge': a fixed 10-question run (the original mode).
 * - 'endless': keeps serving questions until the player runs out of hearts
 *   or taps やめる; the result is scored over however many were answered.
 */
export type GameMode = 'challenge' | 'endless'

/** Attribution for a question adapted from a real, verifiable past exam
 * (as opposed to an originally-written practice question). */
export interface QuestionSource {
  /** Where the exam is from, e.g. "神奈川県" or a school name. */
  region: string
  /** The exam's school year, e.g. "令和7年度(2025年)". */
  year: string
}

export interface Question {
  id: string
  /** Japanese prompt the player translates into English word order. */
  jp: string
  /** Correct English word order; each entry is exactly one draggable tile. */
  words: string[]
  /** Short grammar note shown after answering, for learning reinforcement. */
  note?: string
  /** Present only for questions adapted from a real past exam. */
  source?: QuestionSource
}

export interface LevelInfo {
  id: LevelId
  title: string
  subtitle: string
  description: string
  gradient: [string, string]
  accent: string
  /**
   * Seconds of thinking time granted per word of the answer, on top of
   * BASE_TIME_SEC. This is the level’s difficulty dial — see
   * data/timeLimit.ts for why the limit is derived rather than fixed.
   */
  secPerWord: number
  icon: string
}

export interface LevelResult {
  levelId: LevelId
  /** Absent on results stored before endless mode existed — treat as 'challenge'. */
  mode?: GameMode
  score: number
  correctCount: number
  totalCount: number
  bestCombo: number
  stars: 0 | 1 | 2 | 3
  clearedAt: number
}
