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

const fs = require('fs')
const path = require('path')
const url = require('url')

const NODE_PACKAGES = [
  'ui-icons-build',
  'ui-babel-preset',
  'ui-codemods',
  'ui-scripts',
  'command-utils',
  'instui-cli',
  'babel-plugin-transform-imports',
  'pkg-utils'
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
  'src/themes/newThemes'
]
function deleteDirs(dirs = []) {
  return dirs.map((dir) => {
    fs.rmSync(dir, { force: true, recursive: true })
  })
}
// deletes built files from tooling packages (NODE_PACKAGES const)
function clean() {
  const packagesPath = path.resolve('./packages')
  const dir = fs.opendirSync(packagesPath)
  let packageDir
  while ((packageDir = dir.readSync()) !== null) {
    if (packageDir.isDirectory()) {
      const rmDirs = DIRS_TO_DELETE.map(
        (dir) => `${packagesPath}/${packageDir.name}/${dir}`
      )
      if (NODE_PACKAGES.includes(packageDir.name)) {
        deleteDirs(rmDirs)
      } else {
        deleteDirs([...rmDirs, `${packagesPath}/${packageDir.name}/lib`])
      }
    }
  }
}
// deletes node_modules recursively
function removeNodeModules() {
  const dirs = fs.readdirSync('.', { recursive: true, withFileTypes: true })
  const toRemove = []
  for (const dir of dirs) {
    if (dir.isDirectory() && dir.name.toLowerCase() === 'node_modules') {
      toRemove.push(url.pathToFileURL(path.join(dir.parentPath, dir.name)))
    }
  }
  deleteDirs(toRemove)
}

// eslint-disable-next-line no-console
console.info('Deleting generated files...')
clean()
const args = process.argv.slice(2)
if (args.length > 0 && args[0] === '--nuke_node') {
  // eslint-disable-next-line no-console
  console.info('Deleting node_modules recursively...')
  removeNodeModules()
}
