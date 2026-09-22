/**
 * Rough pixel width for a word tile, so a tile is sized to its word before
 * the browser has laid any text out (trailing punctuation barely adds width).
 *
 * Kept out of WordTile.tsx deliberately: a module that exports both
 * components and plain helpers opts out of React Fast Refresh.
 */
export function estimateTileWidth(word: string): number {
  const bare = word.replace(/[.,?!]/g, '')
  return Math.max(60, bare.length * 18 + 40)
}
