export default function SessionComplete({
  stats,
  total,
  scorePercent,
  avgMs,
  onRetry,
  onNewSession,
  onReturnToStudy,
  unitLabel = 'cards',
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

        <div className="session-complete__stats session-complete__stats--primary">
          <div className="session-stat">
            <span className="session-stat__value session-stat__value--good">
              {stats.correct}
            </span>
            <span className="session-stat__label">✅ Correct</span>
          </div>
          <div className="session-stat">
            <span className="session-stat__value session-stat__value--near-miss">
              {stats.nearMiss}
            </span>
            <span className="session-stat__label">⚠️ Near misses</span>
          </div>
          <div className="session-stat">
            <span className="session-stat__value session-stat__value--bad">
              {stats.incorrect}
            </span>
            <span className="session-stat__label">❌ Wrong</span>
          </div>
        </div>

        {stats.skipped > 0 ? (
          <div className="session-complete__stats session-complete__stats--secondary">
            <div className="session-stat">
              <span className="session-stat__value session-stat__value--skipped">
                {stats.skipped}
              </span>
              <span className="session-stat__label">Skipped</span>
            </div>
          </div>
        ) : null}

        <p className="session-complete__meta">
          Best streak this round: <strong>{stats.bestStreak}</strong>
          {avgMs ? (
            <>
              <span className="session-complete__divider">·</span>
              Avg. {(avgMs / 1000).toFixed(1)}s per answer
            </>
          ) : null}
          <span className="session-complete__divider">·</span>
          {total} {unitLabel}
        </p>

        <div className="session-complete__actions">
          <button type="button" className="btn btn--primary" onClick={onRetry}>
            Retry session
          </button>
          <button type="button" className="btn btn--secondary" onClick={onNewSession}>
            New session
          </button>
          <button type="button" className="btn btn--ghost" onClick={onReturnToStudy}>
            Back to practice modes
          </button>
        </div>
      </div>
    </section>
  )
}
