/**
 * Quiz generation profiles keyed by topic ID.
 * Generators read grammar rules from here — not hardcoded per question.
 */

import { EIMAI_PRESENT } from '../patterns/conjugation'

export const QUIZ_PROFILES = {
  articles: {
    type: 'articles',
    nouns: [
      { noun: 'καφές', gender: 'masculine', article: 'ο', phrase: 'ο καφές' },
      { noun: 'μέρα', gender: 'feminine', article: 'η', phrase: 'η μέρα' },
      { noun: 'νερό', gender: 'neuter', article: 'το', phrase: 'το νερό' },
      { noun: 'σπίτι', gender: 'neuter', article: 'το', phrase: 'το σπίτι' },
      { noun: 'ώρα', gender: 'feminine', article: 'η', phrase: 'η ώρα' },
      { noun: 'άνθρωπος', gender: 'masculine', article: 'ο', phrase: 'ο άνθρωπος' },
    ],
  },

  'present-tense': {
    type: 'conjugation',
    pattern: 'omega',
    verbs: [
      { stem: 'πίν', lemma: 'πίνω', context: 'νερό', sentencePrefix: 'Εγώ' },
      { stem: 'γράφ', lemma: 'γράφω', context: 'γράμμα', sentencePrefix: 'Εγώ' },
      { stem: 'διαβάζ', lemma: 'διαβάζω', context: 'βιβλίο', sentencePrefix: 'Εγώ' },
      { stem: 'έχ', lemma: 'έχω', context: 'χρόνο', sentencePrefix: 'Εγώ' },
    ],
    extras: [
      {
        lemma: 'είμαι',
        forms: EIMAI_PRESENT.map(({ person, form }) => ({ person, form })),
      },
    ],
  },

  'verb-groups': {
    type: 'conjugation',
    pattern: 'alpha',
    verbs: [
      { stem: 'μιλ', lemma: 'μιλάω', context: 'ελληνικά', sentencePrefix: 'Εγώ' },
      { stem: 'αγαπ', lemma: 'αγαπάω', context: 'αυτό', sentencePrefix: 'Εγώ' },
    ],
    extras: [
      {
        type: 'irregular',
        forms: [
          { person: 'εγώ', form: 'μπορώ' },
          { person: 'εσύ', form: 'μπορείς' },
          { person: 'εμείς', form: 'μπορούμε' },
        ],
        lemma: 'μπορώ',
      },
    ],
  },

  'sentence-structure': {
    type: 'sentence',
    templates: [
      {
        prompt: 'Complete: Η Μαρία ___ καφέ.',
        answer: 'πίνει',
        hint: 'Maria drinks coffee — 3rd person',
        patternTag: 'verb-3rd',
      },
      {
        prompt: 'Complete: Το παιδί ___.',
        answer: 'τρώει',
        hint: 'The child is eating',
        patternTag: 'verb-3rd',
      },
      {
        prompt: 'Adjective after noun: ο καφές ___ (hot)',
        answer: 'ζεστός',
        hint: 'Adjective follows the noun',
        patternTag: 'adjective-order',
      },
    ],
  },

  'questions-negation': {
    type: 'negation',
    verbs: [
      { affirmative: 'μιλάω', negative: 'Δεν μιλάω', english: 'I speak / I do not speak' },
      { affirmative: 'έχω χρόνο', negative: 'Δεν έχω χρόνο', english: 'I have time' },
      { affirmative: 'είμαι καλά', negative: 'Δεν είμαι καλά', english: 'I am well' },
      { affirmative: 'πίνω καφέ', negative: 'Δεν πίνω καφέ', english: 'I drink coffee' },
    ],
    questionForms: [
      { statement: 'Μιλάς ελληνικά.', question: 'Μιλάς ελληνικά;', english: 'Do you speak Greek?' },
      { statement: 'Είσαι καλά;', question: 'Είσαι καλά;', english: 'Are you well?' },
    ],
  },
}

export function getQuizProfile(topicId) {
  return QUIZ_PROFILES[topicId] ?? null
}
