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
import { fuzzyMatches, matches, getNodeText } from 'dom-testing-library'

if (typeof Element !== 'undefined') { // is the DOM available?
  // polyfill for IE
  // TODO: check SVGElement support
  if (!Element.prototype.matches) {
   Element.prototype.matches = Element.prototype.msMatchesSelector
  }
}

function matchElementByText (element, text, options = {}) {
  const { exact, collapseWhitespace, trim } = options
  const matcher = exact ? matches : fuzzyMatches
  return matcher(getNodeText(element), element, text, { collapseWhitespace, trim })
}

function matchElementByContents (element, elementOrString, options = {}) {
  const { exact, collapseWhitespace, trim } = options
  const matcher = exact ? matches : fuzzyMatches

  if (elementOrString instanceof Element) {
    return element.contains(elementOrString)
  } else {
    return matcher(element.textContent, element, elementOrString, { collapseWhitespace, trim })
  }
}

function matchElementByAttributeValue (element, name, value, options = {}) {
  const { exact, collapseWhitespace, trim } = options
  const matcher = exact ? matches : fuzzyMatches
  return matcher(element.getAttribute(name), element, value, { collapseWhitespace, trim })
}

function matchElementBySelector (element, selector) {
  return element.matches(selector)
}

export {
  matchElementByText,
  matchElementByContents,
  matchElementByAttributeValue,
  matchElementBySelector
}
