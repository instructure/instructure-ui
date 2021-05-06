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
const {
  error,
  info,
  runCommandSync,
  runCommandAsync,
  confirm
} = require('@instructure/command-utils')

const { getConfig } = require('./utils/config')
const {
  checkWorkingDirectory,
  isReleaseCommit,
  setupGit
} = require('./utils/git')
const { publishPackages, createNPMRCFile } = require('./utils/npm')

try {
  const pkgJSON = getPackageJSON()
  // Arguments
  // 1: version to publish. If current version, use 'current' or don't pass anything. Otherwise e.g.: 8.1.3
  // 2: publish type. defaults to current. If set to 'maintenance', it will publish with vx_maintenance tag
  // e.g.: ui-scripts --publish 5.12.2 maintenance
  const releaseVersion =
    process.argv[3] === 'current' || !process.argv[3]
      ? pkgJSON.version
      : process.argv[3]
  publishLatest({
    packageName: pkgJSON.name,
    currentVersion: pkgJSON.version,
    releaseVersion: releaseVersion,
    config: getConfig(pkgJSON),
    releaseType: process.argv[4]
  })
} catch (err) {
  error(err)
  process.exit(1)
}

async function publishLatest({
  packageName,
  currentVersion,
  releaseVersion,
  config = {},
  releaseType = 'latest'
}) {
  //If on legacy branch, and it is a release, its tag should say vx_maintenance
  const releaseTag =
    releaseType === 'maintenance'
      ? `v${currentVersion.split('.')[0]}_maintenance`
      : 'latest'

  const npmTag = currentVersion === releaseVersion ? releaseTag : 'snapshot'

  setupGit()
  createNPMRCFile(config)

  checkWorkingDirectory()

  info(`📦  Version: ${releaseVersion}, Tag: ${npmTag}`)

  // lerna ususally fails in releasing, but releasing snapshots is too complicated
  // without it. Npm-cli figures out versions from the package.json so if we'd like to
  // release a snapshot version, like: 8.3.5-snapshot.19, we'd need to set this exact version
  // to package.json and set it back to the current released version after the release.
  // We use lerna for snapshot and native npm-cli commands for releases

  if (currentVersion === releaseVersion && !isReleaseCommit(releaseVersion)) {
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

          if (packageInfo.versions.includes(currentVersion)) {
            info(`📦  v${currentVersion} of ${pkg.name} is already published!`)
          } else {
            try {
              await runCommandAsync('npm', [
                'publish',
                pkg.location,
                '--tag',
                npmTag
              ])
              info(
                `📦  Version ${releaseVersion} of ${packageName} was successfully published!`
              )
            } catch (err) {
              error(err)
            }
          }
        }
      })
    )
  } else {
    try {
      await publishPackages(packageName, releaseVersion, npmTag)
    } catch (e) {
      error(e)
      process.exit(1)
    }
  }
}
