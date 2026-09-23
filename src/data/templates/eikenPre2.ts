import type { Question } from '../../types'
import { q } from '../questionGen'
import { DESTINATIONS, PLACE_TYPES, FAMILY, ANIMALS, OBJECTS_WRITTEN, LANGUAGES, ADJ_STATE } from '../vocab'

const YEARS_NUM = [
  { en: 'two', jp: '2' },
  { en: 'three', jp: '3' },
  { en: 'four', jp: '4' },
  { en: 'five', jp: '5' },
  { en: 'six', jp: '6' },
  { en: 'seven', jp: '7' },
  { en: 'eight', jp: '8' },
  { en: 'nine', jp: '9' },
  { en: 'ten', jp: '10' },
  { en: 'twenty', jp: '20' },
]

const PRESENT_PERFECT_ACTIVITIES = [
  { en: 'finished my homework', jp: '宿題を終えたところです' },
  { en: 'cleaned my room', jp: '部屋をそうじしたところです' },
  { en: 'eaten lunch', jp: '昼食を食べたところです' },
  { en: 'arrived home', jp: '家に着いたところです' },
  { en: 'finished the report', jp: 'レポートを終えたところです' },
  { en: 'watched the movie', jp: '映画を見たところです' },
  { en: 'read the book', jp: '本を読んだところです' },
  { en: 'written the email', jp: 'メールを書いたところです' },
  { en: 'cooked dinner', jp: '夕食を作ったところです' },
  { en: 'washed the dishes', jp: 'お皿を洗ったところです' },
]

/**
 * One passive sentence per place in PLACE_TYPES, by index. Cycling verbs
 * against places produced "This movie theater is swept every day".
 */
const PLACE_PASSIVES = [
  { en: 'This restaurant is cleaned every day.', jp: 'このレストランは毎日そうじされています。' },
  { en: 'This cafe is visited by many people every day.', jp: 'このカフェは毎日多くの人に訪れられています。' },
  { en: 'This hotel is cleaned every day.', jp: 'このホテルは毎日そうじされています。' },
  { en: 'This supermarket is used by many people every day.', jp: 'このスーパーは毎日多くの人に利用されています。' },
  { en: 'This bookstore is visited by many students every day.', jp: 'この本屋は毎日多くの生徒に訪れられています。' },
  { en: 'This park is cleaned every morning.', jp: 'この公園は毎朝そうじされています。' },
  { en: 'This hospital is visited by many people every day.', jp: 'この病院は毎日多くの人に訪れられています。' },
  { en: 'This school is cleaned by the students every day.', jp: 'この学校は毎日生徒たちによってそうじされています。' },
  { en: 'This gym is used by many people every day.', jp: 'このジムは毎日多くの人に利用されています。' },
  { en: 'This movie theater is cleaned every night.', jp: 'この映画館は毎晩そうじされています。' },
]

/** Who made each of MADE_OBJECTS, by index — chosen to fit the object
 * rather than cycled ("a necklace made by a famous inventor"). */
const MAKERS = [
  { en: 'company', jp: '会社' }, // toy
  { en: 'designer', jp: 'デザイナー' }, // chair
  { en: 'artist', jp: '芸術家' }, // table
  { en: 'company', jp: '会社' }, // box
  { en: 'cook', jp: '料理人' }, // cake
  { en: 'designer', jp: 'デザイナー' }, // bag
  { en: 'painter', jp: '画家' }, // picture
  { en: 'artist', jp: '芸術家' }, // basket
  { en: 'artist', jp: '芸術家' }, // vase
  { en: 'company', jp: '会社' }, // blanket
]

const ROLES = [
  { en: 'person', jp: '人' },
  { en: 'student', jp: '生徒' },
  { en: 'child', jp: '子ども' },
  { en: 'friend', jp: '友達' },
  { en: 'neighbor', jp: '隣人' },
  { en: 'classmate', jp: 'クラスメート' },
  { en: 'teacher', jp: '先生' },
  { en: 'boy', jp: '男の子' },
  { en: 'girl', jp: '女の子' },
  { en: 'woman', jp: '女性' },
]

const GERUND_VERBS = [
  { en: 'playing soccer', jp: 'サッカーをしている' },
  { en: 'singing a song', jp: '歌を歌っている' },
  { en: 'reading a book', jp: '本を読んでいる' },
  { en: 'riding a bike', jp: '自転車に乗っている' },
  { en: 'cooking dinner', jp: '夕食を作っている' },
  { en: 'painting a picture', jp: '絵を描いている' },
  { en: 'watching TV', jp: 'テレビを見ている' },
  { en: 'walking the dog', jp: '犬の散歩をしている' },
  { en: 'practicing tennis', jp: 'テニスを練習している' },
  { en: 'cleaning the room', jp: '部屋をそうじしている' },
]

const MADE_OBJECTS = [
  { en: 'toy', jp: 'おもちゃ' },
  { en: 'chair', jp: '椅子' },
  { en: 'table', jp: 'テーブル' },
  { en: 'box', jp: '箱' },
  { en: 'cake', jp: 'ケーキ' },
  { en: 'bag', jp: 'かばん' },
  { en: 'picture', jp: '絵' },
  { en: 'basket', jp: 'かご' },
  { en: 'vase', jp: '花瓶' },
  { en: 'blanket', jp: '毛布' },
]

const PAST_VERB_SIMPLE = [
  { en: 'bought', jp: '買った' },
  { en: 'made', jp: '作った' },
  { en: 'found', jp: '見つけた' },
  { en: 'broke', jp: '壊した' },
  { en: 'lost', jp: 'なくした' },
  { en: 'fixed', jp: '直した' },
  { en: 'borrowed', jp: '借りた' },
  { en: 'cleaned', jp: '洗った' },
  { en: 'sold', jp: '売った' },
  { en: 'carried', jp: '運んだ' },
]

const GERUND_MOTION = [
  { en: 'running', jp: '走っている' },
  { en: 'sleeping', jp: '眠っている' },
  { en: 'swimming', jp: '泳いでいる' },
  { en: 'jumping', jp: '跳ねている' },
  { en: 'playing', jp: '遊んでいる' },
  { en: 'eating', jp: '食べている' },
  { en: 'sitting', jp: '座っている' },
  { en: 'walking', jp: '歩いている' },
  { en: 'resting', jp: '休んでいる' },
  { en: 'climbing', jp: '登っている' },
]

const SUBJECTS_3RD = [
  { en: 'he', jp: '彼', verb: 'lives' },
  { en: 'she', jp: '彼女', verb: 'lives' },
  { en: 'they', jp: '彼ら', verb: 'live' },
  { en: 'Ken', jp: 'ケン', verb: 'lives' },
  { en: 'Yumi', jp: 'ユミ', verb: 'lives' },
  { en: 'Taro', jp: 'タロウ', verb: 'lives' },
  { en: 'Hana', jp: 'ハナ', verb: 'lives' },
  { en: 'your teacher', jp: 'あなたの先生', verb: 'lives' },
  { en: 'your friend', jp: 'あなたの友達', verb: 'lives' },
  { en: 'the boy', jp: 'その男の子', verb: 'lives' },
]

const ADJ_PEOPLE = [
  { en: 'tall', jp: '背が高い' },
  { en: 'short', jp: '背が低い' },
  { en: 'fast', jp: '足が速い' },
  { en: 'smart', jp: '賢い' },
  { en: 'kind', jp: '優しい' },
  { en: 'busy', jp: '忙しい' },
  { en: 'young', jp: '若い' },
  { en: 'strong', jp: '力強い' },
  { en: 'funny', jp: '面白い' },
  { en: 'friendly', jp: '親しみやすい' },
]

const NOUN_ABSTRACT = [
  { en: 'question', jp: '質問' },
  { en: 'problem', jp: '問題' },
  { en: 'test', jp: 'テスト' },
  { en: 'homework', jp: '宿題' },
  { en: 'task', jp: '課題' },
  { en: 'puzzle', jp: 'パズル' },
  { en: 'game', jp: 'ゲーム' },
  { en: 'story', jp: '物語' },
  { en: 'movie', jp: '映画' },
  { en: 'song', jp: '曲' },
]

const ADJ_THING = [
  { en: 'difficult', jp: '難しい' },
  { en: 'easy', jp: '簡単' },
  { en: 'expensive', jp: '高価' },
  { en: 'cheap', jp: '安価' },
  { en: 'heavy', jp: '重い' },
  { en: 'light', jp: '軽い' },
  { en: 'large', jp: '大きい' },
  { en: 'small', jp: '小さい' },
  { en: 'popular', jp: '人気' },
  { en: 'useful', jp: '便利' },
]

const VERB_SIMPLE = [
  { en: 'walk', jp: '歩く' },
  { en: 'speak', jp: '話す' },
  { en: 'move', jp: '動く' },
  { en: 'eat', jp: '食べる' },
  { en: 'sleep', jp: '眠る' },
  { en: 'focus', jp: '集中する' },
  { en: 'smile', jp: '笑う' },
  { en: 'sing', jp: '歌う' },
  { en: 'dance', jp: '踊る' },
  { en: 'run', jp: '走る' },
]

const SO_THAT_SENTENCES = [
  { en: 'It snowed so hard that the trains stopped.', jp: 'とても激しく雪が降ったので、電車が止まりました。' },
  { en: 'It was so cold that the lake froze.', jp: 'とても寒かったので、湖が凍りました。' },
  { en: 'It was so loud that everyone woke up.', jp: 'とてもうるさかったので、みんな目が覚めました。' },
  { en: 'It was so funny that we all laughed.', jp: 'とても面白かったので、みんな笑いました。' },
  { en: 'It was so dark that we could see nothing.', jp: 'とても暗かったので、何も見えませんでした。' },
  { en: 'It was so heavy that I could not lift it.', jp: 'とても重かったので、持ち上げられませんでした。' },
  { en: 'It was so crowded that we could not move.', jp: 'とても混んでいたので、動けませんでした。' },
  { en: 'It was so delicious that I ate it all.', jp: 'とてもおいしかったので、全部食べました。' },
  { en: 'It was so windy that the tree fell down.', jp: 'とても風が強かったので、木が倒れました。' },
  { en: 'It was so quiet that I could hear a pin drop.', jp: 'とても静かだったので、針の落ちる音が聞こえました。' },
]

const OBJECTS_OWNED = [
  { en: 'computer', jp: 'コンピューター' },
  { en: 'car', jp: '車' },
  { en: 'phone', jp: '携帯電話' },
  { en: 'bike', jp: '自転車' },
  { en: 'desk', jp: '机' },
  { en: 'chair', jp: '椅子' },
  { en: 'bag', jp: 'かばん' },
  { en: 'watch', jp: '腕時計' },
  { en: 'camera', jp: 'カメラ' },
  { en: 'guitar', jp: 'ギター' },
]

const WH_INFINITIVE = [
  { en: 'what to do', jp: '何をすべきか' },
  { en: 'where to go', jp: 'どこへ行くべきか' },
  { en: 'when to start', jp: 'いつ始めるべきか' },
  { en: 'how to cook it', jp: 'どう料理すべきか' },
  { en: 'what to say', jp: '何を言うべきか' },
  { en: 'where to sit', jp: 'どこに座るべきか' },
  { en: 'when to leave', jp: 'いつ出発すべきか' },
  { en: 'how to solve it', jp: 'どう解決すべきか' },
  { en: 'what to wear', jp: '何を着るべきか' },
  { en: 'where to buy it', jp: 'どこで買うべきか' },
]

const PRODUCTS = [
  { en: 'vegetables', jp: '野菜' },
  { en: 'fruits', jp: '果物' },
  { en: 'flowers', jp: '花' },
  { en: 'shoes', jp: '靴' },
  { en: 'books', jp: '本' },
  { en: 'toys', jp: 'おもちゃ' },
  { en: 'clothes', jp: '服' },
  { en: 'eggs', jp: '卵' },
  { en: 'apples', jp: 'りんご' },
  { en: 'oranges', jp: 'オレンジ' },
]

const ECO_ACTIONS = [
  { en: 'recycle cans and bottles', jp: '缶とびんをリサイクルする' },
  { en: 'save electricity', jp: '電気を節約する' },
  { en: 'use public transportation', jp: '公共交通機関を利用する' },
  { en: 'reduce plastic waste', jp: 'プラスチックごみを減らす' },
  { en: 'turn off the lights', jp: '電気を消す' },
  { en: 'walk instead of driving', jp: '車の代わりに歩く' },
  { en: 'plant more trees', jp: 'もっと木を植える' },
  { en: 'reuse shopping bags', jp: '買い物袋を再利用する' },
  { en: 'save water', jp: '水を節約する' },
  { en: 'buy local food', jp: '地元の食べ物を買う' },
]

// Kept as short noun phrases ("too much TV", "too much gaming") rather than
// verb+object gerunds ("too much watching TV"), which read as ungrammatical.
const TECH_USE = [
  { en: 'smartphone use', jp: 'スマートフォンの使用' },
  { en: 'TV', jp: 'テレビ' },
  { en: 'gaming', jp: 'ゲーム' },
  { en: 'internet use', jp: 'インターネットの使用' },
  { en: 'texting', jp: 'メールを送ること' },
  { en: 'snacking', jp: 'おやつを食べること' },
  { en: 'computer use', jp: 'コンピューターの使用' },
  { en: 'sitting', jp: '座っていること' },
]

const HEALTH_HABITS = [
  { en: 'get enough sleep', jp: '十分な睡眠をとる' },
  { en: 'exercise', jp: '運動する' },
  { en: 'eat vegetables', jp: '野菜を食べる' },
  { en: 'drink water', jp: '水を飲む' },
  { en: 'walk for thirty minutes', jp: '30分歩く' },
  { en: 'stretch', jp: 'ストレッチをする' },
  { en: 'wash my hands', jp: '手を洗う' },
  { en: 'eat breakfast', jp: '朝食を食べる' },
  { en: 'eat fruit', jp: '果物を食べる' },
  { en: 'take a break', jp: '休憩をとる' },
]

export const eikenPre2Questions: Question[] = [
  ...DESTINATIONS.map((d, i) => {
    const n = YEARS_NUM[i % YEARS_NUM.length]
    return q(
      `ep2-t1-${i}`,
      `私は${n.jp}年間${d.jp}に住んでいます。`,
      `I have lived in ${d.en} for ${n.en} years.`,
      '現在完了(継続)',
    )
  }),
  ...DESTINATIONS.map((d, i) =>
    q(`ep2-t2-${i}`, `あなたは今までに${d.jp}に行ったことがありますか？`, `Have you ever been to ${d.en}?`, '現在完了(経験)'),
  ),
  ...PRESENT_PERFECT_ACTIVITIES.map((p, i) =>
    q(`ep2-t3-${i}`, `私はちょうど${p.jp}。`, `I have just ${p.en}.`, '現在完了(完了)'),
  ),
  ...PLACE_PASSIVES.map((p, i) => q(`ep2-t4-${i}`, p.jp, p.en, '受動態')),
  ...MADE_OBJECTS.map((o, i) => {
    const j = MAKERS[i % MAKERS.length]
    return q(
      `ep2-t5-${i}`,
      `その${o.jp}は有名な${j.jp}によって作られました。`,
      `That ${o.en} was made by a famous ${j.en}.`,
      '受動態(過去)',
    )
  }),
  ...ROLES.map((r, i) => {
    const g = GERUND_VERBS[i % GERUND_VERBS.length]
    const f = FAMILY[i % FAMILY.length]
    return q(
      `ep2-t6-${i}`,
      `${g.jp}${r.jp}は私の${f.jp}です。`,
      `The ${r.en} who is ${g.en} is my ${f.en}.`,
      '関係代名詞 who',
    )
  }),
  ...MADE_OBJECTS.map((o, i) => {
    const v = PAST_VERB_SIMPLE[i % PAST_VERB_SIMPLE.length]
    return q(`ep2-t7-${i}`, `これは彼が${v.jp}${o.jp}です。`, `This is the ${o.en} that he ${v.en}.`, '関係代名詞 that')
  }),
  ...ANIMALS.map((a, i) => {
    const g = GERUND_MOTION[i % GERUND_MOTION.length]
    return q(
      `ep2-t8-${i}`,
      `あそこで${g.jp}${a.jp}を見てください。`,
      `Look at the ${a.singular} ${g.en} over there.`,
      '現在分詞(形容詞的用法)',
    )
  }),
  ...OBJECTS_WRITTEN.map((o, i) => {
    const l = LANGUAGES[i % LANGUAGES.length]
    return q(
      `ep2-t9-${i}`,
      `これは${l.jp}で書かれた${o.jp}です。`,
      `This is ${o.article} ${o.en} written in ${l.en}.`,
      '過去分詞(形容詞的用法)',
    )
  }),
  ...SUBJECTS_3RD.map((s, i) =>
    q(`ep2-t10-${i}`, `${s.jp}がどこに住んでいるか知っていますか？`, `Do you know where ${s.en} ${s.verb}?`, '間接疑問文'),
  ),
  ...FAMILY.map((f, i) => {
    const adj = ADJ_PEOPLE[i % ADJ_PEOPLE.length]
    return q(
      `ep2-t11-${i}`,
      `私の${f.jp}は私と同じくらい${adj.jp}です。`,
      `My ${f.en} is as ${adj.en} as me.`,
      '原級比較 as〜as',
    )
  }),
  ...NOUN_ABSTRACT.map((n, i) => {
    const adj = ADJ_THING[i % ADJ_THING.length]
    return q(
      `ep2-t12-${i}`,
      `この${n.jp}はあの${n.jp}と同じくらい${adj.jp}です。`,
      `This ${n.en} is as ${adj.en} as that one.`,
      '原級比較 as〜as',
    )
  }),
  ...ADJ_STATE.map((adj, i) => {
    const v = VERB_SIMPLE[i % VERB_SIMPLE.length]
    return q(`ep2-t13-${i}`, `彼は${adj.jp}、${v.jp}ことができませんでした。`, `He was too ${adj.en} to ${v.en}.`, 'too 〜 to')
  }),
  ...SO_THAT_SENTENCES.map((s, i) => q(`ep2-t14-${i}`, s.jp, s.en, 'so 〜 that')),
  ...OBJECTS_OWNED.map((o, i) => {
    const n = YEARS_NUM[i % YEARS_NUM.length]
    return q(
      `ep2-t15-${i}`,
      `私たちはこの${o.jp}を${n.jp}年間使っています。`,
      `We have used this ${o.en} for ${n.en} years.`,
      '現在完了(継続)',
    )
  }),
  ...WH_INFINITIVE.map((w, i) =>
    q(`ep2-t16-${i}`, `あなたは${w.jp}知っていますか？`, `Do you know ${w.en}?`, '疑問詞 + to不定詞'),
  ),
  ...PRODUCTS.map((p, i) => {
    const place = PLACE_TYPES[i % PLACE_TYPES.length]
    return q(
      `ep2-t17-${i}`,
      `この${place.jp}では新鮮な${p.jp}が売られています。`,
      `Fresh ${p.en} are sold at this ${place.en}.`,
      '受動態',
    )
  }),
  ...ANIMALS.map((a, i) =>
    q(`ep2-t18-${i}`, `木の下で眠っている${a.jp}を見て。`, `Look at the ${a.singular} sleeping under the tree.`, '現在分詞(形容詞的用法)'),
  ),
  // 準2級 reading/listening passages lean on environment, technology-use and
  // health themes far more than personal narrative, so these add that register.
  ...ECO_ACTIONS.map((e, i) =>
    q(
      `ep2-t19-${i}`,
      `環境を守るために私たちは${e.jp}べきです。`,
      `We should ${e.en} to protect the environment.`,
      'should 〜',
    ),
  ),
  ...TECH_USE.map((t, i) =>
    q(`ep2-t20-${i}`, `${t.jp}のしすぎは健康に悪い可能性があります。`, `Too much ${t.en} can be bad for your health.`, 'too much 〜'),
  ),
  ...HEALTH_HABITS.map((h, i) =>
    q(`ep2-t21-${i}`, `私は毎日${h.jp}ようにしています。`, `I try to ${h.en} every day.`, 'try to 〜'),
  ),
]
