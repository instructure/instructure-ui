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
import pkgUtils from '@instructure/pkg-utils'
import {
  runCommandAsync,
  runCommandSync,
  error,
  info
} from '@instructure/command-utils'

import { Project } from '@lerna/project'

const NPM_SCOPE = '@instructure:registry=https://registry.npmjs.org/'
const syncRootPackageVersion = async (useProjectVersion) => {
  const project = new Project(process.cwd())
  const rootPkg = pkgUtils.getPackage()

  let projectVersion

  if (project.isIndependent() || useProjectVersion) {
    projectVersion = project.version
  } else {
    // unfortunately lerna doesn't update lerna.json for canary releases,
    // so we have to do this:
    const pkgs = pkgUtils.getChangedPackages()
    projectVersion = pkgs[0].version
  }

  if (projectVersion !== rootPkg.get('version')) {
    rootPkg.set('version', projectVersion)
    await rootPkg.serialize()
  }

  return projectVersion
}

export async function bumpPackages(packageName, requestedVersion) {
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
      '--exact', // exact versions, no ^ when bumping
      '--include-merged-tags', // Include tags from merged branches
      '--no-push', // do not execute `git push`
      '--no-git-tag-version', // do not add git tag or commit
      '--force-publish=*', // bump all packages even if they have no changes
      '--conventional-commits' // determines new version and updates Changelog
    ])

    releaseVersion = await syncRootPackageVersion(true)

    info(`📦  Done bumping ${packageName} to ${releaseVersion}!`)
  } catch (err) {
    error(err)
    process.exit(1)
  }

  return releaseVersion
}

export function createNPMRCFile() {
  const { NPM_TOKEN, NPM_EMAIL, NPM_USERNAME } = process.env

  // Only write an npmrc file if these are defined, otherwise assume the system is properly configured
  if (NPM_TOKEN) {
    fs.writeFileSync(
      path.resolve(process.cwd(), '.npmrc'),
      `//registry.npmjs.org/:_authToken=${NPM_TOKEN}\n${NPM_SCOPE}\nemail=${NPM_EMAIL}\nname=${NPM_USERNAME}`
    )
  }

  try {
    info('running pnpm whoami:')
    runCommandSync('pnpm', ['whoami'])
  } catch (e) {
    error(`Could not determine if NPM auth was successful: ${e}`)
    process.exit(1)
  }
}
