/**
 * Everything about judging an arrangement of tiles: which orders count as
 * correct, whether a tile can come next, and which placed tiles are out of
 * place after a wrong answer.
 *
 * Two things this fixes over comparing against the one written sentence:
 * - The sentence-final `.`/`?`/`!` used to ride on the last word's tile, so
 *   the last word was given away without any thought about the order. The
 *   mark is now taken off the tiles and shown after the answer slots.
 * - With the mark gone, a sentence ending in a time phrase ("... yesterday")
 *   can just as correctly start with it ("Yesterday I ..."). Marking that
 *   wrong teaches a rule that isn't English, so those fronted orders are
 *   accepted too (see frontableTimePhrase).
 */

/** Takes the sentence-final punctuation off the last tile. */
export function splitFinalPunct(units: readonly string[]): { units: string[]; punct: string } {
  if (units.length === 0) return { units: [], punct: '' }
  const last = units[units.length - 1]
  const m = last.match(/^(.*?)([.?!]+)$/)
  if (!m || !m[1]) return { units: [...units], punct: '' }
  return { units: [...units.slice(0, -1), m[1]], punct: m[2] }
}

const DAY_NAMES = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
const PERIOD_NOUNS = ['day', 'week', 'month', 'year', 'weekend', 'night', 'morning', 'afternoon', 'evening']
const SEASONS = ['spring', 'summer', 'fall', 'autumn', 'winter']

/** How many words at the end of `lower` make up a time phrase that can open
 * the sentence instead, or 0. Deliberately short: `in the morning` or
 * `at night` often narrow a time just before them ("at ten in the morning"),
 * so moving them alone would change the meaning. */
function trailingTimePhraseLength(lower: readonly string[]): number {
  const n = lower.length
  const last = lower[n - 1]
  const prev = lower[n - 2]
  if (['yesterday', 'today', 'tomorrow', 'tonight'].includes(last)) return 1
  if (prev === 'last' || prev === 'next' || prev === 'every') {
    if ([...PERIOD_NOUNS, ...SEASONS, ...DAY_NAMES].includes(last)) return 2
  }
  if (prev === 'this' && [...PERIOD_NOUNS, ...SEASONS].includes(last) && last !== 'day' && last !== 'night') return 2
  if (prev === 'on' && DAY_NAMES.some((d) => last === d || last === `${d}s`)) return 2
  return 0
}

/** Words a statement can open with that make fronting a time phrase safe:
 * a pronoun or determiner subject, or `there`. An imperative ("Call me
 * tomorrow") or a name we can't tell from a verb is left alone. */
const SUBJECT_STARTS = new Set([
  'i', 'you', 'he', 'she', 'it', 'we', 'they', 'there',
  'my', 'your', 'his', 'her', 'its', 'our', 'their',
  'the', 'this', 'that', 'these', 'those', 'a', 'an',
])

/** A word right before the phrase that makes it part of something else
 * ("since last year", "from Monday"), so it can't move on its own. */
const BOUND_BEFORE = new Set([
  'since', 'until', 'till', 'from', 'by', 'for', 'of', 'before', 'after', 'than', 'as', 'about', 'to', 'and', 'or',
  'on', 'in', 'at', 'during', 'through',
])

/** Words that start a second clause or infinitive the time phrase might belong
 * to ("He said that he came yesterday", "She asked me to come tomorrow") —
 * fronting it would pull it into the main clause and change the meaning. */
const CLAUSE_MARKERS = new Set([
  'that', 'because', 'when', 'if', 'who', 'whom', 'which', 'where', 'whose', 'while', 'although', 'though', 'and',
  'but', 'or', 'so', 'until', 'before', 'after', 'than', 'what', 'how', 'why', 'unless', 'since', 'whether',
])
/** `to` is fine after these ("I'm going to visit Kyoto next week"): the
 * infinitive is the main verb phrase, not a clause of its own. */
const TO_OK_AFTER = new Set(['going', 'have', 'has', 'had', 'want', 'wants', 'wanted', 'like', 'plan', 'plans', 'planned'])

/** A subject pronoun past the first word starts a clause of its own, even
 * without a marker ("This is the pen I bought yesterday", "I wish I had
 * studied harder last year"). `you` and `it` are left out: they're just as
 * often objects ("I'll call you tomorrow"). */
const SECOND_SUBJECTS = new Set(['i', 'he', 'she', 'we', 'they'])
/** A preposition followed by an -ing verb ("talked about visiting Kyoto this
 * summer") may be what the time phrase belongs to. */
const PREP_BEFORE_ING = new Set(['about', 'of', 'for', 'in', 'at', 'on', 'without', 'like'])

const bare = (w: string) => w.toLowerCase().replace(/[.,?!]+$/, '')

/**
 * How many words at the end of a statement form a time phrase that could
 * just as correctly open it, or 0 when moving it isn't safe.
 */
export function frontableTimePhrase(words: readonly string[]): number {
  const n = words.length
  if (n < 3 || !words[n - 1].endsWith('.')) return 0
  if (words.slice(0, -1).some((w) => /[,.?!]$/.test(w))) return 0
  const lower = words.map(bare)
  const k = trailingTimePhraseLength(lower)
  if (k === 0 || n - k < 2) return 0
  if (!SUBJECT_STARTS.has(lower[0])) return 0
  if (BOUND_BEFORE.has(lower[n - k - 1])) return 0
  const body = lower.slice(0, n - k)
  // From the second word: an opening `that`/`this` is the subject's determiner.
  for (let i = 1; i < body.length; i++) {
    if (CLAUSE_MARKERS.has(body[i]) || SECOND_SUBJECTS.has(body[i])) return 0
    if (body[i].endsWith('ing') && PREP_BEFORE_ING.has(body[i - 1])) return 0
    if (body[i] === 'to' && !TO_OK_AFTER.has(body[i - 1] ?? '')) return 0
  }
  return k
}

/**
 * Every tile order that counts as correct, each as a list of tile strings
 * (final punctuation already removed). The first entry is always the written
 * sentence. `units` are the question's tiles in written order — a chunked
 * idiom is one entry — and `words` the underlying words.
 */
export function acceptedOrders(words: readonly string[], units: readonly string[]): string[][] {
  const canonical = splitFinalPunct(units).units
  const orders = [canonical]
  const moved = frontableTimePhrase(words)
  if (moved > 0) {
    // Move the same number of words, as whole tiles. If an idiom tile
    // straddles the boundary the alternative can't be built, so skip it.
    let count = 0
    let cut = canonical.length
    while (cut > 0 && count < moved) {
      cut--
      count += canonical[cut].split(' ').length
    }
    if (count === moved) orders.push([...canonical.slice(cut), ...canonical.slice(0, cut)])
  }
  return orders
}

/** Whether the tiles as placed form one of the accepted orders. */
export function isAccepted(placed: readonly string[], orders: readonly string[][]): boolean {
  return orders.some((o) => o.length === placed.length && o.every((w, i) => w === placed[i]))
}

/** Whether the slots filled so far (null for an empty one) agree with some
 * accepted order — the check-each-tile mode's test for a tile just placed.
 * Slots rather than a prefix, since a player can pull a tile out of the
 * middle and refill it. */
export function fitsSomeOrder(slots: readonly (string | null)[], orders: readonly string[][]): boolean {
  return orders.some((o) => o.length === slots.length && slots.every((w, i) => w === null || w === o[i]))
}

/** Positions (into `a`) of a longest common subsequence of `a` and `b`. */
function lcsPositions(a: readonly string[], b: readonly string[]): Set<number> {
  const dp = Array.from({ length: a.length + 1 }, () => new Array<number>(b.length + 1).fill(0))
  for (let i = a.length - 1; i >= 0; i--) {
    for (let j = b.length - 1; j >= 0; j--) {
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1])
    }
  }
  const keep = new Set<number>()
  let i = 0
  let j = 0
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      keep.add(i)
      i++
      j++
    } else if (dp[i + 1][j] >= dp[i][j + 1]) i++
    else j++
  }
  return keep
}

/**
 * Which placed tiles are out of order, as a flag per slot. Comparing slot by
 * slot marked everything after one misplaced word — one early slip turned the
 * whole row red and hid which word was actually wrong. Instead, the longest
 * run of tiles already in the right relative order stays unmarked and only
 * the tiles that would have to move are flagged. Measured against whichever
 * accepted order the answer is closest to.
 */
export function misplacedSlots(placed: readonly string[], orders: readonly string[][]): boolean[] {
  let best: Set<number> | null = null
  for (const o of orders) {
    const keep = lcsPositions(placed, o)
    if (!best || keep.size > best.size) best = keep
  }
  return placed.map((_, i) => !best?.has(i))
}
