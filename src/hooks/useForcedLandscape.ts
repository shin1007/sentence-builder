import { useEffect, useState } from 'react'

/**
 * Measures the real visible viewport (via window.innerWidth/innerHeight, which
 * tracks mobile browser chrome correctly, unlike CSS vh/vw) and exposes it as
 * both state and CSS custom properties so the app-root can rotate 90deg to
 * simulate a fixed-landscape canvas when the device is held portrait.
 */
export function useForcedLandscape() {
  const [isPortrait, setIsPortrait] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.innerHeight > window.innerWidth
  })

  useEffect(() => {
    const root = document.documentElement

    const measure = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      root.style.setProperty('--app-vw', `${w}px`)
      root.style.setProperty('--app-vh', `${h}px`)
      setIsPortrait(h > w)
    }

    measure()
    window.addEventListener('resize', measure)
    window.addEventListener('orientationchange', measure)
    return () => {
      window.removeEventListener('resize', measure)
      window.removeEventListener('orientationchange', measure)
    }
  }, [])

  return isPortrait
}

/** Best-effort progressive enhancement: fullscreen + native orientation lock. */
export async function requestFullscreenLandscape() {
  const el = document.documentElement as HTMLElement & {
    requestFullscreen?: () => Promise<void>
    webkitRequestFullscreen?: () => Promise<void>
  }
  try {
    if (el.requestFullscreen) {
      await el.requestFullscreen()
    } else if (el.webkitRequestFullscreen) {
      await el.webkitRequestFullscreen()
    }
  } catch {
    // fullscreen not available/allowed — the CSS rotation fallback still works
  }
  try {
    const orientation = screen.orientation as ScreenOrientation & {
      lock?: (orientation: string) => Promise<void>
    }
    await orientation.lock?.('landscape')
  } catch {
    // orientation lock unsupported (most desktop browsers / iOS Safari) — ignore
  }
}
