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


const { runCommandsConcurrently, getCommand } = require('@instructure/command-utils')

const {
  NODE_ENV,
  DEBUG,
  UNMANGLED_CLASS_NAMES,
  DISABLE_SPEEDY_STYLESHEET,
  USE_WEBPACK_CSS_LOADERS
} = process.env

const args = process.argv.slice(2)

const portIndex = args.findIndex(arg => arg === '-p')
let port = '8080'
if (portIndex > 0) {
  port = args[portIndex + 1]
}

let command, envVars, webpackArgs

if (args.includes('--watch')) {
  command = 'webpack-dev-server'
  envVars = [
    'NODE_ENV=development',
    'DEBUG=1',
    'UNMANGLED_CLASS_NAMES=1',
    'USE_WEBPACK_CSS_LOADERS=1',
    'DISABLE_SPEEDY_STYLESHEET=1'
  ]
  webpackArgs = ['--mode=development', `--port=${port}`]
} else {
  command = 'webpack'
  envVars = [
    `NODE_ENV=${NODE_ENV || 'production'}`,
    'NODE_OPTIONS=--max_old_space_size=8192',
    (DEBUG ? `DEBUG=1` : false),
    (UNMANGLED_CLASS_NAMES  ? `UNMANGLED_CLASS_NAMES=1` : false),
    (USE_WEBPACK_CSS_LOADERS  ? `USE_WEBPACK_CSS_LOADERS=1` : false),
    (DISABLE_SPEEDY_STYLESHEET  ? `DISABLE_SPEEDY_STYLESHEET=1` : false)
  ].filter(Boolean)
  webpackArgs = ['--mode=production']
}

process.exit(runCommandsConcurrently({
  webpack: getCommand(command, webpackArgs, envVars)
}).status)
