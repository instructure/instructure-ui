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

import { Component } from 'react'

import { passthroughProps, getElementType } from '@instructure/ui-react-utils'

import { withStyle } from '@instructure/emotion'
import generateStyle from './styles'
import generateComponentTheme from './theme'
import type { TextProps } from './props'
import { allowedProps } from './props'

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
class Text extends Component<TextProps> {
  static readonly componentId = 'Text'

  static allowedProps = allowedProps

  static defaultProps = {
    as: 'span',
    wrap: 'normal',
    size: 'medium',
    letterSpacing: 'normal',
    children: null
  } as const

  checkProps() {
    const { variant, lineHeight, weight, fontStyle } = this.props
    if (variant) {
      if (lineHeight) {
        console.warn("[Text]: Don't use 'lineHeight' with 'variant' ")
      }
      if (weight) {
        console.warn("[Text]: Don't use 'weight' with 'variant' ")
      }
      if (fontStyle) {
        console.warn("[Text]: Don't use 'fontStyle' with 'variant' ")
      }
    }
  }

  componentDidMount() {
    this.props.makeStyles?.()
    this.checkProps()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
    this.checkProps()
  }

  render() {
    const { children } = this.props

    const ElementType = getElementType(Text, this.props)

    return (
      <ElementType
        {...passthroughProps(this.props)}
        css={this.props.styles?.text}
        ref={this.props.elementRef}
      >
        {children}
      </ElementType>
    )
  }
}

export default Text
export { Text }
