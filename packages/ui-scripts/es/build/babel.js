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
import { runCommandsConcurrently, getCommand } from '@instructure/command-utils'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const specifyCJSFormat = path.resolve(__dirname, 'specify-commonjs-format.js')

export default {
  command: 'build:babel',
  desc: 'Build the packages with Babel.js (legacy)',
  builder: (yargs) => {
    yargs.option('copy-files', {
      boolean: true,
      desc: 'Copy files that will not be compiled'
    })
    yargs.option('watch', {
      boolean: true,
      desc: 'Run constantly and recompile on changes'
    })
    yargs.option('modules', {
      string: true,
      desc: 'What kind of modules to build. "es": build into the /es folder using ESM; "cjs": build into the /lib folder using commonJS',
      choices: ['es', 'cjs'],
      default: 'es',
      coerce: (value) => Array.isArray(value) ? value : value.split(',')
    })
    yargs.strictOptions(true)
  },
  handler: async (argv) => {
    const { BABEL_ENV, NODE_ENV, DEBUG, OMIT_INSTUI_DEPRECATION_WARNINGS } =
      process.env

    // positional: ui-scripts build src --watch
    const src = argv._[1] || 'src'

    // uncomment the extensions arg after renaming the files from js -> ts happens
    let babelArgs = ['--extensions', '.ts,.tsx,.js,.jsx']

    if (argv.copyFiles) {
      babelArgs.push('--copy-files')
    }

    babelArgs = babelArgs.concat([
      src,
      '--ignore',
      'src/**/*.test.js,src/**/__tests__/**',
      '--quiet'
    ])

    let envVars = {}
    if (OMIT_INSTUI_DEPRECATION_WARNINGS) {
      envVars = { ...envVars, OMIT_INSTUI_DEPRECATION_WARNINGS: '1' }
    }

    if (argv.watch) {
      envVars = { ...envVars, NODE_ENV: 'development' }
      babelArgs.push('--watch')
    } else {
      envVars = { ...envVars, NODE_ENV: BABEL_ENV || NODE_ENV || 'production' }
      if (DEBUG) {
        envVars = { ...envVars, DEBUG: '1' }
      }
    }

    const commands = {
      es: getCommand('babel', [...babelArgs, '--out-dir', 'es'], {
        ...envVars,
        ...{ ES_MODULES: '1' }
      }),
      cjs: [
        getCommand('babel', [...babelArgs, '--out-dir', 'lib'], {
          ...envVars,
          ...{ TRANSFORM_IMPORTS: '1' }
        }),
        getCommand(specifyCJSFormat, [])
      ]
    }

    const commandsToRun = argv.modules.reduce(
      (obj, key) => ({ ...obj, [key]: commands[key] }),
      {}
    )
    runCommandsConcurrently(commandsToRun)
  }
}
