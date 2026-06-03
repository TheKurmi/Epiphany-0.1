# Platform Vision

Epiphany 0.2 is a **prototype educational engine** inside the larger **Project Epiphany** vision: a modular ecosystem where learners, creators, and tutors collaborate through shared educational infrastructure.

This document positions the current app relative to that future — not as a finished product, but as proof that the primitives work.

---

## What Epiphany 0.2 Proves

The 0.2 milestone demonstrates:

- A **three-pillar learner experience** (Learn / Practice / Read) that feels cohesive, not bolted together.
- **Structured content** (lessons, stories, vocabulary batches) scalable without monolithic files.
- **Adaptive memory** (weak spots, spaced repetition, mistake patterns) without aggressive gamification.
- **Visual grammar systems** (aspect matrix, study focus) that could transfer to other subjects.
- **Progression gates** that connect grammar study to appropriate reading difficulty.
- **Developer tooling** to test curriculum and learner states before public creator tools exist.

0.2 is the laboratory. The platform is the city built from its blueprints.

---

## Project Epiphany — Long-Term Ecosystem

### Creator-Driven Education

Creators (teachers, linguists, community authors) should eventually:

- Author lessons from **section templates** (tables, drills, aspect matrix, insights).
- Publish **dialogue and story packs** with tier and unlock metadata.
- Define **quiz profiles** tied to topics.
- Assemble **guided paths** linking their content across pillars.
- Optionally sell or share courses within a marketplace layer (out of scope for 0.2).

Epiphany supplies **blocks**. Creators supply **curriculum intent**.

### Flexible Learning Styles

Not every learner wants the same path:

- Path-first learners follow guided journeys.
- Explorers browse topics and reading packs.
- Drill-focused learners live in Practice weak-spot mode.
- Input-focused learners prioritize Read and shadowing.

The platform should **recommend without trapping** — profiles (beginner, intermediate, fluent) hint at defaults, not prisons.

### Tutoring Integration (Future)

Live or async tutoring can sit above the same primitives:

- Tutors assign **packs** or **lessons**.
- Session reports pull from **mistake patterns** and **mastery data**.
- Homework = specific micro-dialogues + dictation sets drawn from shared IDs.

Tutors do not need a parallel content format.

### Educational Ecosystems

Epiphany may host multiple **languages** or **domains** (Modern Greek today; potentially Ancient Greek, Cypriot varieties, or non-language pattern drills) by swapping:

- Content registries (vocab, stories, lessons).
- Chart data (matrix cells, transformation families).
- TTS and locale settings.

Core engines (quiz generator shape, memory layer, progression model) remain.

---

## Modular Reusable Systems (Platform Primitives)

From 0.2, these primitives are candidates for **platform-level packages**:

| Primitive | Reuse potential |
|-----------|-----------------|
| Story / dialogue schema | Any dialogue-based course |
| Vocabulary registry + batches | Any leveled lexicon |
| Quiz profile + generator | Topic-tagged assessments |
| Mastery level ladder | Recognition → production progression |
| Spaced repetition + mistake taxonomy | Any skill app |
| Aspect / time matrix framework | Languages with aspect (Slavic, Arabic, etc.) |
| Guided path definition | Multi-module courses |
| Reading tier model | Graded reader platforms |
| Study Focus overlay | Any visual didactic content |

Each primitive is documented under `/docs` for handoff to future teams or AI agents.

---

## Adaptive Educational Infrastructure

“Adaptive” in Project Epiphany means:

- Systems observe **patterns of error**, not just wrong answers.
- Resurfacing is **explainable** (“you often confuse ει/ι”).
- Difficulty rises when **comprehension signals** support it (lessons complete, tiers unlocked).

It does **not** mean opaque ML ranking of content — at least not in early platform phases. Transparency supports trust for creators and tutors.

---

## Epiphany 0.2 → Platform Roadmap (Conceptual)

1. **Stabilize primitives** — schemas, registry, memory APIs frozen enough for creators.
2. **Authoring tools** — validate JSON/JS content against schemas; preview in app.
3. **Creator accounts & publishing** — versioned content packs.
4. **Marketplace / sharing** — discovery, ratings, remix.
5. **Multi-tenant / multi-language** — isolate content trees per subject.
6. **Tutor dashboard** — assign, report, message.

0.2 completes step 1 in prototype form.

---

## Relationship to This Repository

| Layer | Location | Role |
|-------|----------|------|
| Learner app | `src/features/*` | Greek 0.2 experience |
| Shared engines | `src/shared/*`, `src/data/*` | Cross-pillar logic |
| Schemas | `src/schemas/content.js` | Contract for future authoring |
| Documentation | `/docs` | Blueprint & philosophy |
| Developer tools | `src/app/dev/*` | Internal QA & simulation |

Contributors should treat `/docs` as the **narrative source of truth** for *why*; code is the *what*.

---

## Closing Orientation

Epiphany 0.2 asks: *Can one language learning product feel like a guided immersion journey built from reusable parts?*

Project Epiphany asks: *Can thousands of creators build those journeys on shared educational infrastructure?*

The answer to the second question begins with documenting and hardening the first.
