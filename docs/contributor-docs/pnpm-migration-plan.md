---
title: pnpm + release-it Migration Plan
category: Contributor Guides
order: 10
---

# npm to pnpm + release-it Migration Plan

## Executive Summary

**Current Pain Points:**

1. Manual version updates across 102 packages when releasing
2. Complex release process with multiple manual steps
3. Lerna dependency with uncertain maintenance future

**Solution:**

1. Migrate to pnpm with `workspace:*` protocol → eliminates manual version syncing
2. Replace Lerna with release-it → single-command releases with conventional commits
3. Faster installs, stricter dependency management, modern tooling

## Table of Contents

- [Current State Analysis](#current-state-analysis)
- [Phase 1: pnpm + Workspace Protocol Migration](#phase-1-pnpm--workspace-protocol-migration)
- [Phase 2: release-it Integration](#phase-2-release-it-integration)
- [Testing Strategy](#testing-strategy)
- [Rollback Plan](#rollback-plan)
- [FAQ](#faq)

## Current State Analysis

### Package Manager

- **npm v11.5.2** with npm workspaces
- **102 packages** in `packages/*` directory
- **265 total package.json files** (including nested dependencies)

### Monorepo Setup

- **Lerna 8.1.9** for:
  - Task running (`lerna run build --stream`)
  - Package versioning (`lerna version --conventional-commits`)
  - Package discovery (`lerna list --json`)
- **npm workspaces** for dependency resolution
- **Exact version pinning** for internal packages (e.g., `"@instructure/ui-view": "10.26.0"`)

### Current Lerna Usage

#### 1. Task Running (Easy to replace)

| Before (Lerna)                               | After (pnpm)                    |
| -------------------------------------------- | ------------------------------- |
| `lerna run lint --stream`                    | `pnpm -r --stream lint`         |
| `lerna run build --stream`                   | `pnpm -r --stream build`        |
| `lerna run build:watch --stream`             | `pnpm -r --stream build:watch`  |
| `lerna run bundle --stream --scope docs-app` | `pnpm --filter docs-app bundle` |

#### 2. Package Discovery (Used by pkg-utils)

- `packages/pkg-utils/lib/get-packages.js` calls `lerna list --json`
- Returns package metadata (name, version, location)

#### 3. Versioning & Changelog (CRITICAL)

- `packages/ui-scripts/lib/utils/npm.js` uses `lerna version` with:
  - `--conventional-commits` - Auto-generate changelog from git history
  - `--exact` - No ^ in version ranges
  - `--force-publish=*` - Bump ALL packages
  - `--no-push` / `--no-git-tag-version` - Manual control

### The Manual Version Problem

**Current workflow when releasing:**

```json
---
type: code
---
// Before release: ui-buttons/package.json
{
  "dependencies": {
    "@instructure/ui-view": "10.26.0",
    "@instructure/ui-utils": "10.26.0"
  }
}

// After bumping to 10.27.0, Lerna updates:
{
  "dependencies": {
    "@instructure/ui-view": "10.27.0",  // ← Manual update needed
    "@instructure/ui-utils": "10.27.0"  // ← Manual update needed
  }
}
```

This happens across **101 packages** × ~10 internal deps each = **~1000 manual updates per release**.

## Phase 1: pnpm + Workspace Protocol Migration

**Goal:** Eliminate manual version updates, improve install performance, stricter dependencies

**Risk:** Low

### Step 1.1: Configuration Setup

#### Create `pnpm-workspace.yaml`

```yaml
---
type: code
---
packages:
  - 'packages/*'
```

#### Update root `package.json`

```json
---
type: code
---
{
  "engines": {
    "node": ">=22",
    "npm": "Use pnpm instead.",
    "pnpm": ">=9"
  },
  "pnpm": {
    "overrides": {
      "react": "^18",
      "react-dom": "^18",
      "@types/react": "^18"
    }
  }
}
```

**Remove:**

```json
---
type: code
---
{
  "resolutions": {
    // ← DELETE (replaced by pnpm.overrides)
    "react": "^18",
    "react-dom": "^18",
    "@types/react": "^18"
  }
}
```

#### Create `.npmrc` for pnpm config

```ini
---
type: code
---
# Strict peer dependencies (recommended)
auto-install-peers=false
strict-peer-dependencies=true

# Workspace protocol
link-workspace-packages=true

# Use hoisted node linker initially for compatibility
node-linker=hoisted

# Can enable later for stricter isolation:
# node-linker=isolated
# shamefully-hoist=false
```

#### Update `.gitignore`

Update your `.gitignore` file:

- Remove `npm-debug.log` and `lerna-debug.log` lines
- Remove `.npmrc` line (if present) - we now need to commit this file for pnpm config
- Add `pnpm-debug.log`
- Add `.pnpm-store/`

#### Update lerna.json (temporary - will be removed in Phase 2)

```json
---
type: code
---
{
  "version": "10.26.0",
  "npmClient": "pnpm",
  "command": {
    "version": {
      "allowBranch": ["master", "v*_maintenance"],
      "message": "chore(release): %s"
    }
  },
  "$schema": "node_modules/lerna/schemas/lerna-schema.json"
}
```

### Step 1.2: Convert to Workspace Protocol

**This is THE KEY STEP that solves your version sync problem.**

#### Create conversion script

Create `scripts/convert-to-workspace-protocol.js`:

```javascript
---
type: code
---
#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { globSync } = require('glob')

const SCOPE = '@instructure'

console.log('Finding all packages in monorepo...')

// Get all package names in the monorepo
const packagePaths = globSync('packages/*/package.json')
const packageNames = packagePaths
  .map((p) => {
    const pkg = JSON.parse(fs.readFileSync(p, 'utf8'))
    return pkg.name
  })
  .filter((name) => name && name.startsWith(SCOPE))

console.log(`Found ${packageNames.length} @instructure packages\n`)

let totalChanges = 0

// Convert each package.json
console.log('Converting package.json files to workspace protocol...')
for (const pkgPath of packagePaths) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
  let changed = false

  // Convert dependencies
  for (const depType of ['dependencies', 'devDependencies']) {
    if (!pkg[depType]) continue

    for (const [name, version] of Object.entries(pkg[depType])) {
      if (packageNames.includes(name) && !version.startsWith('workspace:')) {
        pkg[depType][name] = 'workspace:*'
        changed = true
        totalChanges++
        console.log(`  ${pkg.name}: ${name} ${version} → workspace:*`)
      }
    }
  }

  if (changed) {
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
  }
}

// Also update root package.json
console.log('\nConverting root package.json...')
const rootPkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))
let rootChanged = false

for (const depType of ['devDependencies']) {
  if (!rootPkg[depType]) continue

  for (const [name, version] of Object.entries(rootPkg[depType])) {
    if (packageNames.includes(name) && !version.startsWith('workspace:')) {
      rootPkg[depType][name] = 'workspace:*'
      rootChanged = true
      totalChanges++
      console.log(`  root: ${name} ${version} → workspace:*`)
    }
  }
}

if (rootChanged) {
  fs.writeFileSync('package.json', JSON.stringify(rootPkg, null, 2) + '\n')
}

console.log('\nConversion complete!')
console.log(`Total conversions: ${totalChanges}`)
console.log('\nNext steps:')
console.log('  1. Review the changes: git diff')
console.log('  2. Run: pnpm install')
console.log('  3. Run: pnpm run bootstrap')
console.log('  4. Test: pnpm run dev')
```

#### Run conversion

```bash
node scripts/convert-to-workspace-protocol.js
```

**Result:**

```json
---
type: code
---
// BEFORE
"dependencies": {
  "@instructure/ui-view": "10.26.0",
  "@instructure/ui-utils": "10.26.0"
}

// AFTER
"dependencies": {
  "@instructure/ui-view": "workspace:*",
  "@instructure/ui-utils": "workspace:*"
}
```

**Benefits:**

- You'll NEVER manually update these versions again
- pnpm ensures you always use the local workspace version
- On publish, pnpm automatically converts `workspace:*` → actual version

### Step 1.3: Update Scripts

#### Root `package.json` scripts

```json
---
type: code
---
{
  "scripts": {
    "prestart": "pnpm run bootstrap",
    "start": "pnpm --filter docs-app start",
    "start:watch": "pnpm --filter docs-app start:watch",
    "dev": "pnpm run start:watch",

    "cy:component": "cypress run --component",
    "test:vitest": "vitest --watch=false",
    "test:vitest-watch": "vitest",

    "lint": "pnpm -r --stream lint",
    "lint:changes": "pnpm run lint -- --since HEAD^",
    "lint:fix": "pnpm -r --stream lint:fix",
    "lint:commits": "commitlint --from=HEAD^1",

    "bootstrap": "node scripts/bootstrap.js",
    "build": "pnpm -r --stream build",
    "build:watch": "pnpm -r --stream build:watch",
    "build:docs": "pnpm --filter docs-app bundle",
    "build:tokens": "ui-scripts generate-all-tokens",
    "build:types": "tsc -b tsconfig.references.json",
    "build:ts": "pnpm --filter @instructure/ui-icons prepare-build && pnpm run build:types",

    "clean": "node scripts/clean.js",
    "clean-node": "node scripts/clean.js --nuke_node",
    "export:icons": "pnpm --filter @instructure/ui-icons export",

    "bump": "ui-scripts bump",
    "release": "ui-scripts publish",

    "husky:pre-commit": "lint-staged && node scripts/checkTSReferences.js",
    "postinstall": "husky",
    "ts:check": "pnpm -r --stream ts:check"
  }
}
```

**Key changes:**

| Before                          | After                       |
| ------------------------------- | --------------------------- |
| `lerna run <cmd> --stream`      | `pnpm -r --stream <cmd>`    |
| `lerna run <cmd> --scope <pkg>` | `pnpm --filter <pkg> <cmd>` |
| `npm run --workspace <pkg>`     | `pnpm --filter <pkg>`       |
| `npm run`                       | `pnpm run` (or just `pnpm`) |

#### scripts/bootstrap.js

```diff
---
type: code
---
 const { execSync, fork } = require('child_process')
 const { spawn } = require('cross-spawn')
 const path = require('path')

 const opts = { stdio: 'inherit' }
 function buildProject() {
   const spawnStdIoOpts = { stdio: ['inherit', 'inherit', 'pipe'] }
   execSync(
     'lerna run prepare-build --scope @instructure/ui-icons --loglevel silent',
     opts
   )
   console.info('Starting Babel and TSC...')
-  const tsBuild = spawn('npm', ['run', 'build:types'], spawnStdIoOpts)
-  const babelBuild = spawn('npm', ['run', 'build'], spawnStdIoOpts)
+  const tsBuild = spawn('pnpm', ['run', 'build:types'], spawnStdIoOpts)
+  const babelBuild = spawn('pnpm', ['run', 'build'], spawnStdIoOpts)
   tsBuild.on('exit', (code) => {
     if (code !== 0) {
       babelBuild.kill()
-      console.error("'npm run build:ts' failed :(")
+      console.error("'pnpm run build:ts' failed :(")
       process.exit(code)
     }
   })
   tsBuild.stderr.on('data', (data) => {
     console.error('tsc stderr', data.toString())
   })
   babelBuild.stderr.on('data', (data) => {
     console.error('babel stderr', data.toString())
   })
   babelBuild.on('exit', (code) => {
     if (code !== 0) {
       tsBuild.kill()
-      console.error("'npm run build' failed :(")
+      console.error("'pnpm run build' failed :(")
       process.exit(code)
     }
-    execSync('npm run build:tokens', opts)
+    execSync('pnpm run build:tokens', opts)
   })
 }
```

#### packages/ui-scripts/lib/commands/bump.js

```diff
---
type: code
---
   info('Running npm install to update package-lock file!')
-  execSync('npm install', { stdio: 'inherit' })
+  info('Running pnpm install to update pnpm-lock.yaml!')
+  execSync('pnpm install', { stdio: 'inherit' })
 } catch (err) {
   error(err)
   process.exit(1)
```

#### packages/ui-scripts/lib/utils/npm.js

```diff
---
type: code
---
 export function createNPMRCFile() {
   const { NPM_TOKEN, NPM_EMAIL, NPM_USERNAME } = process.env

   if (NPM_TOKEN) {
     fs.writeFileSync(
       path.resolve(process.cwd(), '.npmrc'),
       `//registry.npmjs.org/:_authToken=${NPM_TOKEN}\n${NPM_SCOPE}\nemail=${NPM_EMAIL}\nname=${NPM_USERNAME}`
     )
   }

   try {
     info('running npm whoami:')
-    runCommandSync('npm', ['whoami'])
+    runCommandSync('pnpm', ['whoami'])
   } catch (e) {
     error(`Could not determine if NPM auth was successful: ${e}`)
     process.exit(1)
   }
 }
```

### Step 1.4: Update CI/CD

Update all workflow files in `.github/workflows/`:

#### Template for all workflows

```diff
---
type: code
---
 jobs:
   job-name:
     runs-on: ubuntu-latest
     steps:
       - uses: actions/checkout@v4
+        with:
+          fetch-depth: 0  # For conventional commits
+
+      - uses: pnpm/action-setup@v4
+        with:
+          version: 9
+
       - uses: actions/setup-node@v4
         with:
           node-version: '22'
-          cache: 'npm'
+          cache: 'pnpm'
+
       - name: Install dependencies
-        run: npm ci
+        run: pnpm install --frozen-lockfile
+
       - name: Bootstrap project
-        run: npm run bootstrap
+        run: pnpm run bootstrap
```

**Files to update:**

- `.github/workflows/pr-validation.yml` (3 jobs)
- `.github/workflows/release.yml`
- `.github/workflows/deploy.yml` (2 jobs)
- `.github/workflows/manual-release-to-npm.yml`
- `.github/workflows/manual-release-from-pr.yml`
- `.github/workflows/visual-regression.yml`

### Step 1.5: Update Documentation

#### Files to update:

- `README.md`
- `docs/contributor-docs/building-instui.md`
- `docs/contributor-docs/contributing.md`
- `docs/contributor-docs/dev-commands.md` (if exists)

**Search and replace:**

| Before          | After                            |
| --------------- | -------------------------------- |
| `npm install`   | `pnpm install`                   |
| `npm ci`        | `pnpm install --frozen-lockfile` |
| `npm run <cmd>` | `pnpm <cmd>` or `pnpm run <cmd>` |

**Example diff for docs/contributor-docs/building-instui.md:**

````diff
---
type: code
---
 ### How to build the project

-In order to build the project one should have [`git`](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and [`node`](https://nodejs.org/en/download/) (supported version is defined in the root [package.json](https://github.com/instructure/instructure-ui/blob/master/package.json#L90)) installed.
+In order to build the project one should have [`git`](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), [`node`](https://nodejs.org/en/download/) (supported version is defined in the root [package.json](https://github.com/instructure/instructure-ui/blob/master/package.json#L90)), and [`pnpm`](https://pnpm.io/installation) installed.

 1. Download the source code and go into the root directory of instructure-ui:

    ```sh
    git clone https://github.com/instructure/instructure-ui.git
    cd instructure-ui
    ```

 2. Install dependencies for packages:

    ```sh
-   npm install
+   pnpm install
    ```

 3. Run the bootstrap script:

    ```sh
-   npm run bootstrap
+   pnpm run bootstrap
    ```
````

### Step 1.6: Migration Execution

```bash
---
type: code
---
# 1. Clean everything
rm -rf node_modules package-lock.json
find packages -name "node_modules" -type d -prune -exec rm -rf {} +
pnpm run clean

# 2. Run workspace protocol conversion
node scripts/convert-to-workspace-protocol.js

# 3. Review changes
git diff packages/*/package.json | less

# 4. Install with pnpm
pnpm install

# 5. Bootstrap/build
pnpm run bootstrap

# 6. Test locally
pnpm run lint
pnpm run test:vitest
pnpm run dev  # Should open localhost:9090
```

### Step 1.7: Verification

#### Check workspace linking

```bash
---
type: code
---
# Verify all @instructure packages are linked
ls -la node_modules/@instructure/

# Verify a specific package uses workspace version
cd packages/ui-buttons
ls -la node_modules/@instructure/ui-view  # Should be symlink
```

#### Check peer dependencies

```bash
---
type: code
---
pnpm list react
pnpm list react-dom
# Should show single version (^18.x.x)
```

#### Test build & dev server

```bash
---
type: code
---
pnpm run build
pnpm run build:docs
pnpm run dev
```

#### Test publishing transformation

```bash
---
type: code
---
cd packages/ui-buttons
pnpm pack --dry-run
# Check output - workspace:* should be converted to version number
```

### Step 1.8: Commit Changes

```bash
---
type: code
---
git add -A
git commit -m "chore: migrate to pnpm with workspace protocol

- Replace npm with pnpm as package manager
- Adopt workspace:* protocol for internal dependencies
- Update all scripts and CI/CD workflows
- Update Lerna to use pnpm client
- Update documentation

This eliminates manual version syncing across 102 packages."
```

## Phase 2: release-it Integration

**Goal:** Replace Lerna with release-it for automated releases

**Risk:** Low-Medium

### Why release-it?

**Current Lerna workflow:**

```bash
---
type: code
---
# 1. Bump versions
ui-scripts bump [major|minor|patch]
  └─> lerna version --conventional-commits --no-push --no-git-tag-version

# 2. Manually commit

# 3. Publish
ui-scripts publish
  └─> npm publish for each package
```

**With release-it:**

```bash
---
type: code
---
# Single command does everything:
pnpm release
  ├─> Analyzes commits (conventional-commits)
  ├─> Determines version bump (major/minor/patch)
  ├─> Updates all package.json files
  ├─> Generates changelogs
  ├─> Creates git commit
  ├─> Creates git tag
  ├─> Pushes to remote
  └─> Publishes to npm
```

### Step 2.1: Install release-it

```bash
---
type: code
---
pnpm add -D release-it @release-it-plugins/workspaces @release-it/conventional-changelog
```

### Step 2.2: Create release-it Config

Create .release-it.json in root:

```json
---
type: code
---
{
  "git": {
    "commitMessage": "chore(release): ${version}",
    "tagName": "v${version}",
    "tagAnnotation": "Release v${version}",
    "requireCleanWorkingDir": true,
    "requireUpstream": true,
    "requireCommits": true,
    "requireBranch": ["master", "v*_maintenance"],
    "addUntrackedFiles": false
  },
  "github": {
    "release": true,
    "releaseName": "v${version}",
    "autoGenerate": false
  },
  "npm": {
    "publish": false
  },
  "plugins": {
    "@release-it-plugins/workspaces": {
      "workspaces": ["packages/*"],
      "additionalManifests": {
        "dependencyUpdates": ["workspace:*"]
      }
    },
    "@release-it/conventional-changelog": {
      "preset": {
        "name": "angular"
      },
      "infile": "CHANGELOG.md",
      "header": "# Changelog\n\nAll notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.",
      "gitRawCommitsOpts": {
        "path": "."
      }
    }
  },
  "hooks": {
    "before:init": ["pnpm run lint", "pnpm run test:vitest"],
    "after:bump": ["pnpm install --lockfile-only"],
    "after:release": "echo Successfully released ${name} v${version}"
  }
}
```

### Step 2.3: Update ui-scripts

#### packages/ui-scripts/lib/commands/bump.js

Replace entire file:

```javascript
---
type: code
---
/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { error, runCommandAsync } from '@instructure/command-utils'

export default {
  command: 'bump',
  desc: 'Bump versions and generate changelogs using release-it',
  builder: (yargs) => {
    yargs.option('releaseType', {
      type: 'string',
      describe: 'Release type: major, minor, patch, or specific version'
    })
    yargs.option('preRelease', {
      type: 'string',
      describe: 'Pre-release identifier: snapshot, beta, alpha, rc'
    })
    yargs.option('dryRun', {
      type: 'boolean',
      describe: 'Dry run (no git commits, no publish)',
      default: false
    })
  },
  handler: async (argv) => {
    const { releaseType, preRelease, dryRun } = argv

    try {
      const args = ['release-it']

      // Add version increment
      if (releaseType) {
        args.push(releaseType)
      }

      // Add pre-release
      if (preRelease) {
        args.push(`--preRelease=${preRelease}`)
      }

      // Add dry-run flag
      if (dryRun) {
        args.push('--dry-run')
      }

      // CI mode (non-interactive)
      if (process.env.CI) {
        args.push('--ci')
      }

      await runCommandAsync('pnpm', args, {}, { stdio: 'inherit' })
    } catch (err) {
      error(err)
      process.exit(1)
    }
  }
}
```

#### packages/ui-scripts/lib/commands/publish.js

Simplify to just call release-it:

```javascript
---
type: code
---
/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { error, runCommandAsync } from '@instructure/command-utils'
import { createNPMRCFile } from '../utils/npm.js'

export default {
  command: 'publish',
  desc: 'Publish packages using release-it (run after bump, or use release-it directly)',
  builder: (yargs) => {
    yargs.option('dryRun', {
      type: 'boolean',
      describe: 'Dry run (no actual publish)',
      default: false
    })
    yargs.option('isMaintenance', {
      type: 'boolean',
      describe: 'If true npm publish will use vXYZ_maintenance as tag',
      default: false
    })
  },
  handler: async (argv) => {
    const { dryRun, isMaintenance } = argv

    try {
      // Set up npm authentication
      createNPMRCFile()

      const args = ['release-it', '--no-increment', '--no-git']

      if (dryRun) {
        args.push('--dry-run')
      }

      if (process.env.CI) {
        args.push('--ci')
      }

      // Handle maintenance tag
      if (isMaintenance) {
        args.push('--npm.tag=maintenance')
      }

      await runCommandAsync('pnpm', args, {}, { stdio: 'inherit' })
    } catch (err) {
      error(err)
      process.exit(1)
    }
  }
}
```

### Step 2.4: Update pkg-utils

#### packages/pkg-utils/lib/get-packages.js

Replace Lerna dependency:

```javascript
---
type: code
---
/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const { getPackage } = require('./get-package')
const fs = require('fs')
const path = require('path')
const { globSync } = require('glob')

/**
 * Gets all packages in the monorepo.
 * Replaces lerna list --json functionality.
 * @returns {Array} Array of package objects with name, version, location, private
 */
module.exports = function getPackages() {
  const rootDir = path.resolve(__dirname, '../../..')
  const packagePaths = globSync('packages/*/package.json', { cwd: rootDir })

  return packagePaths.map((pkgPath) => {
    const fullPath = path.join(rootDir, pkgPath)
    const location = path.dirname(fullPath)
    return getPackage({ cwd: location })
  })
}
```

#### Update packages/pkg-utils/package.json

```diff
---
type: code
---
 {
   "dependencies": {
-    "@lerna/package": "^6.4.1",
+    "glob": "^11.0.0",
     "read-pkg-up": "^7.0.1"
   }
 }
```

Then run:

```bash
---
type: code
---
cd packages/pkg-utils
pnpm remove @lerna/package
pnpm add glob
```

### Step 2.5: Simplify npm.js Utils

#### packages/ui-scripts/lib/utils/npm.js

Remove Lerna-related code:

```diff
---
type: code
---
-import { Project } from '@lerna/project'
-
-const syncRootPackageVersion = async (useProjectVersion) => {
-  const project = new Project(process.cwd())
-  const rootPkg = pkgUtils.getPackage()
-
-  let projectVersion
-
-  if (project.isIndependent() || useProjectVersion) {
-    projectVersion = project.version
-  } else {
-    const pkgs = pkgUtils.getChangedPackages()
-    projectVersion = pkgs[0].version
-  }
-
-  if (projectVersion !== rootPkg.get('version')) {
-    rootPkg.set('version', projectVersion)
-    await rootPkg.serialize()
-  }
-
-  return projectVersion
-}
-
-export async function bumpPackages(packageName, requestedVersion) {
-  // ... DELETE entire function - release-it handles this now
-}

 export function createNPMRCFile() {
   // ... KEEP this function - still needed for CI
 }
```

### Step 2.6: Remove Lerna

```bash
---
type: code
---
# Remove Lerna from root
pnpm remove -D lerna

# Remove from ui-scripts (if listed)
cd packages/ui-scripts
pnpm remove @lerna/project

# Delete lerna.json
rm lerna.json

# Commit
git add -A
git commit -m "chore: remove Lerna dependency

Replaced with release-it for version management and publishing."
```

### Step 2.7: Update Root Scripts

```json
---
type: code
---
{
  "scripts": {
    "bump": "ui-scripts bump",
    "release": "ui-scripts publish",
    "release:dry": "release-it --dry-run"
  }
}
```

Or use release-it directly:

```json
---
type: code
---
{
  "scripts": {
    "bump": "release-it",
    "release": "release-it --ci",
    "release:dry": "release-it --dry-run",
    "release:snapshot": "release-it --preRelease=snapshot"
  }
}
```

### Step 2.8: Update CI/CD

#### .github/workflows/release.yml

```yaml
---
type: code
---
name: Release to npm
on:
  push:
    branches:
      - master

jobs:
  release:
    runs-on: ubuntu-latest
    name: Release packages
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0 # Needed for conventional commits
          token: ${{ secrets.GITHUB_TOKEN }}

      - uses: pnpm/action-setup@v4
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Bootstrap project
        run: pnpm run bootstrap

      - name: Run tests
        run: USE_REACT_STRICT_MODE=0 pnpm run test:vitest

      - name: Configure git
        run: |
          git config user.name "instructure-ui-ci"
          git config user.email "instructure-ui-ci@instructure.com"

      - name: Release to npm
        env:
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: pnpm run release

  tag:
    needs: release
    if: "startsWith(github.event.head_commit.message, 'chore(release)')"
    runs-on: ubuntu-latest
    name: Tag release commit
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: Set up git identity
        run: git config --global user.name "instructure-ui-ci" && git config --global user.email "instructure-ui-ci@instructure.com"
      - name: Add tag
        run: git tag -a v$(./.github/workflows/calculateVersion.sh) -m v$(./.github/workflows/calculateVersion.sh)
      - name: Push tags
        run: git push origin v$(./.github/workflows/calculateVersion.sh)
```

### Step 2.9: Testing release-it

```bash
---
type: code
---
# 1. Dry run to see what would happen
pnpm release --dry-run

# 2. Test version bump only (no publish, no push)
git checkout -b test-release-it
pnpm release --no-npm --no-git.push

# 3. Verify changes
git log -1
git show HEAD

# 4. Verify package.json versions updated
cat packages/ui-buttons/package.json | grep version

# 5. Verify CHANGELOG.md generated
cat CHANGELOG.md

# 6. Test pack to verify workspace:* conversion
cd packages/ui-buttons
pnpm pack
tar -tzf instructure-ui-buttons-*.tgz | grep package.json
tar -xzf instructure-ui-buttons-*.tgz -O package/package.json | jq .dependencies
# Should show actual versions, not workspace:*

# 7. Clean up test
git reset --hard HEAD^
git checkout feat/pnpm-migration
git branch -D test-release-it
```

### Step 2.10: Commit Phase 2 Changes

```bash
---
type: code
---
git add -A
git commit -m "chore: integrate release-it for automated releases

- Replace Lerna version/publish with release-it
- Configure conventional commits + changelog generation
- Update ui-scripts bump/publish commands
- Update pkg-utils to remove Lerna dependency
- Remove Lerna completely
- Update CI/CD workflows

Single command releases with full automation."
```

## Testing Strategy

### Local Testing Checklist

#### Phase 1 (pnpm + workspace protocol)

- [ ] `pnpm install` completes without errors
- [ ] `pnpm run bootstrap` builds all packages
- [ ] `pnpm run lint` passes
- [ ] `pnpm run test:vitest` passes
- [ ] `pnpm run dev` starts dev server
- [ ] Hot reload works when editing components
- [ ] `pnpm --filter @instructure/ui-buttons build` works
- [ ] Verify symlinks: `ls -la node_modules/@instructure/ui-view`
- [ ] Check peer deps: `pnpm list react` shows single version
- [ ] Test build: `cd packages/ui-buttons && pnpm pack`

#### Phase 2 (release-it)

- [ ] `pnpm release --dry-run` shows correct version bump
- [ ] Dry run generates expected CHANGELOG entries
- [ ] Test bump on branch: `pnpm release --no-npm --no-git.push`
- [ ] Verify all package.json versions updated
- [ ] Verify pnpm-lock.yaml updated
- [ ] Verify git commit created with correct message
- [ ] Verify workspace:\* preserved in repo, converted in tarball
- [ ] Test prerelease: `pnpm release --preRelease=snapshot --dry-run`

### CI/CD Testing

- [ ] Push branch, verify PR validation passes
- [ ] All 3 jobs pass (lint, vitest, cypress)
- [ ] Check workflow duration (should be faster with pnpm)
- [ ] Review CI logs for warnings
- [ ] Verify cache is working (pnpm/action-setup@v4)

### Pre-Production Release Testing

**Create a test release on a branch:**

```bash
---
type: code
---
# 1. Create test branch from master
git checkout master
git pull
git checkout -b test-release-process

# 2. Make a trivial change
echo "// test" >> packages/ui-buttons/src/index.ts
git add .
git commit -m "feat: test release process"

# 3. Run release (with --no-git.push to prevent pushing)
pnpm release --no-git.push

# 4. Verify results
git log -1
git show HEAD
cat CHANGELOG.md
cat packages/ui-buttons/package.json | grep version

# 5. Test tarball
cd packages/ui-buttons
pnpm pack
tar -xzf *.tgz -O package/package.json | jq .dependencies

# 6. Clean up
git reset --hard HEAD^
git checkout master
git branch -D test-release-process
```

### First Production Release

**After merging to master, monitor first release carefully:**

1. Watch GitHub Actions logs in real-time
2. Verify npm publish for each package
3. Check npm registry: `npm view @instructure/ui-buttons`
4. Verify git tag created: `git tag -l`
5. Verify GitHub release created
6. Test installing in a separate project:
   ```bash
   mkdir test-install && cd test-install
   npm init -y
   npm install @instructure/ui-buttons@latest
   ```

## Rollback Plan

### If Issues in Phase 1 (pnpm migration)

#### Immediate rollback (< 1 hour)

```bash
---
type: code
---
# Revert commit
git revert HEAD

# Or reset if not pushed
git reset --hard HEAD^

# Reinstall with npm
rm -rf node_modules pnpm-lock.yaml
npm install
npm run bootstrap
```

#### Partial rollback (keep changes, use npm temporarily)

```bash
---
type: code
---
# Keep all changes but use npm
npm install  # Creates package-lock.json
npm run bootstrap

# Update CI temporarily
git checkout HEAD -- .github/workflows/*.yml
```

### If Issues in Phase 2 (release-it)

#### Revert to Lerna temporarily

```bash
---
type: code
---
# Revert Phase 2 commits
git revert <commit-hash>

# Reinstall Lerna
pnpm add -D lerna @lerna/project
pnpm --filter @instructure/pkg-utils add @lerna/package

# Restore lerna.json
git checkout HEAD^ -- lerna.json

# Can still use pnpm + workspace protocol
```

#### Emergency manual release

```bash
---
type: code
---
# If release-it completely fails, manually publish:
for pkg in packages/*; do
  if [ -f "$pkg/package.json" ]; then
    cd "$pkg"
    if [ "$(jq -r .private package.json)" != "true" ]; then
      npm publish
    fi
    cd ../..
  fi
done
```

## FAQ

### Q: Will end users notice any changes?

**A:** No. Published packages are identical - same versions, same dependencies. pnpm converts `workspace:*` to actual versions during publish.

### Q: What happens to existing package-lock.json?

**A:** It's deleted and replaced with `pnpm-lock.yaml`. Git will track the new lockfile.

### Q: Can I use npm commands after migration?

**A:** Some yes, but use pnpm instead:

| Command       | Recommendation                               |
| ------------- | -------------------------------------------- |
| `npm install` | Use `pnpm install` instead                   |
| `npm ci`      | Use `pnpm install --frozen-lockfile` instead |
| `npm publish` | Still works (pnpm includes npm)              |
| `npm whoami`  | Still works                                  |

### Q: How do workspace versions work?

**A:**

- In repo: `"@instructure/ui-view": "workspace:*"`
- When published: `"@instructure/ui-view": "10.27.0"` (actual version)
- pnpm automatically converts during `pnpm publish`

### Q: What if a package needs a specific version of another package?

**A:** Use workspace version ranges:

```json
---
type: code
---
{
  "dependencies": {
    "@instructure/ui-view": "workspace:^10.26.0" // Minimum version
  }
}
```

### Q: Can I test locally without publishing?

**A:** Yes, `pnpm pack` will show you exactly what gets published:

```bash
---
type: code
---
cd packages/ui-buttons
pnpm pack
tar -xzf *.tgz -O package/package.json | jq .dependencies
```

### Q: How do I run commands in specific packages?

**A:**

```bash
---
type: code
---
# Single package
pnpm --filter @instructure/ui-buttons build

# Pattern matching
pnpm --filter "@instructure/ui-*" build

# All packages recursively
pnpm -r build
```

### Q: What about snapshot releases?

**A:** With release-it:

```bash
---
type: code
---
pnpm release --preRelease=snapshot
# Creates version like: 10.27.0-snapshot.0
```

### Q: How do I test changes across packages locally?

**A:** They're automatically linked! Edit `ui-view`, save, and `ui-buttons` uses it immediately.

### Q: What if release-it fails mid-release?

**A:** release-it is transactional. If publish fails:

1. Versions are bumped (already committed)
2. Re-run `pnpm release --no-increment` to retry publish only

### Q: Can I still use Lerna commands?

**A:** After Phase 1: Yes (Lerna uses pnpm)
After Phase 2: No (Lerna removed), use pnpm equivalents

### Q: How do I bump only specific packages?

**A:** release-it bumps all packages (unified versioning). If you need independent versioning, we'd need a different strategy.

## Comparison: Before & After

### Version Management

| Aspect                | Before (npm + Lerna)    | After (pnpm + release-it)      |
| --------------------- | ----------------------- | ------------------------------ |
| Internal deps         | `"ui-view": "10.26.0"`  | `"ui-view": "workspace:*"`     |
| Version updates       | Manual in 102 packages  | Automatic (workspace protocol) |
| Install time          | ~2-3 minutes            | ~30-60 seconds                 |
| Disk space            | ~500MB per node_modules | Shared store (saves ~80%)      |
| Dependency strictness | Loose (phantom deps)    | Strict (only declared deps)    |

### Release Process

| Aspect                | Before                                             | After                           |
| --------------------- | -------------------------------------------------- | ------------------------------- |
| Commands              | `npm run bump` + manual commit + `npm run release` | `pnpm release`                  |
| Version determination | Lerna conventional commits                         | release-it conventional commits |
| Changelog             | Lerna generates                                    | release-it generates            |
| Git operations        | Manual                                             | Automated (commit, tag, push)   |
| Publish               | Custom script                                      | Built-in                        |
| Dry-run               | Limited                                            | Full simulation                 |

### Developer Experience

| Task              | Before                                 | After                            |
| ----------------- | -------------------------------------- | -------------------------------- |
| Install deps      | `npm install`                          | `pnpm install`                   |
| Bootstrap         | `npm run bootstrap`                    | `pnpm run bootstrap`             |
| Build all         | `npm run build`                        | `pnpm run build`                 |
| Build one package | `npm run build --workspace ui-buttons` | `pnpm --filter ui-buttons build` |
| Add dependency    | Edit package.json + npm install        | `pnpm --filter <pkg> add <dep>`  |
| Release           | Multiple commands                      | `pnpm release`                   |

## Success Metrics

After migration, you should see:

- **Zero manual version updates** when releasing
- **50-70% faster** `install` times
- **Single command** releases
- **Automatic** changelog generation
- **Stricter** dependency management (fewer bugs)
- **80%+ disk space savings** across multiple clones
- **No Lerna dependency** (actively maintained tools only)

## Next Steps

1. **Review this plan** - Add comments, questions, or concerns
2. **Get team buy-in** - Share with other maintainers
3. **Schedule migration** - Pick a sprint with lighter workload
4. **Execute Phase 1** - pnpm + workspace protocol
5. **Validate Phase 1** - Run for 1-2 weeks
6. **Execute Phase 2** - release-it integration
7. **Monitor & iterate** - Watch first few releases closely

## Resources

- [pnpm Documentation](https://pnpm.io/)
- [pnpm Workspaces](https://pnpm.io/workspaces)
- [Workspace Protocol](https://pnpm.io/workspaces#workspace-protocol-workspace)
- [release-it Documentation](https://github.com/release-it/release-it)
- [release-it Monorepo Recipe](https://github.com/release-it/release-it/blob/main/docs/recipes/monorepo.md)
- [@release-it-plugins/workspaces](https://github.com/release-it-plugins/workspaces)
- [Conventional Commits](https://www.conventionalcommits.org/)
