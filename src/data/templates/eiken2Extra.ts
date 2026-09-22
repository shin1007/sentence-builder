import type { Question } from '../../types'
import { q } from '../questionGen'

/**
 * Additional 英検2級-level questions for the advanced points the original
 * eiken2 bank didn't reach: modal speculation, used to / had better / seem to,
 * the perfect infinitive, the gerund-versus-infinitive contrast and gerund
 * idioms, correlative comparatives, the perfect passive, whose / why /
 * non-restrictive relatives, purposive so that, the past-perfect subjunctive
 * and I wish, inversion, and the future progressive.
 *
 * Written out sentence by sentence — see the note in eiken4Extra.ts. Each
 * `note` matches a grammar tag's label in data/grammar.ts exactly.
 */

interface Sentence {
  jp: string
  en: string
}

const build = (slot: string, note: string, sentences: Sentence[]): Question[] =>
  sentences.map((s, i) => q(`e2x-${slot}-${i}`, s.jp, s.en, note))

const MODAL_MIGHT: Sentence[] = [
  { jp: '彼は今家にいるかもしれません。', en: 'He may be at home now.' },
  { jp: '今日の午後は雨が降るかもしれません。', en: 'It might rain this afternoon.' },
  { jp: '彼女は駅で待っているかもしれません。', en: 'She could be waiting at the station.' },
  { jp: '彼らはまだ真実を知らないかもしれません。', en: 'They may not know the truth yet.' },
  { jp: 'これが最良の答えかもしれません。', en: 'This might be the best answer.' },
  { jp: '彼は正午前に戻ってくるかもしれません。', en: 'He may come back before noon.' },
  { jp: 'それは深刻な問題かもしれません。', en: 'That could be a serious problem.' },
  { jp: '彼女は今忙しいかもしれません。', en: 'She might be busy right now.' },
  { jp: 'そのニュースは本当ではないかもしれません。', en: 'The news may not be true.' },
  { jp: '彼は見た目より年上かもしれません。', en: 'He could be older than he looks.' },
]

const USED_TO: Sentence[] = [
  { jp: '私は子どものころバイオリンを弾いていました。', en: 'I used to play the violin as a child.' },
  { jp: '彼は以前ロンドンに住んでいました。', en: 'He used to live in London.' },
  { jp: '彼女は以前毎日歩いて学校へ行っていました。', en: 'She used to walk to school every day.' },
  { jp: '以前ここに小さな店がありました。', en: 'There used to be a small shop here.' },
  { jp: '私たちは以前毎年夏に祖父母を訪ねていました。', en: 'We used to visit our grandparents every summer.' },
  { jp: '父は何年も前にたばこを吸っていました。', en: 'My father used to smoke many years ago.' },
  { jp: '私は以前犬が怖かったです。', en: 'I used to be afraid of dogs.' },
  { jp: '彼らは以前放課後に一緒に遊んでいました。', en: 'They used to play together after school.' },
  { jp: 'この建物は以前図書館でした。', en: 'This building used to be a library.' },
  { jp: '彼女は以前毎朝5時に起きていました。', en: 'She used to get up at five every morning.' },
]

const HAD_BETTER: Sentence[] = [
  { jp: 'あなたは今日医者に診てもらったほうがよいです。', en: 'You had better see a doctor today.' },
  { jp: '私たちはもう出発したほうがよいです。', en: 'We had better leave now.' },
  { jp: 'あなたは食べすぎないほうがよいです。', en: 'You had better not eat too much.' },
  { jp: '彼は今夜レポートを終えたほうがよいです。', en: 'He had better finish the report tonight.' },
  { jp: 'あなたは傘を持っていったほうがよいです。', en: 'You had better take an umbrella with you.' },
  { jp: '私たちは明日の朝早く出発したほうがよいです。', en: 'We had better start early tomorrow morning.' },
  { jp: 'このことはだれにも言わないほうがよいです。', en: 'You had better not tell anyone about this.' },
  { jp: '彼女は数日休んだほうがよいです。', en: 'She had better rest for a few days.' },
  { jp: 'あなたはもう一度予定を確認したほうがよいです。', en: 'You had better check the schedule again.' },
  { jp: '彼らは彼女に謝ったほうがよいです。', en: 'They had better apologize to her.' },
]

const SEEM_TO: Sentence[] = [
  { jp: '彼は答えを知っているようです。', en: 'He seems to know the answer.' },
  { jp: '彼女は今日とても疲れているようです。', en: 'She seems to be very tired today.' },
  { jp: '彼らは新しいゲームを楽しんでいるようです。', en: 'They seem to enjoy the new game.' },
  { jp: 'その計画はうまくいっているようです。', en: 'The plan seems to work well.' },
  { jp: '彼はかぜをひいているようです。', en: 'He seems to have a cold.' },
  { jp: '彼女は新しい学校が好きなようです。', en: 'She seems to like her new school.' },
  { jp: 'その話は本当のようです。', en: 'The story seems to be true.' },
  { jp: '彼らは駅の近くに住んでいるようです。', en: 'They seem to live near the station.' },
  { jp: '彼は私の気持ちを理解しているようです。', en: 'He seems to understand my feelings.' },
  { jp: '天気はよくなってきているようです。', en: 'The weather seems to be getting better.' },
]

const PERFECT_INFINITIVE: Sentence[] = [
  { jp: '彼は鍵をなくしてしまったようです。', en: 'He seems to have lost his key.' },
  { jp: '彼女は有名な歌手だったと言われています。', en: 'She is said to have been a famous singer.' },
  { jp: '彼は私たちの約束を忘れてしまったようです。', en: 'He appears to have forgotten our promise.' },
  { jp: '彼らはもう出発してしまったようです。', en: 'They seem to have left already.' },
  { jp: 'この手紙は彼女が書いたと信じられています。', en: 'She is believed to have written this letter.' },
  { jp: '彼は留学していたようです。', en: 'He seems to have studied abroad.' },
  { jp: 'その電車は時間通りに到着したようです。', en: 'The train appears to have arrived on time.' },
  { jp: '彼女は仕事を終えてしまったようです。', en: 'She seems to have finished her work.' },
  { jp: 'この家は彼が建てたと言われています。', en: 'He is said to have built this house.' },
  { jp: '彼らは以前からの知り合いだったようです。', en: 'They seem to have known each other before.' },
]

const GERUND_VS_INFINITIVE: Sentence[] = [
  { jp: '私は京都で彼女に会ったことを覚えています。', en: 'I remember meeting her in Kyoto.' },
  { jp: 'ドアに鍵をかけるのを忘れないで。', en: "Don't forget to lock the door." },
  { jp: '彼は去年たばこをやめました。', en: 'He stopped smoking last year.' },
  { jp: '彼女は電話に出るために立ち止まりました。', en: 'She stopped to answer the phone.' },
  { jp: '明日傘を持ってくるのを忘れないで。', en: 'Remember to bring your umbrella tomorrow.' },
  { jp: '私はあの夕日を見たことを決して忘れません。', en: 'I will never forget seeing that sunset.' },
  { jp: '彼は彼女に秘密を話したことを後悔しました。', en: 'He regretted telling her the secret.' },
  { jp: '彼女は去年の春に中国語を学び始めました。', en: 'She began learning Chinese last spring.' },
  { jp: '私はクラシック音楽を聞くのが好きです。', en: 'I enjoy listening to classical music.' },
  { jp: '彼は来年留学することに決めました。', en: 'He decided to study abroad next year.' },
]

const GERUND_IDIOM: Sentence[] = [
  { jp: 'あなたに会えるのを楽しみにしています。', en: 'I am looking forward to seeing you.' },
  { jp: '過去のことを嘆いても仕方がありません。', en: 'It is no use crying over the past.' },
  { jp: '彼は試験の準備で忙しいです。', en: 'He is busy preparing for the exam.' },
  { jp: '彼女はその冗談に笑わずにはいられませんでした。', en: 'She could not help laughing at the joke.' },
  { jp: '私たちは家のそうじに2時間費やしました。', en: 'We spent two hours cleaning the house.' },
  { jp: '何が起こるかはわかりません。', en: 'There is no telling what will happen.' },
  { jp: '彼は早起きに慣れています。', en: 'He is used to getting up early.' },
  { jp: '今日は散歩をしたい気分です。', en: 'I feel like taking a walk today.' },
  { jp: 'あの古い寺は訪れる価値があります。', en: 'It is worth visiting that old temple.' },
  { jp: '彼らはその住所を見つけるのに苦労しました。', en: 'They had trouble finding the address.' },
]

const THE_MORE: Sentence[] = [
  { jp: '練習すればするほど上手になります。', en: 'The more you practice, the better you become.' },
  { jp: '年を取れば取るほど賢くなります。', en: 'The older he gets, the wiser he becomes.' },
  { jp: '早く始めるほど早く終わります。', en: 'The sooner you start, the sooner you finish.' },
  { jp: '熱心に勉強するほど多くを学びます。', en: 'The harder you study, the more you learn.' },
  { jp: '高く登れば登るほど寒くなりました。', en: 'The higher we climbed, the colder it became.' },
  { jp: '読めば読むほど理解が深まります。', en: 'The more I read, the more I understand.' },
  { jp: '長く待つほど状況は悪くなります。', en: 'The longer you wait, the worse it gets.' },
  { jp: '参加する人が多いほど楽しくなります。', en: 'The more people join, the more fun it is.' },
  { jp: '速く歩くほど早く着きます。', en: 'The faster you walk, the earlier you arrive.' },
  { jp: '心配しないほど幸せに感じます。', en: 'The less you worry, the happier you feel.' },
]

const PASSIVE_PERFECT: Sentence[] = [
  { jp: 'この橋は50年間使われてきました。', en: 'This bridge has been used for fifty years.' },
  { jp: 'その手紙はもう送られました。', en: 'The letter has been sent already.' },
  { jp: '私の自転車が盗まれました。', en: 'My bike has been stolen.' },
  { jp: 'これらの部屋は今朝そうじされました。', en: 'These rooms have been cleaned this morning.' },
  { jp: 'その本は多くの言語に翻訳されてきました。', en: 'The book has been translated into many languages.' },
  { jp: 'その問題はまだ解決されていません。', en: 'The problem has not been solved yet.' },
  { jp: 'あの歌は多くの人に愛されてきました。', en: 'That song has been loved by many people.' },
  { jp: '新しい図書館がみんなに開放されました。', en: 'The new library has been opened to everyone.' },
  { jp: 'チケットはすべてすでに売られました。', en: 'All the tickets have already been sold.' },
  { jp: 'その仕事はチームによって終えられました。', en: 'The work has been finished by the team.' },
]

const RELATIVE_WHOSE: Sentence[] = [
  { jp: '私は父親がパイロットの少年を知っています。', en: 'I know a boy whose father is a pilot.' },
  { jp: 'こちらは母親が音楽を教えている少女です。', en: 'This is the girl whose mother teaches music.' },
  { jp: '彼には姉がパリに住んでいる友人がいます。', en: 'He has a friend whose sister lives in Paris.' },
  { jp: 'あれは屋根が赤い家です。', en: 'That is the house whose roof is red.' },
  { jp: '私は息子が留学している女性に会いました。', en: 'I met a woman whose son studies abroad.' },
  { jp: 'こちらは私が大好きな本を書いた作家です。', en: 'This is the writer whose books I love.' },
  { jp: '彼女は目が青い猫を飼っています。', en: 'She has a cat whose eyes are blue.' },
  { jp: '彼は作文が賞を取った生徒です。', en: 'He is the student whose essay won the prize.' },
  { jp: '私には趣味が登山の友人がいます。', en: 'I have a friend whose hobby is climbing mountains.' },
  { jp: 'あれは店主がとても親切な店です。', en: 'That is the shop whose owner is very kind.' },
]

const RELATIVE_WHY: Sentence[] = [
  { jp: 'これが彼が遅れた理由です。', en: 'This is the reason why he was late.' },
  { jp: 'あなたが考えを変えた理由を教えてください。', en: 'Tell me the reason why you changed your mind.' },
  { jp: 'それが私がこの町を好きな理由です。', en: 'That is the reason why I like this town.' },
  { jp: '彼女が早く帰った理由を知っていますか。', en: 'Do you know the reason why she left early?' },
  { jp: 'これが私たちにもっと時間が必要な理由です。', en: 'This is the reason why we need more time.' },
  { jp: '彼がやめた理由はだれも知りません。', en: 'Nobody knows the reason why he quit.' },
  { jp: 'それが試合が中止になった理由でした。', en: 'That was the reason why the game was canceled.' },
  { jp: 'あなたが怒っている理由は理解しています。', en: 'I understand the reason why you are angry.' },
  { jp: 'これが起きた理由を説明してください。', en: 'Please explain the reason why this happened.' },
  { jp: 'これが私が英語を熱心に勉強する理由です。', en: 'This is the reason why I study English hard.' },
]

const NON_RESTRICTIVE: Sentence[] = [
  { jp: '私の兄は大阪に住んでいて、教師です。', en: 'My brother, who lives in Osaka, is a teacher.' },
  { jp: 'この本は去年読んだのですが、すばらしいです。', en: 'This book, which I read last year, is excellent.' },
  { jp: 'ブラウン先生は数学を教えていて、とても親切です。', en: 'Mr. Brown, who teaches us math, is very kind.' },
  { jp: '京都は古い都市で、多くの寺があります。', en: 'Kyoto, which is an old city, has many temples.' },
  { jp: '彼女の父は医者で、この病院で働いています。', en: 'Her father, who is a doctor, works at this hospital.' },
  { jp: 'そのコンサートは7時に始まり、すばらしかったです。', en: 'The concert, which started at seven, was wonderful.' },
  { jp: 'おじはカナダに住んでいて、私に手紙をくれました。', en: 'My uncle, who lives in Canada, sent me a letter.' },
  { jp: 'この車は父が買ったもので、とても速いです。', en: 'This car, which my father bought, is very fast.' },
  { jp: 'ユキは私のとなりに座っていて、バイオリンを弾きます。', en: 'Yuki, who sits next to me, plays the violin.' },
  { jp: 'あの博物館は去年開館し、とても人気があります。', en: 'That museum, which opened last year, is very popular.' },
]

const SO_THAT_CAN: Sentence[] = [
  { jp: '彼は試験に合格するために一生懸命勉強します。', en: 'He studies hard so that he can pass the exam.' },
  { jp: '彼女は私たちが理解できるようにゆっくり話しました。', en: 'She spoke slowly so that we could understand her.' },
  { jp: '私は電車に間に合うように早く出ました。', en: 'I left early so that I could catch the train.' },
  { jp: '覚えられるようにそれを書き留めなさい。', en: 'Write it down so that you can remember it.' },
  { jp: '彼は車を買えるようにお金をためました。', en: 'He saved money so that he could buy a car.' },
  { jp: '赤ちゃんが眠れるように静かにしてください。', en: 'Please be quiet so that the baby can sleep.' },
  { jp: '私たちは渋滞を避けられるように早く出発しました。', en: 'We started early so that we could avoid the traffic.' },
  { jp: '彼女は勝てるように毎日練習しました。', en: 'She practiced daily so that she could win.' },
  { jp: '私が読めるように明かりをつけてください。', en: 'Turn on the light so that I can read.' },
  { jp: '彼は私たちが場所を見つけられるように地図を書きました。', en: 'He wrote a map so that we could find the place.' },
]

const SUBJUNCTIVE_PAST_PERFECT: Sentence[] = [
  { jp: '真実を知っていたら、あなたに話していたでしょう。', en: 'If I had known the truth, I would have told you.' },
  { jp: 'もっと熱心に勉強していたら、彼は合格していたでしょう。', en: 'If he had studied harder, he would have passed.' },
  { jp: '雨が降らなかったら、私たちは出かけていたでしょう。', en: 'If it had not rained, we would have gone out.' },
  { jp: 'もっと早く出ていたら、彼女はバスに間に合ったでしょう。', en: 'If she had left earlier, she would have caught the bus.' },
  { jp: '私に頼んでいたら、私は来ていたでしょう。', en: 'If you had asked me, I would have come.' },
  { jp: '彼らが聞いていたら、その事故は起きなかったでしょう。', en: 'If they had listened, the accident would not have happened.' },
  { jp: 'タクシーに乗っていたら、もっと早く着いていたでしょう。', en: 'If we had taken a taxi, we would have arrived sooner.' },
  { jp: '彼が電話してくれていたら、私は彼を待っていたでしょう。', en: 'If he had called me, I would have waited for him.' },
  { jp: 'もっと練習していたら、彼女はコンテストで優勝したでしょう。', en: 'If she had practiced more, she would have won the contest.' },
  { jp: '地図を持っていたら、私たちは道に迷わなかったでしょう。', en: 'If we had brought a map, we would not have gotten lost.' },
]

const I_WISH: Sentence[] = [
  { jp: 'フランス語が話せたらいいのに。', en: 'I wish I could speak French.' },
  { jp: 'もっと自由な時間があればいいのに。', en: 'I wish I had more free time.' },
  { jp: 'あなたがここに一緒にいればいいのに。', en: 'I wish you were here with me.' },
  { jp: '彼の電話番号を知っていればいいのに。', en: 'I wish I knew his phone number.' },
  { jp: '今日の天気がもっとよければいいのに。', en: 'I wish the weather were better today.' },
  { jp: '鳥のように飛べたらいいのに。', en: 'I wish I could fly like a bird.' },
  { jp: '彼女がもっと近くに住んでいればいいのに。', en: 'I wish she lived closer to us.' },
  { jp: '去年もっと熱心に勉強していればよかったのに。', en: 'I wish I had studied harder last year.' },
  { jp: 'ここにもっと長くいられたらいいのに。', en: 'I wish we could stay here longer.' },
  { jp: 'あんなことを言わなければよかったのに。', en: 'I wish I had not said that.' },
]

const INVERSION: Sentence[] = [
  { jp: 'こんなに美しい夕日を見たことがありません。', en: 'Never have I seen such a beautiful sunset.' },
  { jp: '私は彼の計画をほとんど知りませんでした。', en: 'Little did I know about his plan.' },
  { jp: '彼がそんなミスをすることはめったにありません。', en: 'Seldom does he make such a mistake.' },
  { jp: '彼女は歌っただけでなく、踊りもしました。', en: 'Not only did she sing, but she also danced.' },
  { jp: 'こんなに悲しい話はめったに聞いたことがありません。', en: 'Rarely have I heard such a sad story.' },
  { jp: '以前これほど幸せを感じたことはありませんでした。', en: 'Never before had I felt so happy.' },
  { jp: 'そのときになって初めて私は真実を理解しました。', en: 'Only then did I understand the truth.' },
  { jp: '到着するとすぐに雨が降り始めました。', en: 'Hardly had I arrived when it started raining.' },
  { jp: 'どんなことがあってもこのドアを開けてはいけません。', en: 'Under no circumstances should you open this door.' },
  { jp: '景色がとても美しかったので私たちは長くとどまりました。', en: 'So beautiful was the view that we stayed longer.' },
]

const FUTURE_PROGRESSIVE: Sentence[] = [
  { jp: '私は駅であなたを待っているでしょう。', en: 'I will be waiting for you at the station.' },
  { jp: '彼女は明日のこの時間には勉強しているでしょう。', en: 'She will be studying at this time tomorrow.' },
  { jp: '彼らは来月ヨーロッパを旅行しているでしょう。', en: 'They will be traveling in Europe next month.' },
  { jp: '彼は今夜遅くまで働いているでしょう。', en: 'He will be working late tonight.' },
  { jp: 'あなたが着くころ私たちは夕食を食べているでしょう。', en: 'We will be having dinner when you arrive.' },
  { jp: '私はおじの家に滞在しているでしょう。', en: "I will be staying at my uncle's house." },
  { jp: '彼女は来年英語を教えているでしょう。', en: 'She will be teaching English next year.' },
  { jp: '彼らはそのとき試合を見ているでしょう。', en: 'They will be watching the game at that time.' },
  { jp: '彼は明日の朝ロンドンへ飛んでいるでしょう。', en: 'He will be flying to London tomorrow morning.' },
  { jp: 'あなたが戻るまで私たちはここで待っているでしょう。', en: 'We will be waiting here until you come back.' },
]

const NOTHING_MORE: Sentence[] = [
  { jp: '健康ほど大切なものはありません。', en: 'Nothing is more important than your health.' },
  { jp: '時間ほど貴重なものはありません。', en: 'Nothing is more precious than time.' },
  { jp: '秋のこの湖ほど美しいものはありません。', en: 'Nothing is more beautiful than this lake in autumn.' },
  { jp: '過ちを認めることほど難しいことはありません。', en: 'Nothing is more difficult than admitting a mistake.' },
  { jp: '真の友ほど価値のあるものはありません。', en: 'Nothing is more valuable than a true friend.' },
  { jp: '接戦の試合ほどわくわくするものはありません。', en: 'Nothing is more exciting than a close game.' },
  { jp: 'この辞書ほど役に立つものはありません。', en: 'Nothing is more useful than this dictionary.' },
  { jp: '熱いふろほどくつろげるものはありません。', en: 'Nothing is more relaxing than a hot bath.' },
  { jp: '彼の突然の訪問ほど驚いたことはありません。', en: 'Nothing is more surprising than his sudden visit.' },
  { jp: '静かな朝ほど心地よいものはありません。', en: 'Nothing is more pleasant than a quiet morning.' },
]

const INANIMATE_SUBJECT: Sentence[] = [
  { jp: 'このバスに乗れば博物館へ行けます。', en: 'This bus will take you to the museum.' },
  { jp: 'その知らせは彼女をとても喜ばせました。', en: 'The news made her very happy.' },
  { jp: 'この薬を飲めば気分がよくなるでしょう。', en: 'This medicine will make you feel better.' },
  { jp: '少し歩くと私たちは浜辺に着きました。', en: 'A short walk brought us to the beach.' },
  { jp: 'なぜあなたは考えを変えたのですか。', en: 'What made you change your mind?' },
  { jp: 'この写真を見ると子ども時代を思い出します。', en: 'This picture reminds me of my childhood.' },
  { jp: '大雨のせいで私たちは外出できませんでした。', en: 'The heavy rain prevented us from going out.' },
  { jp: '彼の助言のおかげで問題を解決できました。', en: 'His advice helped me solve the problem.' },
  { jp: 'この道を行けば駅に着きます。', en: 'This road will lead you to the station.' },
  { jp: 'あらしのせいで私たちは一日中家にいました。', en: 'The storm kept us at home all day.' },
]

const RELATIVE_OMITTED: Sentence[] = [
  { jp: 'これが私があなたに話した本です。', en: 'This is the book I told you about.' },
  { jp: '私たちが昨日見た映画はすばらしかったです。', en: 'The movie we saw yesterday was great.' },
  { jp: 'パーティーで会った男性は医者です。', en: 'The man I met at the party is a doctor.' },
  { jp: 'これがあなたが探していた鍵ですか。', en: 'Is this the key you were looking for?' },
  { jp: '彼女が作ったケーキはおいしかったです。', en: 'The cake she made was delicious.' },
  { jp: 'ラジオで聞いた歌は美しかったです。', en: 'The song I heard on the radio was beautiful.' },
  { jp: '私が一緒に働いている人たちはとても親切です。', en: 'The people I work with are very kind.' },
  { jp: 'これが祖父の建てた家です。', en: 'This is the house my grandfather built.' },
  { jp: '彼が書いた手紙は私を泣かせました。', en: 'The letter he wrote made me cry.' },
  { jp: '先週買ったかばんはもう壊れています。', en: 'The bag I bought last week is already broken.' },
]

export const eiken2ExtraQuestions: Question[] = [
  ...build('might', '推量の may/might/could', MODAL_MIGHT),
  ...build('usedto', 'used to 〜', USED_TO),
  ...build('hadbetter', 'had better 〜', HAD_BETTER),
  ...build('seemto', 'seem to 〜', SEEM_TO),
  ...build('perfinf', '完了不定詞 to have done', PERFECT_INFINITIVE),
  ...build('gerundinf', '動名詞と不定詞の使い分け', GERUND_VS_INFINITIVE),
  ...build('gerundidiom', '動名詞の慣用表現', GERUND_IDIOM),
  ...build('themore', 'the 比較級, the 比較級', THE_MORE),
  ...build('passiveperf', '現在完了の受動態', PASSIVE_PERFECT),
  ...build('whose', '関係代名詞 whose', RELATIVE_WHOSE),
  ...build('why', '関係副詞 why', RELATIVE_WHY),
  ...build('nonrestrictive', '関係代名詞の非制限用法', NON_RESTRICTIVE),
  ...build('sothatcan', '目的の so that 〜 can', SO_THAT_CAN),
  ...build('subjperfect', '仮定法過去完了', SUBJUNCTIVE_PAST_PERFECT),
  ...build('iwish', 'I wish 〜', I_WISH),
  ...build('inversion', '倒置', INVERSION),
  ...build('futureprog', '未来進行形', FUTURE_PROGRESSIVE),
  ...build('nothingmore', 'nothing is more 〜 than', NOTHING_MORE),
  ...build('inanimate', '無生物主語', INANIMATE_SUBJECT),
  ...build('relomitted', '関係代名詞の省略', RELATIVE_OMITTED),
]
