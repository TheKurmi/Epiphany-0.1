import {
  HOME_DIFFICULTIES,
  HOME_TOPICS,
  topicToFilter,
} from '../data/homeConfig'
import { filterVocabulary } from '../data'
import {
  LEARNING_STYLES,
  PRACTICE_MODES,
  STUDY_DIRECTIONS,
} from '../data/constants'
import ConfigGroup, { ConfigOption } from './ConfigGroup'
import EpiphanyLogo from './EpiphanyLogo'

export default function HomePage({ config, onChange, onStart }) {
  const poolSize = filterVocabulary({
    category: topicToFilter(config.topic),
    difficulty: config.difficulty,
  }).length

  const canStart = poolSize > 0

  return (
    <div className="home">
      <header className="home__hero">
        <EpiphanyLogo variant="hero" />
        <p className="home__subtitle">
          Learn Greek vocabulary with calm, focused practice.
        </p>
      </header>

      <section className="home__config" aria-label="Session settings">
        <ConfigGroup label="Mode" columns={2}>
          {PRACTICE_MODES.map((mode) => (
            <ConfigOption
              key={mode.id}
              selected={config.practiceMode === mode.id}
              onClick={() => onChange({ practiceMode: mode.id })}
            >
              <span className="config-option__title">{mode.label}</span>
              <span className="config-option__hint">{mode.description}</span>
            </ConfigOption>
          ))}
        </ConfigGroup>

        <ConfigGroup label="Translation direction" columns={2}>
          {STUDY_DIRECTIONS.map((d) => (
            <ConfigOption
              key={d.id}
              selected={config.studyDirection === d.id}
              onClick={() => onChange({ studyDirection: d.id })}
            >
              {d.label}
            </ConfigOption>
          ))}
        </ConfigGroup>

        <ConfigGroup label="Difficulty" columns={3}>
          {HOME_DIFFICULTIES.map((d) => (
            <ConfigOption
              key={d.id}
              selected={config.difficulty === d.id}
              onClick={() => onChange({ difficulty: d.id })}
            >
              {d.label}
            </ConfigOption>
          ))}
        </ConfigGroup>

        <ConfigGroup label="Topic" columns={3}>
          {HOME_TOPICS.map((t) => (
            <ConfigOption
              key={t.id}
              selected={config.topic === t.id}
              onClick={() => onChange({ topic: t.id })}
            >
              {t.label}
            </ConfigOption>
          ))}
        </ConfigGroup>

        <ConfigGroup label="Learning style" columns={2}>
          {LEARNING_STYLES.map((s) => (
            <ConfigOption
              key={s.id}
              selected={config.learningStyle === s.id}
              onClick={() => onChange({ learningStyle: s.id })}
            >
              {s.id === 'word' ? 'Word mode' : 'Picture mode'}
            </ConfigOption>
          ))}
        </ConfigGroup>
      </section>

      <footer className="home__footer">
        {!canStart ? (
          <p className="home__warning" role="alert">
            No words match this topic and level. Try another combination.
          </p>
        ) : null}

        <button
          type="button"
          className="btn btn--start"
          disabled={!canStart}
          onClick={onStart}
        >
          Start session
        </button>
      </footer>
    </div>
  )
}
