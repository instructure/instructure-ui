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

const executeCodemod = require('@instructure/ui-upgrade-scripts/lib/utils/execute-codemod')
const { info, error } = require('@instructure/command-utils')

exports.command = 'codemod-v8'
exports.desc = 'Apply instructure-ui v8 codemods to source at a specified path.'

exports.builder = (yargs) => {
  yargs.option('path', {
    alias: 'p',
    type: 'string',
    describe:
      'The path to the source where the codemod will be applied (defaults to current working directory).',
    default: process.cwd()
  })

  yargs.option('ignore', {
    alias: 'i',
    type: 'array',
    describe:
      'One or multiple glob path patterns for files/directories that will be ignored when the codemods are applied (ex. **/node_modules/**).',
    default: ['**/node_modules/**']
  })

  yargs.option('parser', {
    type: 'string',
    describe: 'jscodeshift `parser` argument for parsing source files.',
    choices: ['babel', 'babylon', 'flow', 'ts', 'tsx'],
    default: 'flow'
  })

  yargs.option('isDryRun', {
    alias: 'd',
    type: 'boolean',
    describe: 'Whether to make a dry run that does no changes.',
    default: false
  })

  yargs.option('codemodType', {
    alias: 't',
    type: 'string',
    describe:
      'The codemod to apply. "themeOverride" renames components theme={} prop to themeOverride={}',
    choices: ['themeOverride']
  })
}

exports.handler = (argv) => {
  const { path, ignore, parser, isDryRun, codemodType } = argv

  const codemodTypeMap = {
    // renames component's theme={} prop to themeOverride={}
    themeOverride: 'v8codemods/transform-theme-prop.js'
  }

  try {
    info(`Applying codemods to ${path}\n`)

    const codemodPath = require.resolve(
      `@instructure/instui-cli/lib/${codemodTypeMap[codemodType]}`
    )

    executeCodemod({
      sourcePath: path,
      codemodPath: codemodPath,
      ignore,
      parser,
      printToStdOut: true,
      dryRun: isDryRun
    })
  } catch (err) {
    error(err)
    process.exit(1)
  }
}
