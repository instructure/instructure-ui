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

const NODE_PACKAGES = [
  'ui-icons-build',
  'ui-eslint-config',
  'ui-babel-preset',
  'ui-token-scripts',
  'ui-codemods',
  'ui-karma-config',
  'ui-template-scripts',
  'ui-stylelint-config',
  'ui-scripts',
  'command-utils',
  'config-loader',
  'cz-lerna-changelog',
  'eslint-plugin-instructure-ui',
  'instui-cli',
  'pkg-utils',
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
  'es'
]
function deleteDirs(dirs = []) {
  return dirs.map((dir) => {
    fs.rmSync(dir, { force: true, recursive: true })
  })
}
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
// eslint-disable-next-line no-console
console.info('cleaning packages...')
clean()
// eslint-disable-next-line no-console
console.info('clean finished')
