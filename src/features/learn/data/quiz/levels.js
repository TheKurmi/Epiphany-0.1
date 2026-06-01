/** Progressive mastery quiz tiers per topic. */
export const MASTERY_LEVELS = [
  {
    id: 1,
    label: 'Recognition',
    description: 'Multiple choice — spot the right ending or form',
    questionsPerSession: 5,
    passThreshold: 0.6,
  },
  {
    id: 2,
    label: 'Controlled production',
    description: 'Type conjugations and fill in the blank',
    questionsPerSession: 5,
    passThreshold: 0.6,
  },
  {
    id: 3,
    label: 'Sentence usage',
    description: 'Complete sentences in context',
    questionsPerSession: 5,
    passThreshold: 0.6,
  },
  {
    id: 4,
    label: 'Mixed practice',
    description: 'Randomized mix — patterns on autopilot',
    questionsPerSession: 6,
    passThreshold: 0.65,
  },
]

export function getMasteryLevel(id) {
  return MASTERY_LEVELS.find((l) => l.id === id) ?? null
}
