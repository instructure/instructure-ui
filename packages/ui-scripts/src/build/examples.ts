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

export const examples = () => {
  const rootPath = path.resolve(process.cwd(), '../../node_modules')
  const {
    DEBUG,
    UNMANGLED_CLASS_NAMES,
    DISABLE_SPEEDY_STYLESHEET,
    USE_WEBPACK_CSS_LOADERS,
    OMIT_INSTUI_DEPRECATION_WARNINGS
  } = process.env

  const args = process.argv.slice(2)

  // ui-build --examples -p 8080
  const portIndex = args.findIndex((arg) => arg === '-p')
  let port = '8080'
  if (portIndex > 0) {
    port = args[portIndex + 1]
  }

  let command, commandArgs

  let envVars = [
    OMIT_INSTUI_DEPRECATION_WARNINGS
      ? `OMIT_INSTUI_DEPRECATION_WARNINGS=1`
      : false
  ]

  if (args.includes('--watch')) {
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
    envVars = envVars
      .concat([
        'NODE_ENV=development',
        'DEBUG=1',
        'UNMANGLED_CLASS_NAMES=1',
        'USE_WEBPACK_CSS_LOADERS=1',
        'DISABLE_SPEEDY_STYLESHEET=1'
      ])
      .filter(Boolean)
  } else {
    command = 'build-storybook'
    commandArgs = ['-c', '.storybook', '-o', '__build__', '--quiet']
    envVars = envVars
      .concat([
        `NODE_ENV=production`,
        `NODE_PATH=${rootPath}`,
        DEBUG ? `DEBUG=1` : false,
        UNMANGLED_CLASS_NAMES ? `UNMANGLED_CLASS_NAMES=1` : false,
        USE_WEBPACK_CSS_LOADERS ? `USE_WEBPACK_CSS_LOADERS=1` : false,
        DISABLE_SPEEDY_STYLESHEET ? `DISABLE_SPEEDY_STYLESHEET=1` : false
      ])
      .filter(Boolean)
  }

  process.exit(
    runCommandsConcurrently({
      storybook: getCommand(command, commandArgs, envVars)
    }).status
  )
}
