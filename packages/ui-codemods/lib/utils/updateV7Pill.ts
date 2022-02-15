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
  findElements,
  findImport,
  isJSXAttribue,
  printWarning
} from '../helpers/v7PropsUpdateHelpers'

/**
 * Does the following updates on a <Pill>:
 * - `<Pill text="abc"/>` -> `<Pill>abc</Pill>`
 **/
export default function updateV7Pill(
  j: JSCodeshift,
  root: Collection,
  filePath: string
) {
  const importName = findImport(j, root, 'Pill', [
    '@instructure/ui-pill',
    '@instructure/ui'
  ])
  if (!importName) {
    return false
  }
  ///// `<Pill text="abc"/>` -> `<Pill>abc</Pill>`
  let isUpdated = false
  findElements(filePath, j, root, importName, { name: 'text' }).forEach(
    (path) => {
      const tag = path.value
      for (const attr of tag.openingElement.attributes!) {
        if (isJSXAttribue(attr) && attr.name.name === 'text') {
          if (tag.children!.length !== 0) {
            printWarning(
              filePath,
              tag.loc?.start.line,
              'Pill had text attribute and children, please check'
            )
          }
          if (tag.openingElement.selfClosing) {
            tag.openingElement.selfClosing = false
            tag.closingElement = j.jsxClosingElement(j.jsxIdentifier('Pill'))
          }
          tag.children!.push(attr.value!)
          tag.openingElement.attributes!.splice(
            tag.openingElement.attributes!.indexOf(attr),
            1
          )
          isUpdated = true
        }
      }
    }
  )
  return isUpdated
}
