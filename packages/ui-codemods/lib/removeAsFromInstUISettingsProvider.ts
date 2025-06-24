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

import { Collection, JSCodeshift, Transform } from 'jscodeshift'
import instUICodemodExecutor from './utils/instUICodemodExecutor'
import { findElement, findImport } from './utils/codemodHelpers'
import { isJSXAttribute } from './utils/codemodTypeCheckers'

/**
 * removes the `as` prop from InstUISettingsProvider.
 */
const removeAsFromInstUISettingsProvider: Transform = (
  file,
  api,
  options?: { fileName?: string; usePrettier?: boolean }
) => {
  return instUICodemodExecutor(removeAsProp, file, api, options)
}

const removeAsProp = (j: JSCodeshift, root: Collection, filePath: string) => {
  let hasModifications = false
  const instUISettingsProviderImport = findImport(
    j,
    root,
    'InstUISettingsProvider',
    ['@instructure/ui', '@instructure/emotion']
  )
  if (instUISettingsProviderImport) {
    const found = findElement(filePath, j, root, instUISettingsProviderImport, {
      name: 'as'
    })
    if (found.length > 0) {
      found.forEach((item) => {
        // eslint-disable-next-line no-param-reassign
        item.value.openingElement.attributes =
          item.value.openingElement.attributes?.filter((attr) => {
            if (isJSXAttribute(attr) && attr.name.name === 'as') {
              hasModifications = true
              return false
            }
            return true
          })
      })
    }
  }
  return hasModifications
}

export default removeAsFromInstUISettingsProvider
export { removeAsProp }
