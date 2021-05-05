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
import PropTypes from 'prop-types'

import { omitProps, getElementType } from '@instructure/ui-react-utils'
import { findDOMNode, requestAnimationFrame } from '@instructure/ui-dom-utils'
import { logError as error } from '@instructure/console'

import { FocusRegionManager } from '@instructure/ui-a11y-utils'
type Props = {
  as?: React.ReactElement | keyof HTMLElementTagNameMap
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

class Dialog extends Component<Props> {
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
    onDismiss: (event) => {}
  }

  _raf = []
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

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'cancel' does not exist on type 'never'.
    this._raf.forEach((request) => request.cancel())
    this._raf = []
  }

  open() {
    const { open, contentElement, ...options } = this.props

    this._raf.push(
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ cancel: () => void; }' is not ... Remove this comment to see the full error message
      requestAnimationFrame(() => {
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'FocusRegion' is not assignable to type 'null... Remove this comment to see the full error message
        this._focusRegion = FocusRegionManager.activateRegion(
          this.contentElement,
          {
            ...options
          }
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
      // @ts-expect-error ts-migrate(2555) FIXME: Expected at least 5 arguments, but got 2.
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
      // @ts-expect-error ts-migrate(2555) FIXME: Expected at least 5 arguments, but got 2.
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

  get focused() {
    return (
      this.contentElement &&
      this._focusRegion &&
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      FocusRegionManager.isFocused(this.contentElement, this._focusRegion.id)
    )
  }

  render() {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    const ElementType = getElementType(Dialog, this.props)
    return this.props.open ? (
      // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: ReactNode; ref: (el: any) => voi... Remove this comment to see the full error message
      <ElementType
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        {...omitProps(this.props, Dialog.propTypes)}
        ref={this.getRef}
        role={this.props.label ? 'dialog' : null}
        aria-label={this.props.label}
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type 'Reado... Remove this comment to see the full error message
        className={this.props.className} // eslint-disable-line react/prop-types
      >
        {this.props.children}
      </ElementType>
    ) : null
  }
}

export default Dialog
export { Dialog }
