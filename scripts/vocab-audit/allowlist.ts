import type { LevelId } from '../../src/types'

/**
 * Words the audit accepts even though CEFR-J puts them above a level's
 * target, each with the reason.
 *
 * CEFR-J grades words for learners in general, and it doesn't match what a
 * Japanese student already knows: `strawberry` is B1 and `peach` B2, but
 * both come up in 小学校の外国語, and `robot` or `badminton` are katakana
 * words every child knows. Topic words like `environment` are B2 but are
 * exactly what 英検準2級・2級 test. Rather than rewrite good sentences to
 * satisfy the list, those words are recorded here with the reason, and the
 * rest are replaced in the question banks.
 *
 * Keys are what the audit looks words up by: the base form, or a multi-word
 * headword like `next to`. `levels` limits a word to the levels where the
 * reason holds; without it the word is fine everywhere.
 */
type Reason = '小学校の外国語で扱う語' | 'カタカナ語として定着' | '中学の基本語' | 'その級の頻出語' | '過去問の原文'

interface Allowed {
  reason: Reason
  levels?: LevelId[]
}

const ELEMENTARY: Allowed = { reason: '小学校の外国語で扱う語' }
const KATAKANA: Allowed = { reason: 'カタカナ語として定着' }
const JHS: Allowed = { reason: '中学の基本語' }
const exam = (...levels: LevelId[]): Allowed => ({ reason: 'その級の頻出語', levels })
const pastExam: Allowed = { reason: '過去問の原文', levels: ['koukoNyushi'] }

export const ALLOWED_WORDS: Record<string, Allowed> = {
  // 小学校の外国語 — food, animals, places, school life
  cherry: ELEMENTARY,
  peach: ELEMENTARY,
  strawberry: ELEMENTARY,
  pineapple: ELEMENTARY,
  cucumber: ELEMENTARY,
  pumpkin: ELEMENTARY,
  carrot: ELEMENTARY,
  onion: ELEMENTARY,
  fox: ELEMENTARY,
  turtle: ELEMENTARY,
  elephant: ELEMENTARY,
  duck: ELEMENTARY,
  castle: ELEMENTARY,
  museum: ELEMENTARY,
  playground: ELEMENTARY,
  blackboard: ELEMENTARY,
  'post office': ELEMENTARY,
  season: ELEMENTARY,
  fifth: ELEMENTARY,
  vet: ELEMENTARY,
  firefighter: ELEMENTARY,
  artist: ELEMENTARY,

  // カタカナ語
  mango: KATAKANA,
  melon: KATAKANA,
  lemon: KATAKANA,
  curry: KATAKANA,
  robot: KATAKANA,
  puzzle: KATAKANA,
  gym: KATAKANA,
  stadium: KATAKANA,
  menu: KATAKANA,
  racket: KATAKANA,
  badminton: KATAKANA,
  handball: KATAKANA,
  hockey: KATAKANA,
  golf: KATAKANA,
  rugby: KATAKANA,
  court: KATAKANA,
  ski: KATAKANA,
  skate: KATAKANA,
  skiing: KATAKANA,
  skating: KATAKANA,
  hiking: KATAKANA,
  chess: KATAKANA,
  violin: KATAKANA,
  flute: KATAKANA,
  trumpet: KATAKANA,
  record: KATAKANA, // recorder
  comic: KATAKANA,
  uniform: KATAKANA,
  helmet: KATAKANA,
  score: KATAKANA,
  race: KATAKANA,
  stretch: KATAKANA,
  volunteer: KATAKANA,
  cancel: KATAKANA,
  tie: KATAKANA,
  essay: KATAKANA,
  report: KATAKANA,

  // 中学の基本語
  last: JHS,
  next: JHS,
  'next to': JHS,
  'next door': JHS,
  sometimes: JHS,
  popular: JHS,
  country: JHS,
  few: JHS,
  'table tennis': JHS,
  'high school': JHS,
  junior: JHS,
  market: JHS,
  wallet: JHS,
  cheap: JHS,
  noisy: JHS,
  pass: JHS,
  salt: JHS,
  cost: JHS,
  sound: JHS,
  taste: JHS,
  honest: JHS, // the textbook example of "an" before a silent h
  shall: JHS,
  forward: JHS, // look forward to
  'because of': JHS,
  bake: JHS,
  fix: JHS,
  comfortable: JHS,
  useful: JHS,
  dangerous: JHS,
  lake: JHS,
  road: JHS,
  invite: JHS,
  exam: JHS,
  return: JHS,
  follow: JHS,
  windy: JHS,
  quick: JHS,
  relax: JHS,
  earthquake: JHS,
  prepare: JHS,
  opinion: JHS,
  favor: JHS,
  sunflower: JHS,
  capital: JHS,
  photographer: JHS,
  accident: JHS,
  such: JHS,
  shock: JHS,
  noon: JHS,
  mistake: JHS,
  foot: JHS, // on foot
  loud: JHS,
  proud: JHS, // be proud of
  trash: JHS, // take out the trash
  lift: JHS,
  rest: JHS,
  send: JHS,
  fresh: JHS,
  diary: JHS,
  voice: JHS,
  fall: JHS, // the season
  stamp: JHS,
  stair: JHS,
  someday: JHS,

  // その級で出題される話題の語
  environment: exam('eikenPre2', 'eiken2'),
  protect: exam('eikenPre2', 'eiken2'),
  reduce: exam('eikenPre2', 'eiken2'),
  waste: exam('eikenPre2', 'eiken2'),
  electricity: exam('eikenPre2', 'eiken2'),
  transportation: exam('eikenPre2', 'eiken2'),
  announce: exam('eikenPre2', 'eiken2'),
  absent: exam('eikenPre2', 'eiken2'),
  scared: exam('eikenPre2', 'eiken2'),
  rise: exam('eikenPre2', 'eiken2'),
  'instead of': exam('eikenPre2', 'eiken2'),
  pin: exam('eikenPre2'), // hear a pin drop
  energy: exam('eiken2'),
  species: exam('eiken2'),
  treaty: exam('eiken2'),
  postpone: exam('eiken2'),
  lower: exam('eiken2'),
  seldom: exam('eiken2'),
  circumstance: exam('eiken2'),
  project: exam('eiken2'),
  spite: exam('eiken2'), // in spite of

  // 高校入試の過去問から起こした文 (koukoNyushiReal) は原文のまま
  'according to': pastExam,
}

export function isAllowed(word: string, levelId: LevelId): boolean {
  const entry = ALLOWED_WORDS[word]
  return !!entry && (!entry.levels || entry.levels.includes(levelId))
}
