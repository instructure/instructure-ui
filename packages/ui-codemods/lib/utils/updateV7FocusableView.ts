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

import type { Collection, JSCodeshift } from 'jscodeshift'
import {
  addImportIfNeeded,
  findAttribute,
  findElements,
  findImport,
  renameElements
} from '../helpers/v7PropsUpdateHelpers'
import { Literal } from 'jscodeshift'

/**
 * Does the following updates on a <FocusableView>:
 * - `<FocusableView/>` -> `<View/>`
 * - focused -> withFocusOutline
 * - shape -> delete and display warning, that focus ring shape cannot be set
 * - color="primary" -> delete, its the default
 * - color="error" -> focusColor="danger"
 * - color="inverse" -> focusColor="inverse"
 *
 **/
export default function updateV7FocusableView(
  j: JSCodeshift,
  root: Collection,
  filePath: string
) {
  const importName = findImport(j, root, 'FocusableView', [
    '@instructure/ui-focusable',
    '@instructure/ui'
  ])
  if (!importName) {
    return false
  }
  const views = findElements(filePath, j, root, importName)

  ///// `<FocusableView/>` -> `<View/>`
  renameElements(views, 'FocusableView', 'View', filePath)
  addImportIfNeeded(j, root, 'View', '@instructure/ui-view')

  ///// focused -> withFocusOutline
  findAttribute(j, views, 'focused').replaceWith((nodePath) => {
    const { node } = nodePath
    node.name.name = 'withFocusOutline'
    return nodePath.node
  })

  ///// shape -> delete and display warning, that focus ring shape cannot be set
  findAttribute(j, views, 'shape')
    .forEach((path) => {
      console.warn(`The 'shape' property was removed, focus ring shape
       cannot be set in InstUI v8 at ${filePath} at line ${path.value.loc?.start.line}`)
    })
    .remove()

  //// color="primary" -> delete, its the default
  findAttribute(j, views, 'color', 'primary').remove()

  //// color="error" -> focusColor="danger"
  findAttribute(j, views, 'color', 'error').replaceWith((nodePath) => {
    const { node } = nodePath
    node.name.name = 'focusColor'
    ;(node.value as Literal).value = 'danger'
    return nodePath.node
  })

  ///// color="inverse" -> focusColor="inverse"
  findAttribute(j, views, 'color', 'inverse').replaceWith((nodePath) => {
    const { node } = nodePath
    node.name.name = 'focusColor'
    return nodePath.node
  })
  return true
}
