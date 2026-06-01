import articlesGender from './articles-gender'
import presentTenseEndings from './present-tense-endings'
import echoEssential from './echo-essential'
import eimaiEssential from './eimai-essential'
import verbConjugationGroups from './verb-conjugation-groups'
import sentenceStructure from './sentence-structure'
import questionsNegation from './questions-negation'

/** @type {Record<string, import('../index').Lesson>} */
export const LESSONS = {
  [articlesGender.id]: articlesGender,
  [presentTenseEndings.id]: presentTenseEndings,
  [echoEssential.id]: echoEssential,
  [eimaiEssential.id]: eimaiEssential,
  [verbConjugationGroups.id]: verbConjugationGroups,
  [sentenceStructure.id]: sentenceStructure,
  [questionsNegation.id]: questionsNegation,
}

export const ALL_LESSONS = Object.values(LESSONS).sort(
  (a, b) => a.pathOrder - b.pathOrder,
)
