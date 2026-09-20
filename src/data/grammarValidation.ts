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
