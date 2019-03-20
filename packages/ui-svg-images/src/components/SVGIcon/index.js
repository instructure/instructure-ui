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
import testable from '@instructure/ui-testable'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components/utilities
---
**/
@testable()
@themeable(theme, styles)
@deprecated('5.0.0', {
  width: 'size',
  height: 'size'
})
class SVGIcon extends Component {
  static propTypes = {
    ...InlineSVG.propTypes,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    rotate: PropTypes.oneOf(['0', '90', '180', '270']),
    size: PropTypes.oneOf([
      'x-small',
      'small',
      'medium',
      'large',
      'x-large'
    ]),
    bidirectional: PropTypes.bool
  }

  static defaultProps = {
    rotate: '0',
    bidirectional: false,
    width: undefined,
    height: undefined,
    size: undefined
  }

  render () {
    const {
      rotate,
      className,
      size,
      bidirectional,
      ...props
    } = this.props

    return (
      <InlineSVG
        {...props}
        rotate={rotate}
        className={classnames({
          [styles.root]: true,
          [styles[`rotate--${rotate}`]]: rotate && rotate !== '0',
          [styles[`size--${size}`]]: size,
          [styles.bidirectional]: bidirectional,
          [className]: className
        })}
      />
    )
  }
}

export default SVGIcon
