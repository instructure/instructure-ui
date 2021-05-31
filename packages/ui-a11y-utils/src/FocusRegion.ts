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

import keycode from 'keycode'

import {
  contains,
  addEventListener,
  getFrameDocumentSafe,
  ownerDocument,
  findTabbable
} from '@instructure/ui-dom-utils'
import { uid } from '@instructure/uid'
import { logError as error } from '@instructure/console'

import { ScreenReaderFocusRegion } from './ScreenReaderFocusRegion'
import { KeyboardFocusRegion } from './KeyboardFocusRegion'

class FocusRegion {
  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'element' implicitly has an 'any' type.
  constructor(element, options) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_options' does not exist on type 'FocusR... Remove this comment to see the full error message
    this._options = options || {
      shouldCloseOnDocumentClick: true,
      shouldCloseOnEscape: true,
      // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
      onDismiss: (event) => {}
    }
    this._contextElement = element
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_screenReaderFocusRegion' does not exist... Remove this comment to see the full error message
    this._screenReaderFocusRegion = new ScreenReaderFocusRegion(
      element,
      options
    )
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_keyboardFocusRegion' does not exist on ... Remove this comment to see the full error message
    this._keyboardFocusRegion = new KeyboardFocusRegion(element, options)
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_id' does not exist on type 'FocusRegion... Remove this comment to see the full error message
    this._id = uid()
  }

  _contextElement = null
  _preventCloseOnDocumentClick = false
  _listeners = []
  _active = false

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'element' implicitly has an 'any' type.
  updateElement(element) {
    this._contextElement = element
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_keyboardFocusRegion' does not exist on ... Remove this comment to see the full error message
    if (this._keyboardFocusRegion) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_keyboardFocusRegion' does not exist on ... Remove this comment to see the full error message
      this._keyboardFocusRegion.updateElement(element)
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_screenReaderFocusRegion' does not exist... Remove this comment to see the full error message
    if (this._screenReaderFocusRegion) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_screenReaderFocusRegion' does not exist... Remove this comment to see the full error message
      this._screenReaderFocusRegion.updateElement(element)
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleDismiss = (event, documentClick) => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_options' does not exist on type 'FocusR... Remove this comment to see the full error message
    this._options.onDismiss(event, documentClick)
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  captureDocumentClick = (event) => {
    const { target } = event
    this._preventCloseOnDocumentClick =
      event.button !== 0 || contains(this._contextElement, target)
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleDocumentClick = (event) => {
    if (
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_options' does not exist on type 'FocusR... Remove this comment to see the full error message
      this._options.shouldCloseOnDocumentClick &&
      !this._preventCloseOnDocumentClick
    ) {
      this.handleDismiss(event, true)
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleFrameClick = (event, frame) => {
    if (!contains(this._contextElement, frame)) {
      // dismiss if frame is not within the region
      this.handleDismiss(event, true)
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleKeyUp = (event) => {
    if (
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_options' does not exist on type 'FocusR... Remove this comment to see the full error message
      this._options.shouldCloseOnEscape &&
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'escape' does not exist on type 'CodesMap... Remove this comment to see the full error message
      event.keyCode === keycode.codes.escape &&
      !event.defaultPrevented
    ) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      this.handleDismiss(event)
    }
  }

  get id() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_id' does not exist on type 'FocusRegion... Remove this comment to see the full error message
    return this._id
  }

  // Focused returns when the focus region is active. Checking focused with the active element
  // is inconsistent across browsers (Safari/Firefox do not focus elements on click)
  get focused() {
    return this._active
  }

  get keyboardFocusable() {
    return (findTabbable(this._contextElement) || []).length > 0
  }

  activate() {
    if (!this._active) {
      const doc = ownerDocument(this._contextElement)

      // @ts-expect-error ts-migrate(2339) FIXME: Property '_keyboardFocusRegion' does not exist on ... Remove this comment to see the full error message
      this._keyboardFocusRegion.activate()
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_screenReaderFocusRegion' does not exist... Remove this comment to see the full error message
      this._screenReaderFocusRegion.activate()

      // @ts-expect-error ts-migrate(2339) FIXME: Property '_options' does not exist on type 'FocusR... Remove this comment to see the full error message
      if (this._options.shouldCloseOnDocumentClick) {
        this._listeners.push(
          // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ remove(): void; }' is not assi... Remove this comment to see the full error message
          addEventListener(doc, 'click', this.captureDocumentClick, true)
        )
        this._listeners.push(
          // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ remove(): void; }' is not assi... Remove this comment to see the full error message
          addEventListener(doc, 'click', this.handleDocumentClick)
        )

        Array.from(doc.getElementsByTagName('iframe')).forEach((el) => {
          // listen for mouseup events on any iframes in the document
          const frameDoc = getFrameDocumentSafe(el)

          if (frameDoc) {
            this._listeners.push(
              // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ remove(): void; }' is not assi... Remove this comment to see the full error message
              addEventListener(frameDoc, 'mouseup', (event) => {
                this.handleFrameClick(event, el)
              })
            )
          }
        })
      }

      // @ts-expect-error ts-migrate(2339) FIXME: Property '_options' does not exist on type 'FocusR... Remove this comment to see the full error message
      if (this._options.shouldCloseOnEscape) {
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ remove(): void; }' is not assi... Remove this comment to see the full error message
        this._listeners.push(addEventListener(doc, 'keyup', this.handleKeyUp))
      }

      this._active = true
    }
  }

  deactivate({ keyboard = true } = {}) {
    if (this._active) {
      this._listeners.forEach((listener) => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'remove' does not exist on type 'never'.
        listener.remove()
      })
      this._listeners = []

      if (keyboard) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_keyboardFocusRegion' does not exist on ... Remove this comment to see the full error message
        this._keyboardFocusRegion.deactivate()
      }

      // @ts-expect-error ts-migrate(2339) FIXME: Property '_screenReaderFocusRegion' does not exist... Remove this comment to see the full error message
      this._screenReaderFocusRegion.deactivate()

      this._active = false
    }
  }

  focus() {
    // @ts-expect-error ts-migrate(2555) FIXME: Expected at least 5 arguments, but got 2.
    error(
      this._active,
      `[FocusRegion] Cannot call '.focus()' on a region that is not currently active.`
    )
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_keyboardFocusRegion' does not exist on ... Remove this comment to see the full error message
    this._keyboardFocusRegion.focus()
  }

  blur() {
    // @ts-expect-error ts-migrate(2555) FIXME: Expected at least 5 arguments, but got 2.
    error(
      !this._active,
      `[FocusRegion] Cannot call '.blur()' on a region that is currently active.`
    )
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_keyboardFocusRegion' does not exist on ... Remove this comment to see the full error message
    this._keyboardFocusRegion.blur()
  }
}

export default FocusRegion
export {
  /**
   * ---
   * category: utilities/a11y
   * ---
   * @module FocusRegion
   * Class for focus operations.
   * - Scoping focus within a given context (DOM node),
   * - Mark active element for focus later
   * - Return focus to the marked element
   */
  FocusRegion
}
