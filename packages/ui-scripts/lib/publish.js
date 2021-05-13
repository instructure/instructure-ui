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
  runCommandAsync
} = require('@instructure/command-utils')

const { publishPackages, createNPMRCFile } = require('./utils/npm')
const { isReleaseCommit, setupGit } = require('./utils/git')
const { getConfig } = require('./utils/config')

try {
  const pkgJSON = getPackageJSON()
  // Arguments
  // 1: publish type. defaults to latest. If set to 'maintenance', it will publish with vx_maintenance tag
  // e.g.: ui-scripts --publish maintenance
  publish({
    packageName: pkgJSON.name,
    currentVersion: pkgJSON.version,
    packageConfig: getConfig(pkgJSON),
    releaseType: process.argv[3]
  })
} catch (err) {
  error(err)
  process.exit(1)
}

async function publish(options) {
  const {
    packageName,
    currentVersion,
    packageConfig,
    releaseType = 'latest'
  } = options

  //If on legacy branch, and it is a release, its tag should say vx_maintenance
  const releaseTag =
    releaseType === 'maintenance'
      ? `v${currentVersion.split('.')[0]}_maintenance`
      : 'latest'

  //Set up git user.name and user.email
  setupGit()
  //create NPM RC and try to auth in to npm
  createNPMRCFile(packageConfig)

  const isRelease = isReleaseCommit(currentVersion)
  const infoMessage = isRelease
    ? `📦  Currently on release commit for ${currentVersion} of ${packageName}.`
    : `📦  Not on a release commit--publishing a snapshot-release...`

  info(infoMessage)

  info(`📦  Version: ${releaseVersion}, Tag: ${npmTag}`)

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
}
