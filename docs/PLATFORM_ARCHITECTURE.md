# Platform Architecture

This is the **foundational architecture document** for Epiphany’s transition from a Greek learning prototype to a **reusable educational systems foundation**.

Epiphany 0.2 **still runs as today** — same UX, same Greek content, same engines in `src/features/`. Phase 1 adds **`src/platform/`** as the conceptual and structural layer that will absorb cross-subject logic over time.

---

## Core Transition

```
  BEFORE (mental model)          AFTER (mental model)
  ─────────────────────          ────────────────────
  "Greek learning app"    →    "Educational platform"
  "Lessons + stories"     →    "Engines + content objects"
  "Greek tense matrix"    →    "Chart engine + Greek matrix data"
```

**Greek is the experimental implementation layer.**  
**Platform is the long-lived systems layer.**

---

## Engine vs Content Separation

| Layer | What it is | Examples (0.2) |
|-------|------------|----------------|
| **System / Engine** | Reusable behavior — renders, generates, adapts, gates | Dialogue renderer, quiz generator, aspect matrix UI, practice modes, review resurfacing |
| **Content** | Subject-specific payloads plugged into engines | `survival-greek.js`, café dialogues, article quiz profiles, `aspect.js` cell text |
| **Substrate** | Shared services engines consume | Vocabulary registry, TTS, storage keys, schemas |
| **Orchestration** | Cross-pillar coordination | Home, guided paths, smart recommendations |
| **Tooling** | Internal QA (not learner product) | Developer Mode |

Reference map in code: `src/platform/separation.ts`.

**Rule for future work:** if it would still make sense for a **math** or **history** course, it belongs in **system/platform**. If it mentions παίζω or ο/η/το, it is **content** (until abstracted into data files).

---

## Platform Directory (`src/platform/`)

```
src/platform/
├── content-schema/     # Foundational object types (TS)
├── types/              # Shared educational language
├── engines/            # Engine registry (where impl lives today)
├── primitives/         # Primitive catalog
├── adaptive-systems/   # Module map + memory re-exports
├── creator-tools/      # Future creator capability contracts
├── utils/              # Adapters + light validation
├── separation.ts       # System vs content paths
└── index.ts            # Public platform barrel
```

Phase 1 is **structure + types + documentation**, not moving every feature import.

---

## Educational Primitives

Primitives are **portable atoms** creators and engines compose:

| Primitive | Schema | Primary engine |
|-----------|--------|----------------|
| Lesson | `lessonObject.ts` | Learn + path engine |
| Dialogue | `dialogueObject.ts` | Dialogue renderer (Read) |
| Quiz profile | `quizObject.ts` | Quiz engine |
| Chart | `chartObject.ts` | Chart / visualization engine |
| Vocabulary entry | `schemas/content.js` | Registry |
| Exercise template | `schemas/content.js` | Practice engine |
| Content pack | pack metadata | Progression + Read |
| Guided path | path definitions | Path engine |

Catalog: `src/platform/primitives/registry.ts`.

---

## Content Object Philosophy

All platform content extends **`PlatformContentObject`** (`content-schema/contentObject.ts`):

- **Identity:** `id`, `title`, `subject`, `locale`
- **Pedagogy:** `difficulty`, `learningGoals`, `concepts`, `prerequisites`
- **Discovery:** `tags`, `summary`, `estimatedDuration`
- **Adaptation:** `adaptiveWeight`, `reviewPriority`
- **Reuse:** `reusableContexts` (learn, practice, read, dictation, …)
- **Creators (future):** `metadata.creatorId`, `namespace`

Goal: **future educational interoperability** — export/import bundles, creator namespacing, cross-course recommendations.

Greek stories today omit many fields; **`storyToDialogueObject()`** (`platform/utils/adapters.ts`) supplies defaults without changing runtime stories.

---

## System Relationships

```
                    ┌──────────────────────┐
                    │   Orchestration      │
                    │  Home · Paths · Rec  │
                    └──────────┬───────────┘
           ┌───────────────────┼───────────────────┐
           ▼                   ▼                   ▼
    ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
    │ Learn       │     │ Practice    │     │ Read        │
    │ engines     │     │ engines     │     │ engines     │
    └──────┬──────┘     └──────┬──────┘     └──────┬──────┘
           │                   │                   │
           └───────────────────┼───────────────────┘
                               ▼
                    ┌──────────────────────┐
                    │ Platform substrate     │
                    │ vocab · memory · access│
                    └──────────┬─────────────┘
                               ▼
                    ┌──────────────────────┐
                    │ Content objects      │
                    │ (Greek 0.2 today)    │
                    └──────────────────────┘
```

Engine registry: `src/platform/engines/registry.ts`.

---

## Content Flow

1. **Authoring** — Content objects created (today: JS modules; future: creator tools → validated JSON).
2. **Registration** — Catalog / registry indexes ids by subject and tags.
3. **Gating** — Progression engine checks prerequisites and tiers.
4. **Delivery** — Pillar engines render primitives (lesson screen, story reader, quiz session).
5. **Attempt** — Learner interacts; unified `recordLearningAttempt`.
6. **Adaptation** — Weak spots, SRS, Review Today consume `patternTag` + metadata weights.

Content does not implement adaptation — it supplies **concepts, tags, and patternTags** engines interpret.

---

## Adaptive System Flow

Modular responsibilities (`platform/adaptive-systems/modules.ts`):

```
  Practice / Quiz / Mastery
           │
           ▼
   recordLearningAttempt
           │
     ┌─────┴─────┬──────────────┐
     ▼           ▼              ▼
  Mastery     Spaced Rep    Mistake classify
  weakPatterns
     │
     ▼
  buildReviewTodayItems ← curriculum recommendations
     │
     ▼
  Review Today · Weak Spot · Confidence copy
```

**Philosophy unchanged:** calm resurfacing, not casino mechanics. See [adaptive-review-system.md](./adaptive-review-system.md).

Facade import path (optional): `@/platform/adaptive-systems`.

---

## Dialogue Abstraction

**Was:** “Greek hardcoded story blocks.”  
**Becoming:** `PlatformDialogueObject` with `scenarioType` (language, interview, science, mentorship, …).

0.2 runtime still uses `Story` in `src/features/read/data/`. Structural abstraction is in types + adapters only — **no reader rewrite in Phase 1**.

Cross-context reuse unchanged in intent: one dialogue line → read, dictation, shadowing, future quiz stems.

---

## Quiz Engine Foundation

**Separation:**

| Side | Location |
|------|----------|
| Engine | `generateQuestion()`, generators, `GeneratedQuizQuestion.jsx` |
| Content | `QUIZ_PROFILES`, topic data pools |

Platform types add future interaction types: `ordering`, `matching`, `spokenResponse`, `adaptiveReview` — **not fully implemented**.

`PlatformQuizProfileObject` documents mastery tiers and `defaultPatternTags` for creator compatibility.

---

## Chart / Visualization Engine Foundation

Greek **aspect–time matrix** = prototype `PlatformChartObject`:

- `visualizationKind: 'matrix'`
- `viewModes` (intuition / grammar / examples)
- `columns` × `rows` → `cells`
- `supportsFocusMode: true` → `StudyFocusShell`

Future: same engine renders math grids, timelines, logic tables — **swap cell data**, keep interaction shell.

---

## Creator–Content Relationships

Phase 1: **capability contracts only** (`platform/creator-tools/capabilities.ts`).

Creators will eventually:

- Author **content objects** validated against `content-schema`.
- Bundle into **courses** (see [creator-course-system.md](./creator-course-system.md)).
- Publish with **namespaced ids** and `metadata.namespace: 'creator'`.
- Preview adaptive behavior via sandbox / Developer Mode patterns.

Platform executes pedagogy; creators supply intent.

---

## Greek 0.2 as Experimental Layer

| Stays in Greek paths (for now) | Lives in platform (growing) |
|-------------------------------|----------------------------|
| Lesson prose and examples | Lesson *object shape* |
| Story sentences | Dialogue *object shape* |
| Quiz profile nouns/verbs | Quiz *profile shape* |
| Aspect matrix Greek labels | Chart *object shape* |
| Feature UI components | Engine *definitions* |

**Do not break** working imports from features to `src/features/` and `src/data/`.

Migrate when a clear win exists (e.g. creator upload pipeline), not preemptively.

---

## Versioning

| Version | Meaning |
|---------|---------|
| `CONTENT_VERSION` `0.2.0` in `src/schemas/content.js` | Legacy runtime JSDoc marker |
| `PLATFORM_CONTENT_VERSION` `0.3.0-platform` in `platform/content-schema/contentObject.ts` | Platform schema generation |

Both coexist during transition.

---

## Long-Term Platform Direction

1. **Multi-subject** — `subject` field on all content objects.
2. **Creator bundles** — validated course manifests.
3. **Engine marketplace (far future)** — optional third-party engines with strict contracts.
4. **Tutoring layer** — assigns packs / weak-spot tags on top of same primitives.
5. **Adaptive infrastructure** — pattern-tagged content everywhere for explainable resurfacing.

Epiphany scales **educational systems**, not user count, in this phase.

---

## Related Documentation

| Doc | Topic |
|-----|--------|
| [SYSTEMS_OVERVIEW.md](./SYSTEMS_OVERVIEW.md) | Pillar overview |
| [platform-vision.md](./platform-vision.md) | Ecosystem vision |
| [content-schema.md](./content-schema.md) | Greek-era schema doc |
| [educational-philosophy.md](./educational-philosophy.md) | Non-negotiable pedagogy |
| [creator-course-system.md](./creator-course-system.md) | Course bundles |

## Phase 2+ (Not This Pass)

- Move memory hooks behind platform interfaces only
- Runtime validation (Zod) on import
- Creator authoring UI
- Subject selector at app shell
- Database / API — explicitly out of scope for Phase 1

---

## Summary

Epiphany is becoming a **creator-compatible educational foundation** with Greek as its test lab. `src/platform/` names the engines, objects, and flows so future subjects plug in — without pretending the marketplace or backend already exist.
