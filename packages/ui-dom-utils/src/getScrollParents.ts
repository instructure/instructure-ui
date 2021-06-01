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
import React from 'react'

/**
 * ---
 * category: utilities/DOM
 * ---
 *
 * Retrieves the scroll parents of a specified element.
 * Includes parents of nodeType 1 (Element nodes such
 * as <p> or <div>) that have overflow css properties
 * set to auto, scroll, or overlay
 * @module getScrollParents
 *
 * @param { Node | Window | React.ReactElement | React.Component | function } el - component or DOM node
 * @returns {Array} scroll parents
 */
function getScrollParents(
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
    // In firefox if the element is inside an iframe with display: none; window.getComputedStyle() will return null;
    // https://bugzilla.mozilla.org/show_bug.cgi?id=548397
    const computedStyle = getComputedStyle(node) || {}
    const position = computedStyle.position

    if (position === 'fixed') {
      return [(node as Node).ownerDocument]
    }

    let parent: Node | Window | null = node
    // eslint-disable-next-line no-cond-assign
    while (
      parent &&
      (parent as Node).nodeType === 1 &&
      (parent = (parent as Node).parentNode)
    ) {
      let style
      try {
        style = getComputedStyle(parent)
      } catch (err) {} // eslint-disable-line no-empty

      if (typeof style === 'undefined' || style === null) {
        parents.push(parent)
        return parents
      }

      const { overflow, overflowX, overflowY } = style as CSSStyleDeclaration

      if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
        if (
          position !== 'absolute' ||
          ['relative', 'absolute', 'fixed'].indexOf(style.position) >= 0
        ) {
          parents.push(parent)
        }
      }
    }

    const ownerDocument = (node as Node).ownerDocument
    if (ownerDocument) {
      parents.push(ownerDocument.body)

      // If the node is within a frame, account for the parent window scroll
      if (ownerDocument !== document) {
        // ownerDocument.defaultView can be null
        parents.push(ownerDocument.defaultView)
      }
    }
  }

  return parents
}

export default getScrollParents
export { getScrollParents }
