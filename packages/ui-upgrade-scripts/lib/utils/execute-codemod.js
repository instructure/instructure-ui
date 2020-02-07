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
const { info, runCommandSync } = require('@instructure/command-utils')

module.exports = ({ sourcePath = process.cwd(), codemodPath, configPath, ignore = [], parser = 'babylon', parserConfig } = {}) => {
  info(`Running ${codemodPath}...`)
  info(`Source path: ${sourcePath}`)
  info(`Config path: ${configPath}`)

  const codemodCommand = [
    '-t',
    codemodPath,
    sourcePath,
    `--config=${configPath}`,
    `--extensions=js,jsx`,
    `--parser=${parser}`
  ]

  if (parserConfig) {
    codemodCommand.push(`--parser-config=${parserConfig}`)
  }

  const defaultIgnores = [
    '**/node_modules/**',
    '**/symlink_to_node_modules/**',
    '**/vendor/**',
    '**/Jenkinsfile.js',
    '**/*.tmpl.js'
  ]

  const allIgnores = ignore.concat(defaultIgnores)

  info(`Ignoring: ${allIgnores.join(', ')}`)

  let ignoreArgs = []

  allIgnores.forEach((ignore) => {
    ignoreArgs = ignoreArgs.concat(['--ignore-pattern', path.join(sourcePath, ignore)])
  })

  runCommandSync('jscodeshift', [
    ...codemodCommand,
    // ignore-pattern args need to be placed after the other commands
    ...ignoreArgs
  ])
}
