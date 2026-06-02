/**
 * Foundational grammar charts — the educational core of the Charts section.
 */
import {
  PRESENT_OMEGA_ENDINGS,
  PRESENT_ALPHA_ENDINGS,
  conjugate,
} from '../patterns/conjugation'

const pinoRows = conjugate('πίν', PRESENT_OMEGA_ENDINGS)
const milaoRows = conjugate('μιλ', PRESENT_ALPHA_ENDINGS)

const PERSONS = ['εγώ', 'εσύ', 'αυτός/ή/ό', 'εμείς', 'εσείς', 'αυτοί/ές/ά']

export const FOUNDATIONAL_CHARTS = [
  {
    id: 'present-endings',
    categoryId: 'verbs',
    title: 'Present Tense Endings',
    summary: 'Six persons, one pattern — -ω, -εις, -ει, -ουμε, -ετε, -ουν.',
    foundation: true,
    sections: [
      {
        type: 'text',
        title: 'What you are learning',
        paragraphs: [
          'Greek verbs tell you who is acting through their ending. Learn the six endings once, and you unlock hundreds of everyday verbs. The stem carries the meaning; the ending carries the person.',
          'In speech, Greeks often drop εγώ and εσύ because the verb ending already makes the subject clear. Train your ear to catch -ω, -εις, -ει — they are the real grammar signal.',
        ],
      },
      {
        type: 'patternStrip',
        title: 'See the endings repeat',
        caption: 'Same stem γράφ-, different endings — this is the whole game.',
        stem: 'γράφ',
        forms: [
          { ending: 'ω', label: 'εγώ', form: 'γράφω' },
          { ending: 'εις', label: 'εσύ', form: 'γράφεις' },
          { ending: 'ει', label: 'αυτός/ή/ό', form: 'γράφει' },
          { ending: 'ουμε', label: 'εμείς', form: 'γράφουμε' },
          { ending: 'ετε', label: 'εσείς', form: 'γράφετε' },
          { ending: 'ουν', label: 'αυτοί/ές/ά', form: 'γράφουν' },
        ],
      },
      {
        type: 'grammarTable',
        title: 'The six endings',
        caption: 'Applies to πίνω, γράφω, διαβάζω, έχω, and most daily verbs.',
        columns: ['Person', 'Ending', 'Example (πίνω)'],
        rows: PRESENT_OMEGA_ENDINGS.map(({ person, ending, suffix }) => [
          person,
          ending,
          `πίν${suffix}`,
        ]),
        highlightColumn: 1,
      },
      {
        type: 'conjugationTable',
        title: 'Full conjugation: πίνω',
        stem: 'πίν',
        rows: pinoRows,
      },
      {
        type: 'tips',
        title: 'Recognition tips',
        items: [
          {
            title: 'Stress the ending syllable',
            text: 'In -ω verbs, accent usually falls on the ending: πίν-ω, πίν-εις, πίν-ει. Listen for the beat.',
          },
          {
            title: 'Same ending, new stem',
            text: 'Once you know -εις means “you,” it works for πίνεις, γράφεις, διαβάζεις — only the stem changes.',
          },
          {
            title: 'Skip the pronoun when confident',
            text: 'Πίνω καφέ is natural without εγώ. Add the pronoun only for emphasis.',
          },
        ],
      },
      {
        type: 'examples',
        title: 'In real sentences',
        items: [
          {
            greek: 'Γράφω email.',
            english: 'I write an email.',
            highlight: { word: 'Γράφω', stem: 'Γράφ', ending: 'ω', type: 'verb' },
          },
          {
            greek: 'Διαβάζεις ελληνικά;',
            english: 'Do you read Greek?',
            highlight: { word: 'Διαβάζεις', stem: 'Διαβάζ', ending: 'εις', type: 'verb' },
          },
          {
            greek: 'Η Μαρία πίνει καφέ.',
            english: 'Maria drinks coffee.',
            highlight: { word: 'πίνει', stem: 'πίν', ending: 'ει', type: 'verb' },
          },
        ],
      },
    ],
  },
  {
    id: 'articles-gender',
    categoryId: 'nouns',
    title: 'Articles & Gender',
    summary: 'ο, η, το — singular and plural. Gender is grammar, not biology.',
    foundation: true,
    sections: [
      {
        type: 'text',
        title: 'Why gender matters',
        paragraphs: [
          'Every Greek noun is masculine, feminine, or neuter. Gender controls articles, adjectives, and agreement — learn nouns with their article as one unit.',
        ],
      },
      {
        type: 'grammarTable',
        title: 'Singular articles',
        columns: ['Gender', 'Article', 'Example noun', 'Intuition tip'],
        rows: [
          ['Masculine', 'ο', 'ο καφές', 'Often -ος endings'],
          ['Feminine', 'η', 'η μέρα', 'Often -α / -η endings'],
          ['Neuter', 'το', 'το νερό', 'Often -ο / -ι endings'],
        ],
        highlightColumn: 1,
      },
      {
        type: 'grammarTable',
        title: 'Plural articles',
        columns: ['Gender', 'Singular', 'Plural', 'Example'],
        rows: [
          ['Masculine', 'ο', 'οι', 'ο καφές → οι καφέδες'],
          ['Feminine', 'η', 'οι', 'η μέρα → οι μέρες'],
          ['Neuter', 'το', 'τα', 'το παιδί → τα παιδιά'],
        ],
        highlightColumn: 2,
      },
      {
        type: 'tips',
        title: 'Beginner tips',
        items: [
          {
            title: 'Do not guess from English',
            text: 'Gender is grammatical — το τραπέζι (table) is neuter regardless of meaning.',
          },
          {
            title: 'Article + noun = one chunk',
            text: 'Memorize η ώρα, not ώρα alone.',
          },
        ],
      },
    ],
  },
  {
    id: 'question-words',
    categoryId: 'syntax',
    title: 'Question Words',
    summary: 'τι, ποιος, πού, γιατί, πότε, πώς — ask real questions.',
    foundation: true,
    sections: [
      {
        type: 'grammarTable',
        title: 'Core question words',
        columns: ['Greek', 'English', 'Mini example'],
        rows: [
          ['τι', 'what', 'Τι κάνεις;'],
          ['ποιος / ποια / ποιο', 'who / which', 'Ποιος είσαι;'],
          ['πού', 'where', 'Πού μένεις;'],
          ['γιατί', 'why', 'Γιατί;'],
          ['πότε', 'when', 'Πότε φεύγεις;'],
          ['πώς', 'how', 'Πώς σε λένε;'],
        ],
        highlightColumn: 0,
      },
      {
        type: 'examples',
        title: 'Conversational pairs',
        items: [
          { greek: '— Τι θέλεις; — Νερό, παρακαλώ.', english: '— What do you want? — Water, please.' },
          { greek: '— Πού είναι το καφέ;', english: '— Where is the café?' },
          { greek: '— Γιατί μαθαίνεις ελληνικά;', english: '— Why are you learning Greek?' },
        ],
      },
    ],
  },
  {
    id: 'verb-groups',
    categoryId: 'verbs',
    title: 'Verb Groups / Συζυγίες',
    summary: 'Group A (-ω) vs Group B (-άω) — spot the family.',
    foundation: true,
    sections: [
      {
        type: 'groupCards',
        title: 'Two main families',
        groups: [
          { label: 'Group A', name: '-ω verbs', hint: 'πίνω, γράφω', example: 'πίνω → πίνεις → πίνει' },
          { label: 'Group B', name: '-άω verbs', hint: 'μιλάω, αγαπάω', example: 'μιλάω → μιλάς → μιλάει' },
        ],
      },
      {
        type: 'conjugationCompare',
        title: 'Side-by-side comparison',
        persons: PERSONS.slice(0, 3),
        verbs: [
          { label: 'πίνω (A)', stem: 'πίν', forms: ['πίνω', 'πίνεις', 'πίνει'] },
          { label: 'μιλάω (B)', stem: 'μιλ', forms: ['μιλάω', 'μιλάς', 'μιλάει'] },
        ],
      },
      {
        type: 'grammarTable',
        title: 'Group B endings',
        columns: ['Person', 'Ending', 'Example (μιλάω)'],
        rows: PRESENT_ALPHA_ENDINGS.map(({ person, ending, suffix }) => [
          person,
          ending,
          `μιλ${suffix}`,
        ]),
        highlightColumn: 1,
      },
      {
        type: 'conjugationTable',
        title: 'Full table: μιλάω',
        stem: 'μιλ',
        rows: milaoRows,
      },
    ],
  },
  {
    id: 'plural-endings',
    categoryId: 'nouns',
    title: 'Plural Endings',
    summary: '-ος → -οι, -α → -ες, -ο → -α — three families.',
    foundation: true,
    sections: [
      {
        type: 'grammarTable',
        title: 'Common plural patterns',
        columns: ['Gender', 'Singular → Plural', 'Example'],
        rows: [
          ['Masculine', '-ας → -ες', 'ο καφές → οι καφέδες'],
          ['Feminine', '-α → -ες', 'η μέρα → οι μέρες'],
          ['Neuter', '-ι → -ια', 'το παιδί → τα παιδιά'],
          ['Neuter', '-ο → -α', 'το βιβλίο → τα βιβλία'],
        ],
        highlightColumn: 1,
      },
      {
        type: 'examples',
        title: 'In context',
        items: [
          { greek: 'οι φίλοι μου', english: 'my friends' },
          { greek: 'τα παιδιά παίζουν', english: 'the children are playing' },
        ],
      },
    ],
  },
  {
    id: 'possessives',
    categoryId: 'pronouns',
    title: 'Possessives',
    summary: 'μου, σου, του, μας, σας, τους — after the noun.',
    foundation: true,
    sections: [
      {
        type: 'text',
        title: 'Placement',
        paragraphs: ['Possessives follow the noun: το βιβλίο μου = my book.'],
      },
      {
        type: 'grammarTable',
        title: 'Forms',
        columns: ['Person', 'Form', 'Example'],
        rows: [
          ['εγώ', 'μου', 'ο φίλος μου'],
          ['εσύ', 'σου', 'η δουλειά σου'],
          ['αυτός/ή/ό', 'του / της', 'το σπίτι του'],
          ['εμείς', 'μας', 'η γειτονιά μας'],
          ['εσείς', 'σας', 'τα παιδιά σας'],
          ['αυτοί/ές/ά', 'τους', 'οι γονείς τους'],
        ],
        highlightColumn: 1,
      },
    ],
  },
  {
    id: 'prepositions',
    categoryId: 'words',
    title: 'Prepositions',
    summary: 'σε, από, με, για — location, movement, purpose.',
    foundation: true,
    sections: [
      {
        type: 'grammarTable',
        title: 'Core prepositions',
        columns: ['Greek', 'Meaning', 'Example'],
        rows: [
          ['σε', 'in / at / to', 'Είμαι στο σπίτι.'],
          ['από', 'from', 'Από την Αθήνα.'],
          ['με', 'with', 'Με τον φίλο μου.'],
          ['για', 'for', 'Πάω για καφέ.'],
          ['χωρίς', 'without', 'Χωρίς εσένα.'],
        ],
        highlightColumn: 0,
      },
      {
        type: 'grammarTable',
        title: 'Location phrases',
        columns: ['Phrase', 'Meaning', 'Example'],
        rows: [
          ['πάνω σε', 'on top of', 'πάνω στο τραπέζι'],
          ['κάτω από', 'under', 'κάτω από το τραπέζι'],
          ['δίπλα σε', 'next to', 'δίπλα στη θάλασσα'],
        ],
        highlightColumn: 0,
      },
    ],
  },
  {
    id: 'sentence-structure',
    categoryId: 'syntax',
    title: 'Basic Sentence Structure',
    summary: 'Subject → Verb → Object — your safe starting point.',
    foundation: true,
    sections: [
      {
        type: 'grammarTable',
        title: 'SVO template',
        columns: ['Role', 'Greek', 'English'],
        rows: [
          ['Subject', 'Η Μαρία', 'Maria'],
          ['Verb', 'πίνει', 'drinks'],
          ['Object', 'καφέ', 'coffee'],
        ],
        highlightColumn: 1,
      },
      {
        type: 'examples',
        title: 'Examples',
        items: [
          { greek: 'Το παιδί τρώει.', english: 'The child is eating.' },
          { greek: 'ο καφές ζεστός', english: 'the hot coffee (adj. after noun)' },
        ],
      },
    ],
  },
  {
    id: 'modals',
    categoryId: 'verbs',
    title: 'Common Modal Verbs',
    summary: 'θέλω, μπορώ, πρέπει — wants, ability, obligation.',
    foundation: true,
    sections: [
      {
        type: 'grammarTable',
        title: 'The three essentials',
        columns: ['Greek', 'Meaning', 'Example'],
        rows: [
          ['θέλω', 'I want', 'Θέλω νερό.'],
          ['μπορώ', 'I can', 'Μπορώ να έρθω;'],
          ['πρέπει', 'must / should', 'Πρέπει να φύγω.'],
        ],
        highlightColumn: 0,
      },
      {
        type: 'examples',
        title: 'Conversations',
        items: [
          { greek: '— Θέλεις καφέ; — Ναι, θέλω.', english: '— Want coffee? — Yes.' },
          { greek: 'Δεν μπορώ σήμερα.', english: 'I cannot today.' },
        ],
      },
    ],
  },
  {
    id: 'time-expressions',
    categoryId: 'words',
    title: 'Time Expressions',
    summary: 'σήμερα, αύριο, χθες, τώρα — anchor yourself in time.',
    foundation: true,
    sections: [
      {
        type: 'timeline',
        title: 'Timeline',
        items: [
          { greek: 'χθες', english: 'yesterday', position: 'past' },
          { greek: 'πριν', english: 'before', position: 'past' },
          { greek: 'τώρα', english: 'now', position: 'now' },
          { greek: 'σήμερα', english: 'today', position: 'now' },
          { greek: 'μετά', english: 'later', position: 'future' },
          { greek: 'αύριο', english: 'tomorrow', position: 'future' },
        ],
      },
      {
        type: 'grammarTable',
        title: 'Quick reference',
        columns: ['Greek', 'English', 'Example'],
        rows: [
          ['σήμερα', 'today', 'Σήμερα δουλεύω.'],
          ['αύριο', 'tomorrow', 'Αύριο θα πάω.'],
          ['χθες', 'yesterday', 'Χθες έβρεχε.'],
          ['τώρα', 'now', 'Τώρα τρώω.'],
        ],
        highlightColumn: 0,
      },
    ],
  },
  {
    id: 'time-aspect-matrix',
    categoryId: 'verbs',
    title: 'Time & Aspect Matrix',
    summary: 'WHEN + HOW an action unfolds — the logic behind Greek tenses.',
    foundation: true,
    sections: [
      {
        type: 'text',
        paragraphs: [
          'Greek combines time (past, present, future) with aspect (ongoing vs complete). Tap cells to explore — empty slots mark combinations Greek does not use separately.',
        ],
      },
      { type: 'aspectMatrix', title: 'Interactive matrix' },
    ],
  },
]
