import { useState } from 'react'
import styles from './GameScreen.module.css'

const COLORS = ['#ffd23f', '#5be0c0', '#ff5f9e', '#ff8a3d', '#ffffff', '#a3ff7a']

interface Piece {
  id: number
  left: number
  color: string
  delay: number
  duration: number
  fallDist: number
  fallRot: number
  size: number
}

function makePieces(pieceCount: number): Piece[] {
  return Array.from({ length: pieceCount }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    color: COLORS[i % COLORS.length],
    delay: Math.random() * 0.15,
    duration: 0.7 + Math.random() * 0.6,
    fallDist: 160 + Math.random() * 180,
    fallRot: 220 + Math.random() * 400,
    size: 0.7 + Math.random() * 0.7,
  }))
}

export default function Confetti({ pieceCount = 26 }: { pieceCount?: number }) {
  // Scattering the pieces is random, so it's done once in a lazy initializer
  // rather than on every render — re-rolling the numbers mid-render would
  // reshuffle a burst that's already falling. Callers remount this component
  // (it's keyed by question) when they want a fresh burst.
  const [pieces] = useState<Piece[]>(() => makePieces(pieceCount))

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
