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

import { execSync } from 'node:child_process'
import pkgUtils from '@instructure/pkg-utils'
import { error, info } from '@instructure/command-utils'

import { commitVersionBump, checkWorkingDirectory } from '../utils/git.js'
import { bumpPackages } from '../utils/npm.js'

export default {
  command: 'bump',
  desc: 'bump version in all packages',
  builder: (yargs) => {
    yargs.option('releaseType', {
      type: 'string',
      describe:
        'optional release type/version argument: major, minor, patch, [version]'
    })
  },
  handler: async (argv) => {
    const pkgJSON = pkgUtils.getPackageJSON(undefined)
    // optional release type/version argument: major, minor, patch, [version]
    // e.g. ui-scripts --bump major
    await bump(pkgJSON.name, argv.releaseType)
  }
}

async function bump(packageName, requestedVersion) {
  checkWorkingDirectory()

  let releaseVersion
  try {
    releaseVersion = await bumpPackages(packageName, requestedVersion)
    info('📦  Running yarn install to update yarn.lock file!')
    execSync('yarn install', { stdio: 'inherit' })
  } catch (err) {
    error(err)
    process.exit(1)
  }

  info(
    `💾  Committing version bump commit for ${packageName} ${releaseVersion}...`
  )

  try {
    commitVersionBump(releaseVersion)
  } catch (err) {
    error(err)
    process.exit(1)
  }

  info(`💾  Version bump for ${packageName} to ${releaseVersion} complete!`)
}
