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

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Dynamically import the processSingleFile function
const { processSingleFile } = await import('../lib/build-docs.mjs')

console.log('[MARKDOWN WATCHER] Starting markdown file watcher...')

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
const processedFiles = new Map()
const DEBOUNCE_MS = 300

// Cleanup old entries from the Map every 5 minutes to prevent memory leak
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000 // 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [filePath, timestamp] of processedFiles.entries()) {
    if (now - timestamp > DEBOUNCE_MS) {
      processedFiles.delete(filePath)
    }
  }
}, CLEANUP_INTERVAL_MS)

function debouncedProcess(filePath) {
  const now = Date.now()
  const lastProcessed = processedFiles.get(filePath)

  if (lastProcessed && now - lastProcessed < DEBOUNCE_MS) {
    return // Skip if file was processed recently
  }

  processedFiles.set(filePath, now)

  try {
    console.log(`[MARKDOWN WATCHER] File changed: ${filePath}`)
    processSingleFile(filePath)
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
