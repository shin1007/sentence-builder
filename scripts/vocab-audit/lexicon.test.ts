import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { lemmaCandidates, lookup, lookupTokens, parseWordlist, tokenize } from './lexicon'

const wordlist = parseWordlist(readFileSync(new URL('../data/cefrj-vocabulary-profile-1.5.csv', import.meta.url), 'utf8'))

describe('parseWordlist', () => {
  it('reads quoted fields and keeps the easiest level per headword', () => {
    const list = parseWordlist('headword,pos,CEFR\nbetter,adverb,A2\nbetter,adjective,A1\n"act",noun,A2\n')
    expect(list.get('better')).toBe('A1')
    expect(list.get('act')).toBe('A2')
  })

  it('splits spelling variants into their own keys', () => {
    expect(wordlist.get('color')).toBe('A1')
    expect(wordlist.get('colour')).toBe('A1')
  })

  it('loads the bundled list', () => {
    expect(wordlist.size).toBeGreaterThan(7000)
  })
})

describe('tokenize', () => {
  it('lowercases, strips punctuation and expands contractions', () => {
    expect(tokenize(["Don't", 'run', 'here.'])).toEqual(['not', 'do', 'run', 'here'])
    expect(tokenize(["Let's", 'go!'])).toEqual(['let', 'us', 'go'])
    expect(tokenize(["I'm", 'sure', "it's", 'fine.'])).toEqual(['i', 'be', 'sure', 'it', 'fine'])
  })

  it('drops names in the middle of a sentence but keeps I', () => {
    expect(tokenize(['I', 'met', 'Tom', 'in', 'Kyoto.'])).toEqual(['i', 'met', 'in'])
  })

  it('drops numerals', () => {
    expect(tokenize(['I', 'have', '3', 'cats.'])).toEqual(['i', 'have', 'cats'])
  })
})

describe('lemmatizing', () => {
  it('traces regular and irregular forms back to the headword', () => {
    expect(lookup('went', wordlist)?.lemma).toBe('go')
    expect(lookup('children', wordlist)?.lemma).toBe('child')
    expect(lookup('stopped', wordlist)?.lemma).toBe('stop')
    expect(lookup('bigger', wordlist)?.lemma).toBe('big')
    expect(lookup('studies', wordlist)?.lemma).toBe('study')
    expect(lookup('making', wordlist)?.lemma).toBe('make')
    expect(lookup('wolves', wordlist)?.lemma).toBe('wolf')
  })

  it('offers the literal token first', () => {
    expect(lemmaCandidates('dogs')[0]).toBe('dogs')
    expect(lemmaCandidates('dogs')).toContain('dog')
  })

  it('reports a word the list does not have as unlisted', () => {
    expect(lookup('zzzz', wordlist)).toBeUndefined()
  })
})

describe('lookupTokens', () => {
  it('prefers a multi-word headword over its parts', () => {
    const found = lookupTokens(['according', 'to', 'the', 'news'], wordlist)
    expect(found[0]).toEqual({ key: 'according to', level: wordlist.get('according to') })
    expect(found.map((f) => f.key)).toEqual(['according to', 'the', 'news'])
  })

  it('keys an unlisted token by itself with no level', () => {
    expect(lookupTokens(['zzzz'], wordlist)).toEqual([{ key: 'zzzz' }])
  })
})
