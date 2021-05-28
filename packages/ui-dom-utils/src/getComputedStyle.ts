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
import { ownerWindow } from './ownerWindow'
import { canUseDOM } from './canUseDOM'
import React from 'react'

/**
 * ---
 * category: utilities/DOM
 * ---
 *
 * Get the associated CSS properties and values for a
 * specified element
 * @module getComputedStyle
 *
 * @param { Node | Window | React.ReactElement | ((...args: any[]) => any) } el - component or DOM node
 * @returns { Object } object containing css properties and values for the element
 */
function getComputedStyle(
  el: Node | Window | React.ReactElement | ((...args: any[]) => any)
) {
  let style: CSSStyleDeclaration | Record<string, never> = {}

  if (canUseDOM) {
    const node = el && findDOMNode(el)
    if (node) {
      const window = ownerWindow(el)
      style = window !== null ? window.getComputedStyle(node as Element) : {}
    }
  }

  return style
}

export default getComputedStyle
export { getComputedStyle }
