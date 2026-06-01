import {
  EIMAI_PRESENT,
  irregularConjugationRows,
} from '../patterns/conjugation'

const eimaiRows = irregularConjugationRows(EIMAI_PRESENT)

/** @type {import('../index').Lesson} */
const lesson = {
  id: 'eimai-essential',
  topicId: 'present-tense',
  level: 'beginner',
  pathOrder: 4,
  duration: '3–4 min',
  title: 'είμαι — I Am',
  summary: 'The most-used verb in Greek — irregular, but a tiny set of forms.',
  intro: {
    paragraphs: [
      'The verb είμαι (to be) is arguably the most important verb in Greek. It appears in descriptions (Είμαι καλά — I am well), locations (Είναι εδώ — It is here), and identity statements. You will hear and use it dozens of times in a single conversation.',
      'Unlike πίνω or έχω, είμαι does not follow the regular -ω pattern. Its forms are unique — είμαι, είσαι, είναι, είμαστε, είστε — and you cannot build them by adding standard endings to a stem. The practical approach is to learn them as a small, fixed set rather than forcing them into a conjugation group.',
      'One helpful shortcut: the third-person singular and plural share the same form — είναι — for “he/she/it is” and “they are.” Context tells you which meaning applies. Start with είμαι, είσαι, and είναι; add είμαστε and είστε as you grow comfortable.',
    ],
    examples: [
      { greek: 'Είμαι καλά.', english: 'I am well.' },
      { greek: 'Είσαι εδώ;', english: 'Are you here?' },
      { greek: 'Είναι ωραία.', english: 'It is beautiful.' },
    ],
  },
  sections: [
    {
      type: 'grammarTable',
      title: 'The core forms',
      caption: 'Memorize these four first — cover most conversations.',
      columns: ['Person', 'Form', 'Meaning'],
      rows: [
        ['εγώ', 'είμαι', 'I am'],
        ['εσύ', 'είσαι', 'you are'],
        ['αυτός/ή/ό', 'είναι', 'he / she / it is'],
        ['εμείς', 'είμαστε', 'we are'],
      ],
      highlightColumn: 1,
    },
  ],
  commonMistakes: [
    {
      title: 'Treating it like -ω',
      text: 'Not είμω or είμε — είμαι has its own endings. Learn είμαι, είσαι, είναι as one bundle.',
    },
    {
      title: 'Forgetting shared forms',
      text: 'αυτός and αυτοί both use είναι — same form, different context.',
    },
  ],
  quiz: {
    question: 'How do you say “you are”?',
    options: ['είμαι', 'είσαι', 'είναι'],
    correctIndex: 1,
  },
  deepDive: {
    title: 'Dive deeper',
    teaser: 'Full table, pronunciation, and sentence patterns',
    sections: [
      {
        type: 'conjugationTable',
        title: 'Complete present: είμαι',
        caption: 'Whole forms — no stem+ending split for irregulars.',
        rows: eimaiRows,
        showEnding: false,
      },
      {
        type: 'examples',
        title: 'Everyday sentences',
        items: [
          { greek: 'Δεν είμαι κουρασμένος.', english: 'I am not tired.' },
          { greek: 'Είστε έτοιμοι;', english: 'Are you ready? (pl.)' },
          { greek: 'Πού είσαι;', english: 'Where are you?' },
        ],
      },
      {
        type: 'note',
        title: 'Pronunciation',
        paragraphs: [
          'είμαι: stress on -μαι. είσαι: two syllables, ee-SEH. είναι: EE-neh — the final ν is often soft in speech.',
        ],
      },
    ],
  },
}

export default lesson
