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

import React, { Component } from 'react'

import { omitProps, getElementType } from '@instructure/ui-react-utils'
import { findDOMNode, requestAnimationFrame } from '@instructure/ui-dom-utils'
import type { RequestAnimationFrameType } from '@instructure/ui-dom-utils'
import { logError as error } from '@instructure/console'
import type { OtherHTMLAttributes } from '@instructure/shared-types'
import { FocusRegionManager } from '@instructure/ui-a11y-utils'

import { propTypes, allowedProps } from './props'
import type { DialogProps } from './props'

/**
---
category: components/utilities
---
@module Dialog
**/

class Dialog extends Component<DialogProps & OtherHTMLAttributes<DialogProps>> {
  static readonly componentId = 'Dialog'

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    children: null,
    open: false,
    shouldFocusOnOpen: true,
    shouldContainFocus: false,
    shouldReturnFocus: false,
    shouldCloseOnDocumentClick: true,
    shouldCloseOnEscape: true,
    defaultFocusElement: undefined,
    contentElement: undefined,
    liveRegion: undefined,
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onBlur: (event) => {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onDismiss: (event) => {}
  } as const

  _timeouts: ReturnType<typeof setTimeout>[] = []
  _raf: RequestAnimationFrameType[] = []
  _focusRegion = null
  componentDidMount() {
    if (this.props.open) {
      this.open()
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prevProps' implicitly has an 'any' type... Remove this comment to see the full error message
  componentDidUpdate(prevProps) {
    const { open } = this.props

    if (open && !prevProps.open) {
      this.open()
    } else if (!open && prevProps.open) {
      this.close()
    }

    if (this._focusRegion) {
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      this._focusRegion.updateElement(this.contentElement)
    }
  }

  componentWillUnmount() {
    if (this.props.open) {
      this.close()
    }

    this._timeouts.forEach((timeout) => clearTimeout(timeout))
    this._timeouts = []
    this._raf.forEach((request) => request.cancel())
    this._raf = []
  }

  open() {
    const { open, contentElement, ...options } = this.props

    this._raf.push(
      requestAnimationFrame(() => {
        // It needs to wait a heartbeat until the content is fully loaded
        // inside the dialog. If it contains a focusable element, it will
        // get focused on open, and browsers scroll to the focused element.
        // If the css is not fully applied, the element may not be in their
        // final position, making the page jump.
        this._timeouts.push(
          setTimeout(() => {
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'FocusRegion' is not assignable to type 'null... Remove this comment to see the full error message
            this._focusRegion = FocusRegionManager.activateRegion(
              this.contentElement,
              {
                ...options
              }
            )
          }, 0)
        )
      })
    )
  }

  close() {
    if (this._focusRegion) {
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      FocusRegionManager.blurRegion(this.contentElement, this._focusRegion.id)
    }
  }

  focus() {
    if (!this.props.open || !this.contentElement) {
      error(false, "[Dialog] Can't focus a Dialog that isn't open.")
      return
    }

    if (this._focusRegion) {
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      FocusRegionManager.focusRegion(this.contentElement, this._focusRegion.id)
    }
  }

  blur() {
    if (!this.props.open || !this.contentElement) {
      error(false, "[Dialog] Can't blur a Dialog that isn't open.")
      return
    }

    this.close()
  }

  //@ts-expect-error TODO:
  getRef = (el) => {
    //@ts-expect-error TODO:
    this._root = el
  }

  get contentElement() {
    let contentElement = findDOMNode(this.props.contentElement)

    if (!contentElement) {
      //@ts-expect-error TODO:
      contentElement = findDOMNode(this._root)
    }

    return contentElement
  }

  get focused() {
    return (
      this.contentElement &&
      this._focusRegion &&
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      FocusRegionManager.isFocused(this.contentElement, this._focusRegion.id)
    )
  }

  render() {
    const ElementType = getElementType(Dialog, this.props)

    return this.props.open ? (
      <ElementType
        // @ts-expect-error TODO: `ref` prop causes: "Expression produces a union type that is too complex to represent.ts(2590)"
        {...omitProps(this.props, Dialog.allowedProps)}
        role={this.props.label ? 'dialog' : undefined}
        aria-label={this.props.label}
        className={this.props.className} // eslint-disable-line react/prop-types
        ref={this.getRef}
      >
        {this.props.children}
      </ElementType>
    ) : null
  }
}

export default Dialog
export { Dialog }
