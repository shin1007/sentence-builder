import { describe, expect, it } from 'vitest'
import {
  acceptedOrders,
  fitsSomeOrder,
  frontableTimePhrase,
  isAccepted,
  misplacedSlots,
  splitFinalPunct,
} from './answerCheck'
import { QUESTIONS } from '../data/questions'

const words = (s: string) => s.split(' ')

describe('splitFinalPunct', () => {
  it('takes the final mark off the last tile', () => {
    expect(splitFinalPunct(['Is', 'this', 'yours?'])).toEqual({ units: ['Is', 'this', 'yours'], punct: '?' })
    expect(splitFinalPunct(['I', 'will', 'give up.'])).toEqual({ units: ['I', 'will', 'give up'], punct: '.' })
  })

  it('leaves tiles alone when there is no final mark', () => {
    expect(splitFinalPunct(['Hello', 'there'])).toEqual({ units: ['Hello', 'there'], punct: '' })
  })

  it('leaves no tile in the bank still carrying a final mark', () => {
    for (const question of Object.values(QUESTIONS).flat()) {
      const { units, punct } = splitFinalPunct(question.words)
      expect(punct).not.toBe('')
      // Only the last tile: `Mr.` and `Mt.` keep their dots mid-sentence.
      expect(units[units.length - 1]).not.toMatch(/[.?!]$/)
    }
  })
})

describe('frontableTimePhrase', () => {
  it('finds a time phrase that can open a simple statement', () => {
    expect(frontableTimePhrase(words('I cleaned my room yesterday.'))).toBe(1)
    expect(frontableTimePhrase(words('He is going to visit Kyoto next week.'))).toBe(2)
    expect(frontableTimePhrase(words('We have a test on Thursday.'))).toBe(2)
  })

  it('leaves questions, imperatives and bound phrases alone', () => {
    expect(frontableTimePhrase(words('Did you clean your room yesterday?'))).toBe(0)
    expect(frontableTimePhrase(words('Please call me tomorrow.'))).toBe(0)
    expect(frontableTimePhrase(words('I have lived here since last year.'))).toBe(0)
  })

  it('leaves a phrase that may belong to a second clause alone', () => {
    expect(frontableTimePhrase(words('This is the pen I bought yesterday.'))).toBe(0)
    expect(frontableTimePhrase(words('I wish I had studied harder last year.'))).toBe(0)
    expect(frontableTimePhrase(words('He said that he came yesterday.'))).toBe(0)
    expect(frontableTimePhrase(words('She asked me to come tomorrow.'))).toBe(0)
    expect(frontableTimePhrase(words('We talked about visiting Kyoto this summer.'))).toBe(0)
  })
})

describe('acceptedOrders', () => {
  it('puts the written order first and adds the fronted one', () => {
    const w = words('I cleaned my room yesterday.')
    expect(acceptedOrders(w, w)).toEqual([
      ['I', 'cleaned', 'my', 'room', 'yesterday'],
      ['yesterday', 'I', 'cleaned', 'my', 'room'],
    ])
  })

  it('moves whole tiles when an idiom is chunked', () => {
    const w = words('I take care of my dog every day.')
    const units = ['I', 'take care of', 'my', 'dog', 'every', 'day.']
    expect(acceptedOrders(w, units)[1]).toEqual(['every', 'day', 'I', 'take care of', 'my', 'dog'])
  })

  it('has only the written order when nothing can move', () => {
    const w = words('Is this your bag?')
    expect(acceptedOrders(w, w)).toEqual([['Is', 'this', 'your', 'bag']])
  })

  it('every alternative is the same tiles as the written order', () => {
    for (const question of Object.values(QUESTIONS).flat()) {
      const [first, ...rest] = acceptedOrders(question.words, question.words)
      for (const alt of rest) expect([...alt].sort()).toEqual([...first].sort())
    }
  })
})

describe('isAccepted / fitsSomeOrder', () => {
  const orders = [words('I cleaned my room yesterday'), words('yesterday I cleaned my room')]

  it('accepts either order', () => {
    expect(isAccepted(words('I cleaned my room yesterday'), orders)).toBe(true)
    expect(isAccepted(words('yesterday I cleaned my room'), orders)).toBe(true)
    expect(isAccepted(words('I cleaned yesterday my room'), orders)).toBe(false)
  })

  it('checks each tile against any order the filled slots still agree with', () => {
    expect(fitsSomeOrder(['yesterday', null, null, null, null], orders)).toBe(true)
    expect(fitsSomeOrder(['I', null, null, null, null], orders)).toBe(true)
    expect(fitsSomeOrder(['my', null, null, null, null], orders)).toBe(false)
    // A slot refilled after pulling one out of the middle.
    expect(fitsSomeOrder(['I', 'cleaned', null, 'room', 'yesterday'], orders)).toBe(true)
    expect(fitsSomeOrder(['yesterday', 'cleaned', null, null, null], orders)).toBe(false)
  })
})

describe('misplacedSlots', () => {
  it('flags only the tile that has to move, not everything after it', () => {
    const orders = [words('I play soccer with my friends')]
    // "with" put first: comparing slot by slot would flag all six.
    expect(misplacedSlots(words('with I play soccer my friends'), orders)).toEqual([
      true,
      false,
      false,
      false,
      false,
      false,
    ])
  })

  it('measures against the closest accepted order', () => {
    const orders = [words('I cleaned my room yesterday'), words('yesterday I cleaned my room')]
    expect(misplacedSlots(words('yesterday I cleaned room my'), orders).filter(Boolean)).toHaveLength(1)
  })

  it('does not flag a correct answer', () => {
    const orders = [words('Is this your bag')]
    expect(misplacedSlots(words('Is this your bag'), orders)).toEqual([false, false, false, false])
  })
})
