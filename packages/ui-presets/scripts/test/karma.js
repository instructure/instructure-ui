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
const { getPackages, getChangedPackages } = require('@instructure/pkg-util')
const { getCommand, runCommandsConcurrently } = require('../utils/command')

const vars = ['NODE_ENV=test']
const { argv } = process

if (argv.includes('--watch')) {
  vars.push('DEBUG=1')
} else {
  vars.push('COVERAGE=1')
}

const scopeArgIndex = argv.indexOf('--scope')
const pathArgIndex = argv.indexOf('--path')

let paths = []

if (scopeArgIndex > 0) {
  const allPackages = getPackages()
  const pkg = allPackages.find(pkg => pkg.name === argv[scopeArgIndex + 1])
  if (pkg) {
    paths = [path.relative('.', pkg.location) + path.sep]
  }
} else if (pathArgIndex > 0) {
  paths = argv[pathArgIndex + 1].split(',').map(path => path.normalize(path.trim()))
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

const result = runCommandsConcurrently({
  karma: getCommand('karma', ['start'], vars)
})

process.exit(result.status)
