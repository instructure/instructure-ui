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

import { findTag } from '../helpers/buttonUpdateHelpers'
import { Collection, JSCodeshift, JSXAttribute } from 'jscodeshift'

/**
 * Does the following updates on a <Button>:
 * - `buttonRef` -> `elementRef`
 * - `fluidWidth` -> removed and `display="block"`, `textAlign="start"` added
 *   (overwrites any existing `display` and `textAlign` props)
 * - `icon` -> `renderIcon`
 */
export default function updateV7ButtonsMisc(
  j: JSCodeshift,
  root: Collection,
  importedName: string
) {
  ///// Replace <Button fluidWidth .. with <Button display="block" textAlign="start"
  // remove fluidWidth attribute if its value is 'false'
  findTag(j, root, importedName)
    .find(j.JSXAttribute, {
      name: {
        name: 'fluidWidth'
      },
      value: {
        expression: {
          value: false
        }
      }
    })
    .remove()

  const buttonsWithFluidWidth = findTag(j, root, importedName).filter(
    (path) => {
      if (path.value.attributes) {
        for (const attr of path.value.attributes) {
          if (
            (attr as JSXAttribute).name &&
            (attr as JSXAttribute).name.name === 'fluidWidth'
          ) {
            return true
          }
        }
      }
      return false
    }
  )
  // remove fluidWidth attribute TODO OK
  buttonsWithFluidWidth
    .find(j.JSXAttribute, {
      name: {
        name: 'fluidWidth'
      }
    })
    .remove()
  // remove display attribute TODO OK
  buttonsWithFluidWidth
    .find(j.JSXAttribute, {
      name: {
        name: 'display'
      }
    })
    .remove()
  // remove textAlign attribute TODO OK
  buttonsWithFluidWidth
    .find(j.JSXAttribute, {
      name: {
        name: 'textAlign'
      }
    })
    .remove()
  // add display="block" attribute
  buttonsWithFluidWidth.forEach((path) => {
    path.value.attributes!.push(
      j.jsxAttribute(j.jsxIdentifier('display'), j.stringLiteral('block'))
    )
  })
  // add textAlign="start" attribute
  buttonsWithFluidWidth.forEach((path) => {
    path.value.attributes!.push(
      j.jsxAttribute(j.jsxIdentifier('textAlign'), j.stringLiteral('start'))
    )
  })

  ///// replace <Button icon=.. with <Button renderIcon=..
  findTag(j, root, importedName)
    .find(j.JSXIdentifier, { name: 'icon' })
    .replaceWith('renderIcon')

  ///// replace <Button buttonRef=.. with <Button elementRef=..
  findTag(j, root, importedName)
    .find(j.JSXIdentifier, { name: 'buttonRef' })
    .replaceWith('elementRef')
}
