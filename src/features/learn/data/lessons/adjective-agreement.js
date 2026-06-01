/** @type {import('../index').Lesson} */
const lesson = {
  id: 'adjective-agreement',
  topicId: 'adjectives',
  level: 'intermediate',
  pathOrder: 20,
  duration: '4 min',
  title: 'Adjective Agreement',
  summary: 'Match adjectives to noun gender and number.',
  intro: {
    paragraphs: [
      'Adjectives must agree with the noun they describe in gender, number, and case. ο καλός καφές (good coffee, masc.), η καλή μέρα (good day, fem.), το καλό παιδί (good child, neut.).',
      'Many adjectives use three endings: -ος (masculine), -η (feminine), -ο (neuter). Plural endings extend the pattern: καλοί, καλές, καλά.',
      'Agreement is visible — once you know noun gender, adjective choice becomes predictable.',
    ],
    examples: [
      { greek: 'ο μεγάλος σκύλος', english: 'the big dog' },
      { greek: 'η μεγάλη γάτα', english: 'the big cat' },
      { greek: 'το μεγάλο σπίτι', english: 'the big house' },
    ],
  },
  sections: [
    {
      type: 'grammarTable',
      title: 'καλός / καλή / καλό',
      columns: ['Gender', 'Singular', 'Plural'],
      rows: [
        ['Masculine', 'καλός', 'καλοί'],
        ['Feminine', 'καλή', 'καλές'],
        ['Neuter', 'καλό', 'καλά'],
      ],
      highlightColumn: 1,
    },
  ],
  commonMistakes: [
    { title: 'Order', text: 'Adjectives usually follow the noun in Greek: ο καφές καλός — but some common adjectives precede it.' },
  ],
}

export default lesson
