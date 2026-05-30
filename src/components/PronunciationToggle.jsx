export default function PronunciationToggle({ enabled, onChange }) {
  return (
    <button
      type="button"
      className={`pronunciation-toggle${enabled ? ' pronunciation-toggle--on' : ''}`}
      onClick={() => onChange(!enabled)}
      aria-pressed={enabled}
      aria-label={
        enabled
          ? 'Hide pronunciation guides'
          : 'Show pronunciation guides'
      }
      title={
        enabled
          ? 'Pronunciation guides on'
          : 'Pronunciation guides off'
      }
    >
      <span className="pronunciation-toggle__icon" aria-hidden="true">
        Αa
      </span>
      <span className="pronunciation-toggle__label">
        {enabled ? 'Guide on' : 'Guide'}
      </span>
    </button>
  )
}
