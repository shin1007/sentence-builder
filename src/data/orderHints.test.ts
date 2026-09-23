import { describe, expect, it } from 'vitest'
import { q } from './questionGen'
import type { Question } from '../types'
import type { GrammarId } from './grammar'
import { detectOrderMistake } from './orderHints'
import { acceptedOrders } from '../utils/answerCheck'

function check(sentence: string, grammar: GrammarId, placed: string) {
  const question: Question = { ...q('t-0', '', sentence), grammar }
  const orders = acceptedOrders(question.words, question.words)
  const tiles = placed.split(' ')
  const slots = [...tiles, ...new Array(orders[0].length - tiles.length).fill(null)]
  return detectOrderMistake(question, slots, orders)
}

describe('detectOrderMistake', () => {
  it('spots the verb left for later', () => {
    expect(check('I went to the theater yesterday.', 'pastIrregular', 'I theater')).toBe('verbLate')
  })

  it('spots a noun put before its preposition', () => {
    expect(check('There is a camera on the desk.', 'thereIs', 'There is a camera desk')).toBe('preposition')
    // `to` before a verb is the infinitive.
    expect(check('I have to feed my rabbit.', 'modalHaveTo', 'I have my')).toBe(null)
  })

  it('spots a description put before its noun', () => {
    expect(check('Look at the dog sleeping under the tree.', 'participlePresentModifier', 'Look at the sleeping')).toBe(
      'postModifier',
    )
  })

  it('spots the subject put before the auxiliary in a question', () => {
    expect(check('Where do you live?', 'whereQuestion', 'Where you')).toBe('questionAux')
    // `doing` isn't the auxiliary that moves.
    expect(check('What were you doing last Sunday?', 'pastProgressive', 'What were you Sunday')).toBe(null)
  })

  it('spots question order inside an indirect question', () => {
    expect(check("I don't know why he became an actor.", 'indirectQuestion', "I don't know why became")).toBe(
      'indirectQuestion',
    )
  })

  it('says nothing when the order is right so far or the slip is unclear', () => {
    expect(check('I went to the theater yesterday.', 'pastIrregular', 'I went')).toBe(null)
    expect(check('I wrote a letter last week.', 'pastSimple', 'I wrote a letter week')).toBe(null)
  })
})
