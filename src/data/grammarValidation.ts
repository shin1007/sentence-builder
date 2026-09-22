import type { Question } from '../types'

/**
 * Structural sanity checks over the assembled question bank. This isn't a
 * real grammar checker — it can't tell "he go" from "he goes" — but the
 * templates generate hundreds of sentences per level by combining literal
 * English with vocab banks (see data/templates/*.ts), so the realistic
 * failure mode is a mechanical one: a leftover placeholder, a dropped
 * capital letter, a missing terminal punctuation mark, a doubled word from
 * a bad `%` index, or a stray character from a typo. These checks catch
 * that class of bug without risking false positives on legitimate but
 * unusual English (contractions, hyphenated compounds, proper nouns).
 */
/**
 * Subject/verb pairings that are always wrong in a well-formed sentence,
 * as lowercase "subject verb" keys. Hand-written sentences (data/templates/
 * *Extra.ts) are where agreement slips actually happen — a generated template
 * gets the verb right or wrong for all 20 of its sentences at once, but a
 * typed-out sentence can go wrong on its own.
 *
 * "he/she/it were" is deliberately absent: it is correct in the subjunctive
 * ("If I were you", "as if she were a child"), which the 英検2級 bank uses.
 */
const AGREEMENT_SLIPS = new Set([
  'he are',
  'he do',
  "he don't",
  'he have',
  'she are',
  'she do',
  "she don't",
  'she have',
  'it are',
  'it do',
  "it don't",
  'it have',
  'i is',
  'i are',
  'i has',
  'i does',
  "i doesn't",
  'you is',
  'you was',
  'you has',
  'you does',
  "you doesn't",
  'they is',
  'they was',
  'they has',
  'they does',
  "they doesn't",
  'we is',
  'we was',
  'we has',
  'we does',
  "we doesn't",
])

/**
 * Words that take "a" despite starting with a vowel letter (they begin with a
 * /j/ or /w/ sound) or "an" despite starting with a consonant letter (a silent
 * h). The article rule follows sound, not spelling, so a plain letter test
 * would flag these correct sentences.
 */
const A_BEFORE_VOWEL_LETTER = new Set([
  'university',
  'uniform',
  'unique',
  'union',
  'useful',
  'used',
  'user',
  'usual',
  'unit',
  'united',
  'universe',
  'european',
  'one',
  'once',
])
const AN_BEFORE_CONSONANT_LETTER = new Set(['hour', 'honest', 'honor', 'honour', 'heir'])

const bare = (word: string): string => word.replace(/[.,?!]$/, '').toLowerCase()

export function validateQuestion(question: Question): string[] {
  const issues: string[] = []
  const { words } = question

  if (words.length < 2) {
    issues.push(`sentence is too short (${words.length} word${words.length === 1 ? '' : 's'})`)
    return issues
  }

  const first = words[0]
  if (!/^[A-Z]/.test(first)) {
    issues.push(`does not start with a capital letter: "${first}"`)
  }

  const last = words[words.length - 1]
  if (!/[.?!]$/.test(last)) {
    issues.push(`does not end with terminal punctuation: "${last}"`)
  }

  words.forEach((word, i) => {
    if (word !== word.trim() || word === '') {
      issues.push(`word ${i} is blank or has stray whitespace: "${word}"`)
      return
    }
    // One word — letters or digits (years like "2017" appear in real exam
    // sentences), optionally with internal apostrophes/hyphens
    // (contractions, compounds like "face-to-face"), and at most one
    // trailing punctuation mark. Anything else (a leftover "${...}"
    // placeholder, stray braces, doubled punctuation) is a sign the
    // template generation went wrong.
    if (!/^[A-Za-z0-9]+(?:['-][A-Za-z0-9]+)*[.,?!]?$/.test(word)) {
      issues.push(`word ${i} has unexpected characters: "${word}"`)
    }
    if (i > 0 && word.toLowerCase() === words[i - 1].toLowerCase()) {
      issues.push(`word ${i} repeats the previous word: "${words[i - 1]} ${word}"`)
    }
    if (i > 0 && AGREEMENT_SLIPS.has(`${bare(words[i - 1])} ${bare(word)}`)) {
      issues.push(`subject and verb do not agree: "${words[i - 1]} ${word}"`)
    }
    if (i + 1 < words.length) {
      const article = bare(word)
      const next = bare(words[i + 1])
      const startsWithVowelLetter = /^[aeiou]/.test(next)
      if (article === 'a' && startsWithVowelLetter && !A_BEFORE_VOWEL_LETTER.has(next)) {
        issues.push(`should be "an" before "${next}": "a ${next}"`)
      }
      if (article === 'an' && !startsWithVowelLetter && !AN_BEFORE_CONSONANT_LETTER.has(next)) {
        issues.push(`should be "a" before "${next}": "an ${next}"`)
      }
    }
  })

  return issues
}

/** Runs {@link validateQuestion} over a whole bank, prefixing each issue
 * with the question id so a failure is easy to trace back to its source
 * template. */
export function validateQuestionBank(questions: readonly Question[]): string[] {
  const issues: string[] = []
  for (const question of questions) {
    for (const issue of validateQuestion(question)) {
      issues.push(`${question.id}: ${issue}`)
    }
  }
  return issues
}
