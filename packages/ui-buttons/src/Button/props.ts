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

import React from 'react'
import PropTypes from 'prop-types'

import { ThemeablePropTypes } from '@instructure/emotion'

import type { Spacing, WithStyleProps } from '@instructure/emotion'
import type {
  ToProp,
  AsElementType,
  PropValidators,
  BaseButtonTheme,
  OtherHTMLAttributes
} from '@instructure/shared-types'
import type { Cursor } from '@instructure/ui-prop-types'
import type { ViewProps } from '@instructure/ui-view'

type ButtonOwnProps = {
  /**
   * Specifies the `Button` children.
   */
  children?: React.ReactNode

  /**
   * Specifies the type of the `Button`'s underlying html element.
   */
  type?: 'button' | 'submit' | 'reset'

  /**
   * The size of the `Button`
   */
  size?: 'small' | 'medium' | 'large'

  /**
   * Provides a reference to the `Button`'s underlying html element.
   */
  elementRef?: (element: Element | null) => void

  /**
   * The element to render as the component root, `Button` by default.
   */
  as?: AsElementType

  /**
   * Specifies if interaction with the `Button` is enabled, disabled, or readonly.
   */
  interaction?: 'enabled' | 'disabled' | 'readonly'

  /**
   * Specifies the color for the `Button`.
   */
  color?: 'primary' | 'primary-inverse' | 'secondary' | 'success' | 'danger'

  /**
   * Override the `Button`'s default focus outline color.
   */
  focusColor?: 'info' | 'inverse'

  /**
   * The `Button` display property. When set to `inline-block`, the `Button` displays inline with other elements.
   * When set to block, the `Button` expands to fill the width of the container.
   */
  display?: 'inline-block' | 'block'

  /**
   * Sets the alignment of the `Button` children and/or icon.
   */
  textAlign?: 'start' | 'center'

  /**
   * Specifies if the `Button` should render with a solid background. When false, the background is transparent.
   */
  withBackground?: boolean

  /**
   * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `margin="small auto large"`.
   */
  margin?: Spacing

  /**
   * Specify a mouse cursor to use when hovering over the button.
   * The `pointer` cursor is used by default.
   */
  cursor?: Cursor

  /**
   * Specifies an href attribute for the `Button`'s underlying html element.
   */
  href?: string

  /**
   * An icon, or function that returns an icon.
   */
  renderIcon?: React.ReactNode | (() => React.ReactNode)

  /**
   * Callback fired when the `Button` is clicked.
   */
  onClick?: (
    event: React.KeyboardEvent<ViewProps> | React.MouseEvent<ViewProps>
  ) => void
}

type PropKeys = keyof ButtonOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type ButtonProps = ButtonOwnProps &
  WithStyleProps<BaseButtonTheme, null> &
  OtherHTMLAttributes<ButtonOwnProps> &
  ToProp

const propTypes: PropValidators<PropKeys> = {
  children: PropTypes.node,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  elementRef: PropTypes.func,
  as: PropTypes.elementType,
  interaction: PropTypes.oneOf(['enabled', 'disabled', 'readonly']),
  color: PropTypes.oneOf([
    'primary',
    'primary-inverse',
    'secondary',
    'success',
    'danger'
  ]),
  focusColor: PropTypes.oneOf(['info', 'inverse']),
  display: PropTypes.oneOf(['inline-block', 'block']),
  textAlign: PropTypes.oneOf(['start', 'center']),
  withBackground: PropTypes.bool,
  margin: ThemeablePropTypes.spacing,
  cursor: PropTypes.string,
  href: PropTypes.string,
  renderIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  onClick: PropTypes.func
}

const allowedProps: AllowedPropKeys = [
  'as',
  'children',
  'color',
  'cursor',
  'display',
  'elementRef',
  'focusColor',
  'href',
  'interaction',
  'margin',
  'renderIcon',
  'size',
  'textAlign',
  'type',
  'withBackground',
  'onClick'
]

export type { ButtonProps }
export { propTypes, allowedProps }
