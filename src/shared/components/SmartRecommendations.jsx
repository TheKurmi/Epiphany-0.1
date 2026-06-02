import { getSmartGuidance, PRACTICE_MODE_LABELS } from '@/features/learn/data/curriculum/recommendations'

/**
 * Adaptive guidance panel — next lesson + suggested review from weak patterns.
 */
export default function SmartRecommendations({
  completedLessons,
  masteryAll,
  weakSpots,
  onOpenLesson,
  onOpenTopic,
  compact = false,
}) {
  const { nextLesson, suggestedReview } = getSmartGuidance(
    completedLessons,
    masteryAll,
    weakSpots,
  )

  if (!nextLesson && !suggestedReview.length) return null

  return (
    <div className={`smart-recs${compact ? ' smart-recs--compact' : ''}`}>
      {suggestedReview.length ? (
        <section className="smart-recs__section" aria-labelledby="review-rec-heading">
          <h3 id="review-rec-heading" className="smart-recs__title">
            Suggested review
          </h3>
          <ul className="smart-recs__list">
            {suggestedReview.map((item) => (
              <li key={`${item.topicId}-${item.type}`} className="smart-recs__item">
                <p className="smart-recs__message">{item.message}</p>
                <div className="smart-recs__actions">
                  {item.lessonId && onOpenLesson ? (
                    <button
                      type="button"
                      className="smart-recs__btn"
                      onClick={() => onOpenLesson(item.lessonId)}
                    >
                      Review {item.label}
                    </button>
                  ) : null}
                  {onOpenTopic ? (
                    <button
                      type="button"
                      className="smart-recs__btn smart-recs__btn--muted"
                      onClick={() => onOpenTopic(item.topicId)}
                    >
                      Topic →
                    </button>
                  ) : null}
                  {item.practiceMode ? (
                    <span className="smart-recs__practice-hint">
                      Try {PRACTICE_MODE_LABELS[item.practiceMode] ?? item.practiceMode}
                    </span>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  )
}
