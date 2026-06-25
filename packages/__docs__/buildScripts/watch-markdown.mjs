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

// Dynamically import build functions and shared version utilities
const { parseAndWriteFile } = await import('../lib/parseSingleFile.mjs')
const { buildVersionMap, getPackageShortName, isDocIncludedInVersion } = await import('../lib/utils/buildVersionMap.mjs')

const projectRoot = resolvePath(__dirname, '../../../')
const buildDir = resolvePath(__dirname, '../__build__/')

// Load the version map once at startup
let versionMap = null
try {
  versionMap = await buildVersionMap(projectRoot)
} catch (error) {
  console.warn('Could not load version map, falling back to root-only writes:', error.message)
}

/**
 * Given a file path and a docObject, determines which version subdirectories
 * the doc JSON should be written to.
 */
function getTargetVersionDirs(filePath, docObject) {
  if (!versionMap || versionMap.libraryVersions.length === 0) {
    return []
  }

  const pkgShortName = getPackageShortName(filePath)
  return versionMap.libraryVersions.filter((libVersion) =>
    isDocIncludedInVersion(
      versionMap,
      libVersion,
      docObject.componentVersion,
      pkgShortName
    )
  )
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

const paths = await globby(patterns, { cwd, absolute: true, ignore })

// Debounce file changes to avoid processing the same file multiple times
const processedFilesMap = new Map()
const DEBOUNCE_MS = 300

function debouncedProcess(filePath) {
  const now = Date.now()
  const lastProcessed = processedFilesMap.get(filePath)

  if (lastProcessed && now - lastProcessed < DEBOUNCE_MS) {
    return // Skip if file was processed recently
  }

  processedFilesMap.set(filePath, now)

  try {
    console.log(`File changed: ${filePath}`)
    const docObject = parseAndWriteFile(filePath, buildDir)
    if (!docObject) {
      console.log(`No doc output for: ${filePath}`)
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
        `Wrote to version dirs: ${targetVersionDirs.join(', ')}`
      )
    }

    console.log(`Successfully processed: ${filePath}`)
  } catch (error) {
    console.error(`Error processing file: ${filePath}`, error)
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
    console.log(`Watching ${paths.length} markdown files`)
  })
  .on('change', (filePath) => {
    debouncedProcess(filePath)
  })
  .on('error', (error) => {
    console.error('Watcher error:', error)
  })

// Handle graceful shutdown
const shutdown = () => {
  console.log('\nShutting down...')
  watcher.close()
  process.exit(0)
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
