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
  JSXElement,
  JSXExpressionContainer,
  StringLiteral
} from 'jscodeshift'
import {
  findElements,
  findImport,
  getVisibleChildren,
  isJSXElement,
  isJSXIdentifier,
  isJSXMemberExpression,
  isJSXText,
  printWarning
} from '../helpers/v7PropsUpdateHelpers'

/**
 * Does the following updates on a <Popover>:
 * - `<Popover><Popover.Trigger>{t}</Popover.Trigger></Popover>` ->
 *     `<Popover renderTrigger={t} />`
 * - `<Popover><Popover.Content>c</Popover.Content></Popover>` ->
 *     `<Popover>c</Popover>`
 * - `<Popover onToggle=` -> Display warning that it needs to be done
 *   manually
 **/
export default function updateV7Popover(
  j: JSCodeshift,
  root: Collection,
  filePath: string
) {
  const importName = findImport(j, root, 'Popover', [
    '@instructure/ui-popover',
    '@instructure/ui'
  ])
  if (!importName) {
    return false
  }
  let isUpdated = false
  ///// `<Popover><Popover.Trigger>{t}</Popover.Trigger></Popover>` ->
  /////     `<Popover renderTrigger={t} />`
  findElements(filePath, j, root, 'Popover').forEach((path) => {
    const trigger = getVisibleChildren(
      getChildrenByName('Popover', 'Trigger', path.value.children)
    )
    if (trigger.length > 0) {
      // should have 0 or 1 child
      isUpdated = true
      const theChild = trigger[0]
      let toAdd = theChild as JSXExpressionContainer | StringLiteral
      if (isJSXText(theChild)) {
        toAdd = j.stringLiteral(theChild.value)
      }
      if (isJSXElement(theChild)) {
        toAdd = j.jsxExpressionContainer(theChild)
      } // hope these conversions are enough
      path.value.openingElement.attributes!.push(
        j.jsxAttribute(j.jsxIdentifier('renderTrigger'), toAdd)
      )
    }
  })
  ///// `<Popover><Popover.Content>c</Popover.Content></Popover>` ->
  /////    `<Popover>c</Popover>`
  findElements(filePath, j, root, 'Popover').forEach((path) => {
    const trigger = getChildrenByName('Popover', 'Content', path.value.children)
    if (trigger) {
      // should have 0 or 1 child
      isUpdated = true
      path.value.children!.push(...trigger)
    }
  })
  ///// `<Popover onToggle=` -> Display warning that it needs to be done manually
  findElements(filePath, j, root, 'Popover', { name: 'onToggle' }).forEach(
    (path) => {
      printWarning(
        filePath,
        path.value.loc?.start.line,
        "Popover's onToggle needs to be converted manually " +
          'to onShowContent and onHideContent'
      )
    }
  )
  return isUpdated
}

/**
 * Removes the child of the given array that is named like `Name1.Name2`
 * It returns the first child of the child that has this name (if any)
 */
function getChildrenByName(
  name1: string,
  name2: string,
  array?: JSXElement['children']
) {
  if (!array) {
    return
  }
  for (const child of array) {
    if (
      isJSXElement(child) &&
      child.children &&
      isJSXMemberExpression(child.openingElement.name) &&
      isJSXIdentifier(child.openingElement.name.object) &&
      child.openingElement.name.object.name === name1 &&
      child.openingElement.name.property.name === name2
    ) {
      array.splice(array.indexOf(child), 1)
      return child.children
    }
  }
  return
}
