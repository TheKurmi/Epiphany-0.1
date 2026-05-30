import { speakGreek } from '../utils/speech'
import { isGreek } from '../utils/pronunciation'
import GreekWord from './GreekWord'
import WordVisual from './WordVisual'

export default function FlashCard({
  card,
  prompt,
  answer,
  promptLabel,
  answerLabel,
  studyDirection,
  showImage,
  showPronunciation,
  flipped,
  onFlip,
}) {
  const showAudio = studyDirection !== 'en-gr' || flipped
  const promptIsGreek = isGreek(prompt)
  const answerIsGreek = isGreek(answer)
  const pictureLayout = showImage

  function renderText(text, isGreekText, size, extraClass = '') {
    if (isGreekText) {
      return (
        <GreekWord
          text={text}
          showGuide={showPronunciation}
          size={size}
          className={extraClass}
        />
      )
    }
    return (
      <p className={`card-word card-word--prompt${extraClass ? ` ${extraClass}` : ''}`}>
        {text}
      </p>
    )
  }

  function renderAnswer() {
    if (answerIsGreek) {
      return (
        <GreekWord
          text={answer}
          showGuide={showPronunciation}
          size="md"
          className="card-word--answer"
        />
      )
    }
    return <p className="card-word card-word--answer">{answer}</p>
  }

  return (
    <div
      className={`flip-scene${flipped ? ' flip-scene--flipped' : ''}${
        pictureLayout ? ' flip-scene--picture' : ''
      }`}
    >
      <div
        className="flip-card"
        role="button"
        tabIndex={0}
        onClick={onFlip}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onFlip()
          }
        }}
        aria-label={
          flipped ? `${answerLabel}: ${answer}` : 'Flip to reveal answer'
        }
      >
        <div className="flip-card-inner">
          <div className="flip-card-face flip-card-front">
            <span className="card-badge">{promptLabel}</span>
            {pictureLayout ? <WordVisual card={card} size="lg" /> : null}
            <div className={pictureLayout ? 'flip-card__text' : undefined}>
              {renderText(prompt, promptIsGreek, 'lg')}
            </div>
            <p className="card-hint">Tap to reveal</p>
          </div>

          <div className="flip-card-face flip-card-back">
            <span className="card-badge">{answerLabel}</span>
            {pictureLayout ? <WordVisual card={card} size="lg" /> : null}
            <div className={pictureLayout ? 'flip-card__text' : undefined}>
              {!pictureLayout
                ? renderText(prompt, promptIsGreek, 'sm', 'card-word--small')
                : null}
              {renderAnswer()}
              <span className="card-category">{card.category}</span>
            </div>
          </div>
        </div>
      </div>

      {showAudio ? (
        <button
          type="button"
          className="btn btn--ghost speak-btn"
          onClick={() => speakGreek(card.greek)}
        >
          Listen in Greek
        </button>
      ) : null}
    </div>
  )
}
