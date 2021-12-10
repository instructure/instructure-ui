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
import keycode from 'keycode'

import { warn } from '@instructure/console'
import { testable } from '@instructure/ui-testable'
import {
  getElementType,
  getInteraction,
  passthroughProps,
  callRenderProp
} from '@instructure/ui-react-utils'
import { isActiveElement } from '@instructure/ui-dom-utils'
import { hasVisibleChildren } from '@instructure/ui-a11y-utils'
import { View } from '@instructure/ui-view'
import type { ViewProps } from '@instructure/ui-view'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyles from './styles'
import generateComponentTheme from './theme'

import { propTypes, allowedProps } from './props'
import type { BaseButtonProps, BaseButtonStyleProps } from './props'

/**
---
category: components/utilities
---
@tsProps
**/

@withStyle(generateStyles, generateComponentTheme)
@testable()
class BaseButton extends Component<BaseButtonProps> {
  static readonly componentId = 'BaseButton'

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    type: 'button',
    size: 'medium',
    as: 'button',
    // Leave interaction default undefined so that `disabled` and `readOnly` can also be supplied
    interaction: undefined,
    color: 'secondary',
    shape: 'rectangle',
    display: 'inline-block',
    textAlign: 'start',
    withBackground: true,
    withBorder: true,
    isCondensed: false,
    margin: '0',
    cursor: 'pointer'
  } as const

  ref: Element | null = null

  componentDidMount() {
    this.props.makeStyles?.(this.makeStylesVariables)
  }

  componentDidUpdate() {
    this.props.makeStyles?.(this.makeStylesVariables)
  }

  get _rootElement() {
    console.warn(
      '_rootElement property is deprecated and will be removed in v9, please use ref instead'
    )

    return this.ref
  }

  get makeStylesVariables(): BaseButtonStyleProps {
    return {
      isDisabled: this.isDisabled,
      hasOnlyIconVisible: this.hasOnlyIconVisible
    }
  }

  get hasOnlyIconVisible() {
    const { children, renderIcon } = this.props
    return !!(renderIcon && !hasVisibleChildren(children))
  }

  get elementType() {
    return getElementType(BaseButton, this.props)
  }

  get interaction() {
    return getInteraction({ props: this.props })
  }

  get isDisabled() {
    return this.interaction === 'disabled'
  }

  get isReadOnly() {
    return this.interaction === 'readonly'
  }

  get isEnabled() {
    return this.interaction === 'enabled'
  }

  // TODO: delete once the type of tabIndex is changed to number only
  get tabIndex() {
    const { tabIndex } = this.props

    if (typeof tabIndex === 'string') {
      warn(
        false,
        'The `string` value for `tabIndex` is deprecated. Only `number` type will be accepted from V9.0.0.'
      )
      return parseInt(tabIndex)
    }
    return tabIndex
  }

  get focusColor() {
    const { color, focusColor, withBackground } = this.props

    // Give user specified focusColor preference
    if (focusColor) {
      return focusColor
    }

    // The `primary-inverse` background has an info focus outline
    // by default since it is replacing the `light` button variant.
    // Override the focus color with info even though it is
    // an inverse color
    if (color === 'primary-inverse' && withBackground) {
      return 'info'
    }

    return color!.includes('inverse') ? 'inverse' : 'info'
  }

  get focused() {
    return isActiveElement(this.ref)
  }

  focus() {
    this.ref && (this.ref as HTMLElement).focus()
  }

  handleElementRef = (el: Element | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  handleClick = (event: React.MouseEvent<ViewProps>) => {
    const { onClick } = this.props
    const { interaction } = this

    if (interaction !== 'enabled') {
      event.preventDefault()
      event.stopPropagation()
      return
    }

    if (typeof onClick === 'function') {
      onClick(event)
    }
  }

  handleKeyDown = (event: React.KeyboardEvent<ViewProps>) => {
    const { onClick, onKeyDown, href } = this.props
    const { interaction } = this

    if (typeof onKeyDown === 'function') {
      onKeyDown(event)
    }

    // behave like a button when space key is pressed
    const { space, enter } = keycode.codes

    if (
      this.elementType !== 'button' &&
      [space, enter].includes(event.keyCode)
    ) {
      event.preventDefault()
      event.stopPropagation()

      if (typeof onClick === 'function' && interaction === 'enabled') {
        onClick(event)
      }

      if (href) {
        this.ref && (this.ref as HTMLElement).click()
      }
    }
  }

  renderChildren() {
    const { renderIcon, children, styles } = this.props

    const wrappedChildren = <span css={styles?.children}>{children}</span>

    if (!renderIcon) {
      return wrappedChildren
    }

    const { hasOnlyIconVisible } = this
    const wrappedIcon = (
      <span css={styles?.iconSVG}>{callRenderProp(renderIcon)}</span>
    )

    const flexChildren = hasOnlyIconVisible ? (
      <span css={styles?.iconOnly}>
        {wrappedIcon}
        {children}
      </span>
    ) : (
      [
        <span key="icon" css={styles?.iconWrapper}>
          {wrappedIcon}
        </span>,
        <span key="children" css={styles?.childrenWrapper}>
          {wrappedChildren}
        </span>
      ]
    )
    return <span css={styles?.childrenLayout}>{flexChildren}</span>
  }

  render() {
    const {
      type,
      size,
      elementRef,
      as,
      href,
      color,
      focusColor,
      textAlign,
      shape,
      display,
      withBackground,
      withBorder,
      isCondensed,
      margin,
      cursor,
      onClick,
      renderIcon,
      tabIndex,
      styles,
      makeStyles,
      ...props
    } = this.props

    const { isDisabled, isEnabled, isReadOnly } = this

    const tabIndexNumber = this.tabIndex

    return (
      <View
        {...passthroughProps(props)}
        as={this.elementType}
        focusColor={this.focusColor}
        position="relative"
        display={display}
        width={display === 'block' ? '100%' : 'auto'}
        borderRadius={shape === 'circle' ? 'circle' : 'medium'}
        background="transparent"
        padding="none"
        borderWidth="none"
        margin={margin}
        cursor={isDisabled ? 'not-allowed' : cursor}
        href={href}
        type={href ? undefined : type}
        elementRef={this.handleElementRef}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        role={onClick && as !== 'button' ? 'button' : undefined}
        tabIndex={onClick && as ? tabIndexNumber || 0 : tabIndexNumber}
        disabled={isDisabled || isReadOnly}
        css={isEnabled ? styles?.baseButton : null}
      >
        <span css={styles?.content}>{this.renderChildren()}</span>
      </View>
    )
  }
}

export { BaseButton }
export default BaseButton
