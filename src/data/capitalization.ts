import { QUESTIONS } from './questions'

const bare = (word: string) => word.replace(/[.,!?;:"()]+$/g, '')

const midSentence = Object.values(QUESTIONS)
  .flat()
  .flatMap((question) => question.words.slice(1))
  .map(bare)

/**
 * Words the banks capitalize somewhere other than the start of a sentence
 * (`Kyoto`, `English`, `Mr.`), so the capital is part of the word itself.
 * A word that also turns up in lowercase mid-sentence is left out: `May` is
 * the month in "in May" but the modal in "May I …?", and a sentence-initial
 * capital on it is the ordinary kind.
 */
const CAPITALIZED_MID_SENTENCE = new Set(
  midSentence.filter((word) => /^[A-Z]/.test(word) && !midSentence.includes(word.toLowerCase())),
)

/** Proper nouns the banks only ever use at the start of a sentence, so the
 * rule above can't see them. capitalization.test.ts fails if one stops being
 * used, but a new one has to be added here by hand. */
export const SENTENCE_INITIAL_PROPER_NOUNS = new Set(['Jessica', 'Sam', 'Yuki', 'Nara', 'Christmas', 'Halloween'])

const SUBJECT_PRONOUNS = new Set(['I', 'we', 'you', 'he', 'she', 'they', 'it'])

/**
 * Whether a sentence-initial word keeps its capital when the first-word
 * capital hint is off. Only the sentence-start capital is a hint; `I` and its
 * contractions (`I'm`), names and places (`Tom`, `Kyoto`) and languages
 * (`English`) are spelled with a capital wherever they stand, and showing
 * `i'm` or `tom` would teach the wrong spelling.
 */
export function keepsCapital(word: string, nextWord?: string): boolean {
  const w = bare(word)
  if (!/^[A-Z]/.test(w)) return false
  if (w === 'I' || /^I'/.test(w)) return true
  // "May I …?" is the modal; "May is my favorite month." the month.
  if (w === 'May') return !SUBJECT_PRONOUNS.has(bare(nextWord ?? ''))
  return CAPITALIZED_MID_SENTENCE.has(w) || SENTENCE_INITIAL_PROPER_NOUNS.has(w)
}
