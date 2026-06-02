/** @type {import('../index').Lesson} */
const lesson = {
  id: 'survival-greek',
  topicId: 'survival-greek',
  level: 'beginner',
  pathOrder: 9,
  duration: '5–6 min',
  title: 'Everyday Survival Greek',
  summary: 'Greetings, shopping, food, introductions, and getting around.',
  intro: {
    paragraphs: [
      'Before long grammar chains, you need phrases that work on the street: hello, thank you, how much, where is… Greeks appreciate any attempt in Greek, even a short γεια σου or ευχαριστώ.',
      'Survival Greek is not “tourist talk” — it is the social glue of daily life. You will use these lines in cafés, kiosks, taxis, and when meeting people. Pair them with gestures and a smile; pronunciation improves with use.',
      'This lesson groups high-frequency phrases by situation. Learn them as whole chunks first; grammar analysis comes later.',
    ],
    examples: [
      { greek: 'Γεια σου / Γεια σας', english: 'Hi (informal / formal)' },
      { greek: 'Ευχαριστώ', english: 'Thank you' },
      { greek: 'Πόσο κοστίζει;', english: 'How much does it cost?' },
    ],
  },
  sections: [
    {
      type: 'grammarTable',
      title: 'Greetings & politeness',
      columns: ['Greek', 'English'],
      rows: [
        ['Γεια σου / Γεια σας', 'Hi (informal / formal)'],
        ['Καλημέρα / Καλησπέρα', 'Good morning / evening'],
        ['Παρακαλώ / Ευχαριστώ', 'Please / Thank you'],
        ['Συγγνώμη', 'Sorry / Excuse me'],
      ],
      highlightColumn: 0,
    },
    {
      type: 'grammarTable',
      title: 'Shopping & food',
      columns: ['Greek', 'English'],
      rows: [
        ['Πόσο κοστίζει;', 'How much?'],
        ['Θα το πάρω', "I'll take it"],
        ['Ένα καφέ, παρακαλώ', 'One coffee, please'],
        ['Τον λογαριασμό', 'The bill'],
      ],
      highlightColumn: 0,
    },
    {
      type: 'grammarTable',
      title: 'Directions & transport',
      columns: ['Greek', 'English'],
      rows: [
        ['Πού είναι…;', 'Where is…?'],
        ['Αριστερά / Δεξιά', 'Left / Right'],
        ['Στάση / Εισιτήριο', 'Stop / Ticket'],
        ['Μετρό / Λεωφορείο', 'Metro / Bus'],
      ],
      highlightColumn: 0,
    },
    {
      type: 'examples',
      title: 'Mini dialogues',
      items: [
        { greek: '— Γεια σας! — Γεια σας!', english: 'Hello! — Hello!' },
        { greek: '— Ένα καφέ, παρακαλώ. — Ορίστε.', english: 'One coffee, please. — Here you go.' },
        { greek: '— Πού είναι ο σταθμός; — Ευθεία και αριστερά.', english: 'Where is the station? — Straight and left.' },
        { greek: '— Πόσο κοστίζει; — Τρία ευρώ. — Το παίρνω.', english: 'How much? — Three euros. — I\'ll take it.' },
        { greek: '— Συγγνώμη, μιλάτε αγγλικά; — Λίγο. — Εντάξει, ευχαριστώ.', english: 'Excuse me, do you speak English? — A little. — OK, thanks.' },
        { greek: '— Τι κάνεις; — Καλά, εσύ; — Κι εγώ.', english: 'How are you? — Good, you? — Me too.' },
      ],
    },
  ],
  commonMistakes: [
    { title: 'Γεια σου vs σας', text: 'Use σας with strangers, older people, or groups; σου with friends.' },
    { title: 'Παρακαλώ', text: 'Means please, you’re welcome, and here you are — context tells you which.' },
  ],
}

export default lesson
