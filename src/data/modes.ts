import { grammarLabel } from './grammar'
import type { FocusSession, GameMode } from '../types'

/** Shown on the title, level picker and result screens so a run's mode is
 * never ambiguous — both modes share one best-score record per level. */
export const MODE_LABEL: Record<GameMode, string> = {
  challenge: '10問チャレンジ',
  endless: 'エンドレス',
}

/** Names a focus run on the HUD and result screen. */
export function focusLabel(focus: FocusSession): string {
  switch (focus.kind) {
    case 'grammar':
      return `🎯 ${grammarLabel(focus.grammar)}`
    case 'review':
      return REVIEW_LABEL
    case 'retryMissed':
      return '🔁 間違えた問題'
  }
}

/** The spaced-repetition review run (FocusSession 'review'). */
export const REVIEW_LABEL = '📚 復習'

