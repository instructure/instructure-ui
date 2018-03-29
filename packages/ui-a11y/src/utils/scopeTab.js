
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

import findDOMNode from '@instructure/ui-utils/lib/dom/findDOMNode'
import isActiveElement from '@instructure/ui-utils/lib/dom/isActiveElement'
import containsActiveElement from '@instructure/ui-utils/lib/dom/containsActiveElement'
import getActiveElement from '@instructure/ui-utils/lib/dom/getActiveElement'

import findTabbable from './findTabbable'

/**
 * ---
 * category: utilities/DOM
 * ---
 *
 * Scope tab in order to trap focus within a specified
 * element.
 *
 * @param {ReactElement|DOMNode} element
 * @param {Event} event the DOM Event that was fired
 */
export default function scopeTab (element, event) {
  const node = findDOMNode(element)
  const tabbable = findTabbable(node)

  if (!tabbable.length) {
    event.preventDefault()
    return
  }

  // Account for a changing tabindex of the active element
  // (a case that happens with Menu for KO a11y)
  if (containsActiveElement(element)) {
    const activeElement = getActiveElement()
    if (tabbable.indexOf(activeElement) === -1) {
      tabbable.push(activeElement)
    }
  }

  const finalTabbable = tabbable[event.shiftKey ? 0 : tabbable.length - 1]
  const leavingFinalTabbable = (
    isActiveElement(finalTabbable) ||
    // handle immediate shift+tab after opening with mouse
    isActiveElement(node)
  )

  if (!leavingFinalTabbable) return

  event.preventDefault()
  const target = tabbable[event.shiftKey ? tabbable.length - 1 : 0]
  target.focus()
}
