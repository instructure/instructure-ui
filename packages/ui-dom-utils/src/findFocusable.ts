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

/**
 * Adapted from jQuery UI core
 *
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 **/

import { getComputedStyle, findDOMNode, elementMatches } from './'

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'el' implicitly has an 'any' type.
function findFocusable(el, filter, shouldSearchRootNode) {
  const element = findDOMNode(el) as any

  if (!element || typeof element.querySelectorAll !== 'function') {
    return []
  }

  const focusableSelector =
    'a[href],frame,iframe,object,input:not([type=hidden]),select,textarea,button,*[tabindex]'

  let matches = Array.from(element.querySelectorAll(focusableSelector))

  if (shouldSearchRootNode && elementMatches(element, focusableSelector)) {
    matches = [...matches, element]
  }

  return matches.filter((el) => {
    if (typeof filter === 'function') {
      return filter(el) && focusable(el)
    } else {
      return focusable(el)
    }
  })
}

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'element' implicitly has an 'any' type.
function hidden(element) {
  const cs = getComputedStyle(element)
  return (
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'display' does not exist on type '{}'.
    (cs.display !== 'inline' &&
      element.offsetWidth <= 0 &&
      element.offsetHeight <= 0) ||
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'display' does not exist on type '{}'.
    cs.display === 'none'
  )
}

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'element' implicitly has an 'any' type.
function positioned(element) {
  const POS = ['fixed', 'absolute']
  if (POS.includes(element.style.position.toLowerCase())) return true
  if (
    POS.includes(
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'getPropertyValue' does not exist on type... Remove this comment to see the full error message
      getComputedStyle(element).getPropertyValue('position').toLowerCase()
    )
  )
    return true
  return false
}

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'element' implicitly has an 'any' type.
function visible(element) {
  /* eslint no-param-reassign:0 */
  while (element) {
    if (element === document.body) break
    if (hidden(element)) return false
    if (positioned(element)) break
    element = element.parentNode
  }
  return true
}

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'element' implicitly has an 'any' type.
function focusable(element) {
  return !element.disabled && visible(element)
}

export default findFocusable
export {
  /**
   * ---
   * category: utilities/a11y
   * ---
   *
   * Given an element, finds and returns all visible, focusable children.
   * Focusable elements include input, select, textarea, button, and object.
   * Anchor tags are also focusable if they include an href or
   * tabindex attribute (including tabindeces less than zero).
   * @module findFocusable
   * @param {ReactComponent|DomNode} el - component or DOM node
   * @param {Function} filter - a function to filter the matching nodes
   * @param {Boolean} shouldSearchRootNode - should the root node be included in the search
   * @returns {Array} array of all tabbable children
   */
  findFocusable
}
