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
const fs = require('fs')
const { info, error, runCommandSync } = require('@instructure/command-utils')

exports.command = 'codemod'
exports.desc = 'Apply instructure-ui codemods to source at a specified path.'

exports.builder = (yargs) => {
  yargs.option('path', {
    alias: 'p',
    type: 'string',
    describe: 'The path to the source where the codemod will be applied (defaults to current working directory).',
    default: process.cwd()
  })

  yargs.option('ignore', {
    alias: 'i',
    type: 'array',
    describe: 'One or multiple glob path patterns for files/directories that will be ignored when the codemods are applied (ex. **/node_modules/**).'
  })
}

exports.handler = (argv) => {
  info(`Applying codemods to ${argv.path}.`)

  const { ignore } = argv

  handleExecuteCodemod({
    sourcePath: argv.path,
    codemodName: 'updateImports.js',
    configName: 'imports.config.json',
    ignore
  })

  handleExecuteCodemod({
    sourcePath: argv.path,
    codemodName: 'updatePropNames.js',
    configName: 'propNames.config.json',
    ignore
  })
}

const handleExecuteCodemod = ({ sourcePath, codemodName, configName, ignore }) => {
  try {
    const codemodPath = require.resolve(`@instructure/ui-codemods/lib/${codemodName}`)
    const configsRoot = path.resolve(path.dirname(require.resolve('@instructure/instui-config/package.json')), './lib/codemod-configs')

    const configPaths = []
    fs.readdirSync(configsRoot).forEach((dirName) => {
      const configPath = path.join(configsRoot, dirName, configName)
      if (fs.existsSync(configPath)) {
        configPaths.push(configPath)
      }
    })

    for (const configPath of configPaths) {
      info(`Now running ${codemodPath} on ${sourcePath} with config ${configPath}.`)
      runCommandSync('yarn', [
        'jscodeshift',
        '-t',
        codemodPath,
        `--config=${configPath}`,
        `--ignore-pattern=${(ignore || []).map(i => path.join(sourcePath, i)).join('|')}`,
        sourcePath
      ])
    }
  } catch (err) {
    error(err)
  }
}
