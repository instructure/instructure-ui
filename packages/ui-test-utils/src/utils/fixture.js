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

import { TESTABLE_ATTRIBUTE } from '@instructure/ui-testable'

import { findAllByQuery } from './queries'
import {
  querySelectorAll,
  bindResultsToUtilities,
  parseQueryArguments
} from './query-helpers'
import { firstOrNull } from './firstOrNull'

function fixture (componentId, customMethods = {}) {
  return class Fixture {
    static customMethods = customMethods
    static locator = `[${TESTABLE_ATTRIBUTE}="${componentId}"]`

    static async findAll (...args) {
      const { element, selector, options } = parseQueryArguments(...args)
      return findAllByQuery(Fixture.query, element, selector, {
        ...options,
        customMethods: {
          ...Fixture.customMethods,
          ...options.customMethods
        }
      })
    }

    static async find (...args) {
      return firstOrNull(await Fixture.findAll(...args))
    }

    static query (element, selector, options) {
      // find all of the components that match the locator...
      const components = querySelectorAll(element, { locator: Fixture.locator }, options)
      if (selector) {
        // if there is a selector, query each component for matches...
        return components.reduce((previouResults, element) => {
          const results = bindResultsToUtilities(
            querySelectorAll(element, selector, options),
            { ...Fixture.customMethods, ...options.customMethods, getComponentRoot: () => element }
          )
          return [ ...previouResults, ...results]
        }, [])
      } else {
        // otherwise just return the components
        return components
      }
    }
  }
}

export default fixture
