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
import semver from 'semver'
import pkgUtils from '@instructure/pkg-utils'
import {
  runCommandAsync,
  runCommandSync,
  error,
  info
} from '@instructure/command-utils'
import path from 'node:path'
import fs from 'fs'

const syncRootPackageVersion = async () => {
  const rootPkg = pkgUtils.getPackage()
  const projectVersion = getLernaJsonVersion()
  if (projectVersion !== rootPkg.version) {
    rootPkg.version = projectVersion
    await rootPkg.serialize()
  }
  return projectVersion
}

const getLernaJsonVersion = () => {
  let dir = path.resolve(process.cwd())
  // walk up the directory tree until we find a lerna.json
  while (true) {
    const lernaConfigPath = path.join(dir, 'lerna.json')
    if (fs.existsSync(lernaConfigPath)) {
      const config = JSON.parse(fs.readFileSync(lernaConfigPath, 'utf-8'))
      return config.version
    }
    const parent = path.dirname(dir)
    if (parent === dir) {
      error('No lerna.json found, cannot read project version')
      process.exit(1)
    }
    dir = parent
  }
}

export async function bumpPackages(
  packageName: string,
  requestedVersion: string
) {
  const args = []
  let bumpVersion: string | null = requestedVersion

  if (bumpVersion) {
    if (!['major', 'minor', 'patch', 'prerelease'].includes(bumpVersion)) {
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
      '--exact', // exact versions, no ^ when bumping
      '--include-merged-tags', // Include tags from merged branches
      '--no-push', // do not execute `git push`
      '--no-git-tag-version', // do not add git tag or commit
      '--force-publish=*', // bump all packages even if they have no changes
      '--conventional-commits', // determines new version and updates Changelog
      '--preid=SECURITY' // postfixes releases if type is prerelease
    ])

    releaseVersion = await syncRootPackageVersion()

    info(`📦  Done bumping ${packageName} to ${releaseVersion}!`)
  } catch (err) {
    error(err)
    process.exit(1)
  }

  return releaseVersion
}

export function checkNpmAuth() {
  info('📦  Using OIDC authentication (npm trusted publishing)')

  // Verify OIDC authentication works
  try {
    info('📦  Running pnpm whoami to verify OIDC auth:')
    runCommandSync('pnpm', ['whoami'])
  } catch (e) {
    error(`Could not verify OIDC authentication: ${e}`)
    error('Make sure:')
    error('  1. Workflow has id-token: write permissions')
    error('  2. npm packages are configured for trusted publishing')
    error('  3. Workflow is running in GitHub Actions')
    process.exit(1)
  }
}

export function cleanupNPMRCFile() {
  // No cleanup needed with OIDC authentication
  // This function is kept for backward compatibility
}
