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
import {
  getInteraction,
  passthroughProps,
  deprecated
} from '@instructure/ui-react-utils'

import { BaseButton } from '../BaseButton'
import { DeprecatedButton } from '../DeprecatedButton'

import { themeAdapter } from './themeAdapter'

import generateDeprecatedTheme from '../DeprecatedButton/theme'
import theme from './theme'

/**
---
category: components
---
**/
@deprecated(
  '8.0.0',
  {
    fluidWidth: 'display',
    icon: 'renderIcon',
    variant: null
  },
  'See the following upgrade guide for more help updating https://instructure.design/#button-upgrade-guide'
)
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
    renderIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
     * __Deprecated - see the [upgrade guide](#button-upgrade-guide/#v8-button-upgrade-guide-upgrading-variant-default,-primary,-success,-danger,-light,-ghost,-or-ghost-inverse)__
     */
    variant: PropTypes.oneOf([
      'default',
      'primary',
      'success',
      'danger',
      'light',
      'ghost',
      'ghost-inverse',
      'link',
      'link-inverse',
      'circle-default',
      'circle-primary',
      'circle-danger',
      'icon',
      'icon-inverse'
    ]),
    /**
     * __Deprecated - set `display="block"` and `textAlign="start"` instead (See the [upgrade guide](#button-upgrade-guide/#v8-button-upgrade-guide-props-that-need-to-be-upgraded) for more details)__
     */
    fluidWidth: PropTypes.bool,
    /**
     * __Deprecated - use `renderIcon` instead (See the [upgrade guide](#button-upgrade-guide/#v8-button-upgrade-guide-props-that-need-to-be-upgraded) for more details)__
     */
    icon: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
  }

  static defaultProps = {
    children: null,
    type: 'button',
    size: 'medium',
    elementRef: (el) => {},
    as: 'button',
    // Leave interaction default undefined so that `disabled` and `readOnly` can also be supplied
    interaction: undefined,
    // TODO: Switch to 'secondary' in 8.0 when we drop variant
    color: undefined,
    focusColor: undefined,
    display: 'inline-block',
    textAlign: 'center',
    withBackground: true,
    margin: '0',
    cursor: 'pointer',
    href: undefined,
    renderIcon: undefined,
    variant: undefined,
    fluidWidth: undefined,
    icon: undefined
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

  scopeTheme = () => {
    // TODO: Remove this function in version 8.0.0
    // We only want to pass the theme vars that exist in the deprecated
    // button, otherwise every theme var that is unique to the updated
    // button gets injected into the style tag for the deprecated one
    // (that ends up being a _massive_ amount of variables)
    const { theme = {} } = this
    const deprecatedTheme = generateDeprecatedTheme() || {}
    const deprecatedKeys = Object.keys(deprecatedTheme)

    return Object.entries(theme).reduce((result, [key, value]) => {
      if (deprecatedKeys.includes(key)) {
        return { ...result, [key]: value }
      }

      return result
    }, {})
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
      icon,
      renderIcon,
      variant,
      fluidWidth,
      ...props
    } = this.props

    const interaction = getInteraction({ props })
    const { theme = {} } = this

    if (variant) {
      return (
        <DeprecatedButton
          {...passthroughProps(props)}
          type={type}
          size={size}
          as={as}
          disabled={interaction === 'disabled'}
          readOnly={interaction === 'readonly'}
          margin={margin}
          cursor={cursor}
          href={href}
          icon={renderIcon || icon}
          fluidWidth={fluidWidth}
          variant={variant}
          ref={this.handleButtonRef}
          theme={this.scopeTheme()}
        >
          {children}
        </DeprecatedButton>
      )
    }

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
      renderIcon: renderIcon || icon,
      theme
    }

    if (fluidWidth) {
      buttonProps.textAlign = 'start'
      buttonProps.display = 'block'
    }

    return <BaseButton {...buttonProps}>{children}</BaseButton>
  }
}

export default Button
export { Button }
