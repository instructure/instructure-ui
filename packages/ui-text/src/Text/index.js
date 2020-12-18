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

import { passthroughProps, getElementType } from '@instructure/ui-react-utils'

import { withStyle, jsx } from '@instructure/emotion'
import generateStyle from './styles'

/**
---
category: components
---
**/
@withStyle(generateStyle)
class Text extends Component {
  static propTypes = {
    /**
     * the element type to render as
     */
    as: PropTypes.elementType,
    children: PropTypes.node,
    /**
     * Color of the text
     */
    color: PropTypes.oneOf([
      'primary',
      'secondary',
      'brand',
      'success',
      'warning',
      'danger',
      'alert',
      'primary-inverse',
      'secondary-inverse'
    ]),
    elementRef: PropTypes.func,
    fontStyle: PropTypes.oneOf(['italic', 'normal']),
    letterSpacing: PropTypes.oneOf(['normal', 'condensed', 'expanded']),
    lineHeight: PropTypes.oneOf(['default', 'fit', 'condensed', 'double']),
    size: PropTypes.oneOf([
      'x-small',
      'small',
      'medium',
      'large',
      'x-large',
      'xx-large'
    ]),
    transform: PropTypes.oneOf([
      'none',
      'capitalize',
      'uppercase',
      'lowercase'
    ]),
    weight: PropTypes.oneOf(['normal', 'light', 'bold']),
    wrap: PropTypes.oneOf(['normal', 'break-word']),
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object
  }

  static defaultProps = {
    as: 'span',
    wrap: 'normal',
    size: 'medium',
    letterSpacing: 'normal',
    children: null,
    elementRef: undefined,
    color: undefined,
    transform: undefined,
    lineHeight: undefined,
    fontStyle: undefined,
    weight: undefined
  }

  componentDidMount() {
    this.props.makeStyles()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.makeStyles()
  }

  render() {
    const { children } = this.props

    const ElementType = getElementType(Text, this.props)

    return (
      <ElementType
        {...passthroughProps(this.props)}
        css={this.props.styles.text}
        ref={this.props.elementRef}
      >
        {children}
      </ElementType>
    )
  }
}

export default Text
export { Text }
