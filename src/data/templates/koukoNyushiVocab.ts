import type { Question } from '../../types'
import { q } from '../questionGen'

/**
 * 高校入試 questions written to bring in 中学 vocabulary the rest of the bank
 * never used — see eiken4Vocab.ts for why. The audit found the level using
 * only 19% of the CEFR-J A1〜A2 list (its target, following the 学習指導要領's
 * aim for the end of 中学).
 *
 * Each sentence drills one of the grammar points the entrance exams test;
 * `note` is spelled as its grammar tag's label in data/grammar.ts.
 */

interface Sentence {
  jp: string
  en: string
}

/** Turns a sentence list into questions with ids prefixed `vkn-<slot>-<i>`. */
const build = (slot: string, note: string, sentences: Sentence[]): Question[] =>
  sentences.map((s, i) => q(`vkn-${slot}-${i}`, s.jp, s.en, note))

const PASSIVE_PRESENT: Sentence[] = [
  { jp: '私たちの文化祭は毎年10月に開かれます。', en: 'Our school festival is held every October.' },
  { jp: 'この寺には多くの外国人観光客が訪れます。', en: 'This temple is visited by many foreign tourists.' },
  { jp: 'これらの野菜はおじの農場で育てられています。', en: "These vegetables are grown on my uncle's farm." },
]

const PASSIVE_PAST: Sentence[] = [
  { jp: 'その手紙はまちがった住所に送られました。', en: 'The letter was sent to the wrong address.' },
  { jp: 'その古い城は火事で壊されました。', en: 'The old castle was destroyed by fire.' },
  { jp: 'その写真は修学旅行の間に撮られました。', en: 'The picture was taken during our school trip.' },
]

const RELATIVE_OBJECT: Sentence[] = [
  { jp: '私たちが昨夜見た映画はわくわくしました。', en: 'The movie that we saw last night was exciting.' },
  { jp: 'これは祖母がよく歌う歌です。', en: 'This is the song which my grandmother often sings.' },
  { jp: '私の姉が作ったケーキはとてもおいしかったです。', en: 'The cake that my sister made was delicious.' },
]

const RELATIVE_OMITTED: Sentence[] = [
  { jp: '私が昨日買ったくつは小さすぎます。', en: 'The shoes I bought yesterday are too small.' },
  { jp: '彼が話してくれた話はとてもおもしろかったです。', en: 'The story he told us was very funny.' },
]

const PARTICIPLE_AFTER: Sentence[] = [
  { jp: '舞台でギターを弾いている男の子は私の兄です。', en: 'The boy playing the guitar on the stage is my brother.' },
  { jp: '校長先生と話している女性を知っていますか。', en: 'Do you know the woman talking to our principal?' },
]

const WHERE: Sentence[] = [
  { jp: 'これは私が生まれた病院です。', en: 'This is the hospital where I was born.' },
  { jp: '京都は私の両親が初めて出会った市です。', en: 'Kyoto is the city where my parents first met.' },
  { jp: '安いめがねを買える店を知っていますか。', en: 'Do you know a shop where I can buy cheap glasses?' },
]

const INFINITIVE_ADJECTIVE: Sentence[] = [
  { jp: '今日はするべき宿題がたくさんあります。', en: 'I have a lot of homework to do today.' },
  { jp: '彼女には話し相手が必要です。', en: 'She needs someone to talk with.' },
  { jp: '奈良には訪れるべき場所がたくさんあります。', en: 'There are many places to visit in Nara.' },
  { jp: 'さよならを言う時間です。', en: "It's time to say goodbye." },
]

const AS_SOON_AS: Sentence[] = [
  { jp: '家に着いたらすぐに電話してください。', en: 'Please call me as soon as you get home.' },
  { jp: 'ベルが鳴るとすぐに、生徒たちは外へ走り出ました。', en: 'As soon as the bell rang, the students ran outside.' },
]

const PERFECT: Sentence[] = [
  { jp: 'あなたはどれくらいピアノを習っていますか。', en: 'How long have you studied the piano?' },
  { jp: '兄は日曜日から病気です。', en: 'My brother has been sick since Sunday.' },
]

const PERFECT_EXPERIENCE: Sentence[] = [
  { jp: 'あなたは着物を着たことがありますか。', en: 'Have you ever worn a kimono?' },
  { jp: '私は一度も飛行機に乗ったことがありません。', en: 'I have never traveled by plane.' },
]

const WANT_TO: Sentence[] = [
  { jp: '両親は私に医者になってほしいと思っています。', en: 'My parents want me to become a doctor.' },
  { jp: '窓を開けましょうか。', en: 'Do you want me to open the window?' },
  { jp: '私はあなたに私の気持ちを知ってほしい。', en: 'I want you to know my feelings.' },
]

const INDIRECT: Sentence[] = [
  { jp: 'だれがこの花びんを割ったか知っていますか。', en: 'Do you know who broke this vase?' },
  { jp: 'めがねをどこに置いたか思い出せません。', en: "I can't remember where I put my glasses." },
]

const PERCEPTION: Sentence[] = [
  { jp: '隣の部屋でだれかが歌っているのが聞こえました。', en: 'I heard someone singing in the next room.' },
  { jp: '私はねこが屋根の上で眠っているのを見ました。', en: 'I saw a cat sleeping on the roof.' },
]

const WH_TO: Sentence[] = [
  { jp: '彼女は紙飛行機の作り方を教えてくれました。', en: 'She showed me how to make a paper plane.' },
  { jp: 'ピクニックに何を持っていけばいいか教えて。', en: 'Tell me what to bring to the picnic.' },
]

const MAKE_DO: Sentence[] = [
  { jp: 'その悲しい映画を見て私は泣きました。', en: 'The sad movie made me cry.' },
]

const LET_DO: Sentence[] = [
  { jp: '父は私にカメラを使わせてくれました。', en: 'My father let me use his camera.' },
  { jp: '自己紹介させてください。', en: 'Let me introduce myself.' },
]

const SVOO: Sentence[] = [
  { jp: '辞書を貸していただけますか。', en: 'Could you lend me your dictionary?' },
  { jp: '祖母が私に誕生日プレゼントを送ってくれました。', en: 'My grandmother sent me a birthday present.' },
]

const SO_THAT: Sentence[] = [
  { jp: '音楽がとても大きかったので、あなたの声が聞こえませんでした。', en: "The music was so loud that I couldn't hear you." },
  { jp: 'その話はとてもおもしろかったので2回読みました。', en: 'The story was so interesting that I read it twice.' },
]

const TAG_QUESTION: Sentence[] = [
  { jp: 'あなたは新入生ですよね。', en: "You are a new student, aren't you?" },
  { jp: 'すばらしいコンサートでしたね。', en: "It was a wonderful concert, wasn't it?" },
  { jp: 'あなたは泳げますよね。', en: "You can swim, can't you?" },
]

const ANY_OTHER: Sentence[] = [
  { jp: '彼女はクラスのほかのどの生徒よりも速く走ります。', en: 'She runs faster than any other student in her class.' },
  { jp: 'この湖は日本のほかのどの湖よりも深いです。', en: 'This lake is deeper than any other lake in Japan.' },
]

const PAST_PROGRESSIVE: Sentence[] = [
  { jp: '昨夜8時に何をしていましたか。', en: 'What were you doing at eight last night?' },
  { jp: '私が起きたとき、雪が降っていました。', en: 'It was snowing when I woke up.' },
]

const GOING_TO: Sentence[] = [
  { jp: '私たちは庭に花を植えるつもりです。', en: 'We are going to plant some flowers in the garden.' },
]

const MAKE_OC: Sentence[] = [
  { jp: 'そのニュースはみんなを幸せにしました。', en: 'The news made everyone happy.' },
]

const NOT_ONLY: Sentence[] = [
  { jp: 'この本はおもしろいだけでなく役に立ちます。', en: 'This book is not only interesting but also useful.' },
  { jp: '彼女は歌だけでなくダンスも得意です。', en: 'She is good at not only singing but also dancing.' },
]

const TOO_TO: Sentence[] = [
  { jp: 'その川は泳ぐには危険すぎました。', en: 'The river was too dangerous to swim in.' },
  { jp: 'このかばんは私には重すぎて運べません。', en: 'This bag is too heavy for me to carry.' },
]

const PHONE: Sentence[] = [
  { jp: 'お母さんをお願いできますか。', en: 'May I speak to your mother, please?' },
  { jp: '伝言をお願いできますか。', en: 'Can I leave a message?' },
  { jp: '番号をおまちがえだと思います。', en: 'I think you have the wrong number.' },
]

const DIRECTIONS: Sentence[] = [
  { jp: 'この通りをまっすぐ行ってください。', en: 'Go straight along this street.' },
  { jp: '銀行は右側にあります。', en: 'The bank is on your right.' },
  { jp: 'それは郵便局の向かいにあります。', en: "It's across from the post office." },
  { jp: 'そこへ行くのにどれくらいかかりますか。', en: 'How long does it take to get there?' },
]

const THAT_CLAUSE: Sentence[] = [
  { jp: 'あなたがこのプレゼントを気に入ってくれるといいです。', en: 'I hope that you will like this gift.' },
  { jp: '彼女はきっとレースに勝つと思います。', en: "I'm sure that she will win the race." },
]

const WOULD_YOU_LIKE: Sentence[] = [
  { jp: '私たちのクラブに入りませんか。', en: 'Would you like to join our club?' },
  { jp: 'お茶をもう1杯いかがですか。', en: 'Would you like another cup of tea?' },
]

const THERE_IS: Sentence[] = [
  { jp: '沖縄には美しい浜辺がたくさんあります。', en: 'There are many beautiful beaches in Okinawa.' },
  { jp: '私のコンピューターはどこかおかしいです。', en: 'There is something wrong with my computer.' },
]

export const koukoNyushiVocabQuestions: Question[] = [
  ...build('passive', '受動態(現在)', PASSIVE_PRESENT),
  ...build('passivepast', '受動態(過去)', PASSIVE_PAST),
  ...build('relobj', '関係代名詞(目的格)', RELATIVE_OBJECT),
  ...build('omit', '関係代名詞の省略', RELATIVE_OMITTED),
  ...build('ing', '現在分詞の後置修飾', PARTICIPLE_AFTER),
  ...build('where', '関係副詞 where', WHERE),
  ...build('infadj', '不定詞(形容詞的用法)', INFINITIVE_ADJECTIVE),
  ...build('assoon', 'as soon as', AS_SOON_AS),
  ...build('cont', '現在完了(継続)', PERFECT),
  ...build('exp', '現在完了(経験)', PERFECT_EXPERIENCE),
  ...build('want', 'want + O + to do', WANT_TO),
  ...build('indirect', '間接疑問文', INDIRECT),
  ...build('perception', '知覚動詞 + doing/do', PERCEPTION),
  ...build('whto', '疑問詞 + to不定詞', WH_TO),
  ...build('make', '使役動詞 make', MAKE_DO),
  ...build('let', '使役動詞 let', LET_DO),
  ...build('svoo', 'SVOO (give + 人 + 物)', SVOO),
  ...build('sothat', 'so 〜 that ...', SO_THAT),
  ...build('tag', '付加疑問文', TAG_QUESTION),
  ...build('anyother', '比較級 + any other', ANY_OTHER),
  ...build('pastprog', '過去進行形', PAST_PROGRESSIVE),
  ...build('going', 'be going to', GOING_TO),
  ...build('makeoc', 'SVOC (make O C)', MAKE_OC),
  ...build('notonly', 'not only A but also B', NOT_ONLY),
  ...build('tooto', 'too 〜 to do', TOO_TO),
  ...build('phone', '電話表現', PHONE),
  ...build('dir', '道案内表現', DIRECTIONS),
  ...build('that', '接続詞 that', THAT_CLAUSE),
  ...build('would', 'Would you like 〜?', WOULD_YOU_LIKE),
  ...build('there', 'There is/are', THERE_IS),
]
