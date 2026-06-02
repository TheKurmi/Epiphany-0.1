import PatternText from '@/shared/components/PatternText'
import { formToParts } from '@/utils/grammarHighlight'

/**
 * Visual strip showing the same stem with highlighted endings.
 * @param {{ stem: string, forms: { ending: string, label?: string, form?: string }[], title?: string, caption?: string }} props
 */
export default function PatternEndingStrip({ stem, forms, title, caption }) {
  return (
    <div className="pattern-strip">
      {title ? <h3 className="pattern-strip__title">{title}</h3> : null}
      {caption ? <p className="grammar-table__caption">{caption}</p> : null}
      <div className="pattern-strip__row" role="list">
        {forms.map(({ ending, label, form }) => {
          const full = form ?? `${stem}${ending}`
          return (
            <div key={`${label}-${ending}`} className="pattern-strip__item" role="listitem">
              {label ? <span className="pattern-strip__label">{label}</span> : null}
              <span className="pattern-strip__form" lang="el">
                <PatternText parts={formToParts(full, stem)} />
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
