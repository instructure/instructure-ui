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
const { error, info } = require('@instructure/command-utils')

const { readEnv } = require('./utils/readEnv')

readEnv()

const commands = [
  '--publish',
  '--release',
  '--fix-publish',
  '--post-publish',
  '--bump',
  '--deploy-docs',
  '--build',
  '--test',
  '--commit',
  '--generate-package-list',
  '--link-packages',
  '--lint',
  '--lint-commit',
  '--clean',
  '--install-react',
  '--server',
  '--tag',
  '--deprecate',
  '--vrt',
  '--types'
]

function listCommands() {
  info(`Commands: \n${commands.join(', \n')}`)
}

// We will be transitioning existing commands to use yargs. Any new commands should
// be added to the `commands` directory and should be executed via yargs by calling
// this function instead of requiring the file directly.
function executeYargs() {
  /* eslint-disable no-unused-expressions */
  require('yargs').commandDir('./commands').version(false).help().argv
  /* eslint-enable no-unused-expressions */
}

// Place yargs commands at the start so users can get yargs argument documentation
// by setting the --help flag
if (process.argv.includes('open-sandbox')) {
  executeYargs()
} else if (process.argv.includes('create-component')) {
  executeYargs()
} else if (process.argv.includes('create-from-template')) {
  executeYargs()
} else if (process.argv.includes('create-package')) {
  executeYargs()
} else if (process.argv.includes('--help')) {
  listCommands()
} else if (process.argv.includes('--post-publish')) {
  require('./post-publish')
} else if (process.argv.includes('--bump')) {
  require('./bump')
} else if (
  process.argv.includes('--publish') ||
  process.argv.includes('--release')
) {
  require('./publish')
} else if (process.argv.includes('--fix-publish')) {
  require('./fix-publish')
} else if (process.argv.includes('--deploy-docs')) {
  require('./deploy-docs')
} else if (process.argv.includes('--build')) {
  require('./build')
} else if (process.argv.includes('--test')) {
  require('./test/karma')
} else if (process.argv.includes('--commit')) {
  require('./commit')
} else if (process.argv.includes('--generate-package-list')) {
  require('./generate-package-list')
} else if (process.argv.includes('--link-packages')) {
  require('./link-packages')
} else if (process.argv.includes('--lint-commit')) {
  require('./lint-commit')
} else if (process.argv.includes('--lint')) {
  require('./test/lint')
} else if (process.argv.includes('--vrt')) {
  require('./test/vrt')
} else if (process.argv.includes('--clean')) {
  require('./build/clean')
} else if (process.argv.includes('--install-react')) {
  require('./install-react')
} else if (process.argv.includes('--server')) {
  require('./server')
} else if (process.argv.includes('--tag')) {
  require('./tag')
} else if (process.argv.includes('--deprecate')) {
  require('./deprecate')
} else if (process.argv.includes('--types')) {
  require('./generate-types')
} else {
  error('[ui-scripts]: Invalid command!')
  listCommands()
  process.exit(1)
}
