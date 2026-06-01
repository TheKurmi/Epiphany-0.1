/** @type {import('../index').Lesson} */
const lesson = {
  id: 'frequency-habit',
  topicId: 'frequency',
  level: 'intermediate',
  pathOrder: 21,
  duration: '3 min',
  title: 'Frequency & Habit',
  summary: 'πάντα, συχνά, ποτέ — how often things happen.',
  intro: {
    paragraphs: [
      'Frequency adverbs describe habits: πάντα (always), συχνά (often), συνήθως (usually), σπάνια (rarely), ποτέ (never). They usually sit before the verb or at the sentence start.',
      'ποτέ in questions means “ever” (Έχεις ποτέ…;), while ποτέ alone in statements means “never” (Δεν πηγαίνω ποτέ). Context and negation matter.',
      'Combine with present tense for routines: Πάντα πίνω νερό το πρωί.',
    ],
    examples: [
      { greek: 'Πάντα μελετάω.', english: 'I always study.' },
      { greek: 'Συχνά πηγαίνω πεζός.', english: 'I often walk.' },
      { greek: 'Δεν πίνω ποτέ καφέ.', english: 'I never drink coffee.' },
    ],
  },
  sections: [
    {
      type: 'grammarTable',
      title: 'Frequency words',
      columns: ['Greek', 'English'],
      rows: [
        ['πάντα', 'always'],
        ['συνήθως', 'usually'],
        ['συχνά', 'often'],
        ['σπάνια', 'rarely'],
        ['ποτέ', 'never / ever (in questions)'],
      ],
      highlightColumn: 0,
    },
  ],
  commonMistakes: [
    { title: 'Double negation', text: 'Never uses δεν + ποτέ: Δεν έρχομαι ποτέ.' },
  ],
}

export default lesson
