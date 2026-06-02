import { useState } from 'react'
import { speakGreek, cancelSpeech } from '@/utils/speech'

/**
 * MVP shadowing — hear sentence, repeat, replay at learner pace.
 */
export default function ShadowingBar({ text }) {
  const [phase, setPhase] = useState('idle')

  if (!text?.trim()) return null

  function play() {
    cancelSpeech()
    setPhase('playing')
    speakGreek(text, {
      onEnd: () => setPhase('your-turn'),
      onError: () => setPhase('idle'),
    })
  }

  function replaySlow() {
    cancelSpeech()
    setPhase('playing')
    speakGreek(text, {
      rate: 0.65,
      onEnd: () => setPhase('your-turn'),
      onError: () => setPhase('idle'),
    })
  }

  return (
    <div className="shadowing-bar" aria-label="Shadowing practice">
      <span className="shadowing-bar__label">Shadow</span>
      <button type="button" className="shadowing-bar__btn" onClick={play}>
        {phase === 'playing' ? '▶ Playing…' : '▶ Listen'}
      </button>
      <button type="button" className="shadowing-bar__btn shadowing-bar__btn--muted" onClick={replaySlow}>
        Slower replay
      </button>
      {phase === 'your-turn' ? (
        <span className="shadowing-bar__prompt">Your turn — repeat aloud</span>
      ) : null}
    </div>
  )
}
