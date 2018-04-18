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
import canUseDOM from './canUseDOM'
import ownerDocument from './ownerDocument'
import getComputedStyle from './getComputedStyle'

const COMPUTED_CACHE = {}

/**
 * ---
 * category: utilities/DOM
 * ---
 *
 * Gets font size in px
 *
 * @param {ReactComponent|DomNode} el - component or DOM node
 * @returns {Object} font size in px
 */
export default function getFontSize (el, ignoreCache) {
  if (!canUseDOM) {
    return 16
  }

  const container = el || ownerDocument(el).documentElement

  // return the cached font size if it's there
  if (!ignoreCache && COMPUTED_CACHE[container]) {
    return COMPUTED_CACHE[container]
  }

  const fontSize = parseInt(getComputedStyle(container).getPropertyValue('font-size'))

  // cache the computed font size so that we don't have to compute it again
  COMPUTED_CACHE[container] = fontSize

  return fontSize
}
