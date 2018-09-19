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
const { getCommand, runCommandsConcurrently } = require('../utils/command')

const vars = ['NODE_ENV=test', `REACT_VERSION=${React.version}`]
const { argv } = process
const args = ['start']

if (argv.includes('--watch')) {
  vars.push('DEBUG=1')
} else {
  vars.push('COVERAGE=1')
}

if (argv.includes('--no-launch')) {
  args.push('--no-launch')
}

if (argv.includes('--no-headless')) {
  args.push('--no-headless')
}

const scopeArgIndex = argv.indexOf('--scope')
const pathArgIndex = argv.indexOf('--path')

let paths = []

if (scopeArgIndex > 0) {
  const allPackages = getPackages()
  const scopes = argv[scopeArgIndex + 1].split(',').map(scope => scope.trim())
  const pkgs = allPackages.filter(pkg => scopes.includes(pkg.name))
  if (pkgs.length > 0) {
    paths = pkgs.map(pkg => path.relative('.', pkg.location) + path.sep)
  }
} else if (pathArgIndex > 0) {
  paths = argv[pathArgIndex + 1].split(',').map(path => path.trim())
} else if (argv.includes('--changed')) {
  const changedPackages = getChangedPackages('HEAD^1')
  paths = changedPackages.map(pkg => path.relative('.', pkg.location) + path.sep)
} else if (argv.includes('--staged')) {
  const changedPackages = getChangedPackages('--cached')
  paths = changedPackages.map(pkg => path.relative('.', pkg.location) + path.sep)
}

if (paths.length > 0) {
  vars.push(`UI_TEST_SCOPE_PATHS=${paths.join(',')}`)
}

if (argv.includes('--testbed')) {
  vars.push('USE_TESTBED=1')
}

const result = runCommandsConcurrently({
  karma: getCommand('karma', args, vars)
})

process.exit(result.status)
