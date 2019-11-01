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

import { omitProps, getElementType, deprecated } from '@instructure/ui-react-utils'
import { findDOMNode, requestAnimationFrame } from '@instructure/ui-dom-utils'
import { error } from '@instructure/console/macro'

import { FocusRegionManager } from '../FocusRegionManager'

/**
---
category: components/utilities/deprecated
id: DeprecatedDialog
---
@module Dialog
**/
@deprecated('7.0.0', null, 'Use Dialog from ui-dialog instead')
class Dialog extends Component {
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
    defaultFocusElement: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),

    /**
     * An element or a function returning an element that wraps the content of the `<Dialog />`
     */
    contentElement: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),

    /**
     * An element, function returning an element, or array of elements that will not be hidden from
     * the screen reader when the `<Dialog />` is open
     */
    liveRegion: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element, PropTypes.func]),
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
    onBlur: (event) => {},
    onDismiss: (event) => {}
  }

  _raf = []
  _focusRegion = null

  componentDidMount () {
    if (this.props.open) {
      this.open()
    }
  }

  componentDidUpdate (prevProps) {
    const { open } = this.props

    if (open && !prevProps.open) {
      this.open()
    } else if (!open && prevProps.open) {
      this.close()
    }

    if (this._focusRegion) {
      this._focusRegion.updateElement(this.contentElement)
    }
  }

  componentWillUnmount () {
    if (this.props.open) {
      this.close()
    }

    this._raf.forEach(request => request.cancel())
    this._raf = []
  }

  open () {
    const {
      open,
      contentElement,
      ...options
    } = this.props

    this._raf.push(requestAnimationFrame(() => {
      this._focusRegion = FocusRegionManager.activateRegion(this.contentElement, {
        ...options
      })
    }))
  }

  close () {
    if (this._focusRegion) {
      FocusRegionManager.blurRegion(this.contentElement, this._focusRegion.id)
    }
  }

  focus () {
    if (!this.props.open || !this.contentElement) {
      error(false, '[Dialog] Can\'t focus a Dialog that isn\'t open.')
      return
    }

    if (this._focusRegion) {
      FocusRegionManager.focusRegion(this.contentElement, this._focusRegion.id)
    }
  }

  blur () {
    if (!this.props.open || !this.contentElement) {
      error(false, '[Dialog] Can\'t blur a Dialog that isn\'t open.')
      return
    }

    this.close()
  }

  getRef = el => {
    this._root = el
  }

  get contentElement () {
    let contentElement = findDOMNode(this.props.contentElement)

    if (!contentElement) {
      contentElement = findDOMNode(this._root)
    }

    return contentElement
  }

  get focused () {
    return this.contentElement &&
      this._focusRegion &&
      FocusRegionManager.isFocused(this.contentElement, this._focusRegion.id)
  }

  render () {
    const ElementType = getElementType(Dialog, this.props)
    return this.props.open ? (
      <ElementType
        {...omitProps(this.props, Dialog.propTypes)}
        ref={this.getRef}
        role={this.props.label ? 'dialog' : null}
        aria-label={this.props.label}
        className={this.props.className} // eslint-disable-line react/prop-types
      >
        {this.props.children}
      </ElementType>
    ) : null
  }
}

export default Dialog
export { Dialog }
