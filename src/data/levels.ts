import type { LevelInfo } from '../types'

export const LEVELS: LevelInfo[] = [
  {
    id: 'eiken4',
    title: '英検4級',
    subtitle: 'GRADE 4',
    description: '中学中級レベルの基本文型',
    gradient: ['#5be0c0', '#22b3a3'],
    accent: '#0f8f82',
    timeLimitSec: 26,
    icon: '🌱',
  },
  {
    id: 'eiken3',
    title: '英検3級',
    subtitle: 'GRADE 3',
    description: '中学卒業レベル・過去/未来形',
    gradient: ['#ffd23f', '#ff9f1c'],
    accent: '#c96f00',
    timeLimitSec: 23,
    icon: '🔥',
  },
  {
    id: 'eikenPre2',
    title: '英検準2級',
    subtitle: 'PRE-2',
    description: '高校中級レベル・現在完了/受動態',
    gradient: ['#7ad0ff', '#3b82f6'],
    accent: '#1d4ed8',
    timeLimitSec: 21,
    icon: '⭐',
  },
  {
    id: 'eiken2',
    title: '英検2級',
    subtitle: 'GRADE 2',
    description: '高校卒業レベル・複雑な構文',
    gradient: ['#ff5f9e', '#a63bff'],
    accent: '#7a1fd6',
    timeLimitSec: 19,
    icon: '⚡',
  },
  {
    id: 'koukoNyushi',
    title: '高校入試',
    subtitle: 'HIGH SCHOOL EXAM',
    description: '公立高校入試レベル・整序英作文',
    gradient: ['#ff9966', '#e6521f'],
    accent: '#b3400f',
    timeLimitSec: 20,
    icon: '🎓',
  },
]

export const getLevel = (id: string) => LEVELS.find((l) => l.id === id)
