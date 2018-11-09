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

function testable () {
  return function (ComposedComponent) {
    const displayName = ComposedComponent.displayName || ComposedComponent.name
    const locator = {
      attribute: 'data-ui-testable',
      value: displayName
    }

    class TestableComponent extends ComposedComponent {
      static displayName = displayName
      static locator = locator

      componentDidMount (...args) {
        if (super.componentDidMount) {
          super.componentDidMount(...args)
        }
        this.appendLocatorAttribute(findDOMNode(this) || this.DOMNode)
      }

      componentDidUpdate (...args) {
        if (super.componentDidUpdate) {
          super.componentDidUpdate(...args)
        }
        this.appendLocatorAttribute(findDOMNode(this) || this.DOMNode)
      }

      componentWillUnmount (...args) {
        if (super.componentWillUnmount) {
          super.componentWillUnmount(...args)
        }
        clearTimeout(this.locatorTimeout)
      }

      appendLocatorAttribute (node) {
        this.locatorTimeout = setTimeout(() => {
          try {
            // Use this.DOMNode for components that render as non-native Portals...
            if (node && node.getAttribute) {
              const attribute = node.getAttribute(locator.attribute)
              const values = typeof attribute === 'string' ? attribute.split(',') : []

              if (!values.includes(locator.value)) {
                values.push(locator.value)
              }

              node.setAttribute(locator.attribute, values.join(','))
            }
          } catch (e) {
            console.warn(`[ui-testable] Could not append locator attribute: ${e}`)
          }
        }, 0)
      }
    }

    return TestableComponent
  }
}

export default testable
