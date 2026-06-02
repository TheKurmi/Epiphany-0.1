/** @type {import('../index').Lesson} */
const lesson = {
  id: 'plurals-patterns',
  topicId: 'plurals',
  level: 'beginner',
  pathOrder: 13,
  duration: '4–5 min',
  title: 'Plural Patterns',
  summary: 'Masculine, feminine, and neuter plurals — spot the transformations.',
  intro: {
    paragraphs: [
      'Greek plurals change both the ending of the noun and the article: ο καφές → οι καφέδες, η μέρα → οι μέρες, το παιδί → τα παιδιά. Gender still matters in plural — you are not learning three random forms, but three predictable families.',
      'Think of plural as a **pattern swap**: the stem often stays recognizable, and the ending signals “more than one.” Masculine nouns often add -ες or -δες; feminine nouns often change -α to -ες; neuter nouns often use -α in plural (παιδί → παιδιά). Once you hear οι or τα, your brain should expect a plural ending on the noun.',
      'Plural articles: **οι** (masculine & feminine plural), **τα** (neuter plural). In speech, Greeks rarely pause to explain grammar — they just say οι μέρες. Your job is to recognize the article + ending combo as a plural signal.',
    ],
    examples: [
      {
        greek: 'οι καφέδες',
        english: 'the coffees',
        highlight: { word: 'καφέδες', stem: 'καφέδ', ending: 'ες', type: 'noun', label: 'Masculine plural ending (-ες / -δες)' },
      },
      {
        greek: 'οι μέρες',
        english: 'the days',
        highlight: { word: 'μέρες', stem: 'μέρ', ending: 'ες', type: 'noun', label: 'Feminine plural: -α → -ες' },
      },
      {
        greek: 'τα παιδιά',
        english: 'the children',
        highlight: { word: 'παιδιά', stem: 'παιδι', ending: 'ά', type: 'noun', label: 'Neuter plural ending (-ιά)' },
      },
    ],
  },
  sections: [
    {
      type: 'grammarTable',
      title: 'Plural articles & endings',
      caption: 'Same gender logic as singular — new endings, same families.',
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
        {
          greek: 'ο καφές → οι καφέδες',
          english: 'coffee → coffees',
          note: 'Masculine -ες/-δες pattern',
        },
        {
          greek: 'η μέρα → οι μέρες',
          english: 'day → days',
          note: 'Feminine -α becomes -ες',
        },
        {
          greek: 'το παιδί → τα παιδιά',
          english: 'child → children',
          note: 'Neuter -ι often becomes -ιά in plural',
        },
      ],
    },
    {
      type: 'note',
      title: 'Learner tip',
      paragraphs: [
        'Do not memorize every noun separately. When you learn a new word, note its gender and try to predict the plural article (οι or τα). Wrong gender in plural is one of the most common learner mistakes — but also one of the easiest to fix with pattern practice.',
      ],
    },
  ],
  commonMistakes: [
    {
      title: 'Same article οι',
      text: 'Both masculine and feminine plurals use οι — gender shows on the noun ending, not the article.',
    },
    {
      title: 'Forgetting τα for neuter',
      text: 'Neuter plural always uses τα: το βιβλίο → τα βιβλία. Listen for τα as your plural signal.',
    },
  ],
}

export default lesson
