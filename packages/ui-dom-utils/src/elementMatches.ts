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
import { UIElement } from '@instructure/shared-types'

/**
 * ---
 * category: utilities/DOM
 * ---
 *
 * Polyfill for Element.matches (https://developer.mozilla.org/en-US/docs/Web/API/Element/matches)
 * DEPRECATED This polyfill is only needed for old browsers and will be removed in InstUI v9
 * @module elementMatches
 * @param el - component or DOM node
 * @param selectorString - a string representing the selector to test
 * @returns if the element would be selected by the specified selector string
 */
function elementMatches(el: UIElement, selectorString: string) {
  const node = el && findDOMNode(el)
  if (!node) return false
  // this cast is in a separate line to circumvent a react-docgen bug
  const elem: Element = node as Element
  return elem.matches(selectorString)
}

export default elementMatches
export { elementMatches }
