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
import OutsideClickHandler from 'react-outside-click-handler'
import PropTypes from 'prop-types'
import { FocusManager } from '@instructure/ui-focus-manager'
import { omitProps, getElementType } from '@instructure/ui-react-utils'
import { findDOMNode, requestAnimationFrame } from '@instructure/ui-dom-utils'
import type { RequestAnimationFrameType } from '@instructure/ui-dom-utils'
import { logError as error } from '@instructure/console'
import type { OtherHTMLAttributes } from '@instructure/shared-types'

import { DialogProps } from './types'

type Props = {
  as?: any
  display?: 'auto' | 'block' | 'inline-block'
  label?: string
  open?: boolean
  onBlur?: (...args: any[]) => any
  onDismiss?: (...args: any[]) => any
  defaultFocusElement?: React.ReactElement | ((...args: any[]) => any)
  contentElement?: React.ReactElement | ((...args: any[]) => any)
  liveRegion?:
    | React.ReactElement[]
    | React.ReactElement
    | ((...args: any[]) => any)
  shouldContainFocus?: boolean | ('keyboard' | 'screenreader')
  shouldReturnFocus?: boolean
  shouldCloseOnDocumentClick?: boolean
  shouldCloseOnEscape?: boolean
  shouldFocusOnOpen?: boolean
}

/**
---
category: components/utilities
---
@module Dialog
**/

class Dialog extends Component<Props & OtherHTMLAttributes<DialogProps>> {
  constructor(props: any) {
    super(props)
    this.onEscPress = this.onEscPress.bind(this)
  }
  static readonly componentId = 'Dialog'

  static propTypes = {
    /**
     * The children to be rendered within the `<Dialog />`
     */
    children: PropTypes.node,

    /**
     * The element to render as the component root, `span` by default
     */
    as: PropTypes.elementType, // eslint-disable-line react/require-default-props

    display: PropTypes.oneOf(['auto', 'block', 'inline-block']),

    label: PropTypes.string,

    /**
     * Whether or not the `<Dialog />` is open
     */
    open: PropTypes.bool,

    /**
     * Function called when tab focus leaves the `<Dialog />` focusable content. This only
     * occurs when `shouldContainFocus` is set to false.
     */
    onBlur: PropTypes.func,

    onDismiss: PropTypes.func,

    onClose: PropTypes.func,

    /**
     * An element or a function returning an element to focus by default
     */
    defaultFocusElement: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func
    ]),

    /**
     * An element or a function returning an element that wraps the content of the `<Dialog />`
     */
    contentElement: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),

    /**
     * An element, function returning an element, or array of elements that will not be hidden from
     * the screen reader when the `<Dialog />` is open
     */
    liveRegion: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element,
      PropTypes.func
    ]),
    shouldContainFocus: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf(['keyboard', 'screenreader'])
    ]),
    shouldReturnFocus: PropTypes.bool,
    shouldCloseOnDocumentClick: PropTypes.bool,
    shouldCloseOnEscape: PropTypes.bool,
    shouldFocusOnOpen: PropTypes.bool
  }

  static defaultProps = {
    children: null,
    display: undefined,
    label: undefined,
    open: false,
    shouldFocusOnOpen: true,
    shouldContainFocus: false,
    shouldReturnFocus: false,
    shouldCloseOnDocumentClick: true,
    shouldCloseOnEscape: true,
    defaultFocusElement: null,
    contentElement: null,
    liveRegion: null,
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onBlur: (event) => {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onDismiss: (event) => {},
    onClose: () => {}
  }

  _timeouts: ReturnType<typeof setTimeout>[] = []
  _raf: RequestAnimationFrameType[] = []
  _focusRegion = null

  onEscPress(event: KeyboardEvent) {
    if (
      event.keyCode === 27 &&
      this.props.shouldCloseOnEscape &&
      this.props.onDismiss &&
      hasNoDialogChildren
    ) {
      this.props.onDismiss()
    }
  }

  componentDidMount() {
    if (this.props.open) {
      this.open()
    }
    //document.addEventListener('keydown', this.onEscPress, false)
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
    document.removeEventListener('keydown', this.onEscPress, false)
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
      })
    )
  }

  close() {
    //@ts-expect-error ts-migration
    this.props.onClose()
  }

  blur() {
    if (!this.props.open || !this.contentElement) {
      error(false, "[Dialog] Can't blur a Dialog that isn't open.")
      return
    }

    this.close()
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'el' implicitly has an 'any' type.
  getRef = (el) => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_root' does not exist on type 'Dialog'.
    this._root = el
  }

  get contentElement() {
    let contentElement = findDOMNode(this.props.contentElement)

    if (!contentElement) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_root' does not exist on type 'Dialog'.
      contentElement = findDOMNode(this._root)
    }

    return contentElement
  }

  render() {
    const ElementType = getElementType(Dialog, this.props)
    return this.props.open ? (
      <OutsideClickHandler
        onOutsideClick={() => {
          this.props.onDismiss && this.props.onDismiss()
        }}
        disabled={!this.props.shouldCloseOnDocumentClick}
      >
        <FocusManager onDismiss={this.props.onDismiss}>
          <ElementType
            {...omitProps(this.props, Dialog.propTypes)}
            ref={this.getRef}
            role={this.props.label ? 'dialog' : null}
            aria-label={this.props.label}
            className={this.props.className} // eslint-disable-line react/prop-types
          >
            {this.props.children}
          </ElementType>
        </FocusManager>
      </OutsideClickHandler>
    ) : null
  }
}

export default Dialog
export { Dialog }
