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
  return findAllByQuery(querySelectorAll, ...args)
}

async function findParent (...args) {
  return firstOrNull(await findAllByQuery(querySelectorParent, ...args))
}

function findParents (...args) {
  return findAllByQuery(querySelectorParents, ...args)
}

async function findFrame (...args) {
  return firstOrNull(await findAllFrames(...args))
}

function findAllFrames (...args) {
  return findAllByQuery(iframeQuery, ...args)
}

function findAllByQuery (query, ...args) {
  const { element, selector, options } = parseQueryArguments(...args)

  return getQueryResult(
    element,
    query.bind(null, element, selector, options),
    options,
    `with selector: "${selector}"`
  )
}

async function findByQuery (...args) {
  return firstOrNull(await findAllByQuery(...args))
}

function iframeQuery (...args) {
  const { element, selector, options } = parseQueryArguments(...args)

  return querySelectorAll(element, 'iframe')
    .filter(frame => matchesSelector(frame, selector, options))
    .map(frame => frame.contentWindow.document.documentElement)
}

async function getQueryResult (
  element = document,
  query,
  options = {
    expectEmpty: false,
    timeout: 1900
  },
  message = ''
) {
  const { expectEmpty, timeout, customMethods } = options

  const queryResult = () => {
    const results = query()

    if (Array.isArray(results)) {
      return results.map(result => bindElementToUtilities(result, customMethods))
    } else if (results instanceof Element) {
      return [bindElementToUtilities(results, customMethods)]
    } else {
      return []
    }
  }

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
        `[ui-test-utils] No matches found for element query...`,
        `element: ${elementToString(element, 7000, { highlight: false })}`,
        message
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
