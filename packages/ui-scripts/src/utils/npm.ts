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
import { getPackageJSON } from '@instructure/pkg-utils'
import {
  runCommandAsync,
  runCommandSync,
  error,
  info
} from '@instructure/command-utils'

export async function bumpPackages(packageName: string, isPrerelease: boolean) {
  info(`📦  Bumping ${packageName} packages and generating changelogs...`)
  const args = [
    'workspaces',
    'foreach',
    '--verbose',
    'exec',
    'standard-version',
    '--skip.tag',
    '--skip.commit',
    '--path', // only look for changes in the package's folder
    '.'
  ]
  if (isPrerelease) {
    // bump package versions to x.y.z+1-snapshot.[#of commits since last tag]
    // it would be better to use Github actions build number
    args.push('--prerelease', 'snapshot')
  }
  let releaseVersion
  try {
    await runCommandAsync('yarn', args)
    const rootPkg = getPackageJSON(undefined)
    releaseVersion = rootPkg.version
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
