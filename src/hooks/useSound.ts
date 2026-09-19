import { useCallback, useEffect, useRef, useState } from 'react'
import { soundEngine } from '../audio/soundEngine'

const SFX_KEY = 'wordrush.sfx'
const MUSIC_KEY = 'wordrush.music'

function readBool(key: string, fallback: boolean) {
  try {
    const raw = localStorage.getItem(key)
    return raw === null ? fallback : raw === '1'
  } catch {
    return fallback
  }
}

export function useSound() {
  const [sfxOn, setSfxOn] = useState(() => readBool(SFX_KEY, true))
  const [musicOn, setMusicOn] = useState(() => readBool(MUSIC_KEY, true))
  const unlocked = useRef(false)

  useEffect(() => {
    soundEngine.setSfxEnabled(sfxOn)
    try {
      localStorage.setItem(SFX_KEY, sfxOn ? '1' : '0')
    } catch {
      /* storage unavailable — preference just won't persist */
    }
  }, [sfxOn])

  useEffect(() => {
    soundEngine.setMusicEnabled(musicOn)
    try {
      localStorage.setItem(MUSIC_KEY, musicOn ? '1' : '0')
    } catch {
      /* storage unavailable — preference just won't persist */
    }
  }, [musicOn])

  const unlock = useCallback(() => {
    if (unlocked.current) return
    unlocked.current = true
    soundEngine.unlock()
    if (musicOn) soundEngine.startBgm()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    sfxOn,
    musicOn,
    toggleSfx: () => setSfxOn((v) => !v),
    toggleMusic: () => setMusicOn((v) => !v),
    unlock,
    tap: () => soundEngine.tap(),
    place: () => soundEngine.place(),
    remove: () => soundEngine.remove(),
    click: () => soundEngine.click(),
    correct: () => soundEngine.correct(),
    wrong: () => soundEngine.wrong(),
    combo: (tier: number) => soundEngine.combo(tier),
    tick: (urgent: boolean) => soundEngine.tick(urgent),
    countIn: () => soundEngine.countIn(),
    win: () => soundEngine.win(),
    lose: () => soundEngine.lose(),
    starPop: (delaySec: number) => soundEngine.starPop(delaySec),
  }
}
