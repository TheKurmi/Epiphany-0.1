/** @type {import('../index').Lesson} */
const lesson = {
  id: 'possessives',
  topicId: 'possessives',
  level: 'beginner',
  pathOrder: 10,
  duration: '3–4 min',
  title: 'Possessives — μου, σου, του…',
  summary: 'Say what belongs to whom with short possessive forms.',
  intro: {
    paragraphs: [
      'Greek possessives are short clitics that come after the noun: το βιβλίο μου (my book), η ώρα σου (your time). They do not change like English “my/mine” — the noun keeps its article and gender.',
      'There are six forms you use constantly: μου (my), σου (your singular), του/της/του (his/her/its — same spelling for his and her in many contexts), μας (our), σας (your plural/formal), τους (their).',
      'Learn them in phrases, not isolation. Possessives unlock natural sentences about family, home, and daily life.',
    ],
    examples: [
      { greek: 'το σπίτι μου', english: 'my house' },
      { greek: 'η μητέρα σου', english: 'your mother' },
      { greek: 'οι φίλοι μας', english: 'our friends' },
    ],
  },
  sections: [
    {
      type: 'grammarTable',
      title: 'Possessive forms',
      columns: ['Person', 'Form', 'Example'],
      rows: [
        ['my', 'μου', 'ο σκύλος μου'],
        ['your (sg.)', 'σου', 'το όνομά σου'],
        ['his / her', 'του / της', 'το αμάξι του · η δουλειά της'],
        ['our', 'μας', 'η γάτα μας'],
        ['your (pl./formal)', 'σας', 'το τηλέφωνό σας'],
        ['their', 'τους', 'τα παιδιά τους'],
      ],
      highlightColumn: 1,
    },
  ],
  commonMistakes: [
    { title: 'Position', text: 'Possessive follows the noun (and often the whole noun phrase): το κόκκινο αμάξι μου.' },
    { title: 'του vs της', text: 'Masculine/neuter nouns take του; feminine nouns take της.' },
  ],
}

export default lesson
