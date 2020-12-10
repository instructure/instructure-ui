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

let classListShimmed = false

const apiForEmptyNode = {
  toArray: () => [],
  contains: () => false,
  add: () => {},
  remove: () => {}
}

/**
 * ---
 * category: utilities/DOM
 * ---
 *
 * Produces a classList object containing functions
 * for both adding and removing classes from an element.
 * Also provides a contains function to query if the
 * element contains a specified class name.
 *
 * @param {ReactComponent|DomNode} element - component or DOM node
 * @return {Object} object containing classList functions 'contains', 'add', and 'remove'
 */
function getClassList(element) {
  const node = findDOMNode(element)

  if (!node) return apiForEmptyNode

  const classListApi = {
    toArray() {
      shimClassListForIE()
      return [...node.classList]
    }
  }

  ;['contains', 'add', 'remove'].forEach((method) => {
    classListApi[method] = (className) => {
      shimClassListForIE()
      return node.classList[method](className)
    }
  })

  return classListApi
}

function shimClassListForIE() {
  // IE 11 doesn't support classList on SVG elements
  /* istanbul ignore if */
  if (!classListShimmed) {
    if (
      !(
        'classList' in
        document.createElementNS('http://www.w3.org/2000/svg', 'g')
      )
    ) {
      const descr = Object.getOwnPropertyDescriptor(
        HTMLElement.prototype,
        'classList'
      )
      Object.defineProperty(SVGElement.prototype, 'classList', descr)
    }
    classListShimmed = true
  }
}

export default getClassList
export { getClassList }
