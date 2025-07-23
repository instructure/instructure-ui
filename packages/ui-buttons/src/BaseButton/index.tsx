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
import keycode from 'keycode'

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
import { isSafari } from '@instructure/ui-utils'

import { withStyle } from '@instructure/emotion'

import generateStyles from './styles'
import generateComponentTheme from './theme'

import { allowedProps } from './props'
import type { BaseButtonProps, BaseButtonStyleProps } from './props'

/**
---
category: components/utilities
---
**/

@withStyle(generateStyles, generateComponentTheme)
@testable()
class BaseButton extends Component<BaseButtonProps> {
  static readonly componentId = 'BaseButton'

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

  get makeStylesVariables(): BaseButtonStyleProps {
    return {
      isDisabled: this.isDisabled,
      hasOnlyIconVisible: this.hasOnlyIconVisible,
      isEnabled: this.isEnabled
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

  handleClick = (event: React.MouseEvent<ViewProps & Element>) => {
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

  handleKeyDown = (event: React.KeyboardEvent<ViewProps & Element>) => {
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
      withFocusOutline,
      ...props
    } = this.props

    const { isDisabled, isReadOnly, elementType } = this
    // only add 0 tabIndex value if it doesn't have it by default, see
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex
    let needsZeroTabIndex = true
    if (typeof elementType == 'string') {
      if (
        [
          'button',
          'frame',
          'iframe',
          'input',
          'object',
          'select',
          'textarea',
          'summary'
        ].includes(elementType)
      ) {
        needsZeroTabIndex = false
      }
      if (href && (elementType === 'a' || elementType === 'area')) {
        needsZeroTabIndex = false
      }
    }
    let tabIndexValue = tabIndex
    // In Safari, a button cannot get focus unless it has an explicit 0 tabindex
    if ((onClick && as && needsZeroTabIndex) || (isSafari() && as)) {
      tabIndexValue = tabIndex || 0
    }
    return (
      <View
        {...passthroughProps(props)}
        as={elementType}
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
        tabIndex={tabIndexValue}
        disabled={isDisabled || isReadOnly}
        css={styles?.baseButton}
        withFocusOutline={withFocusOutline}
      >
        <span css={styles?.content}>{this.renderChildren()}</span>
      </View>
    )
  }
}

export { BaseButton }
export default BaseButton
