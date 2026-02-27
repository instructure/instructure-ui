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

import chokidar from 'chokidar'
import { globby } from 'globby'
import { resolve as resolvePath } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Dynamically import the processSingleFile function and version map builder
const { processSingleFile } = await import('../lib/build-docs.mjs')
const { buildVersionMap } = await import('../lib/utils/buildVersionMap.mjs')

const projectRoot = resolvePath(__dirname, '../../../')
const buildDir = resolvePath(__dirname, '../__build__/')

console.log('[MARKDOWN WATCHER] Starting markdown file watcher...')

// Load the version map once at startup
let versionMap = null
try {
  versionMap = await buildVersionMap(projectRoot)
  console.log(
    `[MARKDOWN WATCHER] Loaded version map with versions: ${versionMap.libraryVersions.join(', ')}`
  )
} catch (error) {
  console.warn('[MARKDOWN WATCHER] Could not load version map, falling back to root-only writes:', error.message)
}

/**
 * Given a file path and a docObject, determines which version subdirectories
 * the doc JSON should be written to.
 */
function getTargetVersionDirs(filePath, docObject) {
  if (!versionMap || versionMap.libraryVersions.length === 0) {
    return [] // No version subdirs to write to
  }

  // Non-versioned file: write to ALL version subdirs
  if (!docObject.componentVersion) {
    return versionMap.libraryVersions
  }

  // Versioned file: write only to version subdirs where this component version is expected
  const pkgMatch = filePath.match(/packages\/(ui-[^/]+)\//)
  if (!pkgMatch) {
    return versionMap.libraryVersions
  }

  const pkgShortName = pkgMatch[1]
  const targetVersions = []

  for (const libVersion of versionMap.libraryVersions) {
    const mapping = versionMap.mapping[libVersion]
    if (!mapping) continue

    const entry = mapping[pkgShortName]
    if (!entry) {
      // Package not in version map, include v1 files
      if (docObject.componentVersion === 'v1') {
        targetVersions.push(libVersion)
      }
    } else if (entry.componentVersion === docObject.componentVersion) {
      targetVersions.push(libVersion)
    }
  }

  return targetVersions
}

// Find all markdown files to watch
const patterns = ['packages/**/*.md', 'docs/**/*.md']
const ignore = [
  '**/node_modules/**',
  '**/__build__/**',
  '**/__tests__/**',
  '**/__fixtures__/**',
  '**/__testfixtures__/**',
  '**/config/**',
  '**/templates/**',
  '**/regression-test/**',
  'packages/*/README.md', // main package READMEs
  '**/packages/**/CHANGELOG.md'
]
const cwd = resolvePath(__dirname, '../../../')

console.log('[MARKDOWN WATCHER] Searching for markdown files...')
const paths = await globby(patterns, { cwd, absolute: true, ignore })

console.log(`[MARKDOWN WATCHER] Found ${paths.length} markdown files to watch`)

// Debounce file changes to avoid processing the same file multiple times
const processedFilesMap = new Map()
const DEBOUNCE_MS = 300

// Cleanup old entries from the Map every 5 minutes to prevent memory leak
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000 // 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [filePath, timestamp] of processedFilesMap.entries()) {
    if (now - timestamp > DEBOUNCE_MS) {
      processedFilesMap.delete(filePath)
    }
  }
}, CLEANUP_INTERVAL_MS)

function debouncedProcess(filePath) {
  const now = Date.now()
  const lastProcessed = processedFilesMap.get(filePath)

  if (lastProcessed && now - lastProcessed < DEBOUNCE_MS) {
    return // Skip if file was processed recently
  }

  processedFilesMap.set(filePath, now)

  try {
    console.log(`[MARKDOWN WATCHER] File changed: ${filePath}`)
    const docObject = processSingleFile(filePath)
    if (!docObject) {
      console.log(`[MARKDOWN WATCHER] No doc output for: ${filePath}`)
      return
    }

    // Write to version subdirectories
    const targetVersionDirs = getTargetVersionDirs(filePath, docObject)
    const docJSON = JSON.stringify(docObject)

    for (const libVersion of targetVersionDirs) {
      const versionDocsDir = `${buildDir}/docs/${libVersion}/`
      fs.mkdirSync(versionDocsDir, { recursive: true })
      fs.writeFileSync(versionDocsDir + docObject.id + '.json', docJSON)
    }

    if (targetVersionDirs.length > 0) {
      console.log(
        `[MARKDOWN WATCHER] Wrote to version dirs: ${targetVersionDirs.join(', ')}`
      )
    }

    console.log(`[MARKDOWN WATCHER] Successfully processed: ${filePath}`)
  } catch (error) {
    console.error(`[MARKDOWN WATCHER] Error processing file: ${filePath}`, error)
  }
}

// Start watching
const watcher = chokidar.watch(paths, {
  persistent: true,
  ignoreInitial: true,
  awaitWriteFinish: {
    stabilityThreshold: 100,
    pollInterval: 100
  }
})

watcher
  .on('ready', () => {
    console.log(`[MARKDOWN WATCHER] Now watching ${paths.length} markdown files for changes`)
  })
  .on('change', (filePath) => {
    debouncedProcess(filePath)
  })
  .on('error', (error) => {
    console.error('[MARKDOWN WATCHER] Watcher error:', error)
  })

// Handle graceful shutdown
const shutdown = () => {
  console.log('\n[MARKDOWN WATCHER] Shutting down...')
  watcher.close()
  process.exit(0)
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
