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

import type { RequestAnimationFrameType } from '@instructure/ui-dom-utils'

import { logError as error } from '@instructure/console'

import keycode from 'keycode'

import { scopeTab } from './scopeTab'
import type { UIElement } from '@instructure/shared-types'
import { FocusRegionOptions } from './FocusRegionOptions'

class KeyboardFocusRegion {
  private readonly _options: FocusRegionOptions
  private _focusLaterElement: Element | null = null
  private _needToFocus = false
  private _listeners: ReturnType<typeof addEventListener>[] = []
  private _raf: RequestAnimationFrameType[] = []
  private _active = false
  private _wasDocumentClick?: boolean
  public _contextElement?: Node

  constructor(element: UIElement, options: FocusRegionOptions) {
    this._contextElement = findDOMNode(element) as Node
    this._options = options || {
      shouldContainFocus: true,
      shouldReturnFocus: true,
      defaultFocusElement: null
    }
    if (this._options.shouldReturnFocus) {
      this._focusLaterElement = getActiveElement(this.doc)
    }
  }

  get focused() {
    return containsActiveElement(this._contextElement)
  }

  get shouldContainFocus() {
    const { shouldContainFocus } = this._options
    return (
      shouldContainFocus === true ||
      (Array.isArray(shouldContainFocus) &&
        shouldContainFocus.includes('keyboard'))
    )
  }

  get focusable(): Element[] {
    return findFocusable(this._contextElement, () => true, true) || []
  }

  get tabbable(): Element[] {
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

  get defaultFocusElement() {
    const { defaultFocusElement } = this._options
    const element: Node | undefined = findDOMNode(
      typeof defaultFocusElement === 'function'
        ? defaultFocusElement()
        : defaultFocusElement
    ) as Node
    if (
      element &&
      this._contextElement &&
      this._contextElement.contains(element)
    ) {
      return element
    }
    const { firstTabbable } = this
    if (firstTabbable) {
      return firstTabbable
    }
    if (
      this._contextElement &&
      this.focusable.includes(this._contextElement as Element)
    ) {
      return this._contextElement
    }
    return null
  }

  updateElement(element: UIElement) {
    this._contextElement = findDOMNode(element) as Node
  }

  focusDefaultElement() {
    if (this.defaultFocusElement) {
      ;(this.defaultFocusElement as HTMLElement).focus()
    } else {
      if (this.shouldContainFocus) {
        // Blur the active element to place focus on the document body
        getActiveElement(this.doc) &&
          (getActiveElement(this.doc) as HTMLElement).blur()
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
      requestAnimationFrame(() => {
        this.focusDefaultElement()
      })
    )
  }

  blur() {
    if (this._options.shouldReturnFocus && this._focusLaterElement) {
      try {
        ;(this._focusLaterElement as HTMLElement).focus()
      } catch (e: unknown) {
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

  handleDismiss = (event: Event) => {
    this._options.onDismiss?.(event)
  }

  handleKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === keycode.codes.tab) {
      scopeTab(this._contextElement, event)
    }
  }

  handleClick = () => {
    this._wasDocumentClick = true
  }

  handleWindowBlur = () => {
    if (this._wasDocumentClick) {
      this._wasDocumentClick = false
      return
    }
    this._needToFocus = true
  }

  handleFocus = () => {
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

  handleFirstTabbableKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === keycode.codes.tab && event.shiftKey) {
      this._options.onBlur?.(event)
    }
  }

  handleLastTabbableKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === keycode.codes.tab && !event.shiftKey) {
      this._options.onBlur?.(event)
    }
  }

  activate() {
    const { defaultFocusElement, shouldContainFocus } = this
    if (!this._active) {
      if (defaultFocusElement || shouldContainFocus) {
        if (shouldContainFocus) {
          this._listeners.push(
            addEventListener(
              this.doc,
              'keydown',
              this.handleKeyDown as EventListener
            )
          )
        } else {
          this._listeners.push(
            addEventListener(
              this.firstTabbable || defaultFocusElement,
              'keydown',
              this.handleFirstTabbableKeyDown as EventListener
            )
          )
          this._listeners.push(
            addEventListener(
              this.lastTabbable || defaultFocusElement!,
              'keydown',
              this.handleLastTabbableKeyDown as EventListener
            )
          )
        }

        this._listeners.push(
          addEventListener(this.doc, 'click', this.handleClick, true)
        )

        this._listeners.push(
          addEventListener(this.win!, 'blur', this.handleWindowBlur, false)
        )
        this._listeners.push(
          addEventListener(this.doc, 'focus', this.handleFocus, true)
        )

        this._active = true
      }
    }
  }

  deactivate() {
    if (this._active) {
      this._listeners.forEach((listener) => {
        listener.remove()
      })
      this._listeners = []
      this._raf.forEach((request) => request.cancel())
      this._raf = []
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
