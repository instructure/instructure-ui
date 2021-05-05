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
 * @param {ReactComponent|DomNode} el - component or DOM node
 * @returns {Array} scroll parents
 */
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'el' implicitly has an 'any' type.
function getScrollParents(el) {
  // @ts-expect-error ts-migrate(7034) FIXME: Variable 'parents' implicitly has type 'any[]' in ... Remove this comment to see the full error message
  const parents = []

  if (!canUseDOM) {
    // @ts-expect-error ts-migrate(7005) FIXME: Variable 'parents' implicitly has an 'any[]' type.
    return parents
  }

  const node = findDOMNode(el)

  if (node) {
    // In firefox if the element is inside an iframe with display: none; window.getComputedStyle() will return null;
    // https://bugzilla.mozilla.org/show_bug.cgi?id=548397
    const computedStyle = getComputedStyle(node) || {}
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'position' does not exist on type '{}'.
    const position = computedStyle.position

    if (position === 'fixed') {
      return [node.ownerDocument]
    }

    let parent = node
    // eslint-disable-next-line no-cond-assign
    while (parent && parent.nodeType === 1 && (parent = parent.parentNode)) {
      let style
      try {
        style = getComputedStyle(parent)
      } catch (err) {} // eslint-disable-line no-empty

      if (typeof style === 'undefined' || style === null) {
        parents.push(parent)
        return parents
      }

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'overflow' does not exist on type '{}'.
      const { overflow, overflowX, overflowY } = style

      if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
        if (
          position !== 'absolute' ||
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'position' does not exist on type '{}'.
          ['relative', 'absolute', 'fixed'].indexOf(style.position) >= 0
        ) {
          parents.push(parent)
        }
      }
    }

    parents.push(node.ownerDocument.body)

    // If the node is within a frame, account for the parent window scroll
    if (node.ownerDocument !== document) {
      parents.push(node.ownerDocument.defaultView)
    }
  }

  return parents
}

export default getScrollParents
export { getScrollParents }
