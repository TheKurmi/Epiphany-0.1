import { useState } from 'react'
import PatternText from '@/shared/components/PatternText'
import { formToParts } from '@/utils/grammarHighlight'
import {
  ASPECT_COLUMNS,
  TIME_ROWS,
  ASPECT_MATRIX_CELLS,
  ASPECT_MATRIX_EXTRAS,
  getAspectCell,
} from '@/features/learn/data/patterns/aspect'

export default function AspectMatrix({ title, caption, showLegend = true }) {
  const [selectedKey, setSelectedKey] = useState('past-summary')

  const selected = ASPECT_MATRIX_CELLS[selectedKey]

  return (
    <div className="aspect-matrix">
      {title ? <h3 className="grammar-table__title">{title}</h3> : null}
      {caption ? <p className="grammar-table__caption">{caption}</p> : null}

      {showLegend ? (
        <div className="aspect-matrix__legend" aria-hidden="true">
          <span className="aspect-matrix__legend-item aspect-matrix__legend-item--wave">
            ~~~ ongoing
          </span>
          <span className="aspect-matrix__legend-item aspect-matrix__legend-item--dot">
            ● complete
          </span>
        </div>
      ) : null}

      <div className="aspect-matrix__grid-wrap">
        <table className="aspect-matrix__grid">
          <thead>
            <tr>
              <th scope="col" className="aspect-matrix__corner">
                Time ↓ / Aspect →
              </th>
              {ASPECT_COLUMNS.map((col) => (
                <th key={col.id} scope="col" className="aspect-matrix__col-head">
                  <span className="aspect-matrix__col-label">{col.shortLabel}</span>
                  <span className="aspect-matrix__col-greek">{col.greekLabel}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TIME_ROWS.map((row) => (
              <tr key={row.id}>
                <th scope="row" className="aspect-matrix__row-head">
                  {row.label}
                </th>
                {ASPECT_COLUMNS.map((col) => {
                  const key = `${row.id}-${col.id}`
                  const cell = getAspectCell(row.id, col.id)
                  const isSelected = selectedKey === key
                  const isValid = cell?.valid

                  return (
                    <td key={key} className="aspect-matrix__cell-wrap">
                      {isValid ? (
                        <button
                          type="button"
                          className={`aspect-matrix__cell aspect-matrix__cell--valid${
                            isSelected ? ' aspect-matrix__cell--selected' : ''
                          } aspect-matrix__cell--${col.visual}`}
                          onClick={() => setSelectedKey(key)}
                          aria-pressed={isSelected}
                        >
                          <span className="aspect-matrix__tense">{cell.tense}</span>
                          <span className="aspect-matrix__example" lang="el">
                            {cell.stem && cell.ending ? (
                              <PatternText
                                parts={formToParts(cell.example, cell.stem)}
                              />
                            ) : (
                              cell.example
                            )}
                          </span>
                        </button>
                      ) : (
                        <div
                          className="aspect-matrix__cell aspect-matrix__cell--empty"
                          aria-label="Not a natural combination in Modern Greek"
                        >
                          <span className="aspect-matrix__empty-label">—</span>
                          {cell?.note ? (
                            <span className="aspect-matrix__empty-note">{cell.note}</span>
                          ) : null}
                        </div>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected?.valid ? (
        <aside className="aspect-matrix__detail" aria-live="polite">
          <h4 className="aspect-matrix__detail-tense">
            {selected.tense}
            <span className="aspect-matrix__detail-en">{selected.tenseEnglish}</span>
          </h4>
          <p className="aspect-matrix__detail-example" lang="el">
            {selected.example}
            <span className="aspect-matrix__detail-trans">
              {selected.exampleEnglish}
            </span>
          </p>
          <p className="aspect-matrix__detail-insight">{selected.insight}</p>
        </aside>
      ) : null}

      {ASPECT_MATRIX_EXTRAS.length ? (
        <div className="aspect-matrix__extras">
          <h4 className="aspect-matrix__extras-title">Related form</h4>
          {ASPECT_MATRIX_EXTRAS.map((extra) => (
            <div key={extra.tense} className="aspect-matrix__extra-card">
              <strong>{extra.tense}</strong>
              <span className="aspect-matrix__extra-en">{extra.tenseEnglish}</span>
              <p lang="el">
                {extra.example}
                <span className="aspect-matrix__detail-trans">{extra.exampleEnglish}</span>
              </p>
              <p className="aspect-matrix__detail-insight">{extra.insight}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}
