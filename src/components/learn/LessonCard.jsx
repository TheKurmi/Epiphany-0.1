export default function LessonCard({
  title,
  summary,
  badge,
  duration,
  disabled = false,
  onClick,
}) {
  return (
    <button
      type="button"
      className={`lesson-card${disabled ? ' lesson-card--disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="lesson-card__top">
        {badge ? <span className="lesson-card__badge">{badge}</span> : null}
        {duration ? <span className="lesson-card__duration">{duration}</span> : null}
      </div>
      <span className="lesson-card__title">{title}</span>
      {summary ? <span className="lesson-card__summary">{summary}</span> : null}
      {disabled ? (
        <span className="lesson-card__status">Coming soon</span>
      ) : (
        <span className="lesson-card__status lesson-card__status--ready">
          Read lesson →
        </span>
      )}
    </button>
  )
}
