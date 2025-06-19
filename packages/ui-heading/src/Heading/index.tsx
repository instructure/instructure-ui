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

import { View } from '@instructure/ui-view'
import {
  getElementType,
  passthroughProps,
  callRenderProp
} from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'

import { withStyle } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { propTypes, allowedProps } from './props'
import type { HeadingProps } from './props'

const variantLevels: Record<
  NonNullable<HeadingProps['variant']>,
  'h1' | 'h2' | 'h3' | 'h4' | 'h5'
> = {
  titlePageDesktop: 'h1',
  titlePageMobile: 'h1',
  titleSection: 'h2',
  titleCardSection: 'h2',
  titleModule: 'h3',
  titleCardLarge: 'h4',
  titleCardRegular: 'h4',
  titleCardMini: 'h4',
  label: 'h5',
  labelInline: 'h5'
}

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class Heading extends Component<HeadingProps> {
  static readonly componentId = 'Heading'

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    children: null,
    border: 'none',
    color: 'inherit',
    level: 'h2'
  } as const

  ref: Element | null = null

  handleRef = (el: Element | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  checkProps() {
    const { variant, as } = this.props
    if (variant) {
      if (as) {
        console.warn("[Heading]: Don't use 'as' with 'variant' ")
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

  renderContent() {
    const { children, renderIcon } = this.props

    if (renderIcon) {
      return (
        <>
          {callRenderProp(renderIcon)}&nbsp;{children}
        </>
      )
    }
    return children
  }

  render() {
    const {
      border,
      children,
      color,
      level,
      margin,
      elementRef,
      makeStyles,
      variant,
      ...props
    } = this.props

    const propsForGetElementType = variant ? {} : this.props

    const ElementType = getElementType(Heading, propsForGetElementType, () => {
      if (level === 'reset') {
        return 'span'
      } else if (level) {
        return level
      }

      if (variant) {
        return variantLevels[variant]
      } else {
        return 'span'
      }
    })

    return (
      <View
        {...passthroughProps(props)}
        css={this.props.styles?.heading}
        as={ElementType}
        elementRef={this.handleRef}
        margin={margin}
      >
        {this.renderContent()}
      </View>
    )
  }
}

export default Heading
export { Heading }
