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
import { passthroughProps } from '@instructure/ui-react-utils'

import {
  withStyle,
  ThemeablePropTypes,
  ThemeablePropValues
} from '@instructure/emotion'

import generateComponentTheme from './theme'
import { BaseButton } from '../BaseButton'

type Props = {
  type?: 'button' | 'submit' | 'reset'
  size?: 'small' | 'medium' | 'large'
  elementRef?: (...args: any[]) => any
  as?: React.ReactElement
  interaction?: 'enabled' | 'disabled' | 'readonly'
  color?: 'primary' | 'primary-inverse'
  margin?: typeof ThemeablePropValues.SPACING
  cursor?: string
  href?: string
  renderIcon?: React.ReactNode | ((...args: any[]) => any)
}

/**
---
category: components
---
**/
// needed for listing the available theme variables on docs page
@withStyle(null, generateComponentTheme)
@testable()
class CondensedButton extends Component<Props> {
  static propTypes = {
    /**
     * Specifies the `CondensedButton` children.
     */
    children: PropTypes.node,
    /**
     * Specifies the type of the `CondensedButton`'s underlying html element.
     */
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    /**
     * The size of the `CondensedButton`
     */
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
     * Provides a reference to the `CondensedButton`'s underlying html element.
     */
    elementRef: PropTypes.func,
    /**
     * The element to render as the component root, `button` by default.
     */
    as: PropTypes.elementType,
    /**
     * Specifies if interaction with the `CondensedButton` is enabled, disabled, or readonly.
     */
    interaction: PropTypes.oneOf(['enabled', 'disabled', 'readonly']),
    /**
     * Specifies the color for the `CondensedButton`.
     */
    color: PropTypes.oneOf(['primary', 'primary-inverse']),
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
     * Specifies an href attribute for the `CondensedButton`'s underlying html element.
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
    // @ts-expect-error ts-migrate(6133) FIXME: 'el' is declared but its value is never read.
    elementRef: (el) => {},
    as: 'button',
    // Leave interaction default undefined so that `disabled` and `readOnly` can also be supplied
    interaction: undefined,
    color: 'primary',
    margin: '0',
    cursor: 'pointer',
    href: undefined,
    renderIcon: undefined
  }

  _baseButton = null

  get focused() {
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    return this._baseButton && this._baseButton.focused
  }

  focus() {
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    this._baseButton && this._baseButton.focus()
  }

  render() {
    const {
      children,
      type,
      size,
      elementRef,
      as,
      interaction,
      color,
      margin,
      cursor,
      href,
      renderIcon,
      ...props
    } = this.props

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'themeOverride' does not exist on type 'R... Remove this comment to see the full error message
    // eslint-disable-next-line react/prop-types
    const themeOverride = this.props.themeOverride

    return (
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'BaseButton'.
      <BaseButton
        {...passthroughProps(props)}
        isCondensed
        withBackground={false}
        withBorder={false}
        type={type}
        size={size}
        elementRef={elementRef}
        as={as}
        interaction={interaction}
        color={color}
        margin={margin}
        cursor={cursor}
        href={href}
        renderIcon={renderIcon}
        themeOverride={themeOverride}
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'component' implicitly has an 'any' type... Remove this comment to see the full error message
        ref={(component) => {
          this._baseButton = component
        }}
      >
        {children}
        {/* @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'BaseButton'. */}
      </BaseButton>
    )
  }
}

export default CondensedButton
export { CondensedButton }
