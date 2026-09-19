import type { Question } from '../types'

/** Builds a Question from a plain English sentence string, splitting it into
 * one tile per word (the same tokenization the game expects). */
export function q(id: string, jp: string, en: string, note?: string): Question {
  return { id, jp, words: en.trim().split(/\s+/), note }
}
