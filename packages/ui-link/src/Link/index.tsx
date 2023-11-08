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

import { View } from '@instructure/ui-view'
import { hasVisibleChildren } from '@instructure/ui-a11y-utils'
import { isActiveElement, findFocusable } from '@instructure/ui-dom-utils'
import {
  getElementType,
  getInteraction,
  matchComponentTypes,
  passthroughProps,
  callRenderProp
} from '@instructure/ui-react-utils'
import { logWarn as warn } from '@instructure/console'
import { testable } from '@instructure/ui-testable'

import { withStyle, jsx } from '@instructure/emotion'
import generateStyle from './styles'
import generateComponentTheme from './theme'

import { propTypes, allowedProps } from './props'
import type { LinkProps, LinkState, LinkStyleProps } from './props'

import type { ViewOwnProps } from '@instructure/ui-view'

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class Link extends Component<LinkProps, LinkState> {
  static readonly componentId = 'Link'

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    // Leave interaction default undefined so that `disabled` can also be supplied
    interaction: undefined,
    color: 'link',
    iconPlacement: 'start',
    isWithinText: true,
    forceButtonRole: true
  } as const

  state = { hasFocus: false }

  get _link() {
    console.warn(
      '_link property is deprecated and will be removed in v9, please use ref instead'
    )

    return this.ref
  }
  ref: Element | null = null

  componentDidMount() {
    this.props.makeStyles?.(this.makeStyleProps())
  }

  componentDidUpdate() {
    this.props.makeStyles?.(this.makeStyleProps())
  }

  makeStyleProps = (): LinkStyleProps => {
    return {
      containsTruncateText: this.containsTruncateText,
      hasVisibleChildren: this.hasVisibleChildren
    }
  }

  handleElementRef = (el: Element | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  handleClick: React.MouseEventHandler<ViewOwnProps> = (event) => {
    const { onClick } = this.props
    const { interaction } = this

    if (interaction === 'disabled') {
      event.preventDefault()
      event.stopPropagation()
    } else if (typeof onClick === 'function') {
      onClick(event)
    }
  }

  handleFocus: React.FocusEventHandler<ViewOwnProps> = (event) => {
    this.setState({ hasFocus: true })
    if (typeof this.props.onFocus === 'function') {
      this.props.onFocus(event)
    }
  }

  handleBlur: React.FocusEventHandler<ViewOwnProps> = (event) => {
    this.setState({ hasFocus: false })
    if (typeof this.props.onBlur === 'function') {
      this.props.onBlur(event)
    }
  }

  get containsTruncateText() {
    let truncateText = false

    React.Children.forEach(this.props.children, (child) => {
      if (child && matchComponentTypes(child, ['TruncateText'])) {
        truncateText = true
      }
    })

    warn(
      // if display prop is used, warn about icon or TruncateText
      !truncateText || this.props.display === undefined,
      '[Link] Using the display property with TruncateText may cause layout issues.'
    )

    return truncateText
  }

  get display() {
    if (this.props.display) {
      return this.props.display // user-entered display property
    }

    const { containsTruncateText } = this

    if (this.props.renderIcon) {
      return containsTruncateText ? 'inline-flex' : 'inline-block'
    } else {
      return containsTruncateText ? 'block' : 'auto'
    }
  }

  get interaction() {
    return getInteraction({ props: this.props, interactionTypes: ['disabled'] })
  }

  get element() {
    return getElementType(Link, this.props)
  }

  get focused() {
    return isActiveElement(this.ref)
  }

  get focusable() {
    return findFocusable(this.ref)
  }

  get hasVisibleChildren() {
    return hasVisibleChildren(this.props.children)
  }

  get role() {
    const { role, forceButtonRole, onClick } = this.props

    if (forceButtonRole) {
      return onClick && this.element !== 'button' ? 'button' : role
    }

    return role
  }

  focus() {
    this.ref && (this.ref as HTMLElement).focus()
  }

  renderIcon() {
    warn(
      // if display prop is used, warn about icon or TruncateText
      this.props.display === undefined,
      '[Link] Using the display property with an icon may cause layout issues.'
    )
    return (
      <span css={this.props.styles?.icon}>
        {callRenderProp(this.props.renderIcon)}
      </span>
    )
  }

  render() {
    const {
      children,
      onClick,
      onMouseEnter,
      color,
      href,
      margin,
      renderIcon,
      iconPlacement,
      isWithinText,
      ...props
    } = this.props

    const { interaction } = this

    const isDisabled = interaction === 'disabled'

    const type =
      this.element === 'button' || this.element === 'input'
        ? 'button'
        : undefined

    const tabIndex = this.role === 'button' && !isDisabled ? 0 : undefined

    return (
      <View
        {...passthroughProps(props)}
        elementRef={this.handleElementRef}
        as={this.element}
        display={this.display}
        margin={margin}
        href={href}
        onMouseEnter={onMouseEnter}
        onClick={this.handleClick}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        aria-disabled={isDisabled ? 'true' : undefined}
        role={this.role}
        type={type}
        tabIndex={tabIndex}
        css={this.props.styles?.link}
      >
        {renderIcon && iconPlacement === 'start' && this.renderIcon()}
        {children}
        {renderIcon && iconPlacement === 'end' && this.renderIcon()}
      </View>
    )
  }
}

export default Link
export { Link }
