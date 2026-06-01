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

  numbers: {
    type: 'vocabulary',
    drills: [
      { prompt: 'How do you write **5** in Greek?', answer: 'πέντε', options: ['πέντε', 'τέσσερα', 'έξι'], patternTag: 'numbers-basic', hint: '1–10 foundation' },
      { prompt: 'How do you write **20** in Greek?', answer: 'είκοσι', options: ['είκοσι', 'δώδεκα', 'τριάντα'], patternTag: 'numbers-tens' },
      { prompt: 'Complete: Έχω ___ χρόνια. (I am 25)', answer: 'είκοσι πέντε', options: ['είκοσι πέντε', 'δεκαπέντε', 'τριάντα'], patternTag: 'numbers-compound' },
      { prompt: '**100** in Greek?', answer: 'εκατό', options: ['εκατό', 'ενενήντα', 'διακόσια'], patternTag: 'numbers-100' },
    ],
  },

  dates: {
    type: 'vocabulary',
    drills: [
      { prompt: '**Today** in Greek?', answer: 'σήμερα', options: ['σήμερα', 'αύριο', 'χθες'], patternTag: 'dates-relative' },
      { prompt: '**Tomorrow**?', answer: 'αύριο', options: ['αύριο', 'σήμερα', 'χθες'], patternTag: 'dates-relative' },
      { prompt: '**Monday**?', answer: 'Δευτέρα', options: ['Δευτέρα', 'Τρίτη', 'Κυριακή'], patternTag: 'days-week' },
      { prompt: '**January**?', answer: 'Ιανουάριος', options: ['Ιανουάριος', 'Μάρτιος', 'Δεκέμβριος'], patternTag: 'months' },
    ],
  },

  time: {
    type: 'vocabulary',
    drills: [
      { prompt: 'Ask: **What time is it?**', answer: 'Τι ώρα είναι;', options: ['Τι ώρα είναι;', 'Πού είσαι;', 'Τι κάνεις;'], patternTag: 'time-question' },
      { prompt: '**Half past** (και μισή)?', answer: 'και μισή', options: ['και μισή', 'παρά', 'ακριβώς'], patternTag: 'time-half' },
      { prompt: '**Quarter to** (παρά τέταρτο)?', answer: 'παρά τέταρτο', options: ['παρά τέταρτο', 'και τέταρτο', 'και μισή'], patternTag: 'time-quarter' },
      { prompt: 'It is 3 o\'clock: ___ τρεις', answer: 'Είναι', options: ['Είναι', 'Έχει', 'Κάνει'], patternTag: 'time-is' },
    ],
  },

  plurals: {
    type: 'vocabulary',
    drills: [
      { prompt: 'Plural of **ο καφές**?', answer: 'οι καφέδες', options: ['οι καφέδες', 'τα καφέ', 'οι καφές'], patternTag: 'plural-masc' },
      { prompt: 'Plural of **η μέρα**?', answer: 'οι μέρες', options: ['οι μέρες', 'τα μέρες', 'οι μέραι'], patternTag: 'plural-fem' },
      { prompt: 'Plural of **το παιδί**?', answer: 'τα παιδιά', options: ['τα παιδιά', 'οι παιδιά', 'τα παιδιάς'], patternTag: 'plural-neut' },
      { prompt: 'Article for neuter plural?', answer: 'τα', options: ['τα', 'οι', 'ο'], patternTag: 'plural-article' },
    ],
  },

  possessives: {
    type: 'vocabulary',
    drills: [
      { prompt: '**My** book → το βιβλίο ___', answer: 'μου', options: ['μου', 'σου', 'του'], patternTag: 'possessive-1sg' },
      { prompt: '**Your** (singular) house → το σπίτι ___', answer: 'σου', options: ['σου', 'μου', 'μας'], patternTag: 'possessive-2sg' },
      { prompt: '**Our** car → το αμάξι ___', answer: 'μας', options: ['μας', 'σας', 'τους'], patternTag: 'possessive-1pl' },
      { prompt: '**Their** dog → ο σκύλος ___', answer: 'τους', options: ['τους', 'του', 'μας'], patternTag: 'possessive-3pl' },
    ],
  },

  'question-words': {
    type: 'vocabulary',
    drills: [
      { prompt: '**Who?** (masc.)', answer: 'ποιος', options: ['ποιος', 'τι', 'πού'], patternTag: 'qword-who' },
      { prompt: '**What?**', answer: 'τι', options: ['τι', 'ποιος', 'γιατί'], patternTag: 'qword-what' },
      { prompt: '**Where?**', answer: 'πού', options: ['πού', 'πότε', 'πώς'], patternTag: 'qword-where' },
      { prompt: '**Why?**', answer: 'γιατί', options: ['γιατί', 'τι', 'πού'], patternTag: 'qword-why' },
      { prompt: '**When?**', answer: 'πότε', options: ['πότε', 'πού', 'πώς'], patternTag: 'qword-when' },
      { prompt: '**How?**', answer: 'πώς', options: ['πώς', 'τι', 'ποιος'], patternTag: 'qword-how' },
    ],
  },

  prepositions: {
    type: 'vocabulary',
    drills: [
      { prompt: 'I am **at** school → είμαι ___ σχολείο', answer: 'στο', options: ['στο', 'από', 'με'], patternTag: 'prep-in' },
      { prompt: 'I come **from** Athens → έρχομαι ___ Αθήνα', answer: 'από', options: ['από', 'σε', 'για'], patternTag: 'prep-from' },
      { prompt: '**With** Maria → ___ τη Μαρία', answer: 'με', options: ['με', 'χωρίς', 'για'], patternTag: 'prep-with' },
      { prompt: '**For** you → ___ εσένα', answer: 'για', options: ['για', 'από', 'σε'], patternTag: 'prep-for' },
      { prompt: '**Without** sugar → ___ ζάχαρη', answer: 'χωρίς', options: ['χωρίς', 'με', 'κάτω'], patternTag: 'prep-without' },
    ],
  },

  modals: {
    type: 'vocabulary',
    drills: [
      { prompt: '**I want** coffee → ___ καφέ', answer: 'Θέλω', options: ['Θέλω', 'Μπορώ', 'Πρέπει'], patternTag: 'modal-thelo' },
      { prompt: '**I can** swim → ___ κολυμπάω', answer: 'Μπορώ', options: ['Μπορώ', 'Θέλω', 'Πρέπει'], patternTag: 'modal-mporo' },
      { prompt: '**I must / should** go → ___ να πάω', answer: 'Πρέπει', options: ['Πρέπει', 'Θέλω', 'Μπορώ'], patternTag: 'modal-prepei' },
      { prompt: 'You **can** (2nd person)?', answer: 'Μπορείς', options: ['Μπορείς', 'Θέλεις', 'Πρέπει'], patternTag: 'modal-2sg' },
    ],
  },

  'survival-greek': {
    type: 'vocabulary',
    drills: [
      { prompt: '**Hello** (informal)?', answer: 'Γεια σου', options: ['Γεια σου', 'Καληνύχτα', 'Ευχαριστώ'], patternTag: 'survival-greet' },
      { prompt: '**Thank you**?', answer: 'Ευχαριστώ', options: ['Ευχαριστώ', 'Συγγνώμη', 'Παρακαλώ'], patternTag: 'survival-thanks' },
      { prompt: '**How much does it cost?**', answer: 'Πόσο κοστίζει;', options: ['Πόσο κοστίζει;', 'Πού είναι;', 'Τι ώρα είναι;'], patternTag: 'survival-shop' },
      { prompt: '**Where is** the station?', answer: 'Πού είναι ο σταθμός;', options: ['Πού είναι ο σταθμός;', 'Τι κάνεις;', 'Πόσο κοστίζει;'], patternTag: 'survival-directions' },
    ],
  },

  'past-tense': {
    type: 'vocabulary',
    drills: [
      { prompt: 'I **drank** (past) → ___ νερό', answer: 'ήπια', options: ['ήπια', 'πίνω', 'πίνεις'], patternTag: 'past-aorist' },
      { prompt: 'We **went** → ___ στο σπίτι', answer: 'πήγαμε', options: ['πήγαμε', 'πηγαίνουμε', 'πάμε'], patternTag: 'past-pigame' },
      { prompt: 'She **said** → ___ ότι…', answer: 'είπε', options: ['είπε', 'λέει', 'λέω'], patternTag: 'past-eipe' },
    ],
  },

  pronouns: {
    type: 'vocabulary',
    drills: [
      { prompt: 'He sees **me** → με βλέπει', answer: 'με', options: ['με', 'σε', 'τον'], patternTag: 'obj-1sg' },
      { prompt: 'I see **you** (singular) → ___ βλέπω', answer: 'σε', options: ['σε', 'με', 'τον'], patternTag: 'obj-2sg' },
      { prompt: 'I know **him** → ___ ξέρω', answer: 'τον', options: ['τον', 'την', 'τους'], patternTag: 'obj-3sg-m' },
      { prompt: 'I know **them** → ___ ξέρω', answer: 'τους', options: ['τους', 'μας', 'σας'], patternTag: 'obj-3pl' },
    ],
  },

  adjectives: {
    type: 'vocabulary',
    drills: [
      { prompt: '**The big house** (neuter) → το ___ σπίτι', answer: 'μεγάλο', options: ['μεγάλο', 'μεγάλη', 'μεγάλος'], patternTag: 'adj-neut' },
      { prompt: '**The big day** (feminine) → η ___ μέρα', answer: 'μεγάλη', options: ['μεγάλη', 'μεγάλο', 'μεγάλοι'], patternTag: 'adj-fem' },
      { prompt: '**Good** coffee (masculine) → ο ___ καφές', answer: 'καλός', options: ['καλός', 'καλή', 'καλό'], patternTag: 'adj-masc' },
    ],
  },

  'compound-sentences': {
    type: 'vocabulary',
    drills: [
      { prompt: 'I want coffee **but** tea → θέλω καφέ ___ τσάι', answer: 'αλλά', options: ['αλλά', 'και', 'επειδή'], patternTag: 'conj-alla' },
      { prompt: 'I stay **because** I am tired → μένω ___ είμαι κουρασμένος', answer: 'επειδή', options: ['επειδή', 'όταν', 'αλλά'], patternTag: 'conj-epidi' },
      { prompt: '**When** I eat, I am happy → ___ τρώω, είμαι χαρούμενος', answer: 'Όταν', options: ['Όταν', 'Αλλά', 'Γιατί'], patternTag: 'conj-otan' },
    ],
  },

  frequency: {
    type: 'vocabulary',
    drills: [
      { prompt: 'I **always** drink water → ___ πίνω νερό', answer: 'πάντα', options: ['πάντα', 'ποτέ', 'συχνά'], patternTag: 'freq-panta' },
      { prompt: 'I **never** smoke → ___ καπνίζω', answer: 'ποτέ', options: ['ποτέ', 'πάντα', 'συνήθως'], patternTag: 'freq-pote' },
      { prompt: 'I **usually** walk → ___ περπατάω', answer: 'συνήθως', options: ['συνήθως', 'σπάνια', 'πάντα'], patternTag: 'freq-sinithos' },
      { prompt: 'I **often** read → ___ διαβάζω', answer: 'συχνά', options: ['συχνά', 'ποτέ', 'πάντα'], patternTag: 'freq-sihna' },
    ],
  },
}

export function getQuizProfile(topicId) {
  return QUIZ_PROFILES[topicId] ?? null
}
