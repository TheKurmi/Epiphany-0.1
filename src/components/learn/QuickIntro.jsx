import GreekWord from '../GreekWord'

export default function QuickIntro({ intro, showPronunciation }) {
  if (!intro) return null

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
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}
