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

import type { Spacing } from '@instructure/emotion'
import type { AsElementType, PropValidators } from '@instructure/shared-types'

type IconButtonOwnProps = {
  children?: React.ReactNode | ((...args: any[]) => React.ReactNode)
  renderIcon?: React.ReactNode | ((...args: any[]) => any)
  screenReaderLabel: string
  type?: 'button' | 'submit' | 'reset'
  size?: 'small' | 'medium' | 'large'
  elementRef?: (...args: any[]) => any
  as?: AsElementType
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

type PropKeys = keyof IconButtonOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type IconButtonProps = IconButtonOwnProps

const propTypes: PropValidators<PropKeys> = {
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

const allowedProps: AllowedPropKeys = [
  'as',
  'children',
  'color',
  'cursor',
  'elementRef',
  'focusColor',
  'href',
  'interaction',
  'margin',
  'renderIcon',
  'screenReaderLabel',
  'shape',
  'size',
  'type',
  'withBackground',
  'withBorder'
]

export type { IconButtonProps }
export { propTypes, allowedProps }
