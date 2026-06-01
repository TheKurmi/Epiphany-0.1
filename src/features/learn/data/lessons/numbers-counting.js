/** @type {import('../index').Lesson} */
const lesson = {
  id: 'numbers-counting',
  topicId: 'numbers',
  level: 'beginner',
  pathOrder: 8,
  duration: '4–5 min',
  title: 'Numbers 1–100',
  summary: 'Count in Greek — prices, ages, and everyday quantities.',
  intro: {
    paragraphs: [
      'Numbers appear everywhere in real Greek: café prices, bus routes, phone digits, and telling your age. Modern Greek uses the same numerals you see in English (1, 2, 3), but you need the words — ένα, δύο, τρία — to understand speech and speak yourself.',
      'Learn 1–10 first. They are the building blocks for everything else: είκοσι (20) + πέντε (5) = είκοσι πέντε (25). Greeks often say numbers quickly in shops, so recognition matters as much as production.',
      'In this lesson you will master 1–20, the tens (30, 40… 90), and εκατό (100). Dictation and listening practice will reinforce what you read here.',
    ],
    examples: [
      { greek: 'ένα, δύο, τρία', english: 'one, two, three' },
      { greek: 'είκοσι πέντε', english: 'twenty-five' },
      { greek: 'εκατό', english: 'one hundred' },
    ],
  },
  sections: [
    {
      type: 'grammarTable',
      title: '1–10 essentials',
      caption: 'Memorize these first — they recur in every conversation.',
      columns: ['Number', 'Greek'],
      rows: [
        ['1', 'ένα'], ['2', 'δύο'], ['3', 'τρία'], ['4', 'τέσσερα'], ['5', 'πέντε'],
        ['6', 'έξι'], ['7', 'επτά'], ['8', 'οκτώ'], ['9', 'εννέα'], ['10', 'δέκα'],
      ],
      highlightColumn: 1,
    },
    {
      type: 'grammarTable',
      title: 'Tens & 100',
      columns: ['Value', 'Greek'],
      rows: [
        ['20', 'είκοσι'], ['30', 'τριάντα'], ['40', 'σαράντα'], ['50', 'πενήντα'],
        ['60', 'εξήντα'], ['70', 'εβδομήντα'], ['80', 'ογδόντα'], ['90', 'ενενήντα'],
        ['100', 'εκατό'],
      ],
      highlightColumn: 1,
    },
    {
      type: 'examples',
      title: 'In context',
      items: [
        { greek: 'Πόσο κοστίζει; — Δύο ευρώ.', english: 'How much? — Two euros.' },
        { greek: 'Έχω τριάντα χρόνια.', english: 'I am thirty years old.' },
        { greek: 'Εκατό μέτρα.', english: 'One hundred metres.' },
      ],
    },
  ],
  commonMistakes: [
    { title: 'Gender with numbers', text: 'ένας/μία/ένα change with gender (ένας άντρας, μία μέρα, ένα παιδί) — start with neutral ένα for counting.' },
    { title: 'Stress', text: 'Listen for stress: πέντε, τέσσερα, είκοσι — wrong stress sounds unnatural.' },
  ],
}

export default lesson
