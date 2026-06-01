/** @type {import('../index').Lesson} */
const lesson = {
  id: 'sentence-structure',
  topicId: 'sentence-structure',
  level: 'beginner',
  pathOrder: 5,
  duration: '3–4 min',
  title: 'Basic Sentence Structure',
  summary: 'Subject – Verb – Object works. Start there.',
  intro: {
    paragraphs: [
      'Greek sentence structure is more flexible than English, but there is a reliable starting point: Subject – Verb – Object, just like English. Η Μαρία πίνει καφέ means “Maria drinks coffee” — subject first, verb in the middle, object last. When you are unsure how to arrange a sentence, this order almost always works.',
      'Word order can shift for emphasis. Putting the verb first highlights the action; putting the object early draws attention to what was affected. Native speakers do this naturally, but as a learner, sticking to SVO gives you a safe foundation while your ear develops.',
      'One major difference from English: adjectives usually come after the noun they describe. English says “hot coffee,” but Greek says ο καφές ζεστός — literally “the coffee hot.” It feels backwards at first, then becomes second nature. The noun’s gender (shown by its article) also affects the adjective’s ending.',
    ],
    examples: [
      { greek: 'Η Μαρία πίνει καφέ.', english: 'Maria drinks coffee.' },
      { greek: 'Το παιδί τρώει.', english: 'The child is eating.' },
      { greek: 'ο καφές ζεστός', english: 'the hot coffee' },
    ],
  },
  sections: [
    {
      type: 'grammarTable',
      title: 'Simple template',
      columns: ['Part', 'Example'],
      rows: [
        ['Subject', 'Η Μαρία'],
        ['Verb', 'πίνει'],
        ['Object', 'καφέ'],
      ],
      highlightColumn: 1,
    },
  ],
  commonMistakes: [
    {
      title: 'Adjective placement',
      text: 'Adjectives usually follow the noun: ο καφές ζεστός (the coffee hot), not ζεστός καφές.',
    },
    {
      title: 'Forcing English order',
      text: 'Word order can shift for emphasis — start with SVO, then notice native variations.',
    },
  ],
  quiz: {
    question: 'Where does the adjective usually go?',
    options: ['Before the noun', 'After the noun', 'At the sentence end'],
    correctIndex: 1,
  },
  deepDive: {
    title: 'Dive deeper',
    teaser: 'Flexible order, more examples, question forms',
    sections: [
      {
        type: 'examples',
        title: 'More sentence patterns',
        items: [
          { greek: 'Εγώ μιλάω ελληνικά.', english: 'I speak Greek.' },
          { greek: 'Το παιδί τρώει.', english: 'The child is eating.' },
          { greek: 'ο καφές ζεστός', english: 'the hot coffee', note: 'adj. after noun' },
        ],
      },
      {
        type: 'note',
        title: 'Syntax note',
        paragraphs: [
          'Dropping the subject is normal when the verb ending makes it clear: πίνω = “I drink” without εγώ. Emphasis adds the pronoun back: Εγώ πίνω, εσύ τρώς.',
        ],
      },
    ],
  },
}

export default lesson
