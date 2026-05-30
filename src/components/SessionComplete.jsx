export default function SessionComplete({
  stats,
  total,
  scorePercent,
  onRetry,
  onNewSession,
  onReturnToStudy,
}) {
  return (
    <section className="session-complete" aria-label="Challenge results">
      <div className="session-complete__card">
        <span className="session-complete__badge">Round complete</span>
        <h2 className="session-complete__title">Your results</h2>

        <div
          className="session-score-ring"
          style={{ '--score': scorePercent }}
          aria-label={`Score ${scorePercent}%`}
        >
          <span className="session-score-ring__value">{scorePercent}%</span>
          <span className="session-score-ring__label">Score</span>
        </div>

        <div className="session-complete__stats session-complete__stats--four">
          <div className="session-stat">
            <span className="session-stat__value session-stat__value--good">
              {stats.correct}
            </span>
            <span className="session-stat__label">Correct</span>
          </div>
          <div className="session-stat">
            <span className="session-stat__value session-stat__value--bad">
              {stats.incorrect}
            </span>
            <span className="session-stat__label">Wrong</span>
          </div>
          <div className="session-stat">
            <span className="session-stat__value session-stat__value--skipped">
              {stats.skipped}
            </span>
            <span className="session-stat__label">Skipped</span>
          </div>
          <div className="session-stat">
            <span className="session-stat__value">{stats.streak}</span>
            <span className="session-stat__label">Final streak</span>
          </div>
        </div>

        <p className="session-complete__meta">
          Best streak this round: <strong>{stats.bestStreak}</strong>
          <span className="session-complete__divider">·</span>
          {total} cards
        </p>

        <div className="session-complete__actions">
          <button type="button" className="btn btn--primary" onClick={onRetry}>
            Retry session
          </button>
          <button type="button" className="btn btn--secondary" onClick={onNewSession}>
            New session
          </button>
          <button type="button" className="btn btn--ghost" onClick={onReturnToStudy}>
            Return to study mode
          </button>
        </div>
      </div>
    </section>
  )
}
