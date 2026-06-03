# Learning Path System

Epiphany guides learners through **intentional sequences** — not infinite menus. The learning path system connects ordered lessons, thematic topics, and cross-pillar guided journeys.

---

## Why Paths Exist

Without paths, learners face **choice paralysis**: dozens of lessons, packs, and practice modes with no story.

Paths provide:

- A **default narrative** — start here, then here.
- **Prerequisite integrity** — past tense reading does not appear before aspect is introduced.
- **Cross-pillar coherence** — Learn, Practice, and Read suggestions align to the same journey.

Paths are recommendations and gates, not rigid rails — explorers can browse topics, but the platform always knows what “next” means.

---

## Core Structures

### Learning Path (`LEARNING_PATH`)

A single ordered array of lesson IDs in `src/features/learn/data/path.js`:

- Core grammar first (articles, present, είμαι, structure, questions).
- Foundations (numbers, survival, prepositions, time).
- Modals and conversation patterns.
- Intermediate block (verb groups, time-and-aspect, past, agreement, compounds).

`getRecommendedNextLesson()` walks this list respecting unlock prerequisites.

### Lesson Prerequisites (`LESSON_PREREQUISITES`)

Directed graph of **hard requirements** per lesson. `isLessonUnlocked()` checks completion before access.

Separate from path order: a lesson can be “next” on the path but locked until prerequisites complete.

### Topics (`LEARN_TOPICS`)

Browse taxonomy grouping lessons by theme (articles, present tense, past tense, advanced roadmap). Topics include:

- `comingSoon` flag for advanced roadmap visibility without content.
- Links to primary lesson via `TOPIC_PRIMARY_LESSON`.

### Guided Paths (`GUIDED_PATHS`)

**Cross-pillar journeys** — each defines:

| Field | Purpose |
|-------|---------|
| `lessonIds` | Learn modules to prioritize |
| `practiceModes` | Suggested Practice activities |
| `readPackIds` | Thematic reading/dialogue packs |
| `readingTier` | Suggested input difficulty band |

Examples: Beginner, Travel Greek, Grammar Mastery, Reading, Time & Action, Conversation.

`GuidedPathsPanel` shows progress (`done/total`) and next lesson.

---

## Progression Philosophy

1. **Understand before produce** — lessons before mastery quizzes.
2. **Produce before long input** — basic conjugation before tier-3 readings.
3. **Spiral return** — guided paths can re-include earlier skills in new contexts (travel path revisits survival phrases).
4. **Visible advanced horizon** — advanced topics marked coming soon so the curriculum feels **large and intentional**.

Beginner / intermediate / advanced are **bands**, not separate apps:

- Beginner: path start, tier-1–2 readings, recognition-heavy quizzes.
- Intermediate: aspect, past, richer dialogues, tier 2–3.
- Advanced: roadmap topics (passive, cases, idioms) + tier 4 natural Greek.

---

## Adaptive Recommendations

Path system collaborates with adaptive layer:

- Home dashboard recommends **next unlocked lesson** on `LEARNING_PATH`.
- Guided path picker suggests **active path** with highest incomplete progress.
- Review Today may point to lesson tied to weak pattern’s topic.
- Smart recommendations bridge weak spots → `TOPIC_PRIMARY_LESSON`.

Paths supply **structure**; adaptation supplies **personalization within** structure.

---

## Learner Profiles

Profiles (`beginner`, `intermediate`, `fluent`) bias:

- `recommendedStartLesson` in profile metadata.
- Default practice difficulty.

They do **not** replace progression unlocks — a fluent profile does not skip prerequisites unless Developer Mode bypass is active.

---

## Connection to Read & Practice

| Mechanism | Link |
|-----------|------|
| `unlockLessons` on packs | Reading gated by lesson completion |
| Guided `readPackIds` | Paths suggest thematic immersion |
| Guided `practiceModes` | Paths suggest drill style |
| `readingTier` on paths | Aligns input with grammar milestone |

Completing *Time & Action* path lessons unlocks past-tales and natural-greek packs — **by design**.

---

## Future Creator-Generated Pathways

Creators should eventually:

1. Select lesson modules from a **catalog** (by id).
2. Attach **practice mode** and **pack** presets.
3. Set **marketing copy** (title, emoji, description).
4. Publish path as versioned JSON validated against a `GuidedPathSchema`.
5. Optionally **fork** official paths for niche audiences (heritage learners, exam prep).

Platform validates:

- No circular prerequisites.
- Referenced lesson/pack IDs exist.
- Tier not wildly mismatched to lesson set (warnings).

Learners could subscribe to **creator paths** alongside official Epiphany paths.

---

## Developer & QA

Developer Mode supports:

- Jump progression presets (beginner / intermediate / advanced lesson sets).
- Learner simulations (struggling, vocab-heavy, grammar-heavy).
- Force-open lessons for content preview.

Paths are testable without playing through entire curriculum.

---

## Summary

The learning path system is Epiphany’s **curriculum spine**: ordered lessons, unlock rules, topic browser, and guided multi-pillar journeys — flexible for explorers, dependable for learners who want to be led.
