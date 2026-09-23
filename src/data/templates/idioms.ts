import type { LevelId, Question } from '../../types'
import { q } from '../questionGen'

/**
 * Idiom and phrasal-verb questions, a few per level.
 *
 * The rest of the banks treat vocabulary as filler for grammar templates, so
 * the everyday multi-word units — `take care of`, `look forward to`,
 * `because of` — were almost entirely missing. Each idiom here gets three
 * sentences so that review has a sibling to pair with (see pickQuestions) and
 * the player meets the phrase more than once.
 *
 * Mark the idiom's words in `en` with square brackets. The span is where the
 * phrase actually appears in the sentence, so it can be inflected (`[took
 * care of]`) or cut short when the sentence splits it (`Are you [good at]
 * singing?` for `be good at`). While the player is new to an idiom, that span
 * is served as one tile.
 *
 * Separable phrasal verbs (`put on`, `pick up`, `turn off`) are left out on
 * purpose: `put your coat on` and `put on your coat` are both right, and the
 * game only accepts one arrangement.
 *
 * `note` is spelled exactly as the idiom group's tag label in data/grammar.ts.
 */

const PHRASAL = '群動詞'
const VERB_IDIOM = '動詞中心の熟語'
const BE_ADJ = 'be + 形容詞 + 前置詞'
const GROUP_PREP = '群前置詞'

interface Idiom {
  phrase: string
  meaning: string
  note: string
  sentences: { jp: string; en: string }[]
}

/**
 * Builds a question from a sentence whose idiom span is marked with square
 * brackets. Exported for tests.
 */
export function idiomQuestion(id: string, idiom: Idiom, jp: string, marked: string): Question {
  const open = marked.indexOf('[')
  const close = marked.indexOf(']')
  if (open < 0 || close < open) throw new Error(`idiom sentence without a [span]: ${marked}`)
  const before = marked.slice(0, open).trim()
  const inside = marked.slice(open + 1, close).trim()
  const start = before ? before.split(/\s+/).length : 0
  const end = start + inside.split(/\s+/).length
  const question = q(id, jp, marked.replace(/[[\]]/g, ''), idiom.note)
  return { ...question, idiom: { phrase: idiom.phrase, meaning: idiom.meaning, start, end } }
}

const slug = (phrase: string) => phrase.replace(/[^a-z]+/gi, '-').toLowerCase()

const build = (level: string, idioms: Idiom[]): Question[] =>
  idioms.flatMap((idiom) =>
    idiom.sentences.map((s, i) => idiomQuestion(`idm-${level}-${slug(idiom.phrase)}-${i}`, idiom, s.jp, s.en)),
  )

const EIKEN4: Idiom[] = [
  {
    phrase: 'get up',
    meaning: '起きる',
    note: PHRASAL,
    sentences: [
      { jp: '私は6時に起きます。', en: 'I [get up] at six.' },
      { jp: '私の父はとても早く起きます。', en: 'My father [gets up] very early.' },
      { jp: 'あなたは何時に起きますか。', en: 'What time do you [get up]?' },
    ],
  },
  {
    phrase: 'go to bed',
    meaning: '寝る',
    note: VERB_IDIOM,
    sentences: [
      { jp: '私は10時に寝ます。', en: 'I [go to bed] at ten.' },
      { jp: '彼女はふだん早く寝ます。', en: 'She usually [goes to bed] early.' },
      { jp: '今夜は早く寝なさい。', en: '[Go to bed] early tonight.' },
    ],
  },
  {
    phrase: 'look at',
    meaning: '〜を見る',
    note: PHRASAL,
    sentences: [
      { jp: 'この写真を見て。', en: '[Look at] this picture.' },
      { jp: '彼らは星を見ています。', en: 'They are [looking at] the stars.' },
      { jp: '私は黒板を見ました。', en: 'I [looked at] the blackboard.' },
    ],
  },
  {
    phrase: 'listen to',
    meaning: '〜を聞く',
    note: PHRASAL,
    sentences: [
      { jp: '私は毎日音楽を聞きます。', en: 'I [listen to] music every day.' },
      { jp: '先生の話を聞きなさい。', en: '[Listen to] your teacher.' },
      { jp: '彼はラジオを聞いています。', en: 'He is [listening to] the radio.' },
    ],
  },
  {
    phrase: 'wait for',
    meaning: '〜を待つ',
    note: PHRASAL,
    sentences: [
      { jp: '私はバスを待っています。', en: 'I am [waiting for] the bus.' },
      { jp: '駅で私を待ってください。', en: 'Please [wait for] me at the station.' },
      { jp: '彼女は友達を待ちました。', en: 'She [waited for] her friend.' },
    ],
  },
  {
    phrase: 'look for',
    meaning: '〜を探す',
    note: PHRASAL,
    sentences: [
      { jp: '私はかぎを探しています。', en: 'I am [looking for] my key.' },
      { jp: '彼は新しいかばんを探しています。', en: 'He is [looking for] a new bag.' },
      { jp: 'あなたは何を探していますか。', en: 'What are you [looking for]?' },
    ],
  },
  {
    phrase: 'come back',
    meaning: '戻ってくる',
    note: PHRASAL,
    sentences: [
      { jp: '彼は5時に戻ってきます。', en: 'He will [come back] at five.' },
      { jp: 'すぐに戻ってきてください。', en: 'Please [come back] soon.' },
      { jp: '私の姉は昨日日本に帰ってきました。', en: 'My sister [came back] to Japan yesterday.' },
    ],
  },
  {
    phrase: 'in front of',
    meaning: '〜の前に',
    note: GROUP_PREP,
    sentences: [
      { jp: '駅の前で会いましょう。', en: "Let's meet [in front of] the station." },
      { jp: '私の家の前に大きな木があります。', en: 'There is a big tree [in front of] my house.' },
      { jp: '彼はドアの前に立っています。', en: 'He is standing [in front of] the door.' },
    ],
  },
  {
    phrase: 'next to',
    meaning: '〜の隣に',
    note: GROUP_PREP,
    sentences: [
      { jp: '私の学校は公園の隣にあります。', en: 'My school is [next to] the park.' },
      { jp: '私の隣に座ってください。', en: 'Please sit [next to] me.' },
      { jp: '郵便局は銀行の隣にあります。', en: 'The post office is [next to] the bank.' },
    ],
  },
  {
    phrase: 'be good at',
    meaning: '〜が得意だ',
    note: BE_ADJ,
    sentences: [
      { jp: '私の兄は料理が得意です。', en: 'My brother [is good at] cooking.' },
      { jp: '彼女は英語が得意です。', en: 'She [is good at] English.' },
      { jp: 'あなたは歌うのが得意ですか。', en: 'Are you [good at] singing?' },
    ],
  },
]

const EIKEN3: Idiom[] = [
  {
    phrase: 'take care of',
    meaning: '〜の世話をする',
    note: VERB_IDIOM,
    sentences: [
      { jp: '私は毎日犬の世話をします。', en: 'I [take care of] my dog every day.' },
      { jp: '彼女は弟の世話をしました。', en: 'She [took care of] her little brother.' },
      { jp: '体に気をつけてね。', en: '[Take care of] yourself.' },
    ],
  },
  {
    phrase: 'look forward to',
    meaning: '〜を楽しみに待つ',
    note: VERB_IDIOM,
    sentences: [
      { jp: '私はあなたに会えるのを楽しみにしています。', en: 'I am [looking forward to] seeing you.' },
      { jp: '私たちは夏休みを楽しみにしています。', en: 'We are [looking forward to] the summer vacation.' },
      { jp: '彼はそのコンサートを楽しみにしています。', en: 'He is [looking forward to] the concert.' },
    ],
  },
  {
    phrase: 'be interested in',
    meaning: '〜に興味がある',
    note: BE_ADJ,
    sentences: [
      { jp: '私は日本の歴史に興味があります。', en: 'I [am interested in] Japanese history.' },
      { jp: '彼はサッカーに興味がありますか。', en: 'Is he [interested in] soccer?' },
      { jp: '私の姉は音楽に興味があります。', en: 'My sister [is interested in] music.' },
    ],
  },
  {
    phrase: 'be famous for',
    meaning: '〜で有名だ',
    note: BE_ADJ,
    sentences: [
      { jp: '京都は古い寺で有名です。', en: 'Kyoto [is famous for] its old temples.' },
      { jp: 'この町は美しい湖で有名です。', en: 'This town [is famous for] its beautiful lake.' },
      { jp: 'そのレストランはカレーで有名です。', en: 'The restaurant [is famous for] its curry.' },
    ],
  },
  {
    phrase: 'be late for',
    meaning: '〜に遅れる',
    note: BE_ADJ,
    sentences: [
      { jp: '私は今朝学校に遅れました。', en: 'I [was late for] school this morning.' },
      { jp: '会議に遅れないで。', en: "Don't [be late for] the meeting." },
      { jp: '彼はきのう電車の時間に遅れました。', en: 'He [was late for] the train yesterday.' },
    ],
  },
  {
    phrase: 'get to',
    meaning: '〜に着く',
    note: PHRASAL,
    sentences: [
      { jp: 'どうやったら駅に行けますか。', en: 'How can I [get to] the station?' },
      { jp: '私たちは正午に空港に着きました。', en: 'We [got to] the airport at noon.' },
      { jp: '彼女は8時に学校に着きました。', en: 'She [got to] school at eight.' },
    ],
  },
  {
    phrase: 'get off',
    meaning: '〜を降りる',
    note: PHRASAL,
    sentences: [
      { jp: '次の駅で降りてください。', en: 'Please [get off] at the next station.' },
      { jp: '私たちはバスを降りました。', en: 'We [got off] the bus.' },
      { jp: 'どこで電車を降りればいいですか。', en: 'Where should I [get off] the train?' },
    ],
  },
  {
    phrase: 'look like',
    meaning: '〜のように見える・〜に似ている',
    note: PHRASAL,
    sentences: [
      { jp: 'あの雲は魚のように見えます。', en: 'That cloud [looks like] a fish.' },
      { jp: 'あなたはお母さんに似ています。', en: 'You [look like] your mother.' },
      { jp: 'この石はパンのように見えます。', en: 'This stone [looks like] bread.' },
    ],
  },
  {
    phrase: 'because of',
    meaning: '〜のために・〜のせいで',
    note: GROUP_PREP,
    sentences: [
      { jp: '雨のために私たちは試合をしませんでした。', en: "We didn't play the game [because of] the rain." },
      { jp: '雪のせいで電車が遅れました。', en: 'The train was late [because of] the snow.' },
      { jp: '彼はかぜのために学校へ行きませんでした。', en: "He didn't go to school [because of] a cold." },
    ],
  },
  {
    phrase: 'be afraid of',
    meaning: '〜をこわがる',
    note: BE_ADJ,
    sentences: [
      { jp: '私の妹は犬がこわいです。', en: 'My sister [is afraid of] dogs.' },
      { jp: '私はへびがこわいです。', en: 'I [am afraid of] snakes.' },
      { jp: 'まちがいをおそれないで。', en: "Don't [be afraid of] mistakes." },
    ],
  },
]

const EIKEN_PRE2: Idiom[] = [
  {
    phrase: 'take part in',
    meaning: '〜に参加する',
    note: VERB_IDIOM,
    sentences: [
      { jp: '私は来月その大会に参加します。', en: 'I will [take part in] the race next month.' },
      { jp: '多くの生徒がそのイベントに参加しました。', en: 'Many students [took part in] the event.' },
      { jp: 'あなたはそのコンテストに参加しますか。', en: 'Will you [take part in] the contest?' },
    ],
  },
  {
    phrase: 'be proud of',
    meaning: '〜を誇りに思う',
    note: BE_ADJ,
    sentences: [
      { jp: '私たちはあなたを誇りに思います。', en: 'We [are proud of] you.' },
      { jp: '彼は息子を誇りに思っています。', en: 'He [is proud of] his son.' },
      { jp: '彼女は自分の仕事に誇りを持っています。', en: 'She [is proud of] her work.' },
    ],
  },
  {
    phrase: 'be different from',
    meaning: '〜とちがう',
    note: BE_ADJ,
    sentences: [
      { jp: '私の考えはあなたのとはちがいます。', en: 'My idea [is different from] yours.' },
      { jp: '日本の文化はアメリカの文化とはちがいます。', en: 'Japanese culture [is different from] American culture.' },
      { jp: '彼の答えは私のとはちがっていました。', en: 'His answer [was different from] mine.' },
    ],
  },
  {
    phrase: 'be full of',
    meaning: '〜でいっぱいだ',
    note: BE_ADJ,
    sentences: [
      { jp: 'その箱はおもちゃでいっぱいです。', en: 'The box [is full of] toys.' },
      { jp: 'その公園は子どもたちでいっぱいでした。', en: 'The park [was full of] children.' },
      { jp: '彼の話は驚きに満ちていました。', en: 'His story [was full of] surprises.' },
    ],
  },
  {
    phrase: 'give up',
    meaning: 'あきらめる・やめる',
    note: PHRASAL,
    sentences: [
      { jp: '最後まであきらめてはいけません。', en: 'You must not [give up] until the end.' },
      { jp: '彼はその問題を解こうとするのをやめました。', en: 'He [gave up] trying to solve the problem.' },
      { jp: 'どんなに難しくてもあきらめないで。', en: "Don't [give up] even if it is hard." },
    ],
  },
  {
    phrase: 'find out',
    meaning: '〜を知る・〜がわかる',
    note: PHRASAL,
    sentences: [
      { jp: '私はだれがそれをしたのか知りたい。', en: 'I want to [find out] who did it.' },
      { jp: '彼女はその話が本当だとわかりました。', en: 'She [found out] that the story was true.' },
      { jp: '何が起きたのか調べよう。', en: "Let's [find out] what happened." },
    ],
  },
  {
    phrase: 'grow up',
    meaning: '成長する・大人になる',
    note: PHRASAL,
    sentences: [
      { jp: '私は大阪で育ちました。', en: 'I [grew up] in Osaka.' },
      { jp: '大きくなったら何になりたいですか。', en: 'What do you want to be when you [grow up]?' },
      { jp: '子どもたちはとても速く成長します。', en: 'Children [grow up] very fast.' },
    ],
  },
  {
    phrase: 'instead of',
    meaning: '〜の代わりに',
    note: GROUP_PREP,
    sentences: [
      { jp: '私はコーヒーの代わりに紅茶を飲みます。', en: 'I drink tea [instead of] coffee.' },
      { jp: 'バスに乗る代わりに歩いて行こう。', en: "Let's walk [instead of] taking the bus." },
      { jp: '彼は父親の代わりに会議に出ました。', en: 'He went to the meeting [instead of] his father.' },
    ],
  },
  {
    phrase: 'get along with',
    meaning: '〜と仲よくやっていく',
    note: PHRASAL,
    sentences: [
      { jp: '私はクラスメートと仲よくしています。', en: 'I [get along with] my classmates.' },
      { jp: '彼女は新しい隣人たちとうまくやっています。', en: 'She [gets along with] her new neighbors.' },
      { jp: 'あなたはお兄さんと仲がいいですか。', en: 'Do you [get along with] your brother?' },
    ],
  },
  {
    phrase: 'make friends with',
    meaning: '〜と友達になる',
    note: VERB_IDIOM,
    sentences: [
      { jp: '私は留学生と友達になりました。', en: 'I [made friends with] an exchange student.' },
      { jp: '彼女はクラスのみんなと友達になりたいと思っています。', en: 'She wants to [make friends with] everyone in her class.' },
      { jp: '私たちは新しい町で多くの人と友達になりました。', en: 'We [made friends with] many people in the new town.' },
    ],
  },
  {
    phrase: 'depend on',
    meaning: '〜しだいだ・〜に頼る',
    note: PHRASAL,
    sentences: [
      { jp: 'それは天気しだいです。', en: 'It [depends on] the weather.' },
      { jp: '子どもたちは親に頼っています。', en: 'Children [depend on] their parents.' },
      { jp: '私たちの計画は彼の答えしだいです。', en: 'Our plan [depends on] his answer.' },
    ],
  },
  {
    phrase: 'belong to',
    meaning: '〜のものだ・〜に所属する',
    note: PHRASAL,
    sentences: [
      { jp: 'この本は私の兄のものです。', en: 'This book [belongs to] my brother.' },
      { jp: '私はテニス部に所属しています。', en: 'I [belong to] the tennis club.' },
      { jp: 'そのかさはだれのものですか。', en: 'Who does that umbrella [belong to]?' },
    ],
  },
]

const EIKEN2: Idiom[] = [
  {
    phrase: 'deal with',
    meaning: '〜に対処する',
    note: PHRASAL,
    sentences: [
      { jp: '私たちはこの問題に対処しなければならない。', en: 'We have to [deal with] this problem.' },
      { jp: '彼女は怒った客の対応が上手です。', en: 'She is good at [dealing with] angry customers.' },
      { jp: '政府はその状況に対処できなかった。', en: 'The government could not [deal with] the situation.' },
    ],
  },
  {
    phrase: 'come up with',
    meaning: '〜を思いつく',
    note: PHRASAL,
    sentences: [
      { jp: '彼は良い考えを思いつきました。', en: 'He [came up with] a good idea.' },
      { jp: '私たちは新しい計画を考え出す必要がある。', en: 'We need to [come up with] a new plan.' },
      { jp: 'だれがその名前を思いついたのですか。', en: 'Who [came up with] the name?' },
    ],
  },
  {
    phrase: 'look up to',
    meaning: '〜を尊敬する',
    note: PHRASAL,
    sentences: [
      { jp: '多くの若者が彼を尊敬しています。', en: 'Many young people [look up to] him.' },
      { jp: '私はずっと父を尊敬してきました。', en: 'I have always [looked up to] my father.' },
      { jp: '生徒たちはその先生を尊敬していた。', en: 'The students [looked up to] the teacher.' },
    ],
  },
  {
    phrase: 'run out of',
    meaning: '〜を使い果たす',
    note: PHRASAL,
    sentences: [
      { jp: '私たちはガソリンを切らしてしまった。', en: 'We have [run out of] gas.' },
      { jp: 'プリンターの紙がなくなった。', en: 'The printer has [run out of] paper.' },
      { jp: '時間がなくなってきている。', en: 'We are [running out of] time.' },
    ],
  },
  {
    phrase: 'get rid of',
    meaning: '〜を取り除く・処分する',
    note: VERB_IDIOM,
    sentences: [
      { jp: '私は古い服を処分しました。', en: 'I [got rid of] my old clothes.' },
      { jp: '悪い習慣をなくすのは難しい。', en: 'It is hard to [get rid of] bad habits.' },
      { jp: '彼らはその古い机を処分することにした。', en: 'They decided to [get rid of] the old desk.' },
    ],
  },
  {
    phrase: 'take advantage of',
    meaning: '〜を利用する',
    note: VERB_IDIOM,
    sentences: [
      { jp: 'あなたはこの機会を利用すべきだ。', en: 'You should [take advantage of] this chance.' },
      { jp: '多くの観光客がその安い料金を利用した。', en: 'Many tourists [took advantage of] the low prices.' },
      { jp: '彼女はそのセールを利用しました。', en: 'She [took advantage of] the sale.' },
    ],
  },
  {
    phrase: 'keep up with',
    meaning: '〜に遅れずについていく',
    note: PHRASAL,
    sentences: [
      { jp: '私は授業についていけない。', en: "I can't [keep up with] the class." },
      { jp: '彼は最新のニュースに遅れないようにしている。', en: 'He tries to [keep up with] the latest news.' },
      { jp: '私はほかのランナーについていけなかった。', en: "I couldn't [keep up with] the other runners." },
    ],
  },
  {
    phrase: 'be responsible for',
    meaning: '〜に責任がある',
    note: BE_ADJ,
    sentences: [
      { jp: '彼はそのプロジェクトの責任者です。', en: 'He [is responsible for] the project.' },
      { jp: 'だれがこの事故の責任を負うのですか。', en: 'Who [is responsible for] this accident?' },
      { jp: '親は子どもの安全に責任がある。', en: "Parents [are responsible for] their children's safety." },
    ],
  },
  {
    phrase: 'be aware of',
    meaning: '〜に気づいている',
    note: BE_ADJ,
    sentences: [
      { jp: '彼はその危険に気づいていなかった。', en: 'He was not [aware of] the danger.' },
      { jp: '私たちは環境問題を意識すべきだ。', en: 'We should [be aware of] environmental problems.' },
      { jp: '多くの人がその規則を知らない。', en: 'Many people are not [aware of] the rule.' },
    ],
  },
  {
    phrase: 'in spite of',
    meaning: '〜にもかかわらず',
    note: GROUP_PREP,
    sentences: [
      { jp: '雨にもかかわらず試合は続けられた。', en: 'The game continued [in spite of] the rain.' },
      { jp: '彼はけがをしていたにもかかわらず走り続けた。', en: 'He kept running [in spite of] his injury.' },
      { jp: '疲れていたにもかかわらず彼女は宿題を終えた。', en: 'She finished her homework [in spite of] being tired.' },
    ],
  },
  {
    phrase: 'according to',
    meaning: '〜によると',
    note: GROUP_PREP,
    sentences: [
      { jp: '天気予報によると明日は雨です。', en: '[According to] the weather forecast, it will rain tomorrow.' },
      { jp: '新聞によると、その店は閉店する。', en: '[According to] the newspaper, the store will close.' },
      { jp: '調査によると、多くの学生がスマートフォンを持っている。', en: '[According to] the survey, many students have smartphones.' },
    ],
  },
]

const KOUKO_NYUSHI: Idiom[] = [
  {
    phrase: 'look forward to',
    meaning: '〜を楽しみに待つ',
    note: VERB_IDIOM,
    sentences: [
      { jp: '私は京都への旅行を楽しみにしています。', en: 'I am [looking forward to] the trip to Kyoto.' },
      { jp: '私たちはまたあなたに会えるのを楽しみにしています。', en: 'We are [looking forward to] seeing you again.' },
      { jp: '彼女は誕生日パーティーを楽しみにしています。', en: 'She is [looking forward to] her birthday party.' },
    ],
  },
  {
    phrase: 'be interested in',
    meaning: '〜に興味がある',
    note: BE_ADJ,
    sentences: [
      { jp: '私は外国の文化に興味があります。', en: 'I [am interested in] foreign cultures.' },
      { jp: '彼は宇宙に興味を持っています。', en: 'He [is interested in] space.' },
      { jp: 'あなたは何に興味がありますか。', en: 'What are you [interested in]?' },
    ],
  },
  {
    phrase: 'take care of',
    meaning: '〜の世話をする・〜を大切にする',
    note: VERB_IDIOM,
    sentences: [
      { jp: '私は祖母の世話をしています。', en: 'I [take care of] my grandmother.' },
      { jp: 'だれがそのねこの世話をしますか。', en: 'Who will [take care of] the cat?' },
      { jp: '私たちは地球を大切にしなければならない。', en: 'We must [take care of] the earth.' },
    ],
  },
  {
    phrase: 'take part in',
    meaning: '〜に参加する',
    note: VERB_IDIOM,
    sentences: [
      { jp: '私はボランティア活動に参加しました。', en: 'I [took part in] volunteer activities.' },
      { jp: '彼らはスピーチコンテストに参加する予定です。', en: 'They are going to [take part in] the speech contest.' },
      { jp: 'その祭りに参加しませんか。', en: "Why don't you [take part in] the festival?" },
    ],
  },
  {
    phrase: 'because of',
    meaning: '〜のために・〜のせいで',
    note: GROUP_PREP,
    sentences: [
      { jp: '大雨のために私たちは家にいました。', en: 'We stayed home [because of] the heavy rain.' },
      { jp: '事故のために道路は閉鎖されていた。', en: 'The road was closed [because of] the accident.' },
      { jp: '彼はかぜのために来られなかった。', en: "He couldn't come [because of] his cold." },
    ],
  },
  {
    phrase: 'be proud of',
    meaning: '〜を誇りに思う',
    note: BE_ADJ,
    sentences: [
      { jp: '私は自分の町を誇りに思います。', en: 'I [am proud of] my town.' },
      { jp: '彼女は娘を誇りに思っていました。', en: 'She [was proud of] her daughter.' },
      { jp: '彼らは自分たちのチームを誇りに思っています。', en: 'They [are proud of] their team.' },
    ],
  },
  {
    phrase: 'look for',
    meaning: '〜を探す',
    note: PHRASAL,
    sentences: [
      { jp: '私は駅への道を探しています。', en: 'I am [looking for] the way to the station.' },
      { jp: '彼らはいなくなった犬を探しています。', en: 'They are [looking for] their lost dog.' },
      { jp: '何かお探しですか。', en: 'Are you [looking for] something?' },
    ],
  },
  {
    phrase: 'be good at',
    meaning: '〜が得意だ',
    note: BE_ADJ,
    sentences: [
      { jp: '私の姉はテニスが得意です。', en: 'My sister [is good at] tennis.' },
      { jp: '彼は絵をかくのが得意です。', en: 'He [is good at] drawing pictures.' },
      { jp: '私は数学が得意ではありません。', en: 'I am not [good at] math.' },
    ],
  },
  {
    phrase: 'be famous for',
    meaning: '〜で有名だ',
    note: BE_ADJ,
    sentences: [
      { jp: '奈良は大仏で有名です。', en: 'Nara [is famous for] its Great Buddha.' },
      { jp: 'この店はケーキで有名です。', en: 'This shop [is famous for] its cakes.' },
      { jp: 'その歌手は美しい声で有名です。', en: 'The singer [is famous for] her beautiful voice.' },
    ],
  },
  {
    phrase: 'get to',
    meaning: '〜に着く',
    note: PHRASAL,
    sentences: [
      { jp: '図書館への行き方を教えてください。', en: 'Please tell me how to [get to] the library.' },
      { jp: '私たちは暗くなる前に頂上に着いた。', en: 'We [got to] the top before dark.' },
      { jp: '彼は時間どおりに学校に着いた。', en: 'He [got to] school on time.' },
    ],
  },
]

export const idiomQuestions: Record<LevelId, Question[]> = {
  eiken4: build('e4', EIKEN4),
  eiken3: build('e3', EIKEN3),
  eikenPre2: build('ep2', EIKEN_PRE2),
  eiken2: build('e2', EIKEN2),
  koukoNyushi: build('kn', KOUKO_NYUSHI),
}
