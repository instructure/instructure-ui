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
import { getBoundingClientRect } from './getBoundingClientRect'
import { requestAnimationFrame } from './requestAnimationFrame'

/**
 * ---
 * category: utilities/DOM
 * ---
 * ### This utility is deprecated since version __8.0__ and will be permanently deleted in version 9.0.
 * *Please use the native [DOM ResizeObserver API](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) instead of this.*
 *
 * Adds a listener to an element and calls a specified handler function whenever the size changes.
 * @deprecated since version 8.0
 * @module
 *
 *
 * @param {ReactComponent|DomNode} el - component or DOM node
 * @param {function} handler - function to run when resize occurs
 * @returns {function} remove - cancel the listener and no longer execute the handler function
 */
function addResizeListener(el, handler, dimensions = ['width']) {
  const node = findDOMNode(el)
  let origSize = getBoundingClientRect(node)
  let cancelled = false
  let raf

  const checkDimensions = () => {
    if (cancelled) {
      return
    }

    const boundingRect = getBoundingClientRect(node)
    const size = {
      width: boundingRect.width,
      height: boundingRect.height
    }

    if (
      dimensions.some((dim) => size[dim] != origSize[dim]) &&
      typeof handler === 'function'
    ) {
      handler(size)
    }

    origSize = size

    raf = requestAnimationFrame(checkDimensions)
  }

  checkDimensions()

  return {
    remove() {
      cancelled = true
      raf.cancel()
    }
  }
}

export default addResizeListener
export { addResizeListener }
