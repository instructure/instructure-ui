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

import * as pkgUtils from '@instructure/pkg-utils'
import { error, info, runCommandAsync } from '@instructure/command-utils'

import {
  checkWorkingDirectory,
  isReleaseCommit,
  runGitCommand
} from '../utils/git.ts'
import { bumpPackages, checkNpmAuth, cleanupNPMRCFile } from '../utils/npm.ts'
import semver from 'semver'
import type { Argv } from 'yargs'

export default {
  command: 'publish',
  desc: 'publishes ALL packages to pnpm with the "pnpm publish" command',
  builder: (yargs: Argv) => {
    yargs.option('isMaintenance', {
      type: 'boolean',
      describe: 'If true pnpm publish will use vXYZ_maintenance as tag',
      default: false
    })

    yargs.option('prRelease', {
      type: 'boolean',
      describe: 'If true pnpm publish will use vXYZ-pr-snapshot as version',
      default: false
    })

    yargs.option('customVersion', {
      type: 'string',
      describe:
        'Publish all packages at this exact semver prerelease version (e.g. 11.7.3-SECURITY.0) instead of the version in package.json. Must be combined with --distTag.',
      default: ''
    })

    yargs.option('distTag', {
      type: 'string',
      describe:
        'Override the npm dist-tag used for this release. Required with --customVersion. Cannot be "latest".',
      default: ''
    })
  },
  handler: async (argv: any) => {
    const { isMaintenance, prRelease, customVersion, distTag } = argv
    try {
      const pkgJSON = pkgUtils.getPackageJSON()
      await publish({
        packageName: pkgJSON.name,
        version: pkgJSON.version,
        isMaintenance,
        prRelease,
        customVersion,
        distTag
      })
    } catch (err) {
      error(err)
      process.exit(1)
    }
  }
}

async function publish({
  packageName,
  version,
  isMaintenance,
  prRelease,
  customVersion,
  distTag
}: {
  packageName: string
  version: string
  isMaintenance: boolean
  prRelease: boolean
  customVersion: string
  distTag: string
}) {
  const isRegularRelease = isReleaseCommit(version)

  validateCustomVersionInputs({ customVersion, distTag, isRegularRelease })

  checkNpmAuth()

  try {
    checkWorkingDirectory()
    const packages = pkgUtils.getPackages().filter((pkg: any) => !pkg.private)

    if (isRegularRelease) {
      // If on legacy branch, and it is a release, its tag should say vx_maintenance
      const tag = isMaintenance
        ? `v${version.split('.')[0]}_maintenance`
        : 'latest'
      info(`📦  Version: ${version}, Tag: ${tag}`)
      await publishRegularVersion({
        version,
        tag,
        packages
      })
    } else {
      const tag = distTag || (prRelease ? 'pr-snapshot' : 'snapshot')
      info(`📦  Version: ${customVersion || version}, Tag: ${tag}`)
      await publishSnapshotVersion({
        version,
        packageName,
        packages,
        tag,
        prRelease,
        customVersion
      })
    }
  } finally {
    cleanupNPMRCFile()
  }
}

/**
 * Validates the optional --customVersion / --distTag pair used to mirror a
 * private security release onto the public registry under a non-latest tag.
 * Throws if the inputs are inconsistent or unsafe.
 */
function validateCustomVersionInputs({
  customVersion,
  distTag,
  isRegularRelease
}: {
  customVersion: string
  distTag: string
  isRegularRelease: boolean
}) {
  if (!customVersion && !distTag) return

  // These inputs only affect the snapshot/prerelease path. On a release commit
  // they would be silently ignored, so fail loudly instead of publishing the
  // wrong version under the wrong tag.
  if (isRegularRelease) {
    throw new Error(
      '--customVersion / --distTag are only supported for snapshot releases, but this is a release commit. Aborting to avoid silently ignoring them.'
    )
  }

  if (distTag === 'latest') {
    throw new Error('--distTag cannot be "latest".')
  }

  if (customVersion) {
    if (!semver.valid(customVersion)) {
      throw new Error(
        `--customVersion must be a valid semver, got: "${customVersion}"`
      )
    }
    if (!semver.prerelease(customVersion)) {
      throw new Error(
        `--customVersion must be a prerelease (e.g. 11.7.3-SECURITY.0); got "${customVersion}". Refusing to take over a stable version slot.`
      )
    }
    if (!distTag) {
      throw new Error('--distTag is required when --customVersion is set.')
    }
  } else if (distTag) {
    // distTag on its own would override the tag while still auto-computing the
    // version — almost certainly not what the operator intended.
    throw new Error('--distTag can only be used together with --customVersion.')
  }
}

/**
 * Publishes each package to pnpm.
 */
async function publishRegularVersion(arg: any) {
  const { version, packages, tag } = arg
  for await (const pkg of publishPackages(packages, version, tag)) {
    info(`📦  Version ${version} of ${pkg.name} was successfully published!`)
  }
}

/**
 * Bumps packages to a snapshot/prerelease version (either operator-supplied
 * via --customVersion, or auto-computed from the commit history) and
 * publishes them under the given dist-tag.
 */
async function publishSnapshotVersion(arg: any) {
  const { version, packageName, packages, tag, prRelease, customVersion } = arg
  const snapshotVersion =
    customVersion || calculateNextSnapshotVersion(version, prRelease)

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
function calculateNextSnapshotVersion(version: string, prRelease: boolean) {
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

  if (prRelease) {
    const prSnapshotVersion = `${semver.inc(
      version,
      'patch'
    )}-pr-snapshot-${Date.now()}`
    info(`PR snapshot version is: ${prSnapshotVersion}`)
    return prSnapshotVersion
  }

  info(`next snapshot version is: ${snapshotVersion}`)
  return snapshotVersion
}

/**
 * An async generator function which will do the publishing
 * for each package.
 */
async function* publishPackages(packages: any[], version: string, tag: string) {
  for (const pkg of packages) {
    let packageVersions = []
    try {
      const { stdout } = await runCommandAsync(
        'pnpm',
        ['info', pkg.name, '--json'],
        {},
        {
          stdio: 'pipe'
        }
      )
      packageVersions = JSON.parse(stdout).versions
    } catch (pnpmErr) {
      // if we run into this error that probably means that the
      // pkg we try to release is not in the registry yet (i.e. it is a new package).
      // let's just swallow the error and continue with the publish.
      info(
        `It looks like package (${pkg.name}) is currently not in the pnpm registry. Continuing publishing...`
      )
      info('Original pnpm error:')
      info(pnpmErr)
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

async function publishPackage(pkg: any, tag: string) {
  const wait = (delay: number) =>
    new Promise((resolve) => {
      setTimeout(resolve, delay)
    })

  const publishArgs = [
    'publish',
    pkg.location,
    '--tag',
    tag,
    '--no-git-checks',
    '--provenance'
  ]
  await runCommandAsync('pnpm', publishArgs)

  return wait(500)
}
