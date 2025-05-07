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
import fs from 'fs'
import { error } from '@instructure/command-utils'
import { handleMapJSTokensToSource } from '../utils/handle-map-js-tokens-to-source.js'
import { handleGenerateTokens } from '../utils/handle-generate-tokens.js'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

const tokenScriptsConfig = [
  {
    themeKey: 'canvas',
    sourceTokens: '@instructure/ui-themes/lib/themes/canvas',
    outputPackage: '@instructure/ui-theme-tokens',
    groupOutput: true
  },
  {
    themeKey: 'canvas',
    sourceTokens: '@instructure/ui-themes/lib/themes/canvas',
    outputPackage: '@instructure/canvas-theme'
  },
  {
    themeKey: 'canvas',
    sourceTokens: '@instructure/ui-themes/lib/themes/canvas',
    outputPackage: '@instructure/ui-themes',
    groupOutput: true
  },
  {
    themeKey: 'canvas-high-contrast',
    sourceTokens: '@instructure/ui-themes/lib/themes/canvasHighContrast',
    outputPackage: '@instructure/ui-theme-tokens',
    groupOutput: true
  },
  {
    themeKey: 'canvas-high-contrast',
    sourceTokens: '@instructure/ui-themes/lib/themes/canvasHighContrast',
    outputPackage: '@instructure/canvas-high-contrast-theme'
  },
  {
    themeKey: 'canvas-high-contrast',
    sourceTokens: '@instructure/ui-themes/lib/themes/canvasHighContrast',
    outputPackage: '@instructure/ui-theme-tokens',
    groupOutput: true
  }
]

export default {
  command: 'generate-all-tokens',
  desc: 'Generate cross-platform design tokens for all themes',
  handler: async () => {
    const outputDir = 'tokens'
    const generators = []
    for (const conf of tokenScriptsConfig) {
      const { sourceTokens, themeKey, outputPackage, groupOutput } = conf
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
      // this is just a debug code to find the JSON error here that occurs only in CI
      // eslint-disable-next-line no-console
      console.log(
        '!!!!! starting',
        themeKey,
        sourceTokens,
        outputPath,
        sourcePath,
        fs.existsSync(sourcePath)
      )
      // eslint-disable-next-line no-console
      console.log(
        '!!!! styleDictionarySource',
        JSON.stringify(styleDictionarySource)?.substring(0, 400)
      )
      generators.push(
        handleGenerateTokens({
          themeKey,
          styleDictionarySource,
          outputPath,
          sourcePath
        })
      )
    }
    await Promise.all(generators)
  }
}
