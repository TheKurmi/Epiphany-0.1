import { LEARNING_PATH } from '../path'
import { LEARN_TOPICS } from '../topics'
import { TOPIC_PRIMARY_LESSON, getRecommendedNextLesson } from './index'
import { getLessonById } from '../index'
import { getPackById } from '@/features/read/data/packs'
import { STORIES } from '@/features/read/data/stories'
import { getTopMistakeCategory } from '@/shared/memory/mistakePatterns'
import { inferReadingTier, getReadingTierMeta, getSuggestedReadingTier } from '@/features/read/data/readingTiers'

/** Maps weak pattern tags → review action. */
const PATTERN_ACTIONS = {
  'ending-1sg': {
    topicId: 'present-tense',
    practiceMode: 'typing',
    message: 'You often miss 1st person verb endings (-ω).',
  },
  'ending-2sg': {
    topicId: 'present-tense',
    practiceMode: 'typing',
    message: 'You often miss 2nd person verb endings (-εις).',
  },
  'ending-3sg': {
    topicId: 'present-tense',
    practiceMode: 'typing',
    message: 'You often miss 3rd person singular endings (-ει).',
  },
  'ending-1pl': {
    topicId: 'present-tense',
    practiceMode: 'typing',
    message: 'You often miss “we” verb endings (-ουμε).',
  },
  'ending-3pl': {
    topicId: 'present-tense',
    practiceMode: 'typing',
    message: 'You often miss plural verb endings (-ουν / -άνε).',
  },
  'article-m': {
    topicId: 'articles',
    practiceMode: 'typing',
    message: 'Masculine articles (ο/τον) need more practice.',
  },
  'article-f': {
    topicId: 'articles',
    practiceMode: 'typing',
    message: 'Feminine articles (η/την) need more practice.',
  },
  'article-n': {
    topicId: 'articles',
    practiceMode: 'typing',
    message: 'Neuter articles (το) need more practice.',
  },
  negation: {
    topicId: 'questions-negation',
    practiceMode: 'typing',
    message: 'Negation with δεν is a weak spot.',
  },
  'numbers-basic': {
    topicId: 'numbers',
    practiceMode: 'dictation',
    message: 'Number spelling needs listening practice.',
  },
  'numbers-tens': {
    topicId: 'numbers',
    practiceMode: 'dictation',
    message: 'Tens (είκοσι, τριάντα…) need more drill.',
  },
  'survival-greet': {
    topicId: 'survival-greek',
    practiceMode: 'dictation',
    message: 'Everyday greetings — try dictation.',
  },
}

function resolvePatternAction(patternTag) {
  if (PATTERN_ACTIONS[patternTag]) return PATTERN_ACTIONS[patternTag]

  if (patternTag.startsWith('ending-')) {
    return {
      topicId: 'present-tense',
      practiceMode: 'typing',
      message: 'Verb endings are a recurring weak spot.',
    }
  }
  if (patternTag.startsWith('numbers-')) {
    return {
      topicId: 'numbers',
      practiceMode: 'dictation',
      message: 'Numbers respond well to listen-and-type practice.',
    }
  }
  if (patternTag.includes('plural')) {
    return {
      topicId: 'plurals',
      practiceMode: 'typing',
      message: 'You often miss plural endings.',
    }
  }
  if (patternTag.includes('possessive')) {
    return {
      topicId: 'possessives',
      practiceMode: 'typing',
      message: 'Possessive forms (μου, σου…) need review.',
    }
  }
  if (patternTag.includes('preposition')) {
    return {
      topicId: 'prepositions',
      practiceMode: 'sentence-builder',
      message: 'Preposition word order needs practice.',
    }
  }

  return null
}

/**
 * Build adaptive recommendations from mastery weak spots.
 * @param {{ topicId: string, patternTag: string, count: number }[]} weakSpots
 */
export function getReviewRecommendations(weakSpots) {
  const reviews = []
  const seen = new Set()

  for (const spot of weakSpots) {
    const action = resolvePatternAction(spot.patternTag)
    if (!action || seen.has(action.topicId)) continue
    seen.add(action.topicId)

    const topic = LEARN_TOPICS.find((t) => t.id === action.topicId)
    const lessonId = TOPIC_PRIMARY_LESSON[action.topicId]

    reviews.push({
      type: 'review',
      topicId: action.topicId,
      lessonId,
      practiceMode: action.practiceMode,
      message: action.message,
      label: topic?.label ?? action.topicId,
      count: spot.count,
    })
  }

  return reviews.slice(0, 3)
}

/**
 * Suggest next unread story from unlocked packs.
 * @param {string[]} completedLessonIds
 * @param {string[]} completedStoryIds
 */
export function getRecommendedNextStory(completedLessonIds, completedStoryIds) {
  const suggestedTier = getSuggestedReadingTier(completedLessonIds)

  const candidates = STORIES.filter((story) => {
    if (completedStoryIds.includes(story.id)) return false
    const pack = getPackById(story.packId)
    if (!pack || pack.comingSoon) return false
    if (pack.starter) return true
    return pack.unlockLessons?.every((id) => completedLessonIds.includes(id))
  })

  candidates.sort((a, b) => {
    const tierA = inferReadingTier(getPackById(a.packId))
    const tierB = inferReadingTier(getPackById(b.packId))
    const distA = Math.abs(tierA - suggestedTier)
    const distB = Math.abs(tierB - suggestedTier)
    return distA - distB
  })

  return candidates[0] ?? null
}

/**
 * Full smart guidance bundle for dashboard and Learn screen.
 * @param {string[]} completedLessonIds
 * @param {Record<string, import('@/features/learn/hooks/useMasteryProgress').TopicProgress>} masteryAll
 * @param {{ topicId: string, patternTag: string, count: number }[]} weakSpots
 */
export function getSmartGuidance(completedLessonIds, masteryAll, weakSpots) {
  const nextLessonId = getRecommendedNextLesson(completedLessonIds, LEARNING_PATH)
  const nextLesson = nextLessonId ? getLessonById(nextLessonId) : null
  const reviews = getReviewRecommendations(weakSpots)

  const lowMasteryTopics = LEARN_TOPICS.filter((t) => {
    if (t.comingSoon) return false
    const tp = masteryAll[t.id]
    return tp && tp.masteryPercent > 0 && tp.masteryPercent < 60
  })
    .sort(
      (a, b) =>
        (masteryAll[a.id]?.masteryPercent ?? 0) -
        (masteryAll[b.id]?.masteryPercent ?? 0),
    )
    .slice(0, 2)
    .map((t) => ({
      type: 'topic-review',
      topicId: t.id,
      lessonId: TOPIC_PRIMARY_LESSON[t.id],
      label: t.label,
      message: `${t.label} mastery is at ${masteryAll[t.id]?.masteryPercent ?? 0}% — a quick review would help.`,
      practiceMode: 'weak-spot',
    }))

  const suggestedReview = [...reviews, ...lowMasteryTopics].slice(0, 4)

  const topMistake = getTopMistakeCategory()
  if (topMistake && topMistake.count >= 3) {
    suggestedReview.unshift({
      type: 'mistake-pattern',
      topicId: 'present-tense',
      lessonId: TOPIC_PRIMARY_LESSON['present-tense'],
      label: topMistake.label,
      message: `You often struggle with ${topMistake.label.toLowerCase()} — reinforce this pattern.`,
      practiceMode: 'typing',
    })
  }

  const nextStory = getRecommendedNextStory(completedLessonIds, [])
  const readingRec = nextStory
    ? {
        type: 'reading',
        storyId: nextStory.id,
        packId: nextStory.packId,
        message: `Continue reading: ${nextStory.title} (${getReadingTierMeta(inferReadingTier(getPackById(nextStory.packId))).label}).`,
        label: nextStory.title,
      }
    : null

  return {
    nextLesson,
    suggestedReview,
    readingRec,
  }
}

/** Human label for practice mode buttons. */
export const PRACTICE_MODE_LABELS = {
  typing: 'Typing Practice',
  dictation: 'Dictation',
  'sentence-builder': 'Sentence Construction Lab',
  'weak-spot': 'Weak Spot Practice',
  'quick-challenge': 'Quick Challenge',
}
