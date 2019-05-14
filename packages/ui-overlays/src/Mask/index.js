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
import noScroll from 'no-scroll'

import { themeable } from '@instructure/ui-themeable'
import { ensureSingleChild , omitProps } from '@instructure/ui-react-utils'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components/utilities
---
**/
@themeable(theme, styles)
class Mask extends Component {
  static propTypes = {
    onDismiss: PropTypes.func,
    placement: PropTypes.oneOf(['top', 'center', 'bottom', 'stretch']),
    fullscreen: PropTypes.bool,
    children: PropTypes.node,
    onClick: PropTypes.func,
    elementRef: PropTypes.func
  }

  static defaultProps = {
    placement: 'center',
    fullscreen: false,
    onDismiss: undefined,
    children: null,
    onClick: undefined,
    elementRef: (el) => {}
  }

  componentDidMount () {
    if (this.props.fullscreen) {
      noScroll.on()
    }
  }

  componentWillUnmount () {
    if (this.props.fullscreen) {
      noScroll.off()
    }
  }

  handleElementRef = el => {
    this.props.elementRef(el)
  }

  contentRef = el => {
    this._content = el
  }

  render () {
    const content = ensureSingleChild(this.props.children, {
      ref: this.contentRef
    })

    const classes = classnames({
      [styles.root]: true,
      [styles[this.props.placement]]: true,
      [styles.fullscreen]: this.props.fullscreen
    })

    const props = {
      ...omitProps(this.props, Mask.propTypes),
      className: classes,
      ref: this.handleElementRef
    }

    if (typeof this.props.onClick === 'function') {
      props.onClick = this.props.onClick
      props.tabIndex = -1
    }

    return (
      <span {...props}>
        {content}
      </span>
    )
  }
}

export default Mask
export { Mask }
