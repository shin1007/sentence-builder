import type { LevelInfo } from '../types'

export const LEVELS: LevelInfo[] = [
  {
    id: 'elementary',
    title: '小学生コース',
    subtitle: 'BEGINNER',
    description: 'かんたんな単語で英文を作ろう',
    gradient: ['#5be0c0', '#22b3a3'],
    accent: '#0f8f82',
    timeLimitSec: 26,
    icon: '🌱',
  },
  {
    id: 'juniorHigh',
    title: '中学生コース',
    subtitle: 'INTERMEDIATE',
    description: '過去形・未来形にチャレンジ',
    gradient: ['#ffd23f', '#ff9f1c'],
    accent: '#c96f00',
    timeLimitSec: 22,
    icon: '🔥',
  },
  {
    id: 'highSchool',
    title: '高校生コース',
    subtitle: 'ADVANCED',
    description: '複雑な構文をマスターしよう',
    gradient: ['#ff5f9e', '#a63bff'],
    accent: '#7a1fd6',
    timeLimitSec: 20,
    icon: '⚡',
  },
]

export const getLevel = (id: string) => LEVELS.find((l) => l.id === id)
