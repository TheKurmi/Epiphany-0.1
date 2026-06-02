import { useMemo, useState } from 'react'
import { getStoryById } from '@/features/read/data'
import { getPackById } from '@/features/read/data/packs'
import { useLearningProgress } from '@/shared/hooks/useLearningProgress'
import { useReadListen } from '@/shared/hooks/useReadListen'
import VocabPopover from '@/shared/components/VocabPopover'
import ReadingSentence from './ReadingSentence'
import ComprehensionQuiz from './ComprehensionQuiz'
import ShadowingBar from './ShadowingBar'
import { inferReadingTier, getReadingTierMeta } from '@/features/read/data/readingTiers'

export default function StoryReader({ storyId, onBack }) {
  const story = getStoryById(storyId)
  const pack = story ? getPackById(story.packId) : null
  const isListenPack = pack?.category === 'read-listen'

  const { markStory } = useLearningProgress()

  const [showTranslation, setShowTranslation] = useState(false)
  const [showHighlights, setShowHighlights] = useState(true)
  const [showVocab, setShowVocab] = useState(true)
  const [showGrammarHints, setShowGrammarHints] = useState(true)
  const [shadowingMode, setShadowingMode] = useState(false)
  const [focusMode, setFocusMode] = useState(false)
  const [progressiveReveal, setProgressiveReveal] = useState(false)
  const [revealedCount, setRevealedCount] = useState(
    progressiveReveal ? 1 : Infinity,
  )
  const [listenMode, setListenMode] = useState(isListenPack)
  const [activeVocab, setActiveVocab] = useState(null)
  const [phase, setPhase] = useState('reading')

  const sentenceTexts = useMemo(
    () => story?.sentences.map((s) => s.text) ?? [],
    [story],
  )

  const listen = useReadListen(sentenceTexts, {
    defaultAutoplay: isListenPack,
  })

  if (!story) {
    return (
      <div className="story-reader">
        <button type="button" className="btn btn--back" onClick={onBack}>
          ← Stories
        </button>
        <p className="empty-state">Story not found.</p>
      </div>
    )
  }

  function handleToggleProgressive() {
    setProgressiveReveal((v) => {
      const next = !v
      setRevealedCount(next ? 1 : Infinity)
      return next
    })
  }

  function revealNext() {
    setRevealedCount((c) => Math.min(c + 1, story.sentences.length))
  }

  function handleComprehensionComplete() {
    markStory(story.id)
  }

  const effectiveRevealed =
    progressiveReveal && revealedCount !== Infinity
      ? revealedCount
      : story.sentences.length

  const readingTier = pack ? inferReadingTier(pack) : 1
  const tierMeta = getReadingTierMeta(readingTier)

  return (
    <article
      className={`story-reader${focusMode ? ' story-reader--focus' : ''}${listenMode ? ' story-reader--listen' : ''}`}
    >
      <header className="story-reader__header">
        <button type="button" className="btn btn--back" onClick={onBack}>
          ← Stories
        </button>
        <span className={`story-reader__level story-reader__level--${story.level}`}>
          {story.level}
        </span>
        <span className="story-reader__tier-badge" title={tierMeta.description}>
          {tierMeta.label}
        </span>
        {isListenPack ? (
          <span className="story-reader__mode-badge">Read & Listen</span>
        ) : null}
        <h1 className="story-reader__title">{story.title}</h1>
        <p className="story-reader__subtitle">{story.titleEnglish}</p>
      </header>

      {phase === 'reading' ? (
        <>
          <div className="story-reader__toolbar">
            <button
              type="button"
              className={`story-reader__tool${listenMode ? ' story-reader__tool--active' : ''}`}
              onClick={() => {
                if (listenMode) listen.stop()
                setListenMode((v) => !v)
              }}
            >
              {listenMode ? '🎧 Listen on' : '🎧 Listen'}
            </button>
            <button
              type="button"
              className={`story-reader__tool${showTranslation ? ' story-reader__tool--active' : ''}`}
              onClick={() => setShowTranslation((v) => !v)}
            >
              {showTranslation ? 'Hide' : 'Show'} translation
            </button>
            <button
              type="button"
              className={`story-reader__tool${showHighlights ? ' story-reader__tool--active' : ''}`}
              onClick={() => setShowHighlights((v) => !v)}
            >
              Grammar {showHighlights ? 'on' : 'off'}
            </button>
            <button
              type="button"
              className={`story-reader__tool${showVocab ? ' story-reader__tool--active' : ''}`}
              onClick={() => setShowVocab((v) => !v)}
            >
              Vocab {showVocab ? 'on' : 'off'}
            </button>
            <button
              type="button"
              className={`story-reader__tool${showGrammarHints ? ' story-reader__tool--active' : ''}`}
              onClick={() => setShowGrammarHints((v) => !v)}
            >
              Time hints {showGrammarHints ? 'on' : 'off'}
            </button>
            <button
              type="button"
              className={`story-reader__tool${shadowingMode ? ' story-reader__tool--active' : ''}`}
              onClick={() => setShadowingMode((v) => !v)}
            >
              Shadow {shadowingMode ? 'on' : 'off'}
            </button>
            <button
              type="button"
              className={`story-reader__tool${focusMode ? ' story-reader__tool--active' : ''}`}
              onClick={() => setFocusMode((v) => !v)}
            >
              Focus
            </button>
            <button
              type="button"
              className={`story-reader__tool${progressiveReveal ? ' story-reader__tool--active' : ''}`}
              onClick={handleToggleProgressive}
            >
              Reveal
            </button>
          </div>

          {listenMode ? (
            <div className="story-reader__listen-bar" aria-label="Listen controls">
              <button
                type="button"
                className="story-reader__listen-btn"
                onClick={listen.togglePlay}
              >
                {listen.isPlaying ? '⏸ Pause' : '▶ Play all'}
              </button>
              <button
                type="button"
                className={`story-reader__tool${listen.autoplay ? ' story-reader__tool--active' : ''}`}
                onClick={() => listen.setAutoplay((v) => !v)}
              >
                Autoplay {listen.autoplay ? 'on' : 'off'}
              </button>
              <span className="story-reader__speed-note">
                Speed: {listen.speechRate.toFixed(2)}× (change in Settings)
              </span>
            </div>
          ) : null}

          {activeVocab ? (
            <VocabPopover entry={activeVocab} onClose={() => setActiveVocab(null)} />
          ) : null}

          <div className="story-reader__body">
            {story.sentences.map((sentence, i) => {
              const isRevealed = i < effectiveRevealed
              const isActive = listenMode && listen.activeIndex === i
              const dimmed =
                listenMode &&
                listen.activeIndex !== null &&
                listen.activeIndex !== i

              return (
                <div
                  key={i}
                  className={`story-reader__sentence-block${isActive ? ' story-reader__sentence-block--active' : ''}`}
                >
                  <ReadingSentence
                    sentence={sentence}
                    showTranslation={showTranslation}
                    showHighlights={showHighlights}
                    showVocab={showVocab}
                    showGrammarHints={showGrammarHints}
                    onVocabClick={setActiveVocab}
                    activeVocab={activeVocab?.word}
                    isActive={isActive}
                    isRevealed={isRevealed}
                    dimmed={dimmed}
                  />
                  {shadowingMode && isRevealed ? (
                    <ShadowingBar text={sentence.text} />
                  ) : null}
                  <button
                    type="button"
                    className="story-reader__sentence-audio"
                    onClick={() => listen.playSentence(i)}
                    aria-label="Listen to sentence"
                  >
                    🔊
                  </button>
                </div>
              )
            })}
          </div>

          {progressiveReveal && effectiveRevealed < story.sentences.length ? (
            <div className="story-reader__reveal-cta">
              <button type="button" className="btn btn--secondary" onClick={revealNext}>
                Show next sentence →
              </button>
            </div>
          ) : null}

          {story.comprehension?.length ? (
            <div className="story-reader__cta">
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => {
                  listen.stop()
                  setPhase('comprehension')
                }}
              >
                Comprehension quiz →
              </button>
              <p className="story-reader__cta-hint">
                {story.comprehension.length} question
                {story.comprehension.length > 1 ? 's' : ''} — test what you understood.
              </p>
            </div>
          ) : null}
        </>
      ) : (
        <ComprehensionQuiz
          questions={story.comprehension}
          onComplete={handleComprehensionComplete}
        />
      )}
    </article>
  )
}
