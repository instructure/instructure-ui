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

const fsp = require('fs/promises')
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
async function deleteDirs(dirs = []) {
  return Promise.all(
    dirs.map((dir) => fsp.rm(dir, { force: true, recursive: true }))
  )
}
async function clean() {
  const packagesPath = path.resolve('./packages')
  const dir = await fsp.opendir(packagesPath)

  for await (const package of dir) {
    const rmDirs = DIRS_TO_DELETE.map(
      (dir) => `${packagesPath}/${package.name}/${dir}`
    )
    if (NODE_PACKAGES.includes(package.name)) {
      deleteDirs(rmDirs)
    } else {
      deleteDirs([...rmDirs, `${packagesPath}/${package.name}/lib`])
    }
  }
}
// eslint-disable-next-line no-console
console.info('cleaning packages...')
clean()
