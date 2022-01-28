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

import type { Collection, JSCodeshift, JSXAttribute } from 'jscodeshift'
import {
  findElements,
  findImport,
  isJSXAttribue,
  isLiteral
} from '../helpers/v7PropsUpdateHelpers'

type SizeValue = 'small' | 'medium' | 'large'

// default theme values for Tabs's size prop
const sizeConversions = {
  small: '30em',
  medium: '48em',
  large: '62em'
}
/**
 * Does the following updates on a <Tabs>:
 * - `Tabs size="" maxWidth=..` -> `Tabs maxWidth=..` (delete size)
 * - `Tabs size=` -> `<Tabs maxWidth=` (convert size to maxWidth)
 * - `Tabs selectedIndex=` -> display warning to use isSelected on Tabs.Panel
 **/
export default function updateV7Tabs(
  j: JSCodeshift,
  root: Collection,
  filePath: string
) {
  const importName = findImport(j, root, 'Tabs', [
    '@instructure/ui-tabs',
    '@instructure/ui'
  ])
  if (!importName) {
    return false
  }
  let isUpdated = false
  // `Tabs size="" maxWidth=..` -> delete size
  // `Tabs size=` -> `<Tabs maxWidth=` (convert size to maxWidth)
  findElements(filePath, j, root, importName, { name: 'size' }).forEach(
    (path) => {
      const attributes = path.value.openingElement.attributes
      if (!attributes) {
        return
      }
      // delete size is maxWidth exists
      let hasMaxWidth = false
      let sizeAttribute: JSXAttribute
      for (const attr of attributes) {
        if (isJSXAttribue(attr)) {
          if (attr.name.name === 'maxWidth') {
            hasMaxWidth = true
          } else {
            if (attr.name.name === 'size') {
              sizeAttribute = attr
            }
          }
        }
      }
      if (hasMaxWidth) {
        isUpdated = true
        attributes.splice(attributes.indexOf(sizeAttribute!), 1)
      } else {
        // `Tabs size=` -> `<Tabs maxWidth=` (convert size to maxWidth)
        if (isLiteral(sizeAttribute!.value)) {
          const sizeVal = sizeAttribute!.value.value as SizeValue
          const sizeConverted = sizeConversions[sizeVal]
          attributes.splice(attributes.indexOf(sizeAttribute!), 1)
          attributes.push(
            j.jsxAttribute(
              j.jsxIdentifier('maxWidth'),
              j.stringLiteral(sizeConverted)
            )
          )
          console.warn(
            "Tabs 'size' attribute was converted to " +
              "'maxWidth', please check the value, it's only valid if this " +
              'was not overridden in the theme.\n' +
              filePath +
              ' line ' +
              sizeAttribute!.loc?.start.line
          )
          isUpdated = true
        } else {
          console.warn(
            "Tabs 'size' attribute has non-literal value," +
              'please update manually at ' +
              filePath +
              ' line ' +
              sizeAttribute!.loc?.start.line
          )
        }
      }
    }
  )
  // `Tabs selectedIndex=` -> display warning to use isSelected on Tabs.Panel
  findElements(filePath, j, root, importName, {
    name: 'selectedIndex'
  }).forEach((path) => {
    console.warn(
      "Tabs 'selectedIndex' attribute needs to be updated " +
        "manually, use 'isSelected' on 'Tabs.Panel' at " +
        filePath +
        ' line ' +
        path.value.loc?.start.line
    )
  })
  return isUpdated
}
