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
const { getPackageJSON, getPackages } = require('@instructure/pkg-utils')
const { error, info, runCommandSync, runCommandAsync, confirm } = require('@instructure/command-utils')

const { getConfig } = require('./utils/config')
const {
  checkWorkingDirectory,
  checkIfCommitIsReviewed,
  isReleaseCommit,
  setupGit
} = require('./utils/git')
const { createNPMRCFile } = require('./utils/npm')

try {
  const pkgJSON = getPackageJSON()
  // optional version argument
  // ui-scripts --fix-publish 5.12.2
  fixPublish(pkgJSON.name, pkgJSON.version, process.argv[3] || pkgJSON.version, getConfig(pkgJSON))
} catch (err) {
  error(err)
  process.exit(1)
}

async function fixPublish (packageName, currentVersion, releaseVersion, config = {}) {
  const npmTag = (currentVersion === releaseVersion) ? 'latest' : 'rc'

  setupGit()
  createNPMRCFile(config)

  checkWorkingDirectory()

  if (currentVersion === releaseVersion) {
    if (isReleaseCommit(releaseVersion)) {
      checkIfCommitIsReviewed()
    } else {
      error('Latest release should be run from a merged version bump commit!')
      process.exit(1)
    }
  }

  info(`📦  Version: ${releaseVersion}, Tag: ${npmTag}`)
  const reply = await confirm('Continue? [y/n]\n')
  if (!['Y', 'y'].includes(reply.trim())) {
    process.exit(0)
  }

  return Promise.all(getPackages().map(async pkg => {
    if (pkg.private) {
      info(`${pkg.name} is private.`)
    } else {

      let packageInfo = { versions: [] }

      try {
        const { stdout } = runCommandSync('npm', ['info', pkg.name, '--json'], [], { stdio: 'pipe' })
        packageInfo = JSON.parse(stdout)
      } catch (e) {
        error(e)
      }

      if (packageInfo.versions.includes(currentVersion)) {
        info(`📦  v${currentVersion} of ${pkg.name} is already published!`)
      } else {
        try {
          await runCommandAsync('npm', ['publish', pkg.location, '--tag', npmTag])
          info(`📦  Version ${releaseVersion} of ${packageName} was successfully published!`)
        } catch (err) {
          error(err)
        }
      }
    }
  }))
}
