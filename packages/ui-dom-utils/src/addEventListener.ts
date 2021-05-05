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

/**
 * ---
 * category: utilities/DOM
 * ---
 * Wrapper function for DOM addEventListener
 * @module addEventListener
 * @param {DOMNode} el - DOM node which will have the event listener attached
 * @param {String} event - a string specifying the event name ('click', 'focus', etc)
 * @param {Function} handler - function to run when event occurs
 * @param {Boolean} capture - should the event be executed in the capturing or bubbling phase
 * @returns {Function} a method to remove the event listener
 */
function addEventListener(el: any, event: any, handler: any, capture: any) {
  const node = el === window || el === document ? el : findDOMNode(el)
  node.addEventListener(event, handler, capture)

  return {
    remove() {
      node.removeEventListener(event, handler, capture)
    }
  }
}

export default addEventListener
export { addEventListener }
