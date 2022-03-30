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
import React, { Component } from 'react'

import { logError as error } from '@instructure/console'
import {
  callRenderProp,
  getElementType,
  matchComponentTypes,
  passthroughProps
} from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'

import { View } from '@instructure/ui-view'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'
import type { ScreenReaderContentProps } from '@instructure/ui-a11y-content'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'
import type { AppNavItemProps } from './props'
import { allowedProps, propTypes } from './props'
import type { ViewOwnProps } from '@instructure/ui-view'
/**
---
parent: AppNav
id: AppNav.Item
---
@tsProps
@module Item
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class Item extends Component<AppNavItemProps> {
  static readonly componentId = 'AppNav.Item'

  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {
    children: null,
    onClick: function (_event: React.MouseEvent<Element>) {},
    isSelected: false,
    cursor: 'pointer',
    isDisabled: false
  } as const

  ref: Element | null = null
  handleFocus?: React.FocusEventHandler<ViewOwnProps>
  handleBlur?: React.FocusEventHandler<ViewOwnProps>

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

  handleClick = (e: React.MouseEvent<Element>) => {
    const { isDisabled, onClick } = this.props

    if (isDisabled) {
      e.preventDefault()
      e.stopPropagation()
    } else if (typeof onClick === 'function') {
      onClick(e)
    }
  }

  render() {
    const ElementType = getElementType(Item, this.props)

    const { renderIcon, renderLabel, href, renderAfter, cursor, isDisabled } =
      this.props

    const icon = callRenderProp(renderIcon)
    const label = callRenderProp(renderLabel)

    const labelIsForScreenReaders = matchComponentTypes<
      React.ComponentElement<ScreenReaderContentProps, ScreenReaderContent>
    >(label, [ScreenReaderContent])

    if (icon) {
      error(
        labelIsForScreenReaders,
        '[AppNav] If an icon is used, the label text should be wrapped in <ScreenReaderContent />.'
      )
    }

    return (
      <View
        {...passthroughProps(this.props)}
        as={ElementType}
        href={href}
        onClick={this.handleClick}
        disabled={isDisabled}
        elementRef={this.handleRef}
        display="flex"
        position="relative"
        borderRadius="medium"
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        cursor={isDisabled ? 'not-allowed' : cursor}
        css={this.props.styles?.item}
      >
        {icon}
        {labelIsForScreenReaders ? (
          label
        ) : (
          <span css={this.props.styles?.label}>{label}</span>
        )}
        {renderAfter && callRenderProp(renderAfter)}
      </View>
    )
  }
}

export default Item
export { Item }
