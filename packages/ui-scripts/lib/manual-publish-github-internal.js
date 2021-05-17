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
  isReleaseCommit,
  setupGit
} = require('./utils/git')
const { createNPMRCFile } = require('./utils/npm')

try {
  const pkgJSON = getPackageJSON(undefined)
  // ui-scripts --publish               - to publish from the master branch
  // ui-scripts --publish maintenance   - to publish from any legacy branch
  const isMaintenance = process.argv[3] === 'maintenance'

  manualPublishGithubInternal({
    packageName: pkgJSON.name,
    version: pkgJSON.version,
    isMaintenance,
    //TODO investigate if config is needed
    config: getConfig(pkgJSON)
  })
} catch (err) {
  error(err)
  process.exit(1)
}

async function manualPublishGithubInternal({
     packageName,
     version,
     isMaintenance,
     config = {}
   }) {
  const isRelease = isReleaseCommit(version)

  setupGit()
  createNPMRCFile(config)

  checkWorkingDirectory()

  // lerna usually fails in releasing, but releasing snapshots is too complicated
  // without it. Npm-cli figures out versions from the package.json so if we'd like to
  // release a snapshot version, like: 8.3.5-snapshot.19, we'd need to set this exact version
  // to package.json and set it back to the current released version after the release.
  // We use lerna for snapshot and native npm-cli commands for releases

  if (isRelease) {
    // If on legacy branch, and it is a release, its tag should say vx_maintenance
    const tag = isMaintenance
      ? `v${version.split('.')[0]}_maintenance`
      : 'latest'

    info(`📦  Version: ${version}, Tag: ${tag}`)

    const reply = await confirm('Continue? [y/n]\n')
    if (!['Y', 'y'].includes(reply.trim())) {
      process.exit(0)
    }

    return Promise.all(
      getPackages().map(async (pkg) => {
        if (pkg.private) {
          info(`${pkg.name} is private.`)
        } else {
          let packageInfo = { versions: [] }

          try {
            const { stdout } = runCommandSync(
              'npm',
              ['info', pkg.name, '--json'],
              [],
              { stdio: 'pipe' }
            )
            packageInfo = JSON.parse(stdout)
          } catch (e) {
            error(e)
          }

          if (packageInfo.versions.includes(version)) {
            info(`📦  v${version} of ${pkg.name} is already published!`)
          } else {
            try {
              await runCommandAsync('npm', [
                'publish',
                pkg.location,
                '--tag',
                tag
              ])
              info(
                `📦  Version ${version} of ${packageName} was successfully published!`
              )
            } catch (err) {
              error(err)
            }
          }
        }
      })
    )
  }
}
