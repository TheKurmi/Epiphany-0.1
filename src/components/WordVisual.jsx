import { getVisualForCard } from '../utils/wordVisuals'

/**
 * Emoji illustration for picture mode — instant, consistent, no network.
 */
export default function WordVisual({ card, className = '', size = 'md' }) {
  const { emoji } = getVisualForCard(card)

  return (
    <div
      className={`word-visual word-visual--${size}${className ? ` ${className}` : ''}`}
      role="img"
      aria-label={card.english}
    >
      <span className="word-visual__emoji" aria-hidden="true">
        {emoji}
      </span>
    </div>
  )
}
