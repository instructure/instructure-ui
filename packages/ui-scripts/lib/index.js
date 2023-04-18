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
import { error, info } from '@instructure/command-utils'
import yargs from 'yargs'
import { yargCommands } from './commands/index.js'
import { hideBin } from 'yargs/helpers'
import { readEnv } from './utils/readEnv.js'
import { tag } from './tag.js'
import { deprecate } from './deprecate.js'
import { doPublish } from './publish.js'

readEnv()

const commands = [
  'bump',
  'commit',
  'lint-commit',
  'server',
  '--help',
  '--publish',
  '--tag',
  '--deprecate'
]

function listCommands() {
  info(`Commands: \n${commands.join(', \n')}`)
}

// We will be transitioning existing commands to use yargs. Any new commands should
// be added to the `commands` directory and should be executed via yargs by calling
// this function instead of requiring the file directly.
function executeYargs() {
  // https://github.com/yargs/yargs/blob/main/docs/advanced.md#example-command-hierarchy-using-indexmjs
  // eslint-disable-next-line no-unused-expressions
  yargs(hideBin(process.argv)).command(yargCommands).argv
}

// Place yargs commands at the start so users can get yargs argument documentation
// by setting the --help flag
if (process.argv.includes('bump')) {
  executeYargs()
} else if (process.argv.includes('commit')) {
  executeYargs()
} else if (process.argv.includes('lint-commit')) {
  executeYargs()
} else if (process.argv.includes('server')) {
  executeYargs()
} else if (process.argv.includes('--help')) {
  listCommands()
} else if (process.argv.includes('--publish')) {
  doPublish()
} else if (process.argv.includes('--tag')) {
  tag()
} else if (process.argv.includes('--deprecate')) {
  deprecate()
} else {
  error('[ui-scripts]: Invalid command "' + process.argv + '"')
  listCommands()
  process.exit(1)
}
