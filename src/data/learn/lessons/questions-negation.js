/** @type {import('../index').Lesson} */
const lesson = {
  id: 'questions-negation',
  topicId: 'questions-negation',
  level: 'beginner',
  pathOrder: 6,
  duration: '3–4 min',
  title: 'Questions & Negation',
  summary: 'Raise your voice — or add δεν before the verb.',
  intro: {
    paragraphs: [
      'Forming yes/no questions in Greek is simpler than many learners expect. Often, the words stay exactly the same as a statement — you change your intonation (raise your voice at the end) or adjust punctuation in writing. Μιλάς ελληνικά with a rising tone means “Do you speak Greek?” No extra helper word like English “do” is required.',
      'In written Greek, questions use a semicolon (;) where English uses a question mark (?). So Μιλάς ελληνικά; is a question, while Μιλάς ελληνικά. is a statement. When reading, look for that semicolon — it is your visual cue that a question is coming.',
      'Negation is equally straightforward: place δεν (pronounced “then”) immediately before the verb. Δεν μιλάω means “I do not speak.” The word δεν always hugs the verb — never separate it with other words. This one rule covers most everyday negative sentences.',
    ],
    examples: [
      { greek: 'Μιλάς ελληνικά;', english: 'Do you speak Greek?' },
      { greek: 'Δεν μιλάω.', english: 'I do not speak.' },
      { greek: 'Δεν έχω χρόνο.', english: 'I do not have time.' },
    ],
  },
  sections: [
    {
      type: 'grammarTable',
      title: 'Three transforms',
      columns: ['Type', 'Greek', 'English'],
      rows: [
        ['Statement', 'Μιλάς ελληνικά.', 'You speak Greek.'],
        ['Question', 'Μιλάς ελληνικά;', 'Do you speak Greek?'],
        ['Negative', 'Δεν μιλάω.', 'I do not speak.'],
      ],
      highlightColumn: 1,
    },
  ],
  commonMistakes: [
    {
      title: 'δεν placement',
      text: 'δεν goes right before the verb: Δεν μιλάω ✓ — not Δεν εγώ μιλάω ✗.',
    },
    {
      title: 'Question punctuation',
      text: 'Written Greek uses ; for questions (not ?). Same words, different punctuation.',
    },
  ],
  quiz: {
    question: 'How do you say “I do not speak”?',
    options: ['Μιλάω δεν', 'Δεν μιλάω', 'Δεν είμαι μιλάω'],
    correctIndex: 1,
  },
  deepDive: {
    title: 'Dive deeper',
    teaser: 'With είμαι/έχω, question words, and intonation',
    sections: [
      {
        type: 'examples',
        title: 'More patterns',
        items: [
          { greek: 'Είσαι καλά;', english: 'Are you well?' },
          { greek: 'Δεν έχω χρόνο.', english: 'I do not have time.' },
          { greek: 'Δεν είναι εδώ.', english: 'He/she is not here.' },
        ],
      },
      {
        type: 'note',
        title: 'Question words (preview)',
        paragraphs: [
          'Τι (what), Πού (where), Πότε (when), Γιατί (why) — add these before a statement for open questions. Τι θέλεις; = What do you want?',
        ],
      },
    ],
  },
}

export default lesson
