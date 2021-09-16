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
  AsElementType,
  BaseButtonTheme,
  PropValidators
} from '@instructure/shared-types'

type CondensedButtonOwnProps = {
  children?: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  size?: 'small' | 'medium' | 'large'
  elementRef?: (...args: any[]) => any
  as?: AsElementType
  interaction?: 'enabled' | 'disabled' | 'readonly'
  color?: 'primary' | 'primary-inverse'
  margin?: Spacing
  cursor?: string
  href?: string
  renderIcon?: React.ReactNode | ((...args: any[]) => any)
}

type PropKeys = keyof CondensedButtonOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type CondensedButtonProps = CondensedButtonOwnProps &
  WithStyleProps<BaseButtonTheme, null>

const propTypes: PropValidators<PropKeys> = {
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
  'type'
]

export type { CondensedButtonProps }
export { propTypes, allowedProps }
