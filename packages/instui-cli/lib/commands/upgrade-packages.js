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

const { handleUpgradePackages } = require('../handlers')

exports.command = 'upgrade-packages'
exports.desc = 'Upgrade instructure-ui packages to the latest stable version.'

exports.builder = (yargs) => {
  yargs.option('path', {
    alias: 'p',
    type: 'string',
    describe:
      'The path to the repo containing instructure-ui dependencies (defaults to current working directory).',
    default: process.cwd()
  })

  yargs.option('use-resolutions', {
    type: 'boolean',
    describe:
      'When npm-client is set to yarn, perform the upgrade via resolutions (this will not modify your package.json).',
    default: false
  })

  yargs.option('version', {
    alias: 'v',
    type: 'string',
    describe:
      'A semantic instructure-ui version number. When provided, packages will be upgraded to the specified version. When omitted, packages are upgraded to the latest stable version.',
    default: null
  })

  yargs.option('ignore-workspace-root-check', {
    type: 'boolean',
    describe:
      'When npm-client is set to yarn, set the `ignore-workspace-root-check` argument when this command executes `yarn add` and `yarn remove`',
    default: false
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
    version,
    ignoreWorkspaceRootCheck,
    npmClient
  } = argv

  handleUpgradePackages({
    sourcePath: path,
    useResolutions,
    version,
    ignoreWorkspaceRootCheck,
    npmClient
  })
}
