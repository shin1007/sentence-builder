/**
 * The grammar taxonomy: one normalized tag per grammar point, from the very
 * first `This is a pen.` up to subjunctives and participle clauses.
 *
 * Why this layer exists: each question carries a free-form `note` written for
 * display, and those drifted apart across the six template files — `比較級`,
 * `比較級(-er)` and `整序作文(比較級)` are the same grammar point, and
 * `too 〜 to` vs `too ~ to` differ only by the width of a tilde. Review that
 * targets a grammar point (rather than the one sentence the player missed)
 * needs a stable id, so every note is mapped onto one of these tags.
 *
 * The list is deliberately wider than the current question banks: we can't
 * predict which points a player will be weak at, so the taxonomy covers the
 * standard 中学〜高校基礎 syllabus, and tags with no questions yet surface as
 * gaps to fill (see grammar.test.ts, which reports the uncovered tags).
 */

/** Broad area a grammar point belongs to, used for grouping in the UI. */
export type GrammarCategory =
  | 'basic'
  | 'question'
  | 'tense'
  | 'modal'
  | 'infinitive'
  | 'gerund'
  | 'participle'
  | 'comparison'
  | 'passive'
  | 'perfect'
  | 'relative'
  | 'clause'
  | 'pattern'
  | 'subjunctive'
  | 'modifier'
  | 'expression'
  | 'idiom'
  | 'advanced'

export const CATEGORY_LABELS: Record<GrammarCategory, string> = {
  basic: '基本文型',
  question: '疑問文・否定文',
  tense: '時制',
  modal: '助動詞',
  infinitive: '不定詞',
  gerund: '動名詞',
  participle: '分詞',
  comparison: '比較',
  passive: '受動態',
  perfect: '完了形',
  relative: '関係詞',
  clause: '接続詞・節',
  pattern: '文型(SVOO/SVOC)',
  subjunctive: '仮定法',
  modifier: '修飾・数量表現',
  expression: '場面表現',
  idiom: '熟語・群動詞',
  advanced: '発展構文',
}

/**
 * Roughly where a point sits in the usual learning order: 1 is the first
 * weeks of 中1, 5 is 高校の発展事項. It's independent of the level a question
 * happens to sit in — it's the dial for "review the most basic thing they're
 * still shaky on first".
 */
export type GrammarStage = 1 | 2 | 3 | 4 | 5

interface GrammarItemShape {
  id: string
  label: string
  category: GrammarCategory
  stage: GrammarStage
}

export const GRAMMAR_ITEMS = [
  // --- basic --------------------------------------------------------------
  { id: 'beCopula', label: 'be動詞(This is 〜)', category: 'basic', stage: 1 },
  { id: 'presentSimple', label: '一般動詞の現在形', category: 'basic', stage: 1 },
  { id: 'thirdPersonS', label: '三人称単数のs', category: 'basic', stage: 1 },
  { id: 'pronoun', label: '代名詞・所有格', category: 'basic', stage: 1 },
  { id: 'article', label: '冠詞 a/an/the', category: 'basic', stage: 1 },
  { id: 'plural', label: '名詞の複数形', category: 'basic', stage: 1 },
  { id: 'imperative', label: '命令文', category: 'basic', stage: 1 },
  { id: 'letsInvite', label: "Let's 〜", category: 'basic', stage: 1 },
  { id: 'prepositionPlace', label: '場所の前置詞', category: 'basic', stage: 1 },
  { id: 'prepositionTime', label: '時の前置詞', category: 'basic', stage: 1 },
  { id: 'thereIs', label: 'There is/are', category: 'basic', stage: 2 },

  // --- question / negation ------------------------------------------------
  { id: 'beQuestion', label: 'be動詞の疑問文', category: 'question', stage: 1 },
  { id: 'doQuestion', label: '一般動詞の疑問文', category: 'question', stage: 1 },
  { id: 'negation', label: '否定文', category: 'question', stage: 1 },
  { id: 'whatQuestion', label: '疑問詞 What', category: 'question', stage: 1 },
  { id: 'whoQuestion', label: '疑問詞 Who', category: 'question', stage: 1 },
  { id: 'whereQuestion', label: '疑問詞 Where', category: 'question', stage: 1 },
  { id: 'whenQuestion', label: '疑問詞 When', category: 'question', stage: 1 },
  { id: 'whyQuestion', label: '疑問詞 Why', category: 'question', stage: 2 },
  { id: 'whichQuestion', label: '疑問詞 Which', category: 'question', stage: 2 },
  { id: 'whoseQuestion', label: '疑問詞 Whose', category: 'question', stage: 2 },
  { id: 'howQuestion', label: '疑問詞 How', category: 'question', stage: 1 },
  { id: 'howMany', label: 'How many 〜?', category: 'question', stage: 2 },
  { id: 'howMuch', label: 'How much 〜?', category: 'question', stage: 2 },
  { id: 'howLong', label: 'How long 〜?', category: 'question', stage: 2 },
  { id: 'howOften', label: 'How often 〜?', category: 'question', stage: 3 },
  { id: 'indirectQuestion', label: '間接疑問文', category: 'question', stage: 4 },
  { id: 'tagQuestion', label: '付加疑問文', category: 'question', stage: 4 },
  { id: 'exclamatory', label: '感嘆文 What/How', category: 'question', stage: 4 },

  // --- tense --------------------------------------------------------------
  { id: 'presentProgressive', label: '現在進行形', category: 'tense', stage: 2 },
  { id: 'pastBe', label: 'be動詞の過去形', category: 'tense', stage: 2 },
  { id: 'pastSimple', label: '過去形(規則動詞)', category: 'tense', stage: 2 },
  { id: 'pastIrregular', label: '過去形(不規則動詞)', category: 'tense', stage: 2 },
  { id: 'pastProgressive', label: '過去進行形', category: 'tense', stage: 3 },
  { id: 'futureWill', label: '未来形 will', category: 'tense', stage: 2 },
  { id: 'beGoingTo', label: 'be going to', category: 'tense', stage: 2 },
  { id: 'futureProgressive', label: '未来進行形', category: 'tense', stage: 5 },

  // --- modal --------------------------------------------------------------
  { id: 'modalCan', label: '助動詞 can', category: 'modal', stage: 2 },
  { id: 'modalCanRequest', label: '依頼の Can/Could you 〜?', category: 'modal', stage: 2 },
  { id: 'modalMay', label: '助動詞 may', category: 'modal', stage: 2 },
  { id: 'modalMust', label: '助動詞 must', category: 'modal', stage: 3 },
  { id: 'modalHaveTo', label: 'have to 〜', category: 'modal', stage: 3 },
  { id: 'modalShould', label: 'should 〜', category: 'modal', stage: 3 },
  { id: 'modalWouldLike', label: 'Would you like 〜?', category: 'modal', stage: 3 },
  { id: 'modalShallWe', label: 'Shall we / Why don’t we 〜?', category: 'modal', stage: 3 },
  { id: 'modalMight', label: '推量の may/might/could', category: 'modal', stage: 4 },
  { id: 'modalUsedTo', label: 'used to 〜', category: 'modal', stage: 4 },
  { id: 'modalHadBetter', label: 'had better 〜', category: 'modal', stage: 5 },

  // --- infinitive ---------------------------------------------------------
  { id: 'infinitiveNoun', label: '不定詞(名詞的用法)', category: 'infinitive', stage: 3 },
  { id: 'infinitiveAdjective', label: '不定詞(形容詞的用法)', category: 'infinitive', stage: 3 },
  { id: 'infinitivePurpose', label: '不定詞(副詞的用法・目的)', category: 'infinitive', stage: 3 },
  { id: 'infinitiveEmotion', label: '不定詞(副詞的用法・感情の原因)', category: 'infinitive', stage: 3 },
  { id: 'itIsToDo', label: 'It is 〜 (for A) to do', category: 'infinitive', stage: 4 },
  { id: 'tooToDo', label: 'too 〜 to do', category: 'infinitive', stage: 4 },
  { id: 'enoughToDo', label: '〜 enough to do', category: 'infinitive', stage: 4 },
  { id: 'whToInfinitive', label: '疑問詞 + to不定詞', category: 'infinitive', stage: 4 },
  { id: 'wantObjectTo', label: 'want + O + to do', category: 'infinitive', stage: 4 },
  { id: 'tellAskObjectTo', label: 'tell/ask + O + to do', category: 'infinitive', stage: 4 },
  { id: 'causativeMake', label: '使役動詞 make', category: 'infinitive', stage: 4 },
  { id: 'causativeLet', label: '使役動詞 let', category: 'infinitive', stage: 4 },
  { id: 'causativeHave', label: '使役動詞 have', category: 'infinitive', stage: 5 },
  { id: 'helpDo', label: 'help + O + (to) do', category: 'infinitive', stage: 4 },
  { id: 'perceptionVerb', label: '知覚動詞 + doing/do', category: 'infinitive', stage: 4 },
  { id: 'seemTo', label: 'seem to 〜', category: 'infinitive', stage: 5 },
  { id: 'infinitivePerfect', label: '完了不定詞 to have done', category: 'infinitive', stage: 5 },

  // --- gerund -------------------------------------------------------------
  { id: 'gerundObject', label: '動名詞(目的語)', category: 'gerund', stage: 3 },
  { id: 'gerundSubject', label: '動名詞(主語)', category: 'gerund', stage: 4 },
  { id: 'gerundPreposition', label: '前置詞 + 動名詞', category: 'gerund', stage: 4 },
  { id: 'gerundVsInfinitive', label: '動名詞と不定詞の使い分け', category: 'gerund', stage: 5 },
  { id: 'gerundIdiom', label: '動名詞の慣用表現', category: 'gerund', stage: 5 },

  // --- participle ---------------------------------------------------------
  { id: 'participleAttributive', label: '分詞の前置修飾', category: 'participle', stage: 4 },
  { id: 'participlePresentModifier', label: '現在分詞の後置修飾', category: 'participle', stage: 4 },
  { id: 'participlePastModifier', label: '過去分詞の後置修飾', category: 'participle', stage: 4 },
  { id: 'prepPhraseModifier', label: '前置詞句の後置修飾', category: 'participle', stage: 3 },
  { id: 'participleClause', label: '分詞構文', category: 'participle', stage: 5 },

  // --- comparison ---------------------------------------------------------
  { id: 'comparativeEr', label: '比較級(-er)', category: 'comparison', stage: 3 },
  { id: 'comparativeMore', label: '比較級(more)', category: 'comparison', stage: 3 },
  { id: 'superlativeEst', label: '最上級(-est)', category: 'comparison', stage: 3 },
  { id: 'superlativeMost', label: '最上級(most)', category: 'comparison', stage: 3 },
  { id: 'asAs', label: '原級比較 as 〜 as', category: 'comparison', stage: 3 },
  { id: 'notAsAs', label: 'not as 〜 as', category: 'comparison', stage: 4 },
  { id: 'likeBetter', label: 'like 〜 better/best', category: 'comparison', stage: 3 },
  { id: 'comparativeEmphasis', label: '比較級の強調 much/far', category: 'comparison', stage: 4 },
  { id: 'comparativeAnyOther', label: '比較級 + any other', category: 'comparison', stage: 5 },
  { id: 'comparativeNothingMore', label: 'nothing is more 〜 than', category: 'comparison', stage: 5 },
  { id: 'theMoreTheMore', label: 'the 比較級, the 比較級', category: 'comparison', stage: 5 },

  // --- passive ------------------------------------------------------------
  { id: 'passivePresent', label: '受動態(現在)', category: 'passive', stage: 3 },
  { id: 'passivePast', label: '受動態(過去)', category: 'passive', stage: 3 },
  { id: 'passiveQuestion', label: '受動態の疑問文', category: 'passive', stage: 4 },
  { id: 'passiveModal', label: '助動詞 + 受動態', category: 'passive', stage: 4 },
  { id: 'passivePerfect', label: '現在完了の受動態', category: 'passive', stage: 5 },

  // --- perfect ------------------------------------------------------------
  { id: 'presentPerfectContinuation', label: '現在完了(継続)', category: 'perfect', stage: 4 },
  { id: 'presentPerfectExperience', label: '現在完了(経験)', category: 'perfect', stage: 4 },
  { id: 'presentPerfectCompletion', label: '現在完了(完了)', category: 'perfect', stage: 4 },
  { id: 'presentPerfectInfinitive', label: '現在完了 + 不定詞', category: 'perfect', stage: 4 },
  { id: 'superlativeEverPerfect', label: '最上級 + 現在完了(経験)', category: 'perfect', stage: 5 },
  { id: 'presentPerfectProgressive', label: '現在完了進行形', category: 'perfect', stage: 5 },
  { id: 'pastPerfect', label: '過去完了', category: 'perfect', stage: 5 },

  // --- relative -----------------------------------------------------------
  { id: 'relativeWho', label: '関係代名詞 who', category: 'relative', stage: 4 },
  { id: 'relativeWhich', label: '関係代名詞 which', category: 'relative', stage: 4 },
  { id: 'relativeThat', label: '関係代名詞 that', category: 'relative', stage: 4 },
  { id: 'relativeObject', label: '関係代名詞(目的格)', category: 'relative', stage: 4 },
  { id: 'relativeOmitted', label: '関係代名詞の省略', category: 'relative', stage: 5 },
  { id: 'relativeWhose', label: '関係代名詞 whose', category: 'relative', stage: 5 },
  { id: 'relativeWhat', label: '関係代名詞 what', category: 'relative', stage: 5 },
  { id: 'relativeAdverbWhere', label: '関係副詞 where', category: 'relative', stage: 5 },
  { id: 'relativeAdverbWhen', label: '関係副詞 when', category: 'relative', stage: 5 },
  { id: 'relativeAdverbWhy', label: '関係副詞 why', category: 'relative', stage: 5 },
  { id: 'relativeNonRestrictive', label: '関係代名詞の非制限用法', category: 'relative', stage: 5 },

  // --- clause -------------------------------------------------------------
  { id: 'becauseClause', label: '理由の because', category: 'clause', stage: 2 },
  { id: 'thatClause', label: '接続詞 that', category: 'clause', stage: 3 },
  { id: 'whenClause', label: '時の when', category: 'clause', stage: 3 },
  { id: 'ifClause', label: '条件の if', category: 'clause', stage: 3 },
  { id: 'untilBefore', label: 'until / before / after', category: 'clause', stage: 3 },
  { id: 'whileClause', label: '時の while', category: 'clause', stage: 4 },
  { id: 'asSoonAs', label: 'as soon as', category: 'clause', stage: 4 },
  { id: 'soThat', label: 'so 〜 that ...', category: 'clause', stage: 4 },
  { id: 'althoughClause', label: '譲歩の although/though', category: 'clause', stage: 4 },
  { id: 'bothAndEitherOr', label: 'both A and B / either A or B', category: 'clause', stage: 4 },
  { id: 'unlessClause', label: '条件 unless', category: 'clause', stage: 5 },
  { id: 'soThatCan', label: '目的の so that 〜 can', category: 'clause', stage: 5 },
  { id: 'noMatterHow', label: '譲歩 no matter how', category: 'clause', stage: 5 },
  { id: 'notOnlyButAlso', label: 'not only A but also B', category: 'clause', stage: 5 },

  // --- sentence patterns --------------------------------------------------
  { id: 'svcLook', label: 'SVC (look/become + 形容詞)', category: 'pattern', stage: 2 },
  { id: 'svooGive', label: 'SVOO (give + 人 + 物)', category: 'pattern', stage: 3 },
  { id: 'svooFor', label: 'SVO + for 人', category: 'pattern', stage: 3 },
  { id: 'svooAskTeach', label: 'SVOO (ask/teach + 人 + 事)', category: 'pattern', stage: 3 },
  { id: 'svocCall', label: 'SVOC (call O C)', category: 'pattern', stage: 3 },
  { id: 'svocMake', label: 'SVOC (make O C)', category: 'pattern', stage: 4 },

  // --- subjunctive --------------------------------------------------------
  { id: 'subjunctivePast', label: '仮定法過去', category: 'subjunctive', stage: 5 },
  { id: 'subjunctivePastPerfect', label: '仮定法過去完了', category: 'subjunctive', stage: 5 },
  { id: 'asIfClause', label: '仮定法 as if', category: 'subjunctive', stage: 5 },
  { id: 'iWish', label: 'I wish 〜', category: 'subjunctive', stage: 5 },

  // --- modifiers / quantity -----------------------------------------------
  { id: 'adjective', label: '形容詞', category: 'modifier', stage: 1 },
  { id: 'adverbFrequency', label: '頻度の副詞', category: 'modifier', stage: 2 },
  { id: 'someAny', label: 'some / any', category: 'modifier', stage: 2 },
  { id: 'manyMuch', label: 'many / much / a lot of', category: 'modifier', stage: 2 },
  { id: 'degreeTooAdjective', label: '程度の too + 形容詞', category: 'modifier', stage: 3 },
  { id: 'quantityTooMuch', label: 'too much / too many', category: 'modifier', stage: 4 },
  { id: 'fewLittle', label: 'a few / a little', category: 'modifier', stage: 4 },

  // --- situational expressions --------------------------------------------
  { id: 'greetingExpression', label: 'あいさつ・自己紹介', category: 'expression', stage: 1 },
  { id: 'shoppingExpression', label: '買い物表現', category: 'expression', stage: 2 },
  { id: 'restaurantExpression', label: 'レストラン表現', category: 'expression', stage: 2 },
  { id: 'letterExpression', label: '手紙・メール表現', category: 'expression', stage: 3 },
  { id: 'phoneExpression', label: '電話表現', category: 'expression', stage: 3 },
  { id: 'directionExpression', label: '道案内表現', category: 'expression', stage: 3 },

  // --- idioms (see templates/idioms.ts) -----------------------------------
  { id: 'phrasalVerb', label: '群動詞', category: 'idiom', stage: 2 },
  { id: 'verbIdiom', label: '動詞中心の熟語', category: 'idiom', stage: 2 },
  { id: 'beAdjectivePreposition', label: 'be + 形容詞 + 前置詞', category: 'idiom', stage: 2 },
  { id: 'groupPreposition', label: '群前置詞', category: 'idiom', stage: 2 },

  // --- advanced constructions ---------------------------------------------
  { id: 'cleftSentence', label: '強調構文 It is 〜 that', category: 'advanced', stage: 5 },
  { id: 'reportedSpeech', label: '間接話法', category: 'advanced', stage: 5 },
  { id: 'inanimateSubject', label: '無生物主語', category: 'advanced', stage: 5 },
  { id: 'inversion', label: '倒置', category: 'advanced', stage: 5 },
] as const satisfies readonly GrammarItemShape[]

/** Stable identifier for a grammar point, e.g. 'presentPerfectExperience'. */
export type GrammarId = (typeof GRAMMAR_ITEMS)[number]['id']

export interface GrammarItem extends GrammarItemShape {
  id: GrammarId
}

export const GRAMMAR_BY_ID = Object.fromEntries(GRAMMAR_ITEMS.map((item) => [item.id, item])) as Record<
  GrammarId,
  GrammarItem
>

/** Display name for a tag, e.g. 'presentPerfectExperience' → '現在完了(経験)'. */
export const grammarLabel = (id: GrammarId): string => GRAMMAR_BY_ID[id].label

/**
 * Notes are hand-written per template, so the same point is spelled a few
 * different ways. Fold the variations that carry no meaning — full-width vs
 * ASCII tilde, stray whitespace — before looking a note up.
 */
export const normalizeNote = (note: string): string => note.replace(/[~～]/g, '〜').replace(/\s+/g, ' ').trim()

/**
 * Display note → grammar tag. Keys are the notes as the templates write them
 * (after `normalizeNote`), including the `整序作文(...)` / `語順選択問題(...)`
 * wrappers the past-exam bank uses — those name the exercise format rather
 * than the grammar, so they map to the underlying point.
 *
 * grammar.test.ts fails if a bank note is missing here or if an entry here is
 * dead, so the table can't silently drift away from the banks.
 */
const NOTE_TO_GRAMMAR: Record<string, GrammarId> = {
  // eiken4
  'This is 〜.': 'beCopula',
  'I like 〜.': 'presentSimple',
  現在形: 'presentSimple',
  '三人称単数 s': 'thirdPersonS',
  形容詞: 'adjective',
  '場所を表す in': 'prepositionPlace',
  曜日: 'prepositionTime',
  'There is 〜.': 'thereIs',
  'Is this 〜?': 'beQuestion',
  'Do you 〜?': 'doQuestion',
  '疑問詞 What': 'whatQuestion',
  '疑問詞 Where': 'whereQuestion',
  '疑問詞 Whose': 'whoseQuestion',
  'How many 〜?': 'howMany',
  現在進行形: 'presentProgressive',
  '過去形(不規則)': 'pastIrregular',
  '比較級(-er)': 'comparativeEr',
  '助動詞 can': 'modalCan',

  // eiken3
  'There is/are': 'thereIs',
  'be going to': 'beGoingTo',
  'be planning to': 'infinitiveNoun',
  'want to 〜': 'infinitiveNoun',
  'want to be': 'infinitiveNoun',
  'need to 〜': 'infinitiveNoun',
  'try to 〜': 'infinitiveNoun',
  'have to 〜': 'modalHaveTo',
  'how to 〜': 'whToInfinitive',
  動名詞: 'gerundObject',
  手紙表現: 'letterExpression',
  最上級: 'superlativeEst',
  '条件の if': 'ifClause',
  '比較(好み)': 'likeBetter',
  '比較級(more)': 'comparativeMore',
  比較級: 'comparativeEr',
  '理由の because': 'becauseClause',
  過去形: 'pastSimple',
  過去進行形: 'pastProgressive',

  // eikenPre2
  'should 〜': 'modalShould',
  'so 〜 that': 'soThat',
  'too much 〜': 'quantityTooMuch',
  'too 〜 to': 'tooToDo',
  '原級比較 as〜as': 'asAs',
  受動態: 'passivePresent',
  '受動態(現在)': 'passivePresent',
  '受動態(過去)': 'passivePast',
  '現在分詞(形容詞的用法)': 'participlePresentModifier',
  '現在分詞(後置修飾)': 'participlePresentModifier',
  '過去分詞(形容詞的用法)': 'participlePastModifier',
  '現在完了(完了)': 'presentPerfectCompletion',
  '現在完了(経験)': 'presentPerfectExperience',
  '現在完了(否定・経験)': 'presentPerfectExperience',
  '現在完了(継続)': 'presentPerfectContinuation',
  '現在完了 + 不定詞': 'presentPerfectInfinitive',
  '疑問詞 + to不定詞': 'whToInfinitive',
  間接疑問文: 'indirectQuestion',
  '関係代名詞 that': 'relativeThat',
  '関係代名詞 who': 'relativeWho',

  // eiken2
  'not only 〜 but also': 'notOnlyButAlso',
  'not only A but also B': 'notOnlyButAlso',
  '仮定法 as if': 'asIfClause',
  仮定法過去: 'subjunctivePast',
  '使役動詞 have': 'causativeHave',
  '使役動詞 make': 'causativeMake',
  '使役動詞 let': 'causativeLet',
  分詞構文: 'participleClause',
  動名詞主語: 'gerundSubject',
  '強調構文 It is 〜 that': 'cleftSentence',
  '意見文 I think that': 'thatClause',
  理由を述べる: 'thatClause',
  '最上級+現在完了': 'superlativeEverPerfect',
  '条件 unless': 'unlessClause',
  現在完了進行形: 'presentPerfectProgressive',
  '譲歩 no matter how': 'noMatterHow',
  過去完了: 'pastPerfect',
  間接話法: 'reportedSpeech',
  '関係代名詞 what': 'relativeWhat',
  '関係副詞 when': 'relativeAdverbWhen',
  '関係副詞 where': 'relativeAdverbWhere',

  // koukoNyushi
  'as soon as': 'asSoonAs',
  'give + 人 + 物 (SVOO)': 'svooGive',
  'make + O + C (SVOC)': 'svocMake',
  'want + O + to do': 'wantObjectTo',
  '不定詞(名詞的用法・補語)': 'infinitiveNoun',
  '不定詞(形容詞的用法)': 'infinitiveAdjective',
  付加疑問文: 'tagQuestion',
  '勧誘表現 Would you like 〜?': 'modalWouldLike',
  '比較級 + any other': 'comparativeAnyOther',
  '知覚動詞 + doing': 'perceptionVerb',
  道案内表現: 'directionExpression',
  電話表現: 'phoneExpression',
  '関係代名詞(目的格・省略)': 'relativeObject',

  // koukoNyushiReal — the wrapper names the exercise format, not the grammar
  '整序作文(How many + there is/are)': 'howMany',
  '整序作文(be動詞+glad+to不定詞)': 'infinitiveEmotion',
  '整序作文(call O C の疑問文)': 'svocCall',
  '整序作文(too 〜 for A)': 'degreeTooAdjective',
  '整序作文(too 〜 to)': 'tooToDo',
  '整序作文(不定詞+SVOC)': 'svocMake',
  '整序作文(不定詞の形容詞的用法)': 'infinitiveAdjective',
  '整序作文(前置詞for+動名詞)': 'gerundPreposition',
  '整序作文(前置詞句の後置修飾)': 'prepPhraseModifier',
  '整序作文(動名詞+that節の省略)': 'thatClause',
  '整序作文(感嘆文 What)': 'exclamatory',
  '整序作文(比較級 nothing is more 〜 than)': 'comparativeNothingMore',
  '整序作文(比較級)': 'comparativeEr',
  '整序作文(無生物主語)': 'inanimateSubject',
  '整序作文(過去分詞の後置修飾)': 'participlePastModifier',
  '整序作文(間接疑問文)': 'indirectQuestion',
  '整序作文(関係代名詞の省略)': 'relativeOmitted',
  '語順選択問題(that節)': 'thatClause',
  '語順選択問題(使役動詞let)': 'causativeLet',
  '語順選択問題(過去分詞の後置修飾)': 'participlePastModifier',
}

/**
 * Labels double as note spellings: a template that writes a note identical to
 * a tag's label is tagged without needing a row in NOTE_TO_GRAMMAR. New
 * templates should do exactly that — the table above is for the older notes
 * whose wording predates the taxonomy.
 */
const LABEL_TO_GRAMMAR: Record<string, GrammarId> = Object.fromEntries(
  GRAMMAR_ITEMS.map((item) => [normalizeNote(item.label), item.id]),
)

/** The grammar tag a display note belongs to, or undefined if unmapped. */
export function grammarIdForNote(note: string | undefined): GrammarId | undefined {
  if (!note) return undefined
  const key = normalizeNote(note)
  return NOTE_TO_GRAMMAR[key] ?? LABEL_TO_GRAMMAR[key]
}

/** Every note spelling the table knows, so tests can flag dead entries. */
export const mappedNotes = (): readonly string[] => Object.keys(NOTE_TO_GRAMMAR)
