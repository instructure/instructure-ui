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

const { info, error } = require('@instructure/command-utils')
const executeCodemod = require('@instructure/ui-scripts/lib/utils/execute-codemod')

const getInstuiConfigPaths = require('../utils/getInstuiConfigPaths')

module.exports = ({ sourcePath, logAddedImports, version, ignore }) => {
  info(`Applying codemods to ${sourcePath}\n`)

  executeCodemods({
    sourcePath,
    codemodName: 'updateImports.js',
    configPaths: getInstuiConfigPaths({
      type: 'codemod-configs',
      name: 'imports.config.json',
      version
    }),
    ignore
  })

  executeCodemods({
    sourcePath,
    codemodName: 'updatePropNames.js',
    configPaths: getInstuiConfigPaths({
      type: 'codemod-configs',
      name: 'propNames.config.json',
      version
    }),
    ignore
  })
}

const executeCodemods = ({ sourcePath, configPaths, codemodName, ignore }) => {
  try {
    const codemodPath = require.resolve(`@instructure/ui-codemods/lib/${codemodName}`)

    for (const configPath of configPaths) {
      executeCodemod({ sourcePath, codemodPath, configPath, ignore })
    }
  } catch (err) {
    error(err)
    process.exit(1)
  }
}
