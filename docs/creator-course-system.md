# Creator Course System

Epiphany 0.2 is built as an **educational engine prototype**. The creator course system describes how today’s modular primitives could compose into **creator-driven courses** on the larger Project Epiphany platform — without requiring a rewrite of core architecture.

---

## Vision

Official Epiphany Greek content proves the systems. **Creators** (teachers, tutors, community authors) eventually assemble courses from the same building blocks:

- Lessons
- Quizzes (profiles + mastery tiers)
- Dialogues / stories
- Vocabulary contributions
- Learning paths / guided journeys
- Practice templates
- Charts and reference material

A course is not a monolithic video playlist — it is a **bundle of references** to platform primitives with unlock and adaptation rules.

---

## Modular Building Blocks

| Primitive | Creator action | Platform responsibility |
|-----------|----------------|---------------------------|
| **Vocabulary** | Upload or extend registry items | Dedupe, normalize categories, id assignment |
| **Lesson** | Author sections, link charts | Path order, topic id, schema validation |
| **Story / dialogue** | Write sentences, comprehension | Pack assignment, TTS, Read UI |
| **Quiz profile** | Define pools and templates | Generation, mastery tiers, pattern tags |
| **Pack** | Theme, unlock lessons, tier | `isPackUnlocked`, guided path hooks |
| **Guided path** | Select lessons + practice + reads | Cross-pillar dashboard progress |
| **Chart** | Custom cells or link official charts | StudyFocusShell rendering |
| **Exercise template** | Pattern-tagged drills | Practice mode generators |

Creators **compose**; the platform **executes** pedagogy consistently.

---

## Course Bundle Model (Future)

A **course bundle** might contain:

```text
course/
  manifest.json      # title, creator, version, language
  lessons/*.json
  stories/*.json
  packs.json
  quiz-profiles.json
  guided-path.json
  vocab-batch.json
```

Runtime merges bundle into namespaced ids (`creatorSlug:lesson-id`). Official content keeps unprefixed ids.

**Validation gate** — all files checked against [content-schema.md](./content-schema.md) before publish.

---

## Authoring Workflow (Target)

1. **Create course shell** — metadata, language, difficulty band.
2. **Import or author vocabulary** — batch upload with category/tags.
3. **Build lessons** — section editor with preview; link existing charts.
4. **Author dialogues** — story editor with highlight and vocab picker.
5. **Define packs** — unlock rules tied to lesson ids in *this* course.
6. **Configure quizzes** — pick profile type, fill data pools, set mastery copy.
7. **Assemble guided path** — drag order of lessons, attach practice modes and packs.
8. **Preview as learner** — sandbox progression (like Developer Mode, creator-facing).
9. **Publish version** — immutable `CONTENT_VERSION` bump per release.

---

## Adaptive Flows for Creator Content

Creator courses **inherit** platform adaptation:

- `patternTag`s on creator exercises feed weak spots.
- Spaced repetition keys include creator namespace.
- Review Today can mix official + enrolled course items (configurable).
- Mistake analytics aggregate per course for creator dashboard.

Creators should not implement their own SRS — they tag patterns; Epiphany schedules.

---

## Progression & Monetization (Platform-Level)

Not implemented in 0.2, but architecturally compatible:

- **Per-course progression** — separate `completedLessons` namespace.
- **Enrollment** — learner subscribes to creator bundle.
- **Tutor overlay** — human assigns packs or weak-spot sessions from creator course.
- **Certificates** — mastery thresholds across creator-defined topics.

Unlock rules remain **explicit** — creators set prerequisites, platform enforces.

---

## What Exists Today (0.2)

| Capability | Status |
|------------|--------|
| Documented schemas | Yes (`content.js`) |
| Modular vocab batches | Yes |
| Modular story batches | Yes |
| Quiz profiles per topic | Yes (official topics) |
| Guided paths | Yes (official paths) |
| Developer preview / progression sim | Yes |
| Creator UI / upload API | No — blueprint only |
| Namespaced creator ids | Planned |

0.2 is the **reference implementation** creators will mirror once tooling ships.

---

## Quality & Safety

Platform-level guardrails for creator content:

- Schema validation and profanity/policy hooks (future).
- **Tier warnings** when dialogue complexity exceeds unlock lessons.
- **Duplicate detection** on vocabulary surface forms.
- **Official chart fallback** — creators link aspect matrix rather than reinventing.
- Version pinning — learners stay on course version until they opt into updates.

---

## Connection to Platform Vision

See [platform-vision.md](./platform-vision.md):

- Epiphany becomes a **marketplace of educational systems**, not single-language app store clones.
- Greek 0.2 validates primitives; creators bring **niche journeys** (heritage learners, exam prep, regional varieties).
- Tutors use the same primitives for homework (dialogue + dictation + weak spot).

---

## System Map for Creators

```
                    ┌──────────────────┐
                    │  Course manifest │
                    └────────┬─────────┘
         ┌───────────────────┼───────────────────┐
         ▼                   ▼                   ▼
    ┌─────────┐        ┌───────────┐       ┌──────────┐
    │ Lessons │        │ Stories   │       │ Quiz     │
    │         │        │ + packs   │       │ profiles │
    └────┬────┘        └─────┬─────┘       └────┬─────┘
         │                   │                  │
         └─────────────┬─────┴──────────────────┘
                       ▼
              ┌─────────────────┐
              │ Guided path     │
              │ (Learn·Pr·Read) │
              └────────┬────────┘
                       ▼
              ┌─────────────────┐
              │ Platform memory │
              │ + progression   │
              └─────────────────┘
```

---

## Summary

The creator course system is the **composition layer** above Epiphany’s primitives: authors bundle lessons, dialogues, quizzes, and paths; the platform supplies rendering, adaptation, unlocks, and calm learner UX. Epiphany 0.2 is the working prototype those bundles will eventually plug into.
