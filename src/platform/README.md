# Epiphany Platform Layer (`src/platform`)

Phase 1 **foundational structure** — not a full backend or creator marketplace.

## Purpose

Separate **educational engines** from **educational content**. Greek 0.2 remains the experimental implementation; this folder defines reusable shapes and registries.

## Layout

| Directory | Role |
|-----------|------|
| `content-schema/` | TypeScript object definitions (lesson, dialogue, quiz, chart) |
| `types/` | Shared educational types (difficulty, tags, contexts) |
| `engines/` | Engine registry (where runtime lives today) |
| `primitives/` | Primitive catalog |
| `adaptive-systems/` | Module map + re-exports of memory layer |
| `creator-tools/` | Future creator capability contracts |
| `utils/` | Adapters (legacy → platform) and light validation |
| `separation.ts` | System vs content path reference |

## Usage

- **Do not** mass-migrate features in Phase 1.
- **Do** use `@/platform` for new cross-subject or creator-prep code.
- **Adapters** in `utils/adapters.ts` convert Greek stories/lessons when needed.

## Docs

See `/docs/PLATFORM_ARCHITECTURE.md`.
