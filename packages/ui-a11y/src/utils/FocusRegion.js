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

import contains from '@instructure/ui-utils/lib/dom/contains'
import ownerDocument from '@instructure/ui-utils/lib/dom/ownerDocument'
import addEventListener from '@instructure/ui-utils/lib/dom/addEventListener'
import uid from '@instructure/uid'
import { error } from '@instructure/console/macro'

import findTabbable from './findTabbable'
import ScreenReaderFocusRegion from './ScreenReaderFocusRegion'
import KeyboardFocusRegion from './KeyboardFocusRegion'

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
export default class FocusRegion {
  constructor (element, options) {
    this._options = options || {
      shouldCloseOnDocumentClick: true,
      shouldCloseOnEscape: true,
      onDismiss: (event) => {}
    }
    this._contextElement = element
    this._screenReaderFocusRegion = new ScreenReaderFocusRegion(element, options)
    this._keyboardFocusRegion = new KeyboardFocusRegion(element, options)
    this._id = uid()
  }

  _contextElement = null
  _preventCloseOnDocumentClick = false
  _listeners = []
  _active = false

  updateElement (element) {
    this._contextElement = element
    if (this._keyboardFocusRegion) {
      this._keyboardFocusRegion.updateElement(element)
    }
    if (this._screenReaderFocusRegion) {
      this._screenReaderFocusRegion.updateElement(element)
    }
  }

  handleDismiss = (event, documentClick) => {
    this._options.onDismiss(event, documentClick)
  }

  captureDocumentClick = event => {
    const { target } = event

    this._preventCloseOnDocumentClick = event.button !== 0 || contains(this._contextElement, target)
  }

  handleDocumentClick = event => {
    if (this._options.shouldCloseOnDocumentClick && !this._preventCloseOnDocumentClick) {
      this.handleDismiss(event, true)
    }
  }

  handleKeyUp = event => {
    if (this._options.shouldCloseOnEscape && event.keyCode === keycode.codes.escape &&
        !event.defaultPrevented) {
      this.handleDismiss(event)
    }
  }

  get id () {
    return this._id
  }

  // Focused returns when the focus region is active. Checking focused with the active element
  // is inconsistent across browsers (Safari/Firefox do not focus elements on click)
  get focused () {
    return this._active
  }

  get keyboardFocusable () {
    return (findTabbable(this._contextElement) || []).length > 0
  }

  activate () {
    if (!this._active) {
      const doc = ownerDocument(this._contextElement)

      // Only activate keyboard focus region if region has keyboard focusable content
      if (this.keyboardFocusable) {
        this._keyboardFocusRegion.activate()
      }

      this._screenReaderFocusRegion.activate()

      if (this._options.shouldCloseOnDocumentClick) {
        this._listeners.push(addEventListener(doc, 'click', this.captureDocumentClick, true))
        this._listeners.push(addEventListener(doc, 'click', this.handleDocumentClick))
      }

      if (this._options.shouldCloseOnEscape) {
        this._listeners.push(addEventListener(doc, 'keyup', this.handleKeyUp))
      }

      this._active = true
    }
  }

  deactivate ({ keyboard = true } = {}) {
    if (this._active) {
      this._listeners.forEach(listener => {
        listener.remove()
      })
      this._listeners = []

      if (keyboard) {
        this._keyboardFocusRegion.deactivate()
      }

      this._screenReaderFocusRegion.deactivate()

      this._active = false
    }
  }

  focus () {
    error(this._active, `[FocusRegion] Cannot call '.focus()' on a region that is not currently active.`)
    this._keyboardFocusRegion.focus()
  }

  blur () {
    error(!this._active, `[FocusRegion] Cannot call '.blur()' on a region that is currently active.`)
    this._keyboardFocusRegion.blur()
  }
}
