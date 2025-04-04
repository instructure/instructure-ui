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
  ownerDocument,
  findTabbable,
  canUseDOM
} from '@instructure/ui-dom-utils'
import { uid } from '@instructure/uid'
import { logError as error } from '@instructure/console'

import { ScreenReaderFocusRegion } from './ScreenReaderFocusRegion'
import { KeyboardFocusRegion } from './KeyboardFocusRegion'
import { FocusRegionOptions } from './FocusRegionOptions'

class FocusRegion {
  private _contextElement: Node | Element | null = null
  private _options: FocusRegionOptions
  private readonly _screenReaderFocusRegion: ScreenReaderFocusRegion
  private readonly _keyboardFocusRegion: KeyboardFocusRegion
  private readonly _id: string
  private _listeners: ReturnType<typeof addEventListener>[] = []
  private _active = false
  private _documentClickTarget: Node | null = null
  private _contextContainsTarget = false

  constructor(element: Element | Node | null, options: FocusRegionOptions) {
    this._options = options || {
      shouldCloseOnDocumentClick: true,
      shouldCloseOnEscape: true,
      isTooltip: false
    }
    this._contextElement = element
    this._screenReaderFocusRegion = new ScreenReaderFocusRegion(
      element,
      options
    )
    this._keyboardFocusRegion = new KeyboardFocusRegion(element, options)
    this._id = uid()
  }

  updateElement(element: Element | Node, options?: FocusRegionOptions) {
    this._contextElement = element
    if (options) {
      this._options = options
    }
    if (this._keyboardFocusRegion) {
      this._keyboardFocusRegion.updateElement(element)
    }
    if (this._screenReaderFocusRegion) {
      this._screenReaderFocusRegion.updateElement(element)
    }
  }

  handleDismiss = (
    event: React.MouseEvent | React.KeyboardEvent,
    documentClick?: boolean
  ) => {
    this._options.onDismiss?.(event, documentClick)
  }

  captureDocumentMousedown = (event: React.MouseEvent) => {
    this._documentClickTarget = event.target as Node
    this._contextContainsTarget = contains(
      this._contextElement,
      this._documentClickTarget
    )
  }

  handleDocumentClick = (event: React.PointerEvent) => {
    if (
      this._options.shouldCloseOnDocumentClick &&
      event.button === 0 &&
      event.detail > 0 && // if event.detail is 0 then this is a keyboard and not a mouse press
      !this._contextContainsTarget &&
      //this prevents clicking on Tooltip from closing the parent dialog
      !(
        canUseDOM &&
        this._documentClickTarget instanceof HTMLElement &&
        this._documentClickTarget.closest('[role="tooltip"]')
      )
    ) {
      this.handleDismiss(event, true)
    }
  }

  handleFrameClick = (event: React.MouseEvent, frame: HTMLIFrameElement) => {
    if (!contains(this._contextElement, frame)) {
      // dismiss if frame is not within the region
      this.handleDismiss(event, true)
    }
  }

  handleKeyUp = (event: React.KeyboardEvent) => {
    if (
      this._options.shouldCloseOnEscape &&
      event.keyCode === keycode.codes.esc &&
      !event.defaultPrevented
    ) {
      // If a dialog contains an <input type="file"/> element and the user opens the file picker and closes it with the
      // escape key then Firefox passes through that event which could close the parent dialog. This code prevents that
      // from happening (listening for a `cancel` event doesn't seem to work in firefox)
      const activeElement = ownerDocument(this._contextElement)?.activeElement
      const fileInputFocused =
        activeElement?.tagName === 'INPUT' &&
        (<HTMLInputElement>activeElement).type === 'file'

      if (fileInputFocused) {
        ;(<HTMLInputElement>activeElement).blur()
      } else {
        //This should prevent a Tooltip from closing when inside of a Modal
        if (this._options.isTooltip) {
          event.stopPropagation()
        }
        this.handleDismiss(event)
      }
    }
  }

  get id() {
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
      const doc = ownerDocument(this._contextElement)!

      this._keyboardFocusRegion.activate()
      this._screenReaderFocusRegion.activate()

      if (this._options.shouldCloseOnDocumentClick) {
        this._listeners.push(
          addEventListener(doc, 'mousedown', this.captureDocumentMousedown)
        )

        this._listeners.push(
          addEventListener(doc, 'click', this.handleDocumentClick)
        )

        Array.from(doc.getElementsByTagName('iframe')).forEach((el) => {
          // listen for mouseup events on any iframes in the document
          const frameDoc = el.contentDocument
          if (frameDoc) {
            this._listeners.push(
              addEventListener(frameDoc, 'mouseup', (event) => {
                this.handleFrameClick(event as React.MouseEvent, el)
              })
            )
          }
        })
      }
      //This will ensure that the Tooltip's Escape event listener is executed first
      //because listeners in the capturing phase are called before other event listeners (like that of the Modal's Escape listener)
      //so a Modal with a Tooltip will not get closed when closing the Tooltip with Escape
      const useCapture = this._options.isTooltip
      if (this._options.shouldCloseOnEscape) {
        this._listeners.push(
          addEventListener(doc, 'keyup', this.handleKeyUp, useCapture)
        )
      }

      this._active = true
    }
  }

  deactivate({ keyboard = true }: { keyboard?: boolean } = {}) {
    if (this._active) {
      this._listeners.forEach((listener) => {
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

  focus() {
    error(
      this._active,
      `[FocusRegion] Cannot call '.focus()' on a region that is not currently active.`
    )
    this._keyboardFocusRegion.focus()
  }

  blur() {
    error(
      !this._active,
      `[FocusRegion] Cannot call '.blur()' on a region that is currently active.`
    )
    this._keyboardFocusRegion.blur()
  }
}

export default FocusRegion
export {
  /**
   * ---
   * category: utilities/a11y
   * ---
   *
   * Class for focus operations, manages [ScreenReaderFocusRegion](#ScreenReaderFocusRegion)
   * and [KeyboardFocusRegion](#KeyboardFocusRegion) for the given DOM element.
   * - Scoping focus within a given context (DOM node),
   * - Mark active element for focus later
   * - Return focus to the marked element
   * @module FocusRegion
   */
  FocusRegion
}
