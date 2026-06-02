/** Difficulty tiers — lessons sort by level, then pathOrder. */
export const LEARN_LEVELS = [
  { id: 'beginner', label: 'Beginner', description: 'Start here — everyday patterns first' },
  {
    id: 'intermediate',
    label: 'Intermediate',
    description: 'Build on the basics with richer grammar',
  },
  {
    id: 'advanced',
    label: 'Advanced',
    description: 'Irregular forms, cases, conditionals, and nuanced syntax',
  },
]

export function getLevelById(levelId) {
  return LEARN_LEVELS.find((l) => l.id === levelId) ?? null
}
