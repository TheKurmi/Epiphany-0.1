import { useState } from 'react'
import { getStoryById } from '@/features/read/data'
import { speakGreek } from '@/utils/speech'
import { useLearningProgress } from '@/shared/hooks/useLearningProgress'
import ReadingSentence from './ReadingSentence'
import ComprehensionQuiz from './ComprehensionQuiz'

export default function StoryReader({ storyId, onBack }) {
  const story = getStoryById(storyId)
  const { markStory } = useLearningProgress()
  const [showTranslation, setShowTranslation] = useState(false)
  const [showHighlights, setShowHighlights] = useState(true)
  const [activeVocab, setActiveVocab] = useState(null)
  const [phase, setPhase] = useState('reading')

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

  function handleReadAloud() {
    const fullText = story.sentences.map((s) => s.text).join(' ')
    speakGreek(fullText)
  }

  function handleReadAloudSentence(text) {
    speakGreek(text)
  }

  function startComprehension() {
    setPhase('comprehension')
  }

  function handleComprehensionComplete() {
    markStory(story.id)
  }

  return (
    <article className="story-reader">
      <header className="story-reader__header">
        <button type="button" className="btn btn--back" onClick={onBack}>
          ← Stories
        </button>
        <span className={`story-reader__level story-reader__level--${story.level}`}>
          {story.level}
        </span>
        <h1 className="story-reader__title">{story.title}</h1>
        <p className="story-reader__subtitle">{story.titleEnglish}</p>
      </header>

      {phase === 'reading' ? (
        <>
          <div className="story-reader__toolbar">
            <button
              type="button"
              className="story-reader__tool"
              onClick={handleReadAloud}
              aria-label="Read story aloud"
            >
              🔊 Read all
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
              {showHighlights ? 'Hide' : 'Show'} grammar
            </button>
          </div>

          {activeVocab ? (
            <div className="story-reader__vocab-popover" role="status">
              <strong>{activeVocab.word}</strong>
              <span>{activeVocab.english}</span>
              <button
                type="button"
                className="story-reader__vocab-close"
                onClick={() => setActiveVocab(null)}
                aria-label="Close"
              >
                ×
              </button>
            </div>
          ) : null}

          <div className="story-reader__body">
            {story.sentences.map((sentence, i) => (
              <div key={i} className="story-reader__sentence-block">
                <ReadingSentence
                  sentence={sentence}
                  showTranslation={showTranslation}
                  showHighlights={showHighlights}
                  onVocabClick={setActiveVocab}
                  activeVocab={activeVocab?.word}
                />
                <button
                  type="button"
                  className="story-reader__sentence-audio"
                  onClick={() => handleReadAloudSentence(sentence.text)}
                  aria-label="Listen to sentence"
                >
                  🔊
                </button>
              </div>
            ))}
          </div>

          {story.comprehension?.length ? (
            <div className="story-reader__cta">
              <button
                type="button"
                className="btn btn--primary"
                onClick={startComprehension}
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
