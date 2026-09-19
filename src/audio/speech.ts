/**
 * Reads English sentences aloud via the browser's built-in Web Speech API.
 * No audio assets or network calls required — this is a silent no-op on
 * browsers without SpeechSynthesis support.
 */

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

export function speakEnglish(text: string) {
  if (!isSpeechSupported()) return
  const synth = window.speechSynthesis
  synth.cancel()

  const utter = new SpeechSynthesisUtterance(text)
  utter.lang = 'en-US'
  utter.rate = 0.88

  const voices = synth.getVoices()
  const voice = voices.find((v) => v.lang === 'en-US') ?? voices.find((v) => v.lang?.startsWith('en'))
  if (voice) utter.voice = voice

  synth.speak(utter)
}
