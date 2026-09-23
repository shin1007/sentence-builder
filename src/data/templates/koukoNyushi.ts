import type { Question } from '../../types'
import { q } from '../questionGen'
import {
  THINGS,
  ANIMALS,
  FOODS,
  PLACES,
  DESTINATIONS,
  JOBS,
  INSTRUMENTS,
  LANGUAGES,
  FAMILY,
  PLACE_TYPES,
  SPORTS_PLAY,
  PLACES_OUTDOOR,
  DAYS_OF_WEEK,
  OBJECTS_WRITTEN,
} from '../vocab'

/** 'a' before a consonant sound, 'an' before a vowel sound. */
function articleFor(word: string): string {
  return /^[aeiou]/i.test(word) ? 'an' : 'a'
}

function cap(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

const GERUND_MOTION = [
  { en: 'running', jp: '走っている' },
  { en: 'sleeping', jp: '眠っている' },
  { en: 'swimming', jp: '泳いでいる' },
  { en: 'jumping', jp: '跳ねている' },
  { en: 'playing', jp: '遊んでいる' },
  { en: 'eating', jp: '食べている' },
  { en: 'sitting', jp: '座っている' },
  { en: 'walking', jp: '歩いている' },
  { en: 'resting', jp: '休んでいる' },
  { en: 'climbing', jp: '登っている' },
]

const ADJ_COMPARATIVE_ANIMAL = [
  { en: 'bigger', jp: '大きい' },
  { en: 'smaller', jp: '小さい' },
  { en: 'faster', jp: '速い' },
  { en: 'stronger', jp: '強い' },
  { en: 'cuter', jp: 'かわいい' },
  { en: 'taller', jp: '背が高い' },
  { en: 'heavier', jp: '重い' },
  { en: 'lighter', jp: '軽い' },
  { en: 'older', jp: '年をとっている' },
  { en: 'gentler', jp: 'おとなしい' },
]

const YEARS_NUM = [
  { en: 'two', jp: '2' },
  { en: 'three', jp: '3' },
  { en: 'four', jp: '4' },
  { en: 'five', jp: '5' },
  { en: 'six', jp: '6' },
  { en: 'seven', jp: '7' },
  { en: 'eight', jp: '8' },
  { en: 'nine', jp: '9' },
  { en: 'ten', jp: '10' },
  { en: 'twelve', jp: '12' },
]

const CHORES = [
  { en: 'clean the room', jp: '部屋をそうじさせました。' },
  { en: 'wash the dishes', jp: 'お皿を洗わせました。' },
  { en: 'do the homework', jp: '宿題をさせました。' },
  { en: 'walk the dog', jp: '犬の散歩をさせました。' },
  { en: 'take out the trash', jp: 'ゴミを出させました。' },
  { en: 'feed the cat', jp: '猫にえさをやらせました。' },
  { en: 'set the table', jp: 'テーブルの準備をさせました。' },
  { en: 'water the plants', jp: '植物に水をやらせました。' },
  { en: 'make the bed', jp: 'ベッドを整えさせました。' },
  { en: 'clean the bathroom', jp: 'おふろ場をそうじさせました。' },
]

const SVOC_ADJ = [
  { en: 'happy', jpEnding: 'うれしくなりました。' },
  { en: 'sad', jpEnding: '悲しくなりました。' },
  { en: 'surprised', jpEnding: '驚きました。' },
  { en: 'excited', jpEnding: 'わくわくしました。' },
  { en: 'nervous', jpEnding: '緊張しました。' },
  { en: 'worried', jpEnding: '心配になりました。' },
  { en: 'angry', jpEnding: '腹が立ちました。' },
  { en: 'proud', jpEnding: '誇らしくなりました。' },
  { en: 'lonely', jpEnding: '寂しくなりました。' },
  { en: 'upset', jpEnding: '腹立たしくなりました。' },
]

// Real 公立高校入試 reading/dialogue sections lean heavily on these fixed
// registers (results clauses, too-to, phone calls, directions), so these
// mirror that style without copying any exam text.
const SO_THAT_SENTENCES = [
  { en: 'The exam was so difficult that many students cried.', jp: '試験がとても難しかったので、多くの生徒が泣きました。' },
  { en: 'She practiced so hard that she won the contest.', jp: '彼女はとても一生懸命練習したので、コンテストで優勝しました。' },
  { en: 'He was so surprised that he could not speak.', jp: '彼はとても驚いたので、話すことができませんでした。' },
  { en: 'The bag was so heavy that I could not carry it alone.', jp: 'そのかばんはとても重かったので、一人では運べませんでした。' },
  { en: 'It was so noisy that I could not concentrate on my homework.', jp: 'とてもうるさかったので、宿題に集中できませんでした。' },
  { en: 'The movie was so long that we missed the last train.', jp: 'その映画はとても長かったので、私たちは終電を逃しました。' },
  { en: 'She was so kind that everyone liked her.', jp: '彼女はとても親切だったので、みんなが彼女を好きになりました。' },
  { en: 'The soup was so hot that I could not eat it.', jp: 'そのスープはとても熱かったので、食べられませんでした。' },
  { en: 'He ran so fast that no one could catch him.', jp: '彼はとても速く走ったので、誰も彼を捕まえられませんでした。' },
  { en: 'The room was so dirty that we spent all day cleaning it.', jp: '部屋はとても汚れていたので、一日中そうじに費やしました。' },
]

const TOO_TO_SENTENCES = [
  { en: 'This question was too difficult for me to answer.', jp: 'この問題は難しすぎて私には答えられませんでした。' },
  { en: 'The box was too heavy for him to lift.', jp: 'その箱は重すぎて彼には持ち上げられませんでした。' },
  { en: 'I was too busy to call you yesterday.', jp: '私は忙しすぎて昨日あなたに電話できませんでした。' },
  { en: 'The coffee was too hot to drink.', jp: 'そのコーヒーは熱すぎて飲めませんでした。' },
  { en: 'She was too tired to finish her homework.', jp: '彼女は疲れすぎて宿題を終えられませんでした。' },
  { en: 'The music was too loud for us to talk.', jp: '音楽がうるさすぎて私たちは話せませんでした。' },
  { en: 'This shirt is too small for me to wear.', jp: 'このシャツは小さすぎて私には着られません。' },
  { en: 'He was too nervous to speak in front of everyone.', jp: '彼は緊張しすぎてみんなの前で話せませんでした。' },
  { en: 'The water was too cold to swim in.', jp: '水が冷たすぎて泳げませんでした。' },
  { en: 'It was too dark to read the sign.', jp: '暗すぎて標識が読めませんでした。' },
]

const PHONE_EXPRESSIONS = [
  { en: 'May I speak to Mr. Sato, please?', jp: '佐藤さんをお願いできますか？' },
  { en: "Who's calling, please?", jp: 'どちら様でしょうか？' },
  { en: 'Just a moment, please.', jp: '少々お待ちください。' },
  { en: 'He is out right now.', jp: '彼はただいま外出しております。' },
  { en: 'Can I take a message?', jp: '伝言をお預かりしましょうか？' },
  { en: "I'll call you back later.", jp: '後でかけ直します。' },
  { en: 'You have the wrong number.', jp: '番号をお間違えです。' },
  { en: 'Could you speak more slowly?', jp: 'もう少しゆっくり話していただけますか？' },
  { en: "I'm sorry, but she is out now.", jp: '申し訳ございませんが、彼女は今外出しています。' },
  { en: 'Please tell him to call me back.', jp: '彼に折り返し電話するよう伝えてください。' },
]

const DIRECTIONS_EXPRESSIONS = [
  { en: 'Could you tell me the way to the station?', jp: '駅までの道を教えていただけますか？' },
  { en: 'Go straight and turn left at the second corner.', jp: 'まっすぐ行って、2つ目の角を左に曲がってください。' },
  { en: 'The library is right in front of the park.', jp: '図書館は公園のすぐ前にあります。' },
  { en: "You can't miss it.", jp: 'すぐに見つかりますよ。' },
  { en: 'It will take about ten minutes on foot.', jp: '歩いて10分ほどかかります。' },
  { en: 'Turn right at the traffic light.', jp: '信号を右に曲がってください。' },
  { en: 'The bookstore is between the bank and the cafe.', jp: '本屋は銀行とカフェの間にあります。' },
  { en: 'Walk along this street until you see the bridge.', jp: '橋が見えるまでこの道を歩いてください。' },
  { en: 'Is it far from here?', jp: 'ここから遠いですか？' },
  { en: 'You should take the bus from that stop.', jp: 'あのバス停からバスに乗るといいですよ。' },
]

export const koukoNyushiQuestions: Question[] = [
  // 受動態(過去)
  ...THINGS.map((t, i) => q(`kn-t1-${i}`, `この${t.jp}は日本で作られました。`, `This ${t.en} was made in Japan.`, '受動態(過去)')),
  // 関係代名詞(目的格・省略)
  ...THINGS.map((t, i) =>
    q(`kn-t2-${i}`, `これは私が昨日買った${t.jp}です。`, `This is the ${t.en} I bought yesterday.`, '関係代名詞(目的格・省略)'),
  ),
  // 現在分詞(後置修飾)
  ...ANIMALS.map((a, i) => {
    const g = GERUND_MOTION[i % GERUND_MOTION.length]
    return q(
      `kn-t3-${i}`,
      `川の近くで${g.jp}${a.jp}が見えます。`,
      `I can see ${articleFor(a.singular)} ${a.singular} ${g.en} near the river.`,
      '現在分詞(後置修飾)',
    )
  }),
  // 比較級
  ...ANIMALS.map((a, i) => {
    const adj = ADJ_COMPARATIVE_ANIMAL[i % ADJ_COMPARATIVE_ANIMAL.length]
    return q(`kn-t4-${i}`, `この${a.jp}はあの${a.jp}より${adj.jp}です。`, `This ${a.singular} is ${adj.en} than that one.`, '比較級')
  }),
  // 勧誘表現 Would you like ~?
  ...FOODS.map((f, i) => q(`kn-t5-${i}`, `${f.jp}はいかがですか？`, `Would you like some ${f.plural}?`, '勧誘表現 Would you like ~?')),
  // There is/are
  ...FOODS.map((f, i) =>
    q(`kn-t6-${i}`, `台所にはたくさんの${f.jp}があります。`, `There are a lot of ${f.plural} in the kitchen.`, 'There is/are'),
  ),
  // 関係副詞 where
  ...PLACES.map((p, i) =>
    q(`kn-t7-${i}`, `ここは私が彼女と初めて出会った${p.jp}です。`, `This is the ${p.en} where I first met her.`, '関係副詞 where'),
  ),
  // 不定詞(形容詞的用法)
  ...PLACES.map((p, i) =>
    q(`kn-t8-${i}`, `私は勉強するための静かな${p.jp}が必要です。`, `I need a quiet ${p.en} to study in.`, '不定詞(形容詞的用法)'),
  ),
  // as soon as
  ...PLACES.map((p, i) =>
    q(`kn-t9-${i}`, `${p.jp}に着いたらすぐに電話してください。`, `Please call me as soon as you arrive at the ${p.en}.`, 'as soon as'),
  ),
  // 現在完了(否定・経験)
  ...DESTINATIONS.map((d, i) =>
    q(`kn-t10-${i}`, `私は一度も${d.jp}に行ったことがありません。`, `I have never been to ${d.en}.`, '現在完了(否定・経験)'),
  ),
  // 受動態(現在)
  ...DESTINATIONS.map((d, i) =>
    q(`kn-t11-${i}`, `${d.jp}では多くの言語が話されています。`, `Many languages are spoken in ${d.en}.`, '受動態(現在)'),
  ),
  // 現在完了 + 不定詞
  ...DESTINATIONS.map((d, i) =>
    q(
      `kn-t12-${i}`,
      `彼女は来年の夏に${d.jp}を訪れることに決めました。`,
      `She has decided to visit ${d.en} next summer.`,
      '現在完了 + 不定詞',
    ),
  ),
  // 不定詞(名詞的用法・補語)
  ...JOBS.map((j, i) =>
    q(`kn-t13-${i}`, `私の夢は${j.jp}になることです。`, `My dream is to become ${j.article} ${j.en}.`, '不定詞(名詞的用法・補語)'),
  ),
  // want + O + to do
  ...JOBS.map((j, i) =>
    q(
      `kn-t14-${i}`,
      `父は私に${j.jp}になってほしいと思っています。`,
      `My father wants me to become ${j.article} ${j.en}.`,
      'want + O + to do',
    ),
  ),
  // 間接疑問文
  ...JOBS.map((j, i) =>
    q(`kn-t15-${i}`, `私は彼がなぜ${j.jp}になったのか知りません。`, `I don't know why he became ${j.article} ${j.en}.`, '間接疑問文'),
  ),
  // 現在完了(継続)
  ...INSTRUMENTS.map((ins, i) => {
    const n = YEARS_NUM[i % YEARS_NUM.length]
    return q(
      `kn-t16-${i}`,
      `彼は${n.jp}年間${ins.jp}を練習しています。`,
      `He has practiced the ${ins.en} for ${n.en} years.`,
      '現在完了(継続)',
    )
  }),
  // 知覚動詞 + doing
  ...INSTRUMENTS.map((ins, i) =>
    q(`kn-t17-${i}`, `隣で誰かが${ins.jp}を弾いているのが聞こえました。`, `I heard someone playing the ${ins.en} next door.`, '知覚動詞 + doing'),
  ),
  // 受動態(現在)
  ...LANGUAGES.map((l, i) =>
    q(`kn-t18-${i}`, `${l.jp}は多くの国で話されています。`, `${l.en} is spoken in many countries.`, '受動態(現在)'),
  ),
  // 疑問詞 + to不定詞
  ...LANGUAGES.map((l, i) =>
    q(`kn-t19-${i}`, `私は${l.jp}の話し方を知りません。`, `I don't know how to speak ${l.en}.`, '疑問詞 + to不定詞'),
  ),
  // 使役動詞 make
  ...FAMILY.map((f, i) => {
    const c = CHORES[i % CHORES.length]
    return q(`kn-t20-${i}`, `私の${f.jp}は私に${c.jp}`, `My ${f.en} made me ${c.en}.`, '使役動詞 make')
  }),
  // give + 人 + 物 (SVOO)
  ...FAMILY.map((f, i) =>
    q(`kn-t21-${i}`, `私は${f.jp}に素敵なプレゼントをあげるつもりです。`, `I will give my ${f.en} a nice present.`, 'give + 人 + 物 (SVOO)'),
  ),
  // so ~ that
  ...SO_THAT_SENTENCES.map((s, i) => q(`kn-t22-${i}`, s.jp, s.en, 'so ~ that')),
  // 付加疑問文
  ...PLACE_TYPES.map((p, i) =>
    q(`kn-t23-${i}`, `この${p.jp}は日曜日は開いていませんよね？`, `This ${p.en} isn't open on Sundays, is it?`, '付加疑問文'),
  ),
  // 比較級 + any other
  ...SPORTS_PLAY.map((s, i) =>
    q(
      `kn-t24-${i}`,
      `私にとって${s.jp}は他のどのスポーツよりわくわくします。`,
      `${cap(s.en)} is more exciting than any other sport to me.`,
      '比較級 + any other',
    ),
  ),
  // 過去進行形
  ...PLACES_OUTDOOR.map((p, i) =>
    q(`kn-t25-${i}`, `そのとき多くの子どもたちが${p.jp}で遊んでいました。`, `Many children were playing in the ${p.en} at that time.`, '過去進行形'),
  ),
  // be going to
  ...DAYS_OF_WEEK.map((d, i) =>
    q(`kn-t26-${i}`, `私は次の${d.jp}に祖母を訪ねるつもりです。`, `I am going to visit my grandmother next ${d.en}.`, 'be going to'),
  ),
  // 受動態(過去)
  ...OBJECTS_WRITTEN.map((o, i) =>
    q(`kn-t27-${i}`, `この${o.jp}は有名な作家によって書かれました。`, `This ${o.en} was written by a famous author.`, '受動態(過去)'),
  ),
  // 現在完了(経験)
  ...OBJECTS_WRITTEN.map((o, i) =>
    q(`kn-t28-${i}`, `あなたはこの${o.jp}を読んだことがありますか？`, `Have you ever read this ${o.en}?`, '現在完了(経験)'),
  ),
  // make + O + C (SVOC)
  ...SVOC_ADJ.map((a, i) =>
    q(`kn-t29-${i}`, `その知らせを聞いて、私は${a.jpEnding}`, `The news made me ${a.en}.`, 'make + O + C (SVOC)'),
  ),
  // 疑問詞 + to不定詞
  ...THINGS.map((t, i) =>
    q(`kn-t30-${i}`, `この${t.jp}の使い方を教えてください。`, `Please tell me how to use this ${t.en}.`, '疑問詞 + to不定詞'),
  ),
  // 使役動詞 let
  ...ANIMALS.map((a, i) =>
    q(
      `kn-t31-${i}`,
      `両親は私に${a.jp}を飼わせてくれました。`,
      `My parents let me keep ${articleFor(a.singular)} ${a.singular}.`,
      '使役動詞 let',
    ),
  ),
  // not only A but also B
  ...ANIMALS.map((a, i) => {
    const b = ANIMALS[(i + 7) % ANIMALS.length]
    return q(
      `kn-t32-${i}`,
      `この動物園には${a.jp}だけでなく${b.jp}もいます。`,
      `This zoo has not only ${a.plural} but also ${b.plural}.`,
      'not only A but also B',
    )
  }),
  // too ~ to
  ...TOO_TO_SENTENCES.map((s, i) => q(`kn-t33-${i}`, s.jp, s.en, 'too ~ to')),
  // 電話表現
  ...PHONE_EXPRESSIONS.map((s, i) => q(`kn-t34-${i}`, s.jp, s.en, '電話表現')),
  // 道案内表現
  ...DIRECTIONS_EXPRESSIONS.map((s, i) => q(`kn-t35-${i}`, s.jp, s.en, '道案内表現')),
]
