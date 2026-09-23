import type { Question } from '../../types'
import { q } from '../questionGen'

/**
 * 英検3級 questions written to bring in basic vocabulary the rest of the bank
 * never used — see eiken4Vocab.ts for why. The audit found the level using
 * only 38% of the CEFR-J A1 list: no `water`, `breakfast`, `winter` or
 * `city`, and question words like `which` and `who` never came up.
 *
 * Each sentence drills one of the level's grammar points; `note` is spelled
 * as its grammar tag's label in data/grammar.ts.
 */

interface Sentence {
  jp: string
  en: string
}

/** Turns a sentence list into questions with ids prefixed `v3-<slot>-<i>`. */
const build = (slot: string, note: string, sentences: Sentence[]): Question[] =>
  sentences.map((s, i) => q(`v3-${slot}-${i}`, s.jp, s.en, note))

const PAST_REGULAR: Sentence[] = [
  { jp: '私は昨夜祖父に電話しました。', en: 'I called my grandpa last night.' },
  { jp: '私たちは京都で古い宮殿を訪れました。', en: 'We visited an old palace in Kyoto.' },
  { jp: '彼女は台所でカップを洗いました。', en: 'She washed the cups in the kitchen.' },
  { jp: '私はテレビでおもしろいアニメを見ました。', en: 'I watched a funny cartoon on TV.' },
  { jp: '彼はプールに飛びこみました。', en: 'He jumped into the pool.' },
  { jp: '私は電話を水の中に落としました。', en: 'I dropped my phone in the water.' },
  { jp: '私の両親は新しい市に引っ越しました。', en: 'My parents moved to a new city.' },
  { jp: '彼は駅へ急ぎました。', en: 'He hurried to the station.' },
  { jp: '私たちは20分待ちました。', en: 'We waited for twenty minutes.' },
  { jp: '生徒たちは行事のあとでホールをそうじしました。', en: 'The students cleaned the hall after the event.' },
]

const GOING_TO: Sentence[] = [
  { jp: '私は日曜日に動物園へ行くつもりです。', en: "I'm going to visit the zoo on Sunday." },
  { jp: '私たちは今夜大きなパーティーを開く予定です。', en: 'We are going to have a big party tonight.' },
  { jp: '今晩は雪が降りそうです。', en: 'It is going to snow this evening.' },
  { jp: '姉は看護師になるつもりです。', en: 'My sister is going to be a nurse.' },
  { jp: 'この冬は何をするつもりですか。', en: 'What are you going to do this winter?' },
]

const COMPARATIVE_ER: Sentence[] = [
  { jp: '兄は父より力が強いです。', en: 'My brother is stronger than my father.' },
  { jp: 'この箱はあの箱より大きいです。', en: 'This box is larger than that one.' },
  { jp: '冬は秋より寒いです。', en: 'Winter is colder than fall.' },
]

const SUPERLATIVE: Sentence[] = [
  { jp: '彼女は私たちのクラスで一番賢い生徒です。', en: 'She is the smartest student in our class.' },
  { jp: 'これは市で一番にぎやかな通りです。', en: 'This is the busiest street in the city.' },
  { jp: '8月は1年で一番暑い月です。', en: 'August is the hottest month of the year.' },
]

const SUPERLATIVE_MOST: Sentence[] = [
  { jp: 'これはその店で一番おいしいケーキです。', en: 'This is the most delicious cake in the shop.' },
  { jp: 'サッカーは私の学校で一番人気のあるスポーツです。', en: 'Soccer is the most popular sport in my school.' },
]

const LIKE_BETTER: Sentence[] = [
  { jp: '私は冬より夏の方が好きです。', en: 'I like summer better than winter.' },
  { jp: 'ご飯とパンではどちらの方が好きですか。', en: 'Which do you like better, rice or bread?' },
  { jp: '私はすべてのスポーツの中でバレーボールが一番好きです。', en: 'I like volleyball the best of all sports.' },
  { jp: 'あなたはどの季節が一番好きですか。', en: 'Which season do you like the best?' },
]

const GERUND: Sentence[] = [
  { jp: '私は友達と話すのを楽しみます。', en: 'I enjoy talking with my friends.' },
  { jp: '父は去年たばこをやめました。', en: 'My father stopped smoking last year.' },
  { jp: '私たちは海で泳ぐのを楽しみました。', en: 'We enjoyed swimming in the sea.' },
  { jp: '私は音楽に合わせて踊るのが大好きです。', en: 'I love dancing to music.' },
]

const INFINITIVE_NOUN: Sentence[] = [
  { jp: '私の夢は世界中を旅することです。', en: 'My dream is to travel around the world.' },
  { jp: '私は新しいジーンズを1本買いたいです。', en: 'I want to buy a new pair of jeans.' },
  { jp: '私はお弁当を持ってくるのを忘れました。', en: 'I forgot to bring my lunch.' },
  { jp: '私はタクシーに乗りたいです。', en: 'I would like to take a taxi.' },
  { jp: '私は将来科学者になりたいです。', en: 'I want to be a scientist in the future.' },
]

const INFINITIVE_PURPOSE: Sentence[] = [
  { jp: '私は砂糖を買うために店へ行きました。', en: 'I went to the store to buy some sugar.' },
  { jp: '彼は私たちの文化について学ぶために日本に来ました。', en: 'He came to Japan to learn about our culture.' },
  { jp: '私たちは野球をするために野原へ行きました。', en: 'We went to the field to play baseball.' },
]

const INFINITIVE_FEELING: Sentence[] = [
  { jp: 'あなたのメッセージをもらってうれしかったです。', en: 'I was happy to get your message.' },
  { jp: 'その知らせを聞いて残念でした。', en: 'We were sorry to hear the news.' },
]

const HAVE_TO_MUST: Sentence[] = [
  { jp: '私は毎朝うさぎにえさをあげなければなりません。', en: 'I have to feed my rabbit every morning.' },
  { jp: '今お金を払わなければなりませんか。', en: 'Do I have to pay now?' },
]

const MUST: Sentence[] = [
  { jp: '食事の前に手を洗わなければなりません。', en: 'You must wash your hands before meals.' },
  { jp: '私たちは金曜日までにこの仕事を終えなければなりません。', en: 'We must finish this work by Friday.' },
  { jp: '図書館で食べてはいけません。', en: 'You must not eat in the library.' },
]

const PAST_PROGRESSIVE: Sentence[] = [
  { jp: 'あなたが電話したとき、私はシャワーを浴びていました。', en: 'I was taking a shower when you called.' },
  { jp: '彼らは体育館でバレーボールをしていました。', en: 'They were playing volleyball in the gym.' },
  { jp: '母は雑誌を読んでいました。', en: 'My mother was reading a magazine.' },
]

const BECAUSE: Sentence[] = [
  { jp: '私は病気だったので家にいました。', en: 'I stayed home because I was sick.' },
  { jp: '彼女は一生懸命働いたので疲れていました。', en: 'She was tired because she worked hard.' },
  { jp: '甘すぎないので私はこのケーキが好きです。', en: 'I like this cake because it is not too sweet.' },
]

const IF: Sentence[] = [
  { jp: 'もしひまなら、動物園へ行こう。', en: "If you are free, let's go to the zoo." },
  { jp: 'もし明日暖かければ、私たちはピクニックをします。', en: 'If it is warm tomorrow, we will have a picnic.' },
  { jp: 'もしおなかがすいているなら、このパンを食べてください。', en: 'If you are hungry, please eat this bread.' },
]

const WHEN_UNTIL: Sentence[] = [
  { jp: '値段を見たとき、私は驚きました。', en: 'I was surprised when I saw the price.' },
  { jp: '子どものころ、私は海の近くに住んでいました。', en: 'When I was a child, I lived near the sea.' },
]

const UNTIL_BEFORE_AFTER: Sentence[] = [
  { jp: '雨がやむまで家にいましょう。', en: "Let's stay home until the rain stops." },
  { jp: '食べる前に手を洗いなさい。', en: 'Wash your hands before you eat.' },
  { jp: '私は朝食を食べたあとに散歩します。', en: 'I take a walk after I have breakfast.' },
]

const THERE_IS: Sentence[] = [
  { jp: '私のクラスには30人の生徒がいます。', en: 'There are thirty students in my class.' },
  { jp: '農場には何頭かの牛がいます。', en: 'There are some cows on the farm.' },
  { jp: '動物園には大きなトラがいました。', en: 'There was a big tiger at the zoo.' },
  { jp: '庭には大きな木があります。', en: 'There is a big tree in the yard.' },
]

const WH_TO: Sentence[] = [
  { jp: '何と言えばいいのかわかりません。', en: "I don't know what to say." },
  { jp: 'どこで切符を買えばいいか教えてくれますか。', en: 'Can you tell me where to buy tickets?' },
  { jp: 'どのバスに乗ればいいかわかりません。', en: "I don't know which bus to take." },
  { jp: '母は私にご飯の炊き方を教えてくれました。', en: 'My mother taught me how to cook rice.' },
]

const SVOO: Sentence[] = [
  { jp: 'チケットを見せてください。', en: 'Please show me your ticket.' },
  { jp: 'あなたの電話番号を教えていただけますか。', en: 'Could you tell me your phone number?' },
  { jp: 'ブラウン先生は私たちに音楽を教えています。', en: 'Mr. Brown teaches us music.' },
]

const SVO_FOR: Sentence[] = [
  { jp: '祖母が私たちに夕食を作ってくれました。', en: 'My grandma cooked dinner for us.' },
  { jp: '彼は奥さんに花を買いました。', en: 'He bought some flowers for his wife.' },
]

const SVOC_CALL: Sentence[] = [
  { jp: '私たちは彼をリーダーと呼んでいます。', en: 'We call him our leader.' },
  { jp: '日本語でこの花を何と呼びますか。', en: 'What do you call this flower in Japanese?' },
]

const PREP_PHRASE: Sentence[] = [
  { jp: '赤いドレスを着た女の子は私のいとこです。', en: 'The girl in the red dress is my cousin.' },
  { jp: 'ドアのところにいる男性は私のおじです。', en: 'The man at the door is my uncle.' },
  { jp: '壁の絵は美しいです。', en: 'The picture on the wall is beautiful.' },
]

const TOO: Sentence[] = [
  { jp: 'このシャツは私には小さすぎます。', en: 'This shirt is too small for me.' },
  { jp: 'このズボンは私には長すぎます。', en: 'These pants are too long for me.' },
]

const EXCLAMATION: Sentence[] = [
  { jp: 'この赤ちゃんはなんてかわいいのでしょう。', en: 'How cute this baby is!' },
  { jp: 'なんてすてきな日でしょう。', en: 'What a lovely day!' },
  { jp: 'なんて大きな船でしょう。', en: 'What a big ship!' },
]

const LETTER: Sentence[] = [
  { jp: '親切なメッセージをありがとう。', en: 'Thank you for your kind message.' },
  { jp: 'ご両親によろしく伝えてください。', en: 'Please say hello to your parents.' },
]

const SHALL_WE: Sentence[] = [
  { jp: '今夜映画館へ行きませんか。', en: 'Shall we go to the cinema tonight?' },
  { jp: '休憩しませんか。', en: "Why don't we take a break?" },
]

const HOW_OFTEN: Sentence[] = [
  { jp: 'あなたはどのくらいの頻度でドラムを演奏しますか。', en: 'How often do you play the drums?' },
  { jp: 'バスはどのくらいの頻度で来ますか。', en: 'How often does the bus come?' },
]

const CAN: Sentence[] = [
  { jp: '宿題を手伝ってくれますか。', en: 'Can you help me with my homework?' },
  { jp: 'めがねが見つかりません。', en: "I can't find my glasses." },
]

const PRESENT: Sentence[] = [
  { jp: '私は毎日1時間英語を勉強します。', en: 'I study English for an hour every day.' },
  { jp: '私の姉は銀行で働いています。', en: 'My sister works at a bank.' },
]

export const eiken3VocabQuestions: Question[] = [
  ...build('past', '過去形(規則動詞)', PAST_REGULAR),
  ...build('going', 'be going to', GOING_TO),
  ...build('er', '比較級(-er)', COMPARATIVE_ER),
  ...build('est', '最上級(-est)', SUPERLATIVE),
  ...build('most', '最上級(most)', SUPERLATIVE_MOST),
  ...build('better', 'like 〜 better/best', LIKE_BETTER),
  ...build('gerund', '動名詞(目的語)', GERUND),
  ...build('toinf', '不定詞(名詞的用法)', INFINITIVE_NOUN),
  ...build('purpose', '不定詞(副詞的用法・目的)', INFINITIVE_PURPOSE),
  ...build('feeling', '不定詞(副詞的用法・感情の原因)', INFINITIVE_FEELING),
  ...build('haveto', 'have to 〜', HAVE_TO_MUST),
  ...build('must', '助動詞 must', MUST),
  ...build('pastprog', '過去進行形', PAST_PROGRESSIVE),
  ...build('because', '理由の because', BECAUSE),
  ...build('if', '条件の if', IF),
  ...build('when', '時の when', WHEN_UNTIL),
  ...build('until', 'until / before / after', UNTIL_BEFORE_AFTER),
  ...build('there', 'There is/are', THERE_IS),
  ...build('whto', '疑問詞 + to不定詞', WH_TO),
  ...build('svoo', 'SVOO (ask/teach + 人 + 事)', SVOO),
  ...build('for', 'SVO + for 人', SVO_FOR),
  ...build('call', 'SVOC (call O C)', SVOC_CALL),
  ...build('prep', '前置詞句の後置修飾', PREP_PHRASE),
  ...build('too', '程度の too + 形容詞', TOO),
  ...build('excl', '感嘆文 What/How', EXCLAMATION),
  ...build('letter', '手紙・メール表現', LETTER),
  ...build('shall', 'Shall we / Why don’t we 〜?', SHALL_WE),
  ...build('often', 'How often 〜?', HOW_OFTEN),
  ...build('can', '助動詞 can', CAN),
  ...build('present', '一般動詞の現在形', PRESENT),
]
