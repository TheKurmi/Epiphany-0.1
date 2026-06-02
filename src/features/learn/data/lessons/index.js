import articlesGender from './articles-gender'
import presentTenseEndings from './present-tense-endings'
import echoEssential from './echo-essential'
import eimaiEssential from './eimai-essential'
import verbConjugationGroups from './verb-conjugation-groups'
import sentenceStructure from './sentence-structure'
import questionsNegation from './questions-negation'
import numbersCounting from './numbers-counting'
import survivalGreek from './survival-greek'
import possessives from './possessives'
import questionWords from './question-words'
import prepositionsBasic from './prepositions-basic'
import pluralsPatterns from './plurals-patterns'
import datesCalendar from './dates-calendar'
import timeClock from './time-clock'
import modalVerbs from './modal-verbs'
import pastTenseIntro from './past-tense-intro'
import objectPronouns from './object-pronouns'
import adjectiveAgreement from './adjective-agreement'
import frequencyHabit from './frequency-habit'
import compoundSentences from './compound-sentences'
import timeAndAspect from './time-and-aspect'

/** @type {Record<string, import('../index').Lesson>} */
export const LESSONS = {
  [articlesGender.id]: articlesGender,
  [presentTenseEndings.id]: presentTenseEndings,
  [echoEssential.id]: echoEssential,
  [eimaiEssential.id]: eimaiEssential,
  [verbConjugationGroups.id]: verbConjugationGroups,
  [sentenceStructure.id]: sentenceStructure,
  [questionsNegation.id]: questionsNegation,
  [numbersCounting.id]: numbersCounting,
  [survivalGreek.id]: survivalGreek,
  [possessives.id]: possessives,
  [questionWords.id]: questionWords,
  [prepositionsBasic.id]: prepositionsBasic,
  [pluralsPatterns.id]: pluralsPatterns,
  [datesCalendar.id]: datesCalendar,
  [timeClock.id]: timeClock,
  [modalVerbs.id]: modalVerbs,
  [pastTenseIntro.id]: pastTenseIntro,
  [objectPronouns.id]: objectPronouns,
  [adjectiveAgreement.id]: adjectiveAgreement,
  [frequencyHabit.id]: frequencyHabit,
  [compoundSentences.id]: compoundSentences,
  [timeAndAspect.id]: timeAndAspect,
}

export const ALL_LESSONS = Object.values(LESSONS).sort(
  (a, b) => a.pathOrder - b.pathOrder,
)
