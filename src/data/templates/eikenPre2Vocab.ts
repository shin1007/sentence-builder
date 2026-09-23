import type { Question } from '../../types'
import { q } from '../questionGen'

/**
 * 英検準2級 questions written to bring in the level's vocabulary — see
 * eiken4Vocab.ts for why. The audit found the level using only 22% of the
 * CEFR-J A1〜A2 list; the A2 words that set 準2級 apart (`abroad`,
 * `receive`, `tourist`, `medicine`, `although`) hardly appeared at all.
 *
 * Each sentence drills one of the level's grammar points and works in a few
 * of those words; `note` is spelled as its grammar tag's label in
 * data/grammar.ts.
 */

interface Sentence {
  jp: string
  en: string
}

/** Turns a sentence list into questions with ids prefixed `vp2-<slot>-<i>`. */
const build = (slot: string, note: string, sentences: Sentence[]): Question[] =>
  sentences.map((s, i) => q(`vp2-${slot}-${i}`, s.jp, s.en, note))

const PERFECT_CONTINUATION: Sentence[] = [
  { jp: '私は去年の春からこのアパートに住んでいます。', en: 'I have lived in this apartment since last spring.' },
  { jp: '私の祖父母は結婚して50年になります。', en: 'My grandparents have been married for fifty years.' },
  { jp: '彼女は子どものころからペットをほしがっています。', en: 'She has wanted a pet since her childhood.' },
  { jp: '私たちは長い間お互いを知っています。', en: 'We have known each other for a long time.' },
  { jp: '月曜日からずっと雨です。', en: 'It has been rainy since Monday.' },
]

const PERFECT_EXPERIENCE: Sentence[] = [
  { jp: '私は本物の恐竜の骨を見たことがありません。', en: 'I have never seen a real dinosaur bone.' },
  { jp: '彼女はその美術館に2回行ったことがあります。', en: 'She has been to the art gallery twice.' },
  { jp: 'あなたは外国に行ったことがありますか。', en: 'Have you ever been abroad?' },
  { jp: '私は冬に山に登ったことがありません。', en: 'I have never climbed a mountain in winter.' },
  { jp: 'あなたは今までに馬に乗ったことがありますか。', en: 'Have you ever ridden a horse?' },
]

const PERFECT_COMPLETION: Sentence[] = [
  { jp: '電車はすでに駅を出発しました。', en: 'The train has already left the station.' },
  { jp: '私はちょうど台所のそうじを終えたところです。', en: 'I have just finished cleaning the kitchen.' },
  { jp: '私のメールをもう受け取りましたか。', en: 'Have you received my email yet?' },
  { jp: '彼女はまた財布をなくしてしまいました。', en: 'She has lost her wallet again.' },
]

const PASSIVE_PRESENT: Sentence[] = [
  { jp: 'この博物館には毎年何千人もの観光客が訪れます。', en: 'This museum is visited by thousands of tourists every year.' },
  { jp: 'その図書館は国民の祝日には閉まっています。', en: 'The library is closed on national holidays.' },
  { jp: '朝食はホテルのレストランで出されます。', en: 'Breakfast is served in the hotel restaurant.' },
]

const PASSIVE_PAST: Sentence[] = [
  { jp: 'その窓は強い風で割れました。', en: 'The window was broken by a strong wind.' },
  { jp: 'この橋は約100年前に建てられました。', en: 'This bridge was built about a hundred years ago.' },
  { jp: 'コンサートは大きなホールで開かれました。', en: 'The concert was held in a large hall.' },
]

const PASSIVE_QUESTION: Sentence[] = [
  { jp: 'この手紙はあなたのおばあさんによって書かれたのですか。', en: 'Was this letter written by your grandmother?' },
  { jp: 'この歌は世界中で歌われていますか。', en: 'Is this song sung all over the world?' },
]

const MODAL_PASSIVE: Sentence[] = [
  { jp: 'これらの規則はみんなに守られなければなりません。', en: 'These rules must be followed by everyone.' },
  { jp: '会議は来週の金曜日に開かれるでしょう。', en: 'The meeting will be held next Friday.' },
  { jp: 'この食べ物は冷蔵庫で1週間保存できます。', en: 'This food can be kept in the refrigerator for a week.' },
]

const RELATIVE_WHO: Sentence[] = [
  { jp: '門のそばに立っている男性は私たちの校長先生です。', en: 'The man who is standing by the gate is our principal.' },
  { jp: '私は4か国語を話せる女の子を知っています。', en: 'I know a girl who can speak four languages.' },
  { jp: 'パイロットは飛行機を操縦する人です。', en: 'A pilot is a person who flies airplanes.' },
]

const RELATIVE_WHICH: Sentence[] = [
  { jp: 'これはおじが私にくれたカメラです。', en: 'This is the camera which my uncle gave me.' },
  { jp: '空港へ行くバスは1時間ごとに出ます。', en: 'The bus which goes to the airport leaves every hour.' },
]

const RELATIVE_THAT: Sentence[] = [
  { jp: '何か私にできることはありますか。', en: 'Is there anything that I can do for you?' },
  { jp: '彼はその質問に正しく答えたただ一人の生徒です。', en: 'He is the only student that answered the question correctly.' },
]

const PARTICIPLE_BEFORE: Sentence[] = [
  { jp: '私は割れた窓の写真を撮りました。', en: 'I took a photo of the broken window.' },
  { jp: '私たちはわかしたお湯が必要です。', en: 'We need some boiled water.' },
]

const PARTICIPLE_AFTER_PRESENT: Sentence[] = [
  { jp: '黒いジャケットを着ている男性は有名な作家です。', en: 'The man wearing a black jacket is a famous author.' },
  { jp: '浜辺で遊んでいる子どもたちは楽しそうです。', en: 'The children playing on the beach look happy.' },
  { jp: '校長先生と話している男の子はだれですか。', en: 'Who is the boy talking with the principal?' },
]

const PARTICIPLE_AFTER_PAST: Sentence[] = [
  { jp: 'これは若い芸術家によって描かれた絵です。', en: 'This is a picture painted by a young artist.' },
  { jp: '私はやさしい英語で書かれた本を読みました。', en: 'I read a book written in simple English.' },
]

const INDIRECT_QUESTION: Sentence[] = [
  { jp: '次の電車がいつ来るかわかりません。', en: "I don't know when the next train will come." },
  { jp: '博物館が何時に開くか教えてくれますか。', en: 'Can you tell me what time the museum opens?' },
  { jp: '彼女はなぜあんなに怒っているのだろう。', en: 'I wonder why she looks so upset.' },
]

const AS_AS: Sentence[] = [
  { jp: '兄は父と同じくらい背が高いです。', en: 'My brother is as tall as our father.' },
  { jp: 'このテストは前回と同じくらい難しかったです。', en: 'This test was as difficult as the last one.' },
]

const NOT_AS_AS: Sentence[] = [
  { jp: '私たちの学校の図書館は市の図書館ほど大きくありません。', en: 'Our school library is not as large as the city library.' },
  { jp: '電車の旅は飛行機ほど高くありません。', en: 'Traveling by train is not as expensive as flying.' },
]

const MUCH_COMPARATIVE: Sentence[] = [
  { jp: 'このソファは古いのよりずっと快適です。', en: 'This sofa is much more comfortable than the old one.' },
  { jp: '今日は昨日よりずっと暖かいです。', en: 'It is much warmer today than yesterday.' },
]

const TOO_TO: Sentence[] = [
  { jp: '私は疲れすぎて宿題を終えられませんでした。', en: 'I was too tired to finish my homework.' },
  { jp: 'この質問は私には難しすぎて答えられません。', en: 'This question is too difficult for me to answer.' },
]

const ENOUGH: Sentence[] = [
  { jp: '彼女は重いスーツケースを運べるくらい力が強いです。', en: 'She is strong enough to carry the heavy suitcase.' },
  { jp: 'この箱は私の服を全部入れられるくらい大きいです。', en: 'This box is big enough to hold all my clothes.' },
]

const SO_THAT: Sentence[] = [
  { jp: '部屋はとても暗かったので何も見えませんでした。', en: "The room was so dark that I couldn't see anything." },
  { jp: '彼女はとても静かに話したのでだれにも聞こえませんでした。', en: 'She spoke so quietly that nobody heard her.' },
]

const IT_IS_TO: Sentence[] = [
  { jp: '健康的な朝食をとることは大切です。', en: 'It is important to eat a healthy breakfast.' },
  { jp: '子どもが川の近くで遊ぶのは危険です。', en: 'It is dangerous for children to play near the river.' },
  { jp: '私にとってそのホテルを見つけるのは簡単でした。', en: 'It was easy for me to find the hotel.' },
  { jp: '席を変えることはできますか。', en: 'Is it possible to change my seat?' },
]

const TELL_TO: Sentence[] = [
  { jp: '医者は私にこの薬を飲むように言いました。', en: 'The doctor told me to take this medicine.' },
  { jp: '母は私に卵を買ってくるように頼みました。', en: 'My mother asked me to buy some eggs.' },
  { jp: '先生は私たちにホールで静かにするよう言いました。', en: 'The teacher told us to be quiet in the hall.' },
]

const HELP_DO: Sentence[] = [
  { jp: 'このスーツケースを運ぶのを手伝ってくれますか。', en: 'Could you help me carry this suitcase?' },
  { jp: '兄は私が自転車を直すのを手伝ってくれました。', en: 'My brother helped me fix my bicycle.' },
]

const SHOULD: Sentence[] = [
  { jp: '外は寒いのでコートを着るべきです。', en: 'You should wear a coat because it is cold outside.' },
  { jp: '熱があるなら医者に診てもらうべきです。', en: 'You should see a doctor if you have a fever.' },
  { jp: '生徒は授業中に電話を使うべきではありません。', en: 'Students should not use their phones in class.' },
  { jp: 'ハイキングに行く前に天気を確認すべきです。', en: 'You should check the weather before you go hiking.' },
]

const FEW_LITTLE: Sentence[] = [
  { jp: '宿題についていくつか質問があります。', en: 'I have a few questions about the homework.' },
  { jp: '冷蔵庫に牛乳が少しあります。', en: 'There is a little milk in the refrigerator.' },
  { jp: 'スープに塩を少し加えてください。', en: 'Please add a little salt to the soup.' },
]

const TOO_MUCH: Sentence[] = [
  { jp: 'チョコレートを食べすぎないで。', en: "Don't eat too much chocolate." },
  { jp: 'この電車は人が多すぎます。', en: 'There are too many people on this train.' },
]

const ALTHOUGH: Sentence[] = [
  { jp: '雨が降っていたけれど、私たちは動物園に行きました。', en: 'Although it was raining, we went to the zoo.' },
  { jp: '彼は若いけれど、よいリーダーです。', en: 'Though he is young, he is a good leader.' },
]

const WHILE: Sentence[] = [
  { jp: '私が寝ている間にだれかが電話をしてきました。', en: 'While I was sleeping, someone called me.' },
  { jp: '赤ちゃんが寝ている間は静かにしてください。', en: 'Please be quiet while the baby is sleeping.' },
]

const BOTH_EITHER: Sentence[] = [
  { jp: '父も母も医者です。', en: 'Both my father and my mother are doctors.' },
  { jp: '紅茶かコーヒーのどちらかを選べます。', en: 'You can have either tea or coffee.' },
]

const PREP_GERUND: Sentence[] = [
  { jp: '結婚式に招待してくれてありがとう。', en: 'Thank you for inviting me to your wedding.' },
  { jp: '今週末キャンプに行くのはどうですか。', en: 'How about going camping this weekend?' },
]

const WH_TO: Sentence[] = [
  { jp: '彼女の誕生日に何を買えばいいかわかりません。', en: "I don't know what to buy for her birthday." },
  { jp: 'この機械の使い方を教えてください。', en: 'Please tell me how to use this machine.' },
  { jp: '私たちは休暇にどこへ行くか話し合いました。', en: 'We talked about where to go on our vacation.' },
]

const INFINITIVE_NOUN: Sentence[] = [
  { jp: '私の目標はプロのサッカー選手になることです。', en: 'My goal is to become a professional soccer player.' },
  { jp: '彼女は自分のカフェを開く計画をしています。', en: 'She plans to open her own cafe.' },
]

export const eikenPre2VocabQuestions: Question[] = [
  ...build('cont', '現在完了(継続)', PERFECT_CONTINUATION),
  ...build('exp', '現在完了(経験)', PERFECT_EXPERIENCE),
  ...build('comp', '現在完了(完了)', PERFECT_COMPLETION),
  ...build('passive', '受動態(現在)', PASSIVE_PRESENT),
  ...build('passivepast', '受動態(過去)', PASSIVE_PAST),
  ...build('passiveq', '受動態の疑問文', PASSIVE_QUESTION),
  ...build('modalpassive', '助動詞 + 受動態', MODAL_PASSIVE),
  ...build('who', '関係代名詞 who', RELATIVE_WHO),
  ...build('which', '関係代名詞 which', RELATIVE_WHICH),
  ...build('that', '関係代名詞 that', RELATIVE_THAT),
  ...build('pre', '分詞の前置修飾', PARTICIPLE_BEFORE),
  ...build('ing', '現在分詞の後置修飾', PARTICIPLE_AFTER_PRESENT),
  ...build('ed', '過去分詞の後置修飾', PARTICIPLE_AFTER_PAST),
  ...build('indirect', '間接疑問文', INDIRECT_QUESTION),
  ...build('asas', '原級比較 as 〜 as', AS_AS),
  ...build('notas', 'not as 〜 as', NOT_AS_AS),
  ...build('much', '比較級の強調 much/far', MUCH_COMPARATIVE),
  ...build('tooto', 'too 〜 to do', TOO_TO),
  ...build('enough', '〜 enough to do', ENOUGH),
  ...build('sothat', 'so 〜 that ...', SO_THAT),
  ...build('itis', 'It is 〜 (for A) to do', IT_IS_TO),
  ...build('tell', 'tell/ask + O + to do', TELL_TO),
  ...build('help', 'help + O + (to) do', HELP_DO),
  ...build('should', 'should 〜', SHOULD),
  ...build('few', 'a few / a little', FEW_LITTLE),
  ...build('toomuch', 'too much / too many', TOO_MUCH),
  ...build('although', '譲歩の although/though', ALTHOUGH),
  ...build('while', '時の while', WHILE),
  ...build('both', 'both A and B / either A or B', BOTH_EITHER),
  ...build('prepger', '前置詞 + 動名詞', PREP_GERUND),
  ...build('whto', '疑問詞 + to不定詞', WH_TO),
  ...build('toinf', '不定詞(名詞的用法)', INFINITIVE_NOUN),
]
