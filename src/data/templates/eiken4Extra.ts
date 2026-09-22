import type { Question } from '../../types'
import { q } from '../questionGen'

/**
 * Additional 英検4級-level questions covering the beginner grammar points the
 * original eiken4 bank left empty — imperatives, negation, the wh- words
 * beyond What/Where/Whose, articles, plurals, possessives, the past tense of
 * be, will, and the everyday situational phrases.
 *
 * These are written out sentence by sentence rather than generated from the
 * vocab banks. At this level the interesting variation is in the *structure*
 * (where the auxiliary goes, where the article sits), not in the noun being
 * swapped, and a hand-written set keeps each sentence natural and — crucially
 * for a word-ordering game that compares against one exact answer — free of
 * an equally good alternative arrangement.
 *
 * Each `note` is spelled exactly as its grammar tag's label in data/grammar.ts
 * so the tag is picked up without a mapping-table entry.
 */

interface Sentence {
  jp: string
  en: string
}

/** Turns a sentence list into questions with ids prefixed `e4x-<slot>-<i>`. */
const build = (slot: string, note: string, sentences: Sentence[]): Question[] =>
  sentences.map((s, i) => q(`e4x-${slot}-${i}`, s.jp, s.en, note))

const IMPERATIVE: Sentence[] = [
  { jp: '昼食の前に手を洗いなさい。', en: 'Wash your hands before lunch.' },
  { jp: '図書館では静かにしてください。', en: 'Please be quiet in the library.' },
  { jp: 'ろうかを走ってはいけません。', en: "Don't run in the hallway." },
  { jp: '明日私の家に来てください。', en: 'Please come to my house tomorrow.' },
  { jp: 'あの美しい山を見て。', en: 'Look at that beautiful mountain.' },
  { jp: 'ここにあなたの名前を書いてください。', en: 'Please write your name here.' },
  { jp: '今日は傘を忘れないで。', en: "Don't forget your umbrella today." },
  { jp: '次の角を右に曲がりなさい。', en: 'Turn right at the next corner.' },
  { jp: '毎日朝食を食べなさい。', en: 'Eat breakfast every morning.' },
  { jp: '教室でうるさくしないで。', en: "Don't be noisy in the classroom." },
]

const LETS: Sentence[] = [
  { jp: '放課後にサッカーをしよう。', en: "Let's play soccer after school." },
  { jp: '明日公園に行こう。', en: "Let's go to the park tomorrow." },
  { jp: 'あのカフェで昼食を食べよう。', en: "Let's have lunch at that cafe." },
  { jp: '今日は一緒に英語を勉強しよう。', en: "Let's study English together today." },
  { jp: '今晩映画を見よう。', en: "Let's watch a movie this evening." },
  { jp: 'ここで写真を撮ろう。', en: "Let's take a picture here." },
  { jp: '3時に駅で会おう。', en: "Let's meet at the station at three." },
  { jp: '一緒に歌を歌おう。', en: "Let's sing a song together." },
  { jp: '彼女のためにケーキを作ろう。', en: "Let's make a cake for her." },
  { jp: '今週末泳ぎに行こう。', en: "Let's go swimming this weekend." },
]

const NEGATION: Sentence[] = [
  { jp: '私はにんじんがあまり好きではありません。', en: "I don't like carrots very much." },
  { jp: '彼女はピアノを弾きません。', en: "She doesn't play the piano." },
  { jp: '彼は自転車を持っていません。', en: "He doesn't have a bike." },
  { jp: '私たちは日曜日に学校へ行きません。', en: "We don't go to school on Sunday." },
  { jp: '彼らはこの町に住んでいません。', en: "They don't live in this town." },
  { jp: '私は数学が得意ではありません。', en: 'I am not good at math.' },
  { jp: '私の兄は朝食を食べません。', en: "My brother doesn't eat breakfast." },
  { jp: 'このかばんは私のものではありません。', en: 'This bag is not mine.' },
  { jp: 'トムは寒い天気が好きではありません。', en: "Tom doesn't like cold weather." },
  { jp: '私たちは今日の午後ひまではありません。', en: 'We are not free this afternoon.' },
]

const WHO: Sentence[] = [
  { jp: 'あなたの一番好きな歌手はだれですか。', en: 'Who is your favorite singer?' },
  { jp: 'あの背の高い男性はだれですか。', en: 'Who is that tall man?' },
  { jp: 'あなたの英語の先生はだれですか。', en: 'Who is your English teacher?' },
  { jp: 'だれがこのおいしいケーキを作りましたか。', en: 'Who made this delicious cake?' },
  { jp: 'だれがこの窓を割りましたか。', en: 'Who broke this window?' },
  { jp: '今だれがピアノを弾いていますか。', en: 'Who is playing the piano now?' },
  { jp: '昨日だれに会いましたか。', en: 'Who did you meet yesterday?' },
  { jp: 'だれが私と一緒に行きたいですか。', en: 'Who wants to go with me?' },
  { jp: 'ドアのそばにいる女の子はだれですか。', en: 'Who is the girl by the door?' },
  { jp: 'あなたの家ではだれが夕食を作りますか。', en: 'Who cooks dinner in your family?' },
]

const WHEN: Sentence[] = [
  { jp: 'あなたはいつテニスを練習しますか。', en: 'When do you practice tennis?' },
  { jp: 'その映画はいつ始まりますか。', en: 'When does the movie start?' },
  { jp: 'あなたはいつ日本に来ましたか。', en: 'When did you come to Japan?' },
  { jp: 'あなたの誕生日はいつですか。', en: 'When is your birthday?' },
  { jp: 'あなたはいつも何時に起きますか。', en: 'When do you usually get up?' },
  { jp: '彼女はいつあなたに電話しましたか。', en: 'When did she call you?' },
  { jp: 'この店はいつ開きますか。', en: 'When does this store open?' },
  { jp: 'あなたはいつ出発する予定ですか。', en: 'When are you going to leave?' },
  { jp: 'あなたはいつ宿題を終えましたか。', en: 'When did you finish your homework?' },
  { jp: '私たちはいつ音楽の授業がありますか。', en: 'When do we have a music class?' },
]

const HOW: Sentence[] = [
  { jp: 'あなたはどうやって学校へ行きますか。', en: 'How do you go to school?' },
  { jp: '夏休みはどうでしたか。', en: 'How was your summer vacation?' },
  { jp: 'このスープはどうやって作りますか。', en: 'How do you make this soup?' },
  { jp: 'あなたはどうやって日本語を学びましたか。', en: 'How did you learn Japanese?' },
  { jp: '東京の天気はどうですか。', en: 'How is the weather in Tokyo?' },
  { jp: 'あなたの名前はどうつづりますか。', en: 'How do you spell your name?' },
  { jp: 'あなたはどうやってここに来ましたか。', en: 'How did you get here?' },
  { jp: '今日お母さんの具合はどうですか。', en: 'How is your mother today?' },
  { jp: 'これは英語でどう言いますか。', en: 'How do you say this in English?' },
  { jp: '昨夜のコンサートはどうでしたか。', en: 'How was the concert last night?' },
]

const WHY: Sentence[] = [
  { jp: 'あなたはなぜこの歌が好きなのですか。', en: 'Why do you like this song?' },
  { jp: 'あなたは今日なぜそんなにうれしいのですか。', en: 'Why are you so happy today?' },
  { jp: 'あなたはなぜ早く帰宅したのですか。', en: 'Why did you come home early?' },
  { jp: '彼はなぜそんなに速く走っているのですか。', en: 'Why is he running so fast?' },
  { jp: 'あなたはなぜ毎日英語を勉強するのですか。', en: 'Why do you study English every day?' },
  { jp: '彼女はなぜあんなに早く帰ったのですか。', en: 'Why did she leave so soon?' },
  { jp: 'あなたはなぜ授業に遅れたのですか。', en: 'Why are you late for class?' },
  { jp: 'なぜ私たちにはこの規則が必要なのですか。', en: 'Why do we need this rule?' },
  { jp: 'あなたはなぜこの本を選んだのですか。', en: 'Why did you choose this book?' },
  { jp: 'この博物館はなぜそんなに有名なのですか。', en: 'Why is this museum so famous?' },
]

const WHICH: Sentence[] = [
  { jp: 'どちらのかばんがあなたのものですか。', en: 'Which bag is yours?' },
  { jp: 'あなたはどの季節が一番好きですか。', en: 'Which season do you like best?' },
  { jp: 'どのバスが駅へ行きますか。', en: 'Which bus goes to the station?' },
  { jp: 'あなたはどの帽子がほしいですか。', en: 'Which cap do you want?' },
  { jp: 'あなたの一番好きな教科はどれですか。', en: 'Which is your favorite subject?' },
  { jp: '私たちはどちらの道を行くべきですか。', en: 'Which way should we go?' },
  { jp: 'あなたはどちらの色がより好きですか。', en: 'Which color do you like better?' },
  { jp: 'どの電車が大阪へ行きますか。', en: 'Which train goes to Osaka?' },
  { jp: 'あなたは最初にどの本を読みましたか。', en: 'Which book did you read first?' },
  { jp: 'あなたの国ではどのスポーツが人気ですか。', en: 'Which sport is popular in your country?' },
]

const ARTICLE: Sentence[] = [
  { jp: '彼女は動物についての面白い本を持っています。', en: 'She has an interesting book about animals.' },
  { jp: '私は旅行のために新しいカメラがほしいです。', en: 'I want a new camera for my trip.' },
  { jp: '彼は正直で親切な少年です。', en: 'He is an honest and kind boy.' },
  { jp: '私たちは京都で古い城を見ました。', en: 'We saw an old castle in Kyoto.' },
  { jp: '私は昨日赤い傘を買いました。', en: 'I bought a red umbrella yesterday.' },
  { jp: '彼女は私の学校の英語の先生です。', en: 'She is an English teacher at my school.' },
  { jp: 'これはあなたにとって簡単な問題です。', en: 'This is an easy question for you.' },
  { jp: '私はこれらの本のために大きなかばんが必要です。', en: 'I need a big bag for these books.' },
  { jp: '彼は箱の中で古い手紙を見つけました。', en: 'He found an old letter in the box.' },
  { jp: 'あれは駅の近くの有名なレストランです。', en: 'That is a famous restaurant near the station.' },
]

const PLURAL: Sentence[] = [
  { jp: '私はテーブルの下に2匹の猫が見えます。', en: 'I see two cats under the table.' },
  { jp: '彼女には3人の兄と1人の姉がいます。', en: 'She has three brothers and one sister.' },
  { jp: '私の父は毎週日曜日に2台の車を洗います。', en: 'My father washes two cars every Sunday.' },
  { jp: '私たちは市場でりんごを5個買いました。', en: 'We bought five apples at the market.' },
  { jp: 'これらの箱はとても重いです。', en: 'These boxes are very heavy.' },
  { jp: 'あの男性たちは私の父の友人です。', en: "Those men are my father's friends." },
  { jp: '私はマンガをたくさん持っています。', en: 'I have a lot of comic books.' },
  { jp: '秋には葉が赤くなります。', en: 'The leaves turn red in autumn.' },
  { jp: '多くの女性がこの病院で働いています。', en: 'Many women work at this hospital.' },
  { jp: '子どもたちはこの公園でよく遊びます。', en: 'Children often play in this park.' },
]

const PRONOUN: Sentence[] = [
  { jp: '彼女のお兄さんは私のクラスメートです。', en: 'Her brother is my classmate.' },
  { jp: 'このノートは私のものではありません。', en: 'This notebook is not mine.' },
  { jp: 'この傘はあなたのものですか。', en: 'Is this umbrella yours?' },
  { jp: '彼らの家は私たちの学校の近くです。', en: 'Their house is near our school.' },
  { jp: '私の姉のかばんが机の上にあります。', en: "My sister's bag is on the desk." },
  { jp: 'あの赤い自転車は彼のものです。', en: 'That red bike is his.' },
  { jp: '私たちは昨日彼らの新しい家を訪ねました。', en: 'We visited their new house yesterday.' },
  { jp: '私は彼をとてもよく知っています。', en: 'I know him very well.' },
  { jp: '彼女は私の友人の一人です。', en: 'She is a friend of mine.' },
  { jp: 'これらの席は私たちのものです。', en: 'These seats are ours.' },
]

const PREPOSITION_TIME: Sentence[] = [
  { jp: '私たちは午前中に音楽の授業があります。', en: 'We have a music class in the morning.' },
  { jp: '私の誕生日は9月です。', en: 'My birthday is in September.' },
  { jp: '学校は8時半に始まります。', en: 'School starts at eight thirty.' },
  { jp: '私は5月5日に生まれました。', en: 'I was born on May fifth.' },
  { jp: '私たちは土曜日の午後にテニスをします。', en: 'We play tennis on Saturday afternoon.' },
  { jp: '彼は毎日2時間英語を勉強します。', en: 'He studies English for two hours every day.' },
  { jp: 'その店は午前10時に開きます。', en: 'The store opens at ten in the morning.' },
  { jp: '私たちは夏にキャンプに行きます。', en: 'We go camping in summer.' },
  { jp: '私はたいてい夕食後にテレビを見ます。', en: 'I usually watch TV after dinner.' },
  { jp: 'コンサートは夜7時に始まります。', en: 'The concert starts at seven in the evening.' },
]

const PAST_BE: Sentence[] = [
  { jp: '私は昨夜とても疲れていました。', en: 'I was very tired last night.' },
  { jp: '彼女は昨日の午後忙しかったです。', en: 'She was busy yesterday afternoon.' },
  { jp: '彼らは今朝図書館にいました。', en: 'They were at the library this morning.' },
  { jp: '去年の冬はとても寒かったです。', en: 'It was very cold last winter.' },
  { jp: '私たちは去年同じクラスでした。', en: 'We were in the same class last year.' },
  { jp: 'その映画は本当に面白かったです。', en: 'The movie was really interesting.' },
  { jp: '両親はその知らせをとても喜びました。', en: 'My parents were very happy about the news.' },
  { jp: '彼は先週具合が悪かったです。', en: 'He was sick last week.' },
  { jp: 'あなたは昨夜家にいましたか。', en: 'Were you at home last night?' },
  { jp: 'その公園は子どもでいっぱいでした。', en: 'The park was full of children.' },
]

const FUTURE_WILL: Sentence[] = [
  { jp: '私は明日の夕方あなたに電話します。', en: 'I will call you tomorrow evening.' },
  { jp: '彼女は将来医者になるでしょう。', en: 'She will be a doctor in the future.' },
  { jp: '私たちは来週の日曜日に祖母を訪ねます。', en: 'We will visit our grandmother next Sunday.' },
  { jp: '明日の朝は雨が降るでしょう。', en: 'It will rain tomorrow morning.' },
  { jp: '彼は来月戻ってきます。', en: 'He will come back next month.' },
  { jp: '彼らはここに新しい図書館を建てるでしょう。', en: 'They will build a new library here.' },
  { jp: '私があなたの宿題を手伝います。', en: 'I will help you with your homework.' },
  { jp: '試合は2時に始まります。', en: 'The game will start at two.' },
  { jp: '彼女はパーティーに来ないでしょう。', en: 'She will not come to the party.' },
  { jp: 'あなたは今週末ひまですか。', en: 'Will you be free this weekend?' },
]

const CAN_REQUEST: Sentence[] = [
  { jp: '宿題を手伝ってくれますか。', en: 'Can you help me with my homework?' },
  { jp: '窓を開けていただけますか。', en: 'Could you please open the window?' },
  { jp: 'この重い箱を運んでくれますか。', en: 'Can you carry this heavy box?' },
  { jp: '電話番号を教えていただけますか。', en: 'Could you tell me your phone number?' },
  { jp: '明日私の家に来てくれますか。', en: 'Can you come to my house tomorrow?' },
  { jp: 'もっとゆっくり話していただけますか。', en: 'Could you please speak more slowly?' },
  { jp: '駅への道を教えてくれますか。', en: 'Can you show me the way to the station?' },
  { jp: 'ここで数分待っていただけますか。', en: 'Could you wait here for a few minutes?' },
  { jp: '塩を取ってくれますか。', en: 'Can you pass me the salt?' },
  { jp: '私たちの写真を撮っていただけますか。', en: 'Could you take a picture of us?' },
]

const MAY: Sentence[] = [
  { jp: 'あなたのペンを使ってもいいですか。', en: 'May I use your pen?' },
  { jp: '質問してもいいですか。', en: 'May I ask you a question?' },
  { jp: '入ってもいいですか。', en: 'May I come in?' },
  { jp: 'この席に座ってもいいですか。', en: 'May I take this seat?' },
  { jp: 'チケットを見せていただけますか。', en: 'May I see your ticket?' },
  { jp: 'あなたはこのコンピューターを使ってもよいです。', en: 'You may use this computer.' },
  { jp: 'あなたの傘を借りてもいいですか。', en: 'May I borrow your umbrella?' },
  { jp: 'ブラウンさんとお話ししてもいいですか。', en: 'May I speak to Ms. Brown?' },
  { jp: 'あなたはもう帰ってもよいです。', en: 'You may go home now.' },
  { jp: '窓を開けてもいいですか。', en: 'May I open the window?' },
]

const SOME_ANY: Sentence[] = [
  { jp: '何か質問はありますか。', en: 'Do you have any questions?' },
  { jp: 'あなたによい知らせがあります。', en: 'I have some good news for you.' },
  { jp: '彼女は母親のために花を買いました。', en: 'She bought some flowers for her mother.' },
  { jp: '今日は牛乳が少しもありません。', en: "We don't have any milk today." },
  { jp: 'この箱を運ぶのに手伝いが必要です。', en: 'I need some help with this box.' },
  { jp: '今朝何人かの生徒が遅刻しました。', en: 'Some students were late this morning.' },
  { jp: 'あなたは昨日本を買いましたか。', en: 'Did you buy any books yesterday?' },
  { jp: '彼には兄弟が一人もいません。', en: "He doesn't have any brothers." },
  { jp: 'あなたにいくつか質問したいです。', en: 'I want to ask you some questions.' },
  { jp: '私に水をください。', en: 'Please give me some water.' },
]

const MANY_MUCH: Sentence[] = [
  { jp: '彼女はクラスに友達がたくさんいます。', en: 'She has many friends in her class.' },
  { jp: '私は今日あまり時間がありません。', en: "I don't have much time today." },
  { jp: '毎年多くの人がこのお寺を訪れます。', en: 'A lot of people visit this temple every year.' },
  { jp: '彼は毎日たくさんの水を飲みます。', en: 'He drinks a lot of water every day.' },
  { jp: '私たちは昨日あまり鳥を見ませんでした。', en: "We didn't see many birds yesterday." },
  { jp: '私の兄はマンガをたくさん持っています。', en: 'My brother has many comic books.' },
  { jp: '彼女はあまりご飯を食べません。', en: "She doesn't eat much rice." },
  { jp: '多くの生徒がこのクラブに入っています。', en: 'A lot of students join this club.' },
  { jp: '私は京都でたくさん写真を撮りました。', en: 'I took many pictures in Kyoto.' },
  { jp: '私たちはパーティーでとても楽しみました。', en: 'We had a lot of fun at the party.' },
]

const ADVERB_FREQUENCY: Sentence[] = [
  { jp: '私はいつも6時に起きます。', en: 'I always get up at six.' },
  { jp: '彼はよく学校に遅刻します。', en: 'He is often late for school.' },
  { jp: '彼女はたいてい歩いて学校へ行きます。', en: 'She usually walks to school.' },
  { jp: '私たちは時々放課後にテニスをします。', en: 'We sometimes play tennis after school.' },
  { jp: '私の父は朝に決してテレビを見ません。', en: 'My father never watches TV in the morning.' },
  { jp: '彼らはいつも私たちに親切です。', en: 'They are always kind to us.' },
  { jp: '私はよく日曜日に図書館へ行きます。', en: 'I often go to the library on Sunday.' },
  { jp: '彼女は週末に時々忙しいです。', en: 'She is sometimes busy on weekends.' },
  { jp: '彼はたいてい朝食にパンを食べます。', en: 'He usually eats bread for breakfast.' },
  { jp: '私たちは決して彼の誕生日を忘れません。', en: 'We never forget his birthday.' },
]

const HOW_MUCH: Sentence[] = [
  { jp: 'この赤い帽子はいくらですか。', en: 'How much is this red cap?' },
  { jp: 'あなたはいくらお金を持っていますか。', en: 'How much money do you have?' },
  { jp: 'このかばんはいくらしますか。', en: 'How much does this bag cost?' },
  { jp: '子ども用のチケットはいくらですか。', en: 'How much is the ticket for children?' },
  { jp: 'あなたは毎日どれくらい水を飲みますか。', en: 'How much water do you drink every day?' },
  { jp: '私たちにはどれくらい時間がありますか。', en: 'How much time do we have?' },
  { jp: 'この2冊の本はいくらですか。', en: 'How much are these two books?' },
  { jp: 'あなたはどれくらい砂糖が必要ですか。', en: 'How much sugar do you need?' },
  { jp: 'あなたはそれにいくら払いましたか。', en: 'How much did you pay for it?' },
  { jp: 'その部屋はひと晩いくらですか。', en: 'How much is the room for one night?' },
]

const HOW_LONG: Sentence[] = [
  { jp: 'あなたはどれくらいピアノを練習しますか。', en: 'How long do you practice the piano?' },
  { jp: '駅までどれくらいかかりますか。', en: 'How long does it take to the station?' },
  { jp: 'この川はどれくらいの長さですか。', en: 'How long is this river?' },
  { jp: 'あなたは京都にどれくらい滞在しましたか。', en: 'How long did you stay in Kyoto?' },
  { jp: 'この映画はどれくらい続きますか。', en: 'How long does this movie last?' },
  { jp: 'あなたの夏休みはどれくらいですか。', en: 'How long is your summer vacation?' },
  { jp: 'あなたはどれくらい私を待ちましたか。', en: 'How long did you wait for me?' },
  { jp: 'バスでどれくらいかかりますか。', en: 'How long does it take by bus?' },
  { jp: 'あなたはどれくらい泳げますか。', en: 'How long can you swim?' },
  { jp: 'その橋はどれくらいの長さですか。', en: 'How long is the bridge?' },
]

const SVC: Sentence[] = [
  { jp: 'あなたは今日とてもうれしそうに見えます。', en: 'You look very happy today.' },
  { jp: '彼は有名な歌手になりました。', en: 'He became a famous singer.' },
  { jp: 'このスープは本当においしい味がします。', en: 'The soup tastes really good.' },
  { jp: '彼女は今朝疲れているように見えます。', en: 'She looks tired this morning.' },
  { jp: 'この花は甘い香りがします。', en: 'This flower smells sweet.' },
  { jp: 'その部屋はとても暖かくなりました。', en: 'The room became very warm.' },
  { jp: 'あなたの考えは面白そうに聞こえます。', en: 'Your idea sounds interesting.' },
  { jp: '空が急に暗くなりました。', en: 'The sky turned dark suddenly.' },
  { jp: '私の姉は去年看護師になりました。', en: 'My sister became a nurse last year.' },
  { jp: 'その音楽は美しく聞こえます。', en: 'That music sounds beautiful.' },
]

const GREETING: Sentence[] = [
  { jp: 'お会いできてうれしいです。', en: 'It is nice to meet you.' },
  { jp: '私の名前は田中健です。', en: 'My name is Ken Tanaka.' },
  { jp: '私は日本の大阪出身です。', en: 'I am from Osaka in Japan.' },
  { jp: 'こちらこそお会いできてうれしいです。', en: 'Nice to meet you too.' },
  { jp: '私は中学生です。', en: 'I am a junior high school student.' },
  { jp: '私を健と呼んでください。', en: 'Please call me Ken.' },
  { jp: 'こちらは私の友達のユキです。', en: 'This is my friend Yuki.' },
  { jp: 'また会えてうれしいです。', en: 'I am glad to see you again.' },
  { jp: 'また来週会いましょう。', en: 'See you again next week.' },
  { jp: '今日は来てくれてありがとう。', en: 'Thank you for coming today.' },
]

const SHOPPING: Sentence[] = [
  { jp: '私は誕生日プレゼントを探しています。', en: 'I am looking for a birthday present.' },
  { jp: 'この上着を試着してもいいですか。', en: 'Can I try this jacket on?' },
  { jp: 'これのもっと大きいサイズはありますか。', en: 'Do you have this in a larger size?' },
  { jp: '私はこれをいただきます。', en: 'I will take this one.' },
  { jp: 'この青いのはいかがですか。', en: 'How about this blue one?' },
  { jp: 'クレジットカードで払えますか。', en: 'Can I pay by credit card?' },
  { jp: '別の色はありますか。', en: 'Do you have another color?' },
  { jp: '私は見ているだけです。', en: 'I am just looking.' },
  { jp: '靴売り場はどこですか。', en: 'Where is the shoe section?' },
  { jp: 'これは今日セール中ですか。', en: 'Is this on sale today?' },
]

const RESTAURANT: Sentence[] = [
  { jp: 'コーヒーを1杯いただきたいです。', en: 'I would like a cup of coffee.' },
  { jp: 'ご注文はお決まりですか。', en: 'Are you ready to order?' },
  { jp: 'メニューを見せていただけますか。', en: 'Could I see the menu?' },
  { jp: '私は同じものをいただきます。', en: 'I will have the same thing.' },
  { jp: 'お会計をお願いできますか。', en: 'Can we have the check?' },
  { jp: '2人用のテーブルをお願いします。', en: 'We would like a table for two.' },
  { jp: '何かお飲み物はいかがですか。', en: 'Would you like something to drink?' },
  { jp: 'ここの料理はとてもおいしいです。', en: 'The food here is delicious.' },
  { jp: 'ベジタリアン向けの料理はありますか。', en: 'Do you have a vegetarian dish?' },
  { jp: '私は卵アレルギーがあります。', en: 'I am allergic to eggs.' },
]

export const eiken4ExtraQuestions: Question[] = [
  ...build('imperative', '命令文', IMPERATIVE),
  ...build('lets', "Let's 〜", LETS),
  ...build('negation', '否定文', NEGATION),
  ...build('who', '疑問詞 Who', WHO),
  ...build('when', '疑問詞 When', WHEN),
  ...build('how', '疑問詞 How', HOW),
  ...build('why', '疑問詞 Why', WHY),
  ...build('which', '疑問詞 Which', WHICH),
  ...build('article', '冠詞 a/an/the', ARTICLE),
  ...build('plural', '名詞の複数形', PLURAL),
  ...build('pronoun', '代名詞・所有格', PRONOUN),
  ...build('preptime', '時の前置詞', PREPOSITION_TIME),
  ...build('pastbe', 'be動詞の過去形', PAST_BE),
  ...build('will', '未来形 will', FUTURE_WILL),
  ...build('canrequest', '依頼の Can/Could you 〜?', CAN_REQUEST),
  ...build('may', '助動詞 may', MAY),
  ...build('someany', 'some / any', SOME_ANY),
  ...build('manymuch', 'many / much / a lot of', MANY_MUCH),
  ...build('frequency', '頻度の副詞', ADVERB_FREQUENCY),
  ...build('howmuch', 'How much 〜?', HOW_MUCH),
  ...build('howlong', 'How long 〜?', HOW_LONG),
  ...build('svc', 'SVC (look/become + 形容詞)', SVC),
  ...build('greeting', 'あいさつ・自己紹介', GREETING),
  ...build('shopping', '買い物表現', SHOPPING),
  ...build('restaurant', 'レストラン表現', RESTAURANT),
]
