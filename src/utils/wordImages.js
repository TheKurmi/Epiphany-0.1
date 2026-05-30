/** @deprecated Use wordVisuals — kept for imports. */
import {
  getVisualForCard,
  getEmojiForCard,
  keywordFromEnglish,
} from './wordVisuals'

export { getVisualForCard, getEmojiForCard, keywordFromEnglish }

export function getWordImageMeta(card) {
  const { emoji, keyword } = getVisualForCard(card)
  return { emoji, keyword }
}
