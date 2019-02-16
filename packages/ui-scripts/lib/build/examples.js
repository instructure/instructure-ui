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
const path = require('path')
const { runCommandsConcurrently, getCommand } = require('@instructure/command-utils')

const rootPath = path.resolve(process.cwd(), '../../node_modules')

let result

// ui-build --examples -p 8080

const args = process.argv.slice(2)
const portIndex = args.findIndex(arg => arg === '-p')
let port = '8080'
if (portIndex > 0) {
  port = args[portIndex + 1]
}

if (process.argv.includes('--watch')) {
  result = runCommandsConcurrently({
    // DEBUG=1 start-storybook -p
    storybook: getCommand('start-storybook', ['-c', '.storybook', '-p', port], ['NODE_ENV=development', 'DEBUG=1'])
  })
} else {
  result = runCommandsConcurrently({
    // build-storybook -o __build__
    storybook: getCommand('build-storybook', ['-c', '.storybook', '-o', '__build__'], [`NODE_ENV=production`, `NODE_PATH=${rootPath}`])
  })
}

process.exit(result.status)
