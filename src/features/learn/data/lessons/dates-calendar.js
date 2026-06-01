/** @type {import('../index').Lesson} */
const lesson = {
  id: 'dates-calendar',
  topicId: 'dates',
  level: 'beginner',
  pathOrder: 14,
  duration: '4 min',
  title: 'Days, Months & Dates',
  summary: 'Calendar vocabulary — σήμερα, αύριο, and ημερομηνίες.',
  intro: {
    paragraphs: [
      'Talking about time on a calendar is essential for appointments, travel, and daily plans. Greek days and months are capitalized and often resemble English or Latin roots: Δευτέρα (Monday), Ιανουάριος (January).',
      'Relative words anchor conversation: σήμερα (today), αύριο (tomorrow), χθες (yesterday). Combine them with days: αύριο Δευτέρα — though Greeks often just say τη Δευτέρα (on Monday).',
      'Dates are often spoken day-first: 15 Μαΐου (the 15th of May). Numbers from the Numbers lesson combine here naturally.',
    ],
    examples: [
      { greek: 'σήμερα', english: 'today' },
      { greek: 'τη Δευτέρα', english: 'on Monday' },
      { greek: '15 Μαΐου', english: '15 May' },
    ],
  },
  sections: [
    {
      type: 'grammarTable',
      title: 'Days of the week',
      columns: ['Day', 'Greek'],
      rows: [
        ['Monday', 'Δευτέρα'], ['Tuesday', 'Τρίτη'], ['Wednesday', 'Τετάρτη'],
        ['Thursday', 'Πέμπτη'], ['Friday', 'Παρασκευή'], ['Saturday', 'Σάββατο'], ['Sunday', 'Κυριακή'],
      ],
      highlightColumn: 1,
    },
    {
      type: 'grammarTable',
      title: 'Months (sample)',
      columns: ['Month', 'Greek'],
      rows: [
        ['January', 'Ιανουάριος'], ['March', 'Μάρτιος'], ['May', 'Μάιος'],
        ['July', 'Ιούλιος'], ['September', 'Σεπτέμβριος'], ['December', 'Δεκέμβριος'],
      ],
      highlightColumn: 1,
    },
  ],
  commonMistakes: [
    { title: 'Capital letters', text: 'Days and months are capitalized in Greek.' },
    { title: 'χθες vs χτες', text: 'Both spellings exist for “yesterday” — χθες is more formal in writing.' },
  ],
}

export default lesson
