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

const { handleUpgradeDependencies } = require('../handlers')

exports.command = 'upgrade-dependencies'
exports.desc = 'Upgrade dependencies to a specified version or latest (if no version is specified).'

exports.builder = (yargs) => {
  yargs.option('path', {
    alias: 'p',
    type: 'string',
    describe: 'The path to the repo containing dependencies (defaults to current working directory).',
    default: process.cwd()
  })

  yargs.option('use-resolutions', {
    type: 'boolean',
    describe: 'When npm-client is set to yarn, perform the upgrade via resolutions (this will not modify your package.json).',
    default: false
  })

  yargs.option('dependencies', {
    alias: 'deps',
    type: 'array',
    describe: 'A list of dependencies to upgrade.',
    default: []
  })

  yargs.option('version', {
    alias: 'v',
    type: 'string',
    describe: 'A semantic version number. When provided, dependencies will be upgraded to the specified version. When omitted, dependencies are upgraded to the latest stable version.',
    default: null
  })

  yargs.option('npm-client', {
    alias: 'npmClient',
    type: 'string',
    describe: 'The npm client to use',
    choices: ['yarn', 'npm'],
    default: 'yarn'
  })
}

exports.handler = (argv) => {
  const {
    path,
    useResolutions,
    dependencies,
    version,
    npmClient
  } = argv

  handleUpgradeDependencies({ sourcePath: path, useResolutions, dependencies, version, npmClient })
}
