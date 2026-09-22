/**
 * Progress statistics tracker.
 *
 * For every question answered in a session we record:
 *   - firstTry   : answered correctly without any prior miss in the same session
 *   - recovered  : answered correctly after at least one miss in the same session
 *   - missedOnly : missed and the session ended without ever getting it right
 *
 * firstTry/recovered are recorded the moment a question is answered
 * correctly. missedOnly can only be known once the session is over — a miss
 * might still be recovered later in the same run — so GameScreen tallies the
 * still-unrecovered questions at the end and records them in one call.
 *
 * These are stored globally (not per-level) so the Progressscreen can show
 * an overall growth picture across all levels.
 */

const KEY = 'wordrush.progress'

export interface ProgressRecord {
  /** Total questions answered across all sessions. */
  totalAnswered: number
  /** Answered correctly on the first attempt (no miss before correct). */
  firstTry: number
  /** Had at least one miss before eventually getting it right. */
  recovered: number
  /** Missed and session ended without recovery (time-out / out-of-lives). */
  missedOnly: number
}

const DEFAULT: ProgressRecord = {
  totalAnswered: 0,
  firstTry: 0,
  recovered: 0,
  missedOnly: 0,
}

function readRecord(): ProgressRecord {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { ...DEFAULT }
    const parsed = JSON.parse(raw) as Partial<ProgressRecord>
    return {
      totalAnswered: parsed.totalAnswered ?? 0,
      firstTry: parsed.firstTry ?? 0,
      recovered: parsed.recovered ?? 0,
      missedOnly: parsed.missedOnly ?? 0,
    }
  } catch {
    return { ...DEFAULT }
  }
}

function writeRecord(record: ProgressRecord) {
  try {
    localStorage.setItem(KEY, JSON.stringify(record))
  } catch {
    /* storage unavailable */
  }
}

export function loadProgressRecord(): ProgressRecord {
  return readRecord()
}

/** Call when the player answers a question correctly on the first try. */
export function recordFirstTry() {
  const rec = readRecord()
  writeRecord({
    ...rec,
    totalAnswered: rec.totalAnswered + 1,
    firstTry: rec.firstTry + 1,
  })
}

/** Call when the player answers correctly after having missed at least once. */
export function recordRecovered() {
  const rec = readRecord()
  writeRecord({
    ...rec,
    totalAnswered: rec.totalAnswered + 1,
    recovered: rec.recovered + 1,
  })
}

/**
 * Call once at the end of a session with the number of questions that were
 * missed and never recovered in it. A count of 0 is a no-op.
 */
export function recordMissedOnly(count = 1) {
  if (count <= 0) return
  const rec = readRecord()
  writeRecord({
    ...rec,
    totalAnswered: rec.totalAnswered + count,
    missedOnly: rec.missedOnly + count,
  })
}

/** Reset all progress stats (for testing / user request). */
export function resetProgress() {
  writeRecord({ ...DEFAULT })
}
