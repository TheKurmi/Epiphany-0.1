/**
 * Lightweight spaced repetition — review queue foundations.
 * Stores next review dates for vocabulary and grammar patterns.
 */
import { STORAGE_KEYS } from '@/app/storage/keys'

function emptyStore() {
  return {
    items: {},
    lastReviewDate: null,
  }
}

function readStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.spacedRepetition)
    return raw ? { ...emptyStore(), ...JSON.parse(raw) } : emptyStore()
  } catch {
    return emptyStore()
  }
}

function writeStore(data) {
  try {
    localStorage.setItem(STORAGE_KEYS.spacedRepetition, JSON.stringify(data))
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event('spaced-repetition'))
}

function itemKey(type, id) {
  return `${type}:${id}`
}

/** Record a review outcome — strength 0–5, schedules next review. */
export function recordReview(type, id, { correct, nearMiss = false }) {
  const store = readStore()
  const key = itemKey(type, id)
  const prev = store.items[key] ?? { strength: 0, reviews: 0, wrong: 0, nearMiss: 0 }

  let strength = prev.strength
  if (correct) strength = Math.min(5, strength + 1)
  else if (nearMiss) strength = Math.max(0, strength)
  else strength = Math.max(0, strength - 2)

  const daysUntil = correct ? Math.min(14, 1 + strength * 2) : nearMiss ? 1 : 0
  const nextReview = new Date()
  nextReview.setDate(nextReview.getDate() + daysUntil)

  store.items[key] = {
    type,
    id,
    strength,
    reviews: prev.reviews + 1,
    wrong: prev.wrong + (correct ? 0 : 1),
    nearMiss: prev.nearMiss + (nearMiss ? 1 : 0),
    lastReviewed: new Date().toISOString(),
    nextReview: nextReview.toISOString(),
  }
  store.lastReviewDate = new Date().toISOString().slice(0, 10)
  writeStore(store)
}

/** Items due for review today or overdue. */
export function getDueReviews(limit = 10) {
  const store = readStore()
  const now = Date.now()
  return Object.values(store.items)
    .filter((item) => new Date(item.nextReview).getTime() <= now)
    .sort((a, b) => a.strength - b.strength)
    .slice(0, limit)
}

/** Recently weak items (low strength, had mistakes). */
export function getRecentWeakItems(limit = 8) {
  const store = readStore()
  return Object.values(store.items)
    .filter((item) => item.strength <= 2 && item.wrong > 0)
    .sort((a, b) => b.wrong - a.wrong)
    .slice(0, limit)
}

export function getReviewSummary() {
  const store = readStore()
  const due = getDueReviews(100).length
  const weak = getRecentWeakItems(100).length
  return { due, weak, totalTracked: Object.keys(store.items).length }
}
