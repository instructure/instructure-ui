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

import themeable from '@instructure/ui-themeable'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import getElementType from '@instructure/ui-utils/lib/react/getElementType'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components/typography
---
**/
@themeable(theme, styles)
export default class Text extends Component {
  static propTypes = {
    /**
    * the element type to render as
    */
    as: CustomPropTypes.elementType,
    weight: PropTypes.oneOf([
      'normal',
      'light',
      'bold'
    ]),
    fontStyle: PropTypes.oneOf([
      'italic',
      'normal'
    ]),
    size: PropTypes.oneOf([
      'x-small',
      'small',
      'medium',
      'large',
      'x-large',
      'xx-large'
    ]),
    lineHeight: PropTypes.oneOf([
      'default',
      'fit',
      'condensed',
      'double'
    ]),
    letterSpacing: PropTypes.oneOf([
      'normal',
      'condensed',
      'expanded'
    ]),
    transform: PropTypes.oneOf([
      'none',
      'capitalize',
      'uppercase',
      'lowercase'
    ]),
    color: PropTypes.oneOf([
      'primary',
      'secondary',
      'primary-inverse',
      'secondary-inverse',
      'success',
      'error',
      'warning',
      'brand'
    ]),
    children: PropTypes.node
  }

  static defaultProps = {
    as: 'span',
    size: 'medium',
    letterSpacing: 'normal'
  }

  render() {
    const {
      as,
      weight,
      fontStyle,
      size,
      lineHeight,
      letterSpacing,
      transform,
      color,
      children,
      ...propsToPassThrough
    } = this.props

    const ElementType = getElementType(Text, this.props)

    return (
      <ElementType
        {...propsToPassThrough}
        className={classnames({
          [styles.root]: true,
          [styles[size]]: size,
          [styles[`weight-${weight}`]]: weight,
          [styles[`style-${fontStyle}`]]: fontStyle,
          [styles[`transform-${transform}`]]: transform,
          [styles[`lineHeight-${lineHeight}`]]: lineHeight,
          [styles[`letterSpacing-${letterSpacing}`]]: letterSpacing,
          [styles[`color-${color}`]]: color
        })}
      >
        {children}
      </ElementType>
    )
  }
}
