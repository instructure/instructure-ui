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
import { handleMapJSTokensToSource } from '../utils/handle-map-js-tokens-to-source.js'
import { handleGenerateTokens } from '../utils/handle-generate-tokens.js'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

const tokenScriptsConfig = [
  {
    themeKey: 'canvas',
    sourceTokens: '@instructure/ui-themes/es/themes/canvas',
    outputPackage: '@instructure/ui-theme-tokens',
    groupOutput: true
  },
  {
    themeKey: 'canvas',
    sourceTokens: '@instructure/ui-themes/es/themes/canvas',
    outputPackage: '@instructure/canvas-theme'
  },
  {
    themeKey: 'canvas',
    sourceTokens: '@instructure/ui-themes/es/themes/canvas',
    outputPackage: '@instructure/ui-themes',
    groupOutput: true
  },
  {
    themeKey: 'canvas-high-contrast',
    sourceTokens: '@instructure/ui-themes/es/themes/canvasHighContrast',
    outputPackage: '@instructure/ui-theme-tokens',
    groupOutput: true
  },
  {
    themeKey: 'canvas-high-contrast',
    sourceTokens: '@instructure/ui-themes/es/themes/canvasHighContrast',
    outputPackage: '@instructure/canvas-high-contrast-theme'
  },
  {
    themeKey: 'canvas-high-contrast',
    sourceTokens: '@instructure/ui-themes/es/themes/canvasHighContrast',
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
      // For workspace packages in pnpm, construct path from project root
      // Convert '@instructure/ui-themes/lib/themes/canvas' to 'packages/ui-themes/lib/themes/canvas'
      let resolvedSource
      try {
        // Extract package name and subpath
        const packageMatch = sourceTokens.match(
          /^(@instructure\/)?([\w-]+)(.*)$/
        )
        if (!packageMatch) {
          throw new Error(`Invalid package path: ${sourceTokens}`)
        }
        const packageName = packageMatch[2]
        const subpath = packageMatch[3]

        // Construct path from workspace root
        resolvedSource = path.join(
          process.cwd(),
          'packages',
          packageName,
          subpath
        )
      } catch (err) {
        error(`Failed to resolve ${sourceTokens}: ${err.message}`)
        process.exit(1)
      }
      const tokens = require(resolvedSource).default

      if (Object.keys(tokens).indexOf('colors') < 0) {
        error('Invalid token source')
        process.exit(1)
      }

      const styleDictionarySource = handleMapJSTokensToSource(tokens)
      // Resolve output package path from workspace root
      let themePath
      try {
        const outputPackageMatch = outputPackage.match(
          /^(@instructure\/)?([\w-]+)$/
        )
        if (!outputPackageMatch) {
          throw new Error(`Invalid output package: ${outputPackage}`)
        }
        const outputPackageName = outputPackageMatch[2]
        themePath = path.join(process.cwd(), 'packages', outputPackageName)
      } catch (err) {
        error(`Failed to resolve ${outputPackage}: ${err.message}`)
        process.exit(1)
      }
      const outputPath = groupOutput
        ? path.join(themePath, outputDir, themeKey)
        : path.join(themePath, outputDir)
      const sourcePath = path.join(outputPath, 'source.json')

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
