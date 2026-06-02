/**
 * @typedef {Object} VocabEntry
 * @property {string} word
 * @property {string} english
 * @property {string} [partOfSpeech]
 * @property {string} [gender]
 * @property {string} [plural]
 * @property {string} [conjugationFamily]
 * @property {string} [note]
 *
 * @typedef {Object} SentenceHighlight
 * @property {string} word — word as it appears in the sentence
 * @property {string} [stem]
 * @property {string} [ending]
 * @property {'verb' | 'article' | 'ending'} [type]
 *
 * @typedef {Object} StorySentence
 * @property {string} text
 * @property {string} english
 * @property {SentenceHighlight[]} [highlights]
 * @property {VocabEntry[]} [vocabulary]
 *
 * @typedef {Object} ComprehensionQuestion
 * @property {string} question
 * @property {string[]} options
 * @property {number} correctIndex
 *
 * @typedef {Object} Story
 * @property {string} id
 * @property {string} packId
 * @property {string} title
 * @property {string} titleEnglish
 * @property {'beginner' | 'intermediate'} level
 * @property {string[]} requiredTopics
 * @property {StorySentence[]} sentences
 * @property {ComprehensionQuestion[]} comprehension
 */

/** @type {Story[]} */
import { EXTENDED_STORIES } from './stories-extended'
import { BATCH_2_STORIES } from './stories-batch-2'

const CORE_STORIES = [
  {
    id: 'nikos-morning',
    packId: 'daily-routines',
    title: 'Καλημέρα, Νίκο',
    titleEnglish: 'Good morning, Nikos',
    level: 'beginner',
    requiredTopics: ['present-tense', 'sentence-structure'],
    sentences: [
      {
        text: 'Ο Νίκος πίνει νερό κάθε πρωί.',
        english: 'Nikos drinks water every morning.',
        highlights: [{ word: 'πίνει', stem: 'πίν', ending: 'ει', type: 'verb' }],
        vocabulary: [
          { word: 'Νίκος', english: 'Nikos (name)', partOfSpeech: 'noun' },
          {
            word: 'νερό',
            english: 'water',
            partOfSpeech: 'noun',
            gender: 'neuter',
            plural: 'νερά',
          },
          { word: 'κάθε', english: 'every', partOfSpeech: 'adverb' },
          { word: 'πρωί', english: 'morning', partOfSpeech: 'noun', gender: 'neuter' },
        ],
      },
      {
        text: 'Μετά πηγαίνει στο σχολείο.',
        english: 'Then he goes to school.',
        highlights: [{ word: 'πηγαίνει', stem: 'πηγαίν', ending: 'ει', type: 'verb' }],
        vocabulary: [
          { word: 'Μετά', english: 'then / after' },
          { word: 'σχολείο', english: 'school' },
        ],
      },
      {
        text: 'Το απόγευμα διαβάζει βιβλία.',
        english: 'In the afternoon he reads books.',
        highlights: [{ word: 'διαβάζει', stem: 'διαβάζ', ending: 'ει', type: 'verb' }],
        vocabulary: [
          { word: 'απόγευμα', english: 'afternoon' },
          { word: 'βιβλία', english: 'books' },
        ],
      },
      {
        text: 'Το βράδυ κοιμάται νωρίς.',
        english: 'In the evening he sleeps early.',
        highlights: [{ word: 'κοιμάται', stem: 'κοιμά', ending: 'ται', type: 'verb' }],
        vocabulary: [
          { word: 'βράδυ', english: 'evening' },
          { word: 'νωρίς', english: 'early' },
        ],
      },
    ],
    comprehension: [
      {
        question: 'Τι πίνει ο Νίκος κάθε πρωί;',
        options: ['νερό', 'καφέ', 'γάλα'],
        correctIndex: 0,
      },
      {
        question: 'Πού πηγαίνει μετά το πρωί;',
        options: ['στο σχολείο', 'στο καφέ', 'στο σπίτι'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'maria-breakfast',
    packId: 'daily-routines',
    title: 'Το πρωινό της Μαρίας',
    titleEnglish: "Maria's breakfast",
    level: 'beginner',
    requiredTopics: ['present-tense', 'articles'],
    sentences: [
      {
        text: 'Η Μαρία ξυπνάει στις επτά.',
        english: 'Maria wakes up at seven.',
        highlights: [{ word: 'ξυπνάει', stem: 'ξυπνά', ending: 'ει', type: 'verb' }],
        vocabulary: [
          { word: 'Μαρία', english: 'Maria (name)' },
          { word: 'επτά', english: 'seven' },
        ],
      },
      {
        text: 'Τρώει ψωμί και τυρί.',
        english: 'She eats bread and cheese.',
        highlights: [{ word: 'Τρώει', stem: 'Τρώ', ending: 'ει', type: 'verb' }],
        vocabulary: [
          { word: 'ψωμί', english: 'bread' },
          { word: 'τυρί', english: 'cheese' },
        ],
      },
      {
        text: 'Πίνει ένα καφέ.',
        english: 'She drinks a coffee.',
        highlights: [{ word: 'Πίνει', stem: 'Πίν', ending: 'ει', type: 'verb' }],
        vocabulary: [{ word: 'καφές', english: 'coffee' }],
      },
    ],
    comprehension: [
      {
        question: 'Τι τρώει η Μαρία;',
        options: ['ψωμί και τυρί', 'φρούτα', 'σούπα'],
        correctIndex: 0,
      },
      {
        question: 'Τι πίνει;',
        options: ['καφέ', 'νερό', 'χυμό'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'school-day',
    packId: 'school-life',
    title: 'Μια μέρα στο σχολείο',
    titleEnglish: 'A day at school',
    level: 'beginner',
    requiredTopics: ['present-tense', 'sentence-structure'],
    sentences: [
      {
        text: 'Ο Γιώργος πηγαίνει στο σχολείο στις οκτώ.',
        english: 'Giorgos goes to school at eight.',
        highlights: [{ word: 'πηγαίνει', stem: 'πηγαίν', ending: 'ει', type: 'verb' }],
        vocabulary: [
          { word: 'Γιώργος', english: 'Giorgos (name)' },
          { word: 'οκτώ', english: 'eight' },
        ],
      },
      {
        text: 'Μαθαίνει μαθηματικά και ελληνικά.',
        english: 'He learns maths and Greek.',
        highlights: [{ word: 'Μαθαίνει', stem: 'Μαθαίν', ending: 'ει', type: 'verb' }],
        vocabulary: [
          { word: 'μαθηματικά', english: 'maths' },
          { word: 'ελληνικά', english: 'Greek (language)' },
        ],
      },
      {
        text: 'Το μεσημέρι τρώει στο κυλικείο.',
        english: 'At noon he eats at the canteen.',
        vocabulary: [
          { word: 'μεσημέρι', english: 'noon' },
          { word: 'κυλικείο', english: 'canteen' },
        ],
      },
      {
        text: 'Το απόγευμα γυρίζει σπίτι.',
        english: 'In the afternoon he returns home.',
        highlights: [{ word: 'γυρίζει', stem: 'γυρίζ', ending: 'ει', type: 'verb' }],
        vocabulary: [{ word: 'σπίτι', english: 'home' }],
      },
    ],
    comprehension: [
      {
        question: 'Τι μαθαίνει ο Γιώργος;',
        options: ['μαθηματικά και ελληνικά', 'ιστορία', 'μουσική'],
        correctIndex: 0,
      },
      {
        question: 'Πού τρώει το μεσημέρι;',
        options: ['στο κυλικείο', 'στο σπίτι', 'στο καφέ'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'cafe-order',
    packId: 'food-cafe',
    title: 'Στο καφέ',
    titleEnglish: 'At the café',
    level: 'beginner',
    requiredTopics: ['present-tense', 'articles'],
    sentences: [
      {
        text: 'Η Άννα μπαίνει στο καφέ.',
        english: 'Anna enters the café.',
        highlights: [{ word: 'μπαίνει', stem: 'μπαίν', ending: 'ει', type: 'verb' }],
        vocabulary: [
          { word: 'Άννα', english: 'Anna (name)' },
          { word: 'καφέ', english: 'café' },
        ],
      },
      {
        text: 'Παραγγέλνει έναν καφέ και ένα κρουασάν.',
        english: 'She orders a coffee and a croissant.',
        highlights: [
          { word: 'Παραγγέλνει', stem: 'Παραγγέλν', ending: 'ει', type: 'verb' },
        ],
        vocabulary: [{ word: 'κρουασάν', english: 'croissant' }],
      },
      {
        text: 'Κάθεται στο τραπέζι και διαβάζει.',
        english: 'She sits at the table and reads.',
        highlights: [{ word: 'διαβάζει', stem: 'διαβάζ', ending: 'ει', type: 'verb' }],
        vocabulary: [{ word: 'τραπέζι', english: 'table' }],
      },
    ],
    comprehension: [
      {
        question: 'Τι παραγγέλνει η Άννα;',
        options: ['καφέ και κρουασάν', 'νερό', 'σαλάτα'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'family-intro',
    packId: 'family-home',
    title: 'Η οικογένειά μου',
    titleEnglish: 'My family',
    level: 'beginner',
    requiredTopics: ['articles', 'eimai'],
    sentences: [
      {
        text: 'Είμαι η Ελένη.',
        english: 'I am Eleni.',
        highlights: [{ word: 'Είμαι', type: 'verb' }],
        vocabulary: [{ word: 'Ελένη', english: 'Eleni (name)' }],
      },
      {
        text: 'Έχω μια μαμά και έναν μπαμπά.',
        english: 'I have a mum and a dad.',
        highlights: [{ word: 'Έχω', type: 'verb' }],
        vocabulary: [
          { word: 'μαμά', english: 'mum' },
          { word: 'μπαμπάς', english: 'dad' },
        ],
      },
      {
        text: 'Η μαμά μου μαγειρεύει πολύ καλά.',
        english: 'My mum cooks very well.',
        highlights: [{ word: 'μαγειρεύει', stem: 'μαγειρεύ', ending: 'ει', type: 'verb' }],
        vocabulary: [{ word: 'καλά', english: 'well' }],
      },
      {
        text: 'Ο μπαμπάς μου δουλεύει στο γραφείο.',
        english: 'My dad works at the office.',
        highlights: [{ word: 'δουλεύει', stem: 'δουλεύ', ending: 'ει', type: 'verb' }],
        vocabulary: [{ word: 'γραφείο', english: 'office' }],
      },
    ],
    comprehension: [
      {
        question: 'Πόσους γονείς έχει η Ελένη;',
        options: ['δύο', 'έναν', 'τρεις'],
        correctIndex: 0,
      },
      {
        question: 'Τι κάνει η μαμά της;',
        options: ['μαγειρεύει', 'δουλεύει', 'διαβάζει'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'cafe-dialogue',
    packId: 'questions-dialogue',
    title: 'Στην ταβέρνα',
    titleEnglish: 'At the taverna',
    level: 'beginner',
    requiredTopics: ['questions-negation', 'present-tense'],
    sentences: [
      {
        text: '— Τι θέλεις; — Θέλω σαλάτα, παρακαλώ.',
        english: '— What do you want? — I want salad, please.',
        highlights: [
          { word: 'θέλεις', stem: 'θέλ', ending: 'εις', type: 'verb' },
          { word: 'Θέλω', stem: 'Θέλ', ending: 'ω', type: 'verb' },
        ],
        vocabulary: [
          { word: 'σαλάτα', english: 'salad' },
          { word: 'παρακαλώ', english: 'please' },
        ],
      },
      {
        text: '— Έχετε ψωμί; — Ναι, έχουμε.',
        english: '— Do you have bread? — Yes, we do.',
        highlights: [
          { word: 'Έχετε', type: 'verb' },
          { word: 'έχουμε', type: 'verb' },
        ],
        vocabulary: [{ word: 'Ναι', english: 'yes' }],
      },
      {
        text: '— Δεν θέλω κρέας. — Εντάξει.',
        english: '— I do not want meat. — OK.',
        highlights: [{ word: 'Δεν', type: 'ending' }],
        vocabulary: [
          { word: 'κρέας', english: 'meat' },
          { word: 'Εντάξει', english: 'OK' },
        ],
      },
    ],
    comprehension: [
      {
        question: 'Τι θέλει ο πελάτης;',
        options: ['σαλάτα', 'κρέας', 'ψάρι'],
        correctIndex: 0,
      },
      {
        question: 'Τι δεν θέλει;',
        options: ['κρέας', 'ψωμί', 'σαλάτα'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'verb-patterns-story',
    packId: 'verb-patterns',
    title: 'Δύο τύποι ρημάτων',
    titleEnglish: 'Two types of verbs',
    level: 'intermediate',
    requiredTopics: ['verb-groups', 'present-tense'],
    sentences: [
      {
        text: 'Ο Πέτρος γράφει γράμματα κάθε εβδομάδα.',
        english: 'Petros writes letters every week.',
        highlights: [{ word: 'γράφει', stem: 'γράφ', ending: 'ει', type: 'verb' }],
        vocabulary: [
          { word: 'Πέτρος', english: 'Petros (name)' },
          { word: 'γράμματα', english: 'letters' },
          { word: 'εβδομάδα', english: 'week' },
        ],
      },
      {
        text: 'Η Σοφία αγαπάει τη μουσική.',
        english: 'Sofia loves music.',
        highlights: [{ word: 'αγαπάει', stem: 'αγαπά', ending: 'ει', type: 'verb' }],
        vocabulary: [{ word: 'Σοφία', english: 'Sofia (name)' }],
      },
      {
        text: 'Μαζί πηγαίνουν στο πάρκο.',
        english: 'Together they go to the park.',
        highlights: [{ word: 'πηγαίνουν', stem: 'πηγαίν', ending: 'ουν', type: 'verb' }],
        vocabulary: [{ word: 'πάρκο', english: 'park' }],
      },
      {
        text: 'Μιλάνε και γελάνε.',
        english: 'They talk and laugh.',
        highlights: [
          { word: 'Μιλάνε', stem: 'Μιλ', ending: 'άνε', type: 'verb' },
          { word: 'γελάνε', stem: 'γελ', ending: 'άνε', type: 'verb' },
        ],
        vocabulary: [{ word: 'γελάνε', english: 'they laugh' }],
      },
    ],
    comprehension: [
      {
        question: 'Τι κάνει ο Πέτρος κάθε εβδομάδα;',
        options: ['γράφει γράμματα', 'παίζει μουσική', 'μαγειρεύει'],
        correctIndex: 0,
      },
      {
        question: 'Πού πηγαίνουν μαζί;',
        options: ['στο πάρκο', 'στο σχολείο', 'στο καφέ'],
        correctIndex: 0,
      },
    ],
  },
]

export const STORIES = [...CORE_STORIES, ...EXTENDED_STORIES, ...BATCH_2_STORIES]

export function getStoryById(storyId) {
  return STORIES.find((s) => s.id === storyId) ?? null
}

export function getStoriesForPack(packId) {
  return STORIES.filter((s) => s.packId === packId)
}
