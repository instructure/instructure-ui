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

import { testable } from '@instructure/ui-testable'
import { themeable, ThemeablePropTypes } from '@instructure/ui-themeable'
import { getInteraction, passthroughProps } from '@instructure/ui-react-utils'

import { BaseButton } from '../BaseButton'

import { themeAdapter } from './themeAdapter'

import theme from './theme'

/**
---
category: components
---
**/
@testable()
@themeable(theme, null, themeAdapter)
class Button extends Component {
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
     * Specifies if the `Button` should render with a solid background. When false, the background is transparent.
     */
    withBackground: PropTypes.bool,
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
     * An icon, or function that returns an icon.
     */
    renderIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
  }

  static defaultProps = {
    children: null,
    type: 'button',
    size: 'medium',
    elementRef: (el) => {},
    as: 'button',
    // Leave interaction default undefined so that `disabled` and `readOnly` can also be supplied
    interaction: undefined,
    color: 'secondary',
    focusColor: undefined,
    display: 'inline-block',
    textAlign: 'center',
    withBackground: true,
    margin: '0',
    cursor: 'pointer',
    href: undefined,
    renderIcon: undefined
  }

  _buttonComponent = null

  get focused() {
    return this._buttonComponent && this._buttonComponent.focused
  }

  focus() {
    this._buttonComponent && this._buttonComponent.focus()
  }

  handleElementRef = (el) => {
    const { elementRef } = this.props

    elementRef(el)
  }

  handleButtonRef = (component) => {
    this._buttonComponent = component
  }

  render() {
    const {
      children,
      type,
      size,
      as,
      color,
      focusColor,
      display,
      textAlign,
      withBackground,
      margin,
      cursor,
      href,
      renderIcon,
      ...props
    } = this.props

    const interaction = getInteraction({ props })

    // eslint-disable-next-line react/prop-types
    const themeOverride = this.props.themeOverride

    const buttonProps = {
      ...passthroughProps(props),
      type,
      size,
      elementRef: this.handleElementRef,
      ref: this.handleButtonRef,
      as,
      color,
      interaction,
      focusColor,
      display,
      textAlign,
      withBackground,
      margin,
      cursor,
      href,
      renderIcon,
      themeOverride
    }

    return <BaseButton {...buttonProps}>{children}</BaseButton>
  }
}

export default Button
export { Button }
