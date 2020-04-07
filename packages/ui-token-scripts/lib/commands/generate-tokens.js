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
const { error } = require('@instructure/command-utils')
const handleMapThemeToSource = require('../handlers/handle-map-theme-to-source')
const handleGenerateTokens = require('../handlers/handle-generate-tokens')

exports.command = 'generate-tokens'
exports.desc = 'Generate cross-platform design tokens for the given theme.'

exports.builder = (yargs) => {
  yargs.option('themePackage', {
    alias: 't',
    type: 'string',
    describe: 'Package name for the source theme.',
    requiresArg: true
  })

  yargs.option('outputDir', {
    alias: 'o',
    type: 'string',
    describe: 'Output directory for generated tokens within the source theme package.',
    default: 'tokens'
  })
}

exports.handler = (argv) => {
  const {
    themePackage,
    outputDir,
  } = argv

  const { theme } = require(themePackage)
  const styleDictionarySource = handleMapThemeToSource(theme)
  const themePath = path.dirname(require.resolve(path.join(themePackage, 'package.json')))
  const outputPath = path.join(themePath, outputDir)
  const sourcePath = path.join(outputPath, 'source.json')

  try {
    handleGenerateTokens({
      theme,
      styleDictionarySource,
      outputPath,
      sourcePath
    })
  } catch (e) {
    error(e)
  }
}
