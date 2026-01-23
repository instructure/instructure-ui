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
import { passthroughProps } from '@instructure/ui-react-utils'
import { StarsInstUIIcon, renderIconWithProps } from '@instructure/ui-icons'

import { withStyle } from '@instructure/emotion'

import generateStyle from './styles'

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

const variantToIconSize: Record<
  NonNullable<HeadingProps['variant']>,
  'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
> = {
  titlePageDesktop: '2xl',
  titlePageMobile: 'xl',
  titleSection: 'xl',
  titleCardSection: 'xl',
  titleModule: 'xl',
  titleCardLarge: 'xl',
  titleCardRegular: 'lg',
  titleCardMini: 'md',
  label: 'md',
  labelInline: 'md'
}

const levelToIconSize: Record<
  Exclude<HeadingProps['level'], 'reset' | undefined>,
  'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
> = {
  h1: '2xl',
  h2: 'xl',
  h3: 'xl',
  h4: 'lg',
  h5: 'md',
  h6: 'md'
}

const variantToAIHorizontalIconSize: Record<
  NonNullable<HeadingProps['variant']>,
  'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
> = {
  titlePageDesktop: '2xl',
  titlePageMobile: 'xl',
  titleSection: 'xl',
  titleCardSection: 'xl',
  titleModule: 'md',
  titleCardLarge: 'md',
  titleCardRegular: 'md',
  titleCardMini: 'xs',
  label: 'xs',
  labelInline: 'xs'
}

const levelToAIHorizontalIconSize: Record<
  Exclude<HeadingProps['level'], 'reset' | undefined>,
  'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
> = {
  h1: '2xl',
  h2: 'lg',
  h3: 'md',
  h4: 'sm',
  h5: 'xs',
  h6: 'xs'
}

/**
---
category: components
---
**/
@withStyle(generateStyle)
class Heading extends Component<HeadingProps> {
  static readonly componentId = 'Heading'

  static allowedProps = allowedProps
  static defaultProps = {
    children: null,
    border: 'none',
    color: 'primary'
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

  getIconSize(forAIHorizontal = false) {
    const { variant, level, as } = this.props

    if (variant) {
      return forAIHorizontal
        ? variantToAIHorizontalIconSize[variant]
        : variantToIconSize[variant]
    }
    if (level && level !== 'reset') {
      return forAIHorizontal
        ? levelToAIHorizontalIconSize[level]
        : levelToIconSize[level]
    }
    if (
      as &&
      typeof as === 'string' &&
      ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(as)
    ) {
      const asLevel = as as Exclude<HeadingProps['level'], 'reset' | undefined>
      return forAIHorizontal
        ? levelToAIHorizontalIconSize[asLevel]
        : levelToIconSize[asLevel]
    }
    return 'md'
  }

  renderContent() {
    const { children, renderIcon, aiVariant } = this.props

    if (renderIcon && !aiVariant) {
      return (
        <span css={[this.props.styles?.withIcon]} aria-hidden="true">
          {renderIconWithProps(renderIcon, this.getIconSize(), 'inherit')}
          {children}
        </span>
      )
    }
    if (aiVariant === 'stacked') {
      return (
        <span css={[this.props.styles?.withIcon]} aria-hidden="true">
          <span css={this.props.styles?.igniteAIStacked}>
            <StarsInstUIIcon color="ai" size="sm" />
            <span css={this.props.styles?.igniteAI}>IgniteAI</span>
          </span>
          {children}
        </span>
      )
    }
    if (aiVariant === 'horizontal') {
      return (
        <span css={this.props.styles?.withIcon} aria-hidden="true">
          <span css={this.props.styles?.igniteAIHorizontal}>
            <StarsInstUIIcon color="ai" size={this.getIconSize(true)} />
            <span css={this.props.styles?.igniteAI}>IgniteAI</span>
          </span>
          {children}
        </span>
      )
    }
    if (aiVariant === 'iconOnly') {
      return (
        <span css={this.props.styles?.withIcon} aria-hidden="true">
          <StarsInstUIIcon color="ai" size={this.getIconSize(true)} />
          {children}
        </span>
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
