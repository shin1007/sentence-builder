import type { Question } from '../../src/types'
import { normalizeToken, POS_FLAG_ORDER, type PosFlag } from '../../src/data/pos'
import { lemmaCandidates } from '../vocab-audit/lexicon'

/**
 * Builds the part-of-speech table the game uses to find noun phrases and to
 * recognise word-order mistakes (src/data/posLexicon.generated.ts): every
 * word the question banks use → the parts of speech the CEFR-J Wordlist
 * gives its base form.
 *
 * The wordlist has dictionary forms only, so inflected words are traced back
 * with the vocabulary audit's lemmatizer, and the ending narrows what the
 * base form's parts of speech can mean: `played` is the verb `play`, never
 * the noun; `bigger` is the adjective. Words it can't place (names, mostly)
 * are left out — the game treats an unknown word as "could be anything" and
 * leaves it alone.
 */

const CSV_POS: Record<string, PosFlag> = {
  noun: 'n',
  verb: 'v',
  'be-verb': 'm',
  'do-verb': 'm',
  'have-verb': 'm',
  'modal auxiliary': 'm',
  adjective: 'a',
  adverb: 'r',
  preposition: 'p',
  determiner: 'd',
  pronoun: 'o',
  conjunction: 'c',
  number: 'u',
  interjection: 'i',
  'infinitive-to': 'p',
}

/** Splits one CSV line, honoring double-quoted fields. */
function parseCsvLine(line: string): string[] {
  const fields: string[] = []
  let field = ''
  let quoted = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (quoted) {
      if (ch === '"' && line[i + 1] === '"') {
        field += '"'
        i++
      } else if (ch === '"') quoted = false
      else field += ch
    } else if (ch === '"') quoted = true
    else if (ch === ',') {
      fields.push(field)
      field = ''
    } else field += ch
  }
  fields.push(field)
  return fields
}

/** Single-word headword → every part of speech it's listed under. */
export function parseWordlistPos(csv: string): Map<string, Set<PosFlag>> {
  const table = new Map<string, Set<PosFlag>>()
  for (const line of csv.split(/\r?\n/).slice(1)) {
    if (!line.trim()) continue
    const [headword, pos] = parseCsvLine(line)
    const flag = CSV_POS[pos]
    if (!flag) continue
    for (const variant of headword.split('/')) {
      const key = variant.trim().toLowerCase()
      if (!key || key.includes(' ')) continue
      if (!table.has(key)) table.set(key, new Set())
      table.get(key)!.add(flag)
    }
  }
  return table
}

const PRONOUN_CONTRACTED = /^(i|you|he|she|it|we|they|that|what|there|who|where|here)'/

/** Parts of speech for a contracted form, which the wordlist doesn't list. */
function contractionPos(token: string): PosFlag[] {
  if (token.endsWith("n't")) return ['m']
  if (token === "let's") return ['v']
  if (PRONOUN_CONTRACTED.test(token)) return ['o']
  // `Tom's`, `mother's`: a possessive, which works like a determiner.
  if (token.endsWith("'s") || token.endsWith("s'")) return ['d']
  return []
}

/** Which of a base form's parts of speech an inflected ending can carry. */
function allowedForEnding(token: string, lemma: string): Set<PosFlag> | null {
  if (token === lemma) return null
  if (token.endsWith('ed')) return new Set(['v', 'a'])
  if (token.endsWith('ing')) return new Set(['v', 'n', 'a'])
  if (token.endsWith('ly')) return new Set(['r', 'a'])
  if (token.endsWith('er') || token.endsWith('est')) return new Set(['a', 'r'])
  if (token.endsWith('s')) return new Set(['n', 'v'])
  return null
}

/** An irregular form (`went`, `bought`, `children`) traced to a verb is a
 * verb form, whatever else the base form can be (`go` is also a noun). */
function allowedForIrregular(token: string, lemma: string, listed: ReadonlySet<PosFlag>): Set<PosFlag> | null {
  if (token === lemma || !listed.has('v')) return null
  return new Set(['v', 'a', 'm'])
}

export function posForToken(token: string, wordlist: Map<string, Set<PosFlag>>): PosFlag[] {
  if (token.includes("'")) return contractionPos(token)
  const flags = new Set<PosFlag>()
  for (const lemma of lemmaCandidates(token)) {
    const listed = wordlist.get(lemma)
    if (!listed) continue
    const allowed = allowedForEnding(token, lemma) ?? allowedForIrregular(token, lemma, listed)
    for (const flag of listed) if (!allowed || allowed.has(flag)) flags.add(flag)
  }
  return POS_FLAG_ORDER.filter((flag) => flags.has(flag))
}

/** Every bank word (normalized) → its parts of speech as a flag string. */
export function buildPosLexicon(questions: readonly Question[], csv: string): Record<string, string> {
  const wordlist = parseWordlistPos(csv)
  const tokens = new Set(questions.flatMap((question) => question.words.map(normalizeToken)).filter(Boolean))
  const table: Record<string, string> = {}
  for (const token of [...tokens].sort()) {
    const flags = posForToken(token, wordlist)
    if (flags.length > 0) table[token] = flags.join('')
  }
  return table
}

export function renderPosLexicon(table: Record<string, string>): string {
  const lines = Object.entries(table).map(([word, flags]) => `  ${JSON.stringify(word)}: '${flags}',`)
  return `// Generated by \`npm run pos:generate\` (scripts/pos-lexicon.ts) — do not edit by hand.
// Parts of speech from the CEFR-J Wordlist 1.5 (Tono Laboratory, TUFS); see scripts/data/README.md.
// Flags: see POS_FLAG_ORDER in src/data/pos.ts.
export const POS_LEXICON: Record<string, string> = {
${lines.join('\n')}
}
`
}
