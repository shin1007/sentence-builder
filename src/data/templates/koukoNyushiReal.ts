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
 */

const KANAGAWA_R8 = { region: '神奈川県', year: '令和8年度(2026年)' }
const KANAGAWA_R7 = { region: '神奈川県', year: '令和7年度(2025年)' }
const KANAGAWA_R6 = { region: '神奈川県', year: '令和6年度(2024年)' }

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
]
