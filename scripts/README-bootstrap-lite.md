# bootstrap-lite

A lightweight validation script optimized for AI tools and quick validation of code changes.

## ⚠️ Prerequisites

**You must run full bootstrap at least once before using bootstrap:lite:**

```bash
npm run bootstrap
```

`bootstrap:lite` is designed for **validating changes** in an already-bootstrapped repository. It won't work on a clean/fresh clone because it depends on existing build artifacts from dependencies.

## Usage

```bash
npm run bootstrap:lite
```

### Options

**Force rebuild (bypass cache):**

```bash
npm run bootstrap:lite --force
```

**With linting:**

```bash
npm run bootstrap:lite --lint
```

**Both force and lint:**

```bash
npm run bootstrap:lite --force --lint
```

## What it does

1. **Check TypeScript references consistency** - Verifies that package.json dependencies match tsconfig.build.json references
2. **Build TypeScript types** - Generates `.d.ts` type declaration files in `types/` directories
   - **Note:** Type building inherently validates all types - the build will fail if there are any type errors, so you get validation for free!
3. **Optional linting** - With `--lint` flag, runs linting on changed files only

## What it skips (vs full bootstrap)

- ❌ Clean step (no file deletion)
- ❌ Babel builds (no transpilation to `lib/` and `es/` directories)
- ❌ Icon generation
- ❌ Token generation

## Performance

- **bootstrap:lite**: ~1-2 minutes ⚡ (or ~1 second with build cache!)
- **bootstrap:lite --force**: ~1-2 minutes ⚡ (bypasses cache, rebuilds everything)
- **bootstrap**: ~5-10 minutes 🐌

**Still 3-5x faster!**

### Why is it so fast?

TypeScript uses **incremental build cache** (`.tsbuildinfo` files). When you run `bootstrap:lite`:

1. **First run after changes**: Rebuilds only the packages you modified and their dependents (~1-2 minutes)
2. **No changes**: TypeScript checks timestamps/content and skips building (~1 second) ⚡
3. **With --force flag**: Bypasses cache and rebuilds everything (~1-2 minutes)

This is the magic of TypeScript's project references! The speed is legitimate - TypeScript is smart enough to skip unnecessary work.

## When to use

### Use `bootstrap:lite` for:

- ✅ AI tool backtesting and prompt validation
- ✅ Quick validation during development
- ✅ Building TypeScript types for IDE support
- ✅ Checking if your TypeScript changes compile
- ✅ Pre-commit checks (faster feedback)

### Use full `bootstrap` when:

- 🔨 You need to run the dev server (`npm run dev`) - requires Babel builds
- 🔨 You need runtime JavaScript in `lib/` and `es/` directories
- 🔨 You're testing actual runtime behavior
- 🔨 You're preparing for release/publish
- 🔨 You need icons or tokens generated

## Example workflow for AI backtesting

```bash
# FIRST TIME ONLY: Bootstrap the project fully
npm run bootstrap

# Now make code changes with AI
# ...

# Quick validation of changes (much faster than full bootstrap)
npm run bootstrap:lite

# If successful, run tests on specific package
npm run test:vitest -- packages/ui-menu

# If all good, optionally test runtime behavior
npm run dev
```

## Technical details

The script:

- Runs `tsc -b tsconfig.references.json` to build TypeScript types across all packages
- **Type validation happens automatically during the build** - TypeScript checks all types while generating `.d.ts` files, so if there are any type errors, the build fails
- Uses TypeScript's project references for incremental builds
- **Incremental build cache**: TypeScript stores build info in `.tsbuildinfo` files
  - Tracks file timestamps and content hashes
  - Rebuilds only changed files and their dependents
  - Can be bypassed with `--force` flag
- Generates `.d.ts` files in `types/` directories
- Skips Babel transpilation (no `lib/` or `es/` output)
- Exits with code 1 on any validation failure

### Build cache behavior

- ✅ **Cache hit (nothing changed)**: ~1 second
- 🔄 **Partial rebuild (some files changed)**: Seconds to minutes depending on how many packages affected
- 🔨 **Full rebuild (--force or clean)**: ~1-2 minutes

## Exit codes

- `0` - All validations passed
- `1` - TypeScript references mismatch OR type checking failed

Linting failures with `--lint` flag produce warnings but don't cause the script to exit with an error code.
