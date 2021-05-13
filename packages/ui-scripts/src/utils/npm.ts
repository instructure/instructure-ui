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
import fs from 'fs'
import path from 'path'
import semver from 'semver'
import { getPackage, getChangedPackages } from '@instructure/pkg-utils'
import {
  runCommandAsync,
  runCommandSync,
  error,
  info
} from '@instructure/command-utils'
//@ts-expect-error FIXME: add typings
import { Project } from '@lerna/project'

export const publishPackages = async (
  packageName: string,
  releaseVersion: string,
  preidAndTag: string
) => {
  const args =
    releaseVersion === 'prerelease'
      ? [
          '--canary',
          '--preid',
          preidAndTag,
          '--dist-tag',
          preidAndTag,
          '--exact',
          '--include-merged-tags',
          '--conventional-commits',
          '--conventional-prerelease=*',
          '--no-git-reset'
        ]
      : ['from-package', '--dist-tag', preidAndTag]

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

    info(
      `📦  ${publishedVersion} of ${packageName} was successfully published!`
    )
  } catch (err) {
    error(err)
    process.exit(1)
  }

  return publishedVersion
}

const syncRootPackageVersion = async (useProjectVersion?: any) => {
  const project = new Project(process.cwd())
  const rootPkg = getPackage(undefined)

  let projectVersion

  if (project.isIndependent() || useProjectVersion) {
    projectVersion = project.version
  } else {
    // unfortunately lerna doesn't update lerna.json for canary releases,
    // so we have to do this:
    const pkgs = getChangedPackages(undefined, undefined)
    projectVersion = pkgs[0].get('version')
  }

  if (projectVersion !== rootPkg.get('version')) {
    rootPkg.set('version', projectVersion)
    await rootPkg.serialize()
  }

  return projectVersion
}

export async function bumpPackages(packageName: string, requestedVersion: any) {
  const args = []
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
      '--exact',
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

export function createNPMRCFile(config: any = {}) {
  const { NPM_TOKEN, NPM_EMAIL, NPM_USERNAME } = process.env

  // Only write an npmrc file if these are defined, otherwise assume the system is properly configured
  if (NPM_TOKEN) {
    fs.writeFileSync(
      path.resolve(process.cwd(), '.npmrc'),
      `//registry.npmjs.org/:_authToken=${NPM_TOKEN}\n${config.npm_scope}\nemail=${NPM_EMAIL}\nname=${NPM_USERNAME}`
    )
  }

  try {
    runCommandSync('npm', ['whoami'])
  } catch (e) {
    error(`Could not determine if NPM auth was successful: ${e}`)
  }
}

export async function updateCrossPackageDependencies(
  packageName: string,
  releaseVersion: string,
  dependencyVersion: string
) {
  const changedPackages: any[] = getChangedPackages(undefined, undefined)
  const changedPackageNames = changedPackages.map((pkg) => pkg.name)

  info(
    `📦  Updating cross-package dependencies for ${packageName} to ${dependencyVersion}...`
  )
  await Promise.all(
    changedPackages.map((changedPackage) => {
      const pkg = changedPackage.toJSON()
      let packageChanged = false

      const depCollections = [
        'dependencies',
        'devDependencies',
        'optionalDependencies',
        'peerDependencies'
      ]

      depCollections.forEach((depCollection) => {
        if (!pkg[depCollection]) return

        const newDependencies = Object.keys(pkg[depCollection])
          .filter((dep) => {
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
