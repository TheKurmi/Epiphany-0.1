/** Sentence-builder puzzles — words shuffled, learner rebuilds the sentence. */
export const SENTENCE_BUILDER_TEMPLATES = [
  {
    id: 'man-drinks-water',
    words: ['Ο', 'άντρας', 'πίνει', 'νερό'],
    sentence: 'Ο άντρας πίνει νερό.',
    hint: 'The man drinks water.',
    patternTag: 'svo-order',
  },
  {
    id: 'maria-coffee',
    words: ['Η', 'Μαρία', 'πίνει', 'καφέ'],
    sentence: 'Η Μαρία πίνει καφέ.',
    hint: 'Maria drinks coffee.',
    patternTag: 'verb-3rd',
  },
  {
    id: 'child-eats',
    words: ['Το', 'παιδί', 'τρώει'],
    sentence: 'Το παιδί τρώει.',
    hint: 'The child is eating.',
    patternTag: 'verb-3rd',
  },
  {
    id: 'i-speak-greek',
    words: ['Εγώ', 'μιλάω', 'ελληνικά'],
    sentence: 'Εγώ μιλάω ελληνικά.',
    hint: 'I speak Greek.',
    patternTag: 'verb-1st',
  },
  {
    id: 'not-coffee',
    words: ['Δεν', 'πίνω', 'καφέ'],
    sentence: 'Δεν πίνω καφέ.',
    hint: 'I do not drink coffee.',
    patternTag: 'negation',
  },
  {
    id: 'hot-coffee',
    words: ['Ο', 'καφές', 'είναι', 'ζεστός'],
    sentence: 'Ο καφές είναι ζεστός.',
    hint: 'The coffee is hot.',
    patternTag: 'adjective-order',
  },
  {
    id: 'you-well',
    words: ['Είσαι', 'καλά;'],
    sentence: 'Είσαι καλά;',
    hint: 'Are you well?',
    patternTag: 'question-form',
  },
  {
    id: 'we-have-time',
    words: ['Εμείς', 'έχουμε', 'χρόνο'],
    sentence: 'Εμείς έχουμε χρόνο.',
    hint: 'We have time.',
    patternTag: 'verb-1pl',
  },
  {
    id: 'i-drink-water',
    words: ['Εγώ', 'πίνω', 'νερό'],
    sentence: 'Εγώ πίνω νερό.',
    hint: 'I drink water.',
    patternTag: 'svo-order',
  },
  {
    id: 'where-is-cafe',
    words: ['Πού', 'είναι', 'το', 'καφέ;'],
    sentence: 'Πού είναι το καφέ;',
    hint: 'Where is the café?',
    patternTag: 'question-where',
  },
  {
    id: 'my-book',
    words: ['Το', 'βιβλίο', 'μου', 'είναι', 'εδώ'],
    sentence: 'Το βιβλίο μου είναι εδώ.',
    hint: 'My book is here.',
    patternTag: 'possessive',
  },
  {
    id: 'their-house',
    words: ['Το', 'σπίτι', 'τους', 'είναι', 'μεγάλο'],
    sentence: 'Το σπίτι τους είναι μεγάλο.',
    hint: 'Their house is big.',
    patternTag: 'possessive-plural',
  },
  {
    id: 'two-apples',
    words: ['Έχω', 'δύο', 'μήλα'],
    sentence: 'Έχω δύο μήλα.',
    hint: 'I have two apples.',
    patternTag: 'numbers',
  },
  {
    id: 'what-time',
    words: ['Τι', 'ώρα', 'είναι;'],
    sentence: 'Τι ώρα είναι;',
    hint: 'What time is it?',
    patternTag: 'time-question',
  },
  {
    id: 'half-past-three',
    words: ['Είναι', 'τρεις', 'και', 'μισή'],
    sentence: 'Είναι τρεις και μισή.',
    hint: 'It is half past three.',
    patternTag: 'time-half',
  },
  {
    id: 'tomorrow-monday',
    words: ['Αύριο', 'είναι', 'Δευτέρα'],
    sentence: 'Αύριο είναι Δευτέρα.',
    hint: 'Tomorrow is Monday.',
    patternTag: 'dates',
  },
  {
    id: 'with-friends',
    words: ['Πηγαίνω', 'με', 'τους', 'φίλους', 'μου'],
    sentence: 'Πηγαίνω με τους φίλους μου.',
    hint: 'I go with my friends.',
    patternTag: 'preposition-me',
  },
  {
    id: 'from-athens',
    words: ['Είμαι', 'από', 'την', 'Αθήνα'],
    sentence: 'Είμαι από την Αθήνα.',
    hint: 'I am from Athens.',
    patternTag: 'preposition-apo',
  },
  {
    id: 'want-coffee',
    words: ['Θέλω', 'έναν', 'καφέ'],
    sentence: 'Θέλω έναν καφέ.',
    hint: 'I want a coffee.',
    patternTag: 'modal-thelo',
  },
  {
    id: 'must-study',
    words: ['Πρέπει', 'να', 'διαβάσω'],
    sentence: 'Πρέπει να διαβάσω.',
    hint: 'I must study.',
    patternTag: 'modal-prepei',
  },
  {
    id: 'always-coffee',
    words: ['Πάντα', 'πίνω', 'καφέ', 'το', 'πρωί'],
    sentence: 'Πάντα πίνω καφέ το πρωί.',
    hint: 'I always drink coffee in the morning.',
    patternTag: 'frequency',
  },
  {
    id: 'red-apples-plural',
    words: ['Τα', 'κόκκινα', 'μήλα', 'είναι', 'γλυκά'],
    sentence: 'Τα κόκκινα μήλα είναι γλυκά.',
    hint: 'The red apples are sweet.',
    patternTag: 'adjective-agreement',
  },
  {
    id: 'why-late',
    words: ['Γιατί', 'είσαι', 'αργά;'],
    sentence: 'Γιατί είσαι αργά;',
    hint: 'Why are you late?',
    patternTag: 'question-why',
  },
  {
    id: 'but-tired',
    words: ['Είμαι', 'κουρασμένος', 'αλλά', 'χαρούμενος'],
    sentence: 'Είμαι κουρασμένος αλλά χαρούμενος.',
    hint: 'I am tired but happy.',
    patternTag: 'compound-alla',
  },
]

export function shuffleWords(words) {
  const copy = [...words]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}
