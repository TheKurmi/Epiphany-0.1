import { buildReviewTodayItems } from '@/shared/memory/reviewSurface'

export default function ReviewTodayPanel({
  weakSpots,
  masteryAll,
  completedLessons,
  onOpenLesson,
  onPractice,
  onLearn,
  limit = 4,
}) {
  const items = buildReviewTodayItems({
    weakSpots,
    masteryAll,
    completedLessons,
    limit,
  })

  if (!items.length) return null

  return (
    <section className="review-today" aria-labelledby="review-today-heading">
      <h3 id="review-today-heading" className="review-today__title">
        Review today
      </h3>
      <ul className="review-today__list">
        {items.map((item, i) => (
          <li key={`${item.type}-${item.topicId ?? item.id ?? i}`} className="review-today__item">
            <p className="review-today__message">{item.message}</p>
            <div className="review-today__actions">
              {item.lessonId && onOpenLesson ? (
                <button
                  type="button"
                  className="review-today__btn"
                  onClick={() => onOpenLesson(item.lessonId)}
                >
                  {item.label ? `Open ${item.label}` : 'Review lesson'}
                </button>
              ) : null}
              {(item.action === 'practice' || item.action === 'weak-spot' || item.practiceMode) &&
              onPractice ? (
                <button type="button" className="review-today__btn review-today__btn--muted" onClick={onPractice}>
                  Practice →
                </button>
              ) : null}
              {!item.lessonId && !item.practiceMode && onLearn ? (
                <button type="button" className="review-today__btn review-today__btn--muted" onClick={onLearn}>
                  Learn →
                </button>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
