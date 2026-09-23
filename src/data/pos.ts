import { POS_LEXICON } from './posLexicon.generated'

/**
 * Parts of speech, one letter each:
 * n noun, v verb, m auxiliary (be/do/have/modals), a adjective, r adverb,
 * p preposition, d determiner (incl. possessive `'s`), o pronoun,
 * c conjunction, u number, i interjection.
 */
export type PosFlag = 'n' | 'v' | 'm' | 'a' | 'r' | 'p' | 'd' | 'o' | 'c' | 'u' | 'i'
export const POS_FLAG_ORDER: readonly PosFlag[] = ['n', 'v', 'm', 'a', 'r', 'p', 'd', 'o', 'c', 'u', 'i']

/** A tile's word as the lexicon keys it: lowercase, no punctuation. */
export const normalizeToken = (word: string): string =>
  word
    .replace(/’/g, "'")
    .replace(/[.,!?;:"()]/g, '')
    .toLowerCase()

/**
 * Every part of speech the word can be (from the CEFR-J Wordlist, see
 * scripts/pos-lexicon). Empty for a word the list doesn't have — a name,
 * usually — which callers should treat as "could be anything".
 */
export function posOf(word: string): ReadonlySet<PosFlag> {
  return new Set((POS_LEXICON[normalizeToken(word)] ?? '').split('').filter(Boolean) as PosFlag[])
}

/** The word can only be this part of speech. */
export function isOnly(word: string, flag: PosFlag): boolean {
  const pos = posOf(word)
  return pos.size === 1 && pos.has(flag)
}
