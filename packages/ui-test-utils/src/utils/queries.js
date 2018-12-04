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

import { elementToString } from './elementToString'
import { firstOrNull } from './firstOrNull'
import { parseQueryArguments } from './parseQueryArguments'
import { waitForQueryResult } from './waitForQueryResult'
import { bindElementToUtilities } from './bindElementToUtilities'
import {
  querySelectorAll,
  matchesSelector,
  querySelectorParent,
  querySelectorParents
} from './selector'

async function find (...args) {
  return firstOrNull(await findAll(...args))
}

function findAll (...args) {
  return findAllByQuery((element, selector, options) => {
    return {
      results: querySelectorAll(element, selector, options),
      selector
    }
  }, ...args)
}

async function findParent (...args) {
  return firstOrNull(
    await findAllByQuery((element, selector, options) => {
      return {
        results: querySelectorParent(element, selector, options),
        selector: `parent: ${selector}`
      }
    }, ...args)
  )
}

function findParents (...args) {
  return findAllByQuery((element, selector, options) => {
    return {
      results: querySelectorParents(element, selector, options),
      selector: `parents: ${selector}`
    }
  }, ...args)
}

async function findFrame (...args) {
  return firstOrNull(await findAllFrames(...args))
}

function findAllFrames (...args) {
  return findAllByQuery((element, selector, options ) => {
    const results = querySelectorAll(element, 'iframe')
      .filter(frame => matchesSelector(frame, selector, options))
      .map(frame => frame.contentWindow.document.documentElement)

    return {
      results,
      selector: `iframe ${selector}`
    }
  }, ...args)
}

function findAllByQuery (query, ...args) {
  const { element, selector, options } = parseQueryArguments(...args)

  return getQueryResult(
    element,
    query.bind(null, element, selector, options),
    options
  )
}

async function findByQuery (...args) {
  return firstOrNull(await findAllByQuery(...args))
}

async function getQueryResult (
  element = document,
  query,
  options = {
    expectEmpty: false,
    timeout: 1900
  }
) {
  const { expectEmpty, timeout, customMethods } = options

  const queryResult = () => {
    const { results, selector } = query()

    let boundResults = []

    if (Array.isArray(results)) {
      boundResults = results.map(result => bindElementToUtilities(result, customMethods))
    } else if (results instanceof Element) {
      boundResults = [bindElementToUtilities(results, customMethods)]
    }

    return {
      results: boundResults,
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
        `[ui-test-utils] No matches found for Element query...`,
        `with selector: "${selector}"`,
        `element: ${elementToString(element, 7000, { highlight: false })}`
      ]
      .join('\n')
    )
  } else {
    return []
  }
}

export {
  findAllByQuery,
  findByQuery,
  findAll,
  find,
  findAllFrames,
  findFrame,
  findParent,
  findParents
}
