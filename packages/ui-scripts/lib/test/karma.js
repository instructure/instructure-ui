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
const path = require('path')
const React = require('react')
const { getPackages, getChangedPackages } = require('@instructure/pkg-utils')
const {
  getCommand,
  runCommandsConcurrently
} = require('@instructure/command-utils')

const {
  UNMANGLED_CLASS_NAMES,
  DISABLE_SPEEDY_STYLESHEET,
  USE_WEBPACK_CSS_LOADERS,
  OMIT_INSTUI_DEPRECATION_WARNINGS
} = process.env

const args = process.argv.slice(2)

const karmaArgs = ['start']

let envVars = [
  'NODE_ENV=test',
  `REACT_VERSION=${React.version}`,
  'NODE_OPTIONS=--max_old_space_size=120000',
  OMIT_INSTUI_DEPRECATION_WARNINGS
    ? `OMIT_INSTUI_DEPRECATION_WARNINGS=1`
    : false
]

if (args.includes('--watch')) {
  envVars = envVars
    .concat([
      `DEBUG=1`,
      `UNMANGLED_CLASS_NAMES=1`,
      `USE_WEBPACK_CSS_LOADERS=1`,
      'DISABLE_SPEEDY_STYLESHEET=1'
    ])
    .filter(Boolean)
} else {
  envVars = envVars
    .concat([
      `${React.version}`.startsWith('15') || args.includes('--no-coverage')
        ? false
        : 'COVERAGE=1',
      UNMANGLED_CLASS_NAMES ? `UNMANGLED_CLASS_NAMES=1` : false,
      DISABLE_SPEEDY_STYLESHEET ? `DISABLE_SPEEDY_STYLESHEET=1` : false,
      USE_WEBPACK_CSS_LOADERS ? `USE_WEBPACK_CSS_LOADERS=1` : false
    ])
    .filter(Boolean)
}

if (args.includes('--no-launch')) {
  karmaArgs.push('--no-launch')
}

if (args.includes('--no-headless')) {
  karmaArgs.push('--no-headless')
}

if (args.includes('--randomize')) {
  karmaArgs.push('--randomize')
}

if (args.includes('--no-lint')) {
  karmaArgs.push('--no-lint')
}

const browsersArgIndex = args.findIndex((arg) => arg.startsWith('--browsers='))

if (browsersArgIndex >= 0) {
  karmaArgs.push(args[browsersArgIndex])
}

const scopeArgIndex = args.indexOf('--scope')
const pathArgIndex = args.indexOf('--path')

let paths = []

if (scopeArgIndex >= 0) {
  const allPackages = getPackages()
  const scopes = args[scopeArgIndex + 1].split(',').map((scope) => scope.trim())
  const pkgs = allPackages.filter((pkg) => scopes.includes(pkg.name))
  if (pkgs.length >= 0) {
    paths = pkgs.map((pkg) => path.relative('.', pkg.location) + path.sep)
  }
} else if (pathArgIndex >= 0) {
  paths = args[pathArgIndex + 1].split(',').map((path) => path.trim())
} else if (args.includes('--changed')) {
  const changedPackages = getChangedPackages('HEAD^1')
  paths = changedPackages.map(
    (pkg) => path.relative('.', pkg.location) + path.sep
  )
} else if (args.includes('--staged')) {
  const changedPackages = getChangedPackages('--cached')
  paths = changedPackages.map(
    (pkg) => path.relative('.', pkg.location) + path.sep
  )
}

if (paths.length > 0) {
  envVars.push(`UI_TEST_SCOPE_PATHS=${paths.join(',')}`)
}

process.exit(
  runCommandsConcurrently({
    karma: getCommand('karma', karmaArgs, envVars)
  }).status
)
