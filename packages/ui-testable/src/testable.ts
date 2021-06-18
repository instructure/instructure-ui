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

import { ComponentState, ComponentClass } from 'react'
import { findDOMNode } from 'react-dom'

import { decorator } from '@instructure/ui-decorator'

// TODO: Components that render as non-native Portals have a DOMNode property. (Portal, ReactPortal, SubtreePortal, DrawerTray, Modal, Overlay, Tray). Make this a common interface that all of them implements.
interface ComponentWithDOMNode {
  DOMNode?: HTMLSpanElement | null
}

const testable =
  process.env.NODE_ENV === 'production' &&
  // If you would like to the `data-cid` attributes on elements even in your
  // production builds (like if you are using them in your e2e builds or
  // something), you need to set the environment variable
  // ALWAYS_APPEND_UI_TESTABLE_LOCATORS=1
  // We do this because adding those `data-cid` locators slows things down.
  !process.env.ALWAYS_APPEND_UI_TESTABLE_LOCATORS
    ? () => (Component: ComponentClass<any>) => Component
    : decorator((ComposedComponent: ComponentClass<any>) => {
        const displayName =
          ComposedComponent.displayName || ComposedComponent.name
        const locator = {
          attribute: 'data-cid',
          value: displayName
        }
        const selector = `[${locator.attribute}~="${locator.value}"]`
        class TestableComponent<
          P = Record<string, unknown>,
          S = ComponentState
        > extends ComposedComponent {
          static selector = selector
          private _testableUnmounted: boolean | undefined
          _locatorTimeout: ReturnType<typeof setTimeout> | undefined
          componentDidMount() {
            if (super.componentDidMount) {
              super.componentDidMount()
            }
            this.appendLocatorAttribute()
          }
          componentDidUpdate?(
            prevProps: Readonly<P>,
            prevState: Readonly<S>,
            snapshot?: any
          ) {
            if (super.componentDidUpdate) {
              super.componentDidUpdate(prevProps, prevState, snapshot)
            }
            this.appendLocatorAttribute()
          }
          componentWillUnmount() {
            this._testableUnmounted = true
            if (super.componentWillUnmount) {
              super.componentWillUnmount()
            }
            if (this._locatorTimeout) {
              clearTimeout(this._locatorTimeout)
            }
          }
          appendLocatorAttribute() {
            this._locatorTimeout = setTimeout(() => {
              let node: HTMLSpanElement | Element | Text | null = null
              if (this._testableUnmounted) {
                return
              }
              try {
                // Use this.DOMNode for components that render as non-native Portals...
                node =
                  (this as ComponentWithDOMNode).DOMNode || findDOMNode(this)
              } catch (e) {
                console.warn(
                  `[ui-testable] Could not append locator attribute: ${e}`
                )
              }
              if (node) {
                const attribute = (node as Element).getAttribute(
                  locator.attribute
                )
                const values =
                  typeof attribute === 'string' ? attribute.split(/\s+/) : []
                if (!values.includes(locator.value)) {
                  values.push(locator.value)
                }
                ;(node as Element).setAttribute(
                  locator.attribute,
                  values.join(' ')
                )
              }
            })
          }
        }
        return TestableComponent
      })

export default testable
export { testable }
