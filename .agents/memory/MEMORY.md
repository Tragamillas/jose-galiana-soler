# Memory Index

- [Galiana Soler investigations data model](galiana-soler-investigations.md) — investigations homepage list is data-driven (INVESTIGATIONS array) to support search/filter; keep new bios in that shape.
- [Galiana Soler dev server performance](galiana-soler-dev-perf.md) — slow Vite dev preview was caused by an unused full shadcn/ui scaffold bloating dependency optimization; check real usage before assuming other causes.
- [API server testing approach](api-server-testing.md) — route tests mock only the `db` export from @workspace/db, keep real table exports; vi.hoisted needed for the mock reference.
- [GitHub branch protection blocker](github-branch-protection-blocker.md) — no GitHub repo actually matches/holds this project; verify repo content before pushing or configuring branch protection.
