import type { Question } from '../../types'
import { q } from '../questionGen'

/**
 * 英検2級 questions written to bring in the level's vocabulary — see
 * eiken4Vocab.ts for why. The audit found the level using only 14% of the
 * CEFR-J A1〜B1 list; B1 words that 2級 reading and writing lean on
 * (`afford`, `confidence`, `climate`, `career`, `prevent`) were missing.
 *
 * Each sentence drills one of the level's grammar points; `note` is spelled
 * as its grammar tag's label in data/grammar.ts.
 */

interface Sentence {
  jp: string
  en: string
}

/** Turns a sentence list into questions with ids prefixed `v2-<slot>-<i>`. */
const build = (slot: string, note: string, sentences: Sentence[]): Question[] =>
  sentences.map((s, i) => q(`v2-${slot}-${i}`, s.jp, s.en, note))

const SUBJUNCTIVE_PAST: Sentence[] = [
  { jp: 'もし十分なお金があれば、新しい車を買う余裕があるのに。', en: 'If I had enough money, I could afford a new car.' },
  { jp: 'もし時間があれば、ボランティア活動に参加するのに。', en: 'If I had time, I would join the volunteer activity.' },
]

const SUBJUNCTIVE_PAST_PERFECT: Sentence[] = [
  { jp: 'もし天気予報を見ていたら、かさを持って行ったでしょう。', en: 'If I had checked the forecast, I would have brought an umbrella.' },
  { jp: 'もっと一生懸命勉強していたら、彼女は試験に合格していたでしょう。', en: 'If she had studied harder, she would have passed the examination.' },
]

const I_WISH: Sentence[] = [
  { jp: '英語を流ちょうに話せたらいいのに。', en: 'I wish I could speak English fluently.' },
  { jp: '祖母の近くに住んでいればいいのに。', en: 'I wish I lived closer to my grandmother.' },
]

const AS_IF: Sentence[] = [
  { jp: '彼はまるで有名人であるかのように話します。', en: 'He talks as if he were a celebrity.' },
]

const PAST_PERFECT: Sentence[] = [
  { jp: '私たちが着いたとき、コンサートはすでに始まっていました。', en: 'The concert had already started when we arrived.' },
  { jp: '私はそれまでにそんなに美しい夕日を見たことがありませんでした。', en: 'I had never seen such a beautiful sunset before.' },
]

const PERFECT_PROGRESSIVE: Sentence[] = [
  { jp: '今朝早くからずっと雨が降っています。', en: 'It has been raining since early this morning.' },
  { jp: '彼女はこの会社で10年間働いています。', en: 'She has been working for this company for ten years.' },
]

const PERFECT_PASSIVE: Sentence[] = [
  { jp: '博物館は5月から修理のために閉館しています。', en: 'The museum has been closed for repairs since May.' },
  { jp: 'この地域では多くの新しい仕事が生まれました。', en: 'Many new jobs have been created in this area.' },
]

const PARTICIPLE_CLAUSE: Sentence[] = [
  { jp: '疲れを感じたので、彼女は休憩することにしました。', en: 'Feeling tired, she decided to take a break.' },
  { jp: '通りを歩いているとき、私は古い友人に会いました。', en: 'Walking along the street, I met an old friend.' },
]

const CAUSATIVE_HAVE: Sentence[] = [
  { jp: '私は昨日髪を切ってもらいました。', en: 'I had my hair cut yesterday.' },
]

const CAUSATIVE_MAKE: Sentence[] = [
  { jp: 'コーチは選手たちにグラウンドを走らせました。', en: 'The coach made the players run around the field.' },
]

const CLEFT: Sentence[] = [
  { jp: '私に釣りの仕方を教えてくれたのは祖父でした。', en: 'It was my grandfather who taught me how to fish.' },
]

const NO_MATTER: Sentence[] = [
  { jp: 'どんなに忙しくても、彼はいつも他の人を助けます。', en: 'No matter how busy he is, he always helps others.' },
]

const UNLESS: Sentence[] = [
  { jp: '急がないと電車に乗り遅れますよ。', en: 'You will miss the train unless you hurry.' },
  { jp: '雨が降らない限り、式典は外で行います。', en: 'Unless it rains, we will have the ceremony outside.' },
]

const SUPERLATIVE_EVER: Sentence[] = [
  { jp: 'これは私が今までに食べた中で一番おいしい食事です。', en: 'This is the most delicious meal I have ever had.' },
  { jp: '彼女は私が今まで会った中で最も才能のある音楽家です。', en: 'She is the most talented musician I have ever met.' },
]

const RELATIVE_WHAT: Sentence[] = [
  { jp: '私が最も驚いたのは彼の自信でした。', en: 'What surprised me most was his confidence.' },
  { jp: '旅行に何が必要か教えてください。', en: 'Please tell me what you need for the trip.' },
]

const RELATIVE_WHEN: Sentence[] = [
  { jp: '私は初めて彼女に会った日を覚えています。', en: 'I remember the day when I first met her.' },
]

const RELATIVE_WHY: Sentence[] = [
  { jp: 'それが彼女が職業を変えた理由です。', en: 'That is the reason why she changed her career.' },
]

const RELATIVE_WHERE: Sentence[] = [
  { jp: 'これはその有名な作家が育った村です。', en: 'This is the village where the famous writer grew up.' },
]

const REPORTED: Sentence[] = [
  { jp: '彼は私にレポートを終えたかどうか尋ねました。', en: 'He asked me whether I had finished the report.' },
  { jp: '彼女は疲れていると言いました。', en: 'She said that she was exhausted.' },
]

const GERUND_SUBJECT: Sentence[] = [
  { jp: 'プラスチックのボトルをリサイクルすることは環境を守るのに役立ちます。', en: 'Recycling plastic bottles helps protect the environment.' },
  { jp: '外国語を学ぶには忍耐が必要です。', en: 'Learning a foreign language requires patience.' },
]

const GERUND_IDIOM: Sentence[] = [
  { jp: '彼の冗談に笑わずにはいられませんでした。', en: "I couldn't help laughing at his joke." },
  { jp: '天気について文句を言ってもむだです。', en: 'It is no use complaining about the weather.' },
]

const GERUND_VS_INFINITIVE: Sentence[] = [
  { jp: '出かけるときにドアの鍵をかけるのを忘れないで。', en: "Don't forget to lock the door when you leave." },
  { jp: '子どものころにこの城を訪れたことを覚えています。', en: 'I remember visiting this castle as a child.' },
]

const THAT_CLAUSE: Sentence[] = [
  { jp: '専門家は気候が急速に変化していると信じています。', en: 'Experts believe that the climate is changing rapidly.' },
  { jp: 'その調査は多くの10代がストレスを感じていることを示しています。', en: 'The survey shows that many teenagers feel stress.' },
]

const MAY_MIGHT: Sentence[] = [
  { jp: '荷物は明日届くかもしれません。', en: 'The package might arrive tomorrow.' },
  { jp: '彼は今図書館にいるかもしれません。', en: 'He could be at the library now.' },
]

const USED_TO: Sentence[] = [
  { jp: 'かつて川の近くに工場がありました。', en: 'There used to be a factory near the river.' },
]

const HAD_BETTER: Sentence[] = [
  { jp: '前もってテーブルを予約した方がいいです。', en: 'You had better reserve a table in advance.' },
]

const SEEM_TO: Sentence[] = [
  { jp: '彼女は結果に満足しているようです。', en: 'She seems to be satisfied with the result.' },
]

const PERFECT_INFINITIVE: Sentence[] = [
  { jp: '彼は自信をなくしてしまったようです。', en: 'He seems to have lost his confidence.' },
]

const THE_MORE: Sentence[] = [
  { jp: '練習すればするほど、自信がつきます。', en: 'The more you practice, the more confident you become.' },
  { jp: '早く出発すればするほど、早く着きます。', en: 'The sooner we leave, the earlier we will arrive.' },
]

const WHOSE: Sentence[] = [
  { jp: '私には父親が有名なシェフである友達がいます。', en: 'I have a friend whose father is a famous chef.' },
]

const NON_RESTRICTIVE: Sentence[] = [
  { jp: '姉はロンドンに住んでいて、看護師をしています。', en: 'My sister, who lives in London, is a nurse.' },
]

const RELATIVE_OMITTED: Sentence[] = [
  { jp: '私が図書館で借りた本はとても役に立ちました。', en: 'The book I borrowed from the library was very useful.' },
]

const SO_THAT_CAN: Sentence[] = [
  { jp: '海外旅行ができるように、私はお金を貯めました。', en: 'I saved money so that I could travel abroad.' },
  { jp: 'みんなが理解できるように、はっきり話してください。', en: 'Speak clearly so that everyone can understand you.' },
]

const INVERSION: Sentence[] = [
  { jp: 'これほど大勢の人を見たことがありません。', en: 'Never have I seen such a huge crowd.' },
  { jp: '彼が有名な俳優だとは少しも知りませんでした。', en: 'Little did I know that he was a famous actor.' },
]

const FUTURE_PROGRESSIVE: Sentence[] = [
  { jp: '明日の今ごろ、私たちはパリへ飛んでいるでしょう。', en: 'This time tomorrow, we will be flying to Paris.' },
]

const NOTHING_MORE: Sentence[] = [
  { jp: '友情ほど価値のあるものはありません。', en: 'Nothing is more valuable than friendship.' },
]

const INANIMATE_SUBJECT: Sentence[] = [
  { jp: 'そのニュースを聞いて、彼は将来について考えました。', en: 'The news made him think about his future.' },
  { jp: '大雪のため、私たちは外出できませんでした。', en: 'Heavy snow prevented us from going out.' },
  { jp: '少し歩けば駅に着きます。', en: 'A short walk will take you to the station.' },
]

export const eiken2VocabQuestions: Question[] = [
  ...build('subj', '仮定法過去', SUBJUNCTIVE_PAST),
  ...build('subjperf', '仮定法過去完了', SUBJUNCTIVE_PAST_PERFECT),
  ...build('wish', 'I wish 〜', I_WISH),
  ...build('asif', '仮定法 as if', AS_IF),
  ...build('pastperf', '過去完了', PAST_PERFECT),
  ...build('perfprog', '現在完了進行形', PERFECT_PROGRESSIVE),
  ...build('perfpassive', '現在完了の受動態', PERFECT_PASSIVE),
  ...build('partclause', '分詞構文', PARTICIPLE_CLAUSE),
  ...build('have', '使役動詞 have', CAUSATIVE_HAVE),
  ...build('make', '使役動詞 make', CAUSATIVE_MAKE),
  ...build('cleft', '強調構文 It is 〜 that', CLEFT),
  ...build('nomatter', '譲歩 no matter how', NO_MATTER),
  ...build('unless', '条件 unless', UNLESS),
  ...build('ever', '最上級 + 現在完了(経験)', SUPERLATIVE_EVER),
  ...build('what', '関係代名詞 what', RELATIVE_WHAT),
  ...build('when', '関係副詞 when', RELATIVE_WHEN),
  ...build('why', '関係副詞 why', RELATIVE_WHY),
  ...build('where', '関係副詞 where', RELATIVE_WHERE),
  ...build('reported', '間接話法', REPORTED),
  ...build('gersubj', '動名詞(主語)', GERUND_SUBJECT),
  ...build('geridiom', '動名詞の慣用表現', GERUND_IDIOM),
  ...build('gerinf', '動名詞と不定詞の使い分け', GERUND_VS_INFINITIVE),
  ...build('that', '接続詞 that', THAT_CLAUSE),
  ...build('might', '推量の may/might/could', MAY_MIGHT),
  ...build('usedto', 'used to 〜', USED_TO),
  ...build('better', 'had better 〜', HAD_BETTER),
  ...build('seem', 'seem to 〜', SEEM_TO),
  ...build('perfinf', '完了不定詞 to have done', PERFECT_INFINITIVE),
  ...build('themore', 'the 比較級, the 比較級', THE_MORE),
  ...build('whose', '関係代名詞 whose', WHOSE),
  ...build('nonres', '関係代名詞の非制限用法', NON_RESTRICTIVE),
  ...build('omit', '関係代名詞の省略', RELATIVE_OMITTED),
  ...build('sothat', '目的の so that 〜 can', SO_THAT_CAN),
  ...build('inversion', '倒置', INVERSION),
  ...build('futprog', '未来進行形', FUTURE_PROGRESSIVE),
  ...build('nothing', 'nothing is more 〜 than', NOTHING_MORE),
  ...build('inanimate', '無生物主語', INANIMATE_SUBJECT),
]
