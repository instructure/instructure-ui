---
description: Create a commit following InstUI conventions with HUSKY=0
---

Create a commit following the Instructure UI commit conventions:

## Format Requirements

Use Conventional Commits format:
```
type(scope): subject

[optional body]
Document any breaking changes here with BREAKING CHANGE: prefix

[optional footer]
```

**Types**: feat, fix, docs, style, refactor, test, chore

**Scope**: Full package name as-is (e.g., ui-button, ui-select). Use comma-separated for multiple packages, `many` for many packages, or omit for repo-wide changes.

**Subject**: Brief imperative description (e.g., "add loading state", not "adds" or "added")

## Breaking Changes

Mark breaking changes with an exclamation mark after scope and document in body:
```
feat(ui-select)!: remove deprecated onOpen prop

BREAKING CHANGE: The onOpen prop has been removed. Use onShowOptions instead.
```

Breaking changes include:
- Removing/renaming props or components
- Changing prop types or behavior
- Changing defaults that affect behavior
- Removing theme variables or exports

## Commit Footer

Always include:
```
🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

## Process

1. Run `git status` and `git diff` to see changes
2. Analyze the changes and draft appropriate commit message
3. Add files to staging if needed: `git add <files>`
4. Create commit with `HUSKY=0 git commit -m "$(cat <<'EOF'
[commit message here with proper footer]
EOF
)"`
5. Run `git status` after to verify

**Important**: Use HUSKY=0 prefix to skip interactive prompt since AI can't interact with it.
