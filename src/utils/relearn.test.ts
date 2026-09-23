import { describe, expect, it } from 'vitest'
import { RELEARN_GAP, countScored, insertRelearn } from './relearn'

const queue = ['a', 'b', 'c', 'd', 'e', 'f', 'g'].map((id) => ({ id }))

describe('insertRelearn', () => {
  it('puts a marked repeat RELEARN_GAP questions later', () => {
    const next = insertRelearn(queue, 1)
    expect(next).toHaveLength(queue.length + 1)
    expect(next[2 + RELEARN_GAP]).toEqual({ id: 'b', relearn: true })
    expect(next[1]).toBe(queue[1])
  })

  it('appends when the queue ends before the gap', () => {
    const next = insertRelearn(queue, queue.length - 2)
    expect(next.at(-1)).toEqual({ id: 'f', relearn: true })
    expect(insertRelearn(queue, queue.length - 1).at(-1)).toEqual({ id: 'g', relearn: true })
  })

  it('does not mutate the original', () => {
    insertRelearn(queue, 0)
    expect(queue).toHaveLength(7)
    expect(queue[0]).toEqual({ id: 'a' })
  })
})

describe('countScored', () => {
  it('skips repeats', () => {
    const next = insertRelearn(queue, 0)
    expect(countScored(next)).toBe(queue.length)
    expect(countScored(next, 1 + RELEARN_GAP + 1)).toBe(1 + RELEARN_GAP)
  })
})
