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
  matchElementByLocator,
  matchElementByContents
} from './matchers'

import { firstOrNull } from './firstOrNull'

import { clickable, focusable, tabbable } from './helpers'

function filterBySelector (container, results, selector, options) {
  if (Array.isArray(results)) {
    return results
      .filter(element => matchElementBySelector(element, selector))
  } else {
    return queryAllBySelector(container, selector)
  }
}

function filterByLocator (container, results, locator, options) {
  if (Array.isArray(results)) {
    return results
      .filter(element => matchElementByLocator(element, locator))
  } else {
    return queryAllByLocator(container, locator)
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
  return (Array.isArray(results) ? results : queryAllBySelector(container, '[title], svg'))
    .filter((element) => {
      const titleElement = element.querySelector('title')
      if (matchElementBySelector(element, 'svg') && titleElement) {
        return matchElementByText(titleElement, title, options)
      }
      if (matchElementBySelector(element, '[title]')) {
        return matchElementByAttributeValue(element, 'title', title, options)
      }
      return false
    })
}

function filterByContents (container, results, elementOrString, options) {
  const { ignore } = options
  return (Array.isArray(results) ? results : queryAllBySelector(container, '*'))
    .filter(element => !ignore || !element.matches(ignore))
    .filter(element => matchElementByContents(element, elementOrString, options))
}

function filterByText (container, results, text, options) {
  const { ignore } = options
  return (Array.isArray(results) ? results : queryAllBySelector(container, '*'))
    .filter(element => !ignore || !element.matches(ignore))
    .filter(element => matchElementByText(element, text, options))
}

function filterByLabelText (container, results, labelText, options = {}) {
  // aria-labelledby may not refer to a label element, so we get elements with ids too
  // search the whole document...
  let matches = queryAllBySelector(document.body, 'label, [id]')
    .filter(label => matchElementByContents(label, labelText, options))
    .reduce((labelledElements, label) => {
      let elements

      if (label.getAttribute('for')) {
        // <label for="someId">text</label><input id="someId" />
        elements = [queryBySelector(container, `[id="${label.getAttribute('for')}"]`)]
      } else if (label.getAttribute('id')) {
        // <label id="someId">text</label><input aria-labelledby="someId" />
        // Note: this could be multiple elements...
        elements = [queryBySelector(container, `[aria-labelledby~="${label.getAttribute('id')}"]`)]
      } else if (label.childNodes.length) {
        // <label>text: <input /></label>
        elements = [queryBySelector(label, 'input')]
      }
      return labelledElements.concat(elements)
    }, [])
    .filter(element => element !== null)
    // <button aria-label="text">text</button>
    .concat(
      queryAllBySelector(container, '[aria-label]')
        .filter(element => matchElementByAttributeValue(element, 'aria-label', labelText, options))
    )
    .concat(
      queryAllBySelector(container, ['button', 'a[href]', '[role="button"]', '[role="link"]'].join(','))
        .filter(element => matchElementByContents(element, labelText, options))
    )

    // remove duplicates
  matches = matches.filter((match, i) => matches.indexOf(match) === i)

  if (Array.isArray(results)) {
    return results
      .filter(element => matches.includes(element))
  } else {
    return matches
  }
}

function filterByFocusable (container, results) {
  return (Array.isArray(results) ? results : queryAllBySelector(container, '*'))
    .filter(element => focusable(element))
}

function filterByTabbable (container, results) {
  return (Array.isArray(results) ? results : queryAllBySelector(container, '*'))
    .filter(element => tabbable(element))
}

function filterByClickable (container, results) {
  return (Array.isArray(results) ? results : queryAllBySelector(container, '*'))
    .filter(element => clickable(element))
}

function queryAll (element, query) {
  if (element instanceof Element) {
    return query()
  } else {
    throw new Error(`[ui-test-utils] Invalid HTMLElement for query`)
  }
}

function queryAllBySelector (element = document.documentElement, selector = '*') {
  return queryAll(element, () => {
    let results = Array.from(element.querySelectorAll(selector))
    if (matchElementBySelector(element, selector)) {
      results = [element, ...results]
    }
    return results
  })
}

function queryAllByLocator (element = document.documentElement, locator) {
  return queryAll(element, () => {
    let results = [element, ...Array.from(
      element.querySelectorAll(`[${locator.attribute}*="${locator.value}"`)
    )]
    return results.filter(result => matchElementByLocator(result, locator))
  })
}

function queryBySelector (...args) {
  return firstOrNull(queryAllBySelector(...args))
}

export {
  filterByClickable,
  filterByTabbable,
  filterByFocusable,
  filterByLabelText,
  filterByContents,
  filterByText,
  filterByTitle,
  filterByAttribute,
  filterBySelector,
  filterByLocator
}
