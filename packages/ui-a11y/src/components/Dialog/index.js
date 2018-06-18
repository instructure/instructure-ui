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

import View from '@instructure/ui-layout/lib/components/View'
import { pickProps, omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import findDOMNode from '@instructure/ui-utils/lib/dom/findDOMNode'
import deprecated from '@instructure/ui-utils/lib/react/deprecated'
import requestAnimationFrame from '@instructure/ui-utils/lib/dom/requestAnimationFrame'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'

import FocusRegionManager from '../../utils/FocusRegionManager'

/**
---
category: components/utilities
---
**/

@deprecated('5.0.0', {
  applicationElement: true
},
'Elements outside of the `<Dialog />` are now hidden from screen readers by default. ' +
'Use the `ignore` prop to specify any elements that should not be hidden')

class Dialog extends Component {
  static propTypes = {
    /**
     * The children to be rendered within the `<Dialog />`
     */
    children: PropTypes.node,

    /**
    * The element to render as the component root, `span` by default
    */
    as: CustomPropTypes.elementType,

    display: PropTypes.oneOf(['auto', 'block', 'inline-block']),

    label: PropTypes.string,

    /**
     * Whether or not the `<Dialog />` is open
     */
    open: PropTypes.bool,

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
    shouldCloseOnEscape: PropTypes.bool
  }

  static defaultProps = {
    open: false,
    shouldContainFocus: false,
    shouldReturnFocus: false,
    shouldCloseOnDocumentClick: true,
    shouldCloseOnEscape: true,
    defaultFocusElement: null,
    contentElement: null,
    liveRegion: null,
    onDismiss: () => {}
  }

  _raf = []

  componentDidMount () {
    if (this.props.open) {
      this.focus()
    }
  }

  componentWillUpdate (nextProps) {
    const { open } = this.props

    if (open && !nextProps.open) {
      // we need to blur the region before the component updates
      // while we still have access to our contentElement ref
      this.blur()
    }
  }

  componentDidUpdate (prevProps) {
    const { open } = this.props

    if (open && !prevProps.open) {
      this.focus()
    }
  }

  componentWillUnmount () {
    if (this.props.open) {
      this.blur()
    }

    this._raf.forEach(request => request.cancel())
    this._raf = []
  }

  focus () {
    const {
      open,
      contentElement,
      ...options
    } = this.props

    this._raf.push(requestAnimationFrame(() => {
      FocusRegionManager.focusRegion(this.contentElement, {
        ...options
      })
    }))
  }

  blur () {
    FocusRegionManager.blurRegion(this.contentElement)
  }

  get focused () {
    return FocusRegionManager.isFocused(this.contentElement)
  }

  get contentElement () {
    let contentElement = findDOMNode(this.props.contentElement)

    if (!contentElement) {
      contentElement = this._root
    }

    return contentElement
  }

  render () {
    return this.props.open
      ? <View
        {...omitProps(this.props, Dialog.propTypes)}
        {...pickProps(this.props, View.propTypes)}
        ref={el => {
          this._root = el
        }}
        role={this.props.label ? 'region' : null}
        aria-label={this.props.label}
        className={this.props.className} // eslint-disable-line react/prop-types
      >
        {this.props.children}
      </View>
      : null
  }
}

export default Dialog
