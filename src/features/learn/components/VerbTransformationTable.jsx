import StudyFocusShell from '@/shared/components/StudyFocusShell'
import { VERB_TRANSFORMATION_FAMILIES } from '@/shared/grammar/verbTransformations'

export default function VerbTransformationTable({ title, caption, familyIds }) {
  const families = familyIds
    ? VERB_TRANSFORMATION_FAMILIES.filter((f) => familyIds.includes(f.id))
    : VERB_TRANSFORMATION_FAMILIES.slice(0, 2)

  return (
    <StudyFocusShell
      title={title}
      caption={caption}
      focusClassName="study-focus--transform"
    >
      <div className="verb-transform">
        {title ? <h3 className="grammar-table__title">{title}</h3> : null}
        {caption ? <p className="grammar-table__caption">{caption}</p> : null}

        {families.map((family) => (
          <div key={family.id} className="verb-transform__family">
            <h4 className="verb-transform__family-label">{family.label}</h4>
            {family.insight ? (
              <p className="verb-transform__insight">{family.insight}</p>
            ) : null}
            <table className="verb-transform__table">
              <thead>
                <tr>
                  <th scope="col">Ongoing / layer</th>
                  <th scope="col">Complete once</th>
                  <th scope="col">Meaning</th>
                </tr>
              </thead>
              <tbody>
                {family.pairs.map((pair) => (
                  <tr key={`${pair.ongoing}-${pair.complete}`}>
                    <td lang="el">{pair.ongoing}</td>
                    <td lang="el">{pair.complete}</td>
                    <td>{pair.english}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </StudyFocusShell>
  )
}
