import type { LevelInfo } from '../types'

export const LEVELS: LevelInfo[] = [
  {
    id: 'eiken4',
    title: '英検4級',
    subtitle: 'GRADE 4',
    description: '中学中級レベルの基本文型',
    gradient: ['#0d9488', '#0f5b52'],
    accent: '#0d9488',
    timeLimitSec: 26,
    icon: '🌱',
  },
  {
    id: 'eiken3',
    title: '英検3級',
    subtitle: 'GRADE 3',
    description: '中学卒業レベル・過去/未来形',
    gradient: ['#d97706', '#92400e'],
    accent: '#d97706',
    timeLimitSec: 23,
    icon: '🔥',
  },
  {
    id: 'eikenPre2',
    title: '英検準2級',
    subtitle: 'PRE-2',
    description: '高校中級レベル・現在完了/受動態',
    gradient: ['#2563eb', '#1e40af'],
    accent: '#1d4ed8',
    timeLimitSec: 21,
    icon: '⭐',
  },
  {
    id: 'eiken2',
    title: '英検2級',
    subtitle: 'GRADE 2',
    description: '高校卒業レベル・複雑な構文',
    gradient: ['#9333ea', '#6b21a8'],
    accent: '#7a1fd6',
    timeLimitSec: 19,
    icon: '⚡',
  },
  {
    id: 'koukoNyushi',
    title: '高校入試',
    subtitle: 'HIGH SCHOOL EXAM',
    description: '公立高校入試レベル・整序英作文',
    gradient: ['#ea580c', '#9a3412'],
    accent: '#ea580c',
    timeLimitSec: 20,
    icon: '🎓',
  },
]

export const getLevel = (id: string) => LEVELS.find((l) => l.id === id)
