/**
 * Reads sentences aloud via the browser's built-in Web Speech API. No audio
 * assets or network calls required — this is a silent no-op on browsers
 * without SpeechSynthesis support.
 */

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

/** Resolves once the utterance finishes (or immediately if speech isn't
 * supported), so callers can wait for a sentence to actually finish being
 * read instead of racing it against a fixed timer. */
function speak(text: string, lang: string, rate: number): Promise<void> {
  if (!isSpeechSupported()) return Promise.resolve()
  const synth = window.speechSynthesis
  synth.cancel()

  return new Promise((resolve) => {
    try {
      const utter = new SpeechSynthesisUtterance(text)
      utter.lang = lang
      utter.rate = rate

      const voices = synth.getVoices()
      const langPrefix = lang.slice(0, 2)
      const voice = voices.find((v) => v.lang === lang) ?? voices.find((v) => v.lang?.startsWith(langPrefix))
      if (voice) utter.voice = voice

      // onerror also fires when a later speak() call cancels this one —
      // that's still "done" as far as a caller waiting on this promise is
      // concerned.
      utter.onend = () => resolve()
      utter.onerror = () => resolve()
      synth.speak(utter)
    } catch {
      // Some environments expose speechSynthesis but throw on use (no TTS
      // backend installed, etc.) — treat that the same as "done speaking"
      // rather than leaving the caller waiting forever.
      resolve()
    }
  })
}

export function speakEnglish(text: string): Promise<void> {
  return speak(text, 'en-US', 0.88)
}

export function speakJapanese(text: string): Promise<void> {
  return speak(text, 'ja-JP', 1)
}
