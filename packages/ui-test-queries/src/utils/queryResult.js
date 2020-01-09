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

import { parseQueryArguments } from './parseQueryArguments'
import { waitForQueryResult } from './waitForQueryResult'
import { elementToString } from './elementToString'
import { bindElementToUtilities } from './bindElementToUtilities'

async function _getQueryResult(
  element = document,
  queryFn,
  options = {
    expectEmpty: false,
    timeout: 1900
  },
  wrapFn
) {
  const { expectEmpty, timeout, customMethods } = options

  if (typeof queryFn !== 'function') {
    throw new Error(
      '[ui-test-queries] Invalid element query function.',
      JSON.stringify(queryFn)
    )
  }

  const queryResult = () => {
    const { results, selector } = queryFn()
    return {
      results: (typeof wrapFn === 'function') ? wrapFn(results, customMethods) : results,
      selector
    }
  }

  const { results, selector } = (timeout > 0) ? (await waitForQueryResult(
    queryResult,
    { timeout, expectEmpty, element }
  )) : queryResult()

  if (results && results.length > 0) {
    return results
  } else if (!expectEmpty) {
    throw new Error(
      [
        `[ui-test-queries] No matches found for Element query...`,
        `with selector: "${selector}"`,
        `element: ${elementToString(element, 7000, { highlight: false })}`
      ]
        .join('\n')
    )
  } else {
    return []
  }
}

function wrapQueryResult(...args) {
  return bindElementToUtilities(...args)
}

function getQueryResult(selectorFn, ...args) {
  const { element, selector, options } = parseQueryArguments(...args)
  if (typeof selectorFn !== 'function') {
    throw new Error(
      '[ui-test-queries] Invalid element query function.',
      JSON.stringify(selectorFn)
    )
  }
  const query = (element, selector, options) => {
    const selectorBase = selectorFn.displayName || selectorFn.name

    return {
      results: selectorFn(element, selector, options),
      selector: selector ? `${selectorBase} ${selector}` : selectorBase
    }
  }
  return _getQueryResult(
    element,
    query.bind(null, element, selector, options),
    options,
    wrapQueryResult
  )
}

export { getQueryResult, wrapQueryResult }
