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
import { passthroughProps, callRenderProp } from '@instructure/ui-react-utils'
import { IconAiColoredSolid } from '@instructure/ui-icons'

import { withStyleLegacy as withStyle } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { allowedProps } from './props'
import type { HeadingProps } from './props'
import { AsElementType } from '@instructure/shared-types'

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
class Heading extends Component<HeadingProps> {
  static readonly componentId = 'Heading'

  static allowedProps = allowedProps
  static defaultProps = {
    children: null,
    border: 'none',
    color: 'inherit'
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
    const { children, renderIcon, aiVariant } = this.props

    if (renderIcon && !aiVariant) {
      return (
        <span css={[this.props.styles?.withIcon]} aria-hidden="true">
          {callRenderProp(renderIcon)}&nbsp;{children}
        </span>
      )
    }
    if (aiVariant === 'stacked') {
      return (
        <span css={[this.props.styles?.withIcon]} aria-hidden="true">
          <span css={this.props.styles?.igniteAIStacked}>
            <IconAiColoredSolid />
            <span css={this.props.styles?.igniteAI}>IgniteAI</span>
          </span>
          {children}
        </span>
      )
    }
    if (aiVariant === 'horizontal') {
      return (
        <span css={this.props.styles?.withIcon} aria-hidden="true">
          <IconAiColoredSolid />
          <span css={this.props.styles?.igniteAI}>IgniteAI</span>
          {children}
        </span>
      )
    }
    if (aiVariant === 'iconOnly') {
      return (
        <span css={this.props.styles?.withIcon} aria-hidden="true">
          <IconAiColoredSolid />
          &nbsp;{children}
        </span>
      )
    }
    if (aiVariant === 'stacked') {
      return (
        <>
          <span css={this.props.styles?.igniteAIStacked}>
            <IconAiColoredSolid />
            <span css={this.props.styles?.igniteAI}>IgniteAI</span>
          </span>
          {children}
        </>
      )
    }
    if (aiVariant === 'horizontal') {
      return (
        <>
          <IconAiColoredSolid />
          <span css={this.props.styles?.igniteAI}>IgniteAI</span>
          {children}
        </>
      )
    }
    if (aiVariant === 'iconOnly') {
      return (
        <>
          <IconAiColoredSolid />
          &nbsp;{children}
        </>
      )
    }
    return children
  }

  //overriding default screen reader functionality is needed to read spans in h tags correctly
  getAriaLabel() {
    const { aiVariant, children, renderIcon } = this.props
    if (aiVariant === 'stacked' || aiVariant === 'horizontal') {
      return `IgniteAI, ${children}`
    }
    if (aiVariant === 'iconOnly' || renderIcon) {
      return `${children}`
    }
    return undefined
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

    let ElementType: AsElementType = 'h2'
    if (variant) {
      // TODO deprecated, remove. `variant` should not set DOM level
      if (level) {
        if (level === 'reset') {
          ElementType = 'span'
        } else {
          ElementType = level
        }
      } else {
        ElementType = variantLevels[variant]
      }
    } else if (props.as) {
      ElementType = props.as
    } else if (level) {
      if (level === 'reset') {
        ElementType = 'span'
      } else {
        ElementType = level
      }
    }
    return (
      <View
        aria-label={this.getAriaLabel()}
        {...passthroughProps(props)}
        css={this.props.styles?.heading}
        as={ElementType}
        elementRef={this.handleRef}
        margin={margin}
        data-cid="Heading"
      >
        {this.renderContent()}
      </View>
    )
  }
}

export default Heading
export { Heading }
