/** @type {import('../index').Lesson} */
const lesson = {
  id: 'articles-gender',
  topicId: 'articles',
  level: 'beginner',
  pathOrder: 1,
  duration: '3–4 min',
  title: 'Articles & Gender',
  summary: 'Three little words — ο, η, το — unlock every Greek noun.',
  intro: {
    paragraphs: [
      'In Greek, every noun belongs to one of three grammatical genders: masculine, feminine, or neuter. This is not about people being “male” or “female” — a table (τραπέζι) is neuter, a chair (καρέκλα) is feminine, and coffee (καφές) is masculine. Gender is a label that affects articles, adjectives, and verb agreement.',
      'The definite article — the Greek equivalent of “the” — tells you the gender immediately. Masculine nouns take ο, feminine nouns take η, and neuter nouns take το. When you learn a new word, learn it with its article as one unit: ο καφές, η μέρα, το νερό. Your brain will start predicting gender from patterns instead of guessing.',
      'This matters beyond vocabulary lists. Once you know a noun’s gender, you can choose the right adjective form and spot when something “sounds wrong.” Articles are small, but they are the key to reading Greek with confidence.',
    ],
    examples: [
      { greek: 'ο καφές', english: 'the coffee (masculine)' },
      { greek: 'η μέρα', english: 'the day (feminine)' },
      { greek: 'το νερό', english: 'the water (neuter)' },
    ],
  },
  sections: [
    {
      type: 'grammarTable',
      title: 'The three articles',
      caption: 'Spot the article — spot the gender.',
      columns: ['Gender', 'Article', 'Example'],
      rows: [
        ['Masculine', 'ο', 'ο καφές'],
        ['Feminine', 'η', 'η μέρα'],
        ['Neuter', 'το', 'το νερό'],
      ],
      highlightColumn: 1,
    },
  ],
  commonMistakes: [
    {
      title: 'English habits',
      text: 'Do not guess gender from “he / she / it.” A table (τραπέζι) is neuter — gender is grammar, not meaning.',
    },
    {
      title: 'Article confusion',
      text: 'Learn each noun with its article as one chunk: η μέρα, not just μέρα.',
    },
  ],
  quiz: {
    question: 'Which article goes with a neuter noun?',
    options: ['ο', 'η', 'το'],
    correctIndex: 2,
  },
  deepDive: {
    title: 'Dive deeper',
    teaser: 'Plural articles, more examples, and accent tips',
    sections: [
      {
        type: 'grammarTable',
        title: 'Plural articles (preview)',
        caption: 'Same genders — different forms in plural.',
        columns: ['Gender', 'Singular', 'Plural'],
        rows: [
          ['Masculine', 'ο', 'οι'],
          ['Feminine', 'η', 'οι'],
          ['Neuter', 'το', 'τα'],
        ],
        highlightColumn: 2,
      },
      {
        type: 'examples',
        title: 'More examples',
        items: [
          { greek: 'ο άνθρωπος', english: 'the person / man', note: 'masculine' },
          { greek: 'η ώρα', english: 'the hour / time', note: 'feminine' },
          { greek: 'το σπίτι', english: 'the house', note: 'neuter' },
        ],
      },
      {
        type: 'note',
        title: 'Pronunciation note',
        paragraphs: [
          'ο sounds like “o” in go. η sounds like “ee” in see. το is the same “o” as ο — the article matches the noun that follows.',
        ],
      },
    ],
  },
}

export default lesson
