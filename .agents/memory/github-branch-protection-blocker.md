---
name: GitHub branch protection blocker
description: Why "require CI to pass before merging" task stalled - no GitHub repo is linked to this project yet
---

This project has no GitHub `origin` remote and no repo among the connected GitHub
account's repos matches its content (pnpm monorepo with artifacts/, ci.yml, etc.).
The account's visible repos (Tragamillas/Tragacripto, Tragamillas/skills-introduction-to-github)
contain unrelated content.

**Why:** Branch protection requires an actual GitHub repo to apply the rule to; you
can't configure protection on a repo that doesn't have this codebase pushed to it.

**How to apply:** Before attempting branch protection setup again, confirm with the user
which GitHub repo (owner/name) this project should live in, and whether it's safe to
push/create it there. Do not assume "the connected account's most-recently-updated repo"
is correct — verify content matches (look for artifacts/, package.json workspaces, etc.)
before pushing.
