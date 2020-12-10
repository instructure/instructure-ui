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

import { findFocusable } from './findFocusable'

function findTabbable(el, shouldSearchRootNode) {
  return findFocusable(
    el,
    (element) => {
      return !isInvalidTabIndex(element.getAttribute('tabindex'))
    },
    shouldSearchRootNode
  )
}

function isInvalidTabIndex(tabIndex) {
  return !isNaN(tabIndex) && tabIndex < 0
}

export default findTabbable
export {
  /**
   * ---
   * category: utilities/a11y
   * ---
   *
   * Given an element, finds and returns all visible, tabbable children.
   * Tabbable elements include input, select, textarea, button, and object.
   * Anchor tags are also tabbable if they include an href or zero or positive
   * tabindex attribute (to include elements with negative tabindex attributes,
   * use findFocusable).
   *
   * @param {ReactComponent|DomNode} el - component or DOM node
   * @param {Boolean} shouldSearchRootNode - should the root node be included in the search
   * @returns {Array} array of all tabbable children
   */
  findTabbable
}
