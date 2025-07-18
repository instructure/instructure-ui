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
import type { Transform } from 'jscodeshift'
import { isIdentifier, isMemberExpression } from './utils/codemodTypeCheckers'
import { renameImportAndUsages, printWarning } from './utils/codemodHelpers'
import type { InstUICodemod } from './utils/instUICodemodExecutor'
import instUICodemodExecutor from './utils/instUICodemodExecutor'

const renameCanvasThemesCodemod: Transform = (
  file,
  api,
  options?: { fileName?: string; usePrettier?: boolean }
) => {
  return instUICodemodExecutor(renameCanvasThemes, file, api, options)
}

const renameCanvasThemes: InstUICodemod = (j, root, filePath) => {
  const importPath = ['@instructure/ui-themes', '@instructure/ui']
  let didRename = false

  // Rename imports and usages
  didRename =
    renameImportAndUsages(
      j,
      root,
      'canvasThemeLocal',
      'canvasTheme',
      importPath
    ) || didRename

  didRename =
    renameImportAndUsages(
      j,
      root,
      'canvasHighContrastThemeLocal',
      'canvasHighContrastTheme',
      importPath
    ) || didRename

  // Warn about ThemeRegistry
  root
    .find(j.ImportSpecifier, { imported: { name: 'ThemeRegistry' } })
    .forEach((path) => {
      const lineNumber = path.node.loc?.start.line
      printWarning(
        filePath,
        lineNumber,
        'ThemeRegistry has been deleted and there are no global themes anymore.'
      )

    })

  /**
   * Warn about canvas.use() or canvasHighContrast.use()
   */
  root.find(j.CallExpression).forEach((path) => {
    const callee = path.node.callee
    if (
      isMemberExpression(callee) &&
      isIdentifier(callee.property) &&
      callee.property.name === 'use'
    ) {
      const objectName = isIdentifier(callee.object) ? callee.object.name : null
      const lineNumber = path.node.loc?.start.line

      if (objectName === 'canvas' || objectName === 'canvasHighContrast') {
        printWarning(
          filePath,
          lineNumber,
          `Found ${objectName}.use(). This will be deleted. Users should wrap each React root in its own InstUISettingsProvider instead.`
        )

      }
    }
  })

  return didRename
}

export default renameCanvasThemesCodemod
export { renameCanvasThemes }
