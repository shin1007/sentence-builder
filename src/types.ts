export type LevelId = 'eiken4' | 'eiken3' | 'eikenPre2' | 'eiken2' | 'koukoNyushi'

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
  timeLimitSec: number
  icon: string
}

export interface LevelResult {
  levelId: LevelId
  score: number
  correctCount: number
  totalCount: number
  bestCombo: number
  stars: 0 | 1 | 2 | 3
  clearedAt: number
}
