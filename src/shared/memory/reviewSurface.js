import { getDueReviews, getRecentWeakItems } from '@/shared/hooks/useSpacedRepetition'
import { getTopMistakeCategory } from '@/shared/memory/mistakePatterns'
import { getReviewRecommendations } from '@/features/learn/data/curriculum/recommendations'
import { LEARN_TOPICS } from '@/features/learn/data/topics'
import { TOPIC_PRIMARY_LESSON } from '@/features/learn/data/curriculum'

/**
 * Build human "Review Today" resurfacing items from memory + mastery signals.
 */
export function buildReviewTodayItems({
  weakSpots = [],
  masteryAll = {},
  completedLessons = [],
  limit = 5,
}) {
  const items = []
  const seen = new Set()

  function push(item) {
    const key = `${item.type}-${item.topicId ?? item.id}`
    if (seen.has(key)) return
    seen.add(key)
    items.push(item)
  }

  const due = getDueReviews(4)
  for (const d of due) {
    push({
      type: 'due',
      id: d.id,
      kind: d.type,
      message:
        d.type === 'pattern'
          ? 'Due for review — reinforce this grammar pattern.'
          : 'Recently forgotten — revisit this word.',
      action: 'practice',
      topicId: d.type === 'pattern' ? d.id.split(':')[1] : null,
    })
  }

  const weakItems = getRecentWeakItems(3)
  if (weakItems.length) {
    push({
      type: 'forgotten',
      message: `${weakItems.length} item${weakItems.length > 1 ? 's' : ''} need a quick refresh today.`,
      action: 'weak-spot',
      practiceMode: 'weak-spot',
    })
  }

  for (const rec of getReviewRecommendations(weakSpots)) {
    push({
      type: 'weak-pattern',
      topicId: rec.topicId,
      lessonId: rec.lessonId,
      message: rec.message,
      practiceMode: rec.practiceMode,
      label: rec.label,
    })
  }

  const topMistake = getTopMistakeCategory()
  if (topMistake && topMistake.count >= 2) {
    push({
      type: 'mistake-pattern',
      message: `You often struggle with ${topMistake.label.toLowerCase()} — a focused review would help.`,
      practiceMode: 'typing',
      topicId: 'present-tense',
    })
  }

  if (completedLessons.includes('time-and-aspect')) {
    const timeTopic = masteryAll['time-aspect']
    if (!timeTopic || timeTopic.masteryPercent < 70) {
      push({
        type: 'tense-reinforce',
        topicId: 'time-aspect',
        lessonId: 'time-and-aspect',
        message: 'Reinforce Greek time & action — revisit the concept matrix.',
        practiceMode: 'typing',
        label: 'Time & Action',
      })
    }
  }

  const lowTopics = LEARN_TOPICS.filter((t) => {
    if (t.comingSoon) return false
    const tp = masteryAll[t.id]
    return tp && tp.masteryPercent > 0 && tp.masteryPercent < 55
  }).slice(0, 1)

  for (const t of lowTopics) {
    push({
      type: 'mastery-low',
      topicId: t.id,
      lessonId: TOPIC_PRIMARY_LESSON[t.id],
      message: `Recommended review: ${t.label} could use reinforcement.`,
      label: t.label,
    })
  }

  return items.slice(0, limit)
}

/** Understanding-focused encouragement — not XP spam. */
export function getConfidenceMessages(masteryAll, completedLessons) {
  const messages = []

  if (completedLessons.includes('present-tense-endings')) {
    messages.push('You are beginning to recognise present-tense endings naturally.')
  }
  if (completedLessons.includes('plurals-patterns')) {
    messages.push('Plural patterns are becoming part of how you read Greek.')
  }
  if (completedLessons.includes('time-and-aspect')) {
    messages.push('You now understand how Greek combines when + how actions unfold.')
  }

  const articles = masteryAll.articles
  if (articles?.masteryPercent >= 70) {
    messages.push('You spot article gender more confidently when reading.')
  }

  const timeAspect = masteryAll['time-aspect']
  if (timeAspect?.masteryPercent >= 60) {
    messages.push('Past ongoing vs one-time actions are starting to feel logical.')
  }

  return messages.slice(-2)
}
