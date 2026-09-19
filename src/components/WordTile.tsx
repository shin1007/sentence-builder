import styles from './WordTile.module.css'

export function estimateTileWidth(word: string): number {
  const bare = word.replace(/[.,?!]/g, '')
  return Math.max(52, bare.length * 15 + 34)
}

const COLOR_CLASSES = [styles.c0, styles.c1, styles.c2, styles.c3, styles.c4]

export function WordTile({
  word,
  displayWord,
  colorIndex,
  onClick,
  disabled,
}: {
  word: string
  displayWord?: string
  colorIndex: number
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <button
      className={`${styles.tile} ${COLOR_CLASSES[colorIndex % COLOR_CLASSES.length]}`}
      style={{ minWidth: estimateTileWidth(word) }}
      onClick={onClick}
      disabled={disabled}
    >
      {displayWord ?? word}
    </button>
  )
}

export function AnswerSlot({
  word,
  displayWord,
  colorIndex,
  mismatch,
  onClick,
}: {
  word: string | null
  displayWord?: string
  colorIndex: number
  /** Marks this slot's tile as landing in the wrong position, once the round
   * has been scored, so learners can see exactly which words to move. */
  mismatch?: boolean
  onClick: () => void
}) {
  if (word === null) {
    return <div className={styles.slot} style={{ minWidth: 52 }} />
  }
  return (
    <div className={`${styles.slot} ${styles.filled}`}>
      <button
        className={`${styles.tile} ${COLOR_CLASSES[colorIndex % COLOR_CLASSES.length]} ${mismatch ? styles.mismatch : ''}`}
        style={{ minWidth: estimateTileWidth(word) }}
        onClick={onClick}
      >
        {displayWord ?? word}
      </button>
    </div>
  )
}
