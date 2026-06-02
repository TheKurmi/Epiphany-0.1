import GreekWord from '@/features/practice/screens/GreekWord'
import ExampleBlock from './ExampleBlock'

export default function QuickIntro({ intro, showPronunciation }) {
  if (!intro) return null

  const hasHighlights = intro.examples?.some((e) => e.highlight || e.highlights)

  return (
    <section className="lesson__block lesson__block--intro" aria-label="Overview">
      <h2 className="lesson__block-title">Overview</h2>
      <div className="lesson__prose">
        {intro.paragraphs.map((paragraph) => (
          <p key={paragraph} className="lesson__text lesson__text--intro">
            {paragraph}
          </p>
        ))}
      </div>
      {intro.examples?.length ? (
        hasHighlights ? (
          <ExampleBlock
            title="Key patterns"
            items={intro.examples}
            showPronunciation={showPronunciation}
          />
        ) : (
          <ul className="lesson-examples lesson-examples--inline">
            {intro.examples.map((example) => (
              <li
                key={`${example.greek}-${example.english}`}
                className="lesson-example lesson-example--inline"
              >
                <GreekWord
                  text={example.greek}
                  showGuide={showPronunciation}
                  size="md"
                />
                <p className="lesson-example__english">{example.english}</p>
                {example.note ? (
                  <p className="lesson-example__note">{example.note}</p>
                ) : null}
              </li>
            ))}
          </ul>
        )
      ) : null}
    </section>
  )
}
