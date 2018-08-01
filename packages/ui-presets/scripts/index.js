#!/usr/bin/env node

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
const { error, info } = require('./utils/logger')

require('dotenv').config()

const commands = [
  '--release',
  '--post-publish',
  '--bump',
  '--deploy-docs',
  '--deprecate-package',
  '--publish-package',
  '--build',
  '--test',
  '--commit',
  '--lint',
  '--lint-commit',
  '--clean',
  '--install-react'
]

function listCommands () {
  info(`Commands: \n${commands.join(', \n')}`)
}

if (process.argv.includes('--help')) {
  listCommands()
} else if (process.argv.includes('--release')) {
  require('./release')
} else if (process.argv.includes('--post-publish')) {
  require('./post-publish')
} else if (process.argv.includes('--bump')) {
  require('./bump')
} else if (process.argv.includes('--deploy-docs')) {
  require('./deploy-docs')
} else if (process.argv.includes('--deprecate-package')) {
  require('./deprecate-package')
} else if (process.argv.includes('--publish-package')) {
  require('./publish-package')
} else if (process.argv.includes('--build')) {
  require('./build')
} else if (process.argv.includes('--test')) {
  require('./test/karma')
} else if (process.argv.includes('--commit')) {
  require('./commit')
} else if (process.argv.includes('--lint-commit')) {
  require('./lint-commit')
} else if (process.argv.includes('--lint')) {
  require('./test/lint')
} else if (process.argv.includes('--clean')) {
  require('./build/clean')
} else if (process.argv.includes('--install-react')) {
  require('./install-react')
} else {
  error('[ui-scripts]: Invalid command!')
  listCommands()
}
