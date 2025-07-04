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
// TODO replace this with https://github.com/focus-trap/tabbable
// or even better use the native <dialog> component.
// tabbable has issues with scrollable containers, e.g.
// https://github.com/focus-trap/tabbable/issues/167
import { getComputedStyle, findDOMNode } from './'
import type { UIElement } from '@instructure/shared-types'

const focusableSelector = [
  'a[href]',
  'frame',
  'iframe',
  'object',
  'input:not([type=hidden])',
  'select',
  'textarea',
  'button',
  '*[tabindex]',
  '[contenteditable="true"]'
].join(',')

function hasQuerySelectorAll(el?: UIElement): el is Element | Document {
  if (
    !el ||
    typeof (el as Element | Document).querySelectorAll !== 'function'
  ) {
    return false
  }
  return true
}

/**
 * ---
 * category: utilities/a11y
 * ---
 *
 * Given an element, finds and returns all visible, focusable children.
 * Focusable elements include input, select, textarea, button, and object.
 * Anchor tags are also focusable if they include an href or
 * tabindex attribute (including tabindices less than zero).
 * @module findFocusable
 * @param { Node | Window | React.ReactElement | React.Component | function | null } el component or DOM node
 * @param { function } filter a function to filter the matching nodes
 * @param { boolean } shouldSearchRootNode should the root node be included in the search
 * @returns { Array } array of all tabbable children
 */
function findFocusable(
  el?: UIElement,
  filter?: (el: Element) => boolean,
  shouldSearchRootNode?: boolean
) {
  const element = el && findDOMNode(el)

  if (!hasQuerySelectorAll(element)) {
    return []
  }
  let matches = Array.from(element.querySelectorAll(focusableSelector))
  if (shouldSearchRootNode && (element as Element).matches(focusableSelector)) {
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
  return cs.display === 'none'
}

function positioned(element: Element | Node) {
  const POS = ['fixed', 'absolute']
  if (POS.includes((element as HTMLElement).style.position?.toLowerCase())) {
    return true
  }
  if (
    POS.includes(
      getComputedStyle(element).getPropertyValue('position')?.toLowerCase()
    )
  ) {
    return true
  }
  return false
}

function visible(element: Element) {
  let el: Element | Node | null = element

  while (el) {
    if (el === document.body) break
    if (el instanceof ShadowRoot) break
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
  findFocusable
}
