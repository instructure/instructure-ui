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
import { runCommandSync, resolveBin } from '@instructure/command-utils'

export default {
  command: 'examples',
  desc: 'Build and start Storybook',
  builder: (yargs) => {
    yargs.option('port', {
      alias: 'p',
      type: 'number',
      describe: 'port to use',
      default: 8080
    })
    yargs.option('watch', {
      boolean: true,
      desc: 'When added storybook will launch in DEV mode watching file changes'
    })
    yargs.strictOptions(true)
  },
  handler: async (argv) => {
    const rootPath = path.resolve(process.cwd(), '../../node_modules')
    const { DEBUG, OMIT_INSTUI_DEPRECATION_WARNINGS } = process.env

    let port = argv.port

    let command, commandArgs

    let envVars = {}
    if (OMIT_INSTUI_DEPRECATION_WARNINGS) {
      envVars = { ...envVars, OMIT_INSTUI_DEPRECATION_WARNINGS: '1' }
    }

    if (argv.watch) {
      command = 'start-storybook'
      // --no-manager-cache is a workaround for
      // https://github.com/storybookjs/storybook/issues/13200
      // -c: config directory
      commandArgs = [
        '-c',
        '.storybook',
        '-p',
        port,
        '--no-manager-cache',
        '--quiet'
      ]
      envVars = {
        ...envVars,
        NODE_ENV: 'development',
        DEBUG: '1'
      }
    } else {
      command = 'build-storybook'
      commandArgs = ['-c', '.storybook', '-o', '__build__', '--quiet']
      envVars = {
        ...envVars,
        NODE_ENV: 'production',
        NODE_PATH: rootPath
      }
      if (DEBUG) {
        envVars = { ...envVars, DEBUG: '1' }
      }
    }
    process.exit(
      runCommandSync(resolveBin(command), commandArgs, envVars).status
    )
  }
}
