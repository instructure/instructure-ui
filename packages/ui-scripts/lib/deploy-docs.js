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
const { getPackageJSON } = require('@instructure/pkg-utils')
const { error, info } = require('@instructure/command-utils')

const { publishGithubPages } = require('./utils/gh-pages')
const { getConfig } = require('./utils/config')
const { setupGit, isReleaseCommit } = require('./utils/git')

try {
  const pkgJSON = getPackageJSON()
  deployDocs(pkgJSON.name, pkgJSON.version, getConfig(pkgJSON))
} catch (err) {
  error(err)
  process.exit(1)
}

function deployDocs (packageName, currentVersion, config = {}) {
  setupGit()

  if (isReleaseCommit(currentVersion)) {
    info(`📖   Deploying documentation for ${currentVersion} of ${packageName}...`)
    try {
      publishGithubPages(config)
    } catch (err) {
      error(err)
      process.exit(1)
    }
    info(`📖   Documentation for ${currentVersion} of ${packageName} was successfully deployed!`)
  } else {
    info(`📦  Not on a release commit--skipping documentation publish.`)
  }
}
