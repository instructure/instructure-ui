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
  command: 'tag',
  desc: 'Add/remove/list pnpm distribution tag',
  builder: (yargs) => {
    yargs.option('command', {
      type: 'string',
      describe: 'dist-tag command to run. "add" or "rm" or "ls"',
      default: 'add'
    })
    yargs.option('versionToTag', {
      type: 'string',
      describe: 'version to tag',
      default: pkgUtils.getPackageJSON().version
    })
    yargs.option('tag', {
      type: 'string',
      describe: 'tag to add/remove',
      default: 'latest'
    })
  },
  handler: async (argv) => {
    await distTag(argv.command, argv.versionToTag, argv.tag)
  }
}

async function distTag(command, versionToTag, tag) {
  checkNpmAuth()

  try {
    if (command === 'add') {
      info(
        `Command: "pnpm dist-tag ${command}". Version to tag as "${tag}": ${versionToTag}`
      )
    } else if (command === 'rm') {
      info(`Command: "pnpm dist-tag ${command} ${tag}".`)
    } else if (command === 'ls') {
      info(`Command: "pnpm dist-tag ${command}".`)
    }
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
        if (command === 'add') {
          const toTag = `${pkg.name}@${versionToTag}`
          info(
            `📦 Running 'dist-tag ${command} ${toTag} ${tag}' for ${pkg.name}...`
          )
          try {
            await runCommandAsync('pnpm', ['dist-tag', command, toTag, tag])
          } catch (err) {
            error(err)
          }
        } else if (command === 'rm') {
          info(`📦 Running 'dist-tag ${command} ${tag}' for ${pkg.name}...`)
          try {
            await runCommandAsync('pnpm', ['dist-tag', command, tag])
          } catch (err) {
            error(err)
          }
        } else if (command === 'ls') {
          info(`📦 Running 'dist-tag ${command}' for ${pkg.name} ...`)
          try {
            await runCommandAsync('pnpm', ['dist-tag', command])
          } catch (err) {
            error(err)
          }
        }
        await wait(500)
      }
    }
  } finally {
    cleanupNPMRCFile()
  }
}
