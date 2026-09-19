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
  const shown = displayWord ?? word
  return (
    <button
      className={`${styles.tile} ${COLOR_CLASSES[colorIndex % COLOR_CLASSES.length]}`}
      style={{ minWidth: estimateTileWidth(word) }}
      onClick={onClick}
      disabled={disabled}
      aria-label={`${shown} を置く`}
    >
      {shown}
    </button>
  )
}

export function AnswerSlot({
  word,
  displayWord,
  colorIndex,
  position,
  mismatch,
  onClick,
}: {
  word: string | null
  displayWord?: string
  colorIndex: number
  /** 1-indexed position in the answer row, for the accessible label. */
  position: number
  /** Marks this slot's tile as landing in the wrong position, once the round
   * has been scored, so learners can see exactly which words to move. */
  mismatch?: boolean
  onClick: () => void
}) {
  if (word === null) {
    return <div className={styles.slot} style={{ minWidth: 52 }} aria-label={`解答欄 ${position}：空`} />
  }
  const shown = displayWord ?? word
  return (
    <div className={`${styles.slot} ${styles.filled}`}>
      <button
        className={`${styles.tile} ${COLOR_CLASSES[colorIndex % COLOR_CLASSES.length]} ${mismatch ? styles.mismatch : ''}`}
        style={{ minWidth: estimateTileWidth(word) }}
        onClick={onClick}
        aria-label={`解答欄 ${position}：${shown}。タップで取り消し`}
      >
        {shown}
      </button>
    </div>
  )
}
