# Multi-Version Documentation

The docs site supports showing documentation for multiple library minor versions (e.g. v11.5, v11.6). This allows users to switch between versions in the UI and see the correct component implementations and documentation for each.

## How it works

### Build pipeline

1. `buildScripts/utils/buildVersionMap.mts` scans package `exports` fields to discover which library versions exist (e.g. `v11_5`, `v11_6`).
2. `buildScripts/build-docs.mts` processes all source/markdown files once, then filters them per library version using the version map. Each version gets its own output directory (`__build__/docs/v11_5/`, `__build__/docs/v11_6/`).
3. A `docs-versions.json` manifest is written with `libraryVersions` and `defaultVersion`.

### Runtime (client)

1. On load, the App fetches `docs-versions.json` to discover available minor versions.
2. The Header renders a version dropdown if multiple versions exist.
3. When the user switches versions:
   - `updateGlobalsForVersion(version)` in `globals.ts` re-populates the global scope with the correct component implementations (so interactive code examples use the right version).
   - The App re-fetches `docs/{version}/markdown-and-sources-data.json` for the documentation data.
4. `getComponentsForVersion(version)` in `component-overrides.ts` returns the full component map: default components merged with any version-specific overrides.

### Component overrides

`packages/__docs__/component-overrides.ts` is the single source of truth for version-specific component differences. It works by:

1. Importing `DefaultComponents` from `./components` (these are the v11_5 / baseline components).
2. Importing only the components that **differ** in a given version from their versioned subpath (e.g. `@instructure/ui-avatar/v11_6`).
3. Building an override map per version.
4. `getComponentsForVersion(version)` spreads overrides on top of defaults.

Versions with no overrides (like `v11_5`) simply return the defaults.

## Adding a new library version (e.g. v11_7)

1. **Ensure packages export the new subpath.** Each package that has version-specific code must have a `/v11_7` export in its `package.json` `exports` field.

2. **Update `component-overrides.ts`:**
   - Add import statements for the components that differ in v11_7 (use `_v11_7` suffix aliases).
   - Create a `v11_7_overrides` object mapping component names to the new imports.
   - Add `v11_7: v11_7_overrides` to the `overridesByVersion` registry.

3. **Rebuild docs:** `pnpm run build:docs` — the build will automatically discover the new version via the version map and generate output for it.

## Migrating a component to v2 within an existing version

If a component (e.g. `Checkbox`) is refactored to a functional component for v11_6:

1. Add the v2 implementation under the package's versioned directory (e.g. `packages/ui-checkbox/src/Checkbox/v2/`).
2. Update the package's `exports` so `/v11_6` re-exports the v2 implementation.
3. Add the import and override entry in `component-overrides.ts` under the `v11_6` section.

## Key files

| File | Purpose |
|------|---------|
| `packages/__docs__/components.ts` | Default component exports (baseline / v11_5) |
| `packages/__docs__/component-overrides.ts` | Version-specific overrides + `getComponentsForVersion()` |
| `packages/__docs__/globals.ts` | Populates global scope for interactive examples |
| `packages/__docs__/src/App/index.tsx` | Docs app — handles version switching |
| `packages/__docs__/src/versionData.ts` | Fetches version manifest at runtime |
| `packages/__docs__/buildScripts/build-docs.mts` | Build pipeline — generates per-version JSON |
| `packages/__docs__/buildScripts/utils/buildVersionMap.mts` | Discovers versions from package exports |
