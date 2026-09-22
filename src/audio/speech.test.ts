import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { SPEECH_TIMEOUT_MS, isSpeechSupported, speakEnglish, speakJapanese } from './speech'

/** Minimal SpeechSynthesis stand-in. The test env is 'node' (see
 * vite.config.ts), so there's no window to patch — we install one, the same
 * manual-mock approach storage.test.ts uses for localStorage. */
class FakeUtterance {
  text: string
  lang = ''
  rate = 1
  voice: unknown = null
  onend: (() => void) | null = null
  onerror: (() => void) | null = null
  constructor(text: string) {
    this.text = text
  }
}

class FakeSynth {
  spoken: FakeUtterance[] = []
  cancelCount = 0
  /** When false, speak() never fires onend — the dropped-event case. */
  autoFinish = true

  getVoices() {
    return [{ lang: 'en-US' }, { lang: 'ja-JP' }]
  }

  speak(utter: FakeUtterance) {
    this.spoken.push(utter)
    if (this.autoFinish) utter.onend?.()
  }

  cancel() {
    this.cancelCount++
  }
}

let synth: FakeSynth

beforeEach(() => {
  synth = new FakeSynth()
  vi.stubGlobal('window', { speechSynthesis: synth })
  vi.stubGlobal('SpeechSynthesisUtterance', FakeUtterance)
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

describe('speech support detection', () => {
  it('reports support when the API is present', () => {
    expect(isSpeechSupported()).toBe(true)
  })

  it('resolves immediately and speaks nothing without the API', async () => {
    vi.stubGlobal('window', {})
    await expect(speakEnglish('hello there')).resolves.toBeUndefined()
    expect(synth.spoken).toHaveLength(0)
  })
})

describe('utterance completion', () => {
  it('resolves when the utterance reports it ended', async () => {
    await expect(speakEnglish('I like carrots.')).resolves.toBeUndefined()
    expect(synth.spoken).toHaveLength(1)
    expect(synth.spoken[0].lang).toBe('en-US')
  })

  it('resolves when the utterance reports an error', async () => {
    synth.autoFinish = false
    const done = speakJapanese('私はにんじんが好きです。')
    synth.spoken[0].onerror?.()
    await expect(done).resolves.toBeUndefined()
    // Resolved on the error, not by waiting out the timeout.
    expect(vi.getTimerCount()).toBe(0)
  })

  it('picks the voice matching the requested language', async () => {
    await speakJapanese('こんにちは')
    expect(synth.spoken[0].lang).toBe('ja-JP')
    expect(synth.spoken[0].voice).toEqual({ lang: 'ja-JP' })
  })
})

describe('dropped end events', () => {
  it('resolves after the timeout when onend never fires', async () => {
    synth.autoFinish = false
    const done = speakEnglish('There is an umbrella on the desk.')

    let resolved = false
    void done.then(() => {
      resolved = true
    })

    // Still waiting just before the cap — a healthy utterance gets its full
    // time to finish speaking.
    await vi.advanceTimersByTimeAsync(SPEECH_TIMEOUT_MS - 1)
    expect(resolved).toBe(false)

    await vi.advanceTimersByTimeAsync(1)
    await expect(done).resolves.toBeUndefined()
    expect(resolved).toBe(true)
  })

  it('cancels the stuck utterance so it cannot block the next one', async () => {
    synth.autoFinish = false
    const done = speakEnglish('stuck sentence')
    const cancelsBefore = synth.cancelCount

    await vi.advanceTimersByTimeAsync(SPEECH_TIMEOUT_MS)
    await done

    expect(synth.cancelCount).toBeGreaterThan(cancelsBefore)
  })

  it('does not resolve twice when onend fires after the timeout', async () => {
    synth.autoFinish = false
    const done = speakEnglish('late reporter')

    let resolveCount = 0
    void done.then(() => {
      resolveCount++
    })

    await vi.advanceTimersByTimeAsync(SPEECH_TIMEOUT_MS)
    synth.spoken[0].onend?.()
    await vi.advanceTimersByTimeAsync(0)

    expect(resolveCount).toBe(1)
  })

  it('clears the timeout once the utterance finishes normally', async () => {
    await speakEnglish('a normal sentence')
    // A leftover timer would keep firing cancel() on unrelated later speech.
    expect(vi.getTimerCount()).toBe(0)
  })
})
