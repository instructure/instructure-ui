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

async function syncRootPackageVersion (useProjectVersion) {
  const project = new Project(process.cwd())
  const rootPkg = getPackage()

  let projectVersion

  if (project.isIndependent() || useProjectVersion) {
    projectVersion = project.version
  } else {
    // unfortunately lerna doesn't update lerna.json for canary releases,
    // so we have to do this:
    const pkgs = getChangedPackages()
    projectVersion = pkgs[0].get('version')
  }

  if (projectVersion !== rootPkg.get('version')) {
    rootPkg.set('version', projectVersion)
    await rootPkg.serialize()
  }

  return projectVersion
}

async function bumpPackages (packageName, requestedVersion) {
  let args = []
  let bumpVersion = requestedVersion

  if (bumpVersion) {
    if (!['major', 'minor', 'patch'].includes(bumpVersion)) {
      bumpVersion = semver.valid(bumpVersion)

      if (!bumpVersion) {
        error(`${requestedVersion} is not a valid semantic version!`)
        process.exit(1)
      }
    }

    args.push(bumpVersion)

    if (semver.prerelease(bumpVersion)) {
      args.push('--exact')
    }
  }

  if (process.env.CI) {
    args.push('--yes')
  }

  info(`📦  Bumping ${packageName} packages and generating changelogs...`)

  let releaseVersion

  try {
    await runCommandAsync('lerna', [
      'version',
      ...args,
      '--include-merged-tags',
      '--no-push',
      '--no-git-tag-version',
      '--force-publish=*',
      '--conventional-commits'
    ])

    releaseVersion = await syncRootPackageVersion(true)

    info(`📦  Done bumping ${packageName} to ${releaseVersion}!`)
  } catch (err) {
    error(err)
    process.exit(1)
  }

  return releaseVersion
}
exports.bumpPackages = bumpPackages

async function publishPackages (packageName, releaseVersion = 'prerelease', preidAndTag = 'rc') {
  let args

  if (releaseVersion === 'prerelease') {
    args = [
      '--canary',
      '--preid', preidAndTag,
      '--dist-tag', preidAndTag,
      '--exact',
      '--include-merged-tags',
      '--conventional-commits',
      '--no-git-reset'
    ]
  } else {
    args = ['from-package', '--dist-tag', 'latest']
  }

  info(`📦  Publishing ${releaseVersion} of ${packageName}...`)
  let publishedVersion

  try {
    runCommandSync('lerna', [
      'publish',
      ...args,
      '--yes',
      '--no-push',
      '--no-git-tag-version',
      '--force-publish=*'
    ])

    publishedVersion = await syncRootPackageVersion()

    info(`📦  ${publishedVersion} of ${packageName} was successfully published!`)
  } catch (err) {
    error(err)
    process.exit(1)
  }

  return publishedVersion
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
