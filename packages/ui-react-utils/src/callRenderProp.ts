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
  ClassicComponent,
  ClassicComponentClass,
  ClassType,
  ComponentClass,
  ComponentState,
  FunctionComponent,
  ReactHTML,
  ReactNode,
  ReactSVG
} from 'react'

/**
 * ---
 * category: utilities/react
 * ---
 * Evaluate a provided value to create a renderable React element.
 * @module callRenderProp
 * @param value
 * @param props
 */
function callRenderProp<P>(
  value:
    | keyof ReactHTML
    | keyof ReactSVG
    | FunctionComponent<P>
    | ClassType<
        P,
        ClassicComponent<P, ComponentState>,
        ClassicComponentClass<P>
      >
    | ComponentClass<P>
    | ReactNode
    | (() => ReactNode),
  props: P = {} as P
) {
  if (typeof value === 'function') {
    // In react 16, `createElement` accepts a function. In react 15 we get an
    // error on rendering the result. Evaluate the function here if it is not a
    // react component.
    // fat arrow functions don't have a prototype
    if (!(value.prototype && value.prototype.isReactComponent)) {
      return (value as any)(props)
    }
    // TODO type 'value' properly
    return React.createElement<P>(value as any, props)
  }
  return value
}

export default callRenderProp
export { callRenderProp }
