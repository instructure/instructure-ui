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

/** @jsx jsx */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { View } from '@instructure/ui-view'
import { ThemeablePropTypes } from '@instructure/ui-themeable'
import { containsActiveElement, findTabbable } from '@instructure/ui-dom-utils'
import { safeCloneElement } from '@instructure/ui-react-utils'
import { Children, controllable } from '@instructure/ui-prop-types'
import { uid } from '@instructure/uid'
import { error } from '@instructure/console/macro'

import { Page } from './Page'

import { withStyle, jsx } from '@instructure/emotion'
import generateStyle from './styles'

/**
---
category: components
---
**/
@withStyle(generateStyle)
class Pages extends Component {
  static propTypes = {
    children: Children.oneOf([Page]),

    defaultPageIndex: PropTypes.number,

    /**
     * The currently active page index
     */
    activePageIndex: controllable(
      PropTypes.number,
      'onPageIndexChange',
      'defaultPageIndex'
    ),

    /**
     * Event handler fired anytime page index has changed due to back button being clicked
     */
    onPageIndexChange: PropTypes.func,

    /**
     * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
     * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
     * familiar CSS-like shorthand. For example: `margin="small auto large"`.
     */
    margin: ThemeablePropTypes.spacing,

    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object
  }

  static defaultProps = {
    children: null,
    defaultPageIndex: null,
    activePageIndex: 0,
    onPageIndexChange: function () {},
    margin: undefined
  }

  static childContextTypes = {
    history: PropTypes.array,
    navigateToPreviousPage: PropTypes.func
  }

  static Page = Page

  _timeouts = []

  constructor(props) {
    super(props)

    this._history = [
      typeof props.defaultPageIndex === 'number'
        ? props.defaultPageIndex
        : props.activePageIndex
    ]

    this._contentId = uid('Pages')
  }

  componentDidMount() {
    this.props.makeStyles()
  }

  getChildContext() {
    return {
      history: this._history,
      navigateToPreviousPage: () => {
        this.handleBackButtonClick()
      }
    }
  }

  handleBackButtonClick = () => {
    const oldPageIndex = this._history.pop()
    const newPageIndex = this._history[this._history.length - 1]
    this.props.onPageIndexChange(newPageIndex || 0, oldPageIndex)
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (
      nextProps &&
      typeof nextProps.activePageIndex === 'number' &&
      (this._history.length === 0 ||
        nextProps.activePageIndex !== this._history[this._history.length - 1])
    ) {
      this._history.push(nextProps.activePageIndex)
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this._timeouts.push(
      setTimeout(() => {
        !this.focused && this.focus()
      }, 0)
    )
    this.props.makeStyles()
  }

  componentWillUnmount() {
    this._timeouts.forEach(clearTimeout)
  }

  get focused() {
    return containsActiveElement(this._contentElement)
  }

  focus() {
    this._timeouts.push(
      setTimeout(() => {
        const activePage = this._activePage

        // Attempt to focus active page
        if (activePage && activePage.focusable) {
          activePage.focus()
        } else {
          // Use first tabbable as last ditch effort
          const tabbable = findTabbable(this._contentElement)
          const element = tabbable && tabbable[0]

          element && element.focus()
        }
      })
    )
  }

  get activePage() {
    const { activePageIndex, children } = this.props
    const pages = React.Children.toArray(children)
    const activePage =
      activePageIndex < pages.length ? pages[activePageIndex] : null

    error(activePage, '[Pages] Invalid `activePageIndex`.')

    return activePage
      ? safeCloneElement(activePage, {
          ref: (el) => {
            this._activePage = el
          }
        })
      : null
  }

  render() {
    return this.activePage ? (
      <View
        as="div"
        id={this._contentId}
        css={this.props.styles.pages}
        margin={this.props.margin}
        role="region"
        elementRef={(el) => {
          this._contentElement = el
        }}
      >
        {this.activePage}
      </View>
    ) : null
  }
}

export default Pages
export { Pages, Page }
