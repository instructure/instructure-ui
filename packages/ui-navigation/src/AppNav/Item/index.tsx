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
import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'
import type { AppNavItemProps } from './props'
import { allowedProps, propTypes } from './props'

/**
---
parent: AppNav
id: AppNav.Item
---
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
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onClick: function (event) {},
    isSelected: false,
    cursor: 'pointer',
    isDisabled: false
  } as const

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

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
  handleClick = (e) => {
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

    const {
      renderIcon,
      renderLabel,
      href,
      renderAfter,
      cursor,
      isDisabled
    } = this.props

    const icon = callRenderProp(renderIcon)
    const label = callRenderProp(renderLabel)

    const labelIsForScreenReaders = matchComponentTypes(label, [
      ScreenReaderContent
    ])

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
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleFocus' does not exist on type 'Ite... Remove this comment to see the full error message
        onFocus={this.handleFocus}
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleBlur' does not exist on type 'Item... Remove this comment to see the full error message
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
