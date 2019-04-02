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
  CHROMATIC_APP_CODE,
  GERRIT_CHANGE_ID,
  GERRIT_PROJECT,
  GERRIT_BRANCH
} = process.env

const args = process.argv.slice(2)

// ui-build --vrt -p 8080
const portIndex = args.findIndex(arg => arg === '-p')
let port = '9001'
if (portIndex > 0) {
  port = args[portIndex + 1]
}

let chromaticArgs = ['test', '--storybook-port', port]

if (args.includes('--auto-accept-changes')) {
  chromaticArgs.push('--auto-accept-changes')
}

process.exit(runCommandsConcurrently({
  chromatic: getCommand(
    'chromatic',
    chromaticArgs,
    [
      `CI=true`,
      `CHROMATIC_APP_CODE=${CHROMATIC_APP_CODE}`,
      (GERRIT_CHANGE_ID ? `GERRIT_CHANGE_ID=${GERRIT_CHANGE_ID}` : false),
      (GERRIT_PROJECT ? `GERRIT_PROJECT=${GERRIT_PROJECT}` : false),
      (GERRIT_BRANCH ? `GERRIT_BRANCH=${GERRIT_BRANCH}` : false)
    ].filter(Boolean)
  )
}).status)
