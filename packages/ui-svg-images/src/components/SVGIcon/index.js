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
import deprecated from '@instructure/ui-utils/lib/react/deprecated'

import InlineSVG from '../InlineSVG'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components/utilities
---
**/
@themeable(theme, styles)
@deprecated('5.0.0', {
  width: 'size',
  height: 'size'
})
class SVGIcon extends Component {
  static propTypes = {
    ...InlineSVG.propTypes,
    width: PropTypes.string,
    height: PropTypes.string,
    rotate: PropTypes.oneOf(['0', '90', '180', '270']),
    size: PropTypes.oneOf([undefined, 'x-small', 'small', 'medium', 'large', 'x-large'])
  }

  static defaultProps = {
    rotate: '0',
    size: undefined
  }

  render () {
    const {
      width,
      height,
      rotate,
      className,
      size,
      style, // eslint-disable-line react/prop-types
      ...props
    } = this.props

    const classes = {
      [styles.root]: true,
      [styles[`rotate--${rotate}`]]: rotate && rotate !== '0',
      [styles[`size--${size}`]]: size,
      [className]: className
    }

    return (
      <InlineSVG
        {...props}
        style={{ ...style, width, height }}
        width={width || '1em'}
        height={height || '1em'}
        rotate={rotate}
        className={classnames(classes)}
      />
    )
  }
}

export default SVGIcon
