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

const { handleExecuteCodemods, handleViewParserConfig } = require('../handlers')

exports.command = 'codemod'
exports.desc = 'Apply instructure-ui codemods to source at a specified path.'

exports.builder = (yargs) => {
  yargs.option('path', {
    alias: 'p',
    type: 'string',
    describe:
      'The path to the source where the codemod will be applied (defaults to current working directory).',
    default: process.cwd()
  })

  yargs.option('scopeModifications', {
    alias: 'scope-modifications',
    type: 'array',
    describe:
      'Specify the scope of the code modifications. For example, specifying only `imports` will limit the code changes to imports only.',
    choices: ['imports', 'props'],
    default: ['imports', 'props']
  })

  yargs.option('ignore', {
    alias: 'i',
    type: 'array',
    describe:
      'One or multiple glob path patterns for files/directories that will be ignored when the codemods are applied (ex. **/node_modules/**).',
    default: ['**/node_modules/**']
  })

  yargs.option('version', {
    alias: 'v',
    type: 'string',
    describe:
      'A semantic instructure-ui version number. When provided, the source will be modified to be compatible with the specified version. When omitted, the source will be modified to be compatible with the latest stable version.',
    default: null
  })

  yargs.option('parser', {
    type: 'string',
    describe: 'jscodeshift `parser` argument for parsing source files.',
    choices: ['babel', 'babylon', 'flow', 'ts', 'tsx'],
    default: 'babylon'
  })

  yargs.option('parser-config', {
    type: 'string',
    describe:
      'jscodeshift `parser-config` argument. A path to your own JSON file containing a custom parser configuration for flow or babylon. To view the default instructure-ui config use `instui codemod view-parser-config`',
    default: null
  })

  yargs.command(
    'view-parser-config',
    'View the default instructure-ui parser configuration file that is supplied to jscodeshift when the codemods are executed',
    () => {
      handleViewParserConfig()
    }
  )
}

exports.handler = (argv) => {
  const {
    path,
    scopeModifications,
    ignore,
    version,
    parser,
    parserConfig
  } = argv

  handleExecuteCodemods({
    sourcePath: path,
    scopeModifications,
    version,
    ignore,
    parser,
    parserConfig
  })
}
