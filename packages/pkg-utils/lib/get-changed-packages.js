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
const shell = require('shelljs')
const path = require('path')
const getPackages = require('./get-packages')

module.exports = function getChangedPackages (commitIsh = 'HEAD^1', allPackages) {
  if (commitIsh === '--cached') {
    return getPackagesWithStagedChanges(allPackages)
  }

  allPackages = allPackages || getPackages() // eslint-disable-line no-param-reassign

  const result = shell.exec(`lerna ls --since ${commitIsh} --json`, { silent: true })
    .stdout
  const changedPackages = JSON.parse(result).map(pkg => pkg.name)
  return allPackages.filter(pkg => changedPackages.includes(pkg.name))
}

function getPackagesWithStagedChanges (allPackages) {
  allPackages = allPackages || getPackages() // eslint-disable-line no-param-reassign

  const changedFiles = shell.exec('git diff --cached --name-only', { silent: true })
    .stdout
    .split('\n')

  return allPackages
    .filter((pkg) => {
      const relativePath = path.relative('.', pkg.location) + path.sep
      return changedFiles
        .findIndex(changedFile => changedFile.startsWith(relativePath)) >= 0
    })
}
