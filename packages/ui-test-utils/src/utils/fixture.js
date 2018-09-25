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

import { findAll, parseQueryArguments } from './queries'
import { firstOrNull } from './firstOrNull'

export const FIXTURE_ATTRIBUTE = 'data-ui-testable'

function fixture (componentId, customMethods = {}) {
  return class Fixture {
    static customMethods = customMethods
    static locator = `[${FIXTURE_ATTRIBUTE}="${componentId}"]`

    static async findAll (...args) {
      const { element, selector, options } = parseQueryArguments(...args)
      const { expectEmpty, ...rest } = options

      const opts = {
        ...rest,
        // if there is a selector, we should expect that there is at least one component rendered
        expectEmpty: selector ? false : expectEmpty,
        customMethods: {
          ...customMethods,
          ...options.customMethods
        }
      }

      // Find all component root elements first...
      const components = await findAll(element, { css: Fixture.locator }, opts)

      if (selector) {
        // then find within each of them, building a single array of matching elements...
        return components.reduce(async (query, component) => {
          const previousResults = await query
          const currentResult = await component.findAll(
            selector,
            {
              ...opts,
              expectEmpty, // here we pass along whatever we get in options
              customMethods: {
                ...opts.customMethods,
                getComponentRoot: function getComponentRoot (element) {
                  return component
                }
              }
            }
          )
          return [...previousResults, ...currentResult]
        }, Promise.resolve([]))
      } else {
        return components
      }
    }

    static async find (...args) {
      return firstOrNull(await Fixture.findAll(...args))
    }
  }
}

export default fixture
