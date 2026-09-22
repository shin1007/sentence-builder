import type { Question } from '../../types'
import { q } from '../questionGen'

/**
 * Additional 英検準2級-level questions for the grammar points the original
 * eikenPre2 bank didn't reach: the formal-subject `It is ... to do`, the
 * `enough to` / `ask O to do` / `help O do` patterns, equality and emphasised
 * comparatives, passives beyond the plain statement, relative `which`, the
 * concession and `while` clauses, correlatives, and quantity words.
 *
 * Written out sentence by sentence — see the note in eiken4Extra.ts. Each
 * `note` matches a grammar tag's label in data/grammar.ts exactly.
 */

interface Sentence {
  jp: string
  en: string
}

const build = (slot: string, note: string, sentences: Sentence[]): Question[] =>
  sentences.map((s, i) => q(`p2x-${slot}-${i}`, s.jp, s.en, note))

const IT_IS_TO_DO: Sentence[] = [
  { jp: 'たくさんの本を読むことは大切です。', en: 'It is important to read many books.' },
  { jp: '私にとって早起きすることは難しいです。', en: 'It is difficult for me to get up early.' },
  { jp: 'この川で泳ぐことは危険です。', en: 'It is dangerous to swim in this river.' },
  { jp: '彼にとってこの問題を解くことは簡単です。', en: 'It is easy for him to solve this problem.' },
  { jp: 'ここではヘルメットをかぶることが必要です。', en: 'It is necessary to wear a helmet here.' },
  { jp: '友達と旅行することは楽しいです。', en: 'It is fun to travel with friends.' },
  { jp: '私たちにとってその仕事を終えるのは大変でした。', en: 'It was hard for us to finish the work.' },
  { jp: '毎日歩くことは健康によいです。', en: 'It is good for your health to walk every day.' },
  { jp: '今日これを終えることは不可能です。', en: 'It is impossible to finish this today.' },
  { jp: '他の文化について学ぶことは興味深いです。', en: 'It is interesting to learn about other cultures.' },
]

const ENOUGH_TO_DO: Sentence[] = [
  { jp: '彼は車を運転できる年齢です。', en: 'He is old enough to drive a car.' },
  { jp: '彼女は親切にも私を手伝ってくれました。', en: 'She was kind enough to help me.' },
  { jp: 'この箱は運べるくらい軽いです。', en: 'This box is light enough to carry.' },
  { jp: 'その水は泳げるくらい暖かいです。', en: 'The water is warm enough to swim in.' },
  { jp: '彼はこのかばんを持ち上げられるくらい力があります。', en: 'He is strong enough to lift this bag.' },
  { jp: '彼女は教えられるくらい上手に英語を話します。', en: 'She speaks English well enough to teach it.' },
  { jp: 'このロープは屋根まで届くくらい長いです。', en: 'This rope is long enough to reach the roof.' },
  { jp: '私は運よくチケットを手に入れられました。', en: 'I was lucky enough to get a ticket.' },
  { jp: 'その話は2回読むくらい面白かったです。', en: 'The story was interesting enough to read twice.' },
  { jp: '彼女は一番上の棚に手が届くくらい背が高いです。', en: 'She is tall enough to reach the top shelf.' },
]

const TELL_ASK_TO_DO: Sentence[] = [
  { jp: '母は私に部屋をそうじするように言いました。', en: 'My mother told me to clean my room.' },
  { jp: '先生は私たちに静かにするように頼みました。', en: 'The teacher asked us to be quiet.' },
  { jp: '私は彼に窓を閉めるように頼みました。', en: 'I asked him to close the window.' },
  { jp: '彼女は息子に寝るように言いました。', en: 'She told her son to go to bed.' },
  { jp: '彼は私に少し待つように頼みました。', en: 'He asked me to wait for a moment.' },
  { jp: '医者は彼女に休むように言いました。', en: 'The doctor told her to take a rest.' },
  { jp: '彼らは私たちにチームに入るよう頼みました。', en: 'They asked us to join their team.' },
  { jp: '父は私に遅れないように言いました。', en: 'My father told me not to be late.' },
  { jp: '彼女は店員に水を持ってくるよう頼みました。', en: 'She asked the waiter to bring some water.' },
  { jp: 'コーチは私たちに10周走るように言いました。', en: 'The coach told us to run ten laps.' },
]

const HELP_DO: Sentence[] = [
  { jp: '彼女はこれらの箱を運ぶのを手伝ってくれました。', en: 'She helped me carry these boxes.' },
  { jp: '鍵を探すのを手伝ってくれますか。', en: 'Can you help me find my key?' },
  { jp: '彼は母が夕食を作るのを手伝いました。', en: 'He helped his mother cook dinner.' },
  { jp: '友達が宿題を終えるのを手伝ってくれました。', en: 'My friend helped me finish my homework.' },
  { jp: 'そのアプリは生徒が新しい単語を覚えるのに役立ちます。', en: 'The app helps students learn new words.' },
  { jp: '私はお年寄りが道を渡るのを手伝いました。', en: 'I helped an old man cross the street.' },
  { jp: '彼らは私たちが教室をそうじするのを手伝いました。', en: 'They helped us clean the classroom.' },
  { jp: 'この本は私がその話題を理解するのに役立ちました。', en: 'This book helped me understand the topic.' },
  { jp: 'このテーブルを動かすのを手伝ってください。', en: 'Please help me move this table.' },
  { jp: '彼女は妹がドレスを選ぶのを手伝いました。', en: 'She helped her sister choose a dress.' },
]

const NOT_AS_AS: Sentence[] = [
  { jp: 'この本はあの本ほど難しくありません。', en: 'This book is not as difficult as that one.' },
  { jp: '彼は兄ほど背が高くありません。', en: 'He is not as tall as his brother.' },
  { jp: '今日は昨日ほど寒くありません。', en: 'Today is not as cold as yesterday.' },
  { jp: '私の自転車はあなたのほど新しくありません。', en: 'My bike is not as new as yours.' },
  { jp: 'この映画は1作目ほどわくわくしませんでした。', en: 'This movie was not as exciting as the first one.' },
  { jp: '彼女は私ほど速く走りません。', en: 'She does not run as fast as I do.' },
  { jp: 'この町は東京ほど大きくありません。', en: 'This town is not as large as Tokyo.' },
  { jp: 'そのテストは思ったほど難しくありませんでした。', en: 'The test was not as hard as I expected.' },
  { jp: '私の部屋は姉の部屋ほどきれいではありません。', en: "My room is not as clean as my sister's." },
  { jp: 'このコーヒーは私が好きなほど熱くありません。', en: 'This coffee is not as hot as I like.' },
]

const COMPARATIVE_EMPHASIS: Sentence[] = [
  { jp: 'このかばんは私のよりずっと重いです。', en: 'This bag is much heavier than mine.' },
  { jp: '彼は友達よりずっと速く走ります。', en: 'He runs much faster than his friends.' },
  { jp: '今日は昨日よりずっと寒いです。', en: 'Today is much colder than yesterday.' },
  { jp: 'この問題はあの問題よりはるかに難しいです。', en: 'This question is far more difficult than that one.' },
  { jp: '彼女は私よりずっと上手に英語を話します。', en: 'She speaks English much better than I do.' },
  { jp: 'この家は私たちの古い家よりはるかに大きいです。', en: 'This house is far bigger than our old one.' },
  { jp: '新型は旧型よりずっと安いです。', en: 'The new model is much cheaper than the old one.' },
  { jp: '彼は見た目よりずっと若いです。', en: 'He is much younger than he looks.' },
  { jp: 'この道はもう一方の道よりはるかに安全です。', en: 'This road is far safer than the other one.' },
  { jp: '私の点数は前回よりずっと高かったです。', en: 'My score was much higher than last time.' },
]

const PASSIVE_QUESTION: Sentence[] = [
  { jp: 'この部屋は毎日そうじされていますか。', en: 'Is this room cleaned every day?' },
  { jp: 'この写真は京都で撮られましたか。', en: 'Was this picture taken in Kyoto?' },
  { jp: 'この学校はいつ建てられましたか。', en: 'When was this school built?' },
  { jp: 'その国では英語が話されていますか。', en: 'Is English spoken in that country?' },
  { jp: 'これらのクッキーはお母さんが作ったのですか。', en: 'Were these cookies made by your mother?' },
  { jp: 'この手紙はどこで書かれましたか。', en: 'Where was this letter written?' },
  { jp: 'この本は多くの生徒に読まれていますか。', en: 'Is this book read by many students?' },
  { jp: 'その窓はあらしで壊されたのですか。', en: 'Was the window broken by the storm?' },
  { jp: 'これらの野菜はこの村で育てられていますか。', en: 'Are these vegetables grown in this village?' },
  { jp: 'なぜその会議は中止されたのですか。', en: 'Why was the meeting canceled?' },
]

const PASSIVE_MODAL: Sentence[] = [
  { jp: 'この仕事は金曜日までに終えられなければなりません。', en: 'This work must be finished by Friday.' },
  { jp: 'その手紙は明日の朝送られるでしょう。', en: 'The letter will be sent tomorrow morning.' },
  { jp: 'これらの本は2週間借りられます。', en: 'These books can be borrowed for two weeks.' },
  { jp: 'その部屋はパーティーの前にそうじされるべきです。', en: 'The room should be cleaned before the party.' },
  { jp: 'この機械はだれでも使えます。', en: 'This machine can be used by anyone.' },
  { jp: '真実はみんなに伝えられなければなりません。', en: 'The truth must be told to everyone.' },
  { jp: '結果は来週発表されるでしょう。', en: 'The results will be announced next week.' },
  { jp: 'このドアは外から開けられません。', en: 'This door cannot be opened from outside.' },
  { jp: 'あなたのレポートは英語で書かれるべきです。', en: 'Your report should be written in English.' },
  { jp: 'チケットは駅で買うことができます。', en: 'The tickets can be bought at the station.' },
]

const RELATIVE_WHICH: Sentence[] = [
  { jp: 'これは私が昨日買った本です。', en: 'This is the book which I bought yesterday.' },
  { jp: '大阪へ行く電車は10時に出ます。', en: 'The train which goes to Osaka leaves at ten.' },
  { jp: 'これは父が撮った写真です。', en: 'This is a picture which my father took.' },
  { jp: '丘の上に立っている家は古いです。', en: 'The house which stands on the hill is old.' },
  { jp: '私は笑わせてくれる映画が好きです。', en: 'I like movies which make me laugh.' },
  { jp: '彼女が運んでいるかばんはとても重いです。', en: 'The bag which she is carrying is very heavy.' },
  { jp: 'これはコンテストで優勝した歌です。', en: 'This is the song which won the contest.' },
  { jp: '古いレコードを売る店はこの近くです。', en: 'The store which sells old records is near here.' },
  { jp: '私はこの話題をよく説明する本を見つけました。', en: 'I found a book which explains this topic well.' },
  { jp: '私たちが乗ったバスはとても混んでいました。', en: 'The bus which we took was very crowded.' },
]

const ALTHOUGH: Sentence[] = [
  { jp: '雨が降っていましたが、私たちは出かけました。', en: 'Although it was raining, we went out.' },
  { jp: '彼は具合が悪かったが学校へ行きました。', en: 'He went to school although he was sick.' },
  { jp: '彼女は若いけれどもとても賢いです。', en: 'Although she is young, she is very wise.' },
  { jp: '天気は悪かったが私たちは旅行を楽しみました。', en: 'We enjoyed the trip although the weather was bad.' },
  { jp: '一生懸命勉強したけれども、私はテストに落ちました。', en: 'Although I studied hard, I failed the test.' },
  { jp: '彼女は疲れていたけれども笑顔を保ちました。', en: 'She kept smiling although she was tired.' },
  { jp: 'この車は古いけれども、まだよく走ります。', en: 'Although this car is old, it still runs well.' },
  { jp: '彼は真実を知っていたが何も言いませんでした。', en: "He didn't say anything although he knew the truth." },
  { jp: 'その映画は長かったけれども面白かったです。', en: 'Although the movie was long, it was interesting.' },
  { jp: 'とても寒かったが彼らは外で練習しました。', en: 'They practiced outside although it was very cold.' },
]

const WHILE_CLAUSE: Sentence[] = [
  { jp: '私がふろに入っている間に彼が電話してきました。', en: 'He called me while I was taking a bath.' },
  { jp: '彼女が料理をしている間に電話が鳴りました。', en: 'While she was cooking, the phone rang.' },
  { jp: '私はバスを待つ間に本を読みました。', en: 'I read a book while I waited for the bus.' },
  { jp: '私たちが話している間に雨が降り始めました。', en: 'While we were talking, it started to rain.' },
  { jp: '彼女は宿題をしながら音楽を聞きました。', en: 'She listened to music while she did her homework.' },
  { jp: '母が働いている間、赤ちゃんは眠っていました。', en: 'The baby slept while his mother worked.' },
  { jp: '京都にいる間に、私は多くの寺を訪ねました。', en: 'While I was in Kyoto, I visited many temples.' },
  { jp: '彼は夕食を食べながらテレビを見ました。', en: 'He watched TV while he was eating dinner.' },
  { jp: '彼らが留守の間に私たちは家をそうじしました。', en: 'While they were away, we cleaned the house.' },
  { jp: '先生が話している間、私はメモを取りました。', en: 'I took notes while the teacher was speaking.' },
]

const BOTH_EITHER: Sentence[] = [
  { jp: '父も母も音楽が好きです。', en: 'Both my father and my mother like music.' },
  { jp: 'お茶かコーヒーのどちらかを選べます。', en: 'You can choose either tea or coffee.' },
  { jp: 'トムもケンもギターを弾きます。', en: 'Both Tom and Ken play the guitar.' },
  { jp: '私たちは今日か明日のどちらかに行けます。', en: 'We can go either today or tomorrow.' },
  { jp: '英語も数学も私には難しいです。', en: 'Both English and math are difficult for me.' },
  { jp: 'あなたかお兄さんのどちらかがそこへ行かねばなりません。', en: 'Either you or your brother must go there.' },
  { jp: '本も映画も面白かったです。', en: 'Both the book and the movie were interesting.' },
  { jp: '彼女はフランス語かスペイン語のどちらかを話せます。', en: 'She can speak either French or Spanish.' },
  { jp: '姉も私も5月生まれです。', en: 'Both my sister and I were born in May.' },
  { jp: 'このペンかあのペンのどちらかを使ってよいです。', en: 'You may use either this pen or that one.' },
]

const FEW_LITTLE: Sentence[] = [
  { jp: '私は東京に数人の友達がいます。', en: 'I have a few friends in Tokyo.' },
  { jp: '私たちにはまだ少し時間があります。', en: 'We still have a little time.' },
  { jp: '彼女は店でりんごを数個買いました。', en: 'She bought a few apples at the store.' },
  { jp: '数分待ってください。', en: 'Please wait a few minutes.' },
  { jp: 'このケーキにはもう少し砂糖が必要です。', en: 'I need a little more sugar for this cake.' },
  { jp: '会議に来たのはほんの数人の生徒でした。', en: 'Only a few students came to the meeting.' },
  { jp: '彼は少し日本語を話します。', en: 'He speaks a little Japanese.' },
  { jp: '私たちはそこに数日間滞在しました。', en: 'We stayed there for a few days.' },
  { jp: 'スープに少し塩を加えなさい。', en: 'Add a little salt to the soup.' },
  { jp: '今日は少しお金を持っています。', en: 'I have a little money with me today.' },
]

const PARTICIPLE_ATTRIBUTIVE: Sentence[] = [
  { jp: '眠っている赤ちゃんを見てください。', en: 'Look at the sleeping baby.' },
  { jp: '割れた窓は昨日修理されました。', en: 'The broken window was repaired yesterday.' },
  { jp: '私はその店で中古の自転車を見つけました。', en: 'I found a used bike at the shop.' },
  { jp: '昇る太陽はとても美しかったです。', en: 'The rising sun was very beautiful.' },
  { jp: '私たちはスタジアムで興奮した観衆を見ました。', en: 'We saw an excited crowd at the stadium.' },
  { jp: '彼女は落ち葉を拾いました。', en: 'She picked up the fallen leaves.' },
  { jp: 'これは状態のよい中古車です。', en: 'This is a used car in good condition.' },
  { jp: '凍った湖は鏡のように見えました。', en: 'The frozen lake looked like a mirror.' },
  { jp: '彼は私に塗られた木の箱を見せました。', en: 'He showed me a painted wooden box.' },
  { jp: 'ゆで卵は朝食によいです。', en: 'Boiled eggs are good for breakfast.' },
]

const GERUND_PREPOSITION: Sentence[] = [
  { jp: '彼女はピアノを弾くのが得意です。', en: 'She is good at playing the piano.' },
  { jp: '昨日手伝ってくれてありがとう。', en: 'Thank you for helping me yesterday.' },
  { jp: '彼はさよならを言わずに去りました。', en: 'He left without saying goodbye.' },
  { jp: '私は中国語を学ぶことに興味があります。', en: 'I am interested in learning Chinese.' },
  { jp: '彼女は人前で話すことを怖がっています。', en: 'She is afraid of speaking in public.' },
  { jp: '私たちはこの夏に京都を訪れることについて話しました。', en: 'We talked about visiting Kyoto this summer.' },
  { jp: '明日海へ行くのはどうですか。', en: 'How about going to the beach tomorrow?' },
  { jp: '彼はコンテストで優勝したことを誇りに思っています。', en: 'He is proud of winning the contest.' },
  { jp: '私はバスを待つのにうんざりしています。', en: 'I am tired of waiting for the bus.' },
  { jp: '彼女は遅れたことを謝りました。', en: 'She apologized for being late.' },
]

const TOO_MUCH_MANY: Sentence[] = [
  { jp: 'あなたは毎日テレビを見すぎです。', en: 'You watch too much television every day.' },
  { jp: 'この道路には車が多すぎます。', en: 'There are too many cars on this road.' },
  { jp: '彼は私のコーヒーに砂糖を入れすぎました。', en: 'He put too much sugar in my coffee.' },
  { jp: '門のところで待っている人が多すぎました。', en: 'Too many people were waiting at the gate.' },
  { jp: '彼女は服にお金を使いすぎます。', en: 'She spends too much money on clothes.' },
  { jp: '私はパーティーでケーキを食べすぎました。', en: 'I ate too much cake at the party.' },
  { jp: '今日は欠席した生徒が多すぎました。', en: 'Too many students were absent today.' },
  { jp: '彼は今週仕事が多すぎます。', en: 'He has too much work this week.' },
  { jp: '私たちは試合でミスをしすぎました。', en: 'We made too many mistakes in the game.' },
  { jp: '夜にコーヒーを飲みすぎてはいけません。', en: "Don't drink too much coffee at night." },
]

export const eikenPre2ExtraQuestions: Question[] = [
  ...build('itisto', 'It is 〜 (for A) to do', IT_IS_TO_DO),
  ...build('enoughto', '〜 enough to do', ENOUGH_TO_DO),
  ...build('tellaskto', 'tell/ask + O + to do', TELL_ASK_TO_DO),
  ...build('helpdo', 'help + O + (to) do', HELP_DO),
  ...build('notasas', 'not as 〜 as', NOT_AS_AS),
  ...build('muchfar', '比較級の強調 much/far', COMPARATIVE_EMPHASIS),
  ...build('passiveq', '受動態の疑問文', PASSIVE_QUESTION),
  ...build('passivemodal', '助動詞 + 受動態', PASSIVE_MODAL),
  ...build('which', '関係代名詞 which', RELATIVE_WHICH),
  ...build('although', '譲歩の although/though', ALTHOUGH),
  ...build('while', '時の while', WHILE_CLAUSE),
  ...build('botheither', 'both A and B / either A or B', BOTH_EITHER),
  ...build('fewlittle', 'a few / a little', FEW_LITTLE),
  ...build('participleattr', '分詞の前置修飾', PARTICIPLE_ATTRIBUTIVE),
  ...build('gerundprep', '前置詞 + 動名詞', GERUND_PREPOSITION),
  ...build('toomuch', 'too much / too many', TOO_MUCH_MANY),
]
