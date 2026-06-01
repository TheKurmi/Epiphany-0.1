/** @type {import('../index').Lesson} */
const lesson = {
  id: 'plurals-patterns',
  topicId: 'plurals',
  level: 'beginner',
  pathOrder: 13,
  duration: '4 min',
  title: 'Plural Patterns',
  summary: 'Masculine, feminine, and neuter plurals — spot the transformations.',
  intro: {
    paragraphs: [
      'Greek plurals change both the ending of the noun and the article: ο καφές → οι καφέδες, η μέρα → οι μέρες, το παιδί → τα παιδιά. Gender still matters in plural.',
      'Masculine nouns often add -ες or -δες; feminine nouns often change -α to -ες; neuter nouns often use -α in plural (παιδί → παιδιά). Patterns repeat — memorizing every word is not necessary.',
      'Plural articles: οι (masc. & fem.), τα (neuter). Listen for οι and τα as signals that the noun is plural.',
    ],
    examples: [
      { greek: 'οι καφέδες', english: 'the coffees' },
      { greek: 'οι μέρες', english: 'the days' },
      { greek: 'τα παιδιά', english: 'the children' },
    ],
  },
  sections: [
    {
      type: 'grammarTable',
      title: 'Plural articles & endings',
      columns: ['Gender', 'Singular article', 'Plural article', 'Pattern'],
      rows: [
        ['Masculine', 'ο', 'οι', '-ες / -δες (καφές → καφέδες)'],
        ['Feminine', 'η', 'οι', '-α → -ες (μέρα → μέρες)'],
        ['Neuter', 'το', 'τα', '-ι → -ιά or -α (παιδί → παιδιά)'],
      ],
      highlightColumn: 3,
    },
    {
      type: 'examples',
      title: 'Singular → plural',
      items: [
        { greek: 'ο καφές → οι καφέδες', english: 'coffee → coffees' },
        { greek: 'η μέρα → οι μέρες', english: 'day → days' },
        { greek: 'το παιδί → τα παιδιά', english: 'child → children' },
      ],
    },
  ],
  commonMistakes: [
    { title: 'Same article οι', text: 'Both masculine and feminine plurals use οι — gender shows on the noun ending.' },
  ],
}

export default lesson
