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

const { runCommandsConcurrently, getCommand } = require('../utils/command')
// ui-build src --watch
// ui-build --watch src
const src = process.argv.slice(2).filter(arg => (arg.indexOf('--') == -1))[0] || 'src'
const vars = []
const args = [src, '--ignore "src/**/*.test.js","src/**/__tests__/**"']

if (process.argv.includes('--copy-files')) {
  args.push('--copy-files')
}

if (process.argv.includes('--watch')) {
  vars.push('NODE_ENV=development')
  args.push('--watch')
} else {
  vars.push(`NODE_ENV=${process.env.NODE_ENV}`)
}

const result = runCommandsConcurrently({
  es: getCommand('babel', [...args, '--out-dir es'], [...vars, 'ES_MODULES=1']),
  lib: getCommand('babel', [...args, '--out-dir lib'], vars)
})

process.exit(result.status)
