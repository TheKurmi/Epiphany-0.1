import { getLessonById } from '@/features/learn/data'
import {
  getPackById,
  getPackMissingLessons,
  getPackStories,
  isPackUnlocked,
} from '@/features/read/data'
import { useLearningProgress } from '@/shared/hooks/useLearningProgress'

function StoryCard({ story, onOpen }) {
  return (
    <button
      type="button"
      className="story-card"
      onClick={() => onOpen(story.id)}
    >
      <div className="story-card__top">
        <span className={`story-card__level story-card__level--${story.level}`}>
          {story.level}
        </span>
        {story.completed ? (
          <span className="story-card__done" aria-label="Completed">
            ✓
          </span>
        ) : null}
      </div>
      <span className="story-card__title">{story.title}</span>
      <span className="story-card__english">{story.titleEnglish}</span>
      <span className="story-card__meta">
        {story.sentences.length} sentences · {story.comprehension?.length ?? 0}{' '}
        questions
      </span>
      <span className="story-card__action">Read story →</span>
    </button>
  )
}

export default function ReadPackScreen({ packId, onBack, onOpenStory }) {
  const { completedLessons, completedStories } = useLearningProgress()
  const pack = getPackById(packId)
  const unlocked = pack ? isPackUnlocked(pack.id, completedLessons) : false
  const stories = unlocked
    ? getPackStories(packId, completedLessons, completedStories)
    : []
  const missingLessons = pack
    ? getPackMissingLessons(pack.id, completedLessons)
    : []

  if (!pack) {
    return (
      <div className="read-pack">
        <button type="button" className="btn btn--back" onClick={onBack}>
          ← Read
        </button>
        <p className="empty-state">Pack not found.</p>
      </div>
    )
  }

  if (!unlocked) {
    return (
      <div className="read-pack">
        <header className="read-pack__header">
          <button type="button" className="btn btn--back" onClick={onBack}>
            ← Read
          </button>
          <span className="read-pack__emoji" aria-hidden="true">
            {pack.emoji}
          </span>
          <h1 className="read-pack__title">{pack.label}</h1>
          <p className="read-pack__desc">{pack.description}</p>
        </header>
        <div className="read-pack__locked">
          <p className="read-pack__locked-title">🔒 Pack locked</p>
          <p className="read-pack__locked-desc">
            Complete these lessons in Learn to unlock this reading pack:
          </p>
          <ul className="read-pack__locked-list">
            {missingLessons.map((lessonId) => {
              const lesson = getLessonById(lessonId)
              return (
                <li key={lessonId}>
                  {lesson?.title ?? lessonId}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className="read-pack">
      <header className="read-pack__header">
        <button type="button" className="btn btn--back" onClick={onBack}>
          ← Read
        </button>
        <span className="read-pack__emoji" aria-hidden="true">
          {pack.emoji}
        </span>
        <h1 className="read-pack__title">{pack.label}</h1>
        <p className="read-pack__desc">{pack.description}</p>
      </header>

      {stories.length ? (
        <div className="read-pack__list">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} onOpen={onOpenStory} />
          ))}
        </div>
      ) : (
        <p className="empty-state">No stories in this pack yet.</p>
      )}
    </div>
  )
}
