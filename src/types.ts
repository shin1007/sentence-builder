export type LevelId = 'eiken4' | 'eiken3' | 'eikenPre2' | 'eiken2' | 'koukoNyushi'

export interface Question {
  id: string
  /** Japanese prompt the player translates into English word order. */
  jp: string
  /** Correct English word order; each entry is exactly one draggable tile. */
  words: string[]
  /** Short grammar note shown after answering, for learning reinforcement. */
  note?: string
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
