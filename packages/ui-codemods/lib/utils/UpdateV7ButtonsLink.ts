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

import {
  findAttribute,
  findElements,
  isJSXAttribue,
  renameElements
} from '../helpers/buttonUpdateHelpers'
import { Collection, JSCodeshift, JSXAttribute, Literal } from 'jscodeshift'

/**
 * Does the following updates on a <Button>:
 * - `variant="link" href=..` -> `isWithinText={false} href=..` and a warning
 *   that padding can be removed.
 * - `variant="link-inverse" href=..` ->
 *    `isWithinText={false} color="link-inverse" href=..` and a warning that
 *    padding can be removed
 * - `variant="link"` or `variant="link-inverse"` and no `href` attribute ->
 *    display a warning how to upgrade
 */
export default function UpdateV7ButtonsLink(
  j: JSCodeshift,
  root: Collection,
  importedName: string,
  filePath: string
) {
  ///// variant=link or variant=link-inverse and no href attribute
  /*
  findElements(j, root, importedName,
    'variant',['link', 'link-inverse'])
    .forEach((path => {
      const attributes = path.value.openingElement.attributes
      if (!attributes) {
        displayNoHrefWarning(filePath, path.value.loc!.start.line)
        return
      }
      for (const attr of attributes) {
        if (isJSXAttribue(attr) && attr.name.name === 'href') {
          return
        }
      }
      displayNoHrefWarning(filePath, path.value.loc!.start.line)
  }))
*/
  ///// variant=link and href attribute -> remove variant, add isWithinText
  const linkVariants = findElements(j, root, importedName, 'variant', 'link')
  findAttribute(j, linkVariants, 'href').insertAfter(
    j.jsxAttribute(
      j.jsxIdentifier('isWithinText'),
      j.jsxExpressionContainer(j.jsxIdentifier('false'))
    )
  )
  //renameElements(linkWithHref, "Button", "Link")
}

function displayNoHrefWarning(filePath: string, lineNumber: number) {
  console.warn(
    'Cannot upgrade <Button variant="link" manually at' +
      filePath +
      ' line ' +
      lineNumber +
      'for manual upgrade' +
      ' see https://instructure.design/v7/#button-upgrade-guide/#button-upgrade-for-version-8.0-upgrading-variant-link-or-link-inverse-upgrade-examples-for-link-variant-with-no-href-attribute-and-padding-overrides'
  )
}
