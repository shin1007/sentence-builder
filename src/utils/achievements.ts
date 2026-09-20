import { LEVELS } from '../data/levels'
import { loadBestResult } from './storage'
import type { LevelResult } from '../types'

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first-clear', title: 'はじめの一歩', description: 'はじめてレベルをクリアした', icon: '🎉' },
  { id: 'perfect', title: 'パーフェクト', description: '10問すべて正解でクリアした', icon: '💯' },
  { id: 'combo-master', title: 'コンボマスター', description: '1回のプレイで8コンボ以上をつなげた', icon: '🔥' },
  { id: 'three-stars', title: '三ツ星', description: 'いずれかのレベルで星3つを獲得した', icon: '⭐' },
  { id: 'all-clear', title: '全制覇', description: 'すべてのレベルを一度はクリアした', icon: '🏆' },
  { id: 'daily-streak-3', title: '3日連続チャレンジ', description: 'デイリーチャレンジを3日連続でクリアした', icon: '📅' },
  { id: 'daily-streak-7', title: '1週間連続チャレンジ', description: 'デイリーチャレンジを7日連続でクリアした', icon: '🗓️' },
]

const KEY = 'wordrush.achievements'

function readUnlockedIds(): string[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : []
  } catch {
    return []
  }
}

function writeUnlockedIds(ids: string[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(ids))
  } catch {
    /* storage unavailable — unlocks just won't persist */
  }
}

export function loadUnlockedIds(): string[] {
  return readUnlockedIds()
}

/**
 * Checks a just-finished session's result against every achievement's
 * condition and unlocks any that newly qualify. Call this after the
 * result has already been saved as the level's best (if it is one), so
 * the 'all-clear' check sees this session's own level counted. Returns
 * only the achievements newly unlocked by this call, for a "you got a
 * new badge" notification — already-unlocked ones aren't re-returned.
 * `dailyStreak`, when given, is the consecutive-day count just returned by
 * recordDailyClear() for this session, for the daily-challenge streak
 * achievements.
 */
export function evaluateAchievements(result: LevelResult, dailyStreak?: number): Achievement[] {
  const unlocked = new Set(readUnlockedIds())
  const newlyUnlocked: Achievement[] = []

  const unlock = (id: string) => {
    if (unlocked.has(id)) return
    const achievement = ACHIEVEMENTS.find((a) => a.id === id)
    if (!achievement) return
    unlocked.add(id)
    newlyUnlocked.push(achievement)
  }

  unlock('first-clear')
  if (result.correctCount === result.totalCount) unlock('perfect')
  if (result.bestCombo >= 8) unlock('combo-master')
  if (result.stars === 3) unlock('three-stars')
  if (LEVELS.every((level) => loadBestResult(level.id) !== null)) unlock('all-clear')
  if (dailyStreak !== undefined && dailyStreak >= 3) unlock('daily-streak-3')
  if (dailyStreak !== undefined && dailyStreak >= 7) unlock('daily-streak-7')

  if (newlyUnlocked.length > 0) writeUnlockedIds([...unlocked])
  return newlyUnlocked
}
