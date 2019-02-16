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
const semver = require('semver')
const { getPackage, getChangedPackages } = require('@instructure/pkg-utils')
const { runCommandAsync, runCommandSync, error, info  } = require('@instructure/command-utils')
const Project = require('@lerna/project')

async function bumpPackages (packageName, requestedVersion) {
  let args = []

  if (requestedVersion) {
    if (!['major', 'minor', 'patch', 'premajor', 'preminor', 'prepatch', 'prerelease']
      .includes(requestedVersion)) {
        // eslint-disable-next-line no-param-reassign
        requestedVersion = semver.valid(requestedVersion)
    }

    args.push(requestedVersion)

    if (requestedVersion.startsWith('pre')) {
      args = args.concat(['--preid', 'rc'])
    }

    if (requestedVersion.startsWith('pre') || semver.prerelease(requestedVersion)) {
      args.push('--exact')
    }
  }

  info(`📦  Bumping ${packageName} packages and generating changelogs...`)

  let releaseVersion

  try {
    await runCommandAsync('lerna', ['version',
      ...args,
      '--yes',
      '--no-push',
      '--no-git-tag-version',
      '--force-publish=*',
      '--conventional-commits'
    ])
    releaseVersion = new Project(process.cwd()).version
    const pkg = getPackage()
    pkg.set('version', releaseVersion)
    await pkg.serialize()
    info(`📦  Done bumping ${packageName} to ${releaseVersion}!`)
  } catch (err) {
    error(err)
    process.exit(1)
  }

  return releaseVersion
}
exports.bumpPackages = bumpPackages

async function publishPackages (packageName, releaseVersion, tag = 'rc') {
  if (!semver.valid(releaseVersion)) {
    error(`${releaseVersion} is not a valid semantic version!`)
    process.exit(1)
  }

  info(`📦  Publishing version ${releaseVersion} of ${packageName}...`)
  try {
    runCommandSync('lerna', ['publish',
      releaseVersion,
      '--yes',
      '--dist-tag',
      tag,
      '--no-push',
      '--no-git-tag-version',
      '--force-publish=*',
      '--conventional-commits'
    ])
    info(`📦  Version ${releaseVersion} of ${packageName} was successfully published!`)
  } catch (err) {
    error(err)
    process.exit(1)
  }
}
exports.publishPackages = publishPackages

function createNPMRCFile (config = {}) {
  const {
   NPM_TOKEN,
   NPM_EMAIL,
   NPM_USERNAME
  } = process.env

  // Only write an npmrc file if these are defined, otherwise assume the system is properly configured
  if (NPM_TOKEN) {
    fs.writeFileSync(
      path.resolve(process.cwd(), '.npmrc'),
      `//registry.npmjs.org/:_authToken=${NPM_TOKEN}\n${config.npm_scope}\nemail=${NPM_EMAIL}\nname=${NPM_USERNAME}`
    )
  }

  try  {
    runCommandSync('npm', ['whoami'])
  } catch (e) {
    error(`Could not determine if NPM auth was successful: ${e}`)
  }
}
exports.createNPMRCFile = createNPMRCFile

async function updateCrossPackageDependencies (packageName, releaseVersion, dependencyVersion) {
  const changedPackages = getChangedPackages()
  const changedPackageNames = changedPackages.map(pkg => pkg.name)

  info(`📦  Updating cross-package dependencies for ${packageName} to ${dependencyVersion}...`)
  await Promise.all(
    changedPackages.map(changedPackage => {
      const pkg = changedPackage.toJSON()
      let packageChanged = false

      const depCollections = [
        'dependencies',
        'devDependencies',
        'optionalDependencies',
        'peerDependencies'
      ]

      depCollections.forEach(depCollection => {
        if (!pkg[depCollection]) return

        const newDependencies = Object.keys(pkg[depCollection])
          .filter(dep => {
            return (
              changedPackageNames.includes(dep) &&
              pkg[depCollection][dep] === `^${releaseVersion}`
            )
          })
          .reduce((obj, dep) => ({ ...obj, [dep]: dependencyVersion }), {})

        if (Object.entries(newDependencies).length > 0) {
          changedPackage.set(
            depCollection,
            Object.assign(pkg[depCollection], newDependencies)
          )
          packageChanged = true
        }
      })

      if (packageChanged) {
        return changedPackage.serialize()
      }
    })
  )
}
exports.updateCrossPackageDependencies = updateCrossPackageDependencies
