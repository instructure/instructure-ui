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

import { Collection, JSCodeshift, Literal } from 'jscodeshift'
import {
  findAttribute,
  findElements,
  findOpeningTags,
  getVisibleChildren,
  isJSXExpressionContainer,
  isJSXText,
  removeAllChildren
} from '../helpers/buttonUpdateHelpers'

/**
 * Does the following updates on a <CloseButton>:
 * - `buttonRef=` -> `elementRef=`
 * - `variant="icon"` removed
 * - `variant="icon-inverse"` -> `color="primary-inverse"`
 *
 * If it has children it outputs a warning on how to upgrade them
 **/
export default function updateV7ButtonsClose(
  j: JSCodeshift,
  root: Collection,
  importedName: string,
  filePath: string
) {
  ///// replace <CloseButton buttonRef=.. with <CloseButton elementRef=..
  findOpeningTags(j, root, importedName)
    .find(j.JSXIdentifier, { name: 'buttonRef' })
    .replaceWith('elementRef')

  ///// If it has children try to move them under screenReaderLabel
  findElements(j, root, importedName).forEach((path) => {
    const children = getVisibleChildren(path.value.children)
    if (children.length == 1) {
      const firstChild = children[0]
      let screenReaderLabelText
      if (isJSXText(firstChild)) {
        screenReaderLabelText = j.stringLiteral(firstChild.value)
      } else if (isJSXExpressionContainer(firstChild)) {
        screenReaderLabelText = firstChild
      }
      path.value.openingElement.attributes!.push(
        j.jsxAttribute(
          j.jsxIdentifier('screenReaderLabel'),
          screenReaderLabelText
        )
      )
      removeAllChildren(path.value)
    } else if (children.length > 1) {
      console.warn(
        'Cannot update CloseButton in ' +
          filePath +
          ' at line ' +
          path.value.loc?.start.line +
          ' because it has multiple children. ' +
          'You will need to update this manually.'
      )
    }
  })

  ///// Remove variant="icon" prop
  findAttribute(j, root, 'variant', 'icon').remove()

  ///// Change variant="icon-inverse" to color="primary-inverse"
  findAttribute(j, root, 'variant', 'icon-inverse').replaceWith((nodePath) => {
    const { node } = nodePath
    node.name.name = 'color'
    ;(node.value as Literal).value = 'primary-inverse'
    return nodePath.node
  })
}
