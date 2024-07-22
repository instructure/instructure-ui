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

import { findAttribute, findElements } from '../helpers/codemodHelpers'
import { Collection, JSCodeshift, Literal } from 'jscodeshift'

/**
 * Does the following updates on a <Button>:
 * - `variant="default"` -> removed
 * - `variant="primary"` -> `color="primary"`
 * - `variant="success"` -> `color="success"`
 * - `variant="danger"` -> `color="danger"`
 * - `variant="light"` -> `color="primary-inverse"`
 * - `variant="ghost"` -> `color="ghost" withBackground={false}`
 * - `variant="ghost-inverse"` -> `color="primary-inverse" withBackground={false}`
 */
export default function updateV7ButtonsWithText(
  j: JSCodeshift,
  root: Collection,
  importedName: string,
  filePath: string
) {
  const buttons = findElements(filePath, j, root, importedName)

  // remove variant="default"
  findAttribute(filePath, j, buttons, 'variant', 'default').remove()
  // replace <Button variant="primary" with <Button color="primary"
  findAttribute(filePath, j, buttons, 'variant', 'primary').replaceWith(
    (nodePath) => {
      const { node } = nodePath
      node.name.name = 'color'
      return nodePath.node
    }
  )
  // replace <Button variant="success" with <Button color="success"
  findAttribute(filePath, j, buttons, 'variant', 'success').replaceWith(
    (nodePath) => {
      const { node } = nodePath
      node.name.name = 'color'
      return nodePath.node
    }
  )
  // replace <Button variant="danger" with <Button color="danger"
  findAttribute(filePath, j, buttons, 'variant', 'danger').replaceWith(
    (nodePath) => {
      const { node } = nodePath
      node.name.name = 'color'
      return nodePath.node
    }
  )
  // replace <Button variant="light" with color="primary-inverse"
  findAttribute(filePath, j, buttons, 'variant', 'light').replaceWith(
    (nodePath) => {
      const { node } = nodePath
      node.name.name = 'color'
      ;(node.value as Literal).value = 'primary-inverse'
      return nodePath.node
    }
  )
  // replace <Button variant="ghost" with <Button color="primary" withBackground={false}
  findAttribute(filePath, j, buttons, 'variant', 'ghost')
    .replaceWith((nodePath) => {
      const { node } = nodePath
      node.name.name = 'color'
      ;(node.value as Literal).value = 'primary'
      return nodePath.node
    })
    .insertAfter(
      j.jsxAttribute(
        j.jsxIdentifier('withBackground'),
        j.jsxExpressionContainer(j.jsxIdentifier('false'))
      )
    )

  // replace <Button variant="ghost-inverse" with
  // <Button color="primary-inverse" withBackground={false}
  findAttribute(filePath, j, buttons, 'variant', 'ghost-inverse')
    .replaceWith((nodePath) => {
      const { node } = nodePath
      node.name.name = 'color'
      ;(node.value as Literal).value = 'primary-inverse'
      return nodePath.node
    })
    .insertAfter(
      j.jsxAttribute(
        j.jsxIdentifier('withBackground'),
        j.jsxExpressionContainer(j.jsxIdentifier('false'))
      )
    )
}
