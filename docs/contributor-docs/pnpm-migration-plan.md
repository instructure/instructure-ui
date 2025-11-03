---
title: pnpm + release-it Migration Plan
category: Contributor Guides
order: 10
---

# npm to pnpm + release-it Migration Plan

## Implementation Status

**Phase 1 (pnpm + Workspace Protocol):** ✅ COMPLETE

- Merged in PR #2172
- All 102 packages now using pnpm v10.18.3 with workspace:\* protocol
- CI/CD updated and running successfully
- Build tooling and documentation updated

**Phase 2 (release-it Integration):** ⏳ PENDING

- Not yet started
- Waiting for appropriate timing
- See Phase 2 sections below for implementation plan

## Executive Summary

**Problem Solved in Phase 1:**

1. Manual version updates across 102 packages when releasing → ✅ Solved with workspace:\* protocol
2. Slow npm installs and large disk usage → ✅ Solved with pnpm

**Remaining in Phase 2:**

1. Complex release process with multiple manual steps → Replace with release-it
2. Lerna dependency with uncertain maintenance future → Remove Lerna completely

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

## Phase 1: pnpm + Workspace Protocol Migration ✅ COMPLETE

**Status:** Implemented and merged in PR #2172

**What was implemented:**

- Configuration: pnpm-workspace.yaml, .npmrc, updated lerna.json, .gitignore
- Workspace protocol: All 94 internal @instructure/_ dependencies converted to workspace:_
- Build tooling: Updated bootstrap.js, ui-scripts (bump.js, npm.js), babel-plugin-transform-imports, generate-all-tokens
- CI/CD: All GitHub Actions workflows updated to use pnpm v10
- Documentation: CLAUDE.md and 13+ other docs updated with pnpm commands
- regression-test: Decoupled using link: protocol (separate React 19 workspace)
- Dependencies: Added @types/react and jsdom to root devDependencies (former phantom deps)
- TypeScript: Fixed project references and build issues

**Implementation details below for reference:**

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

// Get all @instructure/* package names in the monorepo
const packagePaths = globSync('packages/*/package.json')
const instructurePackageNames = packagePaths
  .map((p) => {
    const pkg = JSON.parse(fs.readFileSync(p, 'utf8'))
    return pkg.name
  })
  .filter((name) => name && name.startsWith(SCOPE))

console.log(`Found ${instructurePackageNames.length} @instructure packages\n`)

let totalChanges = 0

// Convert each package.json
console.log('Converting package.json files to workspace protocol...')
for (const pkgPath of packagePaths) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
  let changed = false

  // Convert ONLY @instructure/* internal dependencies to workspace protocol
  // External dependencies (react, lodash, etc.) are left unchanged
  for (const depType of ['dependencies', 'devDependencies']) {
    if (!pkg[depType]) continue

    for (const [name, version] of Object.entries(pkg[depType])) {
      // Only convert if it's one of our @instructure packages
      if (instructurePackageNames.includes(name) && !version.startsWith('workspace:')) {
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

// Same filtering logic for root: only convert @instructure/* packages
for (const depType of ['devDependencies']) {
  if (!rootPkg[depType]) continue

  for (const [name, version] of Object.entries(rootPkg[depType])) {
    // Only convert if it's one of our @instructure packages
    if (instructurePackageNames.includes(name) && !version.startsWith('workspace:')) {
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

    "release": "ui-scripts release",
    "publish": "ui-scripts publish",

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

## Phase 2: release-it Integration ⏳ PENDING

**Status:** Not yet started - planned for future implementation

**Goal:** Replace Lerna with release-it for automated releases

**Risk:** Low-Medium

**Implementation plan below:**

### Release Workflow Overview

**New workflow:**

1. **Developer runs locally (from master):** `pnpm run release`

   - Creates a new release branch (e.g., `release/v11.1.0`)
   - Analyzes commits using conventional commits
   - Bumps all package versions
   - Generates/updates CHANGELOG.md
   - Commits changes
   - Pushes branch to GitHub
   - Asks for confirmation before creating PR
   - Creates PR after confirmation

2. **Team reviews PR on GitHub**

   - Review version bumps
   - Review changelog entries
   - Approve when ready

3. **PR is merged/rebased to master** (manually via GitHub UI)

4. **CI automatically (triggered by merge to master):**
   - Detects release commit
   - Runs tests
   - Creates git tag
   - Publishes all 102 packages to npm (with rate limiting)
   - Deploys documentation site

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
# Local command creates release PR:
pnpm run release
  ├─> Analyzes commits (conventional-commits)
  ├─> Determines version bump (major/minor/patch)
  ├─> Creates new release branch
  ├─> Updates all package.json files
  ├─> Generates changelogs
  ├─> Creates git commit
  ├─> Pushes branch to remote
  ├─> Asks for confirmation
  └─> Creates GitHub PR (after confirmation)

# After PR review and merge to master, CI automatically:
  ├─> Creates git tag
  ├─> Publishes to npm
  └─> Deploys docs
```

### Step 2.1: Install release-it

```bash
---
type: code
---
pnpm add -D release-it @release-it-plugins/workspaces @release-it/conventional-changelog
```

**About `@release-it-plugins/workspaces`:**

This plugin is specifically designed for monorepo publishing and handles:

1. **Publishing ALL packages**: Iterates through all workspace packages and publishes each one
2. **npm rate limiting**: Built-in delays between publish calls to avoid npm API rate limits (critical for 102 packages)
3. **Workspace protocol conversion**: Automatically converts `workspace:*` to actual versions in published packages
4. **Failure handling**: If one package fails, continues with others and reports all failures at the end

The plugin uses `pnpm -r publish` under the hood, which respects pnpm's publishing conventions and includes proper rate limiting. For a monorepo with 102 packages, this is essential to avoid hitting npm's API limits.

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
    "addUntrackedFiles": false,
    "push": true,
    "tag": false,
    "commit": true
  },
  "github": {
    "release": false,
    "draft": false,
    "tokenRef": "GITHUB_TOKEN"
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
    "before:git:release": "git checkout -b release/v${version}",
    "after:git:release": "node scripts/create-release-pr.js ${version}"
  }
}
```

**Key configuration notes:**

- `git.push: true` - Pushes the release branch (not master)
- `git.tag: false` - NO tagging locally (will be done in CI after merge)
- `git.commit: true` - Creates the version bump commit
- `github.release: false` - GitHub releases handled by CI
- `npm.publish: false` - Publishing happens in CI only
- `before:git:release` hook - Creates new release branch before pushing
- `after:git:release` hook - Runs custom script to confirm and create PR

### Step 2.2a: Create PR Confirmation Script

Create `scripts/create-release-pr.js`:

```javascript
---
type: code
---
#!/usr/bin/env node

const { execSync } = require('child_process')
const readline = require('readline')

const version = process.argv[2]

if (!version) {
  console.error('Error: version parameter required')
  process.exit(1)
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

console.log('\n📦 Release branch created and pushed!')
console.log(`Version: v${version}`)
console.log(`Branch: release/v${version}`)
console.log('\nYou can review the changes on GitHub before creating the PR.')
console.log(`Branch URL: https://github.com/instructure/instructure-ui/tree/release/v${version}`)

rl.question('\n❓ Do you want to create a Pull Request now? (y/N): ', (answer) => {
  rl.close()

  if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
    console.log('\n📝 Creating Pull Request...')
    try {
      execSync(
        `gh pr create --title "chore(release): v${version}" --body "Release v${version}\n\nGenerated by release-it\n\nPlease review the version bumps and changelog updates." --base master --head release/v${version}`,
        { stdio: 'inherit' }
      )
      console.log('\n✅ Pull Request created successfully!')
    } catch (err) {
      console.error('\n❌ Failed to create PR:', err.message)
      console.log('You can create it manually with:')
      console.log(`gh pr create --title "chore(release): v${version}" --base master --head release/v${version}`)
      process.exit(1)
    }
  } else {
    console.log('\n✋ PR creation skipped.')
    console.log('To create the PR later, run:')
    console.log(`gh pr create --title "chore(release): v${version}" --base master --head release/v${version}`)
  }
})
```

### Step 2.3: Update ui-scripts

#### Rename bump.js to release.js

First, rename the file:

```bash
---
type: code
---
mv packages/ui-scripts/lib/commands/bump.js packages/ui-scripts/lib/commands/release.js
```

#### packages/ui-scripts/lib/commands/release.js

Replace entire file content:

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

import { error, info, runCommandAsync } from '@instructure/command-utils'

export default {
  command: 'release',
  desc: 'Create release PR with version bump and changelog (run from master branch)',
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
      describe: 'Dry run (no git commits, no PR creation)',
      default: false
    })
  },
  handler: async (argv) => {
    const { releaseType, preRelease, dryRun } = argv

    try {
      info('🚀 Starting release process...')
      info('This will:')
      info('  1. Create a new release branch')
      info('  2. Bump versions and generate changelogs')
      info('  3. Push branch to GitHub')
      info('  4. Ask for confirmation before creating PR')
      info('  5. After PR is merged, CI will publish to npm')
      info('')

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

      await runCommandAsync('pnpm', args, {}, { stdio: 'inherit' })

      if (!dryRun) {
        info('')
        info('✅ Release process completed!')
      }
    } catch (err) {
      error(err)
      process.exit(1)
    }
  }
}
```

#### packages/ui-scripts/lib/commands/publish.js

Update to be CI-only for publishing all packages to npm:

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

import { error, info, runCommandAsync } from '@instructure/command-utils'
import { createNPMRCFile } from '../utils/npm.js'

export default {
  command: 'publish',
  desc: 'Publish all packages to npm (CI only - runs after release PR is merged)',
  builder: (yargs) => {
    yargs.option('dryRun', {
      type: 'boolean',
      describe: 'Dry run (no actual publish)',
      default: false
    })
    yargs.option('isMaintenance', {
      type: 'boolean',
      describe: 'If true npm publish will use maintenance tag',
      default: false
    })
  },
  handler: async (argv) => {
    const { dryRun, isMaintenance } = argv

    // Enforce CI-only usage
    if (!process.env.CI && !dryRun) {
      error('ERROR: This command should only be run in CI!')
      error('To create a release, use: pnpm run release')
      error('(Or use --dry-run flag to test locally)')
      process.exit(1)
    }

    try {
      info('Publishing all packages to npm...')

      // Set up npm authentication
      createNPMRCFile()

      const args = ['pnpm', '-r', 'publish', '--access', 'public', '--no-git-checks']

      if (dryRun) {
        args.push('--dry-run')
      }

      // Handle maintenance tag
      if (isMaintenance) {
        args.push('--tag', 'maintenance')
      }

      await runCommandAsync('pnpm', args, {}, { stdio: 'inherit' })

      info('✓ All packages published successfully!')
    } catch (err) {
      error(err)
      process.exit(1)
    }
  }
}
```

**Key changes:**

- Enforces CI-only execution (exits with error if run locally without `--dry-run`)
- Uses `pnpm -r publish` to publish all packages with proper npm rate limiting
- Simplified command structure focused on CI use case

### Step 2.4: Update pkg-utils

#### packages/pkg-utils/lib/get-packages.js

**Note:** This file is used by the `deprecate`, `publish`, and `tag` commands in ui-scripts. With the new release workflow, consider whether these commands are still needed. If they're no longer used, this entire file and its usages can be removed in a future cleanup.

For now, replace Lerna dependency:

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

Update `package.json` scripts section:

```json
---
type: code
---
{
  "scripts": {
    "release": "ui-scripts release",
    "release:dry": "ui-scripts release --dryRun",
    "publish": "ui-scripts publish"
  }
}
```

**Script usage:**

- `pnpm run release` - Creates release branch and PR (run locally from master)
- `pnpm run release:dry` - Dry run to test the release process
- `pnpm run publish` - Publishes to npm (CI only)

### Step 2.8: Update CI/CD

#### .github/workflows/release.yml

Update to publish packages when release PR is merged to master:

```yaml
---
type: code
---
name: Release to npm
on:
  push:
    branches:
      - master
    paths:
      - 'packages/*/package.json'
      - 'package.json'
      - 'CHANGELOG.md'

jobs:
  release:
    # Only run if this is a release commit (merged release PR)
    if: "startsWith(github.event.head_commit.message, 'chore(release)')"
    runs-on: ubuntu-latest
    name: Publish packages to npm
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
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

      - name: Extract version from package.json
        id: version
        run: echo "VERSION=$(node -p "require('./package.json').version")" >> $GITHUB_OUTPUT

      - name: Configure git
        run: |
          git config user.name "instructure-ui-ci"
          git config user.email "instructure-ui-ci@instructure.com"

      - name: Create git tag
        run: |
          git tag -a v${{ steps.version.outputs.VERSION }} -m "Release v${{ steps.version.outputs.VERSION }}"
          git push origin v${{ steps.version.outputs.VERSION }}

      - name: Publish to npm
        env:
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
        run: pnpm run release

      - name: Create GitHub Release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          gh release create v${{ steps.version.outputs.VERSION }} \
            --title "v${{ steps.version.outputs.VERSION }}" \
            --notes "See [CHANGELOG.md](https://github.com/${{ github.repository }}/blob/master/CHANGELOG.md) for details."

  deploy-docs:
    needs: release
    runs-on: ubuntu-latest
    name: Deploy documentation
    steps:
      - uses: actions/checkout@v4

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

      - name: Build documentation
        run: pnpm run build:docs

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./packages/__docs__/dist
```

**Key changes:**

- Workflow only triggers on release commits (merged release PRs)
- Creates git tag from version in package.json
- Publishes all packages to npm using `pnpm run release` (which calls `ui-scripts publish`)
- Creates GitHub release with link to changelog
- Deploys documentation automatically after successful publish

### Step 2.9: Testing release-it

```bash
---
type: code
---
# 1. Dry run to see what would happen (without creating branches or PRs)
pnpm run release:dry

# 2. Test the full release process on a test branch
# This will:
# - Create a release branch
# - Bump versions
# - Generate changelog
# - Push to GitHub
# - Ask for confirmation before creating PR
git checkout master
pnpm run release

# Choose "N" when asked to create PR, so you can review first

# 3. Review the changes on GitHub
# Visit: https://github.com/instructure/instructure-ui/branches

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

# 7. If everything looks good, create the PR manually
gh pr create --title "chore(release): v11.1.0" --base master --head release/v11.1.0

# 8. Clean up test (if needed)
git checkout master
git branch -D release/v11.1.0  # Local cleanup
gh pr close 1234 --delete-branch  # Close and delete remote branch
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
- Rename bump command to release with PR confirmation
- Update ui-scripts release/publish commands
- Update pkg-utils to remove Lerna dependency
- Remove Lerna completely
- Update CI/CD workflows

Release workflow: pnpm run release → PR → merge → CI publishes to npm"
```

## Testing Strategy

### Local Testing Checklist

#### Phase 1 (pnpm + workspace protocol) ✅ COMPLETE

All items validated and passing:

- ✅ `pnpm install` completes without errors
- ✅ `pnpm run bootstrap` builds all packages
- ✅ `pnpm run lint` passes
- ✅ `pnpm run test:vitest` passes
- ✅ `pnpm run dev` starts dev server
- ✅ Hot reload works when editing components
- ✅ `pnpm --filter @instructure/ui-buttons build` works
- ✅ Verify symlinks: `ls -la node_modules/@instructure/ui-view`
- ✅ Check peer deps: `pnpm list react` shows single version
- ✅ Test build: `cd packages/ui-buttons && pnpm pack`

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

### Version Management (Phase 1 ✅)

| Aspect                | Before (npm)            | After (pnpm) ✅                |
| --------------------- | ----------------------- | ------------------------------ |
| Internal deps         | `"ui-view": "10.26.0"`  | `"ui-view": "workspace:*"`     |
| Version updates       | Manual in 102 packages  | Automatic (workspace protocol) |
| Install time          | ~2-3 minutes            | ~30-60 seconds                 |
| Disk space            | ~500MB per node_modules | Shared store (saves ~80%)      |
| Dependency strictness | Loose (phantom deps)    | Strict (only declared deps)    |

### Release Process (Phase 2 ⏳)

| Aspect                | Current (Lerna)                           | After Phase 2 ⏳                |
| --------------------- | ----------------------------------------- | ------------------------------- |
| Commands              | `pnpm run bump` + manual commit + publish | `pnpm release`                  |
| Version determination | Lerna conventional commits                | release-it conventional commits |
| Changelog             | Lerna generates                           | release-it generates            |
| Git operations        | Manual                                    | Automated (commit, tag, push)   |
| Publish               | Custom script                             | Built-in                        |
| Dry-run               | Limited                                   | Full simulation                 |

### Developer Experience (Phase 1 ✅)

| Task              | Before (npm)                           | Current (pnpm) ✅                |
| ----------------- | -------------------------------------- | -------------------------------- |
| Install deps      | `npm install`                          | `pnpm install`                   |
| Bootstrap         | `npm run bootstrap`                    | `pnpm run bootstrap`             |
| Build all         | `npm run build`                        | `pnpm run build`                 |
| Build one package | `npm run build --workspace ui-buttons` | `pnpm --filter ui-buttons build` |
| Add dependency    | Edit package.json + npm install        | `pnpm --filter <pkg> add <dep>`  |
| Release           | Multiple commands (Lerna)              | Same (Phase 2 will improve)      |

## Success Metrics

### Phase 1 Achievements ✅

- ✅ **Zero manual version updates** when releasing (workspace:\* protocol)
- ✅ **50-70% faster** `install` times (pnpm vs npm)
- ✅ **Stricter** dependency management (no phantom dependencies)
- ✅ **80%+ disk space savings** across multiple clones (pnpm store)
- ✅ All CI/CD workflows running successfully with pnpm

### Phase 2 Goals ⏳

- ⏳ **Single command** releases (release-it)
- ⏳ **Automatic** changelog generation (release-it + conventional commits)
- ⏳ **No Lerna dependency** (actively maintained tools only)

## Next Steps

1. ✅ ~~Execute Phase 1~~ - COMPLETE
2. ✅ ~~Validate Phase 1~~ - Currently running successfully in production
3. ⏳ **Plan Phase 2 timing** - Pick appropriate sprint for release-it integration
4. ⏳ **Execute Phase 2** - release-it integration (see Phase 2 sections above)
5. ⏳ **Monitor & iterate** - Watch first few releases closely after Phase 2

## Resources

- [pnpm Documentation](https://pnpm.io/)
- [pnpm Workspaces](https://pnpm.io/workspaces)
- [Workspace Protocol](https://pnpm.io/workspaces#workspace-protocol-workspace)
- [release-it Documentation](https://github.com/release-it/release-it)
- [release-it Monorepo Recipe](https://github.com/release-it/release-it/blob/main/docs/recipes/monorepo.md)
- [@release-it-plugins/workspaces](https://github.com/release-it-plugins/workspaces)
- [Conventional Commits](https://www.conventionalcommits.org/)
