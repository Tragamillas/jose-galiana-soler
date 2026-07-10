---
name: api-server testing approach
description: How route integration tests in artifacts/api-server are set up (vitest + supertest, db mocked, not a real database)
---

`artifacts/api-server` uses vitest + supertest for route integration tests, run via `pnpm run test` (wired into the root `test` script alongside `typecheck`).

Routes call `db` from `@workspace/db` directly (no repository/DAL layer), and `@workspace/db` throws at import time if `DATABASE_URL` is unset. Tests mock only the `db` export via `vi.mock("@workspace/db", async (importOriginal) => ({ ...await importOriginal(), db: <mock> }))`, keeping real table/schema exports so `eq()`/`asc()` calls against real columns still work. A `vi.hoisted` indirection object is needed because `vi.mock` factories are hoisted above local `const` declarations.

**Why:** No test database is provisioned, and hitting a real DB would make tests slow/flaky and risk mutating real content. Keeping real table objects avoids reimplementing drizzle's query builder in mocks.

**How to apply:** When adding new admin-token-protected CRUD routes, follow the same pattern — mock `db`'s chainable methods (`select().from().orderBy()`, `insert().values().returning()`, etc.) to return configurable arrays, and set `ADMIN_API_TOKEN`/`DATABASE_URL` fallbacks in `src/test/setup.ts`.
