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
import findDOMNode from '../dom/findDOMNode'
import ownerDocument from '../dom/ownerDocument'
import ownerWindow from '../dom/ownerWindow'
import getActiveElement from '../dom/getActiveElement'
import addEventListener from '../dom/addEventListener'
import containsActiveElement from '../dom/containsActiveElement'

import { changedPackageWarning } from '../react/deprecated'
import warning from '../warning'

import findTabbable from './findTabbable'

/**
 * ---
 * category: utilities/DOM
 * ---
 * @module FocusManager
 * Class for focus operations.
 * - Scoping focus within a given context,
 * - Mark active element for focus later
 * - Return focus to the marked element
 */
class FocusManager {
  constructor () {
    warning(false, '[%s] was deprecated in version %s. %s', 'focusManager', '5.0.0', changedPackageWarning(
      'ui-utils',
      'ui-a11y',
      'Use `FocusManager.focusRegion` to create a new focus region.'
    ) || '')
  }

  contextElement = null
  focusLaterElement = null
  needToFocus = false
  listeners = []
  timeouts = []

  handleBlur = event => {
    this.needToFocus = true
  }

  handleFocus = event => {
    if (this.needToFocus) {
      this.needToFocus = false

      if (!this.contextElement) {
        return
      }

      // need to see how jQuery shims document.on('focusin') so we don't need the
      // setTimeout, firefox doesn't support focusin, if it did, we could focus
      // the element outside of a setTimeout. Side-effect of this implementation
      // is that the document.body gets focus, and then we focus our element right
      // after, seems fine.
      this.timeouts.push(
        setTimeout(() => {
          if (containsActiveElement(this.contextElement)) {
            return
          }

          const el = findTabbable(this.contextElement)[0]

          el.focus()
        }, 0)
      )
    }
  }

  markForFocusLater () {
    this.focusLaterElement = getActiveElement(ownerDocument(this.contextElement))
  }

  returnFocus () {
    try {
      this.focusLaterElement.focus()
    } catch (e) {
      warning(
        false,
        `
        You tried to return focus to ${this.focusLaterElement}
        but it is not in the DOM anymore: ${e}
        `
      )
    }
    this.focusLaterElement = null
  }

  setupScopedFocus (el) {
    if (this.contextElement) {
      warning(
        false,
        `
        Focus is already scoped to ${this.contextElement}.
        `
      )
      return
    }
    this.contextElement = findDOMNode(el)

    this.listeners.push(addEventListener(ownerWindow(this.contextElement), 'blur', this.handleBlur, false))
    this.listeners.push(addEventListener(ownerDocument(this.contextElement), 'focus', this.handleFocus, true))
  }

  teardownScopedFocus () {
    this.listeners.forEach(listener => {
      listener.remove()
    })
    this.listeners = []

    this.timeouts.forEach(timeout => {
      clearTimeout(timeout)
    })
    this.timeouts = []
    this.contextElement = null
  }
}

export default new FocusManager()
