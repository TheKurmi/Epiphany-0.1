/** @type {import('../index').Lesson} */
const lesson = {
  id: 'question-words',
  topicId: 'question-words',
  level: 'beginner',
  pathOrder: 11,
  duration: '3–4 min',
  title: 'Question Words',
  summary: 'ποιος, τι, πού, γιατί, πότε, πώς — ask real questions.',
  intro: {
    paragraphs: [
      'Question words are the keys to conversations. Once you know τι (what), πού (where), and γιατί (why), you can redirect any dialogue and understand answers.',
      'Greek question words usually stay at the start of the sentence, and yes/no questions often need only rising intonation or the particle μήπως — but wh-questions always need these words.',
      'ποιος changes like an adjective (ποιος, ποια, ποιο) to match gender. The others are invariable.',
    ],
    examples: [
      { greek: 'Τι κάνεις;', english: 'What are you doing?' },
      { greek: 'Πού μένεις;', english: 'Where do you live?' },
      { greek: 'Γιατί; — Γιατί θέλω.', english: 'Why? — Because I want to.' },
    ],
  },
  sections: [
    {
      type: 'grammarTable',
      title: 'Core question words',
      columns: ['Meaning', 'Greek', 'Example'],
      rows: [
        ['who?', 'ποιος / ποια / ποιο', 'Ποιος είσαι;'],
        ['what?', 'τι', 'Τι θέλεις;'],
        ['where?', 'πού', 'Πού πάμε;'],
        ['why?', 'γιατί', 'Γιατί δεν έρχεσαι;'],
        ['when?', 'πότε', 'Πότε φεύγεις;'],
        ['how?', 'πώς', 'Πώς σε λένε;'],
      ],
      highlightColumn: 1,
    },
  ],
  commonMistakes: [
    { title: 'τι vs ποιος', text: 'τι = what (thing/idea); ποιος = which person/who.' },
    { title: 'Accent on πού', text: 'που (without accent) means “that” — πού with accent means “where”.' },
  ],
}

export default lesson
