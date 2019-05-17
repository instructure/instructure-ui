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

import {
  findDOMNode,
  ownerWindow,
  getActiveElement,
  addEventListener,
  ownerDocument,
  containsActiveElement,
  requestAnimationFrame
} from '@instructure/ui-dom-utils'

import { error } from '@instructure/console/macro'

import keycode from 'keycode'

import { scopeTab } from './scopeTab'
import { findTabbable } from './findTabbable'
import { findFocusable } from './findFocusable'

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
class KeyboardFocusRegion {
  constructor (element, options) {
    this._contextElement = findDOMNode(element)
    this._options = options || {
      shouldContainFocus: true,
      shouldReturnFocus: true,
      onBlur: (event) => {},
      onDismiss: (event) => {},
      defaultFocusElement: null
    }

    if (this._options.shouldReturnFocus) {
      this._focusLaterElement = this.activeElement
    }
  }

  _contextElement = null
  _focusLaterElement = null
  _needToFocus = false
  _listeners = []
  _raf = []
  _active = false

  get focused () {
    return containsActiveElement(this._contextElement)
  }

  get shouldContainFocus () {
    const { shouldContainFocus } = this._options
    return (shouldContainFocus === true ||
      (Array.isArray(shouldContainFocus) && shouldContainFocus.includes['keyboard']))
  }

  get focusable () {
    return findFocusable(this._contextElement, () => true, true) || []
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

  get activeElement () {
    return getActiveElement(this.doc)
  }

  get defaultFocusElement () {
    const { defaultFocusElement } = this._options

    let element = findDOMNode(
      typeof defaultFocusElement === 'function'
        ? defaultFocusElement()
        : defaultFocusElement
    )

    if (element && this._contextElement && this._contextElement.contains(element)) {
      return element
    }

    const { firstTabbable } = this
    if (firstTabbable) {
      return firstTabbable
    }

    if (this.focusable.includes(this._contextElement)) {
      return this._contextElement
    }

    return null
  }

  updateElement (element) {
    this._contextElement = findDOMNode(element)
  }

  focusDefaultElement () {
    const { defaultFocusElement, shouldContainFocus } = this

    if (defaultFocusElement) {
      defaultFocusElement.focus()
    } else {
      if (shouldContainFocus) {
        // Blur the active element to place focus on the document body
        this.activeElement.blur()

        error(true,
          `
          [KeyboardFocusRegion] No \`defaultFocusElement\` was provided and \`shouldContainFocus\`
          was set to \`true\`. Focus has been moved to the document body instead.
          `
        )
      }
    }
  }

  focus () {
    if (this.focused) {
      return
    }

    this._raf.push(
      requestAnimationFrame(() => {
        this.focusDefaultElement()
      })
    )
  }

  blur () {
    if (this._options.shouldReturnFocus && this._focusLaterElement) {
      try {
        this._focusLaterElement.focus()
      } catch (e) {
        error(
          false,
          `
          [KeyboardFocusRegion] You tried to return focus to ${this._focusLaterElement}
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

  handleKeyDown = event => {
    if (event.keyCode === keycode.codes.tab) {
      scopeTab(this._contextElement, event)
    }
  }

  handleClick = event => {
    this._wasDocumentClick = true
  }

  handleWindowBlur = event => {
    if (this._wasDocumentClick) {
      this._wasDocumentClick = false
      return
    }
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
          this.focusDefaultElement()
        })
      )
    }
  }

  handleFirstTabbableKeyDown = event => {
    if (event.keyCode === keycode.codes.tab && event.shiftKey) {
      this._options.onBlur(event)
    }
  }

  handleLastTabbableKeyDown = event => {
    if (event.keyCode === keycode.codes.tab && !event.shiftKey) {
      this._options.onBlur(event)
    }
  }

  activate () {
    const { defaultFocusElement, shouldContainFocus } = this

    if (!this._active) {
      if (defaultFocusElement || shouldContainFocus) {
        if (shouldContainFocus) {
          this._listeners.push(addEventListener(this.doc, 'keydown', this.handleKeyDown))
        } else {
          this._listeners.push(addEventListener(this.firstTabbable || defaultFocusElement, 'keydown', this.handleFirstTabbableKeyDown))
          this._listeners.push(addEventListener(this.lastTabbable || defaultFocusElement, 'keydown', this.handleLastTabbableKeyDown))
        }

        this._listeners.push(addEventListener(this.doc, 'click', this.handleClick, true))

        this._listeners.push(addEventListener(this.win, 'blur', this.handleWindowBlur, false))
        this._listeners.push(addEventListener(this.doc, 'focus', this.handleFocus, true))

        this._active = true
      }
    }
  }

  deactivate () {
    if (this._active) {
      this._listeners.forEach(listener => {
        listener.remove()
      })
      this._listeners = []

      this._raf.forEach(request => request.cancel())
      this._raf = []

      this._preventCloseOnDocumentClick = false

      this._active = false
    }
  }
}

export default KeyboardFocusRegion
export { KeyboardFocusRegion }
