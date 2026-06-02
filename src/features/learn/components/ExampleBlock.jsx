import GreekWord from '@/features/practice/screens/GreekWord'
import HighlightedGreekText from '@/shared/components/HighlightedGreekText'
import GrammarTooltip from '@/shared/components/GrammarTooltip'
import PatternText from '@/shared/components/PatternText'
import { formToParts } from '@/utils/grammarHighlight'

function ExampleGreek({ example, showPronunciation }) {
  if (example.highlight) {
    const { stem, ending, type, label, word } = example.highlight
    const targetWord = word ?? example.greek
    const hl = { word: targetWord, stem, ending, type, label }

    const inner =
      stem && ending ? (
        <PatternText parts={formToParts(targetWord, stem)} />
      ) : (
        <span className="pattern-text__highlight">{targetWord}</span>
      )

    if (word && example.greek.includes(word) && example.greek !== word) {
      const idx = example.greek.indexOf(word)
      return (
        <span className="lesson-example__greek" lang="el">
          {example.greek.slice(0, idx)}
          <GrammarTooltip highlight={hl}>
            <span className="lesson-example__greek--highlighted">{inner}</span>
          </GrammarTooltip>
          {example.greek.slice(idx + word.length)}
        </span>
      )
    }

    return (
      <GrammarTooltip highlight={hl}>
        <span className="lesson-example__greek lesson-example__greek--highlighted" lang="el">
          {inner}
        </span>
      </GrammarTooltip>
    )
  }

  if (example.highlights?.length) {
    return (
      <span className="lesson-example__greek" lang="el">
        <HighlightedGreekText
          text={example.greek}
          highlights={example.highlights}
          showHighlights
          showVocab={false}
        />
      </span>
    )
  }

  return (
    <GreekWord text={example.greek} showGuide={showPronunciation} size="md" />
  )
}

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
            <ExampleGreek example={example} showPronunciation={showPronunciation} />
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
