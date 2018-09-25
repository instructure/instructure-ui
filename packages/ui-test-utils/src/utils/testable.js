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

import { findDOMNode } from 'react-dom'
import { findAll, parseQueryArguments } from './queries'

const ATTRIBUTE_NAME = 'data-ui-testable'

function testable (customMethods = {}) {
  return function (ComposedComponent) {
    const componentId = ComposedComponent.displayName || ComposedComponent.name

    class TestableComponent extends ComposedComponent {
      static displayName = componentId
      static customMethods = customMethods
      static locator = `[${ATTRIBUTE_NAME}="${componentId}"]`

      static async findAll (...args) {
        const { element, selector, options } = parseQueryArguments(...args)
        const opts = {
          ...options,
          customMethods: {
            ...customMethods,
            ...options.customMethods
          }
        }

        // Find all component root elements first...
        const components = await findAll(element, { css: TestableComponent.locator }, opts)

        if (selector) {
          // then find within each of them, building a single array of matching elements...
          return components.reduce(async (query, component) => {
            const previousResults = await query
            const currentResult = await component.findAll(
              selector,
              {
                ...opts,
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
        const result = await TestableComponent.findAll(...args)
        return (Array.isArray(result)) ? result[0] || null : null
      }

      componentDidMount () {
        if (super.componentDidMount) {
          super.componentDidMount()
        }

        // use this._DOMNode for non-native Portals...
        const node = findDOMNode(this) || this._DOMNode

        if (node) {
          node.setAttribute(ATTRIBUTE_NAME, componentId)
        }
      }
    }

    return TestableComponent
  }
}

export default testable
