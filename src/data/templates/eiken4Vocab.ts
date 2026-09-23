import type { Question } from '../../types'
import { q } from '../questionGen'

/**
 * 英検4級 questions written to bring in basic vocabulary the rest of the bank
 * never used.
 *
 * `npm run vocab:audit` showed the level used only 38% of the CEFR-J A1
 * list — no days of the week, no months, few rooms, clothes or feelings,
 * and verbs as common as `bring`, `wear` or `remember` were missing. Each
 * sentence here drills one of the level's grammar points and works in two or
 * three of those words, so they turn up in play instead of sitting in a list.
 *
 * Same rules as eiken4Extra: one natural order only, and each `note` is
 * spelled as its grammar tag's label in data/grammar.ts.
 */

interface Sentence {
  jp: string
  en: string
}

/** Turns a sentence list into questions with ids prefixed `v4-<slot>-<i>`. */
const build = (slot: string, note: string, sentences: Sentence[]): Question[] =>
  sentences.map((s, i) => q(`v4-${slot}-${i}`, s.jp, s.en, note))

const THIS_IS: Sentence[] = [
  { jp: 'こちらはカナダから来た私のいとこです。', en: 'This is my cousin from Canada.' },
  { jp: 'これは私の姉の寝室です。', en: "This is my sister's bedroom." },
  { jp: 'これは私のおじの農場です。', en: "This is my uncle's farm." },
  { jp: 'これは私の祖父のめがねです。', en: "These are my grandfather's glasses." },
  { jp: 'あれは古い教会です。', en: 'That is an old church.' },
]

const ADJECTIVE: Sentence[] = [
  { jp: '今日は空がとても明るいです。', en: 'The sky is very bright today.' },
  { jp: '私のねこはとてもなまけものです。', en: 'My cat is very lazy.' },
  { jp: 'この映画は本当に退屈です。', en: 'This movie is really boring.' },
  { jp: '私の弟はとても恥ずかしがりやです。', en: 'My brother is very shy.' },
  { jp: 'あなたのドレスはとてもかわいいです。', en: 'Your dress is very pretty.' },
  { jp: 'あの男性はとてもお金持ちです。', en: 'That man is very rich.' },
  { jp: '私の手はとても汚れています。', en: 'My hands are very dirty.' },
  { jp: 'この問題はとても難しいです。', en: 'This problem is very difficult.' },
  { jp: '彼の犬はとても頭がいいです。', en: 'His dog is very clever.' },
  { jp: 'その話はとても奇妙です。', en: 'The story is very strange.' },
]

const PRESENT: Sentence[] = [
  { jp: '私は夕食のあとに歯をみがきます。', en: 'I brush my teeth after dinner.' },
  { jp: '私たちは金曜日に教室をそうじします。', en: 'We clean the classroom on Friday.' },
  { jp: '私は夕食の前にお風呂に入ります。', en: 'I take a bath before dinner.' },
  { jp: '私たちは公園でピクニックをします。', en: 'We have a picnic in the park.' },
  { jp: '私はこの棚に本を置いています。', en: 'I keep my books on this shelf.' },
  { jp: '彼らはここで新鮮な野菜を売っています。', en: 'They sell fresh vegetables here.' },
  { jp: '私はあなたの名前を覚えています。', en: 'I remember your name.' },
  { jp: '私たちは学校で制服を着ます。', en: 'We wear uniforms at school.' },
  { jp: '私はあなたの考えに賛成です。', en: 'I agree with your idea.' },
  { jp: '私は毎日日記を書きます。', en: 'I write in my diary every day.' },
]

const THIRD_PERSON: Sentence[] = [
  { jp: '私の父は大きなトラックを運転します。', en: 'My father drives a big truck.' },
  { jp: '私の母は高校で理科を教えています。', en: 'My mother teaches science at a high school.' },
  { jp: '私の兄はおもちゃの車を集めています。', en: 'My brother collects toy cars.' },
  { jp: '私のおじは工場で働いています。', en: 'My uncle works in a factory.' },
  { jp: '私たちの先生は3つの言語を話します。', en: 'Our teacher speaks three languages.' },
  { jp: '彼女は花の絵を描きます。', en: 'She draws pictures of flowers.' },
  { jp: 'その店は10時に開きます。', en: 'The shop opens at ten.' },
  { jp: '私の姉は毎晩テレビでドラマを見ます。', en: 'My sister watches a drama on TV every night.' },
  { jp: '彼は毎朝犬にえさをあげます。', en: 'He feeds his dog every morning.' },
  { jp: '私の祖母は台所で歌います。', en: 'My grandmother sings in the kitchen.' },
]

const BE_QUESTION: Sentence[] = [
  { jp: 'あなたのお兄さんは大学生ですか。', en: 'Is your brother a college student?' },
  { jp: '博物館は月曜日に開いていますか。', en: 'Is the museum open on Monday?' },
  { jp: 'あなたはおなかがすいていますか。', en: 'Are you hungry?' },
  { jp: 'その答えは正しいですか。', en: 'Is the answer correct?' },
  { jp: 'あなたは明日ひまですか。', en: 'Are you free tomorrow?' },
]

const DO_QUESTION: Sentence[] = [
  { jp: 'このバスは病院へ行きますか。', en: 'Does this bus go to the hospital?' },
  { jp: 'あなたはその歌手を知っていますか。', en: 'Do you know that singer?' },
  { jp: 'あなたのお姉さんは車を運転しますか。', en: 'Does your sister drive a car?' },
  { jp: 'あなたは幽霊を信じますか。', en: 'Do you believe in ghosts?' },
  { jp: 'あなたはグループ活動が好きですか。', en: 'Do you like group activities?' },
]

const NEGATION: Sentence[] = [
  { jp: '私は今日えんぴつを持っていません。', en: "I don't have a pencil today." },
  { jp: '私の祖父はインターネットを使いません。', en: "My grandfather doesn't use the internet." },
  { jp: '私たちは土曜日は学校がありません。', en: "We don't have school on Saturday." },
  { jp: '彼女は肉を食べません。', en: "She doesn't eat meat." },
  { jp: '私はその答えがわかりません。', en: "I don't know the answer." },
]

const WHAT: Sentence[] = [
  { jp: '今日は何日ですか。', en: 'What is the date today?' },
  { jp: 'あなたのおじさんの仕事は何ですか。', en: "What is your uncle's job?" },
  { jp: 'どうしたのですか。', en: "What's the matter?" },
  { jp: 'あなたの好きな色は何ですか。', en: 'What is your favorite color?' },
  { jp: 'この単語はどういう意味ですか。', en: 'What does this word mean?' },
]

const WHERE: Sentence[] = [
  { jp: 'あなたの故郷はどこですか。', en: 'Where is your hometown?' },
  { jp: 'トイレはどこですか。', en: 'Where is the bathroom?' },
  { jp: 'あなたはどこで服を買いますか。', en: 'Where do you buy your clothes?' },
  { jp: 'あなたの教室はどこですか。', en: 'Where is your classroom?' },
  { jp: '地下鉄の駅はどこですか。', en: 'Where is the subway station?' },
]

const WHO_WHEN_WHY: Sentence[] = [
  { jp: '帽子をかぶったあの女性はだれですか。', en: 'Who is that lady with a hat?' },
  { jp: 'あなたの一番の親友はだれですか。', en: 'Who is your best friend?' },
  { jp: 'コンサートはいつ始まりますか。', en: 'When does the concert begin?' },
  { jp: 'あなたはいつ宿題をしますか。', en: 'When do you do your homework?' },
  { jp: '彼女はなぜ泣いているのですか。', en: 'Why is she crying?' },
  { jp: 'あなたはなぜそんなに悲しいのですか。', en: 'Why are you so sad?' },
]

const PROGRESSIVE: Sentence[] = [
  { jp: '赤ちゃんはソファの上で眠っています。', en: 'The baby is sleeping on the sofa.' },
  { jp: '母は台所で料理をしています。', en: 'My mother is cooking in the kitchen.' },
  { jp: '彼らは舞台の上で踊っています。', en: 'They are dancing on the stage.' },
  { jp: '子どもたちは庭で笑っています。', en: 'The children are laughing in the garden.' },
  { jp: 'その犬はボールをキャッチしています。', en: 'The dog is catching a ball.' },
  { jp: '彼は白いシャツを着ています。', en: 'He is wearing a white shirt.' },
  { jp: '外は雪が降っています。', en: 'It is snowing outside.' },
  { jp: '私の姉は電話で話しています。', en: 'My sister is talking on the phone.' },
]

const PAST_IRREGULAR: Sentence[] = [
  { jp: '彼女はパーティーにケーキを持ってきました。', en: 'She brought a cake to the party.' },
  { jp: '私は昨夜気分が悪かったです。', en: 'I felt sick last night.' },
  { jp: '私は外で奇妙な音を聞きました。', en: 'I heard a strange noise outside.' },
  { jp: '私たちは去年の夏ハワイへ飛行機で行きました。', en: 'We flew to Hawaii last summer.' },
  { jp: '私は今朝7時に目が覚めました。', en: 'I woke up at seven this morning.' },
  { jp: 'その男性は古い車を売りました。', en: 'The man sold his old car.' },
  { jp: '彼女は海の絵を描きました。', en: 'She drew a picture of the sea.' },
  { jp: '私たちは公園でたくさんの写真を撮りました。', en: 'We took a lot of photos in the park.' },
  { jp: '私たちは駅で先生に会いました。', en: 'We met our teacher at the station.' },
  { jp: '彼は私に誕生日カードをくれました。', en: 'He gave me a birthday card.' },
]

const WAS_WERE: Sentence[] = [
  { jp: 'そのテストは簡単でした。', en: 'The test was easy.' },
  { jp: '私たちは昨日海辺にいました。', en: 'We were at the beach yesterday.' },
  { jp: '天気はくもりで寒かったです。', en: 'The weather was cloudy and cold.' },
  { jp: '私の祖父母は農家でした。', en: 'My grandparents were farmers.' },
  { jp: 'その部屋はとても静かでした。', en: 'The room was very quiet.' },
]

const WILL: Sentence[] = [
  { jp: '明日は雨でしょう。', en: 'It will be rainy tomorrow.' },
  { jp: 'あなたにメールを送ります。', en: 'I will send you an email.' },
  { jp: '私たちは日曜日にパーティーを開きます。', en: 'We will have a party on Sunday.' },
  { jp: '私はいつか世界中を旅するつもりです。', en: 'I will travel around the world someday.' },
  { jp: '彼はすぐに戻ってくるでしょう。', en: 'He will be back soon.' },
]

const CAN_MAY: Sentence[] = [
  { jp: 'あなたの辞書を使ってもいいですか。', en: 'Can I use your dictionary?' },
  { jp: 'ドアを閉めてくれませんか。', en: 'Could you close the door?' },
  { jp: 'もう一度言っていただけますか。', en: 'Could you say that again?' },
  { jp: 'あなたのえんぴつを借りてもいいですか。', en: 'May I borrow your pencil?' },
  { jp: '私の姉は馬に乗れます。', en: 'My sister can ride a horse.' },
  { jp: 'ここで写真を撮ってもいいですか。', en: 'May I take a photo here?' },
]

const IMPERATIVE_LETS: Sentence[] = [
  { jp: '絵にさわらないで。', en: "Don't touch the pictures." },
  { jp: '階段では気をつけて。', en: 'Be careful on the stairs.' },
  { jp: 'ここに住所を書いてください。', en: 'Please write your address here.' },
  { jp: '駅までタクシーに乗りましょう。', en: "Let's take a taxi to the station." },
  { jp: '芝生の上でお昼を食べよう。', en: "Let's have lunch on the grass." },
  { jp: 'あなたの誕生日をお祝いしよう。', en: "Let's celebrate your birthday." },
  { jp: 'ここに来てこの地図を見て。', en: 'Come here and look at this map.' },
]

const THERE_IS: Sentence[] = [
  { jp: '道に大きな穴があります。', en: 'There is a big hole in the road.' },
  { jp: '壁に時計がかかっています。', en: 'There is a clock on the wall.' },
  { jp: 'テーブルの上にびんが2本あります。', en: 'There are two bottles on the table.' },
  { jp: '湖に小さな島があります。', en: 'There is a small island in the lake.' },
  { jp: 'この市には大きな図書館があります。', en: 'There is a big library in this city.' },
]

const PREPOSITION_PLACE: Sentence[] = [
  { jp: 'ねこはいすの下にいます。', en: 'The cat is under the chair.' },
  { jp: '私のかばんはドアの後ろにあります。', en: 'My bag is behind the door.' },
  { jp: '学校は公園と病院の間にあります。', en: 'The school is between the park and the hospital.' },
  { jp: '絵はベッドの上のほうにかかっています。', en: 'The picture is above the bed.' },
  { jp: 'ペンは本のそばにあります。', en: 'The pen is beside the book.' },
]

const PREPOSITION_TIME: Sentence[] = [
  { jp: '私の誕生日は3月です。', en: 'My birthday is in March.' },
  { jp: '学校は4月に始まります。', en: 'School starts in April.' },
  { jp: '私たちは1月にスキーに行きます。', en: 'We go skiing in January.' },
  { jp: 'お祭りは8月にあります。', en: 'The festival is in August.' },
  { jp: 'クリスマスは12月です。', en: 'Christmas is in December.' },
  { jp: '姉は6月に生まれました。', en: 'My sister was born in June.' },
  { jp: '夏休みは7月に始まります。', en: 'The summer vacation starts in July.' },
  { jp: 'ハロウィーンは10月です。', en: 'Halloween is in October.' },
  { jp: '私たちは木曜日にテストがあります。', en: 'We have a test on Thursday.' },
  { jp: '私は火曜日にピアノのレッスンがあります。', en: 'I have a piano lesson on Tuesday.' },
  { jp: '私たちは水曜日に魚を食べます。', en: 'We eat fish on Wednesday.' },
  { jp: 'おじは11月に帰ってきます。', en: 'My uncle comes home in November.' },
  { jp: '私たちの遠足は9月です。', en: 'Our school trip is in September.' },
  { jp: '2月にはたくさん雪が降ります。', en: 'It snows a lot in February.' },
  { jp: '5月は私の好きな月です。', en: 'May is my favorite month.' },
]

const COMPARATIVE: Sentence[] = [
  { jp: '今日は昨日より暑いです。', en: 'Today is hotter than yesterday.' },
  { jp: '私のねこはあなたのねこより太っています。', en: 'My cat is fatter than your cat.' },
  { jp: 'この箱はあの箱より重いです。', en: 'This box is heavier than that one.' },
  { jp: '私の姉は私より背が高いです。', en: 'My sister is taller than me.' },
  { jp: 'この部屋はあの部屋より暗いです。', en: 'This room is darker than that one.' },
]

const PLURAL_PRONOUN: Sentence[] = [
  { jp: '子どもたちは雪の中で遊んでいます。', en: 'The children are playing in the snow.' },
  { jp: 'この本は彼女のものです。', en: 'This book is hers.' },
  { jp: '私は彼らのことをよく知っています。', en: 'I know them well.' },
  { jp: 'その犬は自分のおもちゃで遊んでいます。', en: 'The dog is playing with its toy.' },
  { jp: '私の兄は3足のくつを持っています。', en: 'My brother has three pairs of shoes.' },
]

const SOME_ANY_MANY: Sentence[] = [
  { jp: 'あなたはペットを飼っていますか。', en: 'Do you have any pets?' },
  { jp: '私はジュースがほしいです。', en: 'I want some juice.' },
  { jp: 'この市にはたくさんの人がいます。', en: 'There are a lot of people in this city.' },
  { jp: '私はたくさんの絵本を持っています。', en: 'I have many picture books.' },
  { jp: '台所に卵はありますか。', en: 'Are there any eggs in the kitchen?' },
]

const FREQUENCY: Sentence[] = [
  { jp: 'あなたはよく海辺へ行きますか。', en: 'Do you often go to the beach?' },
  { jp: '私はときどきタクシーに乗ります。', en: 'I sometimes take a taxi.' },
  { jp: '彼女は決して肉を食べません。', en: 'She never eats meat.' },
  { jp: '彼はいつもみんなに親切です。', en: 'He is always kind to everyone.' },
  { jp: '私はたいてい歩いて学校へ行きます。', en: 'I usually walk to school.' },
]

const HOW_MUCH_LONG: Sentence[] = [
  { jp: 'このピザはいくらですか。', en: 'How much is this pizza?' },
  { jp: 'このジーンズはいくらですか。', en: 'How much are these jeans?' },
  { jp: '夏休みはどれくらいの長さですか。', en: 'How long is the summer vacation?' },
  { jp: 'この切手はいくらですか。', en: 'How much is this stamp?' },
  { jp: 'その映画はどれくらいの長さですか。', en: 'How long is the movie?' },
]

const SVC: Sentence[] = [
  { jp: '彼は有名なミュージシャンになりました。', en: 'He became a famous musician.' },
  { jp: '秋には葉が黄色になります。', en: 'The leaves turn yellow in the fall.' },
  { jp: '彼女の声はすてきに聞こえます。', en: 'Her voice sounds lovely.' },
  { jp: 'あなたは今日うれしそうに見えます。', en: 'You look excited today.' },
  { jp: 'このケーキはおいしそうに見えます。', en: 'This cake looks delicious.' },
]

const GREETING: Sentence[] = [
  { jp: 'みなさん、おはようございます。', en: 'Good morning, everyone.' },
  { jp: 'おやすみなさい、また明日。', en: 'Good night, see you tomorrow.' },
  { jp: 'すてきなプレゼントをありがとう。', en: 'Thank you for the lovely gift.' },
  { jp: 'すみません、駅はどこですか。', en: 'Excuse me, where is the station?' },
  { jp: '遅れてごめんなさい。', en: "I'm sorry I'm late." },
  { jp: '私たちの学校へようこそ。', en: 'Welcome to our school.' },
]

const SHOPPING: Sentence[] = [
  { jp: '青いコートを探しています。', en: "I'm looking for a blue coat." },
  { jp: 'このシャツの茶色はありますか。', en: 'Do you have this shirt in brown?' },
  { jp: 'この紫のものをください。', en: "I'll take this purple one." },
  { jp: '10ドルになります。', en: 'That will be ten dollars.' },
  { jp: 'おつりです。', en: 'Here is your change.' },
]

const RESTAURANT: Sentence[] = [
  { jp: 'ハンバーガーとサラダをください。', en: "I'd like a hamburger and a salad." },
  { jp: '水を1杯いただけますか。', en: 'Can I have a glass of water?' },
  { jp: '私はチキンとライスにします。', en: "I'll have chicken and rice." },
  { jp: 'このチョコレートケーキはとてもおいしいです。', en: 'This chocolate cake is very good.' },
  { jp: 'アイスクリームはありますか。', en: 'Do you have ice cream?' },
]

export const eiken4VocabQuestions: Question[] = [
  ...build('this', 'be動詞(This is 〜)', THIS_IS),
  ...build('adj', '形容詞', ADJECTIVE),
  ...build('present', '一般動詞の現在形', PRESENT),
  ...build('third', '三人称単数のs', THIRD_PERSON),
  ...build('beq', 'be動詞の疑問文', BE_QUESTION),
  ...build('doq', '一般動詞の疑問文', DO_QUESTION),
  ...build('neg', '否定文', NEGATION),
  ...build('what', '疑問詞 What', WHAT),
  ...build('where', '疑問詞 Where', WHERE),
  ...build('who', '疑問詞 Who', WHO_WHEN_WHY.slice(0, 2)),
  ...build('when', '疑問詞 When', WHO_WHEN_WHY.slice(2, 4)),
  ...build('why', '疑問詞 Why', WHO_WHEN_WHY.slice(4)),
  ...build('prog', '現在進行形', PROGRESSIVE),
  ...build('pastirr', '過去形(不規則動詞)', PAST_IRREGULAR),
  ...build('was', 'be動詞の過去形', WAS_WERE),
  ...build('will', '未来形 will', WILL),
  ...build('can', '助動詞 can', CAN_MAY.slice(0, 1).concat(CAN_MAY.slice(4, 5))),
  ...build('could', '依頼の Can/Could you 〜?', CAN_MAY.slice(1, 3)),
  ...build('may', '助動詞 may', [CAN_MAY[3], CAN_MAY[5]]),
  ...build('imp', '命令文', IMPERATIVE_LETS.filter((s) => !s.en.startsWith("Let's"))),
  ...build('lets', "Let's 〜", IMPERATIVE_LETS.filter((s) => s.en.startsWith("Let's"))),
  ...build('there', 'There is/are', THERE_IS),
  ...build('place', '場所の前置詞', PREPOSITION_PLACE),
  ...build('time', '時の前置詞', PREPOSITION_TIME),
  ...build('comp', '比較級(-er)', COMPARATIVE),
  ...build('plural', '名詞の複数形', [PLURAL_PRONOUN[0], PLURAL_PRONOUN[4]]),
  ...build('pron', '代名詞・所有格', PLURAL_PRONOUN.slice(1, 4)),
  ...build('some', 'some / any', [SOME_ANY_MANY[0], SOME_ANY_MANY[1], SOME_ANY_MANY[4]]),
  ...build('many', 'many / much / a lot of', SOME_ANY_MANY.slice(2, 4)),
  ...build('freq', '頻度の副詞', FREQUENCY),
  ...build('howmuch', 'How much 〜?', [HOW_MUCH_LONG[0], HOW_MUCH_LONG[1], HOW_MUCH_LONG[3]]),
  ...build('howlong', 'How long 〜?', [HOW_MUCH_LONG[2], HOW_MUCH_LONG[4]]),
  ...build('svc', 'SVC (look/become + 形容詞)', SVC),
  ...build('greet', 'あいさつ・自己紹介', GREETING),
  ...build('shop', '買い物表現', SHOPPING),
  ...build('rest', 'レストラン表現', RESTAURANT),
]
