/** @type {import('../index').Lesson} */
const lesson = {
  id: 'prepositions-basic',
  topicId: 'prepositions',
  level: 'beginner',
  pathOrder: 12,
  duration: '4 min',
  title: 'Basic Prepositions',
  summary: 'σε, από, με, για — location, direction, and purpose.',
  intro: {
    paragraphs: [
      'Prepositions link nouns to the rest of the sentence: where you are, where you go, who you are with. Greek often combines prepositions with articles — σε + το = στο (at the), σε + η = στη.',
      'Start with the core set: σε (in/at/to), από (from), με (with), για (for), χωρίς (without). Spatial phrases like κάτω από (under) and πάνω σε (on) build from these.',
      'Prepositions do not always match English one-to-one. Learn them in phrases: στο σπίτι (at home), από την Ελλάδα (from Greece).',
    ],
    examples: [
      { greek: 'Είμαι στο σπίτι.', english: 'I am at home.' },
      { greek: 'Έρχομαι από τη δουλειά.', english: 'I come from work.' },
      { greek: 'Πάω με το λεωφορείο.', english: 'I go by bus.' },
    ],
  },
  sections: [
    {
      type: 'grammarTable',
      title: 'Core prepositions',
      columns: ['Greek', 'Meaning', 'Example'],
      rows: [
        ['σε / στο', 'in, at, to', 'στο σχολείο'],
        ['από', 'from', 'από την Αθήνα'],
        ['με', 'with', 'με φίλους'],
        ['για', 'for', 'για σένα'],
        ['χωρίς', 'without', 'χωρίς ζάχαρη'],
        ['κάτω από', 'under', 'κάτω από το τραπέζι'],
        ['πάνω σε', 'on', 'πάνω στο τραπέζι'],
        ['δίπλα σε', 'next to', 'δίπλα στη θάλασσα'],
      ],
      highlightColumn: 0,
    },
  ],
  commonMistakes: [
    { title: 'Articles fuse', text: 'σε + article → στο, στη, στα — learn the fused forms as units.' },
  ],
}

export default lesson
