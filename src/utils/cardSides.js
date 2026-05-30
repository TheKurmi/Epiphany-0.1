export function getCardSides(word, direction) {
  if (direction === 'gr-en') {
    return {
      prompt: word.greek,
      answer: word.english,
      promptLabel: 'Greek',
      answerLabel: 'English',
    }
  }
  return {
    prompt: word.english,
    answer: word.greek,
    promptLabel: 'English',
    answerLabel: 'Greek',
  }
}
