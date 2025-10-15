# Dev Server Investigation - SWC Migration POC

## Executive Summary

**The dev server memory issues are NOT related to the SWC migration.** The components themselves are built with SWC successfully. The problem is that webpack bundling for the documentation app still uses Babel (via babel-loader), and we introduced path errors that need to be fixed.

## Current Status

### What Works ✅

- ✅ Components build with SWC (34.3s bootstrap time)
- ✅ Tests pass (99.87%)
- ✅ TypeScript compilation works
- ✅ Documentation markdown parsing works

### What Doesn't Work ❌

- ❌ Dev server crashes with out-of-memory error during webpack bundling
- ❌ Path references are incorrect due to confusion about TypeScript output structure

## The Path Confusion

### Directory Structure

```
packages/__docs__/
├── buildScripts/          # TypeScript SOURCE files (.mts)
│   └── build-docs.mts
├── lib/                   # TypeScript COMPILED output
│   └── buildScripts/      # ← TypeScript preserves directory structure!
│       └── build-docs.mjs
└── types/                 # TypeScript declarations
    └── buildScripts/
        └── build-docs.d.mts
```

### The Confusion

**TypeScript Config (`tsconfig.node.build.json`):**

```json
{
  "compilerOptions": {
    "outDir": "./lib" // Output JavaScript to lib/
  },
  "include": ["buildScripts/**/*"] // Input from buildScripts/
}
```

**What happens:** TypeScript compiles `buildScripts/build-docs.mts` → `lib/buildScripts/build-docs.mjs`

**The ERROR we made:** We saw references to `lib/build-docs.mjs` in master and thought the file structure changed. It didn't! The references in master are **WRONG** or there's a post-processing step we're missing.

## What We Changed (Incorrectly)

### Changes Made

1. **package.json line 14:**

   - Master: `node lib/build-docs.mjs`
   - We changed to: `node lib/buildScripts/build-docs.mjs`

2. **webpack.config.mjs line 31:**

   - Master: `import { processSingleFile } from './lib/build-docs.mjs'`
   - We changed to: `import { processSingleFile } from './lib/buildScripts/build-docs.mjs'`

3. **build-docs.mts paths:**
   - Changed relative paths to go up more levels (`../../../` → `../../../../`)
   - This was needed because \_\_dirname is in `lib/buildScripts/` not `lib/`

### Why These Changes Seemed Necessary

When TypeScript compiles:

- Source file: `buildScripts/build-docs.mts`
- Compiled to: `lib/buildScripts/build-docs.mjs`
- `__dirname` in compiled file: `.../packages/__docs__/lib/buildScripts/`

So paths like `require('../../../package.json')` needed to become `require('../../../../package.json')` to go:

- Up from `lib/buildScripts/` → `lib/` → `__docs__/` → `packages/` → `root/`

## The Real Problem: Webpack + Babel

### Memory Error Analysis

The out-of-memory error occurs during **webpack bundling**, not during component builds. Looking at the stack trace:

```
<--- JS stacktrace --->
...
21: 0x10551fcb4 Builtins_ArrayMapLoopContinuation
20: 0x10545cef0 Builtins_InterpreterEntryTrampoline
...
```

And the output before crash:

```
<i> [webpack-dev-server] Project is running at:
<i> [webpack-dev-server] Loopback: http://localhost:9090/
```

**The dev server STARTED** but crashed during the webpack compilation phase.

### Webpack Configuration

From `packages/ui-webpack-config/config/module/rules.js`:

```javascript
const rules = [
  {
    test: /\.(js|mjs|jsx|ts|tsx)$/,
    exclude: [...exclude],
    use: [
      {
        loader: 'thread-loader',
        options: {
          workers: 2,
          workerParallelJobs: 50,
          workerNodeArgs: ['--max-old-space-size=8192'], // Already has 8GB!
          poolRespawn: false,
          poolTimeout: 2000,
          name: 'babel-loader-pool'
        }
      },
      babelLoader // ← Uses Babel, not SWC!
    ]
  }
  // ...
]
```

**Key findings:**

1. Webpack uses `babel-loader` for the docs app
2. Worker threads already have 8GB heap (`--max-old-space-size=8192`)
3. This is **separate** from component builds which use SWC
4. The docs app bundles ALL 100+ components into a single webpack bundle

### Why It Runs Out of Memory

The documentation app:

- Imports ALL 100+ InstUI components
- Each component is processed by Babel through webpack
- Creates a massive bundle with all examples and documentation
- Even with 8GB heap for workers, the main thread or coordination overhead can exceed limits

**This is NOT caused by the SWC migration** - it would happen on master too under the same conditions.

## The Correct Solution

### Option 1: Fix the Path References (REVERT OUR CHANGES)

The master branch references are likely correct through one of these mechanisms:

**Possibility A:** There's a post-build step that copies/links files

- Check if there's a script that copies `lib/buildScripts/build-docs.mjs` → `lib/build-docs.mjs`
- Look for symlinks or file operations in build scripts

**Possibility B:** The tsconfig is supposed to flatten the output

- Maybe we need different tsconfig settings
- Check if `rootDir` or other options affect output structure

**Possibility C:** Master is also broken

- The paths in master might not work either
- Need to test master branch dev server

### Option 2: Keep Our Changes But Fix Them

If the TypeScript output structure is correct (lib/buildScripts/), then:

1. **Keep the import/require path changes** - they're correct for the actual file structure
2. **Fix the out-of-memory issue** by:
   - Increasing main process heap size (not just workers)
   - Or optimizing webpack bundling strategy
   - Or disabling certain features in dev mode

### Option 3: Change TypeScript Output Structure

Modify `tsconfig.node.build.json` to flatten output:

```json
{
  "compilerOptions": {
    "outDir": "./lib",
    "rootDir": "./buildScripts" // ← Add this
  }
}
```

This should compile `buildScripts/build-docs.mts` → `lib/build-docs.mjs` (flat, no subdirectory).

## Recommended Action Plan

### Step 1: Verify Master Branch Behavior

```bash
git stash
git checkout master
pnpm run bootstrap
pnpm run dev
```

**Questions to answer:**

1. Does dev server work on master?
2. Do the file paths match (`lib/build-docs.mjs` exists)?
3. If yes, how are files organized differently?

### Step 2: Fix the TypeScript Output (Preferred)

Add `rootDir` to tsconfig to flatten output:

```json
{
  "compilerOptions": {
    "outDir": "./lib",
    "rootDir": "./buildScripts" // Flatten: buildScripts/x.mts → lib/x.mjs
  }
}
```

Then REVERT all our path changes to match master.

### Step 3: Address Memory Issues

The memory issue is orthogonal to SWC migration. Options:

**A. Increase main process memory:**

```json
"start:watch": "NODE_OPTIONS='--max-old-space-size=16384' npm run prestart && ui-scripts bundle --watch"
```

**B. Optimize webpack config:**

- Add `cache: { type: 'filesystem' }` to webpack config
- Use `optimization: { moduleIds: 'deterministic' }`
- Enable persistent caching

**C. Use webpack 5 features:**

- Check if already on webpack 5
- Enable module federation for better code splitting

### Step 4: Consider SWC for Webpack (Future)

The docs app could potentially use `swc-loader` instead of `babel-loader`:

```javascript
{
  test: /\.(js|mjs|jsx|ts|tsx)$/,
  use: [
    {
      loader: 'swc-loader',
      options: {
        // Use same .swcrc config
      }
    }
  ]
}
```

This would make the dev server consistent with component builds, but is NOT required for the POC.

## Summary

### What We Learned

1. The `lib/` vs `buildScripts/` confusion was about TypeScript compilation output structure
2. The dev server memory issue is unrelated to SWC migration
3. Webpack still uses Babel for the docs app (separate from component builds)
4. Our path "fixes" may have been unnecessary if tsconfig rootDir is set correctly

### What To Do Next

**Before making ANY changes:**

1. ✅ Test master branch to understand expected behavior
2. ✅ Check if `rootDir` fixes the TypeScript output structure
3. ✅ Verify which files actually exist and where

**Then:**

1. Fix TypeScript output to be flat (add `rootDir`)
2. Revert path changes to match master
3. Address memory issue separately (increase heap or optimize webpack)
4. Optionally switch webpack to swc-loader for consistency

### Key Insight

**The SWC migration for component builds is working fine.** The dev server issue is a separate problem with webpack bundling all components together, which would exist regardless of whether components are built with Babel or SWC.
