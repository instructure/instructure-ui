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
import ownerWindow from '@instructure/ui-utils/lib/dom/ownerWindow'
import getActiveElement from '@instructure/ui-utils/lib/dom/getActiveElement'
import addEventListener from '@instructure/ui-utils/lib/dom/addEventListener'
import ownerDocument from '@instructure/ui-utils/lib/dom/ownerDocument'
import containsActiveElement from '@instructure/ui-utils/lib/dom/containsActiveElement'
import warning from '@instructure/ui-utils/lib/warning'
import requestAnimationFrame from '@instructure/ui-utils/lib/dom/requestAnimationFrame'

import keycode from 'keycode'

import scopeTab from './scopeTab'
import findTabbable from './findTabbable'
import findFocusable from './findFocusable'

/**
 * ---
 * category: utilities/a11y
 * ---
 * @module KeyboardFocusRegion
 * Class for focus operations.
 * - Scoping focus within a given context (DOM node),
 * - Mark active element for focus later
 * - Return focus to the marked element
 */
export default class KeyboardFocusRegion {
  constructor (element, options) {
    this._contextElement = findDOMNode(element)
    this._options = options || {
      shouldCloseOnEscape: true,
      shouldContainFocus: true,
      shouldReturnFocus: true,
      onDismiss: (event) => {},
      defaultFocusElement: null
    }

    if (this._options.shouldReturnFocus) {
      this._focusLaterElement = getActiveElement(this.doc)
    }
  }

  _contextElement = null
  _focusLaterElement = null
  _needToFocus = false
  _listeners = []
  _raf = []
  _setup = false

  get focused () {
    return containsActiveElement(this._contextElement)
  }

  get shouldContainFocus () {
    const { shouldContainFocus } = this._options
    return (shouldContainFocus === true ||
      (Array.isArray(shouldContainFocus) && shouldContainFocus.includes['keyboard']))
  }

  get focusable () {
    return findFocusable(this._contextElement) || []
  }

  get tabbable () {
    return findTabbable(this._contextElement) || []
  }

  get firstTabbable () {
    return this.tabbable[0]
  }

  get lastTabbable () {
    return this.tabbable.pop()
  }

  get firstFocusable () {
    return this.focusable[0]
  }

  get lastFocusable () {
    return this.focusable.pop()
  }

  get doc () {
    return ownerDocument(this._contextElement)
  }

  get win () {
    return ownerWindow(this._contextElement)
  }

  focus () {
    if (this.focused) {
      return
    }

    let element = this._options.defaultFocusElement

    if (typeof element === 'function') {
      element = element()
    }

    if (element) {
      element = findDOMNode(element)
    }

    if (!element) {
      element = this.firstTabbable || this.firstFocusable || this._contextElement
    }

    this._raf.push(
      requestAnimationFrame(() => {
        try {
          element && element.focus()
        } catch (e) {
          warning(
            false,
            '[KeyboardFocusRegion] A focusable element is required in order to set focus to a FocusRegion.'
          )
          ownerDocument(this._contextElement).activeElement.blur()
        }
      })
    )
  }

  blur () {
    if (this._options.shouldReturnFocus && this._focusLaterElement) {
      try {
        this._focusLaterElement.focus()
      } catch (e) {
        warning(
          false,
          `
          You tried to return focus to ${this._focusLaterElement}
          but it is not in the DOM anymore: ${e}
          `
        )
      }
      this._focusLaterElement = null
    }
  }

  handleDismiss = (event) => {
    this._options.onDismiss(event)
  }

  handleKeyUp = event => {
    if (this._options.shouldCloseOnEscape && event.keyCode === keycode.codes.escape &&
        !event.defaultPrevented) {
      this.handleDismiss(event)
    }
  }

  handleKeyDown = event => {
    if (this.shouldContainFocus && event.keyCode === keycode.codes.tab) {
      scopeTab(this._contextElement, event)
    }
  }

  handleBlur = event => {
    this._needToFocus = true
  }

  handleFocus = event => {
    if (this._needToFocus) {
      this._needToFocus = false

      if (!this._contextElement) {
        return
      }

      // need to see how jQuery shims document.on('focusin') so we don't need the
      // setTimeout, firefox doesn't support focusin, if it did, we could focus
      // the element outside of a setTimeout. Side-effect of this implementation
      // is that the document.body gets focus, and then we focus our element right
      // after, seems fine.
      this._raf.push(
        requestAnimationFrame(() => {
          if (containsActiveElement(this._contextElement)) {
            return
          }

          this.firstTabbable && this.firstTabbable.focus()
        })
      )
    }
  }

  setup () {
    if (!this._setup) {
      if (this._options.shouldCloseOnEscape) {
        this._listeners.push(addEventListener(this.doc, 'keyup', this.handleKeyUp))
      }

      if (this._options.shouldContainFocus) {
        this._listeners.push(addEventListener(this.doc, 'keydown', this.handleKeyDown))

        this._listeners.push(addEventListener(this.win, 'blur', this.handleBlur, false))
        this._listeners.push(addEventListener(this.doc, 'focus', this.handleFocus, true))
      }

      this._setup = true
    }
  }

  teardown () {
    if (this._setup) {
      this._listeners.forEach(listener => {
        listener.remove()
      })
      this._listeners = []

      this._raf.forEach(request => request.cancel())
      this._raf = []

      this._preventCloseOnDocumentClick = false

      this._setup = false
    }
  }
}
