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
import {
  matchElementByAttributeValue,
  matchElementByText,
  matchElementBySelector,
  matchElementByContents
} from './matchers'

import { firstOrNull } from './firstOrNull'

function filterBySelector (container, results, selector, options) {
  if (Array.isArray(results)) {
    return results
      .filter(element => matchElementBySelector(element, selector))
  } else {
    return queryAllBySelector(container, selector)
  }
}

function filterByAttribute (container, results, name, value, options = {}) {
  const selector = `[${name}]`

  let result

  // by name
  if (Array.isArray(results)) {
    result = results.filter(element => matchElementBySelector(element, selector))
  } else {
    result = queryAllBySelector(container, selector)
  }

  // by value
  if (value) {
    return result
      .filter(element => matchElementByAttributeValue(element, name, value, options))
  } else {
    return result
  }
}

function filterByTitle (container, results, title, options) {
  return (Array.isArray(results) ? results : queryAllBySelector(container, '[title], svg > title'))
    .filter((element) => {
      if (matchElementBySelector(element, 'svg > title')) {
        return matchElementByText(element, title, options)
      }
      if (matchElementBySelector(element, '[title]')) {
        return matchElementByAttributeValue(element, 'title', title, options)
      }
      return false
    })
}

function filterByContents (container, results, elementOrString, options) {
  return (Array.isArray(results) ? results : queryAllBySelector(container, '*'))
    .filter(element => matchElementByContents(element, elementOrString, options))
}

function filterByText (container, results, text, options) {
  return (Array.isArray(results) ? results : queryAllBySelector(container, '*'))
    .filter(element => matchElementByText(element, text, options))
}

function filterByLabelText (container, results, text, options = {}) {
  // aria-labelledby may not refer to a label element, so we get elements with ids too
  const matches = queryAllBySelector(container, 'label, [id]')
    .filter(label => matchElementByContents(label, text, options))
    .map((label) => {
      if (label.getAttribute('for')) {
        // <label for="someId">text</label><input id="someId" />
        return queryBySelector(container, `[id="${label.getAttribute('for')}"]`)
      } else if (label.getAttribute('id')) {
        // <label id="someId">text</label><input aria-labelledby="someId" />
        return queryBySelector(container, `[aria-labelledby~="${label.getAttribute('id')}"]`)
      } else if (label.childNodes.length) {
        // <label>text: <input /></label>
        return queryBySelector(label, 'input')
      }
      return null
    })
    .filter(element => element !== null)
    // <button aria-label="text">text</button>
    .concat(
      queryAllBySelector(container, '[aria-label]')
        .filter(element => matchElementByAttributeValue(element, 'aria-label', text, options))
    )

  if (Array.isArray(results)) {
    return results
      .filter(element => matches.includes(element))
  } else {
    return matches
  }
}

function queryAllBySelector (element = document.documentElement, selector = '*') {
  if (element instanceof Element || element instanceof SVGElement) {
    let result = Array.from(element.querySelectorAll(selector))
    if (matchElementBySelector(element, selector)) {
      result = [element, ...result]
    }
    return result
  } else {
    throw Error(`[ui-test-utils] Invalid HTMLElement for query`)
  }
}

function queryBySelector (...args) {
  return firstOrNull(queryAllBySelector(...args))
}

export {
  filterByLabelText,
  filterByContents,
  filterByText,
  filterByTitle,
  filterByAttribute,
  filterBySelector
}
