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

import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'
import inquirer from 'inquirer'
import { info, error } from '@instructure/command-utils'

export default {
  command: 'create-component-version',
  desc: 'Create a new version of a component, preserving git blame history',
  builder: (yargs) => {
    yargs.option('component', {
      type: 'string',
      describe:
        'Component path (e.g. packages/ui-buttons/src/Button). Auto-detected from cwd if inside a component.'
    })
  },
  handler: async (argv) => {
    const repoRoot = execSync('git rev-parse --show-toplevel', {
      encoding: 'utf-8'
    }).trim()

    let componentDir = argv.component
      ? path.resolve(repoRoot, argv.component)
      : null

    if (!componentDir) {
      componentDir = await detectOrPromptComponent(repoRoot)
    }

    if (!componentDir) {
      error('No component selected.')
      process.exit(1)
    }

    await createComponentVersion(repoRoot, componentDir)
  }
}

/**
 * Try to detect the component from cwd, otherwise prompt with fuzzy search.
 */
async function detectOrPromptComponent(repoRoot) {
  const cwd = process.cwd()
  const suggested = detectComponentFromCwd(repoRoot, cwd)

  if (suggested) {
    const { useSuggested } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'useSuggested',
        message: `Detected component: ${path.relative(
          repoRoot,
          suggested
        )}. Use this?`,
        default: true
      }
    ])
    if (useSuggested) return suggested
  }

  // Fuzzy search from all components
  const components = discoverComponents(repoRoot)
  if (components.length === 0) {
    error('No versioned components found.')
    process.exit(1)
  }

  const { selected } = await inquirer.prompt([
    {
      type: 'input',
      name: 'selected',
      message: 'Search for a component:',
      async validate(input) {
        if (!input) return 'Type to search'
        const matches = fuzzyMatch(components, input)
        if (matches.length === 0) return 'No matches found'
        return true
      }
    }
  ])

  const matches = fuzzyMatch(components, selected)
  if (matches.length === 1) {
    return matches[0].dir
  }

  const { picked } = await inquirer.prompt([
    {
      type: 'list',
      name: 'picked',
      message: 'Select component:',
      choices: matches.map((m) => ({
        name: m.label,
        value: m.dir
      }))
    }
  ])

  return picked
}

/**
 * Detect if cwd is inside a component directory (has v1/v2 subdirs).
 */
function detectComponentFromCwd(repoRoot, cwd) {
  let dir = cwd
  while (dir.startsWith(repoRoot) && dir !== repoRoot) {
    // Check if this directory has version subdirectories
    if (
      fs.existsSync(path.join(dir, 'v1')) ||
      fs.existsSync(path.join(dir, 'v2'))
    ) {
      return dir
    }
    dir = path.dirname(dir)
  }
  return null
}

/**
 * Discover all versioned components across the monorepo.
 */
function discoverComponents(repoRoot) {
  const packagesDir = path.join(repoRoot, 'packages')
  const components = []

  for (const pkg of fs.readdirSync(packagesDir)) {
    if (!pkg.startsWith('ui-')) continue
    const srcDir = path.join(packagesDir, pkg, 'src')
    if (!fs.existsSync(srcDir)) continue

    for (const comp of fs.readdirSync(srcDir)) {
      const compDir = path.join(srcDir, comp)
      if (!fs.statSync(compDir).isDirectory()) continue
      // Check if it has version subdirs
      const versions = fs
        .readdirSync(compDir)
        .filter((d) => /^v\d+$/.test(d))
        .sort()
      if (versions.length > 0) {
        components.push({
          label: `${pkg} / ${comp} (${versions.join(', ')})`,
          dir: compDir,
          pkg,
          name: comp,
          versions
        })
      }
    }
  }

  return components
}

/**
 * Simple fuzzy match: all query characters must appear in order.
 */
function fuzzyMatch(components, query) {
  const q = query.toLowerCase()
  return components.filter((c) => {
    const target = `${c.pkg} ${c.name}`.toLowerCase()
    let qi = 0
    for (let i = 0; i < target.length && qi < q.length; i++) {
      if (target[i] === q[qi]) qi++
    }
    return qi === q.length
  })
}

/**
 * Main logic: create a new version of a component.
 */
async function createComponentVersion(repoRoot, componentDir) {
  const relPath = path.relative(repoRoot, componentDir)
  const componentName = path.basename(componentDir)

  // Find current latest version
  const versions = fs
    .readdirSync(componentDir)
    .filter((d) => /^v\d+$/.test(d))
    .sort((a, b) => parseInt(a.slice(1)) - parseInt(b.slice(1)))

  if (versions.length === 0) {
    error(`No versions found in ${relPath}`)
    process.exit(1)
  }

  const latestVersion = versions[versions.length - 1]
  const latestNum = parseInt(latestVersion.slice(1))
  const newVersion = `v${latestNum + 1}`

  info(`Component: ${relPath}`)
  info(`Current latest: ${latestVersion}`)
  info(`New version: ${newVersion}`)

  const { proceed } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'proceed',
      message: `Create ${newVersion} from ${latestVersion}?`,
      default: true
    }
  ])

  if (!proceed) {
    info('Cancelled.')
    process.exit(0)
  }

  const oldDir = path.join(componentDir, latestVersion)
  const newDir = path.join(componentDir, newVersion)

  // Step 1: git mv (preserves blame history)
  info(`\nStep 1: Renaming ${latestVersion} → ${newVersion} (git mv)...`)
  execSync(`git mv "${oldDir}" "${newDir}"`, { cwd: repoRoot, stdio: 'pipe' })

  // Step 2: Copy back the old version (frozen copy)
  info(`Step 2: Recreating ${latestVersion} as frozen copy...`)
  execSync(`cp -r "${newDir}" "${oldDir}"`, { cwd: repoRoot, stdio: 'pipe' })
  execSync(`git add "${oldDir}"`, { cwd: repoRoot, stdio: 'pipe' })

  // Step 3: Freeze the old version
  info(`Step 3: Freezing ${latestVersion}...`)
  freezeVersion(repoRoot, oldDir, latestVersion)

  // Step 4: Create new lettered export file
  info(`Step 4: Creating new export file...`)
  const pkgDir = findPackageDir(componentDir)
  createNewExportFile(repoRoot, pkgDir, latestVersion, newVersion)

  // Step 5: Update package.json exports
  info(`Step 5: Updating package.json exports...`)
  updatePackageJsonExports(pkgDir)

  info(`\n✅ Created ${newVersion} of ${componentName}`)
  info(`\nNext steps:`)
  info(`  1. Make your breaking changes in ${relPath}/${newVersion}/`)
  info(`  2. Run tests: pnpm run test:vitest ${path.basename(pkgDir)}`)
  info(`  3. Update the README in ${relPath}/${newVersion}/README.md`)
}

/**
 * Freeze the old version: pin /latest imports to the current version.
 */
function freezeVersion(repoRoot, versionDir, version) {
  // Find the current library version (e.g., "11_7")
  const pkgDir = findPackageDir(versionDir)
  const pkgJson = JSON.parse(
    fs.readFileSync(path.join(pkgDir, 'package.json'), 'utf-8')
  )
  const libVersion = pkgJson.version.replace(/\.\d+$/, '').replace('.', '_')
  const versionKey = `v${libVersion}`

  // Recursively find all .ts/.tsx files and pin /latest imports
  const files = findFiles(versionDir, /\.(ts|tsx)$/)
  let pinned = 0

  for (const file of files) {
    let content = fs.readFileSync(file, 'utf-8')
    const original = content

    // Replace @instructure/*/latest with @instructure/*/vX_Y
    content = content.replace(
      /(['"])(@instructure\/[^'"]+)\/latest\1/g,
      (match, quote, pkg) => {
        // Only pin versioned packages (those with exports field entries)
        return `${quote}${pkg}/${versionKey}${quote}`
      }
    )

    if (content !== original) {
      fs.writeFileSync(file, content)
      pinned++
    }
  }

  if (pinned > 0) {
    info(`  Pinned /latest imports to /${versionKey} in ${pinned} files`)
  }

  execSync(`git add "${versionDir}"`, { cwd: repoRoot, stdio: 'pipe' })
}

/**
 * Create a new lettered export file by copying the current latest
 * and updating version references.
 */
function createNewExportFile(repoRoot, pkgDir, oldVersion, newVersion) {
  const exportsDir = path.join(pkgDir, 'src', 'exports')
  if (!fs.existsSync(exportsDir)) {
    info('  No exports directory found, skipping.')
    return
  }

  // Find the current latest export file (highest letter)
  const exportFiles = fs
    .readdirSync(exportsDir)
    .filter((f) => /^[a-z]\.ts$/.test(f))
    .sort()
  if (exportFiles.length === 0) return

  const latestExportFile = exportFiles[exportFiles.length - 1]
  const latestLetter = latestExportFile.charAt(0)
  const newLetter = String.fromCharCode(latestLetter.charCodeAt(0) + 1)
  const newExportFile = `${newLetter}.ts`

  // Copy and update version references
  let content = fs.readFileSync(
    path.join(exportsDir, latestExportFile),
    'utf-8'
  )
  content = content.replace(
    new RegExp(`/${oldVersion}([/'"])`, 'g'),
    `/${newVersion}$1`
  )

  fs.writeFileSync(path.join(exportsDir, newExportFile), content)
  execSync(`git add "${path.join(exportsDir, newExportFile)}"`, {
    cwd: repoRoot,
    stdio: 'pipe'
  })

  info(`  Created exports/${newExportFile} (from ${latestExportFile})`)
}

/**
 * Update package.json exports: add new version entry and update /latest.
 */
function updatePackageJsonExports(pkgDir) {
  const pkgJsonPath = path.join(pkgDir, 'package.json')
  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'))

  if (!pkgJson.exports || !pkgJson.exports['./latest']) return

  // Find the new export letter
  const exportsDir = path.join(pkgDir, 'src', 'exports')
  const exportFiles = fs
    .readdirSync(exportsDir)
    .filter((f) => /^[a-z]\.ts$/.test(f))
    .sort()
  const newLetter = exportFiles[exportFiles.length - 1].charAt(0)

  // Determine new library version key
  const currentVersion = pkgJson.version.replace(/\.\d+$/, '').replace('.', '_')
  const [major, minor] = pkgJson.version.split('.')
  const newMinor = parseInt(minor) + 1
  const newVersionKey = `v${major}_${newMinor}`

  // Build the new export entry (copy structure from /latest, update letter)
  const latestEntry = pkgJson.exports['./latest']
  const newEntry = {}
  for (const [key, val] of Object.entries(latestEntry)) {
    newEntry[key] = val.replace(/\/[a-z]\./, `/${newLetter}.`)
  }

  // Add new version entry
  pkgJson.exports[`./${newVersionKey}`] = newEntry

  // Update ./latest to point to new letter
  for (const key of Object.keys(pkgJson.exports['./latest'])) {
    pkgJson.exports['./latest'][key] = pkgJson.exports['./latest'][key].replace(
      /\/[a-z]\./,
      `/${newLetter}.`
    )
  }

  fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2) + '\n')
  info(`  Added ./${newVersionKey} export, updated ./latest`)
}

/**
 * Find all files matching a pattern recursively.
 */
function findFiles(dir, pattern) {
  const results = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory() && entry.name !== '__tests__') {
      results.push(...findFiles(full, pattern))
    } else if (entry.isFile() && pattern.test(entry.name)) {
      results.push(full)
    }
  }
  return results
}

/**
 * Walk up from a directory to find the package root (has package.json).
 */
function findPackageDir(dir) {
  let current = dir
  while (current !== '/') {
    if (fs.existsSync(path.join(current, 'package.json'))) {
      return current
    }
    current = path.dirname(current)
  }
  return null
}
