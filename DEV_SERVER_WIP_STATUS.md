# Dev Server Fix - Work In Progress Status

**Date:** October 15, 2025
**Branch:** `experiment/swc-migration`
**Latest Commit:** 621ba32459 - "WIP: fix dev server with TypeScript rootDir approach"

## Current Objective

Fix the documentation dev server (`pnpm run dev` / `pnpm -w run dev`) to work after the SWC migration POC.

## Problem Summary

After migrating component builds to SWC, the dev server stopped working due to TypeScript compilation structure issues in the `__docs__` package.

### Root Cause

TypeScript was compiling `buildScripts/build-docs.mts` → `lib/buildScripts/build-docs.mjs` (preserving directory structure), but the code expected it to be at `lib/build-docs.mjs` (flat structure).

## Solution Implemented

Added `rootDir: "./buildScripts"` to `tsconfig.node.build.json` to flatten the TypeScript output structure.

### Files Modified

1. **`packages/__docs__/tsconfig.node.build.json`**
   - Added `"rootDir": "./buildScripts"` to flatten output
   - Result: `buildScripts/build-docs.mts` → `lib/build-docs.mjs` (flat, not nested)

2. **`packages/__docs__/buildScripts/build-docs.mts`**
   - Fixed paths to work with flat `lib/` structure:
     - `projectRoot`: `path.resolve(__dirname, '../../')` (was `'../../../'`)
     - `rootPackage`: Use `path.join(projectRoot, 'package.json')` for absolute path
     - `packagesDir`: Set to `projectRoot` (absolute path instead of relative `'../..'`)
     - `summariesFilePath`: Use `path.join(__dirname, 'ai-accessible-documentation/...')` (removed `../buildScripts/`)

3. **`packages/__docs__/package.json`**
   - Reverted path: `lib/build-docs.mjs` (not `lib/buildScripts/build-docs.mjs`)
   - Removed `NODE_OPTIONS='--max-old-space-size=8192'` (not needed, webpack workers already have 8GB)

4. **`packages/__docs__/webpack.config.mjs`**
   - Import path: `./lib/build-docs.mjs` (not `./lib/buildScripts/build-docs.mjs`)

## Current Status

### ✅ Working
- TypeScript compiles successfully with flat output structure
- `build-docs.mjs` correctly output to `lib/` directory
- File paths use absolute `projectRoot` to avoid scanning sibling repos
- Components build with SWC successfully (34.3s bootstrap)
- Tests 99.87% passing

### ❓ Not Yet Verified
- Dev server startup (was starting background process when interrupted)
- File processing count should be ~600 files (not 3512 from sibling repos)
- Webpack compilation completion without memory errors
- Website loading at http://localhost:9090

## How to Continue

### 1. Test Dev Server

```bash
cd /Users/balazs.saros/work/instructure-ui
pnpm -w run dev
```

**Expected behavior:**
- Should process ~600 files (not 3512)
- Should compile without "Cannot find module" errors
- Should start webpack dev server on http://localhost:9090
- Should complete without memory errors

### 2. Verify with Playwright (if dev server works)

Use the Playwright MCP tool to navigate to http://localhost:9090 and verify the site loads.

### 3. If Dev Server Fails

Check the error message:
- **"Cannot find module"**: Path issue - verify `__dirname` resolves correctly in compiled output
- **Processing 3512 files**: `packagesDir` not using absolute path - check compiled `lib/build-docs.mjs`
- **Memory error during webpack**: Separate issue, may need webpack optimization (orthogonal to SWC migration)

### 4. Once Working

- Create proper commit (not WIP)
- Update documentation
- Consider creating PR for review

## Key Files Reference

```
packages/__docs__/
├── buildScripts/
│   └── build-docs.mts           # Source (compiles to lib/)
├── lib/
│   ├── build-docs.mjs           # Compiled output (flat structure)
│   ├── ai-accessible-documentation/
│   └── utils/
├── tsconfig.node.build.json     # Has rootDir: "./buildScripts"
├── package.json                 # References lib/build-docs.mjs
└── webpack.config.mjs           # Imports from ./lib/build-docs.mjs
```

## Previous Attempts (Documented for Context)

Before arriving at the `rootDir` solution, we tried:
1. ❌ Adjusting paths to work with nested `lib/buildScripts/` structure
2. ❌ Adding extra `../` to relative paths
3. ✅ Adding `rootDir` to tsconfig (simple, clean solution)

The `rootDir` approach was the correct solution because it matches how master branch was configured before the ESM refactor.

## Background Context

- **SWC Migration POC**: Components build successfully with SWC instead of Babel
- **Dev Server Purpose**: Webpack dev server for documentation website
- **Webpack Uses Babel**: Dev server webpack uses babel-loader (not SWC) - this is fine
- **Separation of Concerns**: Component builds (SWC) ≠ Dev tooling (can use Babel)

## Additional Notes

- UI-babel-preset package had to copy `lib/` to `es/` directory (one-time fix)
- Theme packages show "MODULE_TYPELESS_PACKAGE_JSON" warnings (harmless, can be fixed by adding `"type": "module"`)
- Memory issue during webpack bundling is separate from SWC migration
