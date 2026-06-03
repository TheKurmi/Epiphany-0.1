# Content Schema

Epiphany treats educational content as **structured data**, not scattered strings. Schemas define the contracts between authoring, runtime features, and future creator tools.

Version marker: `CONTENT_VERSION` (`0.2.0`) in `src/schemas/content.js`.

---

## Why Schemas Exist

- **One vocabulary shape** for flashcards, stories, and quizzes.
- **Predictable story shape** for Read, dictation, and shadowing.
- **Lesson modularity** — sections, intros, mistakes, deep dives.
- **Exercise templates** for generated practice with `patternTag`.
- **Validation path** for creator uploads without breaking the app.

Schemas document intent; the repo still uses JSDoc typedefs today — Zod/JSON Schema validation is a natural next step for creator pipelines.

---

## Vocabulary Structure

`VocabItemSchema` — central registry item:

| Field | Purpose |
|-------|---------|
| `id` | Stable reference across features |
| `word` | Greek surface form |
| `translation` | English gloss |
| `category` | Thematic bucket (normalized via `categories.js`) |
| `difficulty` | `easy` \| `medium` \| `hard` |
| `gender` | Agreement metadata for articles/adjectives |
| `plural` | Plural form when relevant |
| `tags` | Cross-cutting labels (travel, food, formal…) |
| `frequencyRank` | Priority for adaptive surfacing |
| `pronunciation` | Optional phonetic hint |
| `conjugationGroup` | Links to verb pattern drills |
| `relatedWords` | Graph of id references |

**Registry architecture:**

- Core corpus: `all.json`.
- Modular batches: `batches/*.js` merged with deduplication (core wins on duplicate surface forms).
- Lookup: `getVocabById`, `getVocabByWord`, enrichment helpers for story inline vocab.

Total vocabulary scales by **adding batches**, not forking consumers.

---

## Story / Dialogue Structure

`StorySchema`:

| Field | Purpose |
|-------|---------|
| `id`, `packId` | Identity and grouping |
| `title`, `titleEnglish` | Display |
| `level` | `beginner` \| `intermediate` |
| `requiredTopics` | Curriculum tags for recommendations |
| `sentences[]` | Core content |
| `comprehension[]` | Optional post-read assessment |

**Sentence objects** typically include:

- `text`, `english`
- `highlights[]` — `GrammarHighlightSchema` (word, stem, ending, type, label)
- `vocabulary[]` — inline links to registry ids or glosses

Stories are **language-agnostic in shape** — Greek is current payload.

---

## Lesson Structure

`LessonSchema`:

| Field | Purpose |
|-------|---------|
| `id`, `topicId` | Routing and quiz profile key |
| `level` | `beginner` \| `intermediate` \| `advanced` |
| `pathOrder` | Sorting on learning path |
| `title`, `summary` | Discovery |
| `intro` | Opening framing |
| `sections[]` | Teaching blocks (text, examples, charts, mini-quiz hooks) |
| `commonMistakes[]` | Preventive pedagogy |
| `deepDive` | Optional stretch content |

Lessons reference **shared grammar modules** (patterns, glue, transformations) by import — not by duplicating prose in schema fields.

---

## Exercise Templates

`ExerciseTemplateSchema`:

| Field | Purpose |
|-------|---------|
| `id` | Generator key |
| `type` | `typing` \| `mc` \| `ordering` \| `dictation` |
| `patternTag` | Adaptive memory key |
| `promptTemplate` | Parameterized stem |
| `answerTemplate` | Optional answer pattern |

Templates enable **scale** — hundreds of drills from dozens of patterns.

---

## Metadata & Tagging Philosophy

Tags serve **systems**, not decoration:

| Tag layer | Used by |
|-----------|---------|
| `category` | Browse, flashcard filters, pack themes |
| `tags[]` | Cross-theme search, future creator filters |
| `requiredTopics` | Story–lesson alignment, recommendations |
| `patternTag` | Weak spots, spaced repetition |
| `readingTier` (pack) | Input difficulty signaling |
| `conjugationGroup` | Verb drill clustering |

Prefer **few well-applied tags** over noisy keyword stuffing.

---

## Pack Metadata (Reading)

Packs (adjacent to StorySchema) carry:

- `id`, `title`, `description`, `emoji`
- `category` — `micro-stories`, `dialogues`, etc.
- `unlockLessons`, `starter`
- `readingTier` — 1–4 input complexity

Packs are the **distribution unit** for stories in the Read pillar.

---

## Grammar Highlight Schema

`GrammarHighlightSchema` unifies visual grammar across Read and charts:

- `word`, `stem`, `ending`
- `type` — verb, noun, article, ending…
- `label` — learner-facing short explanation

Highlights connect reading to **time/action hints** and future automated quiz generation from story lines.

---

## Reusable Content Architecture Principles

1. **Single registry** — vocabulary referenced by id, not copied strings.
2. **Composable batches** — large corpora ship as modules.
3. **Explicit curriculum links** — `requiredTopics`, `topicId`, `unlockLessons`.
4. **Pattern-first exercises** — everything adaptive traces to `patternTag`.
5. **Versioned content** — `CONTENT_VERSION` bumps when shapes evolve.

---

## Future Creator Upload Systems

Pipeline vision:

```
  Creator authoring UI
        │
        ▼
  Validate against schemas (vocab, story, lesson, exercise)
        │
        ▼
  Staging namespace (preview in Developer / creator sandbox)
        │
        ▼
  Merge to course bundle (ids namespaced per creator)
        │
        ▼
  Runtime registry hot-reload or build-time bundle
```

Creators never bypass schemas — invalid gender enums or missing `packId` fail fast at upload.

**Namespacing:** `creatorId/lessonId` prevents id collisions with official Epiphany content.

---

## Relationship to Other Docs

- [dialogue-system.md](./dialogue-system.md) — story primitive as dialogue.
- [reading-system.md](./reading-system.md) — packs and tiers.
- [creator-course-system.md](./creator-course-system.md) — how schemas compose into courses.
- [progression-system.md](./progression-system.md) — unlocks consuming pack/lesson ids.

---

## Summary

Content schema is Epiphany’s **lingua franca** between authors, features, and adaptive systems. Keeping vocabulary, stories, lessons, and exercises structurally aligned is what makes the platform scalable beyond a single Greek codebase.
