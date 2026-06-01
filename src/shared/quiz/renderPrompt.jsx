/** Render quiz prompt text with **bold** markdown segments. */
export function renderPrompt(text) {
  if (!text?.includes('**')) return text
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>,
  )
}
