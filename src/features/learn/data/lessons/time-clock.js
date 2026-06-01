/** @type {import('../index').Lesson} */
const lesson = {
  id: 'time-clock',
  topicId: 'time',
  level: 'beginner',
  pathOrder: 15,
  duration: '4 min',
  title: 'Telling Time',
  summary: 'Τι ώρα είναι; — και, παρά, half past and quarter past.',
  intro: {
    paragraphs: [
      'Asking τι ώρα είναι; (What time is it?) opens every schedule conversation. Greek uses a 12-hour clock in speech with morning/afternoon understood from context.',
      'Minutes past the hour use και: τρεις και μισή (half past three), τρεις και τέταρτο (quarter past three). Minutes to the next hour use παρά: πέντε παρά τέσσερις (four forty-five / quarter to five).',
      'Official schedules may use 24-hour time, but everyday speech matches the patterns below.',
    ],
    examples: [
      { greek: 'Είναι τρεις η ώρα.', english: "It's three o'clock." },
      { greek: 'Τρεις και μισή.', english: 'Half past three.' },
      { greek: 'Πέντε παρά τέσσερις.', english: 'Quarter to four (4:45).' },
    ],
  },
  sections: [
    {
      type: 'grammarTable',
      title: 'Time expressions',
      columns: ['Concept', 'Greek'],
      rows: [
        ['What time is it?', 'Τι ώρα είναι;'],
        ['It is (o\'clock)', 'Είναι …'],
        ['and a half', 'και μισή'],
        ['and a quarter', 'και τέταρτο'],
        ['quarter to', 'παρά … (next hour)'],
        ['exactly', 'ακριβώς'],
      ],
      highlightColumn: 1,
    },
  ],
  commonMistakes: [
    { title: 'παρά logic', text: 'παρά counts toward the next hour — πέντε παρά τέσσερις = 3:45, not 4:45 in some learner intuitions. Verify with context.' },
  ],
}

export default lesson
