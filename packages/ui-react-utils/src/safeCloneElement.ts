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

import React, {
  Attributes,
  FunctionComponentElement,
  ComponentElement,
  ReactElement,
  ReactNode,
  DOMElement
} from 'react'

import { logWarn as warn } from '@instructure/console'
import { createChainedFunction } from '@instructure/ui-utils'

type GetProps<E extends ReactElement = ReactElement> = E extends
  | FunctionComponentElement<infer P>
  | ComponentElement<infer P, any>
  | DOMElement<infer P, any>
  ? P & { ref?: E['ref'] }
  : Record<string, any> & { ref?: any }

/**
 * ---
 * category: utilities/react
 * ---
 * Clones a React element without overwriting refs.
 * @param element The element to clone
 * @param props Props of the element
 * @param children
 */
function safeCloneElement<
  E extends ReactElement = ReactElement,
  P extends GetProps<E> = GetProps<E>
>(
  element: { ref?: any } & E,
  props: { style?: any } & Attributes & P,
  ...children: ReactNode[]
) {
  const cloneRef = props.ref
  const originalRef = element.ref
  const originalRefIsAFunction = typeof originalRef === 'function'
  const cloneRefIsFunction = typeof cloneRef === 'function'

  const mergedProps = { ...props }

  if (element.props.style && props.style) {
    // merge with existing styles
    mergedProps.style = { ...element.props.style, ...props.style }
  }

  // prevent overriding existing keys
  mergedProps.key = element.key || props.key

  // Add chained function to preserve existing event handlers
  Object.keys(props).forEach((prop) => {
    // If prop looks like an event handler "on*" and either
    // props[props] or element.props[prop] is a function create a chained function.
    // If only one is a function it will just use that function with no extra overhead.
    // This is necessary in cases where props[prop] is `null` or `undefined` which would
    // otherwise unwantedly override element.props[prop].
    if (
      prop.indexOf('on') === 0 &&
      (typeof props[prop] === 'function' ||
        typeof element.props[prop] === 'function')
    ) {
      ;(mergedProps as Record<string, any>)[prop] = createChainedFunction(
        element.props[prop],
        props[prop]
      )
    }
  })

  if (originalRef == null || cloneRef == null) {
    return React.cloneElement<P>(element, mergedProps, ...children) as E
  }

  warn(
    originalRefIsAFunction,
    `Cloning an element with a ref that will be overwritten because the ref \
is not a function. Use a composable callback-style ref instead. \
Ignoring ref: ${originalRef}`
  )

  return React.cloneElement<P>(
    element,
    {
      ...mergedProps,
      ref(component: E) {
        if (cloneRefIsFunction) {
          ;(cloneRef as (instance: any) => void)(component)
        } else {
          cloneRef.current = component
        }
        originalRef(component)
      }
    },
    ...children
  ) as E
}

export default safeCloneElement
export { safeCloneElement }
