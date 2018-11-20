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
import { getNodeText } from 'dom-testing-library'

import { getOwnerDocument } from './helpers'

if (typeof Element !== 'undefined') { // is the DOM available?
  // polyfill for IE
  // TODO: check SVGElement support
  if (!Element.prototype.matches) {
   Element.prototype.matches = Element.prototype.msMatchesSelector
  }
}

function matches (textToMatch, matcherString, options = {
  exact: true,
  trim: true,
  collapseWhitespace: true
}) {
  const { exact, collapseWhitespace, trim } = options
  const matcher = exact ? exactMatches : fuzzyMatches
  return matcher(textToMatch, matcherString, { collapseWhitespace, trim })
}

function fuzzyMatches (textToMatch, matcher, {collapseWhitespace = true, trim = true} = {}) {
  if (typeof textToMatch !== 'string') {
    return false
  }
  const normalizedText = normalize(textToMatch, {trim, collapseWhitespace})
  return normalizedText.toLowerCase().includes(matcher.toLowerCase())
}

function exactMatches (textToMatch, matcher, { collapseWhitespace = true, trim = true } = {}) {
  if (typeof textToMatch !== 'string') {
    return false
  }
  const normalizedText = normalize(textToMatch, { trim, collapseWhitespace })
  return normalizedText === matcher
}

function normalize (text, { trim, collapseWhitespace }) {
  let normalizedText = text
  normalizedText = trim ? normalizedText.trim() : normalizedText
  normalizedText = collapseWhitespace
    ? normalizedText.replace(/\s+/g, ' ')
    : normalizedText
  return normalizedText
}

function matchElementByTitle (element, titleText, options) {
  if (element.matches('[title]')) {
    return matchElementByAttributeValue(element, 'title', titleText, options)
  } else if (element.matches('svg')) {
    const title = element.querySelector('title')
    if (title) {
      return matchElementByText(title, titleText, options)
    }
  }
  return false
}

function matchElementByLabel (element, labelText, options) {
  const doc = getOwnerDocument(element)

  if (element.getAttribute('aria-label')) {
    return matchElementByAttributeValue(element, 'aria-label', labelText, options)
  } else if (element.getAttribute('aria-labelledby')) {
    // <label id="someId">text</label><label id="someOtherId">text</label>
    // <input aria-labelledby="someId someOtherId" />
    const ids = element.getAttribute('aria-labelledby').split(/\s+/)
    const labels = ids.map(id => doc.getElementById(id))
    return matches(
      labels.map(label => label ? label.textContent : '').join(' '),
      labelText,
      options
    )
  } else if (element.matches('button, a[href], [role="button"], [role="link"]')) {
    return matchElementByContents(element, labelText, options)
  } else {
    if (element.matches('[id]')) {
      // <label for="someId">text</label><input id="someId" />
      const labels = Array.from(doc.querySelectorAll(`[for="${element.getAttribute('id')}"]`))
      const label = labels.map(label => label ? label.textContent : '').join(' ')
      return matches(label, labelText, options)
    } else if (element.matches('input,textarea,select')) {
      // <label>text: <input /></label>
      let parentNode = element.parentNode

      while (
        parentNode &&
        parentNode !== document &&
        parentNode.matches &&
        !parentNode.matches('label')
      ) {
        parentNode = parentNode.parentNode
      }
      return matchElementByContents(parentNode, labelText, options)
    }
  }
}

function matchElementByContents (element, elementOrString, options = {}) {
  if (elementOrString instanceof Element) {
    return element.contains(elementOrString)
  } else {
    return matches(element.textContent, elementOrString, options)
  }
}

function matchElementByText (element, text, options) {
  return matches(getNodeText(element), text, options)
}

function matchElementByAttributeValue (element, name, value, options) {
  return matches(element.getAttribute(name), value, options)
}

export {
  matchElementByContents,
  matchElementByTitle,
  matchElementByLabel,
  matchElementByAttributeValue,
  matchElementByText
}
