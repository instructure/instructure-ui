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

import pkgUtils from '@instructure/pkg-utils'
import {
  runCommandAsync,
  error,
  info,
  confirm
} from '@instructure/command-utils'

import { checkNpmAuth, cleanupNPMRCFile } from '../utils/npm.js'

export default {
  command: 'deprecate',
  desc:
    'deprecate ALL of a certain version of instUI pnpm packages by ' +
    'running "pnpm deprecate".',
  builder: (yargs) => {
    yargs.option('versionToDeprecate', {
      type: 'string',
      describe:
        'The version number to deprecate, e.g. "8.11.0". Defaults to the ' +
        'current version.',
      default: pkgUtils.getPackageJSON(undefined).version
    })
    yargs.option('fixVersion', {
      type: 'string',
      describe:
        'The fix version will be shown in the deprecation warning to all who ' +
        'attempt to install the deprecated version.',
      demandOption: true
    })
  },
  handler: async (argv) => {
    try {
      await doDeprecate(argv.versionToDeprecate, argv.fixVersion)
    } catch (err) {
      error(err)
      process.exit(1)
    }
  }
}

async function doDeprecate(versionToDeprecate, fixVersion) {
  const message = `A critical bug was fixed in ${fixVersion}`
  checkNpmAuth()

  try {
    info(
      `📦 Deprecating ALL packages with version: ${versionToDeprecate} with message: "${message}"`
    )
    const reply = await confirm('Continue? [y/n]\n')
    if (!['Y', 'y'].includes(reply.trim())) {
      process.exit(0)
    }
    const wait = (delay) =>
      new Promise((resolve) => {
        setTimeout(resolve, delay)
      })
    const allPackages = pkgUtils.getPackages()
    for (const pkg of allPackages) {
      if (pkg.private) {
        info(`${pkg.name} is private.`)
      } else {
        const toDeprecate = `${pkg.name}@${versionToDeprecate}`
        info(`📦 Deprecating ${toDeprecate}...`)
        try {
          await runCommandAsync('pnpm', ['deprecate', toDeprecate, message])
          info(`📦 ${toDeprecate} was successfully deprecated!`)
        } catch (err) {
          error(err)
        }
        await wait(500) // wait some time to not DDOS npmjs.org
      }
    }
  } finally {
    cleanupNPMRCFile()
  }
}
