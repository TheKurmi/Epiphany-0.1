/**
 * Micro-dialogues — tiny high-frequency exchanges for shadowing and quick practice.
 * Each story is 2–4 lines; natural spoken rhythm with conversation glue.
 */

/** @type {import('./stories').Story[]} */
export const MICRO_DIALOGUES = [
  {
    id: 'micro-greeting-1',
    packId: 'micro-dialogues',
    title: 'Τι κάνεις;',
    titleEnglish: 'How are you?',
    level: 'beginner',
    requiredTopics: ['survival-greek'],
    sentences: [
      { text: '— Γεια σου! Τι κάνεις;', english: '— Hi! How are you?' },
      { text: '— Καλά, εσύ;', english: '— Good, you?' },
      { text: '— Κι εγώ καλά. Ευχαριστώ.', english: '— I am good too. Thanks.' },
    ],
    comprehension: [
      { question: 'Πώς είναι ο πρώτος ομιλητής;', options: ['καλά', 'κουρασμένος', 'άρρωστος'], correctIndex: 0 },
    ],
  },
  {
    id: 'micro-where-home',
    packId: 'micro-dialogues',
    title: 'Πού πας;',
    titleEnglish: 'Where are you going?',
    level: 'beginner',
    requiredTopics: ['present-tense'],
    sentences: [
      { text: '— Πού πας;', english: '— Where are you going?' },
      { text: '— Πάω στο σπίτι.', english: '— I am going home.' },
      { text: '— Ωραία, τα λέμε.', english: '— Great, see you.' },
    ],
    comprehension: [
      { question: 'Πού πάει;', options: ['σπίτι', 'δουλειά', 'σχολείο'], correctIndex: 0 },
    ],
  },
  {
    id: 'micro-coffee',
    packId: 'micro-dialogues',
    title: 'Θες καφέ;',
    titleEnglish: 'Want coffee?',
    level: 'beginner',
    requiredTopics: ['survival-greek'],
    sentences: [
      { text: '— Θες καφέ;', english: '— Want coffee?' },
      { text: '— Ναι, ευχαριστώ.', english: '— Yes, thanks.' },
      { text: '— Με γάλα ή σκέτο;', english: '— With milk or black?' },
      { text: '— Με λίγο γάλα, παρακαλώ.', english: '— With a little milk, please.' },
    ],
    comprehension: [
      { question: 'Τι θέλει ο δεύτερος ομιλητής;', options: ['καφέ', 'τσάι', 'χυμό'], correctIndex: 0 },
    ],
  },
  {
    id: 'micro-live-athens',
    packId: 'micro-dialogues',
    title: 'Πού μένεις;',
    titleEnglish: 'Where do you live?',
    level: 'beginner',
    requiredTopics: ['eimai-essential'],
    sentences: [
      { text: '— Πού μένεις;', english: '— Where do you live?' },
      { text: '— Στην Αθήνα.', english: '— In Athens.' },
      { text: '— Ωραία! Εγώ στη Θεσσαλονίκη.', english: '— Nice! I am in Thessaloniki.' },
    ],
    comprehension: [
      { question: 'Πού μένει ο πρώτος;', options: ['Αθήνα', 'Θεσσαλονίκη', 'Πάτρα'], correctIndex: 0 },
    ],
  },
  {
    id: 'micro-late',
    packId: 'micro-dialogues',
    title: 'Έρχομαι αργά',
    titleEnglish: 'I am coming late',
    level: 'beginner',
    requiredTopics: ['time-clock'],
    sentences: [
      { text: '— Συγγνώμη, θα αργήσω.', english: '— Sorry, I will be late.' },
      { text: '— Δεν πειράζει. Περίμενε.', english: '— No problem. Wait.' },
      { text: '— Εντάξει, σε δέκα λεπτά είμαι εκεί.', english: '— OK, I will be there in ten minutes.' },
    ],
    comprehension: [
      { question: 'Τι λέει ο πρώτος;', options: ['θα αργήσει', 'δεν έρχεται', 'έφτασε'], correctIndex: 0 },
    ],
  },
  {
    id: 'micro-bus',
    packId: 'micro-dialogues',
    title: 'Ποιο λεωφορείο;',
    titleEnglish: 'Which bus?',
    level: 'beginner',
    requiredTopics: ['question-words'],
    sentences: [
      { text: '— Συγγνώμη, ποιο λεωφορείο πάει στο κέντρο;', english: '— Excuse me, which bus goes to the centre?' },
      { text: '— Το 040. Σταματά εδώ.', english: '— The 040. It stops here.' },
      { text: '— Ευχαριστώ πολύ!', english: '— Thank you very much!' },
    ],
    comprehension: [
      { question: 'Ποιο λεωφορείο;', options: ['040', '020', '500'], correctIndex: 0 },
    ],
  },
  {
    id: 'micro-price',
    packId: 'micro-dialogues',
    title: 'Πόσο κοστίζει;',
    titleEnglish: 'How much?',
    level: 'beginner',
    requiredTopics: ['numbers-counting'],
    sentences: [
      { text: '— Πόσο κοστίζει αυτό;', english: '— How much does this cost?' },
      { text: '— Πέντε ευρώ.', english: '— Five euros.' },
      { text: '— Το παίρνω.', english: "— I'll take it." },
    ],
    comprehension: [
      { question: 'Πόσο κοστίζει;', options: ['5 ευρώ', '10 ευρώ', '3 ευρώ'], correctIndex: 0 },
    ],
  },
  {
    id: 'micro-hungry',
    packId: 'micro-dialogues',
    title: 'Πεινάω',
    titleEnglish: 'I am hungry',
    level: 'beginner',
    requiredTopics: ['present-tense'],
    sentences: [
      { text: '— Πεινάω. Εσύ;', english: '— I am hungry. You?' },
      { text: '— Κι εγώ. Πάμε να φάμε;', english: '— Me too. Shall we go eat?' },
      { text: '— Πάμε!', english: "— Let's go!" },
    ],
    comprehension: [
      { question: 'Τι θέλουν να κάνουν;', options: ['να φάνε', 'να κοιμηθούν', 'να δουλέψουν'], correctIndex: 0 },
    ],
  },
  {
    id: 'micro-weather-hot',
    packId: 'micro-dialogues',
    title: 'Ζέστη σήμερα',
    titleEnglish: 'Hot today',
    level: 'beginner',
    requiredTopics: ['present-tense'],
    sentences: [
      { text: '— Λοιπόν, ζέστη σήμερα, ε;', english: '— So, it is hot today, huh?' },
      { text: '— Ναι μωρέ, πολύ.', english: '— Yeah, very.' },
      { text: '— Θα πάω για μπάνιο.', english: '— I will go for a swim.' },
    ],
    comprehension: [
      { question: 'Τι καιρό κάνει;', options: ['ζέστη', 'βροχή', 'χιόνι'], correctIndex: 0 },
    ],
  },
  {
    id: 'micro-dont-know',
    packId: 'micro-dialogues',
    title: 'Δεν ξέρω',
    titleEnglish: "I don't know",
    level: 'beginner',
    requiredTopics: ['questions-negation'],
    sentences: [
      { text: '— Ξέρεις πού είναι η στάση;', english: '— Do you know where the stop is?' },
      { text: '— Δεν ξέρω, συγγνώμη.', english: "— I don't know, sorry." },
      { text: '— Εντάξει, ευχαριστώ.', english: '— OK, thanks.' },
    ],
    comprehension: [
      { question: 'Ξέρει τη στάση;', options: ['όχι', 'ναι', 'ίσως'], correctIndex: 0 },
    ],
  },
  {
    id: 'micro-think-rain',
    packId: 'micro-dialogues',
    title: 'Νομίζω ότι θα βρέξει',
    titleEnglish: 'I think it will rain',
    level: 'beginner',
    requiredTopics: ['modal-verbs'],
    sentences: [
      { text: '— Νομίζω ότι θα βρέξει.', english: '— I think it will rain.' },
      { text: '— Μάλλον. Πάρε ομπρέλα.', english: '— Probably. Take an umbrella.' },
      { text: '— Καλή ιδέα.', english: '— Good idea.' },
    ],
    comprehension: [
      { question: 'Τι καιρό περιμένουν;', options: ['βροχή', 'ήλιο', 'χιόνι'], correctIndex: 0 },
    ],
  },
  {
    id: 'micro-like-music',
    packId: 'micro-dialogues',
    title: 'Μου αρέσει η μουσική',
    titleEnglish: 'I like music',
    level: 'beginner',
    requiredTopics: ['present-tense'],
    sentences: [
      { text: '— Μου αρέσει η μουσική. Εσένα;', english: '— I like music. You?' },
      { text: '— Κι εμένα. Τι ακούς;', english: '— Me too. What do you listen to?' },
      { text: '— Βασικά, ελληνικά και λίγο jazz.', english: '— Basically, Greek and a little jazz.' },
    ],
    comprehension: [
      { question: 'Τι ακούει ο πρώτος;', options: ['ελληνικά και jazz', 'μόνο rock', 'κλασική'], correctIndex: 0 },
    ],
  },
  {
    id: 'micro-must-study',
    packId: 'micro-dialogues',
    title: 'Πρέπει να διαβάσω',
    titleEnglish: 'I must study',
    level: 'beginner',
    requiredTopics: ['modal-verbs'],
    sentences: [
      { text: '— Πάμε για καφέ;', english: '— Shall we go for coffee?' },
      { text: '— Θα ήθελα, αλλά πρέπει να διαβάσω.', english: '— I would like to, but I must study.' },
      { text: '— Εντάξει, αύριο τότε.', english: '— OK, tomorrow then.' },
    ],
    comprehension: [
      { question: 'Γιατί δεν πάει τώρα;', options: ['πρέπει να διαβάσει', 'δουλεύει', 'ταξιδεύει'], correctIndex: 0 },
    ],
  },
  {
    id: 'micro-intro-name',
    packId: 'micro-dialogues',
    title: 'Με λένε Μαρία',
    titleEnglish: 'My name is Maria',
    level: 'beginner',
    requiredTopics: ['survival-greek'],
    sentences: [
      { text: '— Γεια σας. Με λένε Μαρία.', english: '— Hello. My name is Maria.' },
      { text: '— Χάρηκα. Εγώ ο Γιώργος.', english: '— Nice to meet you. I am Giorgos.' },
      { text: '— Κι εγώ.', english: '— Me too.' },
    ],
    comprehension: [
      { question: 'Πώς λέγεται η γυναίκα;', options: ['Μαρία', 'Γιώργος', 'Άννα'], correctIndex: 0 },
    ],
  },
  {
    id: 'micro-help',
    packId: 'micro-dialogues',
    title: 'Μπορείς να βοηθήσεις;',
    titleEnglish: 'Can you help?',
    level: 'beginner',
    requiredTopics: ['modal-verbs'],
    sentences: [
      { text: '— Συγγνώμη, μπορείς να βοηθήσεις;', english: '— Excuse me, can you help?' },
      { text: '— Φυσικά. Τι χρειάζεσαι;', english: '— Of course. What do you need?' },
      { text: '— Πού είναι η έξοδος;', english: '— Where is the exit?' },
    ],
    comprehension: [
      { question: 'Τι ρωτάει;', options: ['πού είναι η έξοδος', 'πόσο κοστίζει', 'τι ώρα είναι'], correctIndex: 0 },
    ],
  },
  {
    id: 'micro-tired',
    packId: 'micro-dialogues',
    title: 'Είμαι κουρασμένος',
    titleEnglish: 'I am tired',
    level: 'beginner',
    requiredTopics: ['eimai-essential'],
    sentences: [
      { text: '— Είσαι καλά;', english: '— Are you OK?' },
      { text: '— Είμαι λίγο κουρασμένος.', english: '— I am a little tired.' },
      { text: '— Κάτσε. Θα φέρω νερό.', english: '— Sit down. I will bring water.' },
    ],
    comprehension: [
      { question: 'Πώς νιώθει;', options: ['κουρασμένος', 'χαρούμενος', 'πεινασμένος'], correctIndex: 0 },
    ],
  },
  {
    id: 'micro-seriously',
    packId: 'micro-dialogues',
    title: 'Σοβαρά;',
    titleEnglish: 'Seriously?',
    level: 'intermediate',
    requiredTopics: ['questions-negation'],
    sentences: [
      { text: '— Δεν θα έρθει στο πάρτι.', english: '— He will not come to the party.' },
      { text: '— Σοβαρά; Γιατί;', english: '— Seriously? Why?' },
      { text: '— Δουλεύει μέχρι αργά.', english: '— He works until late.' },
    ],
    comprehension: [
      { question: 'Γιατί δεν έρχεται;', options: ['δουλεύει', 'άρρωστος', 'ταξιδεύει'], correctIndex: 0 },
    ],
  },
  {
    id: 'micro-seems-good',
    packId: 'micro-dialogues',
    title: 'Μου φαίνεται καλή ιδέα',
    titleEnglish: 'Seems like a good idea',
    level: 'intermediate',
    requiredTopics: ['sentence-structure'],
    sentences: [
      { text: '— Πάμε βόλτα στο κέντρο;', english: '— Shall we go for a walk downtown?' },
      { text: '— Μου φαίνεται καλή ιδέα.', english: '— It seems like a good idea to me.' },
      { text: '— Λοιπόν, σε μία ώρα.', english: '— So, in one hour.' },
    ],
    comprehension: [
      { question: 'Τι αποφασίζουν;', options: ['βόλτα στο κέντρο', 'να μείνουν σπίτι', 'να δουλέψουν'], correctIndex: 0 },
    ],
  },
  {
    id: 'micro-phone',
    packId: 'micro-dialogues',
    title: 'Έχεις Wi-Fi;',
    titleEnglish: 'Do you have Wi-Fi?',
    level: 'beginner',
    requiredTopics: ['questions-negation'],
    sentences: [
      { text: '— Συγγνώμη, έχετε Wi-Fi;', english: '— Excuse me, do you have Wi-Fi?' },
      { text: '— Ναι, ο κωδικός είναι στο ταμπλό.', english: '— Yes, the password is on the board.' },
      { text: '— Ευχαριστώ!', english: '— Thanks!' },
    ],
    comprehension: [
      { question: 'Τι ρωτάει;', options: ['Wi-Fi', 'καφέ', 'δωμάτιο'], correctIndex: 0 },
    ],
  },
  {
    id: 'micro-pet-dog',
    packId: 'micro-dialogues',
    title: 'Έχεις σκύλο;',
    titleEnglish: 'Do you have a dog?',
    level: 'beginner',
    requiredTopics: ['echo-essential'],
    sentences: [
      { text: '— Έχεις κατοικίδιο;', english: '— Do you have a pet?' },
      { text: '— Ναι, έναν σκύλο. Λέγεται Μπάντι.', english: '— Yes, a dog. His name is Buddy.' },
      { text: '— Α, τι χαριτωμένος!', english: '— Oh, how cute!' },
    ],
    comprehension: [
      { question: 'Τι κατοικίδιο έχει;', options: ['σκύλο', 'γάτα', 'πουλί'], correctIndex: 0 },
    ],
  },
  {
    id: 'micro-movie',
    packId: 'micro-dialogues',
    title: 'Πάμε σινεμά;',
    titleEnglish: 'Shall we go to the movies?',
    level: 'beginner',
    requiredTopics: ['present-tense'],
    sentences: [
      { text: '— Πάμε σινεμά απόψε;', english: '— Shall we go to the movies tonight?' },
      { text: '— Ίσως. Τι παίζει;', english: '— Maybe. What is playing?' },
      { text: '— Μια ελληνική κωμωδία.', english: '— A Greek comedy.' },
    ],
    comprehension: [
      { question: 'Τι είδος ταινίας;', options: ['κωμωδία', 'δράμα', 'τρόμου'], correctIndex: 0 },
    ],
  },
  {
    id: 'micro-doctor',
    packId: 'micro-dialogues',
    title: 'Δεν αισθάνομαι καλά',
    titleEnglish: 'I do not feel well',
    level: 'beginner',
    requiredTopics: ['present-tense'],
    sentences: [
      { text: '— Δεν αισθάνομαι καλά.', english: '— I do not feel well.' },
      { text: '— Θέλεις να πάμε στον γιατρό;', english: '— Do you want to go to the doctor?' },
      { text: '— Ναι, μάλλον είναι καλύτερα.', english: '— Yes, that is probably better.' },
    ],
    comprehension: [
      { question: 'Πώς νιώθει;', options: ['άρρωστος', 'χαρούμενος', 'πεινασμένος'], correctIndex: 0 },
    ],
  },
  {
    id: 'micro-opinion',
    packId: 'micro-dialogues',
    title: 'Διαφωνώ',
    titleEnglish: 'I disagree',
    level: 'intermediate',
    requiredTopics: ['compound-sentences'],
    sentences: [
      { text: '— Νομίζω ότι είναι εύκολο.', english: '— I think it is easy.' },
      { text: '— Εγώ διαφωνώ. Είναι δύσκολο.', english: '— I disagree. It is hard.' },
      { text: '— Εντάξει, μάλλον εξαρτάται.', english: '— OK, it probably depends.' },
    ],
    comprehension: [
      { question: 'Τι λέει ο δεύτερος;', options: ['είναι δύσκολο', 'είναι εύκολο', 'δεν ξέρει'], correctIndex: 0 },
    ],
  },
  {
    id: 'micro-yesterday',
    packId: 'micro-dialogues',
    title: 'Τι έκανες χθες;',
    titleEnglish: 'What did you do yesterday?',
    level: 'intermediate',
    requiredTopics: ['past-tense-intro'],
    sentences: [
      { text: '— Τι έκανες χθες;', english: '— What did you do yesterday?' },
      { text: '— Δούλευα μέχρι αργά. Μετά είδα μια ταινία.', english: '— I was working until late. Then I watched a film.' },
      { text: '— Ωραία. Εγώ πήγα για τρέξιμο.', english: '— Nice. I went for a run.' },
    ],
    comprehension: [
      { question: 'Τι έκανε ο δεύτερος μετά;', options: ['ταινία', 'τρέξιμο', 'ψώνια'], correctIndex: 0 },
    ],
  },
  {
    id: 'micro-birthday',
    packId: 'micro-dialogues',
    title: 'Χρόνια πολλά!',
    titleEnglish: 'Happy birthday!',
    level: 'beginner',
    requiredTopics: ['survival-greek'],
    sentences: [
      { text: '— Χρόνια πολλά!', english: '— Happy birthday!' },
      { text: '— Ευχαριστώ! Έρχεσαι στο πάρτι;', english: '— Thanks! Are you coming to the party?' },
      { text: '— Φυσικά! Τι ώρα;', english: '— Of course! What time?' },
    ],
    comprehension: [
      { question: 'Τι γιορτάζουν;', options: ['γενέθλια', 'Πάσχα', 'γάμο'], correctIndex: 0 },
    ],
  },
  {
    id: 'micro-work-meeting',
    packId: 'micro-dialogues',
    title: 'Έχουμε σύσκεψη',
    titleEnglish: 'We have a meeting',
    level: 'intermediate',
    requiredTopics: ['time-clock'],
    sentences: [
      { text: '— Έχουμε σύσκεψη στις δέκα.', english: '— We have a meeting at ten.' },
      { text: '— Εντάξει. Είσαι έτοιμος;', english: '— OK. Are you ready?' },
      { text: '— Σχεδόν. Περιμένε με πέντε λεπτά.', english: '— Almost. Wait for me five minutes.' },
    ],
    comprehension: [
      { question: 'Πότε είναι η σύσκεψη;', options: ['10:00', '9:00', '11:00'], correctIndex: 0 },
    ],
  },
  {
    id: 'micro-vacation',
    packId: 'micro-dialogues',
    title: 'Πού πήγες διακοπές;',
    titleEnglish: 'Where did you go on vacation?',
    level: 'intermediate',
    requiredTopics: ['past-tense-intro'],
    sentences: [
      { text: '— Πού πήγες διακοπές;', english: '— Where did you go on vacation?' },
      { text: '— Στην Κρήτη. Ήταν υπέροχα.', english: '— To Crete. It was wonderful.' },
      { text: '— Αλήθεια; Εγώ μένω Αθήνα φέτος.', english: '— Really? I am staying in Athens this year.' },
    ],
    comprehension: [
      { question: 'Πού πήγε ο πρώτος;', options: ['Κρήτη', 'Ρόδο', 'Κέρκυρα'], correctIndex: 0 },
    ],
  },
  {
    id: 'micro-excuse-me',
    packId: 'micro-dialogues',
    title: 'Μπορώ να περάσω;',
    titleEnglish: 'May I pass?',
    level: 'beginner',
    requiredTopics: ['survival-greek'],
    sentences: [
      { text: '— Συγγνώμη, μπορώ να περάσω;', english: '— Excuse me, may I pass?' },
      { text: '— Φυσικά, ορίστε.', english: '— Of course, here you go.' },
      { text: '— Ευχαριστώ.', english: '— Thank you.' },
    ],
    comprehension: [
      { question: 'Τι θέλει ο πρώτος;', options: ['να περάσει', 'να κάτσει', 'να αγοράσει'], correctIndex: 0 },
    ],
  },
  {
    id: 'micro-train-late',
    packId: 'micro-dialogues',
    title: 'Το τρένο αργεί',
    titleEnglish: 'The train is late',
    level: 'intermediate',
    requiredTopics: ['present-tense'],
    sentences: [
      { text: '— Το τρένο αργεί είκοσι λεπτά.', english: '— The train is twenty minutes late.' },
      { text: '— Σοβαρά; Τι κάνουμε τώρα;', english: '— Seriously? What do we do now?' },
      { text: '— Περίμενε. Μάλλον πίνουμε καφέ.', english: '— Wait. We will probably have coffee.' },
    ],
    comprehension: [
      { question: 'Γιατί περιμένουν;', options: ['αργεί το τρένο', 'έκλεισε ο σταθμός', 'χάθηκαν'], correctIndex: 0 },
    ],
  },
  {
    id: 'micro-see-you',
    packId: 'micro-dialogues',
    title: 'Τα λέμε αύριο',
    titleEnglish: 'See you tomorrow',
    level: 'beginner',
    requiredTopics: ['survival-greek'],
    sentences: [
      { text: '— Λοιπόν, πρέπει να φύγω.', english: '— Well, I have to go.' },
      { text: '— Εντάξει. Τα λέμε αύριο;', english: '— OK. See you tomorrow?' },
      { text: '— Ναι, καληνύχτα!', english: '— Yes, good night!' },
    ],
    comprehension: [
      { question: 'Πότε θα τα πούνε;', options: ['αύριο', 'σήμερα', 'μεθαύριο'], correctIndex: 0 },
    ],
  },
]
