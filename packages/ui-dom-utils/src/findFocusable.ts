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

/**
 * Adapted from jQuery UI core
 *
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 **/

import { getComputedStyle, findDOMNode, elementMatches } from './'
import React from 'react'

function findFocusable(
  el?:
    | Node
    | Window
    | React.ReactElement
    | React.Component
    | ((...args: any[]) => any)
    | null,
  filter?: (el: Element) => boolean,
  shouldSearchRootNode?: boolean
) {
  const element = el && findDOMNode(el)

  if (
    !element ||
    typeof (element as Element | Document).querySelectorAll !== 'function'
  ) {
    return []
  }

  const focusableSelector =
    'a[href],frame,iframe,object,input:not([type=hidden]),select,textarea,button,*[tabindex]'

  let matches = Array.from(
    (element as Element | Document).querySelectorAll(focusableSelector)
  )

  if (shouldSearchRootNode && elementMatches(element, focusableSelector)) {
    matches = [...matches, element as Element]
  }

  return matches.filter((el: Element) => {
    if (typeof filter === 'function') {
      return filter(el) && focusable(el)
    } else {
      return focusable(el)
    }
  })
}

function hidden(element: Element | Node) {
  const cs = getComputedStyle(element)
  return (
    (cs.display !== 'inline' &&
      (element as HTMLElement).offsetWidth <= 0 &&
      (element as HTMLElement).offsetHeight <= 0) ||
    cs.display === 'none'
  )
}

function positioned(element: Element | Node) {
  const POS = ['fixed', 'absolute']
  if (POS.includes((element as HTMLElement).style.position.toLowerCase()))
    return true
  if (
    POS.includes(
      (getComputedStyle(element) as CSSStyleDeclaration)
        .getPropertyValue('position')
        .toLowerCase()
    )
  )
    return true
  return false
}

function visible(element: Element) {
  let el: Element | Node | null = element

  while (el) {
    if (el === document.body) break
    if (hidden(el)) return false
    if (positioned(el)) break
    el = el.parentNode
  }
  return true
}

function focusable(element: Element & { disabled?: boolean }) {
  return !element.disabled && visible(element)
}

export default findFocusable
export {
  /**
   * ---
   * category: utilities/a11y
   * ---
   *
   * Given an element, finds and returns all visible, focusable children.
   * Focusable elements include input, select, textarea, button, and object.
   * Anchor tags are also focusable if they include an href or
   * tabindex attribute (including tabindeces less than zero).
   * @module findFocusable
   * @param { Node | Window | React.ReactElement | React.Component | function | null } el - component or DOM node
   * @param { function } filter - a function to filter the matching nodes
   * @param { boolean } shouldSearchRootNode - should the root node be included in the search
   * @returns { Array } array of all tabbable children
   */
  findFocusable
}
