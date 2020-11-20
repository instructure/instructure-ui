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
import { getComputedStyle } from './getComputedStyle'

/**
 * ---
 * category: utilities/DOM
 * ---
 *
 * Determine if an element is visible.
 *
 * @param {ReactComponent|DomNode} el - component or DOM node
 * @param {boolean} recursive - by default all parent elements are checked
 * recursively to accurately determine visibility. setting this to `false`
 * will determine visibility based only on the styles of the given node.
 * @returns {boolean} if the element is visible
 */
function isVisible(el, recursive = true) {
  const node = el && findDOMNode(el)
  // skip document or window nodes
  if (node === window || node === document || node === document.body) {
    return true
  }
  const parent = node.parentNode
  // skip text node, check parent
  if (node.nodeType === 3) {
    return isVisible(parent, recursive)
  }

  const style = getComputedStyle(node)
  // physically and visually hidden
  if (style.display === 'none') {
    return false
  }
  // visually hidden
  if (style.visibility === 'hidden' || style.opacity === '0') {
    return false
  }
  // hidden by clipping
  if (
    style.overflow === 'hidden' &&
    style.position === 'absolute' &&
    style.clip !== 'auto'
  ) {
    let rect = style.clip.substring(5).slice(0, -1).split(', ')
    let zeros = true
    rect.forEach((a) => {
      if (a !== '0px') {
        zeros = false
      }
    })
    if (zeros) {
      return false
    }
  }

  if (recursive && parent) {
    // recursively check parent visibility
    return isVisible(parent)
  } else {
    return true
  }
}

export default isVisible
export { isVisible }
