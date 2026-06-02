/** @type {import('../index').Lesson} */
import { SENTENCE_PATTERNS } from '@/shared/grammar/sentencePatterns'
import { CONVERSATION_GLUE } from '@/shared/grammar/conversationGlue'

const patternRows = SENTENCE_PATTERNS.slice(0, 8).map((p) => [p.pattern, p.english, p.example])
const glueRows = CONVERSATION_GLUE.slice(0, 10).map((g) => [g.word, g.english, g.example])

const lesson = {
  id: 'conversation-patterns',
  topicId: 'conversation',
  level: 'beginner',
  pathOrder: 17,
  duration: '6–8 min',
  title: 'Conversation Patterns & Natural Glue',
  summary: 'High-frequency sentence structures and fillers that make Greek sound real.',
  intro: {
    paragraphs: [
      'Greek communication is built from reusable patterns — not isolated words. θέλω να…, μπορώ να…, μου αρέσει… appear constantly in real speech.',
      'Conversation glue — λοιπόν, δηλαδή, μάλλον, εντάξει — connects ideas the way Greeks actually talk. These words rarely appear in textbooks, but they are everywhere in cafés, streets, and messages.',
      'Learn patterns as whole chunks first. Grammar analysis comes naturally once you recognise the rhythm.',
    ],
    examples: [
      { greek: 'Θέλω να πάω σπίτι.', english: 'I want to go home.' },
      { greek: 'Λοιπόν, τι κάνουμε;', english: 'So, what shall we do?' },
      { greek: 'Μου φαίνεται καλή ιδέα.', english: 'It seems like a good idea to me.' },
    ],
  },
  sections: [
    {
      type: 'grammarTable',
      title: 'Core sentence patterns',
      columns: ['Pattern', 'English', 'Example'],
      rows: patternRows,
      highlightColumn: 0,
    },
    {
      type: 'grammarTable',
      title: 'Conversation glue',
      columns: ['Word', 'English', 'Example'],
      rows: glueRows,
      highlightColumn: 0,
    },
    {
      type: 'linguisticInsight',
      title: 'Why Greeks say it this way',
      text: 'Greek often softens opinions with μου φαίνεται or νομίζω ότι rather than blunt statements. Fillers like λοιπόν and εντάξει manage social rhythm — they signal turns, agreement, or a shift in topic.',
    },
    {
      type: 'examples',
      title: 'Micro-dialogues',
      items: [
        { greek: '— Πάμε για καφέ; — Θα ήθελα, αλλά πρέπει να δουλέψω.', english: '— Coffee? — I would like to, but I must work.' },
        { greek: '— Δεν ξέρω πού είναι. — Εντάξει, ρωτάμε.', english: "— I don't know where it is. — OK, let's ask." },
        { greek: '— Μου αρέσει αυτό το μέρος. — Κι εμένα. Βασικά, έρχομαι συχνά.', english: '— I like this place. — Me too. Basically, I come often.' },
        { greek: '— Σοβαρά; — Ναι μωρέ, αλήθεια.', english: '— Seriously? — Yeah, honestly.' },
      ],
    },
    {
      type: 'tips',
      title: 'Pattern recognition first',
      items: [
        'When you hear θέλω να or μπορώ να, expect a verb next — the pattern tells you what is coming.',
        'Glue words rarely change meaning alone — context and tone carry the nuance.',
        'Shadow short exchanges aloud; rhythm matters more than perfect grammar at first.',
      ],
    },
  ],
  commonMistakes: [
    { title: 'μου αρέσει word order', text: 'The thing you like is the subject: Μου αρέσει ο καφές (Coffee pleases me).' },
    { title: 'Overusing νομίζω', text: 'In casual speech, μου φαίνεται is often softer than a bare opinion.' },
  ],
}

export default lesson
