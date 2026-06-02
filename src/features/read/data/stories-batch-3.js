/**
 * Reading content — batch 3.
 * Level 3–4 acquisition: past tense + aspect contrasts (παρατατικός vs αόριστος),
 * present perfect, and more natural dialogue. Tied to the "How Greek Thinks
 * About Time" concept so reading reinforces what Learn introduces.
 */

/** @type {import('./stories').Story[]} */
export const BATCH_3_STORIES = [
  // —— Stories in the Past (tier 3) ——
  {
    id: 'past-rainy-day',
    packId: 'past-tales',
    title: 'Μια βροχερή μέρα',
    titleEnglish: 'A rainy day',
    level: 'intermediate',
    requiredTopics: ['past-tense', 'time-aspect'],
    sentences: [
      {
        text: 'Χθες έβρεχε όλη μέρα.',
        english: 'Yesterday it was raining all day.',
        highlights: [{ word: 'έβρεχε', stem: 'έβρεχ', type: 'verb' }],
      },
      {
        text: 'Καθόμουν στο παράθυρο και διάβαζα.',
        english: 'I was sitting at the window and reading.',
        highlights: [
          { word: 'Καθόμουν', stem: 'Καθόμ', type: 'verb' },
          { word: 'διάβαζα', stem: 'διάβαζ', type: 'verb' },
        ],
      },
      {
        text: 'Ξαφνικά, χτύπησε το τηλέφωνο.',
        english: 'Suddenly, the phone rang.',
        highlights: [{ word: 'χτύπησε', stem: 'χτύπησ', type: 'verb' }],
      },
      {
        text: 'Ήταν η φίλη μου η Άννα.',
        english: 'It was my friend Anna.',
      },
      {
        text: 'Μιλήσαμε για μία ώρα.',
        english: 'We talked for one hour.',
        highlights: [{ word: 'Μιλήσαμε', stem: 'Μιλήσ', type: 'verb' }],
      },
    ],
    comprehension: [
      {
        question: 'Τι έκανε ενώ έβρεχε;',
        options: ['διάβαζε στο παράθυρο', 'κοιμόταν', 'περπατούσε έξω'],
        correctIndex: 0,
      },
      {
        question: 'Το «χτύπησε» δείχνει:',
        options: ['μία ολοκληρωμένη πράξη', 'κάτι που συνέβαινε συνέχεια', 'το μέλλον'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'past-first-trip',
    packId: 'past-tales',
    title: 'Το πρώτο μου ταξίδι',
    titleEnglish: 'My first trip',
    level: 'intermediate',
    requiredTopics: ['past-tense', 'time-aspect'],
    sentences: [
      {
        text: 'Πέρσι ταξίδεψα στη Θεσσαλονίκη.',
        english: 'Last year I travelled to Thessaloniki.',
        highlights: [{ word: 'ταξίδεψα', stem: 'ταξίδεψ', type: 'verb' }],
      },
      {
        text: 'Κάθε πρωί έπινα καφέ δίπλα στη θάλασσα.',
        english: 'Every morning I used to drink coffee by the sea.',
        highlights: [{ word: 'έπινα', stem: 'έπιν', type: 'verb' }],
      },
      {
        text: 'Μια μέρα είδα έναν παλιό φίλο.',
        english: 'One day I saw an old friend.',
        highlights: [{ word: 'είδα', stem: 'είδ', type: 'verb' }],
      },
      {
        text: 'Δεν τον είχα δει για δέκα χρόνια.',
        english: 'I had not seen him for ten years.',
        highlights: [{ word: 'είχα', stem: 'είχ', type: 'verb' }],
      },
      {
        text: 'Από τότε, μιλάμε κάθε εβδομάδα.',
        english: 'Since then, we talk every week.',
      },
    ],
    comprehension: [
      {
        question: 'Το «έπινα καφέ κάθε πρωί» δείχνει:',
        options: ['επαναλαμβανόμενη συνήθεια', 'μία φορά', 'το μέλλον'],
        correctIndex: 0,
      },
      {
        question: 'Πόσο καιρό δεν είχε δει τον φίλο του;',
        options: ['δέκα χρόνια', 'δύο μέρες', 'έναν μήνα'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'past-grandmother-kitchen',
    packId: 'past-tales',
    title: 'Η κουζίνα της γιαγιάς',
    titleEnglish: 'Grandmother’s kitchen',
    level: 'intermediate',
    requiredTopics: ['past-tense', 'time-aspect'],
    sentences: [
      {
        text: 'Όταν ήμουν μικρός, περνούσα τα καλοκαίρια στο χωριό.',
        english: 'When I was little, I used to spend summers in the village.',
        highlights: [
          { word: 'ήμουν', stem: 'ήμ', type: 'verb' },
          { word: 'περνούσα', stem: 'περνούσ', type: 'verb' },
        ],
      },
      {
        text: 'Η γιαγιά μαγείρευε από νωρίς το πρωί.',
        english: 'Grandmother used to cook from early in the morning.',
        highlights: [{ word: 'μαγείρευε', stem: 'μαγείρευ', type: 'verb' }],
      },
      {
        text: 'Ένα πρωί, μου έμαθε να φτιάχνω ψωμί.',
        english: 'One morning, she taught me to make bread.',
        highlights: [{ word: 'έμαθε', stem: 'έμαθ', type: 'verb' }],
      },
      {
        text: 'Ακόμα θυμάμαι τη μυρωδιά.',
        english: 'I still remember the smell.',
      },
      {
        text: 'Έχω κρατήσει τη συνταγή της μέχρι σήμερα.',
        english: 'I have kept her recipe to this day.',
        highlights: [{ word: 'Έχω', stem: 'Έχ', type: 'verb' }],
      },
    ],
    comprehension: [
      {
        question: '«Μαγείρευε» vs «έμαθε» — ποια είναι μία ολοκληρωμένη πράξη;',
        options: ['έμαθε', 'μαγείρευε', 'καμία'],
        correctIndex: 0,
      },
      {
        question: 'Το «έχω κρατήσει» συνδέει το παρελθόν με:',
        options: ['το τώρα', 'το μέλλον', 'τίποτα'],
        correctIndex: 0,
      },
    ],
  },
  // —— Natural Greek (tier 4) ——
  {
    id: 'natural-changed-plans',
    packId: 'natural-greek',
    title: 'Αλλάξαμε σχέδια',
    titleEnglish: 'We changed plans',
    level: 'intermediate',
    requiredTopics: ['time-aspect'],
    sentences: [
      {
        text: 'Λέγαμε να πάμε σινεμά, αλλά τελικά μείναμε σπίτι.',
        english: 'We were saying we’d go to the cinema, but in the end we stayed home.',
        highlights: [
          { word: 'Λέγαμε', stem: 'Λέγ', type: 'verb' },
          { word: 'μείναμε', stem: 'μείν', type: 'verb' },
        ],
      },
      {
        text: 'Είχα ήδη μαγειρέψει, οπότε φάγαμε εδώ.',
        english: 'I had already cooked, so we ate here.',
        highlights: [{ word: 'Είχα', stem: 'Είχ', type: 'verb' }],
      },
      {
        text: 'Θα πάμε την άλλη φορά — το ’χουμε πει χίλιες φορές!',
        english: 'We’ll go next time — we’ve said it a thousand times!',
      },
      {
        text: 'Έτσι κι αλλιώς, περάσαμε ωραία.',
        english: 'Either way, we had a nice time.',
        highlights: [{ word: 'περάσαμε', stem: 'περάσ', type: 'verb' }],
      },
    ],
    comprehension: [
      {
        question: 'Γιατί έφαγαν σπίτι;',
        options: ['είχε ήδη μαγειρέψει', 'ήταν κλειστό το σινεμά', 'δεν είχαν λεφτά'],
        correctIndex: 0,
      },
      {
        question: 'Η έκφραση «το ’χουμε πει χίλιες φορές» είναι:',
        options: ['καθημερινός, φυσικός λόγος', 'πολύ επίσημη', 'γραπτή μόνο'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'natural-morning-rush',
    packId: 'natural-greek',
    title: 'Πρωινή βιασύνη',
    titleEnglish: 'Morning rush',
    level: 'intermediate',
    requiredTopics: ['time-aspect'],
    sentences: [
      {
        text: 'Σήμερα ξύπνησα αργά και τα έχασα όλα.',
        english: 'Today I woke up late and lost track of everything.',
        highlights: [{ word: 'ξύπνησα', stem: 'ξύπνησ', type: 'verb' }],
      },
      {
        text: 'Ενώ έτρεχα για το λεωφορείο, μου χτύπησε το τηλέφωνο.',
        english: 'While I was running for the bus, my phone rang.',
        highlights: [
          { word: 'έτρεχα', stem: 'έτρεχ', type: 'verb' },
          { word: 'χτύπησε', stem: 'χτύπησ', type: 'verb' },
        ],
      },
      {
        text: 'Το λεωφορείο είχε φύγει ήδη.',
        english: 'The bus had already left.',
        highlights: [{ word: 'είχε', stem: 'είχ', type: 'verb' }],
      },
      {
        text: 'Στο τέλος, πήγα με τα πόδια και ηρέμησα.',
        english: 'In the end, I walked and calmed down.',
        highlights: [{ word: 'πήγα', stem: 'πήγ', type: 'verb' }],
      },
    ],
    comprehension: [
      {
        question: '«Έτρεχα» και «χτύπησε» μαζί δείχνουν:',
        options: [
          'συνεχιζόμενη πράξη + μία στιγμιαία πράξη',
          'δύο μελλοντικές πράξεις',
          'δύο συνήθειες',
        ],
        correctIndex: 0,
      },
      {
        question: 'Γιατί δεν πρόλαβε το λεωφορείο;',
        options: ['είχε φύγει ήδη', 'ήταν χαλασμένο', 'δεν ήρθε ποτέ'],
        correctIndex: 0,
      },
    ],
  },
]
