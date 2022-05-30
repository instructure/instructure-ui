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

import { testable } from '@instructure/ui-testable'
import { passthroughProps } from '@instructure/ui-react-utils'
import { withStyle, jsx } from '@instructure/emotion'
import { hexToRgb } from '@instructure/ui-color-utils/src/conversions'
import { isValid } from '@instructure/ui-color-utils/src/isValid'

import generateStyle from './styles'
import generateComponentTheme, { colorIndicatorBorderColor } from './theme'

import type { ColorIndicatorProps } from './props'
import { propTypes, allowedProps } from './props'

type RGBAType = {
  r: number
  g: number
  b: number
  a: number
}

/**
---
category: components
---
@tsProps
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class ColorIndicator extends Component<ColorIndicatorProps> {
  static propTypes = propTypes
  static allowedProps = allowedProps
  static readonly componentId = 'ColorIndicator'

  ref: Element | null = null

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  handleRef = (el: Element | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  calcBlendedColor = (c1: RGBAType, c2: RGBAType) => {
    // 0.4 as decided by design
    const c2Alpha = c2.a * 0.4
    const c1Alpha = 1 - c2Alpha
    const alpha = 1 - c1Alpha * (1 - c1Alpha)

    return `rgba(
      ${(c2.r * c2Alpha) / alpha + (c1.r * c1Alpha * (1 - c2Alpha)) / alpha},
      ${(c2.g * c2Alpha) / alpha + (c1.g * c1Alpha * (1 - c2Alpha)) / alpha},
      ${(c2.b * c2Alpha) / alpha + (c1.b * c1Alpha * (1 - c2Alpha)) / alpha},
      ${c2.a})`
  }
  render() {
    const { color, elementRef, ...props } = this.props

    return (
      <div
        {...passthroughProps(props)}
        ref={elementRef}
        css={this.props.styles?.colorIndicator}
        style={{
          borderColor: this.calcBlendedColor(
            hexToRgb(colorIndicatorBorderColor),
            hexToRgb(isValid(color) ? color : '#fff')
          )
        }}
      />
    )
  }
}

export default ColorIndicator
export { ColorIndicator }
