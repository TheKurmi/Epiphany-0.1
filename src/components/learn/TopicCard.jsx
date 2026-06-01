export default function TopicCard({ label, description, comingSoon, onClick }) {
  return (
    <button
      type="button"
      className={`topic-card${comingSoon ? ' topic-card--disabled' : ''}`}
      onClick={onClick}
      disabled={comingSoon}
    >
      <span className="topic-card__label">{label}</span>
      <span className="topic-card__desc">{description}</span>
      {comingSoon ? (
        <span className="topic-card__status">Coming soon</span>
      ) : (
        <span className="topic-card__status topic-card__status--ready">
          Open →
        </span>
      )}
    </button>
  )
}
