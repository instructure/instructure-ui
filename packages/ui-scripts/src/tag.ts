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
import {
  runCommandAsync,
  error,
  info,
  confirm
} from '@instructure/command-utils'

import { createNPMRCFile } from './utils/npm'
import { getConfig } from './utils/config'

try {
  // optional fix version argument:
  // e.g. ui-scripts --tag add 5.11.0 rc
  // e.g. ui-scripts --tag rm 5.11.0 latest
  const pkgJSON = getPackageJSON(undefined)
  const command = process.argv[3] || 'add'
  const versionToTag = process.argv[4] || pkgJSON.version
  const tag = process.argv[5] || 'latest'

  distTag(command, versionToTag, tag, getConfig(pkgJSON))
} catch (err) {
  error(err)
  process.exit(1)
}

async function distTag(
  command: any,
  versionToTag: string,
  tag: string,
  config: any
) {
  createNPMRCFile(config)

  info(`📦  Version to tag as ${tag}: ${versionToTag}`)
  const reply = await confirm('Continue? [y/n]\n')
  if (!['Y', 'y'].includes(reply.trim())) {
    process.exit(0)
  }

  return Promise.all(
    getPackages().map(async (pkg: any) => {
      if (pkg.private) {
        info(`${pkg.name} is private.`)
      } else {
        const toTag = `${pkg.name}@${versionToTag}`
        info(`📦  Running 'dist-tag ${command} ${toTag} ${tag}'...`)
        try {
          await runCommandAsync('npm', ['dist-tag', command, toTag, tag])
        } catch (err) {
          error(err)
        }
        info(`📦  ${toTag} tags were successfully updated!`)
      }
    })
  )
}
