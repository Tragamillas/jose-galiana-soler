---
name: Galiana Soler investigations data model
description: Where investigation homepage entries live and how editors add new ones.
---

Investigations shown on the Home page (`artifacts/galiana-soler/src/pages/Home.tsx`) are loaded
from `artifacts/galiana-soler/src/data/investigations.json`, not hardcoded in the TSX file.

**Why:** non-developer editors need to add new biography entries (title, period, tags, summary)
without touching TypeScript. JSON keeps the same `Investigation` shape the search/filter logic
already expects, so no other code changes are needed when the array grows.

**How to apply:** when adding/removing fields on an investigation, update the `Investigation` type
in `Home.tsx` and document the field in `artifacts/galiana-soler/src/data/README.md` (which has the
full field reference and an example editors can copy).
