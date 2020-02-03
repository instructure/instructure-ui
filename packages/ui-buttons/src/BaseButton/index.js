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

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import keycode from 'keycode'

import { testable } from '@instructure/ui-testable'
import { themeable, ThemeablePropTypes } from '@instructure/ui-themeable'
import { getElementType, getInteraction, passthroughProps, callRenderProp, experimental } from '@instructure/ui-react-utils'
import { isActiveElement } from '@instructure/ui-dom-utils'

import { hasVisibleChildren } from '@instructure/ui-a11y-utils'
import { View } from '@instructure/ui-view'
import { Flex } from '@instructure/ui-flex'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components/utilities
experimental: true
---
**/

@experimental()
@testable()
@themeable(theme, styles)
class BaseButton extends Component {
  static propTypes = {
    /**
     * Specifies the `Button` children.
     */
    children: PropTypes.node,
    /**
     * Specifies the type of the `Button`'s underlying html element.
     */
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    /**
     * The size of the `Button`
     */
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
     * Provides a reference to the `Button`'s underlying html element.
     */
    elementRef: PropTypes.func,
    /**
     * The element to render as the component root, `Button` by default.
     */
    as: PropTypes.elementType,
    /**
     * Specifies if interaction with the `Button` is enabled, disabled, or readonly.
     */
    interaction: PropTypes.oneOf(['enabled', 'disabled', 'readonly']),
    /**
     * Specifies the color for the `Button`.
     */
    color: PropTypes.oneOf([
      'primary',
      'primary-inverse',
      'secondary',
      'success',
      'danger'
    ]),
    /**
     * Override the `Button`'s default focus outline color.
     */
    focusColor: PropTypes.oneOf(['info', 'inverse']),
    /**
     * The `Button` display property. When set to `inline-block`, the `Button` displays inline with other elements.
     * When set to block, the `Button` expands to fill the width of the container.
     */
    display: PropTypes.oneOf(['inline-block', 'block']),
    /**
     * Sets the alignment of the `Button` children and/or icon.
     */
    textAlign: PropTypes.oneOf(['start', 'center']),
    /**
     * Specifies if the `Button` shape should be a circle or rectangle.
     */
    shape: PropTypes.oneOf([
      'rectangle',
      'circle'
    ]),
    /**
     * Specifies if the `Button` should render with a solid background. When false, the background is transparent.
     */
    withBackground: PropTypes.bool,
    /**
     * Specifies if the `Button` should render with a border.
     */
    withBorder: PropTypes.bool,
    /**
     * Designates if the `Button` should render without padding. This option should only be set when `withBorder` and
     * `withBackground` are also set to false.
     */
    isCondensed: PropTypes.bool,
    /**
     * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
     * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
     * familiar CSS-like shorthand. For example: `margin="small auto large"`.
     */
    margin: ThemeablePropTypes.spacing,
    /**
     * Specify a mouse cursor to use when hovering over the button.
     * The `pointer` cursor is used by default.
     */
    cursor: PropTypes.string,
    /**
     * Specifies an href attribute for the `Button`'s underlying html element.
     */
    href: PropTypes.string,
    /**
     * Callback fired when the `Button` is clicked.
     */
    onClick: PropTypes.func,
    /**
     * Callback fired when the `Button` receives a keydown event.
     */
    onKeyDown: PropTypes.func,
    /**
     * An icon, or function that returns an icon.
     */
    renderIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
     * Specifies the tabindex of the `Button`.
     */
    tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }

  static defaultProps = {
    children: null,
    type: 'button',
    size: 'medium',
    elementRef: (el) => { },
    as: 'button',
    // Leave interaction default undefined so that `disabled` and `readOnly` can also be supplied
    interaction: undefined,
    color: 'secondary',
    focusColor: undefined,
    shape: 'rectangle',
    display: 'inline-block',
    textAlign: 'start',
    withBackground: true,
    withBorder: true,
    isCondensed: false,
    margin: '0',
    cursor: 'pointer',
    href: undefined,
    onClick: undefined,
    onKeyDown: (event) => { },
    renderIcon: undefined,
    tabIndex: undefined
  }

  _rootElement = null

  get hasOnlyIconVisible () {
    const { children, renderIcon } = this.props
    return renderIcon && !hasVisibleChildren(children)
  }

  get elementType () {
    return getElementType(BaseButton, this.props)
  }

  get interaction () {
    return getInteraction({ props: this.props })
  }

  get focusColor() {
    const {
      color,
      focusColor,
      withBackground
    } = this.props

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

    return color.includes('inverse') ? 'inverse' : 'info'
  }

  get focused () {
    return isActiveElement(this._rootElement)
  }

  focus () {
    this._rootElement && this._rootElement.focus()
  }

  handleElementRef = (el) => {
    this._rootElement = el
    this.props.elementRef(el)
  }

  handleClick = (event) => {
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

  handleKeyDown = event => {
    const { onClick, onKeyDown, href } = this.props
    const { interaction } = this

    onKeyDown(event)

    // behave like a button when space key is pressed
    const { space, enter } = keycode.codes

    if (this.elementType !== 'button' && [space, enter].includes(event.keyCode)) {
      event.preventDefault()
      event.stopPropagation()

      if (typeof onClick === 'function' && interaction === 'enabled') {
        onClick(event)
      }

      if (href) {
        this._rootElement && this._rootElement.click()
      }
    }
  }

  renderChildren() {
    const {
      renderIcon,
      children,
      textAlign,
      isCondensed
    } = this.props

    const wrappedChildren = <span className={styles.children}>{children}</span>

    if (!renderIcon) {
      return wrappedChildren
    }

    const { hasOnlyIconVisible } = this
    const wrappedIcon = <span className={styles.iconSVG}>{callRenderProp(renderIcon)}</span>

    const flexChildren = hasOnlyIconVisible ? <Flex.Item>{wrappedIcon}{children}</Flex.Item> : [
      <Flex.Item key="icon" padding={`0 ${isCondensed ? 'xx-small' : 'x-small'} 0 0`}>{wrappedIcon}</Flex.Item>,
      <Flex.Item key="children" shouldShrink>{wrappedChildren}</Flex.Item>
    ]

    const flexProps = {
      shouldShrink: true,
      height: '100%',
      width: '100%',
      justifyItems: (hasOnlyIconVisible || textAlign === 'center') ? 'center' : 'start'
    }

    return <Flex {...flexProps}>{flexChildren}</Flex>
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
      ...props
    } = this.props

    const { interaction } = this
    const isDisabled = interaction === 'disabled'
    const isReadOnly = interaction === 'readonly'
    const isEnabled = interaction === 'enabled'

    const { hasOnlyIconVisible } = this

    const classes = classnames({
      [styles.content]: true,
      [styles[`size--${size}`]]: true,
      [styles[`color--${color}`]]: true,
      [styles[`textAlign--${textAlign}`]]: true,
      [styles[`shape--${shape}`]]: true,
      [styles.withBackground]: withBackground,
      [styles.withoutBackground]: !withBackground,
      [styles.isCondensed]: isCondensed,
      [styles.withBorder]: withBorder,
      [styles.withoutBorder]: !withBorder,
      [styles.hasOnlyIconVisible]: hasOnlyIconVisible,
      [styles.isDisabled]: isDisabled
    })

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
        type={href ? null : type}
        elementRef={this.handleElementRef}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        role={onClick && as !== 'button' ? 'button' : null}
        tabIndex={onClick && as ? (tabIndex || '0') : tabIndex}
        disabled={isDisabled || isReadOnly}
        // TODO: Eventually remove classname. That will involve figuring out where the button reset should live, as well
        // as creating a selector for the active and hover states
        className={isEnabled ? styles.root : null}
      >
        <span className={classes}>
          {this.renderChildren()}
        </span>
      </View>
    )
  }
}

export { BaseButton }
export default BaseButton
