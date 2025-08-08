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

import type { UIElement } from '@instructure/shared-types'
import ReactDOM from 'react-dom'

/**
 * Return the ref of an element in a way that is compatible both with
 * React 18 (element.ref) and React 19+ (element.props.ref)
 */
function getElementRef(elem: { ref?: any; props?: { ref: any } }) {
  if (elem?.props?.ref !== undefined) {
    return elem.props.ref
  }
  return elem.ref
}

/**
 * ---
 * category: utilities/DOM
 * ---
 *
 * Returns the underlying DOM node. It looks the following places:
 * - If it's a native HTML element e.g. `HtmlSpanElement` its returned as is.
 * - If the element has a non-nullish `ref` prop or instance variable which is a
 *   `HTMLElement` its returned. If it`s something else then `findDOMNode` is called
 *   on the object. (it also checks `ref.current`)
 * - If the element has a `ref` prop or instance variable whose value is `null`,
 *   `undefined` is returned.
 * - If the element does not have a `ref` prop or instance variable `undefined`
 *   is returned with a warning
 * @module findDOMNode
 *
 * @param el - component, DOM node, or function returning a DOM node
 * @returns The native DOM node of this element or `undefined`
 */
function findDOMNode(el?: UIElement): Element | Node | Window | undefined {
  const node = typeof el === 'function' ? el() : el

  if (node && node === document) {
    return document.documentElement // HTMLElement
  } else if (
    node instanceof Element ||
    node === window ||
    (node && typeof (node as Node).nodeType !== 'undefined')
  ) {
    return node as Node | Window
  } else if (node) {
    const ref = getElementRef(node as object)
    const refElement = ref?.current ? ref.current : ref
    if (refElement) {
      if (!(refElement instanceof HTMLElement)) {
        return findDOMNode(refElement)
      }
      return refElement
    } else if (refElement === null) {
      // weird, but changing it would be a breaking change
      return undefined
    }
    const elName = (node as any).constructor.componentId
      ? (node as any).constructor.componentId
      : (node as any).constructor.name
    console.error(
      `Error: ${elName} doesn't have "ref" property.\n
      your code will likely not work with React 19+, because ReactDOM.findDOMNode() was removed.\n
      See more here: https://instructure.design/#accessing-the-dom`
    )
    // TODO remove when we only support React 19 or greater
    const ReactDomInstance = ReactDOM as {
      findDOMNode?: (arg: unknown) => Element
    }
    if (typeof ReactDomInstance.findDOMNode === 'function') {
      return ReactDomInstance.findDOMNode(node)
    }
    return undefined
  }
  return undefined
}

export default findDOMNode
export { findDOMNode }
