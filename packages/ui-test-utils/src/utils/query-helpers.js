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

import { prettyDOM } from 'dom-testing-library/dist/pretty-dom'

import { bindElementToUtilities } from './bindElementToUtilities'
import { waitForQueryResult } from './waitForQueryResult'

import {
 filterByLabelText,
 filterByText,
 filterByContents,
 filterByTitle,
 filterByAttribute,
 filterBySelector,
} from './filters'

function bindResultsToUtilities (result, customMethods) {
  return Array.isArray(result) ? result.map(el => bindElementToUtilities(el, customMethods)) : []
}

function parseQueryArguments () {
  let element = document.body
  let selectorIndex = 0
  let options = {
    expectEmpty: false,
    exact: true,
    regexp: false,
    trim: true,
    collapseWhitespace: true,
    visible: true,
    timeout: 1900
  }
  let locator

  if (arguments[0] instanceof Element) {
    element = arguments[0]
    selectorIndex = 1
  }

  let selector = arguments[selectorIndex]

  if (typeof selector === 'string' || selector instanceof Element) {
    selector = { css: selector }
  } else if (selector) {
    locator = selector.locator
    const {
      title,
      css,
      tag,
      text,
      contains,
      label,
      value,
      attribute,
      ...rest
    } = selector
    selector = {
      css,
      title,
      tag,
      text,
      contains,
      label,
      value,
      attribute
    }
    options = { ...options, ...rest }
  }

  if (arguments[selectorIndex + 1]) {
    options = { ...options, ...arguments[selectorIndex + 1] }
  }

  return {
    element,
    locator,
    selector: validateSelector(selector),
    options
  }
}

function querySelector (element, selector, options) {
  const {
    css,
    tag,
    text,
    contains,
    label,
    title,
    value,
    attribute,
  } = selector

  let result

  if (typeof css === 'string') {
    result = filterBySelector(element, result, css, options)
  }

  if (typeof tag === 'string') {
    result = filterBySelector(element, result, tag, options)
  }

  if (label) {
    result = filterByLabelText(element, result, label, options)
  }

  if (text) {
    result = filterByText(element, result, text, options)
  }

  if (contains) {
    result = filterByContents(element, result, contains, options)
  }

  if (value) {
    result = filterByAttribute(element, result, 'value', value, options)
  }

  if (title) {
    result = filterByTitle(element, result, title, options)
  }

  if (attribute && typeof attribute.name === 'string') {
    result = filterByAttribute(element, result, attribute.name, attribute.value, options)
  } else if (attribute) {
    result = filterByAttribute(element, result, attribute, null, options)
  }

  return result || []
}

async function getQueryResult (element, query, options, message) {
  const queryResult = () => {
    let results = query()
    if (options.visible) {
      results = results.filter(result => result.visible())
    }
    return results
  }

  const { expectEmpty, timeout } = options

  let result

  if (timeout > 0) {
    result = await waitForQueryResult(
      queryResult,
      { timeout, expectEmpty, element, message }
    )
  } else {
    result = queryResult()
  }

  if (result && result.length > 0) {
    return result
  } else if (!expectEmpty) {
    throw new Error(
      [
        `[ui-test-utils] No matches found for Element query... ${message}`,
        prettyDOM(element, 7000, { highlight: false })
      ]
        .filter(Boolean).join('\n\n')
    )
  } else {
    return []
  }
}

function validateSelector (selector = {}) {
  const VALID_SELECTORS = [ 'css', 'tag', 'text', 'contains', 'label', 'title', 'value', 'attribute']
  const valid = Object.keys(selector)
    .filter(key => !!selector[key] && VALID_SELECTORS.includes(key))
    .reduce((result, key) => { return { ...result, [key]: selector[key] } }, {})
  if (Object.keys(valid).length === 0) {
    return null
  } else {
    return valid
  }
}

export {
  bindResultsToUtilities,
  parseQueryArguments,
  querySelector,
  getQueryResult
}
