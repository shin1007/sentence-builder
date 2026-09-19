import type { Question } from '../../types'
import { q } from '../questionGen'
import { FAMILY, JOBS } from '../vocab'

const ADVICE_VP = [
  { en: 'accept the offer', jp: 'その申し出を受けるでしょう' },
  { en: 'take the job', jp: 'その仕事を引き受けるでしょう' },
  { en: 'apologize first', jp: 'まず謝るでしょう' },
  { en: 'ask for help', jp: '助けを求めるでしょう' },
  { en: 'choose the blue one', jp: '青いものを選ぶでしょう' },
  { en: 'study harder', jp: 'もっと一生懸命勉強するでしょう' },
  { en: 'tell the truth', jp: '本当のことを話すでしょう' },
  { en: 'wait a little longer', jp: 'もう少し待つでしょう' },
  { en: 'call her back', jp: '彼女に折り返し電話するでしょう' },
  { en: 'try again', jp: 'もう一度挑戦するでしょう' },
]

const WHERE_CLAUSES = [
  { en: 'I was born', jp: '私が生まれた' },
  { en: 'we grew up', jp: '私たちが育った' },
  { en: 'she lived', jp: '彼女が住んでいた' },
  { en: 'he was raised', jp: '彼が育てられた' },
  { en: 'my parents met', jp: '私の両親が出会った' },
  { en: 'the war ended', jp: '戦争が終わった' },
  { en: 'the story began', jp: '物語が始まった' },
  { en: 'the artist worked', jp: 'その芸術家が働いていた' },
  { en: 'the king lived', jp: 'その王が住んでいた' },
  { en: 'the treaty was signed', jp: '条約が調印された' },
]

const PAST_PERFECT_SENTENCES = [
  { en: 'When he arrived, we had already left.', jp: '彼が到着した時、私たちはすでに出発していました。' },
  { en: 'When she called, I had already gone to bed.', jp: '彼女が電話した時、私はすでに寝ていました。' },
  { en: 'When the movie started, we had already found our seats.', jp: '映画が始まった時、私たちはすでに席を見つけていました。' },
  { en: 'When I got home, my sister had already finished dinner.', jp: '私が家に着いた時、姉はすでに夕食を終えていました。' },
  { en: 'When the teacher came in, the students had already opened their books.', jp: '先生が入ってきた時、生徒たちはすでに本を開いていました。' },
  { en: 'When we reached the station, the train had already left.', jp: '私たちが駅に着いた時、電車はすでに出発していました。' },
  { en: 'When he woke up, the sun had already risen.', jp: '彼が目を覚ました時、太陽はすでに昇っていました。' },
  { en: 'When I opened the door, the cat had already run outside.', jp: '私がドアを開けた時、猫はすでに外に走り出ていました。' },
  { en: 'When she arrived at the party, most guests had already left.', jp: '彼女がパーティーに着いた時、ほとんどの客はすでに帰っていました。' },
  { en: 'When the rain stopped, the game had already ended.', jp: '雨が止んだ時、試合はすでに終わっていました。' },
]

const ADJ_REASON_PAST = [
  { en: 'tired', jp: '疲れていたので' },
  { en: 'busy', jp: '忙しかったので' },
  { en: 'sick', jp: '具合が悪かったので' },
  { en: 'scared', jp: '怖かったので' },
  { en: 'sleepy', jp: '眠かったので' },
  { en: 'sad', jp: '悲しかったので' },
  { en: 'nervous', jp: '緊張していたので' },
  { en: 'excited', jp: '興奮していたので' },
  { en: 'shy', jp: '恥ずかしかったので' },
  { en: 'cold', jp: '寒かったので' },
]

const VP_AFTER_ADJ = [
  { en: 'she went to bed early', jp: '彼女は早く寝ました' },
  { en: 'he stayed home', jp: '彼は家にいました' },
  { en: 'I canceled the trip', jp: '私は旅行をキャンセルしました' },
  { en: 'we left the party early', jp: '私たちは早くパーティーを出ました' },
  { en: 'she asked for help', jp: '彼女は助けを求めました' },
  { en: 'he took a break', jp: '彼は休憩を取りました' },
  { en: 'I called a doctor', jp: '私は医者を呼びました' },
  { en: 'we postponed the meeting', jp: '私たちは会議を延期しました' },
  { en: 'she drank some water', jp: '彼女は水を飲みました' },
  { en: 'he sat down', jp: '彼は座りました' },
]

const CAUSATIVE_PRONOUNS = [
  { en: 'him', jp: '彼' },
  { en: 'her', jp: '彼女' },
  { en: 'them', jp: '彼ら' },
]

const VERB_OBJ_HAVE = [
  { en: 'clean the room', jp: '部屋をそうじさせました' },
  { en: 'wash the car', jp: '車を洗わせました' },
  { en: 'fix the computer', jp: 'コンピューターを直させました' },
  { en: 'paint the fence', jp: 'フェンスを塗らせました' },
  { en: 'carry the boxes', jp: '箱を運ばせました' },
  { en: 'cut the grass', jp: '芝を刈らせました' },
  { en: 'repair the roof', jp: '屋根を修理させました' },
  { en: 'organize the files', jp: 'ファイルを整理させました' },
  { en: 'water the plants', jp: '植物に水をやらせました' },
  { en: 'move the furniture', jp: '家具を動かさせました' },
]

const VERB_OBJ_MAKE = [
  { en: 'wash the dishes', jp: 'お皿を洗わせました' },
  { en: 'clean my room', jp: '部屋をそうじさせました' },
  { en: 'do my homework', jp: '宿題をさせました' },
  { en: 'eat vegetables', jp: '野菜を食べさせました' },
  { en: 'practice piano', jp: 'ピアノを練習させました' },
  { en: 'finish my chores', jp: '家事を終わらせました' },
  { en: 'apologize', jp: '謝らせました' },
  { en: 'study hard', jp: '一生懸命勉強させました' },
  { en: 'wake up early', jp: '早く起きさせました' },
  { en: 'wear a coat', jp: 'コートを着させました' },
]

const GERUND_DURATION_VP = [
  { en: 'studying', jp: '勉強し続けています' },
  { en: 'working', jp: '働き続けています' },
  { en: 'waiting', jp: '待ち続けています' },
  { en: 'practicing', jp: '練習し続けています' },
  { en: 'cooking', jp: '料理し続けています' },
  { en: 'cleaning', jp: 'そうじをし続けています' },
  { en: 'reading', jp: '読書をし続けています' },
  { en: 'writing', jp: '書き続けています' },
  { en: 'singing', jp: '歌い続けています' },
  { en: 'dancing', jp: '踊り続けています' },
]

const DURATION = [
  { en: 'for the last hour', jp: 'この1時間' },
  { en: 'for two hours', jp: '2時間' },
  { en: 'all day', jp: '一日中' },
  { en: 'for the past week', jp: '先週ずっと' },
  { en: 'all morning', jp: '午前中ずっと' },
  { en: 'for three hours', jp: '3時間' },
  { en: 'for the whole afternoon', jp: '午後ずっと' },
  { en: 'for a long time', jp: '長い間' },
  { en: 'all night', jp: '一晩中' },
  { en: 'for several hours', jp: '数時間' },
]

const CLEFT_SENTENCES = [
  { en: 'It was her that I met first.', jp: '私が最初に会ったのは彼女でした。' },
  { en: 'It was Tokyo that we visited last year.', jp: '私たちが去年訪れたのは東京でした。' },
  { en: 'It was my brother who broke the window.', jp: '窓を割ったのは私の兄でした。' },
  { en: 'It was this book that changed my life.', jp: '私の人生を変えたのはこの本でした。' },
  { en: 'It was the teacher who solved the problem.', jp: 'その問題を解いたのは先生でした。' },
  { en: 'It was yesterday that the accident happened.', jp: '事故が起きたのは昨日でした。' },
  { en: 'It was my mother who taught me to cook.', jp: '私に料理を教えたのは母でした。' },
  { en: 'It was the rain that ruined our picnic.', jp: '私たちのピクニックを台無しにしたのは雨でした。' },
  { en: 'It was Ken who found the missing key.', jp: 'なくなった鍵を見つけたのはケンでした。' },
  { en: 'It was this song that made her cry.', jp: '彼女を泣かせたのはこの歌でした。' },
]

const NOT_ONLY_SENTENCES = [
  { en: 'The girl can speak not only English but also French.', jp: 'その少女は英語だけでなくフランス語も話せます。' },
  { en: 'He can play not only soccer but also basketball.', jp: '彼はサッカーだけでなくバスケットボールもできます。' },
  { en: 'She can cook not only Japanese food but also Italian food.', jp: '彼女は和食だけでなくイタリア料理も作れます。' },
  { en: 'I study not only math but also science.', jp: '私は数学だけでなく理科も勉強します。' },
  { en: 'We like not only cats but also dogs.', jp: '私たちは猫だけでなく犬も好きです。' },
  { en: 'He plays not only the guitar but also the piano.', jp: '彼はギターだけでなくピアノも弾きます。' },
  { en: 'She reads not only novels but also poetry.', jp: '彼女は小説だけでなく詩も読みます。' },
  { en: 'They visited not only Kyoto but also Osaka.', jp: '彼らは京都だけでなく大阪も訪れました。' },
  { en: 'I enjoy not only reading but also writing.', jp: '私は読書だけでなく執筆も楽しみます。' },
  { en: 'The store sells not only books but also magazines.', jp: 'その店は本だけでなく雑誌も売っています。' },
]

const ADJ_CONCESSIVE = [
  { en: 'tired', jp: '疲れていても' },
  { en: 'busy', jp: '忙しくても' },
  { en: 'sick', jp: '具合が悪くても' },
  { en: 'scared', jp: '怖くても' },
  { en: 'sleepy', jp: '眠くても' },
  { en: 'sad', jp: '悲しくても' },
  { en: 'nervous', jp: '緊張していても' },
  { en: 'excited', jp: '興奮していても' },
  { en: 'shy', jp: '恥ずかしくても' },
  { en: 'cold', jp: '寒くても' },
]

const RESULT_VP = [
  { en: 'smiles', jp: '笑顔です' },
  { en: 'works hard', jp: '一生懸命働きます' },
  { en: 'stays calm', jp: '落ち着いています' },
  { en: 'keeps trying', jp: '挑戦し続けます' },
  { en: 'helps others', jp: '他の人を助けます' },
  { en: 'stays positive', jp: '前向きでいます' },
  { en: 'finishes the job', jp: '仕事を終わらせます' },
  { en: 'keeps smiling', jp: '笑顔を絶やしません' },
  { en: 'remains kind', jp: '優しいままでいます' },
  { en: 'stays cheerful', jp: '明るくいます' },
]

const UNLESS_SENTENCES = [
  { en: 'Unless you help me, I cannot finish this.', jp: 'あなたが手伝ってくれない限り、私はこれを終えられません。' },
  { en: 'Unless it stops raining, we will stay inside.', jp: '雨がやまない限り、私たちは室内にいます。' },
  { en: 'Unless you practice every day, you will not improve.', jp: '毎日練習しない限り、上達しません。' },
  { en: 'Unless she apologizes, I will not forgive her.', jp: '彼女が謝らない限り、私は許しません。' },
  { en: 'Unless we leave now, we will miss the train.', jp: '今出発しない限り、電車に乗り遅れます。' },
  { en: 'Unless you study harder, you will fail the test.', jp: 'もっと一生懸命勉強しない限り、テストに落ちます。' },
  { en: 'Unless he calls me back, I will not know the answer.', jp: '彼が折り返し電話してこない限り、答えがわかりません。' },
  { en: 'Unless you wear a coat, you will catch a cold.', jp: 'コートを着ない限り、風邪をひきます。' },
  { en: 'Unless they fix the bridge, we cannot cross the river.', jp: '橋を直さない限り、私たちは川を渡れません。' },
  { en: 'Unless you ask, no one will tell you.', jp: 'あなたが聞かない限り、誰も教えてくれません。' },
]

const SUPERLATIVE_ADJ = [
  { en: 'interesting', jp: '面白い' },
  { en: 'difficult', jp: '難しい' },
  { en: 'beautiful', jp: '美しい' },
  { en: 'exciting', jp: 'わくわくする' },
  { en: 'delicious', jp: 'おいしい' },
  { en: 'boring', jp: '退屈な' },
  { en: 'useful', jp: '役に立つ' },
  { en: 'expensive', jp: '高価な' },
  { en: 'popular', jp: '人気のある' },
  { en: 'famous', jp: '有名な' },
]

/** Index-aligned with SUPERLATIVE_ADJ so each noun/verb actually fits its adjective
 * (e.g. "delicious" needs a meal, not a place) instead of being zipped arbitrarily. */
const NOUN_VERB_EVER = [
  { noun: 'book', verb: 'read', nounJp: '本', verbJp: '読んだ' },
  { noun: 'puzzle', verb: 'solved', nounJp: 'パズル', verbJp: '解いた' },
  { noun: 'place', verb: 'visited', nounJp: '場所', verbJp: '訪れた' },
  { noun: 'game', verb: 'played', nounJp: 'ゲーム', verbJp: 'した' },
  { noun: 'meal', verb: 'eaten', nounJp: '食事', verbJp: '食べた' },
  { noun: 'movie', verb: 'seen', nounJp: '映画', verbJp: '見た' },
  { noun: 'guide', verb: 'read', nounJp: '案内書', verbJp: '読んだ' },
  { noun: 'restaurant', verb: 'visited', nounJp: 'レストラン', verbJp: '訪れた' },
  { noun: 'painting', verb: 'seen', nounJp: '絵画', verbJp: '見た' },
  { noun: 'concert', verb: 'attended', nounJp: 'コンサート', verbJp: '行った' },
]

const WHAT_SAID_SENTENCES = [
  { en: 'What he said was not true.', jp: '彼が言ったことは本当ではありませんでした。' },
  { en: 'What she wrote was not clear.', jp: '彼女が書いたことは明確ではありませんでした。' },
  { en: 'What they promised was not fair.', jp: '彼らが約束したことは公平ではありませんでした。' },
  { en: 'What the teacher explained was not easy.', jp: '先生が説明したことは簡単ではありませんでした。' },
  { en: 'What my friend suggested was not practical.', jp: '友達が提案したことは現実的ではありませんでした。' },
  { en: 'What the report showed was not accurate.', jp: 'その報告書が示したことは正確ではありませんでした。' },
  { en: 'What he did was not kind.', jp: '彼がしたことは親切ではありませんでした。' },
  { en: 'What she believed was not correct.', jp: '彼女が信じていたことは正しくありませんでした。' },
  { en: 'What the news announced was not reliable.', jp: 'そのニュースが発表したことは信頼できるものではありませんでした。' },
  { en: 'What he promised was not honest.', jp: '彼が約束したことは正直なものではありませんでした。' },
]

const DONT_KNOW_WHY_SENTENCES = [
  { en: "I don't know why he is angry.", jp: '私は彼がなぜ怒っているのか分かりません。' },
  { en: "I don't know why she left early.", jp: '私は彼女がなぜ早く帰ったのか分かりません。' },
  { en: "I don't know why the train stopped.", jp: '私は電車がなぜ止まったのか分かりません。' },
  { en: "I don't know why they canceled the trip.", jp: '私は彼らがなぜ旅行を中止したのか分かりません。' },
  { en: "I don't know why he was late.", jp: '私は彼がなぜ遅れたのか分かりません。' },
  { en: "I don't know why she is crying.", jp: '私は彼女がなぜ泣いているのか分かりません。' },
  { en: "I don't know why the light turned red.", jp: '私はなぜ信号が赤になったのか分かりません。' },
  { en: "I don't know why he quit his job.", jp: '私は彼がなぜ仕事を辞めたのか分かりません。' },
  { en: "I don't know why the shop was closed.", jp: '私はなぜその店が閉まっていたのか分かりません。' },
  { en: "I don't know why she changed her mind.", jp: '私は彼女がなぜ考えを変えたのか分かりません。' },
]

const AS_IF_SENTENCES = [
  { en: 'He talks as if he knew everything.', jp: '彼はまるで全てを知っているかのように話します。' },
  { en: 'She acts as if she were the boss.', jp: '彼女はまるで上司であるかのように振る舞います。' },
  { en: 'He smiled as if nothing had happened.', jp: '彼はまるで何もなかったかのように微笑みました。' },
  { en: 'They behaved as if they were old friends.', jp: '彼らはまるで古い友人であるかのように振る舞いました。' },
  { en: 'She spoke as if she had seen a ghost.', jp: '彼女はまるで幽霊を見たかのように話しました。' },
  { en: 'He walked as if he owned the place.', jp: '彼はまるでその場所の持ち主であるかのように歩きました。' },
  { en: 'She laughed as if it were funny.', jp: '彼女はまるでそれが面白いことであるかのように笑いました。' },
  { en: 'He looked as if he had not slept.', jp: '彼はまるで眠っていなかったかのように見えました。' },
  { en: 'They acted as if nothing was wrong.', jp: '彼らはまるで何も問題がないかのように振る舞いました。' },
  { en: 'She talked as if she knew the answer.', jp: '彼女はまるで答えを知っているかのように話しました。' },
]

const NEVER_FORGET_SENTENCES = [
  { en: 'I will never forget the day when we first met.', jp: '私は初めて出会った日を決して忘れません。' },
  { en: 'I will never forget the day when I graduated.', jp: '私は卒業した日を決して忘れません。' },
  { en: 'I will never forget the summer when we traveled together.', jp: '私は一緒に旅行したあの夏を決して忘れません。' },
  { en: 'I will never forget the night when the stars were so bright.', jp: '私は星がとても明るかったあの夜を決して忘れません。' },
  { en: 'I will never forget the moment when I realized the truth.', jp: '私は真実に気づいたあの瞬間を決して忘れません。' },
  { en: 'I will never forget the year when we moved here.', jp: '私はここに引っ越したあの年を決して忘れません。' },
  { en: 'I will never forget the day when my sister was born.', jp: '私は妹が生まれた日を決して忘れません。' },
  { en: 'I will never forget the time when we got lost.', jp: '私は道に迷ったあの時を決して忘れません。' },
  { en: 'I will never forget the day when I passed the exam.', jp: '私は試験に合格した日を決して忘れません。' },
  { en: 'I will never forget the morning when it started snowing.', jp: '私は雪が降り始めたあの朝を決して忘れません。' },
]

const GERUND_SUBJECT = [
  { en: 'Listening to music', jp: '音楽を聞くこと' },
  { en: 'Reading novels', jp: '小説を読むこと' },
  { en: 'Playing the piano', jp: 'ピアノを弾くこと' },
  { en: 'Watching sunsets', jp: '夕日を見ること' },
  { en: 'Cooking for friends', jp: '友達のために料理をすること' },
  { en: 'Traveling abroad', jp: '海外を旅行すること' },
  { en: 'Painting pictures', jp: '絵を描くこと' },
  { en: 'Writing poems', jp: '詩を書くこと' },
  { en: 'Gardening', jp: 'ガーデニングをすること' },
  { en: 'Taking photographs', jp: '写真を撮ること' },
]

const PLEASURE_NOUN = [
  { en: 'my greatest pleasure', jp: '私の一番の楽しみ' },
  { en: 'my biggest joy', jp: '私の一番の喜び' },
  { en: 'my favorite hobby', jp: '私のお気に入りの趣味' },
  { en: 'a great joy for me', jp: '私にとって大きな喜び' },
  { en: 'my true passion', jp: '私の本当の情熱' },
]

// The real 2級 essay prompt is literally "give your opinion, with reasons" on
// a social topic, so these mirror that register (all original wording).
const OPINIONS = [
  { en: 'we should use more renewable energy', jp: 'もっと再生可能エネルギーを使うべきだ' },
  { en: 'technology has made our lives more convenient', jp: 'テクノロジーは私たちの生活をより便利にした' },
  { en: 'studying abroad is a valuable experience', jp: '留学は貴重な経験だ' },
  { en: 'the aging society is a serious problem', jp: '高齢化社会は深刻な問題だ' },
  { en: 'online communication cannot replace face-to-face conversation', jp: 'オンラインのコミュニケーションは対面の会話に取って代わることはできない' },
  { en: 'recycling should be mandatory', jp: 'リサイクルは義務化されるべきだ' },
  { en: 'working from home has both advantages and disadvantages', jp: '在宅勤務には利点と欠点の両方がある' },
  { en: 'education should focus more on critical thinking', jp: '教育はもっと批判的思考に重きを置くべきだ' },
  { en: 'globalization has changed the way we do business', jp: 'グローバル化は私たちのビジネスのやり方を変えた' },
  { en: "protecting the environment is everyone's responsibility", jp: '環境を守ることは全員の責任だ' },
]

const REASONS = [
  { en: 'it reduces air pollution', jp: 'それが大気汚染を減らすから' },
  { en: 'it saves natural resources', jp: 'それが天然資源を節約するから' },
  { en: 'it helps students learn new cultures', jp: 'それが生徒が新しい文化を学ぶ助けになるから' },
  { en: 'it improves communication skills', jp: 'それがコミュニケーション能力を向上させるから' },
  { en: 'it gives workers more free time', jp: 'それが労働者によりゆとりを与えるから' },
  { en: 'it reduces traffic in the city', jp: 'それが都市の交通を減らすから' },
  { en: 'it prepares students for the future', jp: 'それが生徒を将来に備えさせるから' },
  { en: 'it protects endangered species', jp: 'それが絶滅危惧種を守るから' },
  { en: 'it lowers medical costs', jp: 'それが医療費を減らすから' },
  { en: 'it creates new job opportunities', jp: 'それが新しい雇用機会を生み出すから' },
]

export const eiken2Questions: Question[] = [
  ...ADVICE_VP.map((a, i) =>
    q(`e2-t1-${i}`, `もし私があなたなら、${a.jp}。`, `If I were you, I would ${a.en}.`, '仮定法過去'),
  ),
  ...WHERE_CLAUSES.map((c, i) =>
    q(`e2-t2-${i}`, `これは${c.jp}家です。`, `This is the house where ${c.en}.`, '関係副詞 where'),
  ),
  ...PAST_PERFECT_SENTENCES.map((s, i) => q(`e2-t3-${i}`, s.jp, s.en, '過去完了')),
  ...ADJ_REASON_PAST.map((adj, i) => {
    const vp = VP_AFTER_ADJ[i % VP_AFTER_ADJ.length]
    return q(`e2-t4-${i}`, `${adj.jp}、${vp.jp}。`, `Being ${adj.en}, ${vp.en}.`, '分詞構文')
  }),
  ...VERB_OBJ_HAVE.map((v, i) => {
    const p = CAUSATIVE_PRONOUNS[i % CAUSATIVE_PRONOUNS.length]
    return q(`e2-t5-${i}`, `私は${p.jp}に${v.jp}。`, `I had ${p.en} ${v.en}.`, '使役動詞 have')
  }),
  ...FAMILY.map((f, i) => {
    const v = VERB_OBJ_MAKE[i % VERB_OBJ_MAKE.length]
    return q(`e2-t6-${i}`, `私の${f.jp}は私に${v.jp}。`, `My ${f.en} made me ${v.en}.`, '使役動詞 make')
  }),
  ...GERUND_DURATION_VP.map((g, i) => {
    const d = DURATION[i % DURATION.length]
    return q(`e2-t7-${i}`, `彼女は${d.jp}、${g.jp}。`, `She has been ${g.en} ${d.en}.`, '現在完了進行形')
  }),
  ...CLEFT_SENTENCES.map((s, i) => q(`e2-t8-${i}`, s.jp, s.en, '強調構文 It is 〜 that')),
  ...NOT_ONLY_SENTENCES.map((s, i) => q(`e2-t9-${i}`, s.jp, s.en, 'not only 〜 but also')),
  ...ADJ_CONCESSIVE.map((adj, i) => {
    const r = RESULT_VP[i % RESULT_VP.length]
    return q(`e2-t10-${i}`, `どんなに${adj.jp}、彼はいつも${r.jp}。`, `No matter how ${adj.en} he is, he always ${r.en}.`, '譲歩 no matter how')
  }),
  ...UNLESS_SENTENCES.map((s, i) => q(`e2-t11-${i}`, s.jp, s.en, '条件 unless')),
  ...SUPERLATIVE_ADJ.map((adj, i) => {
    const nv = NOUN_VERB_EVER[i % NOUN_VERB_EVER.length]
    return q(
      `e2-t12-${i}`,
      `これは私が今までに${nv.verbJp}中で一番${adj.jp}${nv.nounJp}です。`,
      `This is the most ${adj.en} ${nv.noun} I have ever ${nv.verb}.`,
      '最上級+現在完了',
    )
  }),
  ...WHAT_SAID_SENTENCES.map((s, i) => q(`e2-t13-${i}`, s.jp, s.en, '関係代名詞 what')),
  ...DONT_KNOW_WHY_SENTENCES.map((s, i) => q(`e2-t14-${i}`, s.jp, s.en, '間接疑問文')),
  ...AS_IF_SENTENCES.map((s, i) => q(`e2-t15-${i}`, s.jp, s.en, '仮定法 as if')),
  ...NEVER_FORGET_SENTENCES.map((s, i) => q(`e2-t16-${i}`, s.jp, s.en, '関係副詞 when')),
  ...JOBS.map((j, i) =>
    q(
      `e2-t17-${i}`,
      `彼女は${j.jp}になりたいと言いました。`,
      `She said that she wanted to be ${j.article} ${j.en}.`,
      '間接話法',
    ),
  ),
  ...GERUND_SUBJECT.map((g, i) => {
    const p = PLEASURE_NOUN[i % PLEASURE_NOUN.length]
    return q(`e2-t18-${i}`, `${g.jp}は${p.jp}です。`, `${g.en} is ${p.en}.`, '動名詞主語')
  }),
  ...OPINIONS.map((o, i) => q(`e2-t19-${i}`, `私は${o.jp}と思います。`, `I think that ${o.en}.`, '意見文 I think that')),
  ...REASONS.map((r, i) =>
    q(`e2-t20-${i}`, `一つの理由は${r.jp}ということです。`, `One reason is that ${r.en}.`, '理由を述べる'),
  ),
]
