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

export const TESTABLE_ATTRIBUTE = 'data-ui-testable'

function testable () {
  return function (ComposedComponent) {
    const displayName = ComposedComponent.displayName || ComposedComponent.name
    class TestableComponent extends ComposedComponent {
      static displayName = displayName
    }
    if (process.env.NODE_ENV !== 'production') {
      TestableComponent.prototype.componentDidMount = function componentDidMount () {
        if (ComposedComponent.prototype.componentDidMount) {
          ComposedComponent.prototype.componentDidMount.call(this)
        }
        // Use this._portalContentNode for components that render as non-native Portals...
        const rootNode = findDOMNode(this) || this._portalContentNode

        if (rootNode) {
          rootNode.setAttribute(TESTABLE_ATTRIBUTE, displayName)
        }
      }
    }
    return TestableComponent
  }
}

export default testable
