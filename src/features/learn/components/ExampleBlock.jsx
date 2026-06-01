import GreekWord from '@/features/practice/screens/GreekWord'

export default function ExampleBlock({ title, items, showPronunciation }) {
  return (
    <section className="lesson__block">
      {title ? (
        <h2 className="lesson__block-title">{title}</h2>
      ) : (
        <h2 className="visually-hidden">Examples</h2>
      )}
      <ul className="lesson-examples">
        {items.map((example) => (
          <li key={`${example.greek}-${example.english}`} className="lesson-example">
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
    </section>
  )
}
