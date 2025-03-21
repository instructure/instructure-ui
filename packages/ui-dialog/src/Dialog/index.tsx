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

import { Component } from 'react'

import { omitProps, getElementType } from '@instructure/ui-react-utils'
import { findDOMNode, requestAnimationFrame } from '@instructure/ui-dom-utils'
import { logError as error } from '@instructure/console'
import { FocusRegion, FocusRegionManager } from '@instructure/ui-a11y-utils'
import type { RequestAnimationFrameType } from '@instructure/ui-dom-utils'

import { propTypes, allowedProps } from './props'
import type { DialogProps } from './props'

/**
---
category: components/utilities
---
@module Dialog
**/
class Dialog extends Component<DialogProps> {
  static readonly componentId = 'Dialog'

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    open: false,
    shouldFocusOnOpen: true,
    shouldContainFocus: false,
    shouldReturnFocus: false,
    shouldCloseOnDocumentClick: true,
    shouldCloseOnEscape: true
  } as const

  _raf: RequestAnimationFrameType[] = []
  private _focusRegion: FocusRegion | null = null
  ref: Element | null = null

  get _root() {
    console.warn(
      '_root property is deprecated and will be removed in v9, please use ref instead'
    )
    return this.ref
  }

  componentDidUpdate(prevProps: DialogProps) {
    const { open, contentElement, ...options } = this.props
    if (open && !prevProps.open) {
      this.open()
    } else if (!open && prevProps.open) {
      this.close()
    }
    if (this._focusRegion) {
      this._focusRegion.updateElement(this.contentElement, options)
    }
  }

  componentDidMount() {
    if (this.props.open) {
      this.open()
    }
  }

  componentWillUnmount() {
    if (this.props.open) {
      this.close()
    }
    this._raf.forEach((request) => request.cancel())
    this._raf = []
  }

  open() {
    const { open, contentElement, ...options } = this.props

    this._raf.push(
      requestAnimationFrame(() => {
        this._focusRegion = FocusRegionManager.activateRegion(
          this.contentElement as Element,
          {
            ...options
          }
        )
      })
    )
  }

  close() {
    const { _focusRegion, contentElement } = this
    // setTimeout is used here to delay the blur after the mousedown event in FocusRegion for correct execution order
    if (_focusRegion) {
      FocusRegionManager.blurRegion(contentElement, _focusRegion.id)
    }
  }

  focus() {
    if (!this.props.open || !this.contentElement) {
      error(false, "[Dialog] Can't focus a Dialog that isn't open.")
      return
    }

    if (this._focusRegion) {
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

  getRef = (el: Element | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  get contentElement() {
    let contentElement = findDOMNode(this.props.contentElement)
    if (!contentElement) {
      contentElement = findDOMNode(this.ref)
    }
    return contentElement as Element | Node
  }

  get focused() {
    return (
      this.contentElement &&
      this._focusRegion &&
      FocusRegionManager.isFocused(this.contentElement, this._focusRegion.id)
    )
  }

  render() {
    const ElementType = getElementType(Dialog, this.props)

    // In case the HTML role attribute is explicitly passed, use props.role
    const role = this.props.role || (this.props.label ? 'dialog' : undefined)

    return this.props.open ? (
      <ElementType
        {...omitProps(this.props, Dialog.allowedProps)}
        role={role}
        aria-label={this.props.label}
        className={this.props.className}
        ref={this.getRef}
      >
        {this.props.children}
      </ElementType>
    ) : null
  }
}

export default Dialog
export { Dialog }
