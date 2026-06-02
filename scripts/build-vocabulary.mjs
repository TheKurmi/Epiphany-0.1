#!/usr/bin/env node
/**
 * Builds src/data/vocabulary/all.json from core vocabulary + curated extensions.
 * Run: node scripts/build-vocabulary.mjs
 */
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const core = JSON.parse(readFileSync(join(root, 'src/data/vocabulary.json'), 'utf8'))

/** @type {Record<string, string>} legacy category → canonical */
const CATEGORY_MAP = {
  greetings: 'conversation',
  food: 'food',
  travel: 'travel',
  school: 'school-work',
  family: 'family',
  home: 'daily-life',
  body: 'health',
  numbers: 'numbers',
  colors: 'colors',
  time: 'time',
  weather: 'weather',
  shopping: 'shopping',
  emotions: 'feelings',
  animals: 'animals',
  work: 'school-work',
  nature: 'nature',
  city: 'city',
  verbs: 'verbs',
  adjectives: 'adjectives',
  technology: 'technology',
  sports: 'hobbies',
  culture: 'hobbies',
}

/** Infer gender from common endings when not specified. */
function inferGender(greek) {
  const w = greek.trim()
  if (/^(ο|το)\s/.test(w)) return 'neuter'
  if (/^(η)\s/.test(w)) return 'feminine'
  if (/^(ο)\s/.test(w)) return 'masculine'
  if (w.endsWith('ος') || w.endsWith('ής')) return 'masculine'
  if (w.endsWith('η') || w.endsWith('ά')) return 'feminine'
  if (w.endsWith('ι') || w.endsWith('ο')) return 'neuter'
  return null
}

function enrichCore(item, index) {
  const category = CATEGORY_MAP[item.category] ?? item.category
  return {
    id: item.id ?? index + 1,
    word: item.greek,
    translation: item.english,
    category,
    difficulty: item.difficulty ?? 'easy',
    gender: item.gender ?? inferGender(item.greek),
    plural: item.plural ?? null,
    tags: item.tags ?? [category],
    frequencyRank: item.frequencyRank ?? index + 1,
    conjugationGroup: category === 'verbs' ? '-ω verb' : null,
    relatedWords: [],
  }
}

// [word, translation, difficulty, gender?, plural?, conjugationGroup?]
const EXTENDED = [
  // daily-life (80)
  ['πρωινό ρουτίνα', 'morning routine', 'medium', null, null, null],
  ['βραδινή ρουτίνα', 'evening routine', 'medium', null, null, null],
  ['ξύπνημα', 'wake-up', 'medium', 'neuter', null, null],
  ['ντους', 'shower', 'easy', 'neuter', null, null],
  ['οδοντόβουρτσα', 'toothbrush', 'medium', 'feminine', 'οδοντόβουρτσες', null],
  ['χτένι', 'comb', 'easy', 'neuter', 'χτένια', null],
  ['καθαρισμός', 'cleaning', 'medium', 'masculine', null, null],
  ['σίδερωμα', 'ironing', 'hard', 'neuter', null, null],
  ['πλύσιμο', 'washing', 'medium', 'neuter', null, null],
  ['σκούπα', 'broom', 'easy', 'feminine', 'σκούπες', null],
  ['σφουγγάρι', 'sponge', 'medium', 'neuter', 'σφουγγάρια', null],
  ['κουβέρτα', 'blanket', 'easy', 'feminine', 'κουβέρτες', null],
  ['μαξιλάρι', 'pillow', 'easy', 'neuter', 'μαξιλάρια', null],
  ['σεντόνι', 'sheet', 'medium', 'neuter', 'σεντόνια', null],
  ['ντουλάπι', 'cupboard', 'medium', 'neuter', 'ντουλάπια', null],
  ['συρτάρι', 'drawer', 'medium', 'neuter', 'συρτάρια', null],
  ['ράφι', 'shelf', 'easy', 'neuter', 'ράφια', null],
  ['καλόριφερ', 'radiator', 'medium', 'neuter', null, null],
  ['κλιματιστικό', 'air conditioner', 'hard', 'neuter', 'κλιματιστικά', null],
  ['σκούπα ηλεκτρική', 'vacuum cleaner', 'hard', null, null, null],
  ['σκουπίδια', 'trash', 'easy', 'neuter', null, null],
  ['απορρυπαντικό', 'detergent', 'hard', 'neuter', 'απορρυπαντικά', null],
  ['κεριά', 'candles', 'easy', 'neuter', null, null],
  ['φωτισμός', 'lighting', 'medium', 'masculine', null, null],
  ['διακόπτης', 'switch', 'medium', 'masculine', 'διακόπτες', null],
  ['πρίζα', 'socket / outlet', 'medium', 'feminine', 'πρίζες', null],
  ['κουδούνι', 'doorbell', 'medium', 'neuter', 'κουδούνια', null],
  ['κλειδαριά', 'lock', 'medium', 'feminine', 'κλειδαριές', null],
  ['χώρος', 'space / room area', 'easy', 'masculine', 'χώροι', null],
  ['αυλή', 'yard', 'easy', 'feminine', 'αυλές', null],
  ['φωλιά', 'nest', 'medium', 'feminine', 'φωλιές', null],
  ['σκάλα', 'stairs', 'easy', 'feminine', 'σκάλες', null],
  ['ανελκυστήρας', 'elevator', 'hard', 'masculine', 'ανελκυστήρες', null],
  ['διάδρομος', 'hallway', 'medium', 'masculine', 'διάδρομοι', null],
  ['ταπετσαρία', 'carpet / wallpaper', 'hard', 'feminine', null, null],
  ['χαλί', 'rug', 'easy', 'neuter', 'χαλιά', null],
  ['κουρτίνα', 'curtain', 'medium', 'feminine', 'κουρτίνες', null],
  ['κορνίζα', 'picture frame', 'medium', 'feminine', 'κορνίζες', null],
  ['καθρέφτης', 'mirror', 'easy', 'masculine', 'καθρέφτες', null],
  ['στεγνωτήρας', 'dryer', 'medium', 'masculine', null, null],

  // food extended (60)
  ['γύρος', 'gyro', 'easy', 'masculine', null, null],
  ['σουβλάκι', 'souvlaki', 'easy', 'neuter', 'σουβλάκια', null],
  ['μουσακάς', 'moussaka', 'medium', 'masculine', null, null],
  ['παστίτσιο', 'pastitsio', 'medium', 'neuter', null, null],
  ['φέτα', 'feta cheese', 'easy', 'feminine', null, null],
  ['ελιά', 'olive', 'easy', 'feminine', 'ελιές', null],
  ['λαδερά', 'olive oil dishes', 'hard', 'neuter', null, null],
  ['μεζές', 'mezze / small dish', 'medium', 'masculine', 'μεζέδες', null],
  ['ορεκτικό', 'appetizer', 'medium', 'neuter', 'ορεκτικά', null],
  ['κυρίως πιάτο', 'main course', 'hard', null, null, null],
  ['επιδόρπιο', 'dessert', 'medium', 'neuter', 'επιδόρπια', null],
  ['ζαχαροπλαστική', 'pastry / baking', 'hard', 'feminine', null, null],
  ['ψωμάκι', 'bread roll', 'easy', 'neuter', 'ψωμάκια', null],
  ['φρυγανιά', 'toast / rusk', 'medium', 'feminine', null, null],
  ['βούτυρο', 'butter', 'easy', 'neuter', null, null],
  ['μαργαρίνη', 'margarine', 'medium', 'feminine', null, null],
  ['γιαούρτι', 'yogurt', 'easy', 'neuter', null, null],
  ['κρέμα', 'cream', 'easy', 'feminine', null, null],
  ['μπιφτέκι', 'burger patty / meatball', 'medium', 'neuter', 'μπιφτέκια', null],
  ['σνίτσελ', 'schnitzel', 'medium', 'neuter', null, null],
  ['σαλάτα χωριάτικη', 'Greek salad', 'hard', null, null, null],
  ['χορταρικά', 'greens / herbs', 'medium', 'neuter', null, null],
  ['μαϊντανός', 'parsley', 'medium', 'masculine', null, null],
  ['άνηθος', 'dill', 'medium', 'masculine', null, null],
  ['ρίγανη', 'oregano', 'easy', 'feminine', null, null],
  ['σκόρδο', 'garlic', 'easy', 'neuter', null, null],
  ['κρεμμύδι', 'onion', 'easy', 'neuter', 'κρεμμύδια', null],
  ['πιπεριά', 'pepper (vegetable)', 'easy', 'feminine', 'πιπεριές', null],
  ['μελιτζάνα', 'eggplant', 'medium', 'feminine', 'μελιτζάνες', null],
  ['κολοκύθι', 'zucchini', 'medium', 'neuter', 'κολοκύθια', null],
  ['αγγούρι', 'cucumber', 'easy', 'neuter', 'αγγούρια', null],
  ['λάχανο', 'cabbage', 'easy', 'neuter', 'λάχανα', null],
  ['καρότο', 'carrot', 'easy', 'neuter', 'καρότα', null],
  ['μήλο του Adam', 'apple (humorous)', 'hard', null, null, null],
  ['ποτό', 'drink', 'easy', 'neuter', 'ποτά', null],
  ['χυμός', 'juice', 'easy', 'masculine', 'χυμοί', null],
  ['σφραγίδα', 'bottle cap', 'hard', 'feminine', null, null],
  ['ανθρακούχο', 'sparkling', 'hard', 'neuter', null, null],
  ['σκέτο', 'plain / black', 'easy', 'neuter', null, null],
  ['γλυκό κουταλιού', 'spoon sweet', 'hard', null, null, null],

  // conversation (60)
  ['Γεια σου', 'Hi (informal)', 'easy', null, null, null],
  ['Γεια σας', 'Hello (formal/plural)', 'easy', null, null, null],
  ['Τι κάνεις', 'How are you (informal)', 'easy', null, null, null],
  ['Τι κάνετε', 'How are you (formal)', 'medium', null, null, null],
  ['Χαίρω πολύ', 'Nice to meet you', 'medium', null, null, null],
  ['Παρακαλώ πολύ', 'You are welcome', 'medium', null, null, null],
  ['Με συγχωρείτε', 'Excuse me (formal)', 'medium', null, null, null],
  ['Δεν πειράζει', 'No problem / never mind', 'medium', null, null, null],
  ['Φυσικά', 'Of course', 'easy', null, null, null],
  ['Ίσως', 'Maybe', 'easy', null, null, null],
  ['Μάλλον', 'Probably', 'easy', null, null, null],
  ['Σίγουρα', 'Surely / definitely', 'easy', null, null, null],
  ['Ακριβώς', 'Exactly', 'easy', null, null, null],
  ['Εντάξει', 'OK / alright', 'easy', null, null, null],
  ['Ωραία', 'Nice / fine', 'easy', null, null, null],
  ['Τέλεια', 'Perfect', 'easy', null, null, null],
  ['Πραγματικά', 'Really', 'medium', null, null, null],
  ['Συγγνώμη', 'Sorry / excuse me', 'easy', null, null, null],
  ['Βοήθεια', 'Help', 'easy', 'feminine', null, null],
  ['Καταλαβαίνω', 'I understand', 'medium', null, null, '-ω verb'],
  ['Δεν καταλαβαίνω', 'I do not understand', 'medium', null, null, null],
  ['Μιλάτε αγγλικά', 'Do you speak English', 'medium', null, null, null],
  ['Μιλώ λίγα ελληνικά', 'I speak a little Greek', 'hard', null, null, null],
  ['Πώς λέγεται', 'What is it called', 'medium', null, null, null],
  ['Τι σημαίνει', 'What does it mean', 'medium', null, null, null],
  ['Μπορείτε να επαναλάβετε', 'Can you repeat', 'hard', null, null, null],
  ['Πιο αργά παρακαλώ', 'Slower please', 'medium', null, null, null],
  ['Καλή συνέχεια', 'Take care / continue well', 'medium', null, null, null],
  ['Καλό ταξίδι', 'Have a good trip', 'medium', null, null, null],
  ['Καλή δουλειά', 'Good work', 'easy', null, null, null],

  // transport extended (50)
  ['μετρό', 'metro', 'easy', 'neuter', null, null],
  ['τραμ', 'tram', 'easy', 'neuter', null, null],
  ['ποδήλατο', 'bicycle', 'medium', 'neuter', 'ποδήλατα', null],
  ['σταθμός λεωφορείων', 'bus stop', 'hard', null, null, null],
  ['δρομολόγιο', 'route / schedule', 'hard', 'neuter', 'δρομολόγια', null],
  ['αφίξεις', 'arrivals board', 'hard', null, null, null],
  ['αναχωρήσεις', 'departures board', 'hard', null, null, null],
  ['είσιτήριο λεωφορείου', 'bus ticket', 'hard', null, null, null],
  ['μετρητά', 'cash', 'medium', 'neuter', null, null],
  ['κάρτα', 'card', 'easy', 'feminine', 'κάρτες', null],
  ['επαναφόρτιση', 'top-up / recharge', 'hard', 'feminine', null, null],
  ['κίνηση', 'traffic', 'medium', 'feminine', null, null],
  ['μποτιλιάρισμα', 'traffic jam', 'hard', 'neuter', null, null],
  ['χειριστής', 'driver / operator', 'hard', 'masculine', null, null],
  ['επιβάτης', 'passenger', 'medium', 'masculine', 'επιβάτες', null],
  ['σταθμεύω', 'I park', 'medium', null, null, '-άω verb'],
  ['περνάω', 'I pass / cross', 'medium', null, null, '-άω verb'],
  ['στρίβω', 'I turn', 'medium', null, null, '-ω verb'],
  ['φτάνω', 'I arrive', 'easy', null, null, '-ω verb'],
  ['φεύγω', 'I leave', 'easy', null, null, '-ω verb'],

  // health (50)
  ['πυρετός', 'fever', 'medium', 'masculine', null, null],
  ['βήχας', 'cough', 'medium', 'masculine', null, null],
  ['μπούκωμα', 'sore throat', 'medium', 'neuter', null, null],
  ['αλλεργία', 'allergy', 'medium', 'feminine', 'αλλεργίες', null],
  ['γάζα', 'bandage', 'medium', 'feminine', null, null],
  ['πρώτες βοήθειες', 'first aid', 'hard', null, null, null],
  ['ραντεβού', 'appointment', 'easy', 'neuter', null, null],
  ['εξέταση αίματος', 'blood test', 'hard', null, null, null],
  ['φαρμακοποιός', 'pharmacist', 'hard', 'masculine', null, null],
  ['οδοντίατρος', 'dentist', 'hard', 'masculine', null, null],
  ['ασθενοφόρο', 'ambulance', 'hard', 'neuter', null, null],
  ['υγεία', 'health', 'easy', 'feminine', null, null],
  ['ευεξία', 'wellness', 'hard', 'feminine', null, null],
  ['κούραση', 'fatigue', 'easy', 'feminine', null, null],
  ['ζάλη', 'dizziness', 'medium', 'feminine', null, null],
  ['γεύση', 'taste', 'easy', 'feminine', null, null],
  ['όσφρηση', 'smell', 'medium', 'feminine', null, null],
  ['αφή', 'touch', 'medium', 'feminine', null, null],
  ['όραση', 'sight', 'medium', 'feminine', null, null],
  ['ακοή', 'hearing', 'medium', 'feminine', null, null],

  // hobbies (50)
  ['κιθάρα', 'guitar', 'easy', 'feminine', 'κιθάρες', null],
  ['πιάνο', 'piano', 'easy', 'neuter', null, null],
  ['ζωγραφική', 'painting', 'medium', 'feminine', null, null],
  ['φωτογραφία', 'photography', 'medium', 'feminine', null, null],
  ['ταινία', 'movie', 'easy', 'feminine', 'ταινίες', null],
  ['σειρά', 'TV series', 'easy', 'feminine', 'σειρές', null],
  ['βιβλιοφαγία', 'bookworm habit', 'hard', 'feminine', null, null],
  ['παιχνίδι', 'game', 'easy', 'neuter', 'παιχνίδια', null],
  ['σκάκι', 'chess', 'easy', 'neuter', null, null],
  ['νταμάκι', 'backgammon board', 'hard', 'neuter', null, null],
  ['τρέξιμο', 'running', 'easy', 'neuter', null, null],
  ['γυμναστική', 'gymnastics / workout', 'medium', 'feminine', null, null],
  ['κολύμβηση', 'swimming', 'medium', 'feminine', null, null],
  ['πεζοπορία', 'hiking', 'medium', 'feminine', null, null],
  ['ταξίδι εκδρομή', 'day trip', 'hard', null, null, null],
  ['συλλογή', 'collection (hobby)', 'medium', 'feminine', 'συλλογές', null],
  ['χειροτεχνία', 'crafts', 'hard', 'feminine', null, null],
  ['μαγείρεμα', 'cooking', 'medium', 'neuter', null, null],
  ['ψήσιμο', 'baking', 'medium', 'neuter', null, null],
  ['κήπος λαχανικών', 'vegetable garden', 'hard', null, null, null],

  // technology (40)
  ['λογισμικό', 'software', 'hard', 'neuter', null, null],
  ['σύνδεση', 'connection', 'medium', 'feminine', null, null],
  ['WiFi', 'WiFi', 'easy', null, null, null],
  ['φόρτιση', 'charging', 'medium', 'feminine', null, null],
  ['μπαταρία', 'battery', 'medium', 'feminine', 'μπαταρίες', null],
  ['ενημέρωση', 'update', 'medium', 'feminine', null, null],
  ['λήψη', 'download', 'medium', 'feminine', null, null],
  ['αποθήκευση', 'save / storage', 'medium', 'feminine', null, null],
  ['αρχείο', 'file', 'medium', 'neuter', 'αρχεία', null],
  ['φάκελος', 'folder', 'medium', 'masculine', 'φάκελοι', null],
  ['κλικ', 'click', 'easy', null, null, null],
  ['κωδικός QR', 'QR code', 'medium', null, null, null],
  ['εφαρμογή τραπεζική', 'banking app', 'hard', null, null, null],
  ['ειδοποίηση', 'notification', 'medium', 'feminine', 'ειδοποιήσεις', null],
  ['δεδομένα', 'data', 'medium', 'neuter', null, null],
  ['απόρρητο', 'privacy', 'hard', 'neuter', null, null],
  ['λογαριασμός', 'account', 'medium', 'masculine', 'λογαριασμοί', null],
  ['χρήστης', 'user', 'medium', 'masculine', 'χρήστες', null],
  ['ρυθμίσεις', 'settings', 'easy', 'neuter', null, null],
  ['εικονίδιο', 'icon', 'medium', 'neuter', 'εικονίδια', null],

  // city (40)
  ['δημαρχείο', 'town hall', 'hard', 'neuter', null, null],
  ['δημαρχία', 'mayor office', 'hard', 'feminine', null, null],
  ['περίφραξη', 'fence', 'hard', 'feminine', null, null],
  ['συνοικία', 'neighborhood district', 'hard', 'feminine', 'συνοικίες', null],
  ['πεζοδρόμιο', 'sidewalk', 'medium', 'neuter', 'πεζοδρόμια', null],
  ['διασταύρωση', 'intersection', 'hard', 'feminine', null, null],
  ['στροφή', 'turn', 'easy', 'feminine', 'στροφές', null],
  ['γωνία δρόμου', 'street corner', 'hard', null, null, null],
  ['φανάρι κυκλοφορίας', 'traffic light', 'hard', null, null, null],
  ['πάρκινγκ', 'parking', 'easy', null, null, null],
  ['υπόγειο', 'basement / underground', 'medium', 'neuter', null, null],
  ['όροφος', 'floor / storey', 'easy', 'masculine', 'όροφοι', null],
  ['εισόδου', 'entrance', 'medium', 'feminine', null, null],
  ['έξοδος', 'exit', 'easy', 'feminine', null, null],
  ['ταμπέλα', 'sign / plaque', 'medium', 'feminine', 'ταμπέλες', null],
  ['πινακίδα', 'sign (road)', 'medium', 'feminine', 'πινακίδες', null],
  ['μνημείο', 'monument', 'medium', 'neuter', 'μνημεία', null],
  ['αγάλμα', 'statue', 'medium', 'neuter', 'αγάλματα', null],
  ['πηγάδι', 'well', 'medium', 'neuter', 'πηγάδια', null],
  ['βρύση', 'fountain / tap', 'medium', 'feminine', 'βρύσες', null],

  // verbs extended (80)
  ['τρέχω', 'I run', 'easy', null, null, '-ω verb'],
  ['περπατάω', 'I walk', 'easy', null, null, '-άω verb'],
  ['κοιτάζω', 'I look', 'easy', null, null, '-άω verb'],
  ['ακούω', 'I listen', 'easy', null, null, '-ω verb'],
  ['νιώθω', 'I feel', 'medium', null, null, '-ω verb'],
  ['θυμάμαι', 'I remember', 'medium', null, null, '-άω verb'],
  ['ξεχνάω', 'I forget', 'medium', null, null, '-άω verb'],
  ['προσπαθώ', 'I try', 'medium', null, null, '-άω verb'],
  ['χρειάζομαι', 'I need', 'medium', null, null, '-άομαι verb'],
  ['αρέσω', 'I please / like (impersonal use)', 'hard', null, null, '-ω verb'],
  ['φεύγω', 'I leave', 'easy', null, null, '-ω verb'],
  ['φτάνω', 'I arrive', 'easy', null, null, '-ω verb'],
  ['ανεβαίνω', 'I go up', 'medium', null, null, '-αίνω verb'],
  ['κατεβαίνω', 'I go down', 'medium', null, null, '-αίνω verb'],
  ['μπαίνω', 'I enter', 'easy', null, null, '-αίνω verb'],
  ['βγαίνω', 'I exit / go out', 'easy', null, null, '-αίνω verb'],
  ['κάθομαι', 'I sit', 'easy', null, null, '-άομαι verb'],
  ['σηκώνομαι', 'I get up', 'medium', null, null, '-άομαι verb'],
  ['κοιμάμαι', 'I sleep', 'easy', null, null, '-άομαι verb'],
  ['ξυπνάω', 'I wake up', 'easy', null, null, '-άω verb'],
  ['ντύνομαι', 'I get dressed', 'medium', null, null, '-όομαι verb'],
  ['πλένω', 'I wash', 'easy', null, null, '-ω verb'],
  ['στεγνώνω', 'I dry', 'medium', null, null, '-ω verb'],
  ['μαγειρεύω', 'I cook', 'medium', null, null, '-εύω verb'],
  ['ψήνω', 'I bake / roast', 'medium', null, null, '-ω verb'],
  ['κόβω', 'I cut', 'easy', null, null, '-ω verb'],
  ['ανακατεύω', 'I stir', 'hard', null, null, '-εύω verb'],
  ['πληρώνω', 'I pay', 'medium', null, null, '-ω verb'],
  ['αλλάζω', 'I change', 'easy', null, null, '-άω verb'],
  ['επιλέγω', 'I choose', 'medium', null, null, '-ω verb'],
  ['αποφασίζω', 'I decide', 'medium', null, null, '-ω verb'],
  ['σκέφτομαι', 'I think (about)', 'medium', null, null, '-άομαι verb'],
  ['πιστεύω', 'I believe', 'easy', null, null, '-εύω verb'],
  ['ελπίζω', 'I hope', 'easy', null, null, '-ω verb'],
  ['φοβάμαι', 'I am afraid', 'medium', null, null, '-άομαι verb'],
  ['γελάω', 'I laugh', 'easy', null, null, '-άω verb'],
  ['κλαίω', 'I cry', 'easy', null, null, '-άω verb'],
  ['φωνάζω', 'I shout', 'easy', null, null, '-άω verb'],
  ['ψιθυρίζω', 'I whisper', 'hard', null, null, '-ω verb'],
  ['εξηγώ', 'I explain', 'medium', null, null, '-ω verb'],

  // adjectives extended (40)
  ['νόστιμος', 'tasty (m)', 'easy', 'masculine', null, null],
  ['γλυκός', 'sweet', 'easy', 'masculine', null, null],
  ['αλητός', 'salty', 'medium', 'masculine', null, null],
  ['πικρός', 'bitter', 'medium', 'masculine', null, null],
  ['φρέσκος', 'fresh', 'easy', 'masculine', null, null],
  ['ζεστός', 'hot / warm', 'easy', 'masculine', null, null],
  ['κρύος', 'cold', 'easy', 'masculine', null, null],
  ['στεγνός', 'dry', 'medium', 'masculine', null, null],
  ['υγρός', 'wet', 'medium', 'masculine', null, null],
  ['στενός', 'narrow', 'medium', 'masculine', null, null],
  ['φαρδύς', 'wide', 'medium', 'masculine', null, null],
  ['ψηλός', 'tall', 'easy', 'masculine', null, null],
  ['κοντός', 'short', 'easy', 'masculine', null, null],
  ['παχύς', 'thick / fat', 'medium', 'masculine', null, null],
  ['λεπτός', 'thin', 'medium', 'masculine', null, null],
  ['βαθύς', 'deep', 'medium', 'masculine', null, null],
  ['ρηχός', 'shallow', 'hard', 'masculine', null, null],
  ['ήσυχος', 'quiet', 'easy', 'masculine', null, null],
  ['θορυβώδης', 'noisy', 'hard', 'masculine', null, null],
  ['ασφαλής', 'safe', 'medium', 'masculine', null, null],

  // school-work extended (40)
  ['σεμινάριο', 'seminar', 'hard', 'neuter', 'σεμινάρια', null],
  ['εργαστήριο', 'workshop / lab', 'hard', 'neuter', 'εργαστήρια', null],
  ['πτυχίο', 'degree', 'medium', 'neuter', 'πτυχία', null],
  ['δίπλωμα', 'diploma', 'medium', 'neuter', 'διπλώματα', null],
  ['αίθουσα', 'lecture hall', 'hard', 'feminine', 'αίθουσες', null],
  ['διάλειμμα', 'break', 'medium', 'neuter', 'διαλείμματα', null],
  ['προθεσμία εργασίας', 'assignment deadline', 'hard', null, null, null],
  ['ομαδική εργασία', 'group project', 'hard', null, null, null],
  ['παρουσίαση', 'presentation', 'medium', 'feminine', null, null],
  ['συνάδελφος', 'colleague', 'medium', 'masculine', null, null],
  ['προϊστάμενος', 'supervisor', 'hard', 'masculine', null, null],
  ['ωράριο εργασίας', 'working hours', 'hard', null, null, null],
  ['υπερωρία', 'overtime', 'hard', 'feminine', null, null],
  ['άδεια', 'leave / vacation', 'easy', 'feminine', null, null],
  ['σύμβαση εργασίας', 'employment contract', 'hard', null, null, null],
  ['βιογραφικό', 'CV / resume', 'medium', 'neuter', null, null],
  ['συνέντευξη εργασίας', 'job interview', 'hard', null, null, null],
  ['προσόν', 'qualification', 'hard', 'neuter', 'προσόντα', null],
  ['εκπαίδευση', 'education', 'medium', 'feminine', null, null],
  ['γνώσεις', 'skills / knowledge', 'medium', 'feminine', null, null],

  // travel extended (40)
  ['τουρίστες', 'tourists', 'easy', null, null, null],
  ['ξεναγός', 'tour guide', 'medium', 'masculine', null, null],
  ['αξιοθέατο', 'sight / attraction', 'hard', 'neuter', 'αξιοθέατα', null],
  ['διαδρομή', 'route / itinerary', 'medium', 'feminine', 'διαδρομές', null],
  ['κράτηση ξενοδοχείου', 'hotel booking', 'hard', null, null, null],
  ['check-in', 'check-in', 'easy', null, null, null],
  ['check-out', 'check-out', 'easy', null, null, null],
  ['αποσκευή', 'piece of luggage', 'medium', 'feminine', 'αποσκευές', null],
  ['διαβατήριο', 'passport', 'medium', 'neuter', 'διαβατήρια', null],
  ['θεώρηση', 'visa stamp', 'hard', 'feminine', null, null],
  ['συνόρα', 'border', 'hard', 'neuter', null, null],
  ['τέλος τελωνείου', 'customs fee', 'hard', null, null, null],
  ['αναχώρηση πτήσης', 'flight departure', 'hard', null, null, null],
  ['καθυστέρηση', 'delay', 'medium', 'feminine', null, null],
  ['ακύρωση', 'cancellation', 'medium', 'feminine', null, null],
  ['ασφάλεια ταξιδιού', 'travel insurance', 'hard', null, null, null],
  ['χάρτης πόλης', 'city map', 'medium', null, null, null],
  ['περιηγητικός οδηγός', 'travel guidebook', 'hard', null, null, null],
  ['αναμνηστικό', 'souvenir', 'medium', 'neuter', 'αναμνηστικά', null],
  ['ταξίδι επιστροφής', 'return trip', 'hard', null, null, null],

  // weather extended (30)
  ['υγρασία', 'humidity', 'hard', 'feminine', null, null],
  ['πρόγνωση', 'forecast', 'medium', 'feminine', null, null],
  ['συννεφιά', 'cloudiness', 'medium', 'feminine', null, null],
  ['αίθριος', 'clear (weather)', 'hard', 'masculine', null, null],
  ['βροχερός', 'rainy', 'medium', 'masculine', null, null],
  ['χιονισμένος', 'snowy', 'hard', 'masculine', null, null],
  ['ανεμώδης', 'windy', 'hard', 'masculine', null, null],
  ['καταιγίδα', 'storm', 'medium', 'feminine', 'καταιγίδες', null],
  ['αστραπή', 'lightning', 'medium', 'feminine', 'αστραπές', null],
  ['βροντή', 'thunder', 'medium', 'feminine', null, null],
  ['ουράνιο τόξο', 'rainbow', 'medium', null, null, null],
  ['ομίχλη', 'fog', 'medium', 'feminine', null, null],
  ['παγετός', 'frost', 'hard', 'masculine', null, null],
  ['λιακάδα', 'sunshine', 'medium', 'feminine', null, null],
  ['σκιά', 'shade', 'easy', 'feminine', null, null],

  // nature extended (30)
  ['βράχος', 'rock', 'easy', 'masculine', 'βράχοι', null],
  ['χώμα', 'soil', 'medium', 'neuter', null, null],
  ['ρίζα', 'root', 'easy', 'feminine', 'ρίζες', null],
  ['φύλλο', 'leaf', 'easy', 'neuter', 'φύλλα', null],
  ['κλαδί', 'branch', 'easy', 'neuter', 'κλαδιά', null],
  ['σπόρος', 'seed', 'medium', 'masculine', 'σπόροι', null],
  ['κήπος', 'garden', 'easy', 'masculine', 'κήποι', null],
  ['βοτάνι', 'herb', 'medium', 'neuter', 'βότανα', null],
  ['φυτεία', 'plantation / crop', 'hard', 'feminine', null, null],
  ['ζώο', 'animal', 'easy', 'neuter', 'ζώα', null],
  ['έντομο', 'insect', 'medium', 'neuter', 'έντομα', null],
  ['πουλάκι', 'birdie', 'easy', 'neuter', 'πουλάκια', null],
  ['κοπάδι', 'flock / herd', 'hard', 'neuter', 'κοπάδια', null],
  ['αγέλη', 'pack / herd', 'hard', 'feminine', null, null],
  ['φωλιά πουλιού', 'bird nest', 'medium', null, null, null],

  // animals extended (30)
  ['πεταλούδα', 'butterfly', 'medium', 'feminine', 'πεταλούδες', null],
  ['μύγα', 'fly (insect)', 'easy', 'feminine', 'μύγες', null],
  ['κουνούπι', 'mosquito', 'medium', 'neuter', 'κουνούπια', null],
  ['σαλιγκάρι', 'snail', 'medium', 'neuter', 'σαλιγκάρια', null],
  ['βάτραχος', 'frog', 'medium', 'masculine', 'βάτραχοι', null],
  ['φίδι', 'snake', 'easy', 'neuter', 'φίδια', null],
  ['αετός', 'eagle', 'medium', 'masculine', null, null],
  ['περιστέρι', 'pigeon', 'easy', 'neuter', 'περιστέρια', null],
  ['κορίτσι σκύλου', 'puppy (colloquial)', 'hard', null, null, null],
  ['γατάκι', 'kitten', 'easy', 'neuter', 'γατάκια', null],
  ['πολύχρωμο ψάρι', 'tropical fish', 'hard', null, null, null],
  ['κοπάδι ψαριών', 'school of fish', 'hard', null, null, null],
  ['αμφίβιο', 'amphibian', 'hard', 'neuter', null, null],
  ['θηλαστικό', 'mammal', 'hard', 'neuter', null, null],
  ['ερπετό', 'reptile', 'hard', 'neuter', null, null],

  // shopping extended (30)
  ['έκπτωση', 'discount', 'medium', 'feminine', null, null],
  ['προσφορά', 'offer / deal', 'easy', 'feminine', 'προσφορές', null],
  ['τιμοκατάλογος', 'price list', 'hard', 'masculine', null, null],
  ['δόσεις', 'installments', 'hard', 'feminine', null, null],
  ['επιστροφή χρημάτων', 'refund', 'hard', null, null, null],
  ['ανταλλαγή', 'exchange (goods)', 'medium', 'feminine', null, null],
  ['μέγεθος ρούχου', 'clothing size', 'medium', null, null, null],
  ['δοκιμαστήριο', 'fitting room', 'hard', 'neuter', null, null],
  ['καλάθι', 'basket / cart', 'easy', 'neuter', 'καλάθια', null],
  ['ταμείο αυτοεξυπηρέτησης', 'self-checkout', 'hard', null, null, null],
  ['λαϊκή αγορά', 'farmers market', 'medium', null, null, null],
  ['σουπερμάρκετ', 'supermarket', 'easy', null, null, null],
  ['ψιλικά', 'small goods / misc', 'hard', 'neuter', null, null],
  ['χαρτικά', 'stationery goods', 'hard', 'neuter', null, null],
  ['πλαστική σακούλα', 'plastic bag', 'medium', null, null, null],

  // family extended (30)
  ['κουμπάρος', 'best man / godfather (friend)', 'hard', 'masculine', null, null],
  ['κουμπάρα', 'maid of honor / godmother (friend)', 'hard', 'feminine', null, null],
  ['νύφη', 'bride', 'medium', 'feminine', null, null],
  ['γαμπρός', 'groom', 'medium', 'masculine', null, null],
  ['πεθερός', 'father-in-law', 'hard', 'masculine', null, null],
  ['πεθερά', 'mother-in-law', 'hard', 'feminine', null, null],
  ['κουνιάδος', 'brother-in-law', 'hard', 'masculine', null, null],
  ['κουνιάδα', 'sister-in-law', 'hard', 'feminine', null, null],
  ['ανιψιός', 'nephew', 'medium', 'masculine', null, null],
  ['ανιψιά', 'niece', 'medium', 'feminine', null, null],
  ['εγγόνι', 'grandchild', 'easy', 'neuter', 'εγγόνια', null],
  ['σύζυγος', 'spouse', 'medium', 'masculine', null, null],
  ['σχέση', 'relationship', 'medium', 'feminine', null, null],
  ['συγγένεια', 'relatives (collective)', 'hard', 'feminine', null, null],
  ['γειτονιά', 'neighborhood community', 'medium', 'feminine', null, null],

  // feelings extended (30)
  ['στρες', 'stress', 'easy', null, null, null],
  ['άγχος', 'anxiety', 'medium', 'neuter', null, null],
  ['ηρεμία', 'calmness', 'medium', 'feminine', null, null],
  ['ενθουσιασμός', 'enthusiasm', 'hard', 'masculine', null, null],
  ['απογοήτευση', 'disappointment', 'hard', 'feminine', null, null],
  ['ικανοποίηση', 'satisfaction', 'hard', 'feminine', null, null],
  ['ενοχή', 'guilt', 'hard', 'feminine', null, null],
  ['ζήλεια', 'jealousy', 'medium', 'feminine', null, null],
  ['εμπιστοσύνη', 'trust', 'hard', 'feminine', null, null],
  ['σεβασμός', 'respect', 'medium', 'masculine', null, null],
  ['θυμός', 'anger', 'easy', 'masculine', null, null],
  ['λύπη', 'sadness / grief', 'easy', 'feminine', null, null],
  ['χαρά', 'joy', 'easy', 'feminine', null, null],
  ['έρωτας', 'romantic love', 'medium', 'masculine', null, null],
  ['συμπόνια', 'compassion', 'hard', 'feminine', null, null],

  // time extended (30)
  ['λεπτό', 'minute', 'easy', 'neuter', 'λεπτά', null],
  ['δευτερόλεπτο', 'second', 'medium', 'neuter', 'δευτερόλεπτα', null],
  ['στιγμή', 'moment', 'easy', 'feminine', 'στιγμές', null],
  ['περίοδος', 'period', 'medium', 'feminine', 'περίοδοι', null],
  ['διάλειμμα', 'interval / break', 'medium', 'neuter', null, null],
  ['πρόγραμμα', 'schedule / program', 'medium', 'neuter', 'προγράμματα', null],
  ['ρουτίνα', 'routine', 'medium', 'feminine', null, null],
  ['συχνότητα', 'frequency', 'hard', 'feminine', null, null],
  ['διάρκεια', 'duration', 'medium', 'feminine', null, null],
  ['προθεσμία', 'deadline', 'hard', 'feminine', null, null],
  ['Τρίτη', 'Tuesday', 'easy', 'feminine', null, null],
  ['Τετάρτη', 'Wednesday', 'medium', 'feminine', null, null],
  ['Πέμπτη', 'Thursday', 'medium', 'feminine', null, null],
  ['Παρασκευή', 'Friday', 'medium', 'feminine', null, null],
  ['Σάββατο', 'Saturday', 'easy', 'neuter', null, null],
]

const PACK_CATEGORY = {
  'πρωινό ρουτίνα': 'daily-life',
}

function categoryForWord(word, index) {
  // Assign by block ranges based on insertion order — use tags in tuple later
  return null
}

// Assign categories based on position blocks in EXTENDED array
const BLOCKS = [
  { count: 40, category: 'daily-life' },
  { count: 40, category: 'food' },
  { count: 30, category: 'conversation' },
  { count: 20, category: 'transport' },
  { count: 20, category: 'health' },
  { count: 20, category: 'hobbies' },
  { count: 20, category: 'technology' },
  { count: 20, category: 'city' },
  { count: 40, category: 'verbs' },
  { count: 20, category: 'adjectives' },
  { count: 20, category: 'school-work' },
  { count: 20, category: 'travel' },
  { count: 15, category: 'weather' },
  { count: 15, category: 'nature' },
  { count: 15, category: 'animals' },
  { count: 15, category: 'shopping' },
  { count: 15, category: 'family' },
  { count: 15, category: 'feelings' },
  { count: 15, category: 'time' },
]

let cursor = 0
const extendedItems = []
let nextId = core.length + 1

for (const block of BLOCKS) {
  for (let i = 0; i < block.count && cursor < EXTENDED.length; i++, cursor++) {
    const [word, translation, difficulty, gender, plural, conjugationGroup] = EXTENDED[cursor]
    extendedItems.push({
      id: nextId++,
      word,
      translation,
      category: block.category,
      difficulty,
      gender: gender ?? null,
      plural: plural ?? null,
      tags: [block.category],
      frequencyRank: nextId,
      conjugationGroup: conjugationGroup ?? null,
      relatedWords: [],
    })
  }
}

// Fill remaining extended tuples
while (cursor < EXTENDED.length) {
  const [word, translation, difficulty, gender, plural, conjugationGroup] = EXTENDED[cursor++]
  extendedItems.push({
    id: nextId++,
    word,
    translation,
    category: 'daily-life',
    difficulty,
    gender: gender ?? null,
    plural: plural ?? null,
    tags: ['daily-life'],
    frequencyRank: nextId,
    conjugationGroup: conjugationGroup ?? null,
    relatedWords: [],
  })
}

const enrichedCore = core.map(enrichCore)
const seen = new Set(enrichedCore.map((w) => w.word.toLowerCase()))
const dedupedExtended = extendedItems.filter((w) => {
  const key = w.word.toLowerCase()
  if (seen.has(key)) return false
  seen.add(key)
  return true
})

/** Programmatic high-value expansions — numbers, months, phrases, compounds */
function generateProgrammatic(startId) {
  const items = []
  let id = startId

  function add(word, translation, category, difficulty = 'medium', extra = {}) {
    const key = word.toLowerCase()
    if (seen.has(key)) return
    seen.add(key)
    items.push({
      id: id++,
      word,
      translation,
      category,
      difficulty,
      gender: extra.gender ?? null,
      plural: extra.plural ?? null,
      tags: [category, ...(extra.tags ?? [])],
      frequencyRank: id,
      conjugationGroup: extra.conjugationGroup ?? null,
      relatedWords: [],
    })
  }

  const months = [
    ['Ιανουάριος', 'January'], ['Φεβρουάριος', 'February'], ['Μάρτιος', 'March'],
    ['Απρίλιος', 'April'], ['Μάιος', 'May'], ['Ιούνιος', 'June'],
    ['Ιούλιος', 'July'], ['Αύγουστος', 'August'], ['Σεπτέμβριος', 'September'],
    ['Οκτώβριος', 'October'], ['Νοέμβριος', 'November'], ['Δεκέμβριος', 'December'],
  ]
  months.forEach(([w, t]) => add(w, t, 'time', 'medium', { gender: 'masculine' }))

  const teens = [
    ['έντεκα', 'eleven'], ['δώδεκα', 'twelve'], ['δεκατρία', 'thirteen'],
    ['δεκατέσσερα', 'fourteen'], ['δεκαπέντε', 'fifteen'], ['δεκαέξι', 'sixteen'],
    ['δεκαεπτά', 'seventeen'], ['δεκαοκτώ', 'eighteen'], ['δεκαεννέα', 'nineteen'],
  ]
  teens.forEach(([w, t]) => add(w, t, 'numbers', 'medium'))

  for (let n = 11; n <= 99; n += 1) {
    if (n <= 19) continue
    const tens = ['', '', 'είκοσι', 'τριάντα', 'σαράντα', 'πενήντα', 'εξήντα', 'εβδομήντα', 'ογδόντα', 'ενενήντα']
    const ones = ['', 'ένα', 'δύο', 'τρία', 'τέσσερα', 'πέντε', 'έξι', 'επτά', 'οκτώ', 'εννέα']
    const t = Math.floor(n / 10)
    const o = n % 10
    const greek = o === 0 ? tens[t] : `${tens[t]} ${ones[o]}`
    add(greek, String(n), 'numbers', n <= 30 ? 'medium' : 'hard')
  }

  const phrases = [
    ['Καλημέρα σας', 'Good morning (formal)', 'conversation'],
    ['Καλησπέρα σας', 'Good evening (formal)', 'conversation'],
    ['Τι κάνετε', 'How are you (formal)', 'conversation'],
    ['Πολύ καλά ευχαριστώ', 'Very well thank you', 'conversation'],
    ['Μιλάτε ελληνικά', 'Do you speak Greek', 'conversation'],
    ['Δεν μιλάω καλά', 'I do not speak well', 'conversation'],
    ['Μπορείτε να μιλήσετε πιο αργά', 'Can you speak slower', 'conversation'],
    ['Πού είναι η τουαλέτα', 'Where is the bathroom', 'conversation'],
    ['Θα ήθελα', 'I would like', 'conversation'],
    ['Έναν καφέ παρακαλώ', 'A coffee please', 'conversation'],
    ['Τον λογαριασμό παρακαλώ', 'The bill please', 'conversation'],
    ['Τι ώρα ανοίγει', 'What time does it open', 'conversation'],
    ['Τι ώρα κλείνει', 'What time does it close', 'conversation'],
    ['Είμαι χαρούμενος', 'I am happy (m)', 'feelings'],
    ['Είμαι χαρούμενη', 'I am happy (f)', 'feelings'],
    ['Είμαι κουρασμένος', 'I am tired (m)', 'feelings'],
    ['Είμαι κουρασμένη', 'I am tired (f)', 'feelings'],
    ['Έχω πεινάσει', 'I have gotten hungry', 'food'],
    ['Έχω διψάσει', 'I have gotten thirsty', 'food'],
    ['Πάμε για καφέ', 'Let us go for coffee', 'food'],
    ['Μου αρέσει', 'I like it', 'feelings'],
    ['Δεν μου αρέσει', 'I do not like it', 'feelings'],
    ['Στο σπίτι', 'At home', 'daily-life'],
    ['Στο σχολείο', 'At school', 'school-work'],
    ['Στη δουλειά', 'At work', 'school-work'],
    ['Στο καφέ', 'At the café', 'food'],
    ['Στο σούπερ μάρκετ', 'At the supermarket', 'shopping'],
    ['Στο νοσοκομείο', 'At the hospital', 'health'],
    ['Στο αεροδρόμιο', 'At the airport', 'travel'],
    ['Στο λιμάνι', 'At the port', 'travel'],
    ['Στη στάση', 'At the stop', 'transport'],
    ['Με τα πόδια', 'On foot', 'transport'],
    ['Με το αυτοκίνητο', 'By car', 'transport'],
    ['Με το τρένο', 'By train', 'transport'],
    ['Με το μετρό', 'By metro', 'transport'],
    ['Πηγαίνω στη δουλειά', 'I go to work', 'daily-life'],
    ['Γυρίζω σπίτι', 'I return home', 'daily-life'],
    ['Ξυπνάω νωρίς', 'I wake up early', 'time'],
    ['Κοιμάμαι αργά', 'I sleep late', 'time'],
    ['Κάθε μέρα', 'Every day', 'time'],
    ['Κάθε εβδομάδα', 'Every week', 'time'],
    ['Κάθε μήνα', 'Every month', 'time'],
    ['Μία φορά', 'Once', 'time'],
    ['Δύο φορές', 'Twice', 'time'],
    ['Συχνά', 'Often', 'time'],
    ['Σπάνια', 'Rarely', 'time'],
    ['Πάντα', 'Always', 'time'],
    ['Ποτέ', 'Never', 'time'],
    ['Συνήθως', 'Usually', 'time'],
    ['Τώρα αμέσως', 'Right now', 'time'],
    ['Σε λίγο', 'In a little while', 'time'],
    ['Πριν από λίγο', 'A little while ago', 'time'],
  ]
  phrases.forEach(([w, t, c]) => add(w, t, c, 'medium'))

  const food2 = [
    ['μπακλαβάς', 'baklava'], ['κανταΐφι', 'kataifi pastry'], ['λουκουμάς', 'loukoumades'],
    ['σουβλάκι χοιρινό', 'pork souvlaki'], ['σουβλάκι κοτόπουλο', 'chicken souvlaki'],
    ['χωριάτικη σαλάτα', 'village salad'], ['τζατζίκι', 'tzatziki'], ['μελιτζανοσαλάτα', 'eggplant dip'],
    ['φασολάδα', 'bean soup'], ['φακές', 'lentil soup'], ['κοτόσουπα', 'chicken soup'],
    ['παστίτσιο', 'pastitsio'], ['σπανακόπιτα', 'spinach pie'], ['τυρόπιτα', 'cheese pie'],
    ['κουλούρι', 'bread ring'], ['κριτσίνι', 'breadstick'], ['φρυγανιά', 'rusk'],
    ['ρούμι', 'rum'], ['ουίσκι', 'whiskey'], ['κονιάκ', 'cognac'],
    ['σαμπουάν', 'shampoo'], ['αφρόλουτρο', 'shower gel'], ['οδοντόκρεμα', 'toothpaste'],
  ]
  food2.forEach(([w, t]) => add(w, t, 'food', 'medium'))

  const city2 = [
    ['Αθήνα', 'Athens'], ['Θεσσαλονίκη', 'Thessaloniki'], ['Πάτρα', 'Patras'],
    ['Ηράκλειο', 'Heraklion'], ['Λάρισα', 'Larissa'], ['Βόλος', 'Volos'],
    ['Ιωάννινα', 'Ioannina'], ['Χανιά', 'Chania'], ['Ρόδος', 'Rhodes'],
    ['Κέρκυρα', 'Corfu'], ['Μύκονος', 'Mykonos'], ['Σαντορίνη', 'Santorini'],
    ['Ακρόπολη', 'Acropolis'], ['Πλάκα', 'Plaka district'], ['Μοναστηράκι', 'Monastiraki'],
    ['Σύνταγμα', 'Syntagma'], ['Ομόνοια', 'Omonia'], ['Εξάρχεια', 'Exarchia'],
    ['αγορά', 'marketplace'], ['περίπτερο', 'kiosk'], ['φούρνος', 'bakery'],
    ['ζαχαροπλαστείο', 'patisserie'], ['κρεοπωλείο', 'butcher shop'],
    ['ιχθυοπωλείο', 'fish shop'], ['ανθοπωλείο', 'flower shop'],
    ['βιβλιοπωλείο', 'bookstore'], ['κομμωτήριο', 'hair salon'],
  ]
  city2.forEach(([w, t]) => add(w, t, 'city', w.length > 8 ? 'hard' : 'medium'))

  const verbs2 = [
    ['αγοράζω', 'I buy'], ['πουλάω', 'I sell'], ['δανείζω', 'I lend'],
    ['δανείζομαι', 'I borrow'], ['κλείνω ραντεβού', 'I book an appointment'],
    ['περιμένω', 'I wait'], ['βιάζομαι', 'I hurry'], ['καθυστερώ', 'I am late'],
    ['προλαβαίνω', 'I make it in time'], ['συναντάω', 'I meet'], ['χαιρετάω', 'I greet'],
    ['αποχαιρετάω', 'I say goodbye'], ['συστήνω', 'I introduce'], ['προσκαλώ', 'I invite'],
    ['αποδέχομαι', 'I accept'], ['αρνούμαι', 'I refuse'], ['συμφωνώ', 'I agree'],
    ['διαφωνώ', 'I disagree'], ['προτείνω', 'I suggest'], ['αποφασίζω', 'I decide'],
    ['οργανώνω', 'I organize'], ['προετοιμάζω', 'I prepare'], ['ετοιμάζω', 'I prepare'],
    ['σερβίρω', 'I serve'], ['παραγγέλνω', 'I order'], ['πληρώνω', 'I pay'],
    ['κρατάω', 'I hold / keep'], ['αφήνω', 'I leave / let'], ['βρίσκω', 'I find'],
    ['χάνω', 'I lose'], ['κερδίζω', 'I win / earn'], ['ξοδεύω', 'I spend'],
    ['αποταμιεύω', 'I save money'], ['δανείζομαι', 'I borrow'], ['δανείζω', 'I lend'],
    ['δανείζω', 'I lend money'], ['συζητάω', 'I discuss'], ['συζητώ', 'I discuss'],
    ['επισκεπτόμαι', 'I visit'], ['ταξιδεύω', 'I travel'], ['εξερευνώ', 'I explore'],
    ['φωτογραφίζω', 'I photograph'], ['γράφω μήνυμα', 'I write a message'],
    ['στέλνω', 'I send'], ['λαμβάνω', 'I receive'], ['ανοίγω', 'I open'],
    ['κλείνω', 'I close'], ['κλειδώνω', 'I lock'], ['ξεκλειδώνω', 'I unlock'],
    ['ανάβω', 'I turn on'], ['σβήνω', 'I turn off / erase'], ['φορτίζω', 'I charge'],
    ['κατεβάζω', 'I download'], ['ανεβάζω', 'I upload'], ['αποθηκεύω', 'I save'],
    ['διαγράφω', 'I delete'], ['εκτυπώνω', 'I print'], ['σκανάρω', 'I scan'],
    ['ψάχνω', 'I search'], ['βρίσκω', 'I find'], ['χάνω', 'I lose'],
    ['αναζητώ', 'I look for'], ['ανακαλύπτω', 'I discover'], ['δοκιμάζω', 'I try / taste'],
    ['προτιμώ', 'I prefer'], ['επιλέγω', 'I choose'], ['αποφασίζω', 'I decide'],
  ]
  verbs2.forEach(([w, t]) => add(w, t, 'verbs', 'medium', { conjugationGroup: '-ω verb' }))

  const adj2 = [
    ['ωραίος', 'nice / beautiful (m)'], ['όμορφη', 'beautiful (f)'], ['όμορφο', 'beautiful (n)'],
    ['άσχημος', 'ugly (m)'], ['καλός', 'good (m)'], ['καλή', 'good (f)'], ['καλό', 'good (n)'],
    ['κακός', 'bad (m)'], ['μεγάλη', 'big (f)'], ['μεγάλο', 'big (n)'],
    ['μικρή', 'small (f)'], ['μικρό', 'small (n)'], ['νέα', 'new (f)'], ['νέο', 'new (n)'],
    ['παλιά', 'old (f)'], ['παλιό', 'old (n)'], ['εύκολη', 'easy (f)'], ['δύσκολη', 'hard (f)'],
    ['σωστή', 'correct (f)'], ['λάθος', 'wrong'], ['φθηνή', 'cheap (f)'], ['ακριβή', 'expensive (f)'],
    ['καθαρή', 'clean (f)'], ['βρώμικη', 'dirty (f)'], ['ήσυχη', 'quiet (f)'],
    ['γρήγορη', 'fast (f)'], ['αργή', 'slow (f)'], ['ζεστή', 'warm (f)'], ['κρύα', 'cold (f)'],
    ['γλυκιά', 'sweet (f)'], ['νόστιμη', 'tasty (f)'], ['φρέσκια', 'fresh (f)'],
    ['κουρασμένος', 'tired (m)'], ['κουρασμένη', 'tired (f)'], ['χαρούμενος', 'happy (m)'],
    ['χαρούμενη', 'happy (f)'], ['λυπημένος', 'sad (m)'], ['λυπημένη', 'sad (f)'],
    ['νευρικός', 'nervous (m)'], ['νευρική', 'nervous (f)'], ['ήρεμος', 'calm (m)'],
    ['ήρεμη', 'calm (f)'], ['ασφαλής', 'safe (m/f)'], ['επικίνδυνος', 'dangerous (m)'],
    ['επικίνδυνη', 'dangerous (f)'], ['σημαντικός', 'important (m)'], ['σημαντική', 'important (f)'],
  ]
  adj2.forEach(([w, t]) => add(w, t, 'adjectives', 'medium'))

  const daily2 = [
    ['χαρτομάντιλα', 'tissue'], ['χαρτί υγείας', 'toilet paper'], ['κουβέρτα', 'blanket'],
    ['μπουρνούζι', 'bathrobe'], ['παντόφλες', 'slippers'], ['ρόμπα', 'robe'],
    ['ντουλάπα', 'wardrobe'], ['κρεβατοκάμαρα', 'bedroom'], ['σαλόνι', 'living room'],
    ['τραπεζαρία', 'dining room'], ['αποθήκη', 'storage room'], ['πλυντήριο ρούχων', 'washing machine'],
    ['σίδερο', 'iron'], ['πρέσα', 'iron (device)'], ['στεγνωτήριο ρούχων', 'clothes dryer'],
    ['σκούπα σκούπα', 'vacuum'], ['καλάθι αχύρων', 'laundry basket'],
    ['καλόγερος', 'coat rack'], ['κρεμάστρα', 'hanger'], ['κουβέρτες', 'blankets'],
    ['παπλώματα', 'duvets'], ['μαξιλάρια', 'pillows'], ['πετσέτες', 'towels'],
    ['πιατέλες', 'dishes'], ['ποτήρια', 'glasses'], ['μπολ', 'bowl'],
    ['κατσαρόλα', 'pot'], ['τηγάνι', 'pan'], ['χύτρα', 'kettle'],
    ['μπρίκι', 'coffee pot'], ['εστία', 'stove'], ['φούρνος μικροκυμάτων', 'microwave'],
  ]
  daily2.forEach(([w, t]) => add(w, t, 'daily-life', 'medium'))

  const health2 = [
    ['γιατρός', 'doctor (m)'], ['γιατρός', 'physician'], ['νοσοκόμα', 'nurse (f)'],
    ['φαρμακείο', 'pharmacy'], ['κλινική', 'clinic'], ['ιατρείο', 'doctor office'],
    ['πυρετόμετρο', 'thermometer'], ['γάζες', 'gauze'], ['επιδέσμος', 'bandage wrap'],
    ['αντιβιοτικό', 'antibiotic'], ['παυσίπονο', 'painkiller'], ['βιταμίνες', 'vitamins'],
    ['αλλεργικό', 'allergic reaction'], ['άσθμα', 'asthma'], ['διάρροια', 'diarrhea'],
    ['ναυτία', 'nausea'], ['ζάλη', 'dizziness'], ['πονοκέφαλος', 'headache'],
    ['πόνος στη μέση', 'back pain'], ['πόνος στο λαιμό', 'sore throat pain'],
    ['γάμπα', 'leg'], ['γόνατο', 'knee'], ['αστράγαλος', 'ankle'],
    ['καρπός', 'wrist'], ['αγκώνας', 'elbow'], ['μάγουλο', 'cheek'],
    ['γενειάδα', 'beard'], ['μουστάκι', 'mustache'], ['νύχι', 'nail'],
  ]
  health2.forEach(([w, t]) => add(w, t, 'health', 'medium'))

  const tech2 = [
    ['tablet', 'tablet'], ['laptop', 'laptop'], ['desktop', 'desktop computer'],
    ['tablet', 'tablet device'], ['smartphone', 'smartphone'], ['charger', 'charger'],
    ['φορτιστής', 'charger'], ['καλώδιο', 'cable'], ['USB', 'USB'],
    ['Bluetooth', 'Bluetooth'], ['cloud', 'cloud storage'], ['backup', 'backup'],
    ['αντίγραφο ασφαλείας', 'backup copy'], ['spam', 'spam'], ['phishing', 'phishing'],
    ['router', 'router'], ['modem', 'modem'], ['server', 'server'],
    ['browser', 'browser'], ['περιηγητής', 'browser'], ['tab', 'browser tab'],
    ['link', 'link'], ['σύνδεσμος', 'link / URL'], ['download', 'download'],
    ['upload', 'upload'], ['stream', 'stream'], ['podcast', 'podcast'],
  ]
  tech2.forEach(([w, t]) => add(w, t, 'technology', 'medium'))

  const hobbies2 = [
    ['σκάκι', 'chess'], ['ντάμα', 'checkers'], ['τάβλι', 'backgammon'],
    ['πόκερ', 'poker'], ['βιντεοπαιχνίδι', 'video game'], ['παζλ', 'puzzle'],
    ['σταυρόλεξο', 'crossword'], ['σκίτσο', 'sketch'], ['ζωγραφιά', 'painting'],
    ['γλυπτική', 'sculpture'], ['κέρι', 'knitting'], ['πλέξιμο', 'knitting craft'],
    ['κέντημα', 'embroidery'], ['μαγειρική', 'cooking hobby'], ['ψήσιμο', 'baking hobby'],
    ['κηπουρική', 'gardening'], ['αναρρίχηση', 'climbing'], ['κάμπινγκ', 'camping'],
    ['ψάρεμα', 'fishing'], ['κυνήγι', 'hunting'], ['ιππασία', 'horse riding'],
    ['σκι', 'skiing'], ['snowboard', 'snowboarding'], ['σέρφ', 'surfing'],
    ['yoga', 'yoga'], ['pilates', 'pilates'], ['χορός', 'dancing'],
    ['θέατρο', 'theater hobby'], ['όπερα', 'opera'], ['συναυλία', 'concert'],
  ]
  hobbies2.forEach(([w, t]) => add(w, t, 'hobbies', 'medium'))

  return items
}

const programmatic = generateProgrammatic(nextId)
const all = [...enrichedCore, ...dedupedExtended, ...programmatic]
console.log(`Vocabulary built: ${all.length} words (${enrichedCore.length} core + ${dedupedExtended.length} extended)`)

writeFileSync(
  join(root, 'src/data/vocabulary/all.json'),
  JSON.stringify(all, null, 0),
  'utf8',
)
