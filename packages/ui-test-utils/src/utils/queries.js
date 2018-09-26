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
import { bindElementToUtilities } from './bindElementToUtilities'
import { firstOrNull } from './firstOrNull'

import {
  filterByAttribute,
  filterBySelector,
} from './filters'

import {
  bindResultsToUtilities,
  parseQueryArguments,
  querySelector,
  getQueryResult
} from './query-helpers'

async function find (...args) {
  return firstOrNull(await findAll(...args))
}

async function findAll (...args) {
  const { element, locator, selector, options } = parseQueryArguments(...args)
  const query = () => {
    if (locator) {
      // find all of the components that match the locator...
      const components = filterBySelector(element, null, locator, options)
      if (selector) {
        // if there is a selector, query each component for matches...
        return components.reduce((previouResult, element) => {
          const currentResult = bindResultsToUtilities(
            querySelector(element, selector, options),
            {
              ...options.customMethods,
              getComponentRoot: () => {
                return bindElementToUtilities(element, options.customMethods)
              }
            }
          )
          return [ ...previouResult, ...currentResult]
        }, [])
      } else {
        // otherwise just return the components
        return bindResultsToUtilities(components)
      }
    } else if (selector) {
      return bindResultsToUtilities(querySelector(element, selector, options))
    } else {
      return []
    }
  }
  return getQueryResult(
    element,
    query,
    options,
    JSON.stringify({ locator, selector })
  )
}

async function findFrame (...args) {
  return firstOrNull(await findAllFrames(...args))
}

async function findAllFrames (...args) {
  const { element, selector, options } = parseQueryArguments(...args)
  const query = () => {
    let results = filterBySelector(element, null, 'iframe', options)
    results = filterByAttribute(results, 'title', selector.title, options)
      .map(frame => frame.contentWindow.document.documentElement)
    return bindResultsToUtilities(results, options.customMethods)
  }
  return getQueryResult(element, query, options, JSON.stringify(selector))
}

export {
  findAll,
  find,
  findAllFrames,
  findFrame
}
