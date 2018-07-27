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
const { getPackagePath, getPackages, getChangedPackages } = require('@instructure/pkg-util')
const { getCommand, runCommandsConcurrently, runCommandSync } = require('../utils/command')

const vars = ['NODE_ENV=test']
const { argv } = process

if (argv.includes('--watch')) {
  vars.push('DEBUG=1')
} else {
  vars.push('COVERAGE=1')
}

const reactArgIndex = argv.indexOf('--react')
if (reactArgIndex > 0) {
  const version = argv[reactArgIndex + 1]
  if (['15', '16'].includes(version)) {
    const packagePath = getPackagePath()
    const pkgJSON = JSON.parse(fs.readFileSync(packagePath))
    const originalResolutions = pkgJSON.resolutions

    pkgJSON.resolutions = {
      ...(originalResolutions || {}),
      'react': version,
      'react-dom': version
    }

    fs.writeFileSync(packagePath, JSON.stringify(pkgJSON, null, 2) + '\n')

    try {
      runCommandSync('yarn', ['--pure-lockfile'])
    } catch (err) {
      console.error(err)
      process.exit(1)
    }

    pkgJSON.resolutions = originalResolutions
    fs.writeFileSync(packagePath, JSON.stringify(pkgJSON, null, 2) + '\n')
  }
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
