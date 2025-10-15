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

import path from 'path'
import fs from 'fs'
import { runCommandsConcurrently, getCommand } from '@instructure/command-utils'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default {
  command: 'build',
  desc: 'Build the packages with SWC (faster Rust-based compiler, ES modules only)',
  builder: (yargs) => {
    yargs.option('copy-files', {
      boolean: true,
      desc: 'Copy files that will not be compiled'
    })
    yargs.option('watch', {
      boolean: true,
      desc: 'Run constantly and recompile on changes'
    })
    yargs.strictOptions(true)
  },
  handler: async (argv) => {
    const { BABEL_ENV, NODE_ENV, DEBUG, OMIT_INSTUI_DEPRECATION_WARNINGS } =
      process.env

    // positional: ui-scripts build src --watch
    const src = argv._[1] || 'src'

    // Find monorepo root (where .swcrc is located)
    const findRoot = (dir) => {
      const swcrcPath = path.join(dir, '.swcrc')
      if (fs.existsSync(swcrcPath)) return swcrcPath
      const parent = path.dirname(dir)
      if (parent === dir) return null // reached filesystem root
      return findRoot(parent)
    }
    const swcConfigPath = findRoot(process.cwd())

    // SWC args
    let swcArgs = [
      '--config-file', swcConfigPath || path.join(__dirname, '../../../../.swcrc'),
      '--extensions', '.ts,.tsx,.js,.jsx',
      '--ignore', '**/*.test.js,**/__tests__/**',
      '--strip-leading-paths',
      '--out-dir', 'es'
    ]

    if (argv.copyFiles) {
      swcArgs.push('--copy-files')
    }

    swcArgs = swcArgs.concat([src])

    let envVars = { ES_MODULES: '1' }
    if (OMIT_INSTUI_DEPRECATION_WARNINGS) {
      envVars = { ...envVars, OMIT_INSTUI_DEPRECATION_WARNINGS: '1' }
    }

    if (argv.watch) {
      envVars = { ...envVars, NODE_ENV: 'development' }
      swcArgs.push('--watch')
    } else {
      envVars = { ...envVars, NODE_ENV: BABEL_ENV || NODE_ENV || 'production' }
      if (DEBUG) {
        envVars = { ...envVars, DEBUG: '1' }
      }
    }

    const command = getCommand('swc', swcArgs, envVars)
    runCommandsConcurrently({ es: command })
  }
}
