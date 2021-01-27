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
import noScroll from 'no-scroll'
import { withStyle, jsx } from '@instructure/emotion'
import { ensureSingleChild, omitProps } from '@instructure/ui-react-utils'

import generateStyle from './styles'
import generateComponentTheme from './theme'

/**
---
category: components/utilities
---
**/
@withStyle(generateStyle, generateComponentTheme)
class Mask extends Component {
  static propTypes = {
    onDismiss: PropTypes.func,
    placement: PropTypes.oneOf(['top', 'center', 'bottom', 'stretch']),
    fullscreen: PropTypes.bool,
    children: PropTypes.node,
    onClick: PropTypes.func,
    elementRef: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object
  }

  static defaultProps = {
    placement: 'center',
    fullscreen: false,
    onDismiss: undefined,
    children: null,
    onClick: undefined,
    elementRef: (el) => {}
  }

  componentDidMount() {
    this.props.makeStyles()
    if (this.props.fullscreen) {
      noScroll.on()
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.makeStyles()
  }

  componentWillUnmount() {
    if (this.props.fullscreen) {
      noScroll.off()
    }
  }

  handleElementRef = (el) => {
    this.props.elementRef(el)
  }

  contentRef = (el) => {
    this._content = el
  }

  render() {
    const {
      styles,
      // eslint-disable-next-line react/prop-types
      themeOverride,
      ...restProps
    } = this.props

    const content = ensureSingleChild(this.props.children, {
      ref: this.contentRef
    })

    const props = {
      ...omitProps(restProps, Mask.propTypes),
      css: this.props.styles.mask,
      ref: this.handleElementRef
    }

    if (typeof this.props.onClick === 'function') {
      props.onClick = this.props.onClick
      props.tabIndex = -1
    }

    return <span {...props}>{content}</span>
  }
}

export default Mask
export { Mask }
