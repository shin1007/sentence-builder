/**
 * Word-level lookups for the vocabulary audit (scripts/vocab-audit.ts):
 * reading the CEFR-J Wordlist and reducing the words in a sentence to the
 * headwords it lists.
 *
 * The wordlist only has dictionary forms (`go`, `child`), so a bank word like
 * `went` or `children` has to be traced back before it can be looked up. This
 * is a deliberately small lemmatizer — suffix rules plus a table of irregular
 * forms — tuned to the kind of English the question banks use. Whatever it
 * can't resolve is reported as "unlisted" rather than guessed at, so a miss
 * here shows up in the report instead of hiding a word.
 */

export type Cefr = 'A1' | 'A2' | 'B1' | 'B2'

export const CEFR_ORDER: readonly Cefr[] = ['A1', 'A2', 'B1', 'B2']

export const cefrRank = (level: Cefr): number => CEFR_ORDER.indexOf(level)

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
      } else if (ch === '"') {
        quoted = false
      } else {
        field += ch
      }
    } else if (ch === '"') {
      quoted = true
    } else if (ch === ',') {
      fields.push(field)
      field = ''
    } else {
      field += ch
    }
  }
  fields.push(field)
  return fields
}

/**
 * Headword → the lowest CEFR level it's listed at. A headword can appear
 * once per part of speech (`better` is A1 as an adjective, A2 as an adverb)
 * and can carry spelling variants (`color/colour`); each variant gets its own
 * key, and the easiest level wins since the audit can't tell which sense a
 * sentence uses.
 */
export function parseWordlist(csv: string): Map<string, Cefr> {
  const levels = new Map<string, Cefr>()
  const lines = csv.split(/\r?\n/).filter((line) => line.trim())
  for (const line of lines.slice(1)) {
    const [headword, , level] = parseCsvLine(line)
    if (!CEFR_ORDER.includes(level as Cefr)) continue
    for (const variant of headword.split('/')) {
      const key = variant.trim().toLowerCase()
      if (!key) continue
      const known = levels.get(key)
      if (!known || cefrRank(level as Cefr) < cefrRank(known)) levels.set(key, level as Cefr)
    }
  }
  return levels
}

/** Irregular inflections → base form. Regular ones are handled by rules. */
const IRREGULAR: Record<string, string> = {
  // be / have / do
  is: 'be', am: 'be', are: 'be', was: 'be', were: 'be', been: 'be', being: 'be',
  has: 'have', had: 'have', does: 'do', did: 'do', done: 'do',
  // verbs
  ate: 'eat', eaten: 'eat', became: 'become', began: 'begin', begun: 'begin', bought: 'buy', brought: 'bring',
  broke: 'break', broken: 'break', built: 'build', came: 'come', caught: 'catch', chose: 'choose',
  chosen: 'choose', dealt: 'deal', drank: 'drink', drew: 'draw', drawn: 'draw', drove: 'drive',
  driven: 'drive', fell: 'fall', fallen: 'fall', felt: 'feel', flew: 'fly', flown: 'fly',
  forgot: 'forget', forgotten: 'forget', found: 'find', gave: 'give', given: 'give', got: 'get',
  gotten: 'get', went: 'go', gone: 'go', grew: 'grow', grown: 'grow', heard: 'hear', held: 'hold',
  kept: 'keep', knew: 'know', known: 'know', left: 'leave', lent: 'lend', lost: 'lose', made: 'make',
  meant: 'mean', met: 'meet', paid: 'pay', ran: 'run', rang: 'ring', rode: 'ride', ridden: 'ride',
  rose: 'rise', risen: 'rise', said: 'say', sang: 'sing', sung: 'sing', sat: 'sit', saw: 'see',
  seen: 'see', sold: 'sell', sent: 'send', shook: 'shake', shot: 'shoot', slept: 'sleep',
  spoke: 'speak', spoken: 'speak', spent: 'spend', stood: 'stand', stole: 'steal', stolen: 'steal',
  swam: 'swim', swept: 'sweep', taught: 'teach', took: 'take', taken: 'take', told: 'tell',
  thought: 'think', threw: 'throw', thrown: 'throw', understood: 'understand', woke: 'wake',
  woken: 'wake', won: 'win', wore: 'wear', worn: 'wear', wrote: 'write', written: 'write',
  fought: 'fight', hid: 'hide', hidden: 'hide', led: 'lead', lay: 'lie', lain: 'lie', bit: 'bite',
  bitten: 'bite', blew: 'blow', blown: 'blow', froze: 'freeze', frozen: 'freeze', hung: 'hang',
  fed: 'feed', fled: 'flee', sought: 'seek', slid: 'slide', struck: 'strike', wept: 'weep',
  // plurals
  children: 'child', men: 'man', women: 'woman', people: 'person', feet: 'foot', teeth: 'tooth',
  mice: 'mouse', knives: 'knife', leaves: 'leaf', lives: 'life', wives: 'wife', shelves: 'shelf',
  // comparison
  better: 'good', best: 'good', worse: 'bad', worst: 'bad', more: 'many', most: 'many',
  less: 'little', least: 'little', further: 'far', farther: 'far',
  // pronouns the list files under a different form
  us: 'we', ourselves: 'we', themselves: 'they', yourself: 'you', yourselves: 'you',
}

/** Contractions → the full words they stand for. */
const CONTRACTIONS: Record<string, string[]> = {
  "can't": ['can', 'not'],
  "won't": ['will', 'not'],
  "shan't": ['shall', 'not'],
  "let's": ['let', 'us'],
  "i'm": ['i', 'be'],
  cannot: ['can', 'not'],
}

const CONTRACTION_SUFFIXES: [string, string[]][] = [
  ["n't", ['not']],
  ["'re", ['be']],
  ["'ve", ['have']],
  ["'ll", ['will']],
  ["'d", ['would']],
  // `'s` is is/has or a possessive; either way the stem is the word to check.
  ["'s", []],
  ["s'", []],
]

/**
 * Splits a sentence's words into lookup tokens: lowercased, punctuation
 * stripped, contractions expanded. A capitalized word that isn't the first
 * word (and isn't "I") is taken to be a name and dropped — the wordlist
 * doesn't list `Kyoto` or `Tom`, and they aren't vocabulary to grade.
 */
export function tokenize(words: readonly string[]): string[] {
  const tokens: string[] = []
  words.forEach((raw, index) => {
    const word = raw.replace(/[.,!?;:"()]/g, '').replace(/’/g, "'")
    if (!word || /\d/.test(word)) return
    if (index > 0 && word !== 'I' && /^[A-Z]/.test(word) && !/^I'/.test(word)) return
    let lower = word.toLowerCase()
    if (CONTRACTIONS[lower]) {
      tokens.push(...CONTRACTIONS[lower])
      return
    }
    for (const [suffix, expansion] of CONTRACTION_SUFFIXES) {
      if (lower.endsWith(suffix) && lower.length > suffix.length) {
        // `don't` → do + not; `doesn't` leaves `does`, which lookup() maps
        // back through the irregular table.
        lower = lower.slice(0, -suffix.length)
        tokens.push(...expansion)
        break
      }
    }
    tokens.push(...lower.split('-').filter(Boolean))
  })
  return tokens
}

const VOWEL = /[aeiou]/

/** Possible base forms of a token, most literal first. */
export function lemmaCandidates(token: string): string[] {
  const out = [token]
  if (IRREGULAR[token]) out.push(IRREGULAR[token])
  const add = (stem: string) => {
    if (stem.length >= 2) out.push(stem)
  }
  const undouble = (stem: string) => {
    // stopped → stopp → stop, bigger → bigg → big
    if (stem.length >= 3 && stem.at(-1) === stem.at(-2) && !VOWEL.test(stem.at(-1)!)) add(stem.slice(0, -1))
  }
  const strip = (suffix: string, replacements: string[]) => {
    if (!token.endsWith(suffix) || token.length <= suffix.length + 1) return
    const stem = token.slice(0, -suffix.length)
    for (const r of replacements) add(stem + r)
    undouble(stem)
  }
  strip('ies', ['y'])
  strip('ves', ['f', 'fe'])
  strip('ied', ['y'])
  strip('ier', ['y'])
  strip('iest', ['y'])
  strip('ily', ['y'])
  strip('es', ['', 'e'])
  strip('s', [''])
  strip('ed', ['', 'e'])
  strip('d', [''])
  strip('ing', ['', 'e'])
  strip('er', ['', 'e'])
  strip('est', ['', 'e'])
  strip('ly', ['', 'le'])
  return [...new Set(out)]
}

/**
 * The easiest CEFR level any plausible base form of `token` is listed at,
 * and that base form; undefined if none is listed.
 */
export function lookup(token: string, wordlist: Map<string, Cefr>): { lemma: string; level: Cefr } | undefined {
  let best: { lemma: string; level: Cefr } | undefined
  for (const candidate of lemmaCandidates(token)) {
    const level = wordlist.get(candidate)
    if (level && (!best || cefrRank(level) < cefrRank(best.level))) best = { lemma: candidate, level }
  }
  return best
}

/** Longest multi-word headword the list has that the audit tries to match
 * (`according to`, `in front of`). */
const MAX_PHRASE_WORDS = 3

/**
 * Looks up a sentence's tokens, preferring multi-word headwords: `according
 * to` is one A2 entry, and `according` on its own isn't listed at all.
 * Unlisted tokens come back with no level, keyed by the token itself.
 */
export function lookupTokens(tokens: readonly string[], wordlist: Map<string, Cefr>): { key: string; level?: Cefr }[] {
  const out: { key: string; level?: Cefr }[] = []
  for (let i = 0; i < tokens.length; ) {
    let matched = false
    for (let n = Math.min(MAX_PHRASE_WORDS, tokens.length - i); n >= 2; n--) {
      const phrase = tokens.slice(i, i + n).join(' ')
      const level = wordlist.get(phrase)
      if (level) {
        out.push({ key: phrase, level })
        i += n
        matched = true
        break
      }
    }
    if (matched) continue
    const found = lookup(tokens[i], wordlist)
    out.push(found ? { key: found.lemma, level: found.level } : { key: tokens[i] })
    i++
  }
  return out
}
