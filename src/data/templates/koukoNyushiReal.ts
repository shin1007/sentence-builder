import type { Question } from '../../types'
import { q } from '../questionGen'

/**
 * Real 公立高校入試 (public high school entrance exam) word-ordering questions,
 * adapted from official prefectural board of education past papers.
 *
 * Each entry's English sentence is reconstructed from the exam's own answer
 * key (正答表) — for the "choose 5 of 6 given words, name the word at
 * position 3 and 5" format, both positions are checked against the
 * reconstructed sentence before inclusion here. The Japanese prompt is a
 * new natural translation of that verified sentence (the source exams give
 * the sentence inside an English dialogue, not as a Japanese prompt to
 * translate), written for this game's translate-to-English mechanic.
 *
 * Sources (検査問題 = exam paper, 正答 = official answer key):
 * - 神奈川県 令和8年度 共通選抜 学力検査(英語) 問4
 *   https://www.pref.kanagawa.jp/documents/131902/1_r8eigo_zen_mon.pdf
 *   https://www.pref.kanagawa.jp/documents/131902/1_r8eigo_zen_sei.pdf
 * - 神奈川県 令和7年度 共通選抜 学力検査(英語) 問4
 *   https://www.pref.kanagawa.jp/documents/118043/1_r7eigo_zen_mon.pdf
 *   https://www.pref.kanagawa.jp/documents/118043/1_r7eigo_zen_sei.pdf
 * - 神奈川県 令和6年度 共通選抜 学力検査(英語) 問4
 *   https://www.pref.kanagawa.jp/documents/107635/r6eigo_zen_mon.pdf
 *   https://www.pref.kanagawa.jp/documents/107635/r6eigo_zen_sei.pdf
 * - 愛知県 令和5〜7年度 一般選抜 学力検査(英語) 大問2(2)
 *   https://www.pref.aichi.jp/uploaded/attachment/558347.pdf (R7問題) / 554792.pdf (R7正答)
 *   https://www.pref.aichi.jp/uploaded/attachment/510148.pdf (R6問題) / 510159.pdf (R6正答)
 *   https://www.pref.aichi.jp/uploaded/attachment/455085.pdf (R5問題) / 455084.pdf (R5正答)
 * - 函館ラ・サール高等学校(私立) 令和2年度 一般入試 英語
 *   https://www.h-lasalle.ed.jp/cms/wp-content/uploads/2022/06/R2SHS1eigo_mondai.pdf / R2SHS1eigo_kaitou.pdf (1/18実施)
 *   https://www.h-lasalle.ed.jp/cms/wp-content/uploads/2022/06/R2SHS2eigo_mondai.pdf / R2SHS2eigo_kaitou.pdf (2/18実施)
 * - 埼玉県 令和8年度 公立高等学校入学者選抜 学力検査(英語)
 *   https://www.pref.saitama.lg.jp/documents/279416/5_08_eigo.pdf (標準問題) / 5_08_eigo_tebiki.pdf (正答)
 *   https://www.pref.saitama.lg.jp/documents/279416/5_08_eigo_sentaku.pdf (学校選択問題) / 5_08_eigo_sentaku_tebiki.pdf (正答)
 * - 大阪府 令和8年度 一般選抜 学力検査(英語 A/B/C問題)
 *   https://www.pref.osaka.lg.jp/documents/129362/r08ippan-108eigo-b-mondai.pdf / r08ippan-108eigo-b-saishi.pdf (B問題・採点資料)
 *   https://www.pref.osaka.lg.jp/documents/129362/r08ippan-107eigo-a-mondai.pdf / r08ippan-107eigo-a-saishi.pdf (A問題・採点資料)
 *   https://www.pref.osaka.lg.jp/documents/129362/r08ippan-109eigo-c-mondai.pdf / r08ippan-109eigo-c-saishi.pdf (C問題・採点資料)
 */

const KANAGAWA_R8 = { region: '神奈川県', year: '令和8年度(2026年)' }
const KANAGAWA_R7 = { region: '神奈川県', year: '令和7年度(2025年)' }
const KANAGAWA_R6 = { region: '神奈川県', year: '令和6年度(2024年)' }
const AICHI_R7 = { region: '愛知県', year: '令和7年度(2025年)' }
const AICHI_R6 = { region: '愛知県', year: '令和6年度(2024年)' }
const AICHI_R5 = { region: '愛知県', year: '令和5年度(2023年)' }
const LASALLE_JAN = { region: '函館ラ・サール高等学校', year: '令和2年度(2020年)1月実施' }
const LASALLE_FEB = { region: '函館ラ・サール高等学校', year: '令和2年度(2020年)2月実施' }
const SAITAMA_R8_STD = { region: '埼玉県', year: '令和8年度(2026年) 学力検査問題(標準)' }
const SAITAMA_R8_SENTAKU = { region: '埼玉県', year: '令和8年度(2026年) 学校選択問題' }
const OSAKA_R8_A = { region: '大阪府', year: '令和8年度(2026年) 一般選抜 英語A問題' }
const OSAKA_R8_B = { region: '大阪府', year: '令和8年度(2026年) 一般選抜 英語B問題' }
const OSAKA_R8_C = { region: '大阪府', year: '令和8年度(2026年) 一般選抜 英語C問題' }

export const koukoNyushiRealQuestions: Question[] = [
  q(
    'kn-real-r7-1',
    '良い英語のプレゼンテーションをするために何をする必要があるか教えてもらえますか？',
    'Can you tell me what I need to do to make a good English presentation?',
    '整序作文(疑問詞+to不定詞)',
    KANAGAWA_R7,
  ),
  q(
    'kn-real-r7-2',
    '観光客が訪れるべき場所の一つは、かもめグリーンガーデンです。',
    'One of the places tourists should visit is Kamome Green Garden.',
    '整序作文(関係代名詞の省略)',
    KANAGAWA_R7,
  ),
  q(
    'kn-real-r7-3',
    '外国語を学ぶことはあなたの人生にとって重要だと思いますか？',
    'Do you think learning foreign languages is important in your life?',
    '整序作文(動名詞+that節の省略)',
    KANAGAWA_R7,
  ),
  q(
    'kn-real-r7-4',
    '私たちの街をもっときれいにするために、私たちにできることは何かありますか？',
    'Is there anything we can do to make our city cleaner?',
    '整序作文(不定詞+SVOC)',
    KANAGAWA_R7,
  ),
  q(
    'kn-real-r6-1',
    'ジェシカ、それは英語で何と呼ぶのですか？',
    'Jessica, what do you call it in English?',
    '整序作文(call O C の疑問文)',
    KANAGAWA_R6,
  ),
  q(
    'kn-real-r6-2',
    'サム、今日と明日、あなたにとってどちらの日が都合がいいですか？',
    'Sam, which day is better for you, today or tomorrow?',
    '整序作文(比較級)',
    KANAGAWA_R6,
  ),
  q(
    'kn-real-r6-3',
    '訪問者たちが脱いだ靴は全部、あの棚の上にあります。',
    'All the shoes visitors took off are on that shelf over there.',
    '整序作文(関係代名詞の省略)',
    KANAGAWA_R6,
  ),
  q(
    'kn-real-r6-4',
    'ルールのいくつかを理解するのは難しかったけれど、私はとても楽しかったです。',
    'Though it was difficult to understand some of the rules, I had so much fun.',
    '整序作文(形式主語 it + to不定詞)',
    KANAGAWA_R6,
  ),
  q(
    'kn-real-r8-1',
    'このバスに乗れば市立図書館まで行けますか？',
    'Does this bus take me to the city library?',
    '整序作文(無生物主語)',
    KANAGAWA_R8,
  ),
  q(
    'kn-real-r8-2',
    'インターネットによると、この映画は一部の人にとって長すぎるそうです。',
    'According to the internet, this movie is too long for some people.',
    '整序作文(too 〜 for A)',
    KANAGAWA_R8,
  ),
  q(
    'kn-real-r8-3',
    '私は修学旅行中に撮られた写真を見ています。',
    'I am looking at the pictures taken during the school trip.',
    '整序作文(過去分詞の後置修飾)',
    KANAGAWA_R8,
  ),
  q(
    'kn-real-r8-4',
    'インドには川がいくつありますか？',
    'How many rivers are there in India?',
    '整序作文(How many + there is/are)',
    KANAGAWA_R8,
  ),
  q(
    'kn-real-r8-5',
    '土曜日にやることがたくさんあるので、行けません。',
    "I can't go because I have many things to do on Saturday.",
    '整序作文(不定詞の形容詞的用法)',
    KANAGAWA_R8,
  ),
  q(
    'kn-real-aichi-r7-1',
    '生徒が借りた本の冊数は、夏休みと冬休みの前に増えました。',
    'The number of books borrowed by students increased before summer vacation and winter vacation.',
    '整序作文(過去分詞の後置修飾)',
    AICHI_R7,
  ),
  q(
    'kn-real-aichi-r6-1',
    '部屋の掃除より買い物の方が一般的だと知って、私は少し驚いています。',
    "I'm a little surprised to know that shopping is more common than cleaning the rooms.",
    '整序作文(比較級+動名詞)',
    AICHI_R6,
  ),
  q(
    'kn-real-aichi-r5-1',
    '次の日は忙しくなるので、雨が降り始める前の土曜日の朝に犬を散歩させるつもりです。',
    "I'm going to walk our dog on Saturday morning before it starts to rain, because I'll be busy the next day.",
    '整序作文(接続詞before)',
    AICHI_R5,
  ),
  q(
    'kn-real-lasalle-1',
    'あの女性はなんて美しいバッグを持っているのでしょう。',
    'What a beautiful bag that woman has!',
    '整序作文(感嘆文 What)',
    LASALLE_JAN,
  ),
  q(
    'kn-real-lasalle-2',
    '長い髪の女の子が向こうであなたを探しています。',
    'A girl with long hair is looking for you over there.',
    '整序作文(前置詞句の後置修飾)',
    LASALLE_JAN,
  ),
  q(
    'kn-real-lasalle-3',
    '写真を見せてくれてありがとうございます。',
    'Thank you for showing me those pictures.',
    '整序作文(前置詞for+動名詞)',
    LASALLE_JAN,
  ),
  q(
    'kn-real-lasalle-4',
    '台所に何か温かい食べ物はありますか？',
    'Is there anything hot to eat in the kitchen?',
    '整序作文(不定詞の形容詞的用法)',
    LASALLE_JAN,
  ),
  q(
    'kn-real-lasalle-5',
    'ラグビーを見ることほどわくわくすることはありません。',
    'Nothing is more exciting than watching rugby.',
    '整序作文(比較級 nothing is more 〜 than)',
    LASALLE_JAN,
  ),
  q(
    'kn-real-lasalle-6',
    '昨日はあまりに寒かったので、外出できませんでした。',
    'It was too cold to go out yesterday.',
    '整序作文(too 〜 to)',
    LASALLE_FEB,
  ),
  q(
    'kn-real-lasalle-7',
    '彼が何冊の本を持っているか、私は知りません。',
    "I don't know how many books he has.",
    '整序作文(間接疑問文)',
    LASALLE_FEB,
  ),
  q(
    'kn-real-lasalle-8',
    '東京で私が出会った少年は、中国出身でした。',
    'The boy I met in Tokyo was from China.',
    '整序作文(関係代名詞の省略)',
    LASALLE_FEB,
  ),
  q(
    'kn-real-lasalle-9',
    '父が描いた絵は美しかったです。',
    'The picture painted by my father was beautiful.',
    '整序作文(過去分詞の後置修飾)',
    LASALLE_FEB,
  ),
  q(
    'kn-real-saitama-1',
    'スタッフは、そのバッグは災害時に水が必要なときバケツのように水を貯めて運ぶことができると私たちに教えてくれました。',
    'The staff told us that the bag can store and carry water like a bucket when we need water during disasters.',
    '整序作文(that節)',
    SAITAMA_R8_STD,
  ),
  q(
    'kn-real-saitama-2',
    '彼はまた、道の駅が自分の仕事への誇りを持たせてくれたとも言っています。',
    'He also says that the roadside station has made him proud of his work.',
    '整序作文(make+O+C)',
    SAITAMA_R8_STD,
  ),
  q(
    'kn-real-saitama-3',
    'この技術は2017年にヨーロッパで製品として初めて販売されました。',
    'This technology was sold for the first time as a product in Europe in 2017.',
    '整序作文(受動態)',
    SAITAMA_R8_SENTAKU,
  ),
  q(
    'kn-real-osaka-1',
    '私はナゾーニについて話せてうれしいです。',
    'I am glad to talk about nasoni.',
    '整序作文(be動詞+glad+to不定詞)',
    OSAKA_R8_B,
  ),
  q(
    'kn-real-osaka-2',
    'あなたはこれまでに富士山に登ったことがありますか。',
    'Have you ever climbed Mt. Fuji?',
    '現在完了(経験)',
    OSAKA_R8_A,
  ),
  q(
    'kn-real-osaka-3',
    'あなたがもうすぐここを去ってしまうのは残念です。',
    "I'm sorry that you will leave here soon.",
    '語順選択問題(that節)',
    OSAKA_R8_C,
  ),
  q(
    'kn-real-osaka-4',
    '彼らは水で満たされたボトルを持っています。',
    'They have bottles filled with water.',
    '語順選択問題(過去分詞の後置修飾)',
    OSAKA_R8_C,
  ),
  q(
    'kn-real-osaka-5',
    '彼に自分の考えを表現させるのは難しかったです。',
    'It was difficult to let him express his idea.',
    '語順選択問題(使役動詞let)',
    OSAKA_R8_C,
  ),
]
