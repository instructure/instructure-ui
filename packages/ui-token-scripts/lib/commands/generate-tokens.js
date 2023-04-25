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

import path from 'path'
import { error } from '@instructure/command-utils'
import { handleMapJSTokensToSource } from '../handlers/handle-map-js-tokens-to-source.js'
import { handleGenerateTokens } from '../handlers/handle-generate-tokens.js'
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)

export default {
  command: 'generate-tokens',
  describe: 'Generate cross-platform design tokens for the given theme.',
  builder: (yargs) => {
    yargs.option('sourceTokens', {
      alias: 's',
      type: 'string',
      describe: 'Path to the JS source tokens for a theme.',
      requiresArg: true
    })

    yargs.option('themeKey', {
      alias: 't',
      type: 'string',
      describe:
        'Unique key to identify the theme, used in output path and token namespacing.',
      requiresArg: true
    })

    yargs.option('outputPackage', {
      alias: 'p',
      type: 'string',
      describe: 'Package to output generated cross-platform tokens.',
      requiresArg: true
    })

    yargs.option('outputDir', {
      alias: 'o',
      type: 'string',
      describe:
        'Output directory for generated tokens within the source theme package.',
      default: 'tokens'
    })

    yargs.option('groupOutput', {
      alias: 'g',
      type: 'boolean',
      describe:
        'Should generated tokens be grouped by theme in the output directory?',
      default: false
    })
  },
  handler: async (argv) => {
    const { sourceTokens, themeKey, outputPackage, outputDir, groupOutput } =
      argv

    const tokens = require(sourceTokens).default

    if (Object.keys(tokens).indexOf('colors') < 0) {
      error('Invalid token source')
      process.exit(1)
    }

    const styleDictionarySource = handleMapJSTokensToSource(tokens)
    const themePath = path.dirname(
      require.resolve(path.join(outputPackage, 'package.json'))
    )
    const outputPath = groupOutput
      ? path.join(themePath, outputDir, themeKey)
      : path.join(themePath, outputDir)
    const sourcePath = path.join(outputPath, 'source.json')

    await handleGenerateTokens({
      themeKey,
      styleDictionarySource,
      outputPath,
      sourcePath
    })
  }
}
