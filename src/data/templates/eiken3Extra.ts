import type { Question } from '../../types'
import { q } from '../questionGen'

/**
 * Additional 英検3級-level questions for the grammar points the original
 * eiken3 bank didn't reach: the remaining wh- question forms, must, 勧誘の
 * Shall we, the purpose/emotion uses of the infinitive, time conjunctions,
 * the SVOO and SVOC patterns, and the postpositive prepositional phrase.
 *
 * Written out sentence by sentence for the same reason as eiken4Extra.ts —
 * see the note there. Each `note` matches a grammar tag's label in
 * data/grammar.ts exactly, which is what tags the question.
 */

interface Sentence {
  jp: string
  en: string
}

const build = (slot: string, note: string, sentences: Sentence[]): Question[] =>
  sentences.map((s, i) => q(`e3x-${slot}-${i}`, s.jp, s.en, note))

const HOW_OFTEN: Sentence[] = [
  { jp: 'あなたはどれくらいよく図書館へ行きますか。', en: 'How often do you go to the library?' },
  { jp: 'このバスはどれくらいの間隔で来ますか。', en: 'How often does this bus come?' },
  { jp: 'あなたはどれくらいよくテニスをしますか。', en: 'How often do you play tennis?' },
  { jp: '彼女はどれくらいよく祖母を訪ねますか。', en: 'How often does she visit her grandmother?' },
  { jp: 'あなたはどれくらいよく外食しますか。', en: 'How often do you eat out?' },
  { jp: '彼らはどれくらいよく放課後に練習しますか。', en: 'How often do they practice after school?' },
  { jp: 'あなたはどれくらいよくメールを確認しますか。', en: 'How often do you check your email?' },
  { jp: 'この町ではどれくらいよく雪が降りますか。', en: 'How often does it snow in this town?' },
  { jp: 'あなたはどれくらいよくいとこに会いますか。', en: 'How often do you see your cousin?' },
  { jp: 'あなたはどれくらいよく部屋をそうじしますか。', en: 'How often do you clean your room?' },
]

const MUST: Sentence[] = [
  { jp: 'あなたは夕食前に宿題を終えなければなりません。', en: 'You must finish your homework before dinner.' },
  { jp: '私たちは病院では静かにしなければなりません。', en: 'We must be quiet in the hospital.' },
  { jp: 'これらの絵に触れてはいけません。', en: 'You must not touch these paintings.' },
  { jp: 'この学校では生徒は制服を着なければなりません。', en: 'Students must wear a uniform at this school.' },
  { jp: 'あなたは毎朝この薬を飲まなければなりません。', en: 'You must take this medicine every morning.' },
  { jp: '私たちは10時前にここを出なければなりません。', en: 'We must leave here before ten.' },
  { jp: 'この川で泳いではいけません。', en: 'You must not swim in this river.' },
  { jp: '彼は試験のためにもっと一生懸命勉強しなければなりません。', en: 'He must study harder for the exam.' },
  { jp: '雨の日は気をつけなければなりません。', en: 'You must be careful on rainy days.' },
  { jp: '私たちはこれらの古い木を守らなければなりません。', en: 'We must protect these old trees.' },
]

const SHALL_WE: Sentence[] = [
  { jp: '明日博物館へ行きませんか。', en: 'Shall we go to the museum tomorrow?' },
  { jp: '一緒に昼食を食べませんか。', en: "Why don't we have lunch together?" },
  { jp: '駅の前で会いませんか。', en: 'Shall we meet in front of the station?' },
  { jp: 'そのことを先生に聞いてみませんか。', en: "Why don't we ask our teacher about it?" },
  { jp: 'もう会議を始めませんか。', en: 'Shall we start the meeting now?' },
  { jp: '少し休憩しませんか。', en: "Why don't we take a short break?" },
  { jp: '公園まで歩きませんか。', en: 'Shall we walk to the park?' },
  { jp: '彼をパーティーに誘いませんか。', en: "Why don't we invite him to the party?" },
  { jp: '窓を開けましょうか。', en: 'Shall we open the window?' },
  { jp: '今日は図書館で勉強しませんか。', en: "Why don't we study at the library today?" },
]

const INFINITIVE_PURPOSE: Sentence[] = [
  { jp: '私は牛乳を買うために店へ行きました。', en: 'I went to the store to buy some milk.' },
  { jp: '彼女は医者になるために一生懸命勉強します。', en: 'She studies hard to become a doctor.' },
  { jp: '彼は始発電車に乗るために早く起きました。', en: 'He got up early to catch the first train.' },
  { jp: '私たちはサッカーをするために公園へ行きました。', en: 'We went to the park to play soccer.' },
  { jp: '私はお礼を言うために彼女に電話しました。', en: 'I called her to say thank you.' },
  { jp: '彼らは祭りを見るためにここへ来ました。', en: 'They came here to see the festival.' },
  { jp: '彼女は新しいギターを買うためにお金をためました。', en: 'She saved money to buy a new guitar.' },
  { jp: '私たちは情報を探すためにインターネットを使います。', en: 'We use the internet to find information.' },
  { jp: '彼は試合に勝つために毎日練習します。', en: 'He practices every day to win the game.' },
  { jp: '私は山の写真を撮るために立ち止まりました。', en: 'I stopped to take a picture of the mountain.' },
]

const SUPERLATIVE_MOST: Sentence[] = [
  { jp: 'これは京都で最も美しい庭園です。', en: 'This is the most beautiful garden in Kyoto.' },
  { jp: '彼は日本で最も人気のある歌手です。', en: 'He is the most popular singer in Japan.' },
  { jp: 'それはすべての中で最も難しい問題でした。', en: 'That was the most difficult question of all.' },
  { jp: 'これは図書館で最も面白い本です。', en: 'This is the most interesting book in the library.' },
  { jp: '彼女は家族で最も慎重な運転手です。', en: 'She is the most careful driver in our family.' },
  { jp: '夏は私にとって最もわくわくする季節です。', en: 'Summer is the most exciting season for me.' },
  { jp: 'これはその店で最も高価な腕時計です。', en: 'This is the most expensive watch in the shop.' },
  { jp: '彼はチームで最も有名な選手です。', en: 'He is the most famous player on the team.' },
  { jp: 'それは私の携帯で最も便利なアプリです。', en: 'That is the most useful app on my phone.' },
  { jp: 'これはその部屋で最も快適ないすです。', en: 'This is the most comfortable chair in the room.' },
]

const WHEN_CLAUSE: Sentence[] = [
  { jp: '彼が私に電話したとき、私は本を読んでいました。', en: 'I was reading a book when he called me.' },
  { jp: '子どものころ、私は大阪に住んでいました。', en: 'When I was a child, I lived in Osaka.' },
  { jp: '家に着いたら私に電話してください。', en: 'Please call me when you get home.' },
  { jp: '私が帰宅したとき、彼女は夕食を作っていました。', en: 'She was cooking dinner when I came home.' },
  { jp: '雨が降るとき、私たちは室内で遊びます。', en: 'When it rains, we play inside.' },
  { jp: '彼が戻ってきたら私が彼に伝えます。', en: 'I will tell him when he comes back.' },
  { jp: '彼は若いころとても恥ずかしがりやでした。', en: 'He was very shy when he was young.' },
  { jp: 'ベルが鳴ったとき、全員が立ち上がりました。', en: 'When the bell rang, everyone stood up.' },
  { jp: '地震が起きたとき、私たちはテレビを見ていました。', en: 'We were watching TV when the earthquake happened.' },
  { jp: 'この歌を聞くといつも幸せな気持ちになります。', en: 'I always feel happy when I listen to this song.' },
]

const UNTIL_BEFORE_AFTER: Sentence[] = [
  { jp: '私が戻るまでここで待っていてください。', en: 'Please wait here until I come back.' },
  { jp: '私たちは日が沈むまで浜辺にいました。', en: 'We stayed at the beach until the sun set.' },
  { jp: '昼食を食べる前に手を洗いなさい。', en: 'Wash your hands before you eat lunch.' },
  { jp: '彼は宿題を終えたあとに寝ました。', en: 'He went to bed after he finished his homework.' },
  { jp: '私は寝るまで英語を勉強します。', en: 'I will study English until I go to bed.' },
  { jp: '寝る前に歯をみがきなさい。', en: 'Brush your teeth before you go to bed.' },
  { jp: '彼女は薬を飲んだあとに気分がよくなりました。', en: 'She felt better after she took the medicine.' },
  { jp: '全員が到着するまで私たちは始められません。', en: "We can't start until everyone arrives." },
  { jp: '質問に答える前によく考えなさい。', en: 'Think carefully before you answer the question.' },
  { jp: '私は映画が終わるまで起きていました。', en: 'I stayed up until the movie ended.' },
]

const SVO_FOR: Sentence[] = [
  { jp: '母は私にケーキを作ってくれました。', en: 'My mother made a cake for me.' },
  { jp: '彼は妹にプレゼントを買いました。', en: 'He bought a present for his sister.' },
  { jp: '彼女は家族のために夕食を作りました。', en: 'She cooked dinner for her family.' },
  { jp: '私があなたにお茶をいれます。', en: 'I will make some tea for you.' },
  { jp: '父は私たちに犬小屋を作ってくれました。', en: 'My father built a doghouse for us.' },
  { jp: '彼女は父にすてきなネクタイを選びました。', en: 'She chose a nice tie for her father.' },
  { jp: '彼は私によい席を見つけてくれました。', en: 'He found a good seat for me.' },
  { jp: '彼らは客のために部屋を用意しました。', en: 'They prepared a room for the guests.' },
  { jp: '私は弟に新しいボールを買いました。', en: 'I bought a new ball for my brother.' },
  { jp: '彼女は娘に美しいドレスを作りました。', en: 'She made a beautiful dress for her daughter.' },
]

const SVOO_ASK_TEACH: Sentence[] = [
  { jp: '彼は毎週月曜日に私たちに英語を教えます。', en: 'He teaches us English every Monday.' },
  { jp: '彼女は私に難しい質問をしました。', en: 'She asked me a difficult question.' },
  { jp: '祖母は私に古い歌を教えてくれました。', en: 'My grandmother taught me an old song.' },
  { jp: '先生は私たちに意見をたずねました。', en: 'The teacher asked us our opinions.' },
  { jp: 'お願いを一つしてもいいですか。', en: 'Can I ask you a favor?' },
  { jp: '彼女はこの学校で子どもたちに音楽を教えています。', en: 'She teaches children music at this school.' },
  { jp: '彼は私に名前をたずねました。', en: 'He asked me my name.' },
  { jp: '私にこの歌を教えてください。', en: 'Please teach me this song.' },
  { jp: 'おじは私に日本の歴史を教えてくれます。', en: 'My uncle teaches me Japanese history.' },
  { jp: '先生は私たちに大切な教訓を教えてくれました。', en: 'Our teacher taught us an important lesson.' },
]

const SVOC_CALL: Sentence[] = [
  { jp: '私たちはこの花をひまわりと呼びます。', en: 'We call this flower a sunflower.' },
  { jp: 'みんなは彼を太郎と呼びます。', en: 'Everyone calls him Taro.' },
  { jp: '彼らは犬をシロと名づけました。', en: 'They named their dog Shiro.' },
  { jp: '私たちはこの橋をレインボーブリッジと呼びます。', en: 'We call this bridge the Rainbow Bridge.' },
  { jp: '彼の友達は彼をマイクと呼びます。', en: 'His friends call him Mike.' },
  { jp: '人々は京都を日本の古い都と呼びます。', en: 'People call Kyoto the old capital of Japan.' },
  { jp: '私たちは猫をモモと名づけました。', en: 'We named our cat Momo.' },
  { jp: '彼らはこの祭りを七夕と呼びます。', en: 'They call this festival Tanabata.' },
  { jp: 'この野菜を英語で何と呼びますか。', en: 'What do you call this vegetable in English?' },
  { jp: '生徒たちは先生をブラウン先生と呼びます。', en: 'The students call their teacher Mr. Brown.' },
]

const PREP_PHRASE_MODIFIER: Sentence[] = [
  { jp: '髪の長い女の子は私の姉です。', en: 'The girl with long hair is my sister.' },
  { jp: '机の上の本は私のものです。', en: 'The book on the desk is mine.' },
  { jp: '青い上着を着た男性は私たちのコーチです。', en: 'The man in the blue jacket is our coach.' },
  { jp: 'テーブルの下の猫は眠っています。', en: 'The cat under the table is sleeping.' },
  { jp: '川の近くの家はとても古いです。', en: 'The house near the river is very old.' },
  { jp: 'この写真の人たちは私のクラスメートです。', en: 'The people in this picture are my classmates.' },
  { jp: '駅のとなりの店は9時に開きます。', en: 'The store next to the station opens at nine.' },
  { jp: 'カメラを持った女性は写真家です。', en: 'The woman with a camera is a photographer.' },
  { jp: '床の上の箱はとても重いです。', en: 'The box on the floor is very heavy.' },
  { jp: '川沿いの道は春に美しいです。', en: 'The road along the river is beautiful in spring.' },
]

const INFINITIVE_EMOTION: Sentence[] = [
  { jp: 'そのよい知らせを聞いてうれしいです。', en: 'I am glad to hear the good news.' },
  { jp: '彼女は旧友に会えて幸せでした。', en: 'She was happy to see her old friend.' },
  { jp: '私たちは彼の話を聞いて驚きました。', en: 'We were surprised to hear his story.' },
  { jp: '彼は故郷を離れるのが悲しかったです。', en: 'He was sad to leave his hometown.' },
  { jp: 'ここであなたに会えてとてもうれしいです。', en: 'I am very glad to meet you here.' },
  { jp: '彼らは新しい博物館を訪れてわくわくしました。', en: 'They were excited to visit the new museum.' },
  { jp: '彼女はその事故のことを聞いて気の毒に思いました。', en: 'She was sorry to hear about the accident.' },
  { jp: '私たちはこんなによいホテルを見つけられて幸運でした。', en: 'We were lucky to find such a nice hotel.' },
  { jp: '私は割れた窓を見てショックを受けました。', en: 'I was shocked to see the broken window.' },
  { jp: '彼は彼女から手紙をもらって喜びました。', en: 'He was pleased to get a letter from her.' },
]

const TOO_ADJECTIVE: Sentence[] = [
  { jp: 'この箱は私には重すぎます。', en: 'This box is too heavy for me.' },
  { jp: 'そのコーヒーは子どもには熱すぎます。', en: 'The coffee is too hot for the children.' },
  { jp: 'この問題は私たちには難しすぎます。', en: 'This question is too difficult for us.' },
  { jp: 'その映画は妹には長すぎました。', en: 'The movie was too long for my little sister.' },
  { jp: 'このくつは私の足には小さすぎます。', en: 'These shoes are too small for my feet.' },
  { jp: 'その音楽はこの部屋にはうるさすぎます。', en: 'The music is too loud for this room.' },
  { jp: 'この川は泳ぐには危険すぎます。', en: 'This river is too dangerous for swimming.' },
  { jp: 'そのかばんは学生には高すぎます。', en: 'The bag is too expensive for a student.' },
  { jp: 'その道は大きなトラックには狭すぎます。', en: 'The road is too narrow for a big truck.' },
  { jp: 'このスープは私には塩からすぎます。', en: 'This soup is too salty for me.' },
]

const EXCLAMATORY: Sentence[] = [
  { jp: 'これはなんて美しい花なのでしょう。', en: 'What a beautiful flower this is!' },
  { jp: '彼女はなんて親切なのでしょう。', en: 'How kind she is!' },
  { jp: 'あれはなんて面白い話だったのでしょう。', en: 'What an interesting story that was!' },
  { jp: '彼はなんて速く走るのでしょう。', en: 'How fast he runs!' },
  { jp: 'なんてすばらしい一日だったのでしょう。', en: 'What a wonderful day we had!' },
  { jp: 'この庭はなんて美しいのでしょう。', en: 'How beautiful this garden is!' },
  { jp: 'あなたはなんて大きな犬を飼っているのでしょう。', en: 'What a big dog you have!' },
  { jp: 'その試合はなんてわくわくしたのでしょう。', en: 'How exciting the game was!' },
  { jp: 'これはなんてうれしい驚きなのでしょう。', en: 'What a nice surprise this is!' },
  { jp: 'この問題はなんて難しいのでしょう。', en: 'How difficult this question is!' },
]

export const eiken3ExtraQuestions: Question[] = [
  ...build('howoften', 'How often 〜?', HOW_OFTEN),
  ...build('must', '助動詞 must', MUST),
  ...build('shallwe', 'Shall we / Why don’t we 〜?', SHALL_WE),
  ...build('purpose', '不定詞(副詞的用法・目的)', INFINITIVE_PURPOSE),
  ...build('superlativemost', '最上級(most)', SUPERLATIVE_MOST),
  ...build('when', '時の when', WHEN_CLAUSE),
  ...build('untilbefore', 'until / before / after', UNTIL_BEFORE_AFTER),
  ...build('svofor', 'SVO + for 人', SVO_FOR),
  ...build('svooask', 'SVOO (ask/teach + 人 + 事)', SVOO_ASK_TEACH),
  ...build('svoccall', 'SVOC (call O C)', SVOC_CALL),
  ...build('prepphrase', '前置詞句の後置修飾', PREP_PHRASE_MODIFIER),
  ...build('emotion', '不定詞(副詞的用法・感情の原因)', INFINITIVE_EMOTION),
  ...build('tooadj', '程度の too + 形容詞', TOO_ADJECTIVE),
  ...build('exclamatory', '感嘆文 What/How', EXCLAMATORY),
]
