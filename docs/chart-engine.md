# Chart Engine

Visual systems in Epiphany teach **relationships**, not lists. The chart engine is the reusable layer for matrices, conjugation tables, and reference diagrams — starting with Greek aspect–time, designed to generalize.

---

## Purpose

Learners often fail Greek tenses because they memorize **labels** without a **coordinate system**. Charts answer:

- Where does this tense sit relative to **time** and **action quality**?
- How do **endings** pattern across persons?
- What does “one-time past” mean vs “ongoing past” **intuitively**?

Charts are **explorable references**, not posters — expandable focus mode, multiple view lenses, live examples.

---

## Flagship: Aspect–Time Matrix

The **Quality of Time × Quantity of Action** grid (`aspect.js`) is a 3×3 pedagogical model:

**Columns** — when (past / present / future).  
**Rows** — how action is viewed (continuous / summary / completed).

Each cell (`ASPECT_MATRIX_CELLS`) carries:

| Field role | Learner value |
|------------|---------------|
| `intuitiveText` | Human-friendly label (“Did it once”) |
| `tenseGreek` / `tenseEnglish` | Formal names when ready |
| `examplePlay` / `exampleRead` | Parallel verbs (παίζω / διαβάζω) |
| `insight` | One-sentence teaching note |
| `valid` | Empty cells explain *why* Greek has no form there |

**View modes** (`MATRIX_VIEW_MODES`):

1. **Intuition** — no jargon.
2. **Grammar** — Greek + English terminology.
3. **Examples** — live verb forms with stem highlighting.

This tri-mode design supports **acquisition-first** learners and **analytic** learners on the same grid.

---

## Expandable Focus Mode

`StudyFocusShell` + `AspectMatrix` provide:

- **Compact grid** in lesson/reference context.
- **Focus expansion** — full-screen study with detail panel for selected cell.
- **PatternText** — stem/ending highlight on examples.
- **Body scroll lock** — ADHD-friendly deep focus without layout jump.

The pattern is reusable: any future chart (cases, pronouns, CEFR bands) can wrap the same shell.

---

## Foundational Charts Catalog

Beyond the matrix, `foundational-charts.js` groups **reference charts**:

- Conjugation paradigms (present, past families).
- Article–gender tables.
- Pronoun and possessive layouts.
- Lesson-linked diagrams surfaced in **Learn → Reference / Charts**.

Charts are **data-first** — UI components render from structured records, not hardcoded JSX per chart.

---

## Visual Learning Philosophy

- **Spatial memory** — position on a grid beats alphabetical tense lists.
- **Progressive disclosure** — intuition before terminology.
- **Invalid cells as teaching** — the empty “present-summary” cell explains aorist vs present.
- **Parallel examples** — two verb families show the system is general.
- **Calm aesthetics** — dark-mode native, no chartjunk.

---

## Connection to Lessons & Read

- **Time & Action** lesson embeds the matrix as the conceptual spine.
- `timeActionHints` on reading sentences link **surface forms** back to matrix intuition.
- Verb transformation stacks (`VERB_TENSE_STACKS`) align chart cells with producible drills.
- Mastery quizzes on `time-and-aspect` topic reinforce cells the learner has visited.

Charts are **maps**; lessons are **routes**; reading is **terrain**.

---

## Reusable Chart Architecture

```
  Chart data module (cells, rows, cols, modes)
           │
           ▼
  Presentational component (matrix, table, diagram)
           │
           ▼
  StudyFocusShell (optional fullscreen)
           │
           ▼
  PatternText / grammarHighlight (examples)
```

**Contract for new charts:**

- Declare dimensions (rows/cols or axes).
- Each cell: validity, labels per view mode, examples, insight.
- Register in reference catalog with `id`, `title`, `lessonLinks[]`.

No chart should be a one-off PNG — everything should be **data-driven and themeable**.

---

## Future Multi-Subject Chart Systems

The matrix model abstracts to any language with **aspectual or temporal contrasts**:

| Subject | Possible grid |
|---------|----------------|
| Greek | Time × aspect (current) |
| Spanish | Mood × time (indicative/subjunctive) |
| Japanese | Politeness × tense |
| Music theory | Scale × mode |
| Logic | Premise × conclusion templates |

Epiphany 0.2 proves the **interaction pattern** (multi-mode, focus, invalid cells). Future subjects swap `ASPECT_MATRIX_CELLS` for their ontology while keeping StudyFocusShell and reference navigation.

---

## Creator Extensibility

Creators could eventually:

- Author **custom cells** with examples and insights.
- Link charts to **lesson modules** in their course.
- Export **print-friendly** layouts from the same data (platform feature).

Validation ensures every cell has at least one view mode populated and examples use allowed character sets.

---

## Summary

The chart engine turns abstract grammar into **navigable visual systems**. The aspect–time matrix is the reference implementation; the architecture is built to scale across topics, subjects, and creator-authored reference libraries.
