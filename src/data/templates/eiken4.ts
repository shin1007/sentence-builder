import type { Question } from '../../types'
import { q } from '../questionGen'
import { THINGS, ANIMALS, FOODS, PLACES, INSTRUMENTS, SPORTS_PLAY, PLACES_OUTDOOR } from '../vocab'

const ADJ_BASIC = [
  { en: 'big', jp: '大きい' },
  { en: 'small', jp: '小さい' },
  { en: 'cute', jp: 'かわいい' },
  { en: 'fast', jp: '速い' },
  { en: 'strong', jp: '強い' },
  { en: 'smart', jp: '賢い' },
  { en: 'kind', jp: '優しい' },
  { en: 'tall', jp: '背が高い' },
  { en: 'short', jp: '背が低い' },
  { en: 'young', jp: '若い' },
]

const CATEGORIES = [
  { en: 'sport', jp: 'スポーツ' },
  { en: 'food', jp: '食べ物' },
  { en: 'animal', jp: '動物' },
  { en: 'subject', jp: '教科' },
  { en: 'season', jp: '季節' },
  { en: 'fruit', jp: '果物' },
  { en: 'drink', jp: '飲み物' },
  { en: 'game', jp: 'ゲーム' },
  { en: 'movie', jp: '映画' },
  { en: 'hobby', jp: '趣味' },
]

const VERBS_MOTION = [
  { en: 'run', jp: '走る' },
  { en: 'swim', jp: '泳ぐ' },
  { en: 'walk', jp: '歩く' },
  { en: 'jump', jp: '跳ぶ' },
  { en: 'climb', jp: '登る' },
  { en: 'skate', jp: 'スケートをする' },
  { en: 'cycle', jp: '自転車に乗る' },
  { en: 'ski', jp: 'スキーをする' },
  { en: 'row', jp: 'ボートをこぐ' },
  { en: 'skip', jp: 'スキップする' },
]

const COMPARATIVE_ADJ = [
  { en: 'newer', jp: '新しい' },
  { en: 'older', jp: '古い' },
  { en: 'bigger', jp: '大きい' },
  { en: 'smaller', jp: '小さい' },
  { en: 'longer', jp: '長い' },
  { en: 'shorter', jp: '短い' },
  { en: 'cheaper', jp: '安い' },
  { en: 'faster', jp: '速い' },
  { en: 'more expensive', jp: '高い' },
  { en: 'younger', jp: '若い' },
]

export const eiken4Questions: Question[] = [
  ...THINGS.map((t, i) =>
    q(`e4-t1-${i}`, `これは私の${t.jp}です。`, `This is my ${t.en}.`, 'This is 〜.'),
  ),
  ...ANIMALS.map((a, i) => {
    const adj = ADJ_BASIC[i % ADJ_BASIC.length]
    return q(
      `e4-t2-${i}`,
      `あの${a.jp}はとても${adj.jp}です。`,
      `That ${a.singular} is very ${adj.en}.`,
      '形容詞',
    )
  }),
  ...FOODS.map((f, i) =>
    q(`e4-t3-${i}`, `私は${f.jp}が好きです。`, `I like ${f.plural}.`, 'I like 〜.'),
  ),
  ...THINGS.map((t, i) =>
    q(`e4-t4-${i}`, `これはあなたの${t.jp}ですか？`, `Is this your ${t.en}?`, 'Is this 〜?'),
  ),
  ...SPORTS_PLAY.map((s, i) =>
    q(`e4-t5-${i}`, `私は毎朝${s.jp}をします。`, `I play ${s.en} every morning.`, '現在形'),
  ),
  ...INSTRUMENTS.map((ins, i) =>
    q(
      `e4-t6-${i}`,
      `彼女は上手に${ins.jp}を演奏します。`,
      `She plays the ${ins.en} well.`,
      '三人称単数 s',
    ),
  ),
  ...THINGS.map((t, i) =>
    q(`e4-t7-${i}`, `あなたの${t.jp}は何色ですか？`, `What color is your ${t.en}?`, '疑問詞 What'),
  ),
  ...SPORTS_PLAY.map((s, i) => {
    const place = PLACES_OUTDOOR[i % PLACES_OUTDOOR.length]
    return q(
      `e4-t8-${i}`,
      `私たちは${place.jp}で${s.jp}をします。`,
      `We play ${s.en} in the ${place.en}.`,
      '場所を表す in',
    )
  }),
  ...CATEGORIES.map((c, i) =>
    q(`e4-t9-${i}`, `あなたは何の${c.jp}が好きですか？`, `What ${c.en} do you like?`, 'Do you 〜?'),
  ),
  ...ANIMALS.map((a, i) => {
    const f = FOODS[i % FOODS.length]
    return q(
      `e4-t10-${i}`,
      `私の${a.jp}は${f.jp}が好きです。`,
      `My ${a.singular} likes ${f.plural}.`,
      '三人称単数 s',
    )
  }),
  ...ANIMALS.map((a, i) =>
    q(`e4-t11-${i}`, `あなたは何匹${a.jp}を飼っていますか？`, `How many ${a.plural} do you have?`, 'How many 〜?'),
  ),
  ...VERBS_MOTION.map((v, i) =>
    q(`e4-t12-${i}`, `彼は速く${v.jp}ことができます。`, `He can ${v.en} fast.`, '助動詞 can'),
  ),
  ...THINGS.map((t, i) =>
    q(
      `e4-t13-${i}`,
      `つくえの上に${t.jp}があります。`,
      `There is ${t.article} ${t.en} on the desk.`,
      'There is 〜.',
    ),
  ),
  ...PLACES.map((p, i) =>
    q(`e4-t14-${i}`, `私は昨日${p.jp}へ行きました。`, `I went to the ${p.en} yesterday.`, '過去形(不規則)'),
  ),
  ...PLACES.map((p, i) =>
    q(`e4-t15-${i}`, `彼らは${p.jp}で遊んでいます。`, `They are playing in the ${p.en}.`, '現在進行形'),
  ),
  ...PLACES.map((p, i) =>
    q(`e4-t16-${i}`, `${p.jp}はどこですか？`, `Where is the ${p.en}?`, '疑問詞 Where'),
  ),
  ...THINGS.map((t, i) => {
    const comp = COMPARATIVE_ADJ[i % COMPARATIVE_ADJ.length]
    return q(
      `e4-t17-${i}`,
      `この${t.jp}はあの${t.jp}より${comp.jp}です。`,
      `This ${t.en} is ${comp.en} than that one.`,
      '比較級(-er)',
    )
  }),
  ...PLACES.map((p, i) =>
    q(`e4-t18-${i}`, `私は毎日${p.jp}へ歩いて行きます。`, `I walk to the ${p.en} every day.`, '現在形'),
  ),
]
