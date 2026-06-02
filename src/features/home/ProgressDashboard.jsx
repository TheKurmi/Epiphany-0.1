import { useProgressDashboard } from '@/shared/hooks/useLearningProgress'
import { LEARN_TOPICS } from '@/features/learn/data/topics'
import { getReviewSummary } from '@/shared/hooks/useSpacedRepetition'
import SmartRecommendations from '@/shared/components/SmartRecommendations'

function formatPatternTag(tag) {
  const labels = {
    'ending-1sg': '1st person (-ω)',
    'ending-2sg': '2nd person (-εις)',
    'ending-3sg': '3rd person (-ει)',
    'ending-1pl': 'we endings (-ουμε)',
    'ending-3pl': 'they endings (-ουν)',
    'article-m': 'masculine articles',
    'article-f': 'feminine articles',
    'article-n': 'neuter articles',
    negation: 'negation (δεν)',
  }
  return labels[tag] ?? tag.replace(/-/g, ' ')
}

export default function ProgressDashboard({ compact = false, onOpenLesson, onOpenTopic }) {
  const {
    streak,
    completedLessons,
    totalLessons,
    pathProgress,
    avgMastery,
    completedStories,
    strongest,
    weakest,
    weakSpots,
    recommendedLesson,
    masteryAll,
    completedLessonIds,
  } = useProgressDashboard()

  const reviewSummary = getReviewSummary()

  const hasActivity =
    completedLessons > 0 || avgMastery > 0 || completedStories > 0

  if (!hasActivity && compact) return null

  return (
    <section
      className={`progress-dashboard${compact ? ' progress-dashboard--compact' : ''}`}
      aria-labelledby="progress-heading"
    >
      <h2 id="progress-heading" className="progress-dashboard__title">
        Your progress
      </h2>

      <div className="progress-dashboard__stats">
        {streak > 0 ? (
          <div className="progress-stat">
            <span className="progress-stat__value">{streak}</span>
            <span className="progress-stat__label">day streak</span>
          </div>
        ) : null}
        <div className="progress-stat">
          <span className="progress-stat__value">{pathProgress}%</span>
          <span className="progress-stat__label">learning path</span>
        </div>
        <div className="progress-stat">
          <span className="progress-stat__value">{avgMastery}%</span>
          <span className="progress-stat__label">avg mastery</span>
        </div>
        {completedStories > 0 ? (
          <div className="progress-stat">
            <span className="progress-stat__value">{completedStories}</span>
            <span className="progress-stat__label">stories read</span>
          </div>
        ) : null}
        {reviewSummary.due > 0 ? (
          <div className="progress-stat">
            <span className="progress-stat__value">{reviewSummary.due}</span>
            <span className="progress-stat__label">due for review</span>
          </div>
        ) : null}
      </div>

      <p className="progress-dashboard__path">
        {completedLessons} of {totalLessons} core lessons completed
      </p>

      {recommendedLesson ? (
        <p className="progress-dashboard__recommended">
          Recommended next: <strong>{recommendedLesson.title}</strong>
        </p>
      ) : null}

      {!compact && (onOpenLesson || onOpenTopic) ? (
        <SmartRecommendations
          completedLessons={completedLessonIds}
          masteryAll={masteryAll}
          weakSpots={weakSpots}
          onOpenLesson={onOpenLesson}
          onOpenTopic={onOpenTopic}
          compact
        />
      ) : null}

      {strongest.length || weakest.length ? (
        <div className="progress-dashboard__topics">
          {strongest.length ? (
            <div className="progress-topics">
              <h3 className="progress-topics__title">Strongest</h3>
              <ul className="progress-topics__list">
                {strongest.map((t) => (
                  <li key={t.id}>
                    <span>{t.label}</span>
                    <span className="progress-topics__pct">{t.masteryPercent}%</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {weakest.length ? (
            <div className="progress-topics">
              <h3 className="progress-topics__title">Keep practicing</h3>
              <ul className="progress-topics__list">
                {weakest.map((t) => (
                  <li key={t.id}>
                    <span>{t.label}</span>
                    <span className="progress-topics__pct">{t.masteryPercent}%</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}

      {weakSpots.length ? (
        <div className="progress-dashboard__weak">
          <h3 className="progress-dashboard__weak-title">Weak patterns</h3>
          <ul className="progress-dashboard__weak-list">
            {weakSpots.map(({ patternTag, count, topicId }) => {
              const topic = LEARN_TOPICS.find((t) => t.id === topicId)
              return (
                <li key={`${topicId}-${patternTag}`}>
                  <span className="progress-dashboard__weak-tag">
                    {formatPatternTag(patternTag)}
                  </span>
                  {topic ? (
                    <span className="progress-dashboard__weak-topic">{topic.label}</span>
                  ) : null}
                  <span className="progress-dashboard__weak-count">×{count}</span>
                </li>
              )
            })}
          </ul>
          <p className="progress-dashboard__weak-hint">
            Try Weak Spot practice to target these patterns.
          </p>
        </div>
      ) : null}

      {!hasActivity ? (
        <p className="progress-dashboard__empty">
          Start a lesson or practice session — your progress will appear here.
        </p>
      ) : null}
    </section>
  )
}
