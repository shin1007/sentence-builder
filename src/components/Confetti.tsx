import { useMemo } from 'react'
import styles from './GameScreen.module.css'

const COLORS = ['#ffd23f', '#5be0c0', '#ff5f9e', '#ff8a3d', '#ffffff', '#a3ff7a']

export default function Confetti({ pieceCount = 26 }: { pieceCount?: number }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: pieceCount }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        color: COLORS[i % COLORS.length],
        delay: Math.random() * 0.15,
        duration: 0.7 + Math.random() * 0.6,
        fallDist: 160 + Math.random() * 180,
        fallRot: 220 + Math.random() * 400,
        size: 0.7 + Math.random() * 0.7,
      })),
    [pieceCount],
  )

  return (
    <div className={styles.confettiLayer}>
      {pieces.map((p) => (
        <span
          key={p.id}
          className={styles.confettiPiece}
          style={{
            left: `${p.left}%`,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `scale(${p.size})`,
            ['--fall-dist' as string]: `${p.fallDist}px`,
            ['--fall-rot' as string]: `${p.fallRot}deg`,
          }}
        />
      ))}
    </div>
  )
}
