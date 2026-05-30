import { CATEGORIES, DIFFICULTIES } from '../data'
import {
  LEARNING_STYLES,
  PRACTICE_MODES,
  STUDY_DIRECTIONS,
} from '../data/constants'

export default function SettingsPanel({
  category,
  difficulty,
  studyDirection,
  learningStyle,
  practiceMode,
  onCategory,
  onDifficulty,
  onStudyDirection,
  onLearningStyle,
  onPracticeMode,
}) {
  return (
    <aside className="settings" aria-label="Learning settings">
      <div className="settings__group">
        <h2 className="settings__title">Practice mode</h2>
        <div className="option-grid option-grid--2">
          {PRACTICE_MODES.map((mode) => (
            <button
              key={mode.id}
              type="button"
              className={`option-card${practiceMode === mode.id ? ' option-card--active' : ''}`}
              onClick={() => onPracticeMode(mode.id)}
            >
              <span className="option-card__label">{mode.label}</span>
              <span className="option-card__desc">{mode.description}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="settings__group">
        <h2 className="settings__title">Direction</h2>
        <div className="pill-row">
          {STUDY_DIRECTIONS.map((d) => (
            <button
              key={d.id}
              type="button"
              className={`pill${studyDirection === d.id ? ' pill--active' : ''}`}
              onClick={() => onStudyDirection(d.id)}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div className="settings__group">
        <h2 className="settings__title">Card style</h2>
        <div className="pill-row">
          {LEARNING_STYLES.map((s) => (
            <button
              key={s.id}
              type="button"
              className={`pill${learningStyle === s.id ? ' pill--active' : ''}`}
              onClick={() => onLearningStyle(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="settings__group">
        <h2 className="settings__title">Level</h2>
        <div className="pill-row pill-row--wrap">
          {DIFFICULTIES.map((d) => (
            <button
              key={d.id}
              type="button"
              className={`pill pill--${d.id}${difficulty === d.id ? ' pill--active' : ''}`}
              onClick={() => onDifficulty(d.id)}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div className="settings__group">
        <h2 className="settings__title">Lesson topic</h2>
        <div className="pill-row pill-row--wrap">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`pill pill--compact${category === c.id ? ' pill--active' : ''}`}
              onClick={() => onCategory(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
