---
name: galiana-soler dev server performance
description: Why the galiana-soler artifact's Vite dev server felt slow, and the fix applied.
---

The scaffold shipped with a full shadcn/ui kit that was almost entirely unused by the actual pages.

**Why it mattered:** Vite's dependency optimizer pre-bundles the whole reachable import graph on cold start and re-optimizes (full page reload) whenever a previously-untouched dependency path is first hit. A large unused scaffold inflates that graph, slowing cold start and causing surprise reload storms during normal dev work.

**How to apply:** When a Vite/React artifact "feels slow" in the dev preview and includes a shadcn-style UI scaffold, grep actual usage of each scaffold component/dependency before assuming the slowness is something else. If usage is near-zero, prune the unused code and dependencies, reinstall, and restart.
