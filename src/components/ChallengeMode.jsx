import { useCallback, useEffect, useRef, useState } from 'react'
import { getCardSides } from '../utils/cardSides'
import { evaluateAnswer } from '../utils/answers'
import { isGreek } from '../utils/pronunciation'
import { speakGreek } from '../utils/speech'
import GreekWord from './GreekWord'
import WordVisual from './WordVisual'

export default function ChallengeMode({
  card,
  studyDirection,
  learningStyle,
  showPronunciation,
  onNext,
  onAnswer,
  isLastCard,
}) {
  const [input, setInput] = useState('')
  const [phase, setPhase] = useState('input')
  const [transitioning, setTransitioning] = useState(false)
  const inputRef = useRef(null)

  const resetCard = useCallback(() => {
    setInput('')
    setPhase('input')
    setTransitioning(false)
  }, [])

  useEffect(() => {
    resetCard()
    const t = requestAnimationFrame(() => {
      inputRef.current?.focus()
    })
    return () => cancelAnimationFrame(t)
  }, [card?.id, resetCard])

  if (!card) {
    return (
      <p className="empty-state">
        Nothing to practice with these settings. Try a different topic or
        level.
      </p>
    )
  }

  const sides = getCardSides(card, studyDirection)
  const showPicture = learningStyle === 'picture'
  const hidePromptText = showPicture && studyDirection === 'en-gr'
  const revealed = phase !== 'input'
  const showGreekAudio = studyDirection === 'en-gr' ? revealed : true
  const promptIsGreek = isGreek(sides.prompt)
  const answerIsGreek = isGreek(sides.answer)

  function renderAnswerLine() {
    if (answerIsGreek) {
      return (
        <GreekWord
          text={sides.answer}
          showGuide={showPronunciation}
          size="md"
        />
      )
    }
    return <span>{sides.answer}</span>
  }

  function submitAnswer() {
    if (phase !== 'input') return
    const trimmed = input.trim()
    if (!trimmed) {
      inputRef.current?.focus()
      return
    }

    const result = evaluateAnswer(trimmed, sides.answer)
    const phaseResult =
      result === 'wrong'
        ? 'incorrect'
        : result === 'nearMiss'
          ? 'near-miss'
          : result
    setPhase(phaseResult)
    onAnswer(result === 'wrong' ? 'incorrect' : result)
  }

  function revealAnswer() {
    if (phase !== 'input') return
    setPhase('skipped')
    onAnswer('skipped')
  }

  function goNext() {
    if (!revealed) return
    setTransitioning(true)
    window.setTimeout(() => {
      onNext()
    }, 220)
  }

  function handleFormSubmit(e) {
    e.preventDefault()
    if (phase === 'input') submitAnswer()
    else goNext()
  }

  function handleInputKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (phase === 'input') submitAnswer()
      else goNext()
    }
  }

  return (
    <section className="mode-panel" aria-label="Challenge mode">
      <div
        key={card.id}
        className={`challenge-card challenge-card--${phase}${
          transitioning ? ' challenge-card--exit' : ''
        }`}
      >
        <span className="card-badge">Guess the {sides.answerLabel}</span>

        {showPicture ? (
          <div className="challenge-card__figure">
            <WordVisual card={card} size="lg" />
            <p className="challenge-card__meaning">{card.english}</p>
          </div>
        ) : null}

        {!hidePromptText ? (
          promptIsGreek ? (
            <GreekWord
              text={sides.prompt}
              showGuide={showPronunciation}
              size="lg"
            />
          ) : (
            <p className="card-word card-word--prompt">{sides.prompt}</p>
          )
        ) : (
          <p className="challenge-picture-prompt">
            What is this word in Greek?
          </p>
        )}

        {phase === 'input' ? (
          <p className="challenge-hint">
            Type the {sides.answerLabel.toLowerCase()} translation, then press
            Enter or Check
          </p>
        ) : null}

        {phase === 'input' ? (
          <form className="challenge-form" onSubmit={handleFormSubmit} noValidate>
            <input
              ref={inputRef}
              type="text"
              className="challenge-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder={`Type ${sides.answerLabel}…`}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              aria-label="Your answer"
            />

            <button type="submit" className="btn btn--primary">
              Check answer
            </button>

            <button
              type="button"
              className="btn btn--secondary"
              onClick={revealAnswer}
            >
              Tell me the answer
            </button>
          </form>
        ) : (
          <div className="challenge-revealed-actions">
            <button
              type="button"
              className="btn btn--primary"
              onClick={goNext}
            >
              {isLastCard ? 'Finish round' : 'Continue →'}
            </button>
          </div>
        )}

        {phase === 'correct' ? (
          <div className="feedback-banner feedback-banner--correct" role="status">
            <span className="feedback-banner__icon" aria-hidden="true">
              ✓
            </span>
            <div>
              <strong>Correct!</strong>
              <div className="feedback-banner__answer">{renderAnswerLine()}</div>
            </div>
          </div>
        ) : null}

        {phase === 'near-miss' ? (
          <div className="feedback-banner feedback-banner--near-miss" role="status">
            <span className="feedback-banner__icon" aria-hidden="true">
              ⚠
            </span>
            <div>
              <strong>Almost!</strong>
              <p className="feedback-banner__label">
                Very close — check the spelling:
              </p>
              <div className="feedback-banner__answer">{renderAnswerLine()}</div>
              <p className="feedback-banner__note">Counted as a near miss</p>
            </div>
          </div>
        ) : null}

        {phase === 'incorrect' ? (
          <div className="feedback-banner feedback-banner--wrong" role="status">
            <span className="feedback-banner__icon" aria-hidden="true">
              ✗
            </span>
            <div>
              <strong>Not quite</strong>
              <p className="feedback-banner__label">Correct answer:</p>
              <div className="feedback-banner__answer">{renderAnswerLine()}</div>
            </div>
          </div>
        ) : null}

        {phase === 'skipped' ? (
          <div className="feedback-banner feedback-banner--skipped" role="status">
            <span className="feedback-banner__icon" aria-hidden="true">
              ↷
            </span>
            <div>
              <strong>Answer revealed</strong>
              <p className="feedback-banner__label">Correct answer:</p>
              <div className="feedback-banner__answer">{renderAnswerLine()}</div>
              <p className="feedback-banner__note">Marked as skipped</p>
            </div>
          </div>
        ) : null}

        {showGreekAudio ? (
          <button
            type="button"
            className="btn btn--ghost speak-btn"
            onClick={() => speakGreek(card.greek)}
          >
            Listen in Greek
          </button>
        ) : null}
      </div>
    </section>
  )
}
