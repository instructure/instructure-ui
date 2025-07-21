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

/**
 * Return the ref of an element in a way that is compatible both with
 * React 18 (element.ref) and React 19+ (element.props.ref)
 */
function getElementRef(elem: { ref?: any; props?: { ref: any } }) {
  return elem.props && elem.props.ref !== undefined ? elem.props.ref : elem.ref
}

/**
 * ---
 * category: utilities/DOM
 * ---
 *
 * Wrapper function for React.findDOMNode
 * @module findDOMNode
 *
 * @param { Node | Window | React.ReactElement | React.Component | function } el - component, DOM node, or function returning a DOM node
 * @returns { Node | Window | null | undefined } The root node of this element
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
    let refElement = undefined
    if (ref) {
      refElement = ref.current ? ref.current : ref
    }
    if (refElement) {
      if (!(refElement instanceof HTMLElement)) {
        return findDOMNode(refElement)
      }
      return refElement
    } else {
      const elName = (node as any).constructor.componentId
        ? (node as any).constructor.componentId
        : (node as any).constructor.name

      console.error(
        `Error: ${elName} doesn't have "ref" property.\nReactDOM.findDOMNode is removed in React 19, consider using refs instead. From InstUI v9, components must have the "ref" property for findDOMNode to work.\nSee more here: https://instructure.design/#accessing-the-dom`
      )

      return undefined
    }
  }
  return undefined
}

export default findDOMNode
export { findDOMNode }
