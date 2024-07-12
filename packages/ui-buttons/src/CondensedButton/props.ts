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
  BaseButtonTheme,
  OtherHTMLAttributes,
  PropValidators
} from '@instructure/shared-types'
import type { Cursor } from '@instructure/ui-prop-types'
import type { ViewProps } from '@instructure/ui-view'

type CondensedButtonOwnProps = {
  /**
   * Specifies the `CondensedButton` children.
   */
  children?: React.ReactNode

  /**
   * Specifies the type of the `CondensedButton`'s underlying html element.
   */
  type?: 'button' | 'submit' | 'reset'

  /**
   * The size of the `CondensedButton`
   */
  size?: 'small' | 'medium' | 'large'

  /**
   * Provides a reference to the `CondensedButton`'s underlying html element.
   */
  elementRef?: (element: Element | null) => void

  /**
   * The element to render as the component root, `button` by default.
   */
  as?: AsElementType

  /**
   * Specifies if interaction with the `CondensedButton` is enabled, disabled, or readonly.
   */
  interaction?: 'enabled' | 'disabled' | 'readonly'

  /**
   * Specifies the color for the `CondensedButton`.
   */
  color?: 'primary' | 'primary-inverse' | 'secondary'

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
   * Specifies an href attribute for the `CondensedButton`'s underlying html element.
   */
  href?: string

  /**
   * An icon, or function that returns an icon.
   */
  renderIcon?: React.ReactNode | (() => React.ReactNode)

  /**
   * Callback fired when the `CondensedButton` is clicked.
   */
  onClick?: (
    event: React.KeyboardEvent<ViewProps> | React.MouseEvent<ViewProps>
  ) => void
}

type PropKeys = keyof CondensedButtonOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type CondensedButtonProps = CondensedButtonOwnProps &
  WithStyleProps<BaseButtonTheme, null> &
  OtherHTMLAttributes<CondensedButtonOwnProps> &
  ToProp

const propTypes: PropValidators<PropKeys> = {
  children: PropTypes.node,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  elementRef: PropTypes.func,
  as: PropTypes.elementType,
  interaction: PropTypes.oneOf(['enabled', 'disabled', 'readonly']),
  color: PropTypes.oneOf(['primary', 'primary-inverse', 'secondary']),
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
  'elementRef',
  'href',
  'interaction',
  'margin',
  'renderIcon',
  'size',
  'type',
  'onClick'
]

export type { CondensedButtonProps }
export { propTypes, allowedProps }
