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
  Collection,
  JSCodeshift,
  JSXAttribute,
  JSXElement,
  JSXIdentifier,
  JSXText,
  Literal
} from 'jscodeshift'
import {
  addImportIfNeeded,
  findAttribute,
  findElements,
  renameElements
} from '../helpers/buttonUpdateHelpers'

/**
 * Does the following updates on a <Button>:
 * - variant="icon" -> <IconButton withBackground={false} withBorder={false}
 * - variant="icon-inverse" -> <IconButton color="primary-inverse" withBackground={false} withBorder={false}
 * - variant="circle-default" -> <IconButton color="secondary" shape="circle"
 * - variant="circle-danger" -> <IconButton color="danger" shape="circle"
 * - variant="icon" -> <IconButton color="secondary" shape="circle"
 *
 * This codemod also adds an import to `IconButton`.
 *
 * It also outputs a warning and does not do anything if one of these variants
 * has visible children (it simply checks whether it has 1
 * `<ScreenReaderContent>` child.)
 **/
export default function updateV7ButtonsIconCircle(
  j: JSCodeshift,
  root: Collection,
  importedName: string,
  filePath: string
) {
  // find out if the button has got any visible text inside it, in this case
  // just display a warning, that it cannot be upgraded.
  const buttonsWithNoText = findElements(j, root, importedName, {
    name: 'variant',
    value: [
      'icon',
      'icon-inverse',
      'circle-default',
      'circle-primary',
      'circle-danger'
    ]
  }).filter((path) => {
    // finds all with no/ScreenReader children
    if (!path.value.children || path.value.children.length == 0) {
      return true
    }
    let screenReaderChildText
    for (const child of path.value.children) {
      if (isJSXText(child) && child.value.trim().length > 0) {
        // visible child, TODO display error
        return false
      } else if (
        isJSXElement(child) &&
        (child.openingElement.name as JSXIdentifier).name ===
          'ScreenReaderContent'
      ) {
        // TODO not good, this code should be OK: <ScreenReaderContent>{formatMessage('Edit')}</ScreenReaderContent>
        if (
          child.children &&
          child.children.length === 1 &&
          child.children[0].type === 'JSXText'
        ) {
          if (!screenReaderChildText) {
            screenReaderChildText = child.children[0].value
          } else {
            // error, 2 or more screenreader children
            return false
          }
        }
      }
    }
    if (screenReaderChildText) {
      path.value.openingElement.attributes!.push(
        j.jsxAttribute(
          j.jsxIdentifier('screenReaderLabel'),
          j.stringLiteral(screenReaderChildText)
        )
      )
      while (path.value.children.length > 0) {
        path.value.children.pop()
      }
      return true
    }
    console.warn(
      'Cannot update icon/circle Button in ' +
        filePath +
        ' at line ' +
        path.value.loc?.start.line +
        ' because it has visible child or has multiple/non-ScreenReader children. ' +
        'This could be a false alert (the codemod just checks whether it has a ' +
        'ScreenReaderContent child). You will need to update this manually.'
    )
    return false
  })

  if (buttonsWithNoText.length == 0) {
    return
  }
  // add IconButton import
  const iconButtonImportName = addImportIfNeeded(
    j,
    root,
    'IconButton',
    '@instructure/ui-buttons'
  )

  // rename every <Button> to <IconButton> (or whatever alias its imported under)
  renameElements(buttonsWithNoText, 'Button', iconButtonImportName)

  // remove variant="icon", add withBorder={false} withBackground={false}
  const iconButton = findAttribute(
    j,
    buttonsWithNoText,
    'variant',
    'icon'
  ).remove()
  addWithBorderBackground(j, iconButton)

  // change variant="icon-inverse" to color="primary-inverse" withBorder={false} withBackground={false}
  const iconInverse = findAttribute(
    j,
    buttonsWithNoText,
    'variant',
    'icon-inverse'
  ).replaceWith((nodePath) => {
    const { node } = nodePath
    node.name.name = 'color'
    ;(node.value as Literal).value = 'primary-inverse'
    return nodePath.node
  })
  addWithBorderBackground(j, iconInverse)

  // change variant="circle-default" to color="secondary" shape="circle"
  findAttribute(j, buttonsWithNoText, 'variant', 'circle-default')
    .replaceWith((nodePath) => {
      const { node } = nodePath
      node.name.name = 'color'
      ;(node.value as Literal).value = 'secondary'
      return nodePath.node
    })
    .insertAfter(
      j.jsxAttribute(j.jsxIdentifier('shape'), j.stringLiteral('circle'))
    )

  // change variant="circle-primary" to color="primary" shape="circle"
  findAttribute(j, buttonsWithNoText, 'variant', 'circle-primary')
    .replaceWith((nodePath) => {
      const { node } = nodePath
      node.name.name = 'color'
      ;(node.value as Literal).value = 'primary'
      return nodePath.node
    })
    .insertAfter(
      j.jsxAttribute(j.jsxIdentifier('shape'), j.stringLiteral('circle'))
    )

  // change variant="circle-danger" to color="danger" shape="circle"
  findAttribute(j, buttonsWithNoText, 'variant', 'circle-danger')
    .replaceWith((nodePath) => {
      const { node } = nodePath
      node.name.name = 'color'
      ;(node.value as Literal).value = 'danger'
      return nodePath.node
    })
    .insertAfter(
      j.jsxAttribute(j.jsxIdentifier('shape'), j.stringLiteral('circle'))
    )
}

function addWithBorderBackground(
  j: JSCodeshift,
  root: Collection<JSXAttribute>
) {
  root
    .insertAfter(
      j.jsxAttribute(
        j.jsxIdentifier('withBorder'),
        j.jsxExpressionContainer(j.jsxIdentifier('false'))
      )
    )
    .insertAfter(
      j.jsxAttribute(
        j.jsxIdentifier('withBackground'),
        j.jsxExpressionContainer(j.jsxIdentifier('false'))
      )
    )
}

function isJSXElement(elem: { type: string }): elem is JSXElement {
  return elem.type == 'JSXElement'
}

function isJSXText(elem: { type: string }): elem is JSXText {
  return elem.type == 'JSXText'
}
