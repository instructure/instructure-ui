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

import { findDOMNode } from './findDOMNode'
import { canUseDOM } from './canUseDOM'
import { getComputedStyle } from './getComputedStyle'
import { ownerDocument } from './ownerDocument'
import React from 'react'

/**
 * ---
 * category: utilities/DOM
 * ---
 *
 * Retrieves the offset parents of a specified element.
 * Includes parents of nodeType 1 (Element nodes such
 * as <p> or <div>) that have either been transformed
 * or that do not have static position.
 * @module getOffsetParents
 * @param { Node | Window | React.ReactElement | React.Component | function | null } el - component or DOM node
 * @returns {Array} offset parents
 */
function getOffsetParents(
  el:
    | Node
    | Window
    | React.ReactElement
    | React.Component
    | ((...args: any[]) => any)
    | null
) {
  const parents: (Node | Window | null)[] = []

  if (!canUseDOM) {
    return parents
  }

  const node = el && findDOMNode(el)

  if (node) {
    let parent: Node | Window | null = node

    // eslint-disable-next-line no-cond-assign
    while (
      (parent = (parent as Node).parentNode) &&
      parent &&
      parent.nodeType === 1 &&
      (parent as Element).tagName !== 'BODY'
    ) {
      const style = getComputedStyle(parent) as CSSStyleDeclaration
      const transform =
        style.getPropertyValue('-webkit-transform') ||
        style.getPropertyValue('-moz-transform') ||
        style.getPropertyValue('-ms-transform') ||
        style.getPropertyValue('-o-transform') ||
        style.getPropertyValue('transform') ||
        'none'
      // initial value of transform can be 'none' or a matrix equivalent
      const transformDefault =
        transform === 'none' || transform === 'matrix(1, 0, 0, 1, 0, 0)'
          ? true
          : false

      if (style.position !== 'static' || !transformDefault) {
        parents.push(parent)
      }
    }

    parents.push(ownerDocument(node).body)
  }

  return parents
}

export default getOffsetParents
export { getOffsetParents }
