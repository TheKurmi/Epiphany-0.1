import ExampleBlock from './ExampleBlock'
import GrammarTable, {
  ConjugationTable,
  ConjugationCompare,
} from './GrammarTable'
import PatternEndingStrip from './PatternEndingStrip'
import TipsList from './TipsList'
import AspectMatrix from './AspectMatrix'
import ConceptDrill from './ConceptDrill'
import TimeTimeline from './TimeTimeline'

export default function LessonSection({ section, showPronunciation, nested = false }) {
  const blockClass = nested ? 'lesson__block lesson__block--nested' : 'lesson__block'

  switch (section.type) {
    case 'text':
      return (
        <section className={blockClass}>
          {section.title ? (
            <h2 className="lesson__block-title">{section.title}</h2>
          ) : null}
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="lesson__text">
              {paragraph}
            </p>
          ))}
        </section>
      )

    case 'grammarTable':
      return (
        <section className={blockClass}>
          <GrammarTable
            title={section.title}
            caption={section.caption}
            columns={section.columns}
            rows={section.rows}
            highlightColumn={section.highlightColumn}
          />
        </section>
      )

    case 'conjugationTable':
      return (
        <section className={blockClass}>
          <ConjugationTable
            title={section.title}
            caption={section.caption}
            stem={section.stem}
            rows={section.rows}
            showPerson={section.showPerson !== false}
            showEnding={section.showEnding !== false}
          />
        </section>
      )

    case 'conjugationCompare':
      return (
        <section className={blockClass}>
          <ConjugationCompare
            title={section.title}
            caption={section.caption}
            persons={section.persons}
            verbs={section.verbs}
          />
        </section>
      )

    case 'examples':
      return (
        <ExampleBlock
          title={section.title ?? 'Examples'}
          items={section.items}
          showPronunciation={showPronunciation}
        />
      )

    case 'groupCards':
      return (
        <section className={blockClass}>
          {section.title ? (
            <h2 className="lesson__block-title">{section.title}</h2>
          ) : null}
          {section.caption ? (
            <p className="grammar-table__caption">{section.caption}</p>
          ) : null}
          <div className="group-cards">
            {section.groups.map((group) => (
              <div key={group.name} className="group-card">
                <span className="group-card__label">{group.label}</span>
                <h3 className="group-card__name">{group.name}</h3>
                <p className="group-card__hint">{group.hint}</p>
                {group.example ? (
                  <p className="group-card__example">{group.example}</p>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      )

    case 'note':
      return (
        <aside className="lesson__note">
          {section.title ? (
            <h3 className="lesson__note-title">{section.title}</h3>
          ) : null}
          {section.paragraphs?.map((p) => (
            <p key={p} className="lesson__note-text">
              {p}
            </p>
          ))}
        </aside>
      )

    case 'tips':
      return (
        <section className={blockClass}>
          <TipsList title={section.title} items={section.items} />
        </section>
      )

    case 'patternStrip':
      return (
        <section className={blockClass}>
          <PatternEndingStrip
            title={section.title}
            caption={section.caption}
            stem={section.stem}
            forms={section.forms}
          />
        </section>
      )

    case 'aspectMatrix':
      return (
        <section className={blockClass}>
          <AspectMatrix title={section.title} caption={section.caption} />
        </section>
      )

    case 'conceptDrill':
      return (
        <section className={blockClass}>
          <ConceptDrill title={section.title} questions={section.questions} />
        </section>
      )

    case 'timeline':
      return (
        <section className={blockClass}>
          <TimeTimeline
            title={section.title}
            caption={section.caption}
            items={section.items}
          />
        </section>
      )

    default:
      return null
  }
}
