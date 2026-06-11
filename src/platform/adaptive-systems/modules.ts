/**
 * Adaptive system module map — conceptual organization.
 * Implementations remain in src/shared/memory and hooks until Phase 2 migration.
 */

export interface AdaptiveModuleDefinition {
  id: string
  label: string
  responsibility: string
  implementationPath: string
  inputs: string[]
  outputs: string[]
}

export const ADAPTIVE_MODULES: AdaptiveModuleDefinition[] = [
  {
    id: 'weak-spots',
    label: 'Weak Spot Tracking',
    responsibility: 'Aggregate patternTag counts from mastery attempts.',
    implementationPath: 'src/features/learn/hooks/useMasteryProgress.js',
    inputs: ['attempt outcomes', 'patternTag'],
    outputs: ['weakPatterns per topic'],
  },
  {
    id: 'mistake-patterns',
    label: 'Mistake Classification',
    responsibility: 'Rule-based error categories for recommendations.',
    implementationPath: 'src/shared/memory/mistakePatterns.js',
    inputs: ['expected vs actual text'],
    outputs: ['mistake category counts'],
  },
  {
    id: 'spaced-repetition',
    label: 'Spaced Repetition',
    responsibility: 'Schedule pattern and vocab keys with strength decay.',
    implementationPath: 'src/shared/hooks/useSpacedRepetition.js',
    inputs: ['review outcomes'],
    outputs: ['due items'],
  },
  {
    id: 'resurfacing',
    label: 'Review Today Resurfacing',
    responsibility: 'Merge due, weak, and curriculum signals into calm prompts.',
    implementationPath: 'src/shared/memory/reviewSurface.js',
    inputs: ['weakSpots', 'mastery', 'completedLessons'],
    outputs: ['review items with actions'],
  },
  {
    id: 'recommendations',
    label: 'Curriculum Recommendations',
    responsibility: 'Next lesson, practice mode, and reading suggestions.',
    implementationPath: 'src/features/learn/data/curriculum/recommendations.js',
    inputs: ['progress', 'weak spots'],
    outputs: ['suggested lesson / pack / mode'],
  },
  {
    id: 'attempt-recording',
    label: 'Unified Attempt Recording',
    responsibility: 'Single write path for practice and quiz outcomes.',
    implementationPath: 'src/shared/memory/recordLearningAttempt.js',
    inputs: ['attempt payload'],
    outputs: ['mastery + SRS + mistakes updates'],
  },
  {
    id: 'confidence',
    label: 'Confidence Messaging',
    responsibility: 'Understanding-focused progress copy.',
    implementationPath: 'src/shared/memory/reviewSurface.js (getConfidenceMessages)',
    inputs: ['completedLessons', 'mastery'],
    outputs: ['learner messages'],
  },
  {
    id: 'progression-weighting',
    label: 'Progression Weighting',
    responsibility: 'Unlocks, tiers, and path order — what input is appropriate.',
    implementationPath: 'src/app/access.js + readingTiers.js',
    inputs: ['completedLessons'],
    outputs: ['unlock state', 'suggested tier'],
  },
]
