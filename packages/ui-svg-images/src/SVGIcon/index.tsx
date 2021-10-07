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
import { Component, ReactInstance } from 'react'

import { testable } from '@instructure/ui-testable'

import { InlineSVG } from '../InlineSVG'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'
import type { SVGIconProps } from './props'
import { allowedProps, propTypes } from './props'

/**
---
category: components/utilities
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class SVGIcon extends Component<SVGIconProps> {
  static readonly componentId = 'SVGIcon'

  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {
    rotate: '0',
    bidirectional: false
  }

  ref: ReactInstance | null = null

  handleRef = (el: Element | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
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
      themeOverride,
      ...props
    } = this.props

    return (
      <InlineSVG
        {...props}
        themeOverride={themeOverride}
        rotate={rotate}
        css={styles?.svgIcon}
        className={className}
        elementRef={this.handleRef}
      />
    )
  }
}

export default SVGIcon
export { SVGIcon }
