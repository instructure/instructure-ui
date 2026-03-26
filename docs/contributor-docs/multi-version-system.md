---
title: Multi-Version System
category: Contributor Guides
order: 8
---

# Multi-Version System

## Overview

When we need to introduce breaking changes to a component, we don't modify the existing version in place. Instead, we create a new version of the component in a separate folder, preserving the old version as-is. This ensures that consumers on older library versions can upgrade to new versions of InstUI without breaking changes.

Each component version lives in a numbered directory (`v1`, `v2`, `v3`, ...) inside the component's own folder under `src/` (e.g., `packages/ui-alerts/src/Alert/v1/`, `packages/ui-alerts/src/Alert/v2/`). A system of lettered export files and `package.json` exports ties these versions to specific library minor versions.

## Key Concepts

- **Component version** (`v1`, `v2`, `v3`): A directory containing a complete, self-contained implementation of a component.
- **Lettered export file** (`a.ts`, `b.ts`, `c.ts`): A file under `src/exports/` that re-exports all components in a package at specific versions. Each letter represents a snapshot of the package's public API.
- **Library version** (`v11_6`, `v11_7`): A minor version of the InstUI library. Each library version maps to a lettered export in every package.
- **`latest` export path**: Always points to the newest lettered export. Used by the newest component versions to reference other packages at their most current implementation.
- Multiple library versions can point to the same component version (e.g., both `v11_6` and `v11_7` may export Alert from `v1` if no breaking change was introduced).
- **Default (`"."`) export**: Always points to the **oldest** lettered export (`a.ts`). This ensures that consumers who upgrade without changing their import paths get the version they were already using, preventing unexpected breakage.

## How It All Fits Together

Take `@instructure/ui-alerts` as an example:

```sh
---
type: code
---
packages/ui-alerts/src/
├── Alert/
│   ├── v1/          # Original implementation
│   │   ├── index.tsx
│   │   ├── props.ts
│   │   ├── README.md
│   │   ├── styles.ts
│   │   └── theme.ts
│   └── v2/          # Breaking changes introduced here
│       ├── index.tsx
│       ├── props.ts
│       ├── README.md
│       ├── styles.ts
│       ├── theme.ts
│       └── __tests__/
│           └── Alert.test.tsx
├── exports/
│   ├── a.ts         # Exports Alert from v1
│   └── b.ts         # Exports Alert from v2
```

The package's `package.json` `exports` field maps library versions to lettered exports:

```json
---
type: code
---
{
  "exports": {
    "./lib/*": "./lib/*",
    "./es/*": "./es/*",
    "./types/*": "./types/*",
    "./package.json": "./package.json",
    "./src/*": "./src/*",
    ".": {
      "src": "./src/exports/a.ts",
      "types": "./types/exports/a.d.ts",
      "import": "./es/exports/a.js",
      "require": "./lib/exports/a.js",
      "default": "./es/exports/a.js"
    },
    "./v11_6": {
      "src": "./src/exports/a.ts",
      "types": "./types/exports/a.d.ts",
      "import": "./es/exports/a.js",
      "require": "./lib/exports/a.js",
      "default": "./es/exports/a.js"
    },
    "./v11_7": {
      "src": "./src/exports/b.ts",
      "types": "./types/exports/b.d.ts",
      "import": "./es/exports/b.js",
      "require": "./lib/exports/b.js",
      "default": "./es/exports/b.js"
    },
    "./latest": {
      "src": "./src/exports/b.ts",
      "types": "./types/exports/b.d.ts",
      "import": "./es/exports/b.js",
      "require": "./lib/exports/b.js",
      "default": "./es/exports/b.js"
    }
  }
}
```

- `"."` → `a.ts` (oldest, for backwards compatibility)
- `./v11_6` → `a.ts` (Alert v1)
- `./v11_7` → `b.ts` (Alert v2)
- `./latest` → `b.ts` (always the newest)

## Adding a New Component Version

### When to create a new version

Create a new component version whenever you need to introduce a **breaking change** — removing/renaming props, changing behavior, altering types, removing theme variables, etc.

### Step-by-step

We'll walk through an example: adding a `v3` of `Alert` in `@instructure/ui-alerts`, assuming the current library version is `11.7`.

#### 1. Create the new version

From the component's directory, run:

```bash
---
type: code
---
OLD=v2 NEW=v3 && git mv $OLD $NEW && cp -r $NEW $OLD && git add $OLD
```

This does three things in order:

1. `git mv v2 v3` — renames the directory so `v3` inherits full `git blame` history
2. `cp -r v3 v2` — recreates `v2` as a frozen copy (loses blame history, which is fine)
3. `git add v2` — stages the recreated copy

**Why `git mv` instead of copying?** Plain `git blame` (used by every IDE) only traces history through renames, not copies. If you copy files to create a new version, all blame is lost — every line shows the copy commit as its author.

#### 2. Freeze the old version

The version that was previously the latest (`v2` in this case) must be frozen:

1. **Pin internal cross-package imports.** Any imports from other versioned `@instructure/*` packages that use the `/latest` subpath must be changed to the current released version. For example:

   ```diff
   ---
   type: code
   ---
   - import { View } from '@instructure/ui-view/latest'
   + import { View } from '@instructure/ui-view/v11_7'
   ```

   This freezes the old version to a known, working state. Only packages that have versioning (i.e., those with `./vX_Y` entries in their `exports` field) need this treatment. Non-versioned packages like `@instructure/emotion` are left as-is.

#### 3. Make breaking changes in the new version

In `v3`, make whatever breaking changes are needed. The new version's internal imports should use `/latest` subpaths to always reference the newest implementations of other packages:

```ts
---
type: code
---
import { View } from '@instructure/ui-view/latest'
```

#### 4. Create a new lettered export file

Add a new export file under `src/exports/`. The letter increments alphabetically (`a.ts` → `b.ts` → `c.ts`).

This file must export **all** components in the package at their latest versions — not just the one that changed. If `ui-alerts` also exported an `InlineAlert` that didn't get a new version, the new export file still includes it:

```ts
---
type: code
---
// src/exports/c.ts
export { Alert } from '../Alert/v3'
export type { AlertProps } from '../Alert/v3/props'
export { InlineAlert } from '../InlineAlert/v2' // unchanged, still at its latest
export type { InlineAlertProps } from '../InlineAlert/v2/props'
```

#### 5. Update `package.json` exports

Check the monorepo-wide version (every `package.json` shares the same `version` field). If the current version is `11.7`, the new library version is `11.8`.

Add the new version entry and update `./latest`:

```json
---
type: code
---
{
  "exports": {
    "./lib/*": "./lib/*",
    "./es/*": "./es/*",
    "./types/*": "./types/*",
    "./package.json": "./package.json",
    "./src/*": "./src/*",
    ".": {
      "src": "./src/exports/a.ts",
      "types": "./types/exports/a.d.ts",
      "import": "./es/exports/a.js",
      "require": "./lib/exports/a.js",
      "default": "./es/exports/a.js"
    },
    "./v11_6": {
      "src": "./src/exports/a.ts",
      "types": "./types/exports/a.d.ts",
      "import": "./es/exports/a.js",
      "require": "./lib/exports/a.js",
      "default": "./es/exports/a.js"
    },
    "./v11_7": {
      "src": "./src/exports/b.ts",
      "types": "./types/exports/b.d.ts",
      "import": "./es/exports/b.js",
      "require": "./lib/exports/b.js",
      "default": "./es/exports/b.js"
    },
    "./v11_8": {
      "src": "./src/exports/c.ts",
      "types": "./types/exports/c.d.ts",
      "import": "./es/exports/c.js",
      "require": "./lib/exports/c.js",
      "default": "./es/exports/c.js"
    },
    "./latest": {
      "src": "./src/exports/c.ts",
      "types": "./types/exports/c.d.ts",
      "import": "./es/exports/c.js",
      "require": "./lib/exports/c.js",
      "default": "./es/exports/c.js"
    }
  }
}
```

### Multi-component packages

A package may contain multiple components (e.g., a hypothetical `ui-alerts` with both `Alert` and `InlineAlert`). Breaking changes can happen to each component independently.

### Cascading breakage

Because every latest component version imports other packages via the `/latest` subpath, introducing a breaking change to one component can break other components that depend on it. This is normal and expected.

However, a broken build alone is **not** sufficient reason to create a new version of the affected components. A new version is only warranted if the fix required to adapt to the upstream change would itself be a breaking change. If the fix is purely internal and doesn't affect the component's API or visual output, simply update the latest version in place.

For example, suppose `View` gets a `v2` that removes a prop. `Alert` imports `View` via `/latest`, so after the change it receives the new `View` and it breaks in some way. If fixing `Alert` only requires internal adjustments (e.g., stopping use of the removed prop) without changing Alert's own API or visual output, just update Alert's latest version in place. But if the fix would alter Alert's props or visual appearance in a way that could affect consumers, then a new Alert version (`v3`) is needed.

## Testing

Only the latest version of each component is tested and supported. Older versions are frozen and considered stable. When you create a new version, ensure the `__tests__/` directory lives in the new version's folder and that all tests pass:

```bash
---
type: code
---
pnpm run test:vitest ui-alerts
```

Both Cypress component tests and visual regression tests use the `/latest` versions, so they always test the newest implementation. If they break after a change, they need to be fixed as part of that change.

## Versioning and Releases

Traditional semantic versioning does not apply to the **InstUI library**. Instead:

- **Breaking changes** are released as **minor** version bumps (e.g., `11.7` → `11.8`).
- **Everything else** (bug fixes, new features, non-breaking changes) is released as a **patch** bump (e.g., `11.7.0` → `11.7.1`).
- **Major version bumps** are never triggered automatically from commit messages. They must be initiated manually (`pnpm run bump --releaseType major`) and will be extremely rare. A major bump would be used for fundamental changes that cannot be handled by the multi-version system — such as dropping support for a React version, overhauling the theming architecture, or housekeeping when accumulated component versions grow too numerous and need to be cleaned up.

### The bump script

Releases are prepared by running:

```bash
---
type: code
---
pnpm run bump
```

This script calculates the next version based on the commits since the last release. If the next version is a **patch**, it simply increments the patch number across all packages — no export changes are needed.

If the next version is a **minor** bump (e.g., `11.7` → `11.8`), the script does additional work:

1. **Updates every `ui-*` package's `package.json`:** For each package that does not already have a `./v11_8` entry in its `exports` field, the script adds one. For packages where nothing changed, `./v11_8` points to the same lettered export as `./v11_7` — it's effectively a copy.

2. **Updates the `@instructure/ui` meta package:** If there is no `src/v11_8.ts` file yet, the script creates one by copying `src/v11_7.ts` and replacing all `/v11_7` import subpaths with `/v11_8`. For example:

   ```diff
   ---
   type: code
   ---
   - export { Alert } from '@instructure/ui-alerts/v11_7'
   + export { Alert } from '@instructure/ui-alerts/v11_8'
   ```

If a `v11_8` entry or file already exists (because a developer manually added it when introducing a breaking change or a new component), the script leaves it as-is.

### Why entries may already exist

When you add a breaking change to a component, you manually add the new `./v11_8` entry to that package's exports (as described in the step-by-step above). The bump script then fills in the same entry for all the other packages that don't have it yet. Similarly, if a new component is added to the umbrella package, you may have already created the `v11_8.ts` file in `@instructure/ui` — the bump script won't overwrite it.

## Codemods

- TODO: Document codemods for migrating consumers between component versions.
- TODO: Add a codemod that validates all internal cross-package imports use proper versioned or `/latest` subpaths.

## Summary of steps needed to add a new version of a component

1. **`git mv`** the current latest version to a new `vX` directory, then recreate the old version as a copy (see the one-liner in step 1 above)
2. **Freeze** the old version: pin `/latest` imports to the current released version
3. **Implement** breaking changes in the new version (keep `/latest` imports)
4. **Create** a new lettered export file that exports all components at their latest versions
5. **Update** `package.json` exports: add the new `./vX_Y` entry and point `./latest` to the new letter

For information on how documentation is versioned alongside components, see the [Docs Versioning](/#contributor-guides/#docs-versioning) guide.
