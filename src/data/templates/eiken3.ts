import type { Question } from '../../types'
import { q } from '../questionGen'
import { THINGS, DESTINATIONS, PLACE_TYPES, FAMILY, FOODS } from '../vocab'

const PAST_ACTIVITIES = [
  { en: 'cleaned my room', jp: '部屋をそうじしました' },
  { en: 'watched TV', jp: 'テレビを見ました' },
  { en: 'met my friend', jp: '友達に会いました' },
  { en: 'cooked dinner', jp: '夕食を作りました' },
  { en: 'washed the car', jp: '車を洗いました' },
  { en: 'painted a picture', jp: '絵を描きました' },
  { en: 'wrote a letter', jp: '手紙を書きました' },
  { en: 'read a book', jp: '本を読みました' },
  { en: 'visited my grandmother', jp: '祖母を訪ねました' },
  { en: 'finished my homework', jp: '宿題を終えました' },
  { en: 'practiced soccer', jp: 'サッカーを練習しました' },
  { en: 'helped my mother', jp: '母を手伝いました' },
  { en: 'took a walk', jp: '散歩をしました' },
  { en: 'baked a cake', jp: 'ケーキを焼きました' },
  { en: 'fixed my bike', jp: '自転車を直しました' },
]

const ADJ_MORE = [
  { en: 'expensive', jp: '高い' },
  { en: 'beautiful', jp: '美しい' },
  { en: 'difficult', jp: '難しい' },
  { en: 'popular', jp: '人気' },
  { en: 'important', jp: '重要' },
  { en: 'interesting', jp: '面白い' },
  { en: 'comfortable', jp: '快適' },
  { en: 'useful', jp: '便利' },
  { en: 'careful', jp: '注意深い' },
  { en: 'dangerous', jp: '危険' },
]

const GERUND_ACTIVITIES = [
  { en: 'practicing the piano', jp: 'ピアノを練習すること' },
  { en: 'reading books', jp: '本を読むこと' },
  { en: 'playing soccer', jp: 'サッカーをすること' },
  { en: 'watching movies', jp: '映画を見ること' },
  { en: 'singing songs', jp: '歌を歌うこと' },
  { en: 'drawing pictures', jp: '絵を描くこと' },
  { en: 'riding her bike', jp: '自転車に乗ること' },
  { en: 'cooking dinner', jp: '夕食を作ること' },
  { en: 'walking her dog', jp: '犬の散歩をすること' },
  { en: 'taking photos', jp: '写真を撮ること' },
]

const WANT_ACTIVITIES = [
  { en: 'buy a new bike', jp: '新しい自転車を買いたいです' },
  { en: 'see a movie', jp: '映画を見たいです' },
  { en: 'eat pizza', jp: 'ピザを食べたいです' },
  { en: 'learn Chinese', jp: '中国語を学びたいです' },
  { en: 'visit Kyoto', jp: '京都を訪れたいです' },
  { en: 'play the guitar', jp: 'ギターを弾きたいです' },
  { en: 'join the team', jp: 'チームに入りたいです' },
  { en: 'read this book', jp: 'この本を読みたいです' },
  { en: 'make a cake', jp: 'ケーキを作りたいです' },
  { en: 'try skiing', jp: 'スキーに挑戦したいです' },
]

const HAVE_TO_ACTIVITIES = [
  { en: 'finish our homework', jp: '宿題を終わらせなければなりません' },
  { en: 'clean the classroom', jp: '教室をそうじしなければなりません' },
  { en: 'catch the bus', jp: 'バスに乗らなければなりません' },
  { en: 'wear a uniform', jp: '制服を着なければなりません' },
  { en: 'study for the test', jp: 'テストのために勉強しなければなりません' },
  { en: 'wash the dishes', jp: 'お皿を洗わなければなりません' },
  { en: 'return the books', jp: '本を返さなければなりません' },
  { en: 'wake up early', jp: '早く起きなければなりません' },
  { en: 'follow the rules', jp: 'ルールに従わなければなりません' },
  { en: 'practice every day', jp: '毎日練習しなければなりません' },
]

const TIME_PAST = [
  { en: 'last night', jp: '昨夜' },
  { en: 'yesterday morning', jp: '昨日の朝' },
  { en: 'last weekend', jp: '先週末' },
  { en: 'this morning', jp: '今朝' },
  { en: 'yesterday afternoon', jp: '昨日の午後' },
  { en: 'last Sunday', jp: 'この前の日曜日' },
]

const WEATHER = [
  { en: 'raining', jp: '雨が降っていた' },
  { en: 'snowing', jp: '雪が降っていた' },
  { en: 'very windy', jp: '風が強かった' },
  { en: 'very hot', jp: 'とても暑かった' },
  { en: 'very cold', jp: 'とても寒かった' },
  { en: 'stormy', jp: '嵐だった' },
  { en: 'foggy', jp: '霧が濃かった' },
  { en: 'cloudy', jp: '曇っていた' },
  { en: 'too sunny', jp: '日差しが強すぎた' },
  { en: 'humid', jp: '湿気が多かった' },
]

const ACTIVITIES_GO = [
  { en: 'go swimming', jp: '泳ぎに行きます' },
  { en: 'go fishing', jp: '釣りに行きます' },
  { en: 'go hiking', jp: 'ハイキングに行きます' },
  { en: 'go camping', jp: 'キャンプに行きます' },
  { en: 'go shopping', jp: '買い物に行きます' },
  { en: 'go skating', jp: 'スケートに行きます' },
  { en: 'have a picnic', jp: 'ピクニックをします' },
  { en: 'play outside', jp: '外で遊びます' },
  { en: 'ride our bikes', jp: '自転車に乗ります' },
  { en: 'visit the beach', jp: 'ビーチに行きます' },
]

const SKILLS = [
  { en: 'speak English', jp: '英語を話す' },
  { en: 'play the violin', jp: 'バイオリンを弾く' },
  { en: 'cook Italian food', jp: 'イタリア料理を作る' },
  { en: 'solve math problems', jp: '数学の問題を解く' },
  { en: 'draw animals', jp: '動物の絵を描く' },
  { en: 'sing pop songs', jp: 'ポップソングを歌う' },
  { en: 'ride a horse', jp: '馬に乗る' },
  { en: 'write poems', jp: '詩を書く' },
  { en: 'play chess', jp: 'チェスをする' },
  { en: 'swim butterfly', jp: 'バタフライで泳ぐ' },
]

const LANDMARKS = [
  { en: 'mountain', jp: '山' },
  { en: 'river', jp: '川' },
  { en: 'building', jp: '建物' },
  { en: 'bridge', jp: '橋' },
  { en: 'lake', jp: '湖' },
  { en: 'tower', jp: 'タワー' },
  { en: 'park', jp: '公園' },
  { en: 'school', jp: '学校' },
  { en: 'station', jp: '駅' },
  { en: 'stadium', jp: 'スタジアム' },
]

const SUPERLATIVES = [
  { en: 'tallest', jp: '一番高い' },
  { en: 'oldest', jp: '一番古い' },
  { en: 'biggest', jp: '一番大きい' },
  { en: 'smallest', jp: '一番小さい' },
  { en: 'longest', jp: '一番長い' },
  { en: 'most beautiful', jp: '一番美しい' },
  { en: 'most famous', jp: '一番有名' },
  { en: 'most popular', jp: '一番人気' },
  { en: 'cheapest', jp: '一番安い' },
  { en: 'fastest', jp: '一番速い' },
]

const OBJECTS_TASK = [
  { en: 'this report', jp: 'このレポート' },
  { en: 'my homework', jp: '宿題' },
  { en: 'the project', jp: 'プロジェクト' },
  { en: 'this essay', jp: 'このエッセイ' },
  { en: 'the form', jp: 'この用紙' },
  { en: 'my assignment', jp: '課題' },
  { en: 'the presentation', jp: 'プレゼンテーション' },
  { en: 'this puzzle', jp: 'このパズル' },
  { en: 'the drawing', jp: 'この絵' },
  { en: 'my chores', jp: '家事' },
]

const SKILL_LEARN = [
  { en: 'play the guitar', jp: 'ギターの弾き方' },
  { en: 'ride a bike', jp: '自転車の乗り方' },
  { en: 'swim', jp: '泳ぎ方' },
  { en: 'cook curry', jp: 'カレーの作り方' },
  { en: 'use a computer', jp: 'コンピューターの使い方' },
  { en: 'speak French', jp: 'フランス語の話し方' },
  { en: 'play chess', jp: 'チェスの仕方' },
  { en: 'bake bread', jp: 'パンの焼き方' },
  { en: 'fix a car', jp: '車の直し方' },
  { en: 'knit a scarf', jp: 'マフラーの編み方' },
]

const ADV_COMPARATIVE = [
  { en: 'gets up earlier', jp: 'より早く起きます' },
  { en: 'runs faster', jp: 'より速く走ります' },
  { en: 'studies harder', jp: 'より一生懸命勉強します' },
  { en: 'arrives sooner', jp: 'より早く着きます' },
  { en: 'finishes quicker', jp: 'より早く終わります' },
  { en: 'sleeps longer', jp: 'より長く眠ります' },
  { en: 'walks slower', jp: 'よりゆっくり歩きます' },
  { en: 'talks louder', jp: 'より大きな声で話します' },
  { en: 'works harder', jp: 'より一生懸命働きます' },
  { en: 'eats faster', jp: 'より早く食べます' },
]

const FUTURE_SUBJECTS = [
  { subjEn: 'you', doForm: 'do', subjJp: 'あなたは' },
  { subjEn: 'he', doForm: 'does', subjJp: '彼は' },
  { subjEn: 'she', doForm: 'does', subjJp: '彼女は' },
]

// Real 3級 reading sections lean heavily on pen-pal letters, so these fixed
// opening/closing phrases mirror that register without copying any exam text.
const LETTER_PHRASES = [
  { en: 'Thank you for your letter.', jp: '手紙をありがとう。' },
  { en: 'How are you doing these days?', jp: '最近どうですか？' },
  { en: "I'm looking forward to seeing you.", jp: '会えるのを楽しみにしています。' },
  { en: 'I had a great time at your house.', jp: 'あなたの家でとても楽しい時間を過ごしました。' },
  { en: 'Please write back soon.', jp: 'すぐに返事を書いてください。' },
  { en: 'I hope to see you again soon.', jp: 'また近いうちに会えるといいですね。' },
  { en: 'Thank you for inviting me to the party.', jp: 'パーティーに招待してくれてありがとう。' },
  { en: 'I miss you very much.', jp: 'あなたにとても会いたいです。' },
  { en: 'Please say hello to your family.', jp: 'ご家族によろしくお伝えください。' },
  { en: "I can't wait for summer vacation.", jp: '夏休みが待ちきれません。' },
]

const WEEKEND_ACTIVITIES = [
  { en: 'go swimming', jp: '泳ぎに行くつもりです' },
  { en: 'go fishing', jp: '釣りに行くつもりです' },
  { en: 'go hiking', jp: 'ハイキングに行くつもりです' },
  { en: 'go camping', jp: 'キャンプに行くつもりです' },
  { en: 'go shopping', jp: '買い物に行くつもりです' },
  { en: 'visit my friend', jp: '友達を訪ねるつもりです' },
  { en: 'watch a baseball game', jp: '野球の試合を見るつもりです' },
  { en: 'clean my house', jp: '家をそうじするつもりです' },
  { en: 'study for the exam', jp: '試験のために勉強するつもりです' },
  { en: 'relax at home', jp: '家でゆっくりするつもりです' },
]

export const eiken3Questions: Question[] = [
  ...PAST_ACTIVITIES.map((p, i) => q(`e3-t1-${i}`, `私は昨日${p.jp}。`, `I ${p.en} yesterday.`, '過去形')),
  ...DESTINATIONS.map((d, i) =>
    q(`e3-t2-${i}`, `彼は来週${d.jp}を訪れるつもりです。`, `He is going to visit ${d.en} next week.`, 'be going to'),
  ),
  ...THINGS.map((t, i) => {
    const adj = ADJ_MORE[i % ADJ_MORE.length]
    return q(
      `e3-t3-${i}`,
      `この${t.jp}はあの${t.jp}より${adj.jp}です。`,
      `This ${t.en} is more ${adj.en} than that one.`,
      '比較級(more)',
    )
  }),
  ...GERUND_ACTIVITIES.map((g, i) =>
    q(`e3-t4-${i}`, `彼女は毎日${g.jp}を楽しんでいます。`, `She enjoys ${g.en} every day.`, '動名詞'),
  ),
  ...WANT_ACTIVITIES.map((w, i) =>
    q(`e3-t5-${i}`, `私は${w.jp}。`, `I want to ${w.en}.`, 'want to 〜'),
  ),
  ...HAVE_TO_ACTIVITIES.map((h, i) =>
    q(`e3-t6-${i}`, `私たちは${h.jp}。`, `We have to ${h.en}.`, 'have to 〜'),
  ),
  ...TIME_PAST.map((t, i) =>
    q(`e3-t7-${i}`, `あなたは${t.jp}何をしていましたか？`, `What were you doing ${t.en}?`, '過去進行形'),
  ),
  ...WEATHER.map((w, i) =>
    q(`e3-t8-${i}`, `${w.jp}ので、私たちは家にいました。`, `Because it was ${w.en}, we stayed home.`, '理由の because'),
  ),
  ...ACTIVITIES_GO.map((a, i) =>
    q(`e3-t9-${i}`, `もし明日晴れたら、私たちは${a.jp}。`, `If it is sunny tomorrow, we will ${a.en}.`, '条件の if'),
  ),
  ...SKILLS.map((s, i) =>
    q(`e3-t10-${i}`, `彼女はとても上手に${s.jp}ことができます。`, `She can ${s.en} very well.`, '助動詞 can'),
  ),
  ...PAST_ACTIVITIES.map((p, i) => q(`e3-t11-${i}`, `私は先週${p.jp}。`, `I ${p.en} last week.`, '過去形')),
  ...LANDMARKS.map((l, i) => {
    const sup = SUPERLATIVES[i % SUPERLATIVES.length]
    const dest = DESTINATIONS[i % DESTINATIONS.length]
    return q(
      `e3-t12-${i}`,
      `この${l.jp}は${dest.jp}で${sup.jp}です。`,
      `This ${l.en} is the ${sup.en} in ${dest.en}.`,
      '最上級',
    )
  }),
  ...PLACE_TYPES.map((p, i) =>
    q(`e3-t13-${i}`, `彼らは今、${p.jp}にいます。`, `They are at the ${p.en} now.`, '現在進行形'),
  ),
  ...FUTURE_SUBJECTS.map((s, i) =>
    q(
      `e3-t14-${i}`,
      `${s.subjJp}将来何になりたいですか？`,
      `What ${s.doForm} ${s.subjEn} want to be in the future?`,
      'want to be',
    ),
  ),
  ...PLACE_TYPES.map((p, i) =>
    q(`e3-t15-${i}`, `駅の近くに新しい${p.jp}があります。`, `There is a new ${p.en} near the station.`, 'There is/are'),
  ),
  ...OBJECTS_TASK.map((o, i) =>
    q(`e3-t16-${i}`, `私は明日までに${o.jp}を終える必要があります。`, `I need to finish ${o.en} by tomorrow.`, 'need to 〜'),
  ),
  ...SKILL_LEARN.map((s, i) =>
    q(`e3-t17-${i}`, `彼は去年${s.jp}を学びました。`, `He learned how to ${s.en} last year.`, 'how to 〜'),
  ),
  ...FAMILY.map((f, i) => {
    const adv = ADV_COMPARATIVE[i % ADV_COMPARATIVE.length]
    return q(`e3-t18-${i}`, `私の${f.jp}は私${adv.jp}。`, `My ${f.en} ${adv.en} than me.`, '比較級')
  }),
  ...LETTER_PHRASES.map((s, i) => q(`e3-t19-${i}`, s.jp, s.en, '手紙表現')),
  ...WEEKEND_ACTIVITIES.map((a, i) =>
    q(`e3-t20-${i}`, `私は今週末${a.jp}。`, `I'm planning to ${a.en} this weekend.`, 'be planning to'),
  ),
  ...FOODS.map((a, i) => {
    const b = FOODS[(i + 7) % FOODS.length]
    return q(
      `e3-t21-${i}`,
      `私は${b.jp}より${a.jp}の方が好きです。`,
      `I like ${a.plural} better than ${b.plural}.`,
      '比較(好み)',
    )
  }),
]
