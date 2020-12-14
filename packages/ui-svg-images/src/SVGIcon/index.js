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
import { Component } from 'react'
import PropTypes from 'prop-types'

import { testable } from '@instructure/ui-testable'

import { InlineSVG } from '../InlineSVG'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyles from './styles'

/**
---
category: components/utilities
---
**/
@withStyle(generateStyles)
@testable()
class SVGIcon extends Component {
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    ...InlineSVG.propTypes,
    rotate: PropTypes.oneOf(['0', '90', '180', '270']),
    size: PropTypes.oneOf(['x-small', 'small', 'medium', 'large', 'x-large']),
    bidirectional: PropTypes.bool
  }

  static defaultProps = {
    rotate: '0',
    bidirectional: false,
    size: undefined
  }

  componentDidMount() {
    this.props.makeStyles()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.makeStyles()
  }

  render() {
    const {
      rotate,
      className,
      size,
      bidirectional,
      // 'makeStyles' and 'styles' need to be added here,
      // so it won't be passed to InlineSVG via '...props'
      makeStyles,
      styles,
      ...props
    } = this.props

    return (
      <InlineSVG
        {...props}
        rotate={rotate}
        css={styles.svgIcon}
        className={className}
      />
    )
  }
}

export default SVGIcon
export { SVGIcon }
