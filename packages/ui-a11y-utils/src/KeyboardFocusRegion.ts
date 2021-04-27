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
  findTabbable,
  findFocusable,
  ownerWindow,
  getActiveElement,
  addEventListener,
  ownerDocument,
  containsActiveElement,
  requestAnimationFrame
} from '@instructure/ui-dom-utils'

import { logError as error } from '@instructure/console'

import keycode from 'keycode'

import { scopeTab } from './scopeTab'

class KeyboardFocusRegion {
  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'element' implicitly has an 'any' type.
  constructor(element, options) {
    this._contextElement = findDOMNode(element)
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_options' does not exist on type 'Keyboa... Remove this comment to see the full error message
    this._options = options || {
      shouldContainFocus: true,
      shouldReturnFocus: true,
      // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
      onBlur: (event) => {},
      // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
      onDismiss: (event) => {},
      defaultFocusElement: null
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property '_options' does not exist on type 'Keyboa... Remove this comment to see the full error message
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

  get focused() {
    return containsActiveElement(this._contextElement)
  }

  get shouldContainFocus() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_options' does not exist on type 'Keyboa... Remove this comment to see the full error message
    const { shouldContainFocus } = this._options
    return (
      shouldContainFocus === true ||
      (Array.isArray(shouldContainFocus) &&
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        shouldContainFocus.includes['keyboard'])
    )
  }

  get focusable() {
    return findFocusable(this._contextElement, () => true, true) || []
  }

  get tabbable() {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    return findTabbable(this._contextElement) || []
  }

  get firstTabbable() {
    return this.tabbable[0]
  }

  get lastTabbable() {
    return this.tabbable.pop()
  }

  get firstFocusable() {
    return this.focusable[0]
  }

  get lastFocusable() {
    return this.focusable.pop()
  }

  get doc() {
    return ownerDocument(this._contextElement)
  }

  get win() {
    return ownerWindow(this._contextElement)
  }

  get activeElement() {
    return getActiveElement(this.doc)
  }

  get defaultFocusElement() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_options' does not exist on type 'Keyboa... Remove this comment to see the full error message
    const { defaultFocusElement } = this._options

    const element = findDOMNode(
      typeof defaultFocusElement === 'function'
        ? defaultFocusElement()
        : defaultFocusElement
    )

    if (
      element &&
      this._contextElement &&
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      this._contextElement.contains(element)
    ) {
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

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'element' implicitly has an 'any' type.
  updateElement(element) {
    this._contextElement = findDOMNode(element)
  }

  focusDefaultElement() {
    const { defaultFocusElement, shouldContainFocus } = this

    if (defaultFocusElement) {
      defaultFocusElement.focus()
    } else {
      if (shouldContainFocus) {
        // Blur the active element to place focus on the document body
        this.activeElement.blur()

        // @ts-expect-error ts-migrate(2555) FIXME: Expected at least 5 arguments, but got 2.
        error(
          true,
          `
          [KeyboardFocusRegion] No \`defaultFocusElement\` was provided and \`shouldContainFocus\`
          was set to \`true\`. Focus has been moved to the document body instead.
          `
        )
      }
    }
  }

  focus() {
    if (this.focused) {
      return
    }

    this._raf.push(
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ cancel: () => void; }' is not ... Remove this comment to see the full error message
      requestAnimationFrame(() => {
        this.focusDefaultElement()
      })
    )
  }

  blur() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_options' does not exist on type 'Keyboa... Remove this comment to see the full error message
    if (this._options.shouldReturnFocus && this._focusLaterElement) {
      try {
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        this._focusLaterElement.focus()
      } catch (e) {
        // @ts-expect-error ts-migrate(2555) FIXME: Expected at least 5 arguments, but got 2.
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

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleDismiss = (event) => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_options' does not exist on type 'Keyboa... Remove this comment to see the full error message
    this._options.onDismiss(event)
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleKeyDown = (event) => {
    if (event.keyCode === keycode.codes.tab) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      scopeTab(this._contextElement, event)
    }
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
  handleClick = (event) => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_wasDocumentClick' does not exist on typ... Remove this comment to see the full error message
    this._wasDocumentClick = true
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
  handleWindowBlur = (event) => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_wasDocumentClick' does not exist on typ... Remove this comment to see the full error message
    if (this._wasDocumentClick) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_wasDocumentClick' does not exist on typ... Remove this comment to see the full error message
      this._wasDocumentClick = false
      return
    }
    this._needToFocus = true
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
  handleFocus = (event) => {
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
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ cancel: () => void; }' is not ... Remove this comment to see the full error message
        requestAnimationFrame(() => {
          if (containsActiveElement(this._contextElement)) {
            return
          }
          this.focusDefaultElement()
        })
      )
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleFirstTabbableKeyDown = (event) => {
    if (event.keyCode === keycode.codes.tab && event.shiftKey) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_options' does not exist on type 'Keyboa... Remove this comment to see the full error message
      this._options.onBlur(event)
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleLastTabbableKeyDown = (event) => {
    if (event.keyCode === keycode.codes.tab && !event.shiftKey) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_options' does not exist on type 'Keyboa... Remove this comment to see the full error message
      this._options.onBlur(event)
    }
  }

  activate() {
    const { defaultFocusElement, shouldContainFocus } = this

    if (!this._active) {
      if (defaultFocusElement || shouldContainFocus) {
        if (shouldContainFocus) {
          this._listeners.push(
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'Function' is not assignable to p... Remove this comment to see the full error message
            addEventListener(this.doc, 'keydown', this.handleKeyDown)
          )
        } else {
          this._listeners.push(
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'Function' is not assignable to p... Remove this comment to see the full error message
            addEventListener(
              this.firstTabbable || defaultFocusElement,
              'keydown',
              this.handleFirstTabbableKeyDown
            )
          )
          this._listeners.push(
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'Function' is not assignable to p... Remove this comment to see the full error message
            addEventListener(
              this.lastTabbable || defaultFocusElement,
              'keydown',
              this.handleLastTabbableKeyDown
            )
          )
        }

        this._listeners.push(
          // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'Function' is not assignable to p... Remove this comment to see the full error message
          addEventListener(this.doc, 'click', this.handleClick, true)
        )

        this._listeners.push(
          // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'Function' is not assignable to p... Remove this comment to see the full error message
          addEventListener(this.win, 'blur', this.handleWindowBlur, false)
        )
        this._listeners.push(
          // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'Function' is not assignable to p... Remove this comment to see the full error message
          addEventListener(this.doc, 'focus', this.handleFocus, true)
        )

        this._active = true
      }
    }
  }

  deactivate() {
    if (this._active) {
      this._listeners.forEach((listener) => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'remove' does not exist on type 'never'.
        listener.remove()
      })
      this._listeners = []

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'cancel' does not exist on type 'never'.
      this._raf.forEach((request) => request.cancel())
      this._raf = []

      // @ts-expect-error ts-migrate(2339) FIXME: Property '_preventCloseOnDocumentClick' does not e... Remove this comment to see the full error message
      this._preventCloseOnDocumentClick = false

      this._active = false
    }
  }
}

export default KeyboardFocusRegion
export {
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
  KeyboardFocusRegion
}
