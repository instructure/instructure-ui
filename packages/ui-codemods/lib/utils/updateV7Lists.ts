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
  findAttribute,
  findElements,
  findImport,
  printWarning,
  renameElements
} from '../helpers/v7PropsUpdateHelpers'

/**
 * Does the following update on a <List>:
 * - `<List variant="default"` -> `<List`
 * - `<List variant="unstyled"` -> `<List isUnstyled={true}`
 * - `<List variant="inline"` -> `<InlineList`
 * - `<List delimiter=` -> display warning
 * - `<List.Item delimiter=` -> display warning
 */
export default function updateV7Lists(
  j: JSCodeshift,
  root: Collection,
  filePath: string
) {
  const importName = findImport(j, root, 'List', [
    '@instructure/ui-lists',
    '@instructure/ui'
  ])
  if (!importName) {
    return false
  }
  const tags = findElements(filePath, j, root, importName, {
    name: 'variant'
  })

  ///// `<List variant="default"` -> `<List`
  findAttribute(filePath, j, tags, 'variant', 'default').remove()

  ///// `<List variant="unstyled"` -> `<List isUnstyled`
  findAttribute(filePath, j, tags, 'variant', 'unstyled')
    .remove()
    .insertAfter(j.jsxAttribute(j.jsxIdentifier('isUnstyled')))

  ///// `<List variant="inline"` -> `<InlineList`
  const inlineLists = findElements(filePath, j, root, 'List', {
    name: 'variant',
    value: 'inline'
  })
  if (inlineLists.length > 0) {
    findAttribute(filePath, j, inlineLists, 'variant').remove()
    renameElements(filePath, inlineLists, 'List', 'InlineList')
    inlineLists.forEach((path) => {
      if (path.value.children) {
        // rename List.Item to InlineList.Item
        renameElements(
          filePath,
          path.value.children,
          'List.Item',
          'InlineList.Item'
        )
      }
    })
    addImportIfNeeded(j, root, 'InlineList', [
      '@instructure/ui',
      '@instructure/ui-lists'
    ])
  }

  ///// `<List delimiter=` -> display warning
  ///// `<List.Item delimiter=` -> display warning
  findElements(filePath, j, root, importName, { name: 'delimiter' }).forEach(
    (path) => {
      printWarning(
        filePath,
        path.value.loc?.start.line,
        `List's delimiter prop is only available for 'InlineList' in InstUI v8, please check.`
      )
    }
  )
  findElements(filePath, j, root, 'List.Item', { name: 'delimiter' }).forEach(
    (path) => {
      printWarning(
        filePath,
        path.value.loc?.start.line,
        `List's delimiter prop is only available for 'InlineList' in InstUI v8, please check.`
      )
    }
  )
  return tags.length > 0
}
