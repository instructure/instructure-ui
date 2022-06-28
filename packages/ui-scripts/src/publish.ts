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
import { getPackageJSON, getPackages } from '@instructure/pkg-utils'
import { error, info, runCommandAsync } from '@instructure/command-utils'

import { getConfig } from './utils/config'
import {
  checkWorkingDirectory,
  isReleaseCommit,
  runGitCommand,
  setupGit
} from './utils/git'
import { bumpPackages, createNPMRCFile } from './utils/npm'
import semver from 'semver'

type PackageInfo = ReturnType<typeof getPackages>[number]
;(async function doPublish() {
  try {
    const pkgJSON = getPackageJSON()
    // ui-scripts --publish               - to publish from the master branch
    // ui-scripts --publish maintenance   - to publish from any legacy branch
    const isMaintenance = process.argv[3] === 'maintenance'

    await publish({
      packageName: pkgJSON.name!,
      version: pkgJSON.version!,
      isMaintenance,
      config: getConfig(pkgJSON)
    })
  } catch (err: any) {
    error(err)
    process.exit(1)
  }
})()

async function publish({
  packageName,
  version,
  isMaintenance,
  config = {}
}: {
  packageName: string
  version: string
  isMaintenance: boolean
  config: any
}) {
  const isRegularRelease = isReleaseCommit(version)

  setupGit()
  createNPMRCFile(config)

  checkWorkingDirectory()
  const packages = getPackages().filter((pkg) => !pkg.private)

  if (isRegularRelease) {
    // If on legacy branch, and it is a release, its tag should say vx_maintenance
    const tag = isMaintenance
      ? `v${version.split('.')[0]}_maintenance`
      : 'latest'

    info(`📦  Version: ${version}, Tag: ${tag}`)

    return publishRegularVersion({
      version,
      tag,
      packages
    })
  } else {
    const tag = 'snapshot'
    info(`📦  Version: ${version}, Tag: ${tag}`)
    return publishSnapshotVersion({
      version,
      packageName,
      packages,
      tag
    })
  }
}

/**
 * Publishes each package to npm.
 */
async function publishRegularVersion(arg: {
  version: string
  tag: string
  packages: PackageInfo[]
}) {
  const { version, packages, tag } = arg
  for await (const pkg of publishPackages(packages, version, tag)) {
    info(`📦  Version ${version} of ${pkg.name} was successfully published!`)
  }
}

/**
 * Calculates the new snapshot version based on the latest tag
 * and the current commit, then publishes each package to npm
 * with the new snapshot version.
 */
async function publishSnapshotVersion(arg: {
  version: string
  packageName: string
  packages: PackageInfo[]
  tag: string
}) {
  const { version, packageName, packages, tag } = arg
  const snapshotVersion = calculateNextSnapshotVersion(version)

  info(`applying new snapshot version (${snapshotVersion}) to each package`)

  await bumpPackages(packageName, snapshotVersion)

  for await (const pkg of publishPackages(packages, snapshotVersion, tag)) {
    info(
      `📦  Version ${snapshotVersion} of ${pkg.name} was successfully published!`
    )
  }
}

/**
 * Calculates the new snapshot version.
 * @returns the new snapshot version
 */
function calculateNextSnapshotVersion(version: string): string {
  const ver = `v${version}`
  // get the commit count between the current released version
  // and the commit that we are on currently
  // note: this will not include the release commit into the count
  const commitCount = runGitCommand([
    'rev-list',
    '--count',
    `${ver}..${runGitCommand(['describe'])}`
  ])

  // we have to decrease the commitCount by 1 because the snapshots are
  // zero based
  const snapshotVersion = `${semver.inc(version, 'patch')}-snapshot-${
    Number(commitCount) - 1
  }`

  info(`next snapshot version is: ${snapshotVersion}`)

  return snapshotVersion
}

/**
 * An async generator function which will do the publishing
 * for each package.
 */
async function* publishPackages(
  packages: PackageInfo[],
  version: string,
  tag: string
) {
  for (const pkg of packages) {
    let packageVersions: string[] = []
    try {
      const { stdout } = await runCommandAsync(
        'npm',
        ['info', pkg.name, '--json'],
        [],
        {
          stdio: 'pipe'
        }
      )
      packageVersions = JSON.parse(stdout).versions
    } catch (npmErr: any) {
      // if we run into this error that probably means that the
      // pkg we try to release is not in the registry yet (ie. it is a new package).
      // lets just swallow the error and continue with the publish
      info(
        `It looks like package (${pkg.name}) is currently not in the npm registry. Continuing publishing...`
      )
      info('Original NPM error:')
      info(npmErr)
    }

    // if the package is already in the registry then don't try
    // to publish it again
    if (packageVersions.includes(version)) {
      throw new Error(`📦  v${version} of ${pkg.name} is already published!`)
    } else {
      await publishPackage(pkg, tag)

      yield pkg
    }
  }
}

async function publishPackage(pkg: PackageInfo, tag: string) {
  const wait = (delay: number) =>
    new Promise((resolve) => {
      setTimeout(resolve, delay)
    })

  const publishArgs = ['publish', pkg.location, '--tag', tag]
  await runCommandAsync('npm', publishArgs, [])

  return wait(500)
}
