# Dialogue System

Dialogues in Epiphany are **platform educational primitives**: reusable conversational units that carry Greek (or, in future, any language) but are structurally independent of a single screen or activity.

---

## Purpose

Learners need Greek that sounds **spoken**, not textbook-flat. Dialogues exist to:

- Model **turn-taking**, fillers, and natural rhythm.
- Teach **high-frequency exchanges** (greetings, ordering, directions) as wholes.
- Provide **shadowing and dictation** source material with emotional context.
- **Recycle** grammar and vocabulary introduced in lessons without new pedagogical overhead per screen.

A micro-dialogue (“— Τι κάνεις; — Καλά, εσύ;”) is as architecturally important as a full lesson — it is a first-class content type, not an appendix.

---

## Micro-Dialogue Philosophy

**Micro-dialogues** are intentionally tiny (typically 2–4 lines):

- Low cognitive load — completable in one sitting.
- Ideal for **listen → repeat** (shadowing) and **listen → type** (dictation).
- Easy to embed in Review Today or guided paths as “quick immersion.”
- High **reuse density** — one exchange can appear in multiple packs or practice pools.

They live in a dedicated pack (`micro-dialogues`) and batch module (`micro-dialogues.js`) so authors can add dozens without touching core story files.

Medium and long dialogues extend the same schema with more turns, opinion exchanges, and past-tense contrast — still **stories** under the hood.

---

## Structural Model (Story Primitive)

Dialogues are implemented as **stories** sharing one schema:

| Field | Role |
|-------|------|
| `id` | Stable reference for jumps, completion, analytics |
| `packId` | Thematic grouping + unlock rules |
| `title` / `titleEnglish` | Display |
| `level` | `beginner` \| `intermediate` (broad band) |
| `requiredTopics` | Curriculum tags for recommendations |
| `sentences[]` | `{ text, english, highlights?, vocabulary? }` |
| `comprehension[]` | Optional post-read checks |

**Dialogue-specific authoring conventions:**

- Lines prefixed with `—` for speaker turns (visual + TTS pacing).
- Conversation glue woven in (λοιπόν, μάλλον, σοβαρά;) where pedagogically appropriate.
- `highlights` on verbs for grammar-highlighted reading modes.

There is no separate “dialogue engine” runtime — the **reading renderer** is the dialogue engine. That reuse is deliberate.

---

## Pack Organization

Reading packs group dialogues by **theme and unlock**:

- `ordering-dialogues`, `directions-dialogues`, `micro-dialogues`, `casual-friends`, `natural-greek`, etc.
- Packs declare `unlockLessons`, `readingTier`, `category` (`dialogues` vs `micro-stories`).
- Starter packs (`starter: true`) available without prerequisites for early immersion.

Themes map to learner life domains (travel, food, emotions, work) — content varies; **structure does not**.

---

## Cross-Pillar Reuse

One dialogue sentence graph can feed:

| Pillar | Use |
|--------|-----|
| **Read** | Full reader, listen-along, comprehension |
| **Practice — Dictation** | Audio-first line reproduction |
| **Practice — Shadowing** | Phrase-by-phrase repeat (ShadowingBar) |
| **Practice — Flashcards** | Vocabulary pulled from inline `vocabulary` entries |
| **Learn** | Lesson `examples` sections can cite same lines |
| **Adaptive review** | Pattern tags from highlighted verbs feed weak-spot |
| **Future quizzes** | Comprehension or line-order generators from `sentences` |

Authors should tag `requiredTopics` and highlights so downstream systems **connect automatically**.

---

## Adaptive Learning Integration

- Completing stories feeds **progress** (`completedStories`) and activity streaks.
- Inline vocabulary links to **registry** via `enrichVocabEntry` for popover metadata.
- `timeActionHints` on `ReadingSentence` surface aspect intuition when past forms appear.
- Mistake patterns from dictation on dialogue lines classify errors (accent, tense, etc.).
- Guided paths reference pack IDs — completing path lessons unlocks thematic dialogues.

Dialogues are not passive content; they are **sensors and reinforcers** for the memory layer.

---

## Metadata & Authoring Discipline

Recommended metadata for scalable dialogues:

- **Reading tier** (via pack) — aligns with tense complexity.
- **Register tags** (future) — casual vs formal (see `REGISTER_TAGS` in grammar modules).
- **Conversation glue density** — beginner-friendly vs naturalistic messy speech.
- **Recurring verb families** — παίζω, γράφω stacks for time-and-aspect path.

Vocabulary inline entries should prefer **registry words** so flashcards and stats stay consistent.

---

## Future Creator Extensibility

Creators will author dialogues by:

1. Choosing a **pack** (or creating one with unlock rules).
2. Adding **sentences** with optional highlights and vocab links.
3. Setting **comprehension** questions (generation templates may assist).
4. Previewing in **Read** with TTS and tier badge.
5. Publishing to a **content version** validated against `StorySchema`.

Potential extensions (not required in 0.2):

- Speaker labels (`speaker: 'A'`) for multi-voice TTS.
- Register and region tags.
- Linked **shadowing pace** hints per line.
- Branching dialogue (choose response) — would need schema v2.

---

## Design Anti-Patterns

Avoid:

- Robotic Q&A with identical sentence frames every dialogue.
- Dialogues disconnected from recent lessons (no `requiredTopics` alignment).
- Giant monologue blocks labeled as dialogue.
- Duplicate lines across packs without intentional spiral review.

Prefer:

- Varied turn length and rhythm.
- Natural fillers and realistic responses.
- Intentional grammar recycling from the learning path.

---

## Summary

Treat every dialogue as a **portable conversational atom** in the Epiphany platform: authored once, experienced in Read, reinforced in Practice, gated by Progression, and surfaced again by Adaptive Review.
