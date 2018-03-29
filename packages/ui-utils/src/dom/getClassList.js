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

import findDOMNode from './findDOMNode'

let classListShimmed = false

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
export default function getClassList (element) {
  const node = findDOMNode(element)

  return {
    contains (className) {
      return node && hasClass(node, className)
    },

    add (className) {
      shimClassListForIE()

      if (node && node.classList) {
        node.classList.add(className)
      } else if (node && !hasClass(node)) {
        node.className = `${node.className} ${className}`
      }
    },

    remove (className) {
      shimClassListForIE()

      if (node && node.classList) {
        node.classList.remove(className)
      } else if (node) {
        node.className = node.className // eslint-disable-line no-param-reassign
          .replace(new RegExp(`(^|\\s)${className}(?:\\s|$)`, 'g'), '$1')
          .replace(/\s+/g, ' ')
          .replace(/^\s*|\s*$/g, '')
      }
    }
  }
}

function hasClass (node, className) {
  shimClassListForIE()
  if (node.classList) {
    return !!className && node.classList.contains(className)
  } else {
    return ` ${node.className} `.indexOf(` ${className} `) !== -1
  }
}

function shimClassListForIE () { // IE 11 doesn't support classList on SVG elements
  /* istanbul ignore if */
  if (!classListShimmed && !('classList' in document.createElementNS('http://www.w3.org/2000/svg', 'g'))) {
    const descr = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'classList')
    Object.defineProperty(SVGElement.prototype, 'classList', descr)
    classListShimmed = true
  }
}
