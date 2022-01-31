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

import type {
  Collection,
  JSCodeshift,
  JSXAttribute,
  JSXElement
} from 'jscodeshift'
import {
  addImportIfNeeded,
  findElements,
  findImport,
  isJSXAttribue,
  isJSXExpressionContainer,
  isLiteral
} from '../helpers/v7PropsUpdateHelpers'

/**
 * Does the following update on a <Heading>:
 * `<Heading ellipsis>abc</Heading>` ->
 *           `<Heading><TruncateText>abc</TruncateText></Heading>
 */
export default function updateV7Heading(
  j: JSCodeshift,
  root: Collection,
  filePath: string
) {
  const importName = findImport(j, root, 'Heading', [
    '@instructure/ui-heading',
    '@instructure/ui'
  ])
  if (!importName) {
    return false
  }
  const tags = findElements(filePath, j, root, importName, {
    name: 'ellipsis'
  })

  tags.forEach((path) => {
    if (path.value.openingElement.attributes) {
      for (const attr of path.value.openingElement.attributes) {
        if (isJSXAttribue(attr) && attr.name.name === 'ellipsis') {
          if (!attr.value) {
            // <Heading ellipsis>abc</Heading>
            wrapInTruncateText(j, root, attr, path.value)
          } else if (isJSXExpressionContainer(attr.value)) {
            // <Heading ellipsis={expr}>abc</Heading>
            if (isLiteral(attr.value.expression)) {
              if (typeof attr.value.expression.value === 'boolean') {
                if (attr.value.expression.value === true) {
                  // <Heading ellipsis={true}>abc</Heading>
                  wrapInTruncateText(j, root, attr, path.value)
                } else {
                  // <Heading ellipsis={false}>abc</Heading>
                  // remove ellipsis attribute
                  path.value.openingElement.attributes.splice(
                    path.value.openingElement.attributes.indexOf(attr),
                    1
                  )
                  return
                }
              } else {
                console.warn(
                  filePath +
                    '\nline ' +
                    path.value.loc?.start.line +
                    ': Heading ellipsis ' +
                    'parameter has non-boolean value, please refactor manually'
                )
                return
              }
            } else {
              console.warn(
                filePath +
                  '\nline ' +
                  path.value.loc?.start.line +
                  ': Heading ellipsis ' +
                  'parameter has non-boolean value, please refactor manually'
              )
              return
            }
          } else {
            console.warn(
              filePath +
                '\nline ' +
                path.value.loc?.start.line +
                ': Heading ellipsis ' +
                'parameter has non-boolean value, please refactor manually'
            )
            return
          }
        }
      }
    }
  })
  if (tags) {
    return true
  }
  return false
}

function wrapInTruncateText(
  j: JSCodeshift,
  root: Collection,
  attr: JSXAttribute,
  elem: JSXElement
) {
  elem.openingElement.attributes!.splice(
    elem.openingElement.attributes!.indexOf(attr),
    1
  )
  addImportIfNeeded(j, root, 'TruncateText', [
    '@instructure/ui-truncate-text',
    '@instructure/ui'
  ])
  // move children under a new TruncateText
  const children = elem.children
  const tt = j.jsxElement(
    j.jsxOpeningElement(j.jsxIdentifier('TruncateText')),
    j.jsxClosingElement(j.jsxIdentifier('TruncateText')),
    children
  )
  // eslint-disable-next-line no-param-reassign
  elem.children = [tt]
}
