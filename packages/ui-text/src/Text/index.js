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

//  TODO: remove color comment description once the error color is removed

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { themeable } from '@instructure/ui-themeable'
import {
  passthroughProps,
  getElementType,
  deprecated
} from '@instructure/ui-react-utils'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
---
**/

@themeable(theme, styles)
class Text extends Component {
  static propTypes = {
    /**
     * the element type to render as
     */
    as: PropTypes.elementType,
    children: PropTypes.node,
    /**
     * One of: primary, secondary, brand, success, warning, danger, alert, primary-inverse, secondary-inverse
     */
    color: deprecated.deprecatePropValues(
      PropTypes.oneOf([
        'primary',
        'secondary',
        'brand',
        'success',
        'warning',
        'error',
        'danger',
        'alert',
        'primary-inverse',
        'secondary-inverse'
      ]),
      ['error'],
      'It will be removed in version 8.0.0. Use `danger` instead.'
    ),
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
    wrap: PropTypes.oneOf(['normal', 'break-word'])
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

  render() {
    const {
      wrap,
      weight,
      fontStyle,
      size,
      lineHeight,
      letterSpacing,
      transform,
      color,
      children
    } = this.props

    const ElementType = getElementType(Text, this.props)

    return (
      <ElementType
        {...passthroughProps(this.props)}
        className={classnames({
          [styles.root]: true,
          [styles[size]]: size,
          [styles[`wrap-${wrap}`]]: wrap,
          [styles[`weight-${weight}`]]: weight,
          [styles[`style-${fontStyle}`]]: fontStyle,
          [styles[`transform-${transform}`]]: transform,
          [styles[`lineHeight-${lineHeight}`]]: lineHeight,
          [styles[`letterSpacing-${letterSpacing}`]]: letterSpacing,
          [styles[`color-${color}`]]: color
        })}
        ref={this.props.elementRef}
      >
        {children}
      </ElementType>
    )
  }
}

export default Text
export { Text }
