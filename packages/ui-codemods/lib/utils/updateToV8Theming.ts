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

import { Collection, JSCodeshift } from 'jscodeshift'
import {
  addImportIfNeeded,
  findElements,
  findEveryImport,
  findImport,
  isIdentifier,
  isMemberExpression,
  renameElements
} from '../helpers/codemodHelpers'

/**
 * Does the following changes:
 * 1. `<ApplyTheme` -> `<InstUISettingsProvider`
 * 2. `Menu.theme` -> `Menu.componentId` (for every InstUI component)
 */
export function updateToV8Theming(
  j: JSCodeshift,
  root: Collection,
  filePath: string
) {
  let hasModifications = false
  const importedName = findImport(j, root, 'ApplyTheme', [
    '@instructure/ui',
    '@instructure/ui-themeable'
  ])
  // <ApplyTheme> -> <InstUISettingsProvider>
  if (importedName) {
    const applyThemeElements = findElements(filePath, j, root, importedName)
    const instUISettingsProvider = addImportIfNeeded(
      j,
      root,
      'InstUISettingsProvider',
      '@instructure/emotion'
    )
    renameElements(
      filePath,
      applyThemeElements,
      importedName,
      instUISettingsProvider
    )
    hasModifications = true
  }
  // Menu.theme -> Menu.componentId (for every InstUI component)
  const importedComponents = findEveryImport(j, root, '@instructure/ui', false)
  root.find(j.MemberExpression).forEach((path) => {
    const astNode = path.value
    if (
      isMemberExpression(astNode) &&
      isIdentifier(astNode.object) &&
      importedComponents.includes(astNode.object.name) &&
      isIdentifier(astNode.property) &&
      astNode.property.name === 'theme'
    ) {
      astNode.property.name = 'componentId'
    }
  })
  return hasModifications
}
