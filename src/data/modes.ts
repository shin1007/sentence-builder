import type { GameMode } from '../types'

/** Shown on the title, level picker and result screens so a run's mode is
 * never ambiguous — both modes share one best-score record per level. */
export const MODE_LABEL: Record<GameMode, string> = {
  challenge: '10問チャレンジ',
  endless: 'ずっと続ける',
}
