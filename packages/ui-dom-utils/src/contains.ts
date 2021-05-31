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
import React from 'react'

/**
 * ---
 * category: utilities/DOM
 * ---
 *
 * Determine if an element contains another DOM node
 * @module containsWithDOM
 * @param { Node | Window | React.ReactElement | function | null } context - component or DOM node
 * @param { Node | Window | React.ReactElement | function | null } el - component or DOM node which we want to determine if contained within the context
 * @returns { boolean } if the element is contained within the context
 */
function containsWithDOM(
  context:
    | Node
    | Window
    | React.ReactElement
    | ((...args: any[]) => any)
    | null,
  el: Node | Window | React.ReactElement | ((...args: any[]) => any) | null
) {
  const container = context && findDOMNode(context)
  const node = el && findDOMNode(el)

  if (!container || !node) {
    return false
  } else if (!(container instanceof Window) && !(node instanceof Window)) {
    return container.contains(node)
  } else {
    return containsFallback(container, node)
  }
}

/* istanbul ignore next  */
function containsFallback(
  context:
    | Node
    | Window
    | React.ReactElement
    | ((...args: any[]) => any)
    | null,
  el: Node | Window | React.ReactElement | ((...args: any[]) => any) | null
) {
  let node = el

  while (node) {
    if (node === context) {
      return true
    }
    node = (node as Node).parentNode
  }

  return false
}

const contains = canUseDOM ? containsWithDOM : containsFallback
export default contains
export { contains }
