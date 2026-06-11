/**
 * Lightweight content validation helpers — not a full schema validator yet.
 */

const ID_PATTERN = /^[a-z0-9][a-z0-9-_.]*[a-z0-9]$|^[a-z0-9]$/

export function isValidContentId(id: unknown): id is string {
  return typeof id === 'string' && id.length > 0 && id.length <= 128 && ID_PATTERN.test(id)
}

export function normalizeTags(tags: unknown): string[] {
  if (!Array.isArray(tags)) return []
  return tags.filter((t): t is string => typeof t === 'string' && t.trim().length > 0)
}

export function clampAdaptiveWeight(value: unknown): number | undefined {
  if (typeof value !== 'number' || Number.isNaN(value)) return undefined
  return Math.min(1, Math.max(0, value))
}
