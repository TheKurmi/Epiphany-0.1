# Reading System

The Read pillar delivers **comprehensible input** — micro-stories, dialogues, and themed packs — wired to progression, listening, and the shared vocabulary layer.

---

## Purpose

Acquisition needs **volume of understandable Greek**. Reading exists to:

- Expose learners to **natural sentence flow** after (or alongside) structured lessons.
- Provide **listen-along** and TTS for phonological anchoring.
- Recycle **grammar and vocab** from Learn without new UI per text.
- Feed **dictation, shadowing, and comprehension** from the same sentences.

Read is immersion with **scaffolding** — highlights, popovers, tier labels — not raw corpus dumping.

---

## Content Model

All readable content is a **story** (see [content-schema.md](./content-schema.md)):

- Ordered `sentences` with Greek, English, optional highlights and inline vocabulary.
- Optional `comprehension` quizzes after completion.
- Grouped into **packs** with unlock rules and reading tier.

**Categories** (pack-level):

| Category | Typical use |
|----------|-------------|
| `micro-stories` | Short narrative input, 3–6 sentences |
| `dialogues` | Turn-taking conversational lines |
| Themed packs | Travel, food, emotions, technology, etc. |

Micro-dialogues are dialogues by authoring convention (`—` turns) but use the **same runtime** as stories.

---

## Pack System

`packs.js` defines the catalog:

- **Starter packs** — `starter: true`, no lesson prerequisites (early immersion).
- **Gated packs** — `unlockLessons: [...]` ties input to curriculum milestones.
- **Reading tier** (1–4) — signals linguistic complexity on pack cards.
- **Guided path links** — paths declare `readPackIds` to suggest thematic reading.

`isPackUnlocked()` centralizes access; `getSuggestedReadingTier()` recommends max tier from completed lessons.

---

## Reading Experience

Learner flow:

1. Browse packs (filtered by unlock state and tier).
2. Open story — sentence-by-sentence or scroll modes.
3. **Listen** per line or full passage (speech layer, speed from global settings).
4. **Vocabulary popovers** — registry enrichment on tap.
5. **Grammar highlights** — stems/endings with optional time/action hints on past forms.
6. **Comprehension** — optional fixed questions at end.
7. Mark complete → `completedStories`, streak, stats.

Shadowing and dictation in Practice **pull from the same sentence objects** — read once, practice many ways.

---

## Progressive Input Difficulty

Reading tiers align with grammar milestones (see [progression-system.md](./progression-system.md)):

| Tier | Learner expectation |
|------|---------------------|
| 1 | Present-heavy, simple vocabulary |
| 2 | Past introduction, longer exchanges |
| 3 | Tense contrasts, richer dialogue |
| 4 | Naturalistic flow, aspect nuance |

Tiers are **communicative**, not hard per-sentence gates — pack unlocks handle prerequisites.

---

## Content Scale Strategy

Epiphany 0.2 scales reading through **modular batches**:

- Core `stories.js` registry.
- Batch modules (`stories-batch-4.js`, `micro-dialogues.js`, etc.) merged at build/import.
- New **packs** added without changing reader components.

Authors add batches + pack entries; the reader stays stable.

---

## Adaptive & Path Integration

- `requiredTopics` on stories enable **smart recommendations** when lessons complete.
- Completing readings contributes to **confidence messages** and activity streaks.
- Mistakes from dictation on story lines feed **mistake patterns**.
- Guided paths surface **next pack** alongside next lesson.

Reading is not a side quest — it is a **pillar in the learning loop**.

---

## Listen-Along & Accessibility

- Global playback speed applies to Read TTS (consistent with Practice).
- Sentence-level replay supports **ADHD-friendly** chunking.
- English gloss always available — comprehension before blind immersion.
- Dark mode and responsive layout are first-class (no separate “mobile reader”).

---

## Future Extensions

- **Graded reader modes** — hide English until reveal tap.
- **Running glossary** per pack from inline vocab aggregation.
- **Creator packs** — namespaced stories with custom unlock rules.
- **Branching stories** — schema v2 with choices (optional).
- **Shared read-aloud** — tutor assigns pack + tracks completion.

---

## Design Principles

- **Short beats long** for beginners — micro-stories lower abandonment.
- **Thematic coherence** — packs feel like “chapters,” not random lists.
- **Curriculum alignment** — unlock lessons match what grammar was taught.
- **Reuse sentences** — every line should be worth dictating or shadowing.

---

## Summary

The reading system is Epiphany’s **input engine**: pack-gated, tier-labeled, schema-stable stories that connect Listen, Learn, Practice, and adaptive review into one comprehensible-input loop.
