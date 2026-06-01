/** @type {import('../index').Lesson} */
const lesson = {
  id: 'past-tense-intro',
  topicId: 'past-tense',
  level: 'intermediate',
  pathOrder: 18,
  duration: '5 min',
  title: 'Past Tense — Introduction',
  summary: 'Talk about what already happened with common past forms.',
  intro: {
    paragraphs: [
      'The past tense lets you tell stories: what you did yesterday, where you went, what you said. Modern Greek mainly uses the simple past (aorist) for completed actions in everyday speech.',
      'Many high-frequency verbs have compact past forms you can learn as units: πήγα (I went), είπα (I said), ήπια (I drank). Regular patterns exist, but start with verbs you will actually use.',
      'Past forms often differ completely from the present stem — πηγαίνω (I go) vs πήγα (I went). Treat past and present as related vocabulary until patterns click.',
    ],
    examples: [
      { greek: 'Πήγα στο σπίτι.', english: 'I went home.' },
      { greek: 'Είπα ναι.', english: 'I said yes.' },
      { greek: 'Ήπια καφέ.', english: 'I drank coffee.' },
    ],
  },
  sections: [
    {
      type: 'grammarTable',
      title: 'Common past forms',
      columns: ['Present', 'Past (aorist)', 'English'],
      rows: [
        ['πηγαίνω', 'πήγα', 'I go / went'],
        ['λέω', 'είπα', 'I say / said'],
        ['πίνω', 'ήπια', 'I drink / drank'],
        ['τρώω', 'έφαγα', 'I eat / ate'],
        ['βλέπω', 'είδα', 'I see / saw'],
      ],
      highlightColumn: 1,
    },
  ],
  commonMistakes: [
    { title: 'Stem change', text: 'Do not assume past = present stem + ending — check the table.' },
  ],
}

export default lesson
