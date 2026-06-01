export default function LessonCard({
  title,
  summary,
  badge,
  duration,
  disabled = false,
  locked = false,
  completed = false,
  lockHint,
  onClick,
}) {
  return (
    <button
      type="button"
      className={`lesson-card${disabled ? ' lesson-card--disabled' : ''}${locked ? ' lesson-card--locked' : ''}${completed ? ' lesson-card--completed' : ''}`}
      onClick={onClick}
      disabled={disabled || locked}
    >
      <div className="lesson-card__top">
        {badge ? <span className="lesson-card__badge">{badge}</span> : null}
        {duration ? <span className="lesson-card__duration">{duration}</span> : null}
        {completed ? (
          <span className="lesson-card__check" aria-label="Completed">
            ✓
          </span>
        ) : null}
      </div>
      <span className="lesson-card__title">{title}</span>
      {summary ? <span className="lesson-card__summary">{summary}</span> : null}
      {disabled ? (
        <span className="lesson-card__status">Coming soon</span>
      ) : locked ? (
        <span className="lesson-card__status lesson-card__status--locked">
          🔒 {lockHint ?? 'Complete earlier lessons first'}
        </span>
      ) : (
        <span className="lesson-card__status lesson-card__status--ready">
          {completed ? 'Review lesson →' : 'Read lesson →'}
        </span>
      )}
    </button>
  )
}
