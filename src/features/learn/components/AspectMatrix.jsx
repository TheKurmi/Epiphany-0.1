import { useState } from 'react'
import StudyFocusShell, { useStudyFocusActive } from '@/shared/components/StudyFocusShell'
import PatternText from '@/shared/components/PatternText'
import { formToParts } from '@/utils/grammarHighlight'
import {
  MATRIX_VIEW_MODES,
  MATRIX_COLUMNS,
  MATRIX_ROWS,
  ASPECT_MATRIX_CELLS,
  getMatrixCellKey,
} from '@/features/learn/data/patterns/aspect'

const DEFAULT_SELECTED = 'past-summary'

function renderExample(text, stem) {
  if (!text) return null
  if (stem && text.includes(stem)) {
    return <PatternText parts={formToParts(text, stem)} />
  }
  return text
}

function CellContent({ mode, cell, showSubtext }) {
  if (!cell?.valid) {
    return (
      <>
        <span className="aspect-matrix__empty-x" aria-hidden="true">
          ✕
        </span>
        {mode === 'intuitive' ? (
          <span className="aspect-matrix__empty-hint">Not used</span>
        ) : null}
      </>
    )
  }

  if (mode === 'intuitive') {
    return (
      <>
        <span className="aspect-matrix__intuitive-main">{cell.intuitiveText}</span>
        {showSubtext ? (
          <span className="aspect-matrix__intuitive-sub">{cell.intuitiveHint}</span>
        ) : null}
      </>
    )
  }

  if (mode === 'grammar') {
    return (
      <>
        <span className="aspect-matrix__grammar-greek" lang="el">
          {cell.tenseGreek}
        </span>
        {showSubtext ? (
          <span className="aspect-matrix__grammar-en">{cell.tenseEnglish}</span>
        ) : null}
      </>
    )
  }

  return (
    <>
      <span className="aspect-matrix__example" lang="el">
        {renderExample(cell.examplePlay, cell.examplePlayStem)}
      </span>
      {showSubtext ? (
        <span className="aspect-matrix__example-en">{cell.examplePlayEnglish}</span>
      ) : null}
    </>
  )
}

function DetailPanel({ mode, cell, row, col, compact = false }) {
  if (!cell?.valid) {
    return (
      <aside
        className={`aspect-matrix__detail aspect-matrix__detail--empty${compact ? ' aspect-matrix__detail--sidebar' : ''}`}
        aria-live="polite"
      >
        <h4 className="aspect-matrix__detail-heading">Why the empty cell?</h4>
        <p className="aspect-matrix__detail-insight">{cell.note}</p>
      </aside>
    )
  }

  return (
    <aside
      className={`aspect-matrix__detail${compact ? ' aspect-matrix__detail--sidebar' : ''}`}
      aria-live="polite"
    >
      {mode === 'intuitive' ? (
        <>
          <h4 className="aspect-matrix__detail-heading">
            {cell.intuitiveText}
            <span className="aspect-matrix__detail-context">
              {col.intuitiveLabel} · {row.intuitiveLabel.toLowerCase()}
            </span>
          </h4>
          <p className="aspect-matrix__detail-lead">{cell.intuitiveHint}</p>
        </>
      ) : null}

      {mode === 'grammar' ? (
        <>
          <h4 className="aspect-matrix__detail-heading" lang="el">
            {cell.tenseGreek}
            <span className="aspect-matrix__detail-en">{cell.tenseEnglish}</span>
          </h4>
          <p className="aspect-matrix__detail-meta">
            {col.grammarLabel} · {row.grammarLabel}
            <span className="aspect-matrix__detail-meta-greek" lang="el">
              {' '}
              ({row.grammarGreek})
            </span>
          </p>
        </>
      ) : null}

      {mode === 'examples' ? (
        <>
          <h4 className="aspect-matrix__detail-heading" lang="el">
            {cell.examplePlay}
            <span className="aspect-matrix__detail-en">{cell.examplePlayEnglish}</span>
          </h4>
          <p className="aspect-matrix__detail-meta">
            Same root <strong lang="el">παίζ-</strong> — different perspective
          </p>
        </>
      ) : null}

      <p className="aspect-matrix__detail-insight">{cell.insight}</p>

      {mode !== 'grammar' ? (
        <p className="aspect-matrix__detail-grammar-hint">
          <span lang="el">{cell.tenseGreek}</span>
          <span className="aspect-matrix__detail-en-inline"> — {cell.tenseEnglish}</span>
        </p>
      ) : null}
    </aside>
  )
}

function StudyFilters({ isolateRow, setIsolateRow, isolateCol, setIsolateCol, showSubtext, setShowSubtext }) {
  return (
    <div className="aspect-matrix__study-filters" role="group" aria-label="Focus filters">
      <label className="aspect-matrix__filter">
        <span className="aspect-matrix__filter-label">Row</span>
        <select
          value={isolateRow ?? ''}
          onChange={(e) => setIsolateRow(e.target.value || null)}
          aria-label="Isolate quantity of action row"
        >
          <option value="">All rows</option>
          {MATRIX_ROWS.map((row) => (
            <option key={row.id} value={row.id}>
              {row.intuitiveLabel}
            </option>
          ))}
        </select>
      </label>
      <label className="aspect-matrix__filter">
        <span className="aspect-matrix__filter-label">Column</span>
        <select
          value={isolateCol ?? ''}
          onChange={(e) => setIsolateCol(e.target.value || null)}
          aria-label="Isolate quality of time column"
        >
          <option value="">All columns</option>
          {MATRIX_COLUMNS.map((col) => (
            <option key={col.id} value={col.id}>
              {col.intuitiveLabel}
            </option>
          ))}
        </select>
      </label>
      <button
        type="button"
        className="aspect-matrix__filter-btn"
        onClick={() => setShowSubtext((v) => !v)}
      >
        {showSubtext ? 'Hide hints' : 'Show hints'}
      </button>
    </div>
  )
}

function AspectMatrixContent({ title, caption, showLegend }) {
  const studyOpen = useStudyFocusActive()
  const [mode, setMode] = useState('intuitive')
  const [selectedKey, setSelectedKey] = useState(DEFAULT_SELECTED)
  const [isolateRow, setIsolateRow] = useState(null)
  const [isolateCol, setIsolateCol] = useState(null)
  const [showSubtext, setShowSubtext] = useState(true)

  const selected = ASPECT_MATRIX_CELLS[selectedKey]
  const selectedCol = MATRIX_COLUMNS.find((c) => selectedKey.startsWith(`${c.id}-`))
  const selectedRow = MATRIX_ROWS.find((r) => selectedKey.endsWith(`-${r.id}`))
  const modeMeta = MATRIX_VIEW_MODES.find((m) => m.id === mode)

  const visibleRows = isolateRow
    ? MATRIX_ROWS.filter((r) => r.id === isolateRow)
    : MATRIX_ROWS
  const visibleCols = isolateCol
    ? MATRIX_COLUMNS.filter((c) => c.id === isolateCol)
    : MATRIX_COLUMNS

  const gridBlock = (
    <>
      <div className="aspect-matrix__mode-bar">
        <span className="aspect-matrix__mode-label">View</span>
        <div className="aspect-matrix__mode-toggle" role="tablist" aria-label="Matrix view mode">
          {MATRIX_VIEW_MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              role="tab"
              aria-selected={mode === m.id}
              className={`aspect-matrix__mode-btn${
                mode === m.id ? ' aspect-matrix__mode-btn--active' : ''
              }`}
              onClick={() => setMode(m.id)}
              title={m.description}
            >
              {m.label}
            </button>
          ))}
        </div>
        {!studyOpen ? (
          <p className="aspect-matrix__mode-desc">{modeMeta?.description}</p>
        ) : null}
      </div>

      {studyOpen ? (
        <StudyFilters
          isolateRow={isolateRow}
          setIsolateRow={setIsolateRow}
          isolateCol={isolateCol}
          setIsolateCol={setIsolateCol}
          showSubtext={showSubtext}
          setShowSubtext={setShowSubtext}
        />
      ) : null}

      {showLegend && mode === 'intuitive' ? (
        <div className="aspect-matrix__legend" aria-hidden="true">
          <span className="aspect-matrix__legend-item aspect-matrix__legend-item--wave">
            ~~~ a lot of times
          </span>
          <span className="aspect-matrix__legend-item aspect-matrix__legend-item--dot">
            ● one time
          </span>
          <span className="aspect-matrix__legend-item aspect-matrix__legend-item--check">
            ✓ already done
          </span>
        </div>
      ) : null}

      <div className="aspect-matrix__grid-wrap aspect-matrix__grid-wrap--animated" key={mode}>
        <table className="aspect-matrix__grid aspect-matrix__grid--pedagogy">
          <thead>
            <tr>
              <th scope="col" className="aspect-matrix__corner">
                <span className="aspect-matrix__corner-when">Quality of Time →</span>
                <span className="aspect-matrix__corner-action">Quantity of Action ↓</span>
              </th>
              {visibleCols.map((col) => (
                <th key={col.id} scope="col" className="aspect-matrix__col-head">
                  <span className="aspect-matrix__col-label">
                    {mode === 'grammar' ? col.grammarLabel : col.intuitiveLabel}
                  </span>
                  {mode === 'grammar' ? (
                    <span className="aspect-matrix__col-sub">{col.intuitiveLabel}</span>
                  ) : null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row) => (
              <tr key={row.id}>
                <th scope="row" className="aspect-matrix__row-head">
                  <span className="aspect-matrix__row-label">
                    {mode === 'grammar' ? row.grammarLabel : row.intuitiveLabel}
                  </span>
                  {mode !== 'grammar' ? (
                    <span className="aspect-matrix__row-hint">{row.intuitiveHint}</span>
                  ) : (
                    <span className="aspect-matrix__row-greek" lang="el">
                      {row.grammarGreek}
                    </span>
                  )}
                </th>
                {visibleCols.map((col) => {
                  const key = getMatrixCellKey(col.id, row.id)
                  const cell = ASPECT_MATRIX_CELLS[key]
                  const isSelected = selectedKey === key
                  const isValid = cell?.valid

                  const hoverTitle = isValid
                    ? mode === 'grammar'
                      ? `${cell.tenseGreek} (${cell.tenseEnglish})`
                      : mode === 'examples'
                        ? `${cell.examplePlay} — ${cell.examplePlayEnglish}`
                        : cell.intuitiveHint
                    : cell?.note

                  return (
                    <td key={key} className="aspect-matrix__cell-wrap">
                      {isValid ? (
                        <button
                          type="button"
                          className={`aspect-matrix__cell aspect-matrix__cell--valid${
                            isSelected ? ' aspect-matrix__cell--selected' : ''
                          } aspect-matrix__cell--${row.visual} aspect-matrix__cell--mode-${mode}`}
                          onClick={() => setSelectedKey(key)}
                          aria-pressed={isSelected}
                          title={hoverTitle}
                        >
                          <CellContent mode={mode} cell={cell} showSubtext={showSubtext} />
                        </button>
                      ) : (
                        <div
                          className={`aspect-matrix__cell aspect-matrix__cell--empty${
                            isSelected ? ' aspect-matrix__cell--selected' : ''
                          }`}
                          role="button"
                          tabIndex={0}
                          onClick={() => setSelectedKey(key)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault()
                              setSelectedKey(key)
                            }
                          }}
                          aria-label="Not a natural combination in Modern Greek"
                          title={cell?.note}
                        >
                          <CellContent mode={mode} cell={cell} showSubtext={showSubtext} />
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
    </>
  )

  return (
    <div className={`aspect-matrix${studyOpen ? ' aspect-matrix--study' : ''}`}>
      {title ? <h3 className="grammar-table__title">{title}</h3> : null}
      {caption ? <p className="grammar-table__caption">{caption}</p> : null}

      {studyOpen ? (
        <div className="aspect-matrix__study-layout">
          <div className="aspect-matrix__study-main">{gridBlock}</div>
          {selected && selectedCol && selectedRow ? (
            <div className="aspect-matrix__study-sidebar">
              <h3 className="aspect-matrix__study-sidebar-label">Explanation</h3>
              <DetailPanel
                mode={mode}
                cell={selected}
                row={selectedRow}
                col={selectedCol}
                compact
              />
            </div>
          ) : null}
        </div>
      ) : (
        <>
          {gridBlock}
          {selected && selectedCol && selectedRow ? (
            <DetailPanel mode={mode} cell={selected} row={selectedRow} col={selectedCol} />
          ) : null}
          {mode === 'intuitive' ? (
            <p className="aspect-matrix__journey-hint">
              Start here for intuition → switch to <strong>Grammar</strong> for terminology →
              then <strong>παίζω</strong> to see it live.
            </p>
          ) : null}
        </>
      )}
    </div>
  )
}

export default function AspectMatrix({ title, caption, showLegend = true }) {
  return (
    <StudyFocusShell
      title={title ?? 'Time & action matrix'}
      caption={caption}
      focusClassName="study-focus--matrix"
    >
      <AspectMatrixContent title={title} caption={caption} showLegend={showLegend} />
    </StudyFocusShell>
  )
}
