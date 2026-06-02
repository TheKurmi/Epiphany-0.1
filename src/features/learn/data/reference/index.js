/**
 * Charts registry — foundational educational reference.
 */
import { FOUNDATIONAL_CHARTS } from './foundational-charts'

export const REFERENCE_CATEGORIES = [
  { id: 'verbs', label: 'Verbs & Tenses', emoji: '🔄' },
  { id: 'nouns', label: 'Articles & Nouns', emoji: '📋' },
  { id: 'pronouns', label: 'Pronouns & Possessives', emoji: '👤' },
  { id: 'syntax', label: 'Questions & Sentences', emoji: '💬' },
  { id: 'words', label: 'Function Words', emoji: '🔤' },
]

/** @typedef {import('../index').LessonSection & { type: string }} ChartSection */

/**
 * @typedef {Object} ReferenceChart
 * @property {string} id
 * @property {string} categoryId
 * @property {string} title
 * @property {string} summary
 * @property {boolean} [foundation]
 * @property {ChartSection[]} sections
 */

export const REFERENCE_CHARTS = FOUNDATIONAL_CHARTS

export function getReferenceChart(id) {
  return REFERENCE_CHARTS.find((c) => c.id === id) ?? null
}

export function getReferenceChartsByCategory(categoryId) {
  return REFERENCE_CHARTS.filter((c) => c.categoryId === categoryId)
}

export function getFoundationCharts() {
  return REFERENCE_CHARTS.filter((c) => c.foundation)
}

/** Lookup chart section text for practice hints — keyed by chart id. */
export function getChartTip(chartId) {
  const chart = getReferenceChart(chartId)
  if (!chart) return null
  const tips = chart.sections.find((s) => s.type === 'tips')
  return tips?.items?.[0]?.text ?? chart.summary
}

export { FOUNDATIONAL_CHARTS }
