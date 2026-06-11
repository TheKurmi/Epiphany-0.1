# Epiphany 0.2 — Systems Overview

Epiphany 0.2 is an **experimental educational engine** for Modern Greek. It is not a flashcard app with lessons bolted on — it is a set of **reusable educational primitives** arranged around three learner-facing pillars: **Learn**, **Practice**, and **Read**.

This document describes how those systems fit together at a platform level. Implementation details live in `src/`; philosophy and direction live here.

---

## The Three Pillars

| Pillar | Role | Primary primitives |
|--------|------|------------------|
| **Learn** | Structured understanding — grammar, patterns, visual models | Lessons, charts, mastery quizzes, reference |
| **Practice** | Active recall and skill reinforcement | Flashcards, typing, dictation, weak-spot, sentence builder |
| **Read** | Comprehensible input in context | Micro-stories, dialogues, guided reading, listen-along |

The pillars are **intentionally separate surfaces** with **shared infrastructure** underneath. A learner does not “finish Learn” and never return — the same vocabulary registry, memory layer, and progression gates connect all three.

```
                    ┌─────────────────┐
                    │   Home / Path   │
                    │  (orchestration)│
                    └────────┬────────┘
           ┌─────────────────┼─────────────────┐
           ▼                 ▼                 ▼
      ┌─────────┐      ┌───────────┐     ┌─────────┐
      │  Learn  │◄────►│  Practice │◄───►│  Read   │
      └────┬────┘      └─────┬─────┘     └────┬────┘
           │                 │                 │
           └────────────┬────┴────────────────┘
                        ▼
              ┌───────────────────┐
              │ Shared substrate  │
              │ vocab · memory ·  │
              │ progression · TTS │
              └───────────────────┘
```

---

## Shared Substrate (Why Modularity Matters)

Several systems are **pillar-agnostic**. They exist so content and pedagogy can scale without rewriting UI:

- **Vocabulary registry** — single source of truth for word metadata; consumed by flashcards, stories, hints, and future creator uploads.
- **Progression & unlocks** — lessons completed unlock reading packs; mastery and path order gate difficulty.
- **Memory layer** — spaced repetition, weak-pattern tracking, mistake classification, unified attempt recording.
- **Content schemas** — lessons, stories, exercises share documented shapes (`src/schemas/content.js`).
- **Access control** — central `isLessonUnlocked` / `isPackUnlocked` with optional developer bypass for testing.
- **Grammar & insight modules** — verb transformations, time/action hints, sentence patterns, conversation glue — reused in Learn charts, Read hints, and lessons.

New Greek content should **plug into** these systems, not fork them.

---

## Adaptive Learning Philosophy (Calm, Not Casino)

Epiphany adapts through **contextual resurfacing**, not XP ladders:

- Weak patterns from practice feed **Weak Spot** mode and **Review Today**.
- Spaced repetition schedules vocabulary and pattern keys.
- Mistake categories (vowel confusion, tense selection, articles) inform recommendations.
- Confidence messages describe **understanding growth** (“You are recognizing past ongoing forms”) rather than points.

The design goal: the learner feels **guided and capable**, not gamified into anxiety.

See [adaptive-review-system.md](./adaptive-review-system.md) and [educational-philosophy.md](./educational-philosophy.md).

---

## Progressive Difficulty (Vertical Integration)

Difficulty evolves on multiple axes that **align but do not duplicate**:

| Axis | Mechanism |
|------|-----------|
| Lesson path | Ordered `LEARNING_PATH` with prerequisite unlocks |
| Guided paths | Cross-pillar journeys (Travel, Time & Action, Conversation) |
| Reading tiers | Levels 1–4 — present → past → aspect-rich Greek |
| Mastery levels | Per-topic quizzes: recognition → production → sentences → mixed |
| Practice modes | Configurable difficulty; dictation and typing use pattern tags |

A concept introduced in Learn (e.g. aspect) should **reappear** in Read dialogues and Practice weak-spot drills without the learner memorizing it in isolation.

---

## Visual & Conceptual Systems

Greek time and action are taught through **visual grammar**, not rule lists first:

- **Aspect matrix** — Quality of Time × Quantity of Action (3×3 grid).
- **Study Focus mode** — distraction-free chart overlay with zoom and escape.
- **Verb transformation families** — ongoing → complete sound patterns (παίζω → παίξω).
- **Timelines and pattern strips** — lesson section types for structural intuition.

These form the **chart engine** — potentially portable to other languages with different grid data.

See [chart-engine.md](./chart-engine.md).

---

## Dialogue & Reading as Primitives

Dialogues are not “extra stories.” They are **conversational primitives**:

- Micro-dialogues (2–4 lines) for shadowing and high-frequency rhythm.
- Medium and long exchanges in themed packs.
- Shared story schema: sentences, optional highlights, comprehension, inline vocabulary.

The same sentence can power read-aloud, dictation prompts, and future quiz generation.

See [dialogue-system.md](./dialogue-system.md) and [reading-system.md](./reading-system.md).

---

## Developer & Creator Future

Epiphany 0.2 ships with **Developer Mode** (isolated testing, progression simulation, memory injection) to validate systems before creators touch them.

The long-term direction: **creators assemble courses from blocks** — lessons, dialogues, packs, quizzes, paths — validated against schemas.

See [creator-course-system.md](./creator-course-system.md) and [platform-vision.md](./platform-vision.md).

---

## Platform Layer (Phase 1)

Code: `src/platform/` — content schemas, engine registry, adaptive module map, creator capability contracts.

Architecture: **[PLATFORM_ARCHITECTURE.md](./PLATFORM_ARCHITECTURE.md)** — engine vs content separation, primitives, flows.

---

## Document Map

| Document | Focus |
|----------|--------|
| [PLATFORM_ARCHITECTURE.md](./PLATFORM_ARCHITECTURE.md) | Platform transition, engines vs content, primitives |
| [educational-philosophy.md](./educational-philosophy.md) | Why Epiphany teaches the way it does |
| [platform-vision.md](./platform-vision.md) | Project Epiphany ecosystem |
| [learning-path-system.md](./learning-path-system.md) | Paths, lessons, guided journeys |
| [progression-system.md](./progression-system.md) | Unlocks, tiers, mastery |
| [dialogue-system.md](./dialogue-system.md) | Conversational content primitive |
| [reading-system.md](./reading-system.md) | Packs, stories, tiers |
| [quiz-engine.md](./quiz-engine.md) | Assessment & generators |
| [chart-engine.md](./chart-engine.md) | Visual grammar systems |
| [adaptive-review-system.md](./adaptive-review-system.md) | Memory, review, weak spots |
| [content-schema.md](./content-schema.md) | Vocabulary & content shapes |
| [creator-course-system.md](./creator-course-system.md) | Creator-facing modularity |

---

## Version Note

Epiphany 0.2 content version: `0.2.0` (see `CONTENT_VERSION` in schemas). Documentation describes the **system design** at this milestone; file counts and pack lists will grow without changing the architectural story.
