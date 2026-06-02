import StudyFocusShell from '@/shared/components/StudyFocusShell'
import PatternText from '@/shared/components/PatternText'
import { formToParts } from '@/utils/grammarHighlight'

function TableContent({ title, caption, columns, rows, highlightColumn }) {
  return (
    <>
      {title ? <h3 className="grammar-table__title">{title}</h3> : null}
      {caption ? <p className="grammar-table__caption">{caption}</p> : null}
      <div className="grammar-table-scroll">
        <table className="grammar-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col} scope="col">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.join('|')}>
                {row.map((cell, colIndex) => (
                  <td
                    key={`${row[0]}-${colIndex}`}
                    className={
                      colIndex === highlightColumn
                        ? 'grammar-table__cell--highlight'
                        : undefined
                    }
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default function GrammarTable({ title, caption, columns, rows, highlightColumn }) {
  return (
    <StudyFocusShell
      title={title}
      caption={caption}
      focusClassName="study-focus--table"
    >
      <div className="grammar-table-wrap">
        <TableContent
          title={title}
          caption={caption}
          columns={columns}
          rows={rows}
          highlightColumn={highlightColumn}
        />
      </div>
    </StudyFocusShell>
  )
}

export function ConjugationTable({
  title,
  caption,
  stem,
  rows,
  showPerson = true,
  showEnding = true,
}) {
  return (
    <StudyFocusShell
      title={title}
      caption={caption}
      focusClassName="study-focus--conjugation"
    >
      <div className="grammar-table-wrap conjugation-table-wrap">
        {title ? <h3 className="grammar-table__title">{title}</h3> : null}
        {caption ? <p className="grammar-table__caption">{caption}</p> : null}
        <div className="grammar-table-scroll">
          <table className="grammar-table conjugation-table">
            <thead>
              <tr>
                {showPerson ? <th scope="col">Person</th> : null}
                {showEnding ? <th scope="col">Ending</th> : null}
                <th scope="col">Form</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.person ?? row.form}>
                  {showPerson ? (
                    <td className="conjugation-table__person">{row.person}</td>
                  ) : null}
                  {showEnding ? (
                    <td className="conjugation-table__ending">
                      <span className="pattern-text__highlight">{row.ending}</span>
                    </td>
                  ) : null}
                  <td className="conjugation-table__form">
                    <PatternText parts={formToParts(row.form, row.stem ?? stem)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </StudyFocusShell>
  )
}

export function ConjugationCompare({ title, caption, persons, verbs }) {
  return (
    <StudyFocusShell
      title={title}
      caption={caption}
      focusClassName="study-focus--conjugation"
    >
      <div className="grammar-table-wrap conjugation-compare-wrap">
        {title ? <h3 className="grammar-table__title">{title}</h3> : null}
        {caption ? <p className="grammar-table__caption">{caption}</p> : null}
        <div className="grammar-table-scroll">
          <table className="grammar-table conjugation-compare">
            <thead>
              <tr>
                <th scope="col">Person</th>
                {verbs.map((verb) => (
                  <th key={verb.label} scope="col">
                    {verb.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {persons.map((person, rowIndex) => (
                <tr key={person}>
                  <td className="conjugation-table__person">{person}</td>
                  {verbs.map((verb) => (
                    <td key={verb.label} className="conjugation-table__form">
                      <PatternText
                        parts={formToParts(verb.forms[rowIndex], verb.stem)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </StudyFocusShell>
  )
}
