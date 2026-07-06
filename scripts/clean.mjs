#! /usr/bin/env node
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

import { promises } from 'fs'
import { resolve, join } from 'path'
import { execSync } from 'child_process'

const NODE_PACKAGES = [
  'ui-babel-preset',
  'ui-codemods',
  'ui-scripts',
  'command-utils',
  'babel-plugin-transform-imports'
]

const DIRS_TO_DELETE = [
  'tsconfig.build.tsbuildinfo',
  'types',
  '__build__',
  'dist',
  'tokens',
  '.babel-cache',
  '.cache',
  'es',
  'src/themes/newThemeTokens'
]

async function deleteDirs(dirs = []) {
  // Delete all in parallel with error handling
  await Promise.all(
    dirs.map((dir) =>
      promises.rm(dir, { force: true, recursive: true }).catch(() => {
        // Silently ignore errors (file doesn't exist, etc)
      })
    )
  )
}

// deletes build artifacts from all packages
async function clean() {
  const packagesPath = resolve('./packages')
  const packageDirs = await promises.readdir(packagesPath, { withFileTypes: true })

  // Process all packages in parallel
  const deletions = packageDirs
    .filter((dir) => dir.isDirectory())
    .map(async (packageDir) => {
      const rmDirs = DIRS_TO_DELETE.map((dir) =>
        join(packagesPath, packageDir.name, dir)
      )

      if (!NODE_PACKAGES.includes(packageDir.name)) {
        rmDirs.push(join(packagesPath, packageDir.name, 'lib'))
      }

      return deleteDirs(rmDirs)
    })

  await Promise.all(deletions)
}

// deletes node_modules recursively - OPTIMIZED VERSION
function removeNodeModules() {
  try {
    // Use native find command - 10-100x faster than Node.js recursive scan
    console.info('Finding node_modules directories...')
    execSync(
      'find . -name "node_modules" -type d -prune -exec rm -rf {} + 2>/dev/null || true',
      { stdio: 'inherit' }
    )
  } catch (error) {
    console.error('Failed to remove node_modules:', error.message)
    process.exit(1)
  }
}

async function main() {
  console.info('Deleting build artifacts...')
  await clean()

  const args = process.argv.slice(2)
  if (args.length > 0 && args[0] === '--nuke_node') {
    console.info('Deleting node_modules recursively...')
    removeNodeModules()
  }
}

main().catch((error) => {
  console.info('clean.js failed:', error)
  process.exit(1)
})
