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

import { findAllByQuery } from './queries'
import { querySelectorAll, parseQueryArguments } from './query-helpers'
import { matchElementByLocator } from './matchers'
import { firstOrNull } from './firstOrNull'

export default (locatorAttribute, customMethods = {}) => {
  return class Locator {
    static customMethods = customMethods
    static locator = locatorAttribute

    static findAll (...args) {
      const { element, selector, options } = parseQueryArguments(...args)
      return findAllByQuery(Locator.queryAll, element, selector, {
        ...options,
        customMethods: {
          ...Locator.customMethods,
          ...options.customMethods
        }
      })
    }

    static async find (...args) {
      return firstOrNull(await Locator.findAll(...args))
    }

    static queryAll (element, selector, options) {
      // find all of the component root nodes that match the locator...
      const components = querySelectorAll(element, { locator: Locator.locator }, options)
      if (selector) {
        // if there is a selector, query each component for matches...
        return components.reduce((previouResults, element) => {
          let results = querySelectorAll(element, selector, options)
          results = results
            .map((result) => {
              const root = findClosestComponentRoot(result, Locator.locator)
              // ignore matches that are in a nested component...
              return (root !== element) ? null : root
            })
            .filter(result => result !== null)
          return [ ...previouResults, ...results]
        }, [])
      } else {
        // otherwise just return the component root nodes
        return components
      }
    }

    static query (...args) {
      return firstOrNull(Locator.queryAll(...args))
    }
  }
}

function findClosestComponentRoot (element, locator) {
  if (matchElementByLocator(element, locator)) {
    return element
  } else {
    let parent = element.parentNode

    while (parent && !matchElementByLocator(parent, locator) && parent !== document) {
      parent = parent.parentNode
    }

    return (parent && matchElementByLocator(parent, locator)) ? parent : null
  }
}
