/**
 * Extended reading content — dialogues, micro stories, read-and-listen.
 * Merged into stories.js to keep the main file manageable.
 */

/** @type {import('./stories').Story[]} */
export const EXTENDED_STORIES = [
  {
    id: 'coffee-order',
    packId: 'ordering-dialogues',
    title: 'Έναν καφέ, παρακαλώ',
    titleEnglish: 'A coffee, please',
    level: 'beginner',
    requiredTopics: ['survival-greek', 'articles'],
    sentences: [
      {
        text: '— Καλημέρα! Τι θα θέλατε;',
        english: '— Good morning! What would you like?',
        vocabulary: [
          { word: 'θα θέλατε', english: 'would you like (formal)', partOfSpeech: 'phrase' },
        ],
      },
      {
        text: '— Έναν καφέ, παρακαλώ.',
        english: '— A coffee, please.',
        highlights: [{ word: 'Έναν', type: 'article' }],
        vocabulary: [
          { word: 'παρακαλώ', english: 'please', partOfSpeech: 'phrase' },
        ],
      },
      {
        text: '— Με γάλα ή σκέτο;',
        english: '— With milk or black?',
        vocabulary: [
          { word: 'γάλα', english: 'milk', partOfSpeech: 'noun', gender: 'neuter' },
          { word: 'σκέτο', english: 'plain / black (coffee)', partOfSpeech: 'adjective' },
        ],
      },
      {
        text: '— Με λίγο γάλα. Ευχαριστώ!',
        english: '— With a little milk. Thank you!',
        vocabulary: [{ word: 'λίγο', english: 'a little' }],
      },
    ],
    comprehension: [
      {
        question: 'Τι παραγγέλνει ο πελάτης;',
        options: ['καφέ', 'τσάι', 'χυμό'],
        correctIndex: 0,
      },
      {
        question: 'Πώς θέλει τον καφέ;',
        options: ['με λίγο γάλα', 'σκέτο', 'με ζάχαρη'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'meet-someone',
    packId: 'ordering-dialogues',
    title: 'Χαίρω πολύ',
    titleEnglish: 'Nice to meet you',
    level: 'beginner',
    requiredTopics: ['survival-greek'],
    sentences: [
      {
        text: '— Γεια σου! Είμαι η Ελένη.',
        english: '— Hi! I am Eleni.',
        highlights: [{ word: 'Είμαι', stem: 'Είμ', ending: 'αι', type: 'verb' }],
      },
      {
        text: '— Χαίρω πολύ, Ελένη. Είμαι ο Μάρκος.',
        english: '— Nice to meet you, Eleni. I am Markos.',
        vocabulary: [{ word: 'Χαίρω πολύ', english: 'nice to meet you' }],
      },
      {
        text: '— Από πού είσαι;',
        english: '— Where are you from?',
        vocabulary: [{ word: 'Από πού', english: 'from where' }],
      },
      {
        text: '— Είμαι από την Αθήνα. Κι εσύ;',
        english: '— I am from Athens. And you?',
        vocabulary: [{ word: 'Αθήνα', english: 'Athens' }],
      },
    ],
    comprehension: [
      {
        question: 'Πώς λέγεται η κοπέλα;',
        options: ['Ελένη', 'Μαρία', 'Σοφία'],
        correctIndex: 0,
      },
      {
        question: 'Από πού είναι η Ελένη;',
        options: ['Αθήνα', 'Θεσσαλονίκη', 'Πάτρα'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'where-is-station',
    packId: 'directions-dialogues',
    title: 'Πού είναι ο σταθμός;',
    titleEnglish: 'Where is the station?',
    level: 'beginner',
    requiredTopics: ['question-words', 'prepositions'],
    sentences: [
      {
        text: '— Συγγνώμη, πού είναι ο σταθμός;',
        english: '— Excuse me, where is the station?',
        vocabulary: [
          { word: 'Συγγνώμη', english: 'excuse me' },
          { word: 'σταθμός', english: 'station' },
        ],
      },
      {
        text: '— Πηγαίνετε ευθεία και στρίψτε δεξιά.',
        english: '— Go straight and turn right.',
        vocabulary: [
          { word: 'ευθεία', english: 'straight' },
          { word: 'δεξιά', english: 'right' },
        ],
      },
      {
        text: '— Είναι μακριά;',
        english: '— Is it far?',
        vocabulary: [{ word: 'μακριά', english: 'far' }],
      },
      {
        text: '— Όχι, είναι δίπλα, πέντε λεπτά με τα πόδια.',
        english: '— No, it is nearby, five minutes on foot.',
        vocabulary: [
          { word: 'δίπλα', english: 'nearby' },
          { word: 'λεπτά', english: 'minutes' },
        ],
      },
    ],
    comprehension: [
      {
        question: 'Τι ρωτάει ο τουρίστας;',
        options: ['πού είναι ο σταθμός', 'τι ώρα είναι', 'πόσο κοστίζει'],
        correctIndex: 0,
      },
      {
        question: 'Πόσο μακριά είναι ο σταθμός;',
        options: ['πέντε λεπτά', 'μία ώρα', 'πολύ μακριά'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'market-apples',
    packId: 'shopping-market',
    title: 'Στη λαϊκή',
    titleEnglish: 'At the market',
    level: 'beginner',
    requiredTopics: ['numbers', 'survival-greek'],
    sentences: [
      {
        text: 'Η Μαρία πηγαίνει στη λαϊκή κάθε Σάββατο.',
        english: 'Maria goes to the market every Saturday.',
        vocabulary: [
          { word: 'λαϊκή', english: 'open-air market' },
          { word: 'Σάββατο', english: 'Saturday' },
        ],
      },
      {
        text: 'Αγοράζει μήλα και ντομάτες.',
        english: 'She buys apples and tomatoes.',
        vocabulary: [
          { word: 'μήλα', english: 'apples' },
          { word: 'ντομάτες', english: 'tomatoes' },
        ],
      },
      {
        text: '— Πόσο κοστίζουν τα μήλα;',
        english: '— How much do the apples cost?',
        vocabulary: [{ word: 'κοστίζουν', english: 'they cost' }],
      },
      {
        text: '— Δύο ευρώ το κιλό. Ευχαριστώ!',
        english: '— Two euros per kilo. Thank you!',
        vocabulary: [{ word: 'κιλό', english: 'kilo' }],
      },
    ],
    comprehension: [
      {
        question: 'Πότε πηγαίνει η Μαρία στη λαϊκή;',
        options: ['κάθε Σάββατο', 'κάθε Δευτέρα', 'κάθε Κυριακή'],
        correctIndex: 0,
      },
      {
        question: 'Πόσο κοστίζουν τα μήλα;',
        options: ['δύο ευρώ', 'πέντε ευρώ', 'ένα ευρώ'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'bus-to-work',
    packId: 'transport-commute',
    title: 'Με το λεωφορείο',
    titleEnglish: 'By bus',
    level: 'beginner',
    requiredTopics: ['time', 'prepositions'],
    sentences: [
      {
        text: 'Ο Γιώργος παίρνει το λεωφορείο στις οκτώ.',
        english: 'Giorgos takes the bus at eight.',
        vocabulary: [{ word: 'λεωφορείο', english: 'bus' }],
      },
      {
        text: 'Πηγαίνει στη δουλειά με το λεωφορείο.',
        english: 'He goes to work by bus.',
        vocabulary: [{ word: 'δουλειά', english: 'work' }],
      },
      {
        text: 'Το απόγευμα επιστρέφει σπίτι στις έξι.',
        english: 'In the afternoon he returns home at six.',
        highlights: [{ word: 'επιστρέφει', stem: 'επιστρέφ', ending: 'ει', type: 'verb' }],
      },
      {
        text: 'Μερικές φορές περπατάει — είναι κοντά.',
        english: 'Sometimes he walks — it is close.',
        vocabulary: [{ word: 'περπατάει', english: 'he walks' }],
      },
    ],
    comprehension: [
      {
        question: 'Τι ώρα παίρνει το λεωφορείο;',
        options: ['στις οκτώ', 'στις έξι', 'στις δέκα'],
        correctIndex: 0,
      },
      {
        question: 'Πώς πηγαίνει στη δουλειά;',
        options: ['με το λεωφορείο', 'με το τρένο', 'με αυτοκίνητο'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'hobby-guitar',
    packId: 'hobbies-friends',
    title: 'Η κιθάρα μου',
    titleEnglish: 'My guitar',
    level: 'beginner',
    requiredTopics: ['possessives', 'present-tense'],
    sentences: [
      {
        text: 'Ο Αλέξης αγαπάει τη μουσική.',
        english: 'Alexis loves music.',
        highlights: [{ word: 'αγαπάει', stem: 'αγαπά', ending: 'ει', type: 'verb' }],
      },
      {
        text: 'Παίζει κιθάρα κάθε απόγευμα.',
        english: 'He plays guitar every afternoon.',
        vocabulary: [{ word: 'κιθάρα', english: 'guitar' }],
      },
      {
        text: 'Η κιθάρα του είναι παλιά αλλά όμορφη.',
        english: 'His guitar is old but beautiful.',
        highlights: [{ word: 'του', type: 'ending' }],
        vocabulary: [{ word: 'παλιά', english: 'old' }],
      },
      {
        text: 'Μαθαίνει καινούργια τραγούδια με τους φίλους του.',
        english: 'He learns new songs with his friends.',
        vocabulary: [{ word: 'τραγούδια', english: 'songs' }],
      },
    ],
    comprehension: [
      {
        question: 'Τι παίζει ο Αλέξης;',
        options: ['κιθάρα', 'πιάνο', 'ντραμς'],
        correctIndex: 0,
      },
      {
        question: 'Πότε παίζει;',
        options: ['κάθε απόγευμα', 'κάθε πρωί', 'μόνο Σαββατοκύριακο'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'weekend-trip',
    packId: 'travel-town',
    title: 'Ταξίδι στο νησί',
    titleEnglish: 'Trip to the island',
    level: 'beginner',
    requiredTopics: ['dates', 'prepositions'],
    sentences: [
      {
        text: 'Το Σαββατοκύριακο πηγαίνουμε στο νησί.',
        english: 'On the weekend we go to the island.',
        vocabulary: [{ word: 'νησί', english: 'island' }],
      },
      {
        text: 'Παίρνουμε το πλοίο από το λιμάνι.',
        english: 'We take the ferry from the port.',
        vocabulary: [
          { word: 'πλοίο', english: 'ferry / ship' },
          { word: 'λιμάνι', english: 'port' },
        ],
      },
      {
        text: 'Μένουμε σε ένα μικρό ξενοδοχείο κοντά στη θάλασσα.',
        english: 'We stay in a small hotel near the sea.',
        vocabulary: [{ word: 'θάλασσα', english: 'sea' }],
      },
      {
        text: 'Κολυμπάμε και τρώμε ψάρια.',
        english: 'We swim and eat fish.',
        vocabulary: [{ word: 'Κολυμπάμε', english: 'we swim' }],
      },
    ],
    comprehension: [
      {
        question: 'Πότε πηγαίνουν στο νησί;',
        options: ['το Σαββατοκύριακο', 'κάθε Δευτέρα', 'το καλοκαίρι μόνο'],
        correctIndex: 0,
      },
      {
        question: 'Πώς πηγαίνουν;',
        options: ['με το πλοίο', 'με αεροπλάνο', 'με τρένο'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'listen-morning-routine',
    packId: 'listen-routines',
    title: 'Πρωινή ρουτίνα',
    titleEnglish: 'Morning routine',
    level: 'beginner',
    requiredTopics: ['present-tense', 'time'],
    sentences: [
      {
        text: 'Ξυπνάω στις επτά.',
        english: 'I wake up at seven.',
        highlights: [{ word: 'Ξυπνάω', stem: 'Ξυπν', ending: 'άω', type: 'verb' }],
      },
      {
        text: 'Πίνω καφέ και τρώω ψωμί.',
        english: 'I drink coffee and eat bread.',
        highlights: [
          { word: 'Πίνω', stem: 'Πίν', ending: 'ω', type: 'verb' },
          { word: 'τρώω', stem: 'τρώ', ending: 'ω', type: 'verb' },
        ],
      },
      {
        text: 'Φεύγω από το σπίτι στις οκτώ.',
        english: 'I leave home at eight.',
        vocabulary: [{ word: 'Φεύγω', english: 'I leave' }],
      },
    ],
    comprehension: [
      {
        question: 'Τι ώρα ξυπνάει;',
        options: ['στις επτά', 'στις εννιά', 'στις έξι'],
        correctIndex: 0,
      },
    ],
  },
]
