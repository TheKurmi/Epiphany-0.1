import { makeQuestion, pick, uniqueOptions } from './utils'

const ALL_ARTICLES = ['ο', 'η', 'το']

export function generateArticlesL1(profile) {
  const noun = pick(profile.nouns)
  const pool = ALL_ARTICLES.filter((a) => a !== noun.article)

  return makeQuestion({
    type: 'multipleChoice',
    prompt: `Which article goes with **${noun.noun}** (${noun.gender})?`,
    promptPlain: `Which article goes with ${noun.noun} (${noun.gender})?`,
    options: uniqueOptions(noun.article, pool),
    correctAnswer: noun.article,
    patternTag: `article-${noun.gender}`,
  })
}

export function generateArticlesL2(profile) {
  const noun = pick(profile.nouns)

  return makeQuestion({
    type: 'fillBlank',
    prompt: `Type the full phrase: “the ${noun.noun}”`,
    correctAnswer: noun.phrase,
    patternTag: `article-${noun.gender}`,
    hint: `${noun.gender} → ${noun.article}`,
  })
}

export function generateArticlesL3(profile) {
  const noun = pick(profile.nouns)

  return makeQuestion({
    type: 'sentenceBlank',
    prompt: `___ ${noun.noun} (the ${noun.noun})`,
    correctAnswer: noun.article,
    patternTag: `article-${noun.gender}`,
  })
}

export function generateArticlesQuestion(profile, masteryLevel) {
  if (masteryLevel === 1) return generateArticlesL1(profile)
  if (masteryLevel === 2) return generateArticlesL2(profile)
  if (masteryLevel === 3) return generateArticlesL3(profile)

  const sub = pick([1, 2, 3])
  if (sub === 1) return generateArticlesL1(profile)
  if (sub === 2) return generateArticlesL2(profile)
  return generateArticlesL3(profile)
}
