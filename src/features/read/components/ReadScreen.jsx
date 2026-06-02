import { getCategoriesWithPacks, getPackUnlockHint } from '@/features/read/data'
import { inferReadingTier, getReadingTierMeta } from '@/features/read/data/readingTiers'
import { useLearningProgress } from '@/shared/hooks/useLearningProgress'
import EpiphanyLogo from '@/shared/components/EpiphanyLogo'

function PackCard({ pack, completedStories, onOpenPack }) {
  const doneCount = pack.stories.filter((s) =>
    completedStories.includes(s.id),
  ).length
  const tierMeta = getReadingTierMeta(inferReadingTier(pack))

  function handleClick() {
    onOpenPack(pack.id)
  }

  return (
    <button
      type="button"
      className={`read-pack-card${pack.unlocked ? '' : ' read-pack-card--locked'}`}
      onClick={handleClick}
    >
      <span className="read-pack-card__emoji" aria-hidden="true">
        {pack.emoji}
      </span>
      <span className="read-pack-card__title">{pack.label}</span>
      <p className="read-pack-card__desc">{pack.description}</p>
      {pack.unlocked ? (
        <span className="read-pack-card__meta">
          {tierMeta.label} · {pack.stories.length} stories
          {doneCount > 0 ? ` · ${doneCount} read` : ''}
        </span>
      ) : (
        <span className="read-pack-card__lock">
          🔒 {getPackUnlockHint(pack.id)}
        </span>
      )}
    </button>
  )
}

export default function ReadScreen({ onBack, onOpenPack }) {
  const { completedLessons, completedStories } = useLearningProgress()
  const categories = getCategoriesWithPacks(completedLessons)

  const totalStories = categories.reduce(
    (sum, cat) => sum + cat.packs.reduce((s, p) => s + p.stories.length, 0),
    0,
  )
  const unlockedStories = categories.reduce(
    (sum, cat) =>
      sum +
      cat.packs
        .filter((p) => p.unlocked)
        .reduce((s, p) => s + p.stories.length, 0),
    0,
  )

  return (
    <div className="read">
      <header className="read__header">
        <button type="button" className="btn btn--back" onClick={onBack}>
          ← Home
        </button>
        <div className="read__intro">
          <EpiphanyLogo variant="compact" showVersion={false} />
          <h1 className="read__title">Read</h1>
          <p className="read__subtitle">
            Short Greek stories using grammar you already know — build real
            comprehension, not just vocabulary lists.
          </p>
          {unlockedStories > 0 ? (
            <p className="read__stats">
              {completedStories.length} of {unlockedStories} stories read
              {totalStories > unlockedStories
                ? ` · ${totalStories - unlockedStories} more unlock with lessons`
                : ''}
            </p>
          ) : null}
        </div>
      </header>

      {categories.map((category) => (
        <section
          key={category.id}
          className="read__section"
          aria-labelledby={`read-cat-${category.id}`}
        >
          <h2 id={`read-cat-${category.id}`} className="read__section-title">
            <span aria-hidden="true">{category.emoji}</span> {category.label}
          </h2>
          <p className="read__section-desc">{category.description}</p>
          <div className="read__pack-grid">
            {category.packs.map((pack) => (
              <PackCard
                key={pack.id}
                pack={pack}
                completedStories={completedStories}
                onOpenPack={onOpenPack}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
