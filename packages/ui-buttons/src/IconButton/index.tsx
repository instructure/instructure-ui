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
import { ScreenReaderContent } from '@instructure/ui-a11y-content'

import { withStyle, ThemeablePropTypes, Spacing } from '@instructure/emotion'

import generateComponentTheme from './theme'
import { BaseButton } from '../BaseButton'

type Props = {
  renderIcon?: React.ReactNode | ((...args: any[]) => any)
  screenReaderLabel: string
  type?: 'button' | 'submit' | 'reset'
  size?: 'small' | 'medium' | 'large'
  elementRef?: (...args: any[]) => any
  as?: React.ReactElement
  interaction?: 'enabled' | 'disabled' | 'readonly'
  color?: 'primary' | 'primary-inverse' | 'secondary' | 'success' | 'danger'
  focusColor?: 'info' | 'inverse'
  shape?: 'rectangle' | 'circle'
  withBackground?: boolean
  withBorder?: boolean
  margin?: Spacing
  cursor?: string
  href?: string
}

/**
---
category: components
---
**/

// needed for listing the available theme variables on docs page
@withStyle(null, generateComponentTheme)
@testable()
class IconButton extends Component<Props> {
  static componentId = 'IconButton'

  static propTypes = {
    /**
     * An icon, or function returning an icon (identical to the `renderIcon` prop).
     */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
     * An icon, or function that returns an icon (identical to the `children` prop).
     */
    renderIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
     * An accessible label for the `IconButton`.
     */
    screenReaderLabel: PropTypes.string.isRequired,
    /**
     * Specifies the type of the `IconButton`'s underlying html element.
     */
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    /**
     * The size of the `IconButton`
     */
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
     * Provides a reference to the `IconButton`'s underlying html element.
     */
    elementRef: PropTypes.func,
    /**
     * The element to render as the component root, `button` by default.
     */
    as: PropTypes.elementType,
    /**
     * Specifies if interaction with the `IconButton` is enabled, disabled, or readonly.
     */
    interaction: PropTypes.oneOf(['enabled', 'disabled', 'readonly']),
    /**
     * Specifies the color for the `IconButton`.
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
     * Specifies if the `IconButton` shape should be a circle or rectangle.
     */
    shape: PropTypes.oneOf(['rectangle', 'circle']),
    /**
     * Specifies if the `IconButton` should render with a solid background. When false, the background is transparent.
     */
    withBackground: PropTypes.bool,
    /**
     * Specifies if the `IconButton` should render with a border.
     */
    withBorder: PropTypes.bool,
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
     * Specifies an href attribute for the `IconButton`'s underlying html element.
     */
    href: PropTypes.string
  }

  static defaultProps = {
    children: null,
    renderIcon: undefined,
    type: 'button',
    size: 'medium',
    // @ts-expect-error ts-migrate(6133) FIXME: 'el' is declared but its value is never read.
    elementRef: (el) => {},
    as: 'button',
    // Leave interaction default undefined so that `disabled` and `readOnly` can also be supplied
    interaction: undefined,
    color: 'secondary',
    focusColor: undefined,
    shape: 'rectangle',
    withBackground: true,
    withBorder: true,
    margin: '0',
    cursor: 'pointer',
    href: undefined
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
      renderIcon,
      screenReaderLabel,
      type,
      size,
      elementRef,
      as,
      interaction,
      color,
      focusColor,
      shape,
      withBackground,
      withBorder,
      margin,
      cursor,
      href,
      ...props
    } = this.props

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'themeOverride' does not exist on type 'R... Remove this comment to see the full error message
    // eslint-disable-next-line react/prop-types
    const themeOverride = this.props.themeOverride

    return (
      <BaseButton
        {...passthroughProps(props)}
        type={type}
        size={size}
        elementRef={elementRef}
        as={as}
        interaction={interaction}
        color={color}
        focusColor={focusColor}
        shape={shape}
        withBackground={withBackground}
        withBorder={withBorder}
        margin={margin}
        cursor={cursor}
        href={href}
        renderIcon={children || renderIcon}
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        themeOverride={themeOverride}
        ref={(component) => {
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'BaseButton | null' is not assignable to type... Remove this comment to see the full error message
          this._baseButton = component
        }}
      >
        <ScreenReaderContent>{screenReaderLabel}</ScreenReaderContent>
      </BaseButton>
    )
  }
}

export default IconButton
export { IconButton }
