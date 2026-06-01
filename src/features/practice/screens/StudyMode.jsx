import { useEffect, useState } from 'react'
import { getCardSides } from '@/utils/cardSides'
import FlashCard from './FlashCard'

export default function StudyMode({
  card,
  studyDirection,
  learningStyle,
  showPronunciation,
  onNext,
  onReviewed,
}) {
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    setFlipped(false)
  }, [card?.id])

  if (!card) {
    return (
      <p className="empty-state">
        Nothing to study with these settings. Try a different topic or level.
      </p>
    )
  }

  const sides = getCardSides(card, studyDirection)
  const showImage = learningStyle === 'picture'

  function handleFlip() {
    if (!flipped) {
      setFlipped(true)
      onReviewed?.()
    }
  }

  function handleNext() {
    setFlipped(false)
    onNext()
  }

  return (
    <section className="mode-panel" aria-label="Study mode">
      <FlashCard
        key={card.id}
        card={card}
        {...sides}
        studyDirection={studyDirection}
        showPronunciation={showPronunciation}
        showImage={showImage}
        flipped={flipped}
        onFlip={handleFlip}
      />

      <div className="mode-actions">
        <button type="button" className="btn btn--primary" onClick={handleNext}>
          Next word
        </button>
      </div>
    </section>
  )
}
