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
 * Adds a listener to an element and calls a specified handler
 * function whenever the position changes
 * @module
 * @param {ReactComponent|DomNode} el - component or DOM node
 * @param {function} handler - function to run if the position has changed
 * @returns {function} remove - cancel the listener and no longer execute the handler function
 */
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'el' implicitly has an 'any' type.
function addPositionChangeListener(el, handler) {
  const node = findDOMNode(el)
  // @ts-expect-error ts-migrate(7034) FIXME: Variable 'raf' implicitly has type 'any[]' in some... Remove this comment to see the full error message
  const raf = []

  let coords = getBoundingClientRect(node) || {}
  let cancelled = false

  function checkPosition() {
    if (cancelled === false) {
      const newCoords = getBoundingClientRect(node) || {}
      const positionChanged =
        newCoords.top !== coords.top ||
        newCoords.left !== coords.left ||
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'right' does not exist on type '{ top: nu... Remove this comment to see the full error message
        newCoords.right !== coords.right ||
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'bottom' does not exist on type '{ top: n... Remove this comment to see the full error message
        newCoords.bottom !== coords.bottom ||
        newCoords.width !== coords.width ||
        newCoords.height !== coords.height

      if (positionChanged && typeof handler === 'function') {
        handler(newCoords)
      }

      coords = newCoords

      raf.push(requestAnimationFrame(checkPosition))
    }
  }

  checkPosition()

  return {
    remove() {
      cancelled = true
      // @ts-expect-error ts-migrate(7005) FIXME: Variable 'raf' implicitly has an 'any[]' type.
      raf.forEach((req) => req.cancel())
    }
  }
}

export default addPositionChangeListener
export { addPositionChangeListener }
