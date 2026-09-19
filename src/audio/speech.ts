/**
 * Reads sentences aloud via the browser's built-in Web Speech API. No audio
 * assets or network calls required — this is a silent no-op on browsers
 * without SpeechSynthesis support.
 */

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

function speak(text: string, lang: string, rate: number) {
  if (!isSpeechSupported()) return
  const synth = window.speechSynthesis
  synth.cancel()

  const utter = new SpeechSynthesisUtterance(text)
  utter.lang = lang
  utter.rate = rate

  const voices = synth.getVoices()
  const langPrefix = lang.slice(0, 2)
  const voice = voices.find((v) => v.lang === lang) ?? voices.find((v) => v.lang?.startsWith(langPrefix))
  if (voice) utter.voice = voice

  synth.speak(utter)
}

export function speakEnglish(text: string) {
  speak(text, 'en-US', 0.88)
}

export function speakJapanese(text: string) {
  speak(text, 'ja-JP', 1)
}
