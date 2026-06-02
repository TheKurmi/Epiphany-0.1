/**
 * Reading content batch 5 — progressive readings across tiers 1–4.
 */

/** @type {import('./stories').Story[]} */
export const BATCH_5_STORIES = [
  {
    id: 'tier1-morning-routine',
    packId: 'daily-routines',
    title: 'Το πρωινό μου',
    titleEnglish: 'My morning',
    level: 'beginner',
    requiredTopics: ['present-tense'],
    sentences: [
      { text: 'Ξυπνάω στις επτά.', english: 'I wake up at seven.' },
      { text: 'Πλένω τα δόντια μου και ντύνομαι.', english: 'I brush my teeth and get dressed.' },
      { text: 'Πίνω καφέ και τρώω ψωμί με βούτυρο.', english: 'I drink coffee and eat bread with butter.' },
      { text: 'Μετά παίρνω το λεωφορείο για τη δουλειά.', english: 'Then I take the bus to work.' },
    ],
    comprehension: [
      { question: 'Τι πίνει το πρωί;', options: ['καφέ', 'χυμό', 'μπύρα'], correctIndex: 0 },
    ],
  },
  {
    id: 'tier1-grocery-list',
    packId: 'shopping-market',
    title: 'Η λίστα για το σούπερ μάρκετ',
    titleEnglish: 'The supermarket list',
    level: 'beginner',
    requiredTopics: ['numbers-counting'],
    sentences: [
      { text: 'Χρειάζομαι γάλα, αυγά και ντομάτες.', english: 'I need milk, eggs, and tomatoes.' },
      { text: 'Παίρνω και ψωμί ολικής άλεσης.', english: 'I also take wholegrain bread.' },
      { text: 'Στο ταμείο πληρώνω δώδεκα ευρώ.', english: 'At the checkout I pay twelve euros.' },
      { text: 'Γυρίζω σπίτι με δύο σακούλες.', english: 'I return home with two bags.' },
    ],
    comprehension: [
      { question: 'Πόσα πληρώνει;', options: ['12 ευρώ', '5 ευρώ', '20 ευρώ'], correctIndex: 0 },
    ],
  },
  {
    id: 'tier2-rainy-day',
    packId: 'weather-everyday',
    title: 'Βροχερή μέρα',
    titleEnglish: 'A rainy day',
    level: 'beginner',
    requiredTopics: ['present-tense'],
    sentences: [
      { text: 'Σήμερα βρέχει από το πρωί.', english: 'Today it has been raining since morning.' },
      { text: 'Δεν πάω για περίπατο. Μένω σπίτι.', english: 'I do not go for a walk. I stay home.' },
      { text: 'Διαβάζω βιβλίο και πίνω τσάι.', english: 'I read a book and drink tea.' },
      { text: 'Το απόγευμα η βροχή σταματά.', english: 'In the afternoon the rain stops.' },
      { text: 'Βγαίνω λίγο για καφέ με φίλο.', english: 'I go out briefly for coffee with a friend.' },
    ],
    comprehension: [
      { question: 'Τι κάνει όταν βρέχει;', options: ['μένει σπίτι', 'πάει θάλασσα', 'ταξιδεύει'], correctIndex: 0 },
    ],
  },
  {
    id: 'tier2-bus-commute',
    packId: 'transport-commute',
    title: 'Με το λεωφορείο',
    titleEnglish: 'By bus',
    level: 'beginner',
    requiredTopics: ['time-clock'],
    sentences: [
      { text: 'Κάθε μέρα παίρνω το λεωφορείο στις οκτώ.', english: 'Every day I take the bus at eight.' },
      { text: 'Η διαδρομή διαρκεί είκοσι λεπτά.', english: 'The route lasts twenty minutes.' },
      { text: 'Συνήθως διαβάζω ή ακούω μουσική.', english: 'I usually read or listen to music.' },
      { text: 'Κάποιες μέρες η κυκλοφορία είναι πολύ αργή.', english: 'Some days the traffic is very slow.' },
    ],
    comprehension: [
      { question: 'Πότε παίρνει το λεωφορείο;', options: ['8:00', '7:00', '9:00'], correctIndex: 0 },
    ],
  },
  {
    id: 'tier2-hobby-guitar',
    packId: 'hobbies-friends',
    title: 'Μαθαίνω κιθάρα',
    titleEnglish: 'Learning guitar',
    level: 'beginner',
    requiredTopics: ['present-tense'],
    sentences: [
      { text: 'Κάθε Τρίτη έχω μάθημα κιθάρας.', english: 'Every Tuesday I have a guitar lesson.' },
      { text: 'Ο δάσκαλος είναι υπομονετικός.', english: 'The teacher is patient.' },
      { text: 'Παίζω αργά, αλλά βελτιώνομαι.', english: 'I play slowly, but I am improving.' },
      { text: 'Το Σάββατο παίζω για τους φίλους μου.', english: 'On Saturday I play for my friends.' },
    ],
    comprehension: [
      { question: 'Πότε έχει μάθημα;', options: ['Τρίτη', 'Πέμπτη', 'Κυριακή'], correctIndex: 0 },
    ],
  },
  {
    id: 'tier3-yesterday-story',
    packId: 'past-tales',
    title: 'Χθες στο κέντρο',
    titleEnglish: 'Yesterday downtown',
    level: 'intermediate',
    requiredTopics: ['past-tense-intro', 'time-and-aspect'],
    sentences: [
      { text: 'Χθες πήγα στο κέντρο με τον αδελφό μου.', english: 'Yesterday I went downtown with my brother.' },
      { text: 'Περπατούσαμε αργά και κοιτάζαμε τα μαγαζιά.', english: 'We were walking slowly and looking at the shops.' },
      { text: 'Ξαφνικά βρήκαμε ένα μικρό βιβλιοπωλείο.', english: 'Suddenly we found a small bookshop.' },
      { text: 'Μπήκαμε, διαβάσαμε λίγο και αγοράσαμε δύο βιβλία.', english: 'We went in, read a little, and bought two books.' },
      { text: 'Μετά φάγαμε σουβλάκι και γυρίσαμε σπίτι.', english: 'Then we ate souvlaki and went home.' },
    ],
    comprehension: [
      { question: 'Τι αγόρασαν;', options: ['βιβλία', 'ρούχα', 'παπούτσια'], correctIndex: 0 },
    ],
  },
  {
    id: 'tier3-summer-memory',
    packId: 'past-tales',
    title: 'Καλοκαιρινή ανάμνηση',
    titleEnglish: 'A summer memory',
    level: 'intermediate',
    requiredTopics: ['time-and-aspect'],
    sentences: [
      { text: 'Πέρυσι το καλοκαίρι μέναμε σε ένα νησί.', english: 'Last summer we stayed on an island.' },
      { text: 'Κάθε πρωί κολυμπάγαμε στη θάλασσα.', english: 'Every morning we were swimming in the sea.' },
      { text: 'Μια μέρα είδαμε δελφίνια κοντά στην ακτή.', english: 'One day we saw dolphins near the shore.' },
      { text: 'Ήταν στιγμή που δεν θα ξεχάσω ποτέ.', english: 'It was a moment I will never forget.' },
    ],
    comprehension: [
      { question: 'Τι είδαν μια μέρα;', options: ['δελφίνια', 'φάλαιες', 'καρχαρίες'], correctIndex: 0 },
    ],
  },
  {
    id: 'tier3-work-stress',
    packId: 'work-office',
    title: 'Μια δύσκολη εβδομάδα',
    titleEnglish: 'A tough week',
    level: 'intermediate',
    requiredTopics: ['past-tense-intro'],
    sentences: [
      { text: 'Αυτή την εβδομάδα δούλευα πολύ.', english: 'This week I was working a lot.' },
      { text: 'Έγραφα reports και έκανα πολλές συσκέψεις.', english: 'I was writing reports and having many meetings.' },
      { text: 'Την Παρασκευή τελικά τελείωσα το project.', english: 'On Friday I finally finished the project.' },
      { text: 'Βγήκα με συναδέλφους και γελάσαμε.', english: 'I went out with colleagues and we laughed.' },
    ],
    comprehension: [
      { question: 'Πότε τελείωσε το project;', options: ['Παρασκευή', 'Δευτέρα', 'Τρίτη'], correctIndex: 0 },
    ],
  },
  {
    id: 'tier4-opinion-essay',
    packId: 'natural-greek',
    title: 'Γιατί μαθαίνω ελληνικά',
    titleEnglish: 'Why I learn Greek',
    level: 'intermediate',
    requiredTopics: ['time-and-aspect', 'compound-sentences'],
    sentences: [
      { text: 'Μου αρέσει η ελληνική γλώσσα γιατί ακούγεται ζωντανή.', english: 'I like the Greek language because it sounds alive.' },
      { text: 'Όταν μιλάω με φίλους, νιώθω ότι καταλαβαίνω τον ρυθμό τους.', english: 'When I talk with friends, I feel I understand their rhythm.' },
      { text: 'Δεν είναι εύκολο — μερικές φορές μπερδεύω τους χρόνους.', english: 'It is not easy — sometimes I confuse the tenses.' },
      { text: 'Όμως, κάθε εβδομάδα νιώθω πιο σίγουρος.', english: 'However, every week I feel more confident.' },
      { text: 'Νομίζω ότι η γλώσσα ανοίγει πόρτες, όχι μόνο λέξεις.', english: 'I think language opens doors, not just words.' },
    ],
    comprehension: [
      { question: 'Τι νιώθει κάθε εβδομάδα;', options: ['πιο σίγουρος', 'πιο κουρασμένος', 'πιο θυμωμένος'], correctIndex: 0 },
    ],
  },
  {
    id: 'tier4-aspect-contrast',
    packId: 'verb-patterns',
    title: 'Διαβάζω κάθε μέρα',
    titleEnglish: 'I read every day',
    level: 'intermediate',
    requiredTopics: ['time-and-aspect'],
    sentences: [
      { text: 'Κάθε βράδυ διαβάζω λίγο πριν κοιμηθώ.', english: 'Every evening I read a little before I sleep.' },
      { text: 'Χθες διάβασα μια σύντομη ιστορία.', english: 'Yesterday I read a short story (through).' },
      { text: 'Την προηγούμενη εβδομάδα διάβαζα ένα μακρύ βιβλίο.', english: 'The previous week I was reading a long book.' },
      { text: 'Αύριο θα διαβάσω άρθρο για την Ελλάδα.', english: 'Tomorrow I will read an article about Greece.' },
      { text: 'Έχω ήδη διαβάσει τρία βιβλία φέτος.', english: 'I have already read three books this year.' },
    ],
    comprehension: [
      { question: 'Τι έκανε χθες;', options: ['διάβασε ιστορία', 'έγραψε γράμμα', 'έβλεπε ταινία'], correctIndex: 0 },
    ],
  },
  {
    id: 'tier2-tech-daily',
    packId: 'technology',
    title: 'Η μέρα μου online',
    titleEnglish: 'My day online',
    level: 'beginner',
    requiredTopics: ['present-tense'],
    sentences: [
      { text: 'Το πρωί ελέγχω τα μηνύματά μου.', english: 'In the morning I check my messages.' },
      { text: 'Δουλεύω στο laptop και κάνω video calls.', english: 'I work on the laptop and do video calls.' },
      { text: 'Το βράδυ βλέπω βίντεο ή παίζω online.', english: 'In the evening I watch videos or play online.' },
      { text: 'Πριν κοιμηθώ βάζω το κινητό στο silent.', english: 'Before I sleep I put my phone on silent.' },
    ],
    comprehension: [
      { question: 'Τι κάνει το βράδυ;', options: ['βλέπει βίντεο', 'τρέχει', 'μαγειρεύει'], correctIndex: 0 },
    ],
  },
  {
    id: 'tier1-pet-cat',
    packId: 'pets-home',
    title: 'Η γάτα μου',
    titleEnglish: 'My cat',
    level: 'beginner',
    requiredTopics: ['present-tense'],
    sentences: [
      { text: 'Έχω μια γάτα που λέγεται Λούνα.', english: 'I have a cat named Luna.' },
      { text: 'Κοιμάται στον καναπέ όλη την ημέρα.', english: 'She sleeps on the sofa all day.' },
      { text: 'Το απόγευμα τρέχει στο σαλόνι.', english: 'In the afternoon she runs in the living room.' },
      { text: 'Την αγαπάω πολύ.', english: 'I love her very much.' },
    ],
    comprehension: [
      { question: 'Πώς λέγεται η γάτα;', options: ['Λούνα', 'Μπάντι', 'Μίλο'], correctIndex: 0 },
    ],
  },
]
