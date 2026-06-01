/** @type {import('../index').Lesson} */
const lesson = {
  id: 'compound-sentences',
  topicId: 'compound-sentences',
  level: 'intermediate',
  pathOrder: 22,
  duration: '4 min',
  title: 'Compound Sentences',
  summary: 'και, αλλά, επειδή, όταν — connect ideas naturally.',
  intro: {
    paragraphs: [
      'Real Greek links ideas with conjunctions: και (and), αλλά (but), επειδή (because), όταν (when). They let you move beyond single-clause textbook sentences.',
      'επειδή explains reasons; όταν sets time conditions. Both introduce sub-clauses — verb order stays flexible in modern Greek, but keep subject clarity.',
      'Start by joining sentences you already know: Πίνω καφέ και διαβάζω. Θέλω να φύγω επειδή είμαι κουρασμένος.',
    ],
    examples: [
      { greek: 'Πίνω τσάι αλλά δεν πίνω καφέ.', english: 'I drink tea but not coffee.' },
      { greek: 'Μένω επειδή βρέχει.', english: 'I stay because it rains.' },
      { greek: 'Όταν τρώω, είμαι χαρούμενος.', english: 'When I eat, I am happy.' },
    ],
  },
  sections: [
    {
      type: 'grammarTable',
      title: 'Linking words',
      columns: ['Greek', 'Role', 'Example fragment'],
      rows: [
        ['και', 'and', '… και πηγαίνω'],
        ['αλλά', 'but', '… αλλά δεν θέλω'],
        ['επειδή', 'because', 'επειδή έχω δουλειά'],
        ['όταν', 'when', 'όταν φεύγω'],
      ],
      highlightColumn: 0,
    },
  ],
  commonMistakes: [
    { title: 'Comma rhythm', text: 'Long compound sentences benefit from commas in writing — in speech, pauses do the same job.' },
  ],
}

export default lesson
