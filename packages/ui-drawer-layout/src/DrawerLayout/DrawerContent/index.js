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
import classnames from 'classnames'

import { debounce } from '@instructure/debounce'
import {
  addResizeListener,
  getBoundingClientRect
} from '@instructure/ui-dom-utils'
import { omitProps } from '@instructure/ui-react-utils'
import { themeable } from '@instructure/ui-themeable'
import { testable } from '@instructure/ui-testable'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: DrawerLayout
id: DrawerLayout.Content
---
**/
@testable()
@themeable(theme, styles)
class DrawerContent extends Component {
  static locatorAttribute = 'data-drawer-content'
  static propTypes = {
    label: PropTypes.string.isRequired,
    children: PropTypes.node,
    contentRef: PropTypes.func,
    /**
     * Callback fired whenever the `<DrawerLayout.Content />` changes size
     */
    onSizeChange: PropTypes.func,
    role: PropTypes.string
  }

  static defaultProps = {
    children: null,
    contentRef: (node) => {},
    onSizeChange: (size) => {},
    role: 'region'
  }

  state = {
    shouldTransition: false
  }

  _content = null
  _resizeListener = null
  _debounced = null
  _timeouts = []

  componentDidMount() {
    const rect = getBoundingClientRect(this._content)
    // set initial size
    this.props.onSizeChange({ width: rect.width, height: rect.height })
    // listen for changes to size
    this._debounced = debounce(this.props.onSizeChange, 100, {
      leading: false,
      trailing: true
    })
    this._resizeListener = addResizeListener(this._content, this._debounced)
  }

  componentDidUpdate() {
    this._timeouts.push(
      setTimeout(() => {
        this.setState({
          shouldTransition: true
        })
      })
    )
  }

  componentWillUnmount() {
    if (this._resizeListener) {
      this._resizeListener.remove()
    }

    if (this._debounced) {
      this._debounced.cancel()
    }

    this._timeouts.forEach((timeout) => {
      clearTimeout(timeout)
    })
  }

  handleContentRef = (node) => {
    if (typeof this.props.contentRef === 'function') {
      this._content = node
      this.props.contentRef(node)
    }
  }

  render() {
    const {
      style, // eslint-disable-line react/prop-types
      label,
      role
    } = this.props

    return (
      <div
        {...omitProps(this.props, DrawerContent.propTypes, [
          'shouldTransition'
        ])}
        role={role}
        style={style}
        ref={this.handleContentRef}
        aria-label={label}
        className={classnames({
          [styles.root]: true,
          [styles.transition]: this.state.shouldTransition
        })}
      >
        {this.props.children}
      </div>
    )
  }
}

export default DrawerContent
export { DrawerContent }
