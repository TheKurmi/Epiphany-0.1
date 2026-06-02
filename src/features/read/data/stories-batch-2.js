/**
 * Additional reading content — batch 2.
 * Slice-of-life stories, dialogues, and read-listen texts across themes.
 */

/** @type {import('./stories').Story[]} */
export const BATCH_2_STORIES = [
  // —— Daily Routines ——
  {
    id: 'evening-walk',
    packId: 'daily-routines',
    title: 'Βραδινός περίπατος',
    titleEnglish: 'An evening walk',
    level: 'beginner',
    requiredTopics: ['present-tense'],
    sentences: [
      { text: 'Μετά τη δουλειά, πηγαίνω για περίπατο.', english: 'After work, I go for a walk.' },
      { text: 'Βλέπω τους γείτονες και χαιρετάω.', english: 'I see the neighbours and say hello.' },
      { text: 'Ο αέρας είναι δροσερός.', english: 'The air is cool.' },
      { text: 'Γυρίζω σπίτι στις εννιά.', english: 'I return home at nine.' },
    ],
    comprehension: [
      { question: 'Τι κάνει μετά τη δουλειά;', options: ['πηγαίνει για περίπατο', 'πάει σινεμά', 'κοιμάται'], correctIndex: 0 },
    ],
  },
  {
    id: 'sunday-breakfast',
    packId: 'daily-routines',
    title: 'Κυριακάτικο πρωινό',
    titleEnglish: 'Sunday breakfast',
    level: 'beginner',
    requiredTopics: ['present-tense'],
    sentences: [
      { text: 'Την Κυριακή ξυπνάω αργά.', english: 'On Sunday I wake up late.' },
      { text: 'Η μαμά μου φτιάχνει τηγανητά αυγά.', english: 'My mum makes fried eggs.' },
      { text: 'Πίνουμε χυμό πορτοκάλι και καφέ.', english: 'We drink orange juice and coffee.' },
      { text: 'Μιλάμε ήρεμα στο τραπέζι.', english: 'We talk calmly at the table.' },
      { text: 'Είναι η αγαπημένη μου ώρα της εβδομάδας.', english: 'It is my favourite hour of the week.' },
    ],
    comprehension: [
      { question: 'Τι φτιάχνει η μαμά;', options: ['τηγανητά αυγά', 'σούπα', 'ψάρι'], correctIndex: 0 },
    ],
  },
  // —— School ——
  {
    id: 'exam-week',
    packId: 'school-life',
    title: 'Εβδομάδα εξετάσεων',
    titleEnglish: 'Exam week',
    level: 'intermediate',
    requiredTopics: ['present-tense'],
    sentences: [
      { text: 'Αυτή την εβδομάδα έχουμε εξετάσεις.', english: 'This week we have exams.' },
      { text: 'Διαβάζω κάθε βράδυ μέχρι τις έντεκα.', english: 'I study every evening until eleven.' },
      { text: 'Ο καθηγητής μας λέει: «Μην αγχώνεστε.»', english: 'Our teacher says: “Don’t stress.”' },
      { text: 'Την Παρασκευή τελειώνουν όλα.', english: 'On Friday everything finishes.' },
    ],
    comprehension: [
      { question: 'Μέχρι τι ώρα διαβάζει;', options: ['έντεκα', 'οκτώ', 'δώδεκα'], correctIndex: 0 },
    ],
  },
  {
    id: 'library-afternoon',
    packId: 'school-life',
    title: 'Στη βιβλιοθήκη',
    titleEnglish: 'At the library',
    level: 'beginner',
    requiredTopics: ['present-tense'],
    sentences: [
      { text: 'Μετά το σχολείο πάω στη βιβλιοθήκη.', english: 'After school I go to the library.' },
      { text: 'Βρίσκω ένα ήσυχο τραπέζι.', english: 'I find a quiet table.' },
      { text: 'Διαβάζω για μία ώρα.', english: 'I read for one hour.' },
      { text: 'Μετά συναντάω τον φίλο μου έξω.', english: 'Then I meet my friend outside.' },
    ],
    comprehension: [
      { question: 'Πού πάει μετά το σχολείο;', options: ['βιβλιοθήκη', 'αγορά', 'θέατρο'], correctIndex: 0 },
    ],
  },
  // —— Food & Café ——
  {
    id: 'bakery-morning',
    packId: 'food-cafe',
    title: 'Στον φούρνο',
    titleEnglish: 'At the bakery',
    level: 'beginner',
    requiredTopics: ['numbers'],
    sentences: [
      { text: '— Καλημέρα! Θα ήθελα δύο κρουασάν, παρακαλώ.', english: '— Good morning! I would like two croissants, please.' },
      { text: '— Ορίστε. Κάτι άλλο;', english: '— Here you are. Anything else?' },
      { text: '— Ναι, ένα ψωμί ολικής άλεσης.', english: '— Yes, one wholegrain bread.' },
      { text: '— Σύνολο τρία ευρώ και πενήντα.', english: '— Total three euros fifty.' },
      { text: '— Ευχαριστώ πολύ!', english: '— Thank you very much!' },
    ],
    comprehension: [
      { question: 'Πόσα κρουασάν παίρνει;', options: ['δύο', 'ένα', 'τρία'], correctIndex: 0 },
    ],
  },
  {
    id: 'taverna-lunch',
    packId: 'food-cafe',
    title: 'Στην ταβέρνα',
    titleEnglish: 'Lunch at the taverna',
    level: 'intermediate',
    requiredTopics: ['survival-greek'],
    sentences: [
      { text: 'Κάθισαμε έξω κάτω από τη μουριά.', english: 'We sat outside under the mulberry tree.' },
      { text: 'Πήραμε χωριάτικη σαλάτα και ψητό ψάρι.', english: 'We ordered village salad and grilled fish.' },
      { text: 'Το νερό είναι κρύο και το ψωμί φρέσκο.', english: 'The water is cold and the bread fresh.' },
      { text: '— Είναι νόστιμα; — Ναι, πολύ!', english: '— Is it tasty? — Yes, very!' },
    ],
    comprehension: [
      { question: 'Τι πήραν να φάνε;', options: ['σαλάτα και ψάρι', 'πίτσα', 'ζυμαρικά'], correctIndex: 0 },
    ],
  },
  // —— Family ——
  {
    id: 'grandma-visit',
    packId: 'family-home',
    title: 'Επίσκεψη στη γιαγιά',
    titleEnglish: 'Visiting grandma',
    level: 'beginner',
    requiredTopics: ['possessives'],
    sentences: [
      { text: 'Κάθε Σάββατο πηγαίνουμε στο σπίτι της γιαγιάς μας.', english: 'Every Saturday we go to our grandma’s house.' },
      { text: 'Η γιαγιά μας μας φτιάχνει σούπα.', english: 'Our grandma makes us soup.' },
      { text: 'Ο παππούς μας διηγείται παλιές ιστορίες.', english: 'Our grandpa tells old stories.' },
      { text: 'Φεύγουμε με χαμόγελο.', english: 'We leave with a smile.' },
    ],
    comprehension: [
      { question: 'Πότε πηγαίνουν στη γιαγιά;', options: ['κάθε Σάββατο', 'κάθε Δευτέρα', 'κάθε Κυριακή'], correctIndex: 0 },
    ],
  },
  // —— Shopping ——
  {
    id: 'clothes-shop',
    packId: 'shopping-market',
    title: 'Στο κατάστημα ρούχων',
    titleEnglish: 'At the clothes shop',
    level: 'intermediate',
    requiredTopics: ['numbers'],
    sentences: [
      { text: '— Θα ήθελα να δω αυτό το πουκάμισο.', english: '— I would like to see this shirt.' },
      { text: '— Τι νούmero φοράτε;', english: '— What size do you wear?' },
      { text: '— Μedium, παρακαλώ.', english: '— Medium, please.' },
      { text: '— Σας πάει πολύ. Κοστίζει είκοσι ευρώ.', english: '— It suits you a lot. It costs twenty euros.' },
      { text: '— Το παίρνω!', english: '— I’ll take it!' },
    ],
    comprehension: [
      { question: 'Πόσο κοστίζει το πουκάμισο;', options: ['20 ευρώ', '15 ευρώ', '30 ευρώ'], correctIndex: 0 },
    ],
  },
  {
    id: 'fish-market',
    packId: 'shopping-market',
    title: 'Στη λαϊκή',
    titleEnglish: 'At the street market',
    level: 'beginner',
    requiredTopics: ['numbers'],
    sentences: [
      { text: 'Η λαϊκή αγορά είναι γεμάτη χρώματα.', english: 'The street market is full of colours.' },
      { text: 'Αγοράζω ντομάτες, αγγούρια και φέτα.', english: 'I buy tomatoes, cucumbers, and feta.' },
      { text: '— Πόσο κάνουν; — Πέντε ευρώ.', english: '— How much are they? — Five euros.' },
      { text: 'Φεύγω με γεμάτες τσάντες.', english: 'I leave with full bags.' },
    ],
    comprehension: [
      { question: 'Πόσο πληρώνει;', options: ['5 ευρώ', '10 ευρώ', '3 ευρώ'], correctIndex: 0 },
    ],
  },
  // —— Hobbies ——
  {
    id: 'football-match',
    packId: 'hobbies-friends',
    title: 'Ποδοσφαιρικός αγώνας',
    titleEnglish: 'A football match',
    level: 'intermediate',
    requiredTopics: ['present-tense'],
    sentences: [
      { text: 'Το Σάββατο παίζουμε ποδόσφαιρο στο γήπεδο.', english: 'On Saturday we play football at the field.' },
      { text: 'Η ομάδα μας σκοράρει δύο γκολ.', english: 'Our team scores two goals.' },
      { text: 'Οι φίλοι μας φωνάζουν από την εξέδρα.', english: 'Our friends shout from the stands.' },
      { text: 'Νιώθουμε κούραση, αλλά χαρούμαστε.', english: 'We feel tired, but we are happy.' },
    ],
    comprehension: [
      { question: 'Πόσα γκολ σκοράρει η ομάδα;', options: ['δύο', 'ένα', 'τρία'], correctIndex: 0 },
    ],
  },
  // —— Transport ——
  {
    id: 'metro-athens',
    packId: 'transport-commute',
    title: 'Με το μετρό',
    titleEnglish: 'By metro',
    level: 'beginner',
    requiredTopics: ['prepositions'],
    sentences: [
      { text: 'Παίρνω το μετρό στη Συγγρού.', english: 'I take the metro at Syngrou.' },
      { text: 'Κατεβαίνω στο Σύνταγμα.', english: 'I get off at Syntagma.' },
      { text: 'Η διαδρομή διαρκεί δέκα λεπτά.', english: 'The trip lasts ten minutes.' },
      { text: 'Φτάνω στη δουλειά στην ώρα μου.', english: 'I arrive at work on time.' },
    ],
    comprehension: [
      { question: 'Πού κατεβαίνει;', options: ['Σύνταγμα', 'Μοναστηράκι', 'Πειραιά'], correctIndex: 0 },
    ],
  },
  {
    id: 'taxi-airport',
    packId: 'transport-commute',
    title: 'Ταξί για το αεροδρόμιο',
    titleEnglish: 'Taxi to the airport',
    level: 'intermediate',
    requiredTopics: ['time'],
    sentences: [
      { text: '— Πρέπει να φτάσουμε στις έξι το πρωί.', english: '— We need to arrive at six in the morning.' },
      { text: '— Καλέστε ένα ταξί, παρακαλώ.', english: '— Call a taxi, please.' },
      { text: 'Ο οδηγός βάζει τις βαλίτσες στο πορτμπαγκάζ.', english: 'The driver puts the suitcases in the boot.' },
      { text: 'Ο δρόμος είναι ήσυχος σ’ αυτή την ώρα.', english: 'The road is quiet at this hour.' },
    ],
    comprehension: [
      { question: 'Τι ώρα πρέπει να φτάσουν;', options: ['6 το πρωί', '6 το απόγευμα', '8 το πρωί'], correctIndex: 0 },
    ],
  },
  // —— Travel ——
  {
    id: 'hotel-checkin',
    packId: 'travel-town',
    title: 'Check-in στο ξενοδοχείο',
    titleEnglish: 'Hotel check-in',
    level: 'intermediate',
    requiredTopics: ['survival-greek'],
    sentences: [
      { text: '— Καλησπέρα. Έχω κράτηση στο όνομα Παπαδόπουλος.', english: '— Good evening. I have a reservation under the name Papadopoulos.' },
      { text: '— Καλώς ήρθατε! Το δωμάτιό σας είναι στον τρίτο όροφο.', english: '— Welcome! Your room is on the third floor.' },
      { text: '— Το πρωινό σερβίρεται από τις επτά.', english: '— Breakfast is served from seven.' },
      { text: '— Ευχαριστώ. Καλή σας βραδιά!', english: '— Thank you. Have a good evening!' },
    ],
    comprehension: [
      { question: 'Σε ποιον όροφο είναι το δωμάτιο;', options: ['τρίτο', 'δεύτερο', 'πρώτο'], correctIndex: 0 },
    ],
  },
  // —— Dialogues: Directions ——
  {
    id: 'lost-in-plaka',
    packId: 'directions-dialogues',
    title: 'Χαμένος στην Πλάκα',
    titleEnglish: 'Lost in Plaka',
    level: 'beginner',
    requiredTopics: ['question-words'],
    sentences: [
      { text: '— Συγγνώμη, πού είναι η Ακρόπολη;', english: '— Excuse me, where is the Acropolis?' },
      { text: '— Πηγαίνετε ευθεία και στρίψτε αριστερά.', english: '— Go straight and turn left.' },
      { text: '— Είναι μακριά;', english: '— Is it far?' },
      { text: '— Όχι, δέκα λεπτά με τα πόδια.', english: '— No, ten minutes on foot.' },
      { text: '— Σας ευχαριστώ πολύ!', english: '— Thank you very much!' },
    ],
    comprehension: [
      { question: 'Πού θέλει να πάει;', options: ['Ακρόπολη', 'σταθμό', 'μουσείο'], correctIndex: 0 },
    ],
  },
  // —— Dialogues: Questions ——
  {
    id: 'making-plans',
    packId: 'questions-dialogue',
    title: 'Κάνουμε σχέδια',
    titleEnglish: 'Making plans',
    level: 'beginner',
    requiredTopics: ['questions-negation'],
    sentences: [
      { text: '— Τι κάνεις αύριο το απόγευμα;', english: '— What are you doing tomorrow afternoon?' },
      { text: '— Τίποτα ιδιαίτερο. Γιατί;', english: '— Nothing special. Why?' },
      { text: '— Θέλεις να πάμε σινεμά;', english: '— Do you want to go to the cinema?' },
      { text: '— Ναι! Τι ώρα;', english: '— Yes! What time?' },
      { text: '— Στις επτά, στο κέντρο.', english: '— At seven, downtown.' },
    ],
    comprehension: [
      { question: 'Τι προτείνουν να κάνουν;', options: ['σινεμά', 'περίπατο', 'φαγητό'], correctIndex: 0 },
    ],
  },
  {
    id: 'phone-call',
    packId: 'questions-dialogue',
    title: 'Τηλεφωνική κλήση',
    titleEnglish: 'A phone call',
    level: 'intermediate',
    requiredTopics: ['questions-negation'],
    sentences: [
      { text: '— Εμπρός, μίλα η Σοφία.', english: '— Hello, Sofia speaking.' },
      { text: '— Γεια σου, Σοφία! Είμαι ο Γιάννης.', english: '— Hi Sofia! It’s Giannis.' },
      { text: '— Έφτασες σπίτι;', english: '— Did you get home?' },
      { text: '— Ναι, μόλις τώρα. Ήταν ωραία η βόλτα μας.', english: '— Yes, just now. Our walk was nice.' },
      { text: '— Τα λέμε αύριο!', english: '— See you tomorrow!' },
    ],
    comprehension: [
      { question: 'Ποιος τηλεφωνεί;', options: ['Γιάννης', 'Μαρία', 'Νίκος'], correctIndex: 0 },
    ],
  },
  // —— Read & Listen ——
  {
    id: 'listen-rainy-day',
    packId: 'listen-routines',
    title: 'Μια βροχερή μέρα',
    titleEnglish: 'A rainy day',
    level: 'beginner',
    requiredTopics: ['present-tense'],
    sentences: [
      { text: 'Βρέχει από το πρωί.', english: 'It has been raining since morning.' },
      { text: 'Μένω σπίτι και διαβάζω βιβλίο.', english: 'I stay home and read a book.' },
      { text: 'Ακούω ήσυχα μουσική.', english: 'I listen quietly to music.' },
      { text: 'Το απόγευμα φτιάχνω ζεστό τσάι.', english: 'In the afternoon I make hot tea.' },
    ],
    comprehension: [
      { question: 'Τι κάνει επειδή βρέχει;', options: ['μένει σπίτι', 'πάει δουλειά', 'παίζει ποδόσφαιρο'], correctIndex: 0 },
    ],
  },
  {
    id: 'listen-evening-news',
    packId: 'listen-routines',
    title: 'Βραδινά νέα',
    titleEnglish: 'Evening news',
    level: 'intermediate',
    requiredTopics: ['present-tense'],
    sentences: [
      { text: 'Κάθε βράδυ η γιαγιά μου βλέπει ειδήσεις.', english: 'Every evening my grandma watches the news.' },
      { text: 'Καθόμαστε στον καναπέ μαζί.', english: 'We sit on the sofa together.' },
      { text: 'Μιλάμε για την πόλη και τον καιρό.', english: 'We talk about the city and the weather.' },
      { text: 'Μετά κλείνει την τηλεόραση και χαμογελά.', english: 'Then she turns off the TV and smiles.' },
    ],
    comprehension: [
      { question: 'Τι βλέπει η γιαγιά;', options: ['ειδήσεις', 'σειρά', 'αγώνα'], correctIndex: 0 },
    ],
  },
  // —— Weather (new pack) ——
  {
    id: 'summer-heat',
    packId: 'weather-everyday',
    title: 'Καλοκαιρινή ζέστη',
    titleEnglish: 'Summer heat',
    level: 'beginner',
    requiredTopics: ['present-tense'],
    sentences: [
      { text: 'Σήμερα κάνει πολύ ζέστη.', english: 'Today it is very hot.' },
      { text: 'Ο ήλιος είναι δυνατός.', english: 'The sun is strong.' },
      { text: 'Πίνουμε πολύ νερό.', english: 'We drink a lot of water.' },
      { text: 'Το απόγευμα πάμε στη θάλασσα.', english: 'In the afternoon we go to the sea.' },
    ],
    comprehension: [
      { question: 'Πώς είναι ο καιρός;', options: ['πολύ ζέστη', 'βροχή', 'χιόνι'], correctIndex: 0 },
    ],
  },
  {
    id: 'winter-cold',
    packId: 'weather-everyday',
    title: 'Χειμωνιάτικο κρύο',
    titleEnglish: 'Winter cold',
    level: 'beginner',
    requiredTopics: ['present-tense'],
    sentences: [
      { text: 'Βγαίνω από το σπίτι με παλτό και κασκόλ.', english: 'I leave the house with a coat and scarf.' },
      { text: 'Ο αέρας είναι κρύος.', english: 'The air is cold.' },
      { text: 'Τα χέρια μου είναι κρύα.', english: 'My hands are cold.' },
      { text: 'Περιμένω το λεωφορείο πίσω από τη στάση.', english: 'I wait for the bus behind the shelter.' },
    ],
    comprehension: [
      { question: 'Τι φοράει όταν βγαίνει;', options: ['παλτό και κασκόλ', 'σορτς', 'μπλούζα'], correctIndex: 0 },
    ],
  },
  // —— Work ——
  {
    id: 'office-monday',
    packId: 'work-office',
    title: 'Δευτέρα στο γραφείο',
    titleEnglish: 'Monday at the office',
    level: 'intermediate',
    requiredTopics: ['present-tense'],
    sentences: [
      { text: 'Η Δευτέρα ξεκινά με καφέ στο γραφείο.', english: 'Monday starts with coffee at the office.' },
      { text: 'Ελέγχω τα email μου.', english: 'I check my emails.' },
      { text: 'Στις δέκα έχουμε σύσκεψη.', english: 'At ten we have a meeting.' },
      { text: 'Ο συνάδελφός μου μου δίνει μια νέα εργασία.', english: 'My colleague gives me a new task.' },
      { text: 'Τελειώνω στις πέντε.', english: 'I finish at five.' },
    ],
    comprehension: [
      { question: 'Τι ώρα είναι η σύσκεψη;', options: ['10', '9', '11'], correctIndex: 0 },
    ],
  },
  // —— City life ——
  {
    id: 'neighbourhood-cafe',
    packId: 'city-life',
    title: 'Η γειτονιά μας',
    titleEnglish: 'Our neighbourhood',
    level: 'beginner',
    requiredTopics: ['present-tense'],
    sentences: [
      { text: 'Μένω σε μια ήσυχη γειτονιά.', english: 'I live in a quiet neighbourhood.' },
      { text: 'Κάτω από το σπίτι μου υπάρχει ένα μικρό καφέ.', english: 'Below my house there is a small café.' },
      { text: 'Τα βράδια ακούω ζωντανή μουσική.', english: 'In the evenings I hear live music.' },
      { text: 'Γνωρίζω τους μαγειρές και τους σερβιτόρους.', english: 'I know the cooks and the waiters.' },
    ],
    comprehension: [
      { question: 'Τι ακούει τα βράδια;', options: ['ζωντανή μουσική', 'αυτοκίνητα', 'σιγή'], correctIndex: 0 },
    ],
  },
  {
    id: 'park-jogging',
    packId: 'city-life',
    title: 'Τρέξιμο στο πάρκο',
    titleEnglish: 'Jogging in the park',
    level: 'intermediate',
    requiredTopics: ['frequency'],
    sentences: [
      { text: 'Συνήθως τρέχω στο πάρκο τρεις φορές την εβδομάδα.', english: 'I usually run in the park three times a week.' },
      { text: 'Το πρωί ο αέρας είναι καθαρός.', english: 'In the morning the air is clean.' },
      { text: 'Συναντάω άλλους δρομείς.', english: 'I meet other runners.' },
      { text: 'Μετά πίνω νερό και πηγαίνω στη δουλειά.', english: 'Afterwards I drink water and go to work.' },
    ],
    comprehension: [
      { question: 'Πόσο συχνά τρέχει;', options: ['3 φορές/εβδομάδα', 'κάθε μέρα', 'μία φορά'], correctIndex: 0 },
    ],
  },
]
