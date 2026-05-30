export default function ProgressBar({ title, detail, value, ariaLabel }) {
  return (
    <div className="progress-panel" aria-label={ariaLabel ?? title}>
      <div className="progress-panel__header">
        <span className="progress-panel__title">{title}</span>
        {detail ? (
          <span className="progress-panel__detail">{detail}</span>
        ) : null}
      </div>
      <div className="progress-bar__track">
        <div
          className="progress-bar__fill"
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  )
}
