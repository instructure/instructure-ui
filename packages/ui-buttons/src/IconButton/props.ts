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

type IconButtonOwnProps = {
  /**
   * An icon, or function returning an icon (identical to the `renderIcon` prop).
   */
  children?: React.ReactNode | (() => React.ReactNode)

  /**
   * An icon, or function that returns an icon (identical to the `children` prop).
   */
  renderIcon?: React.ReactNode | (() => React.ReactNode)

  /**
   * An accessible label for the `IconButton`.
   */
  screenReaderLabel: string

  /**
   * Specifies the type of the `IconButton`'s underlying html element.
   */
  type?: 'button' | 'submit' | 'reset'

  /**
   * The size of the `IconButton`
   */
  size?: 'small' | 'medium' | 'large'

  /**
   * Provides a reference to the `IconButton`'s underlying html element.
   */
  elementRef?: (element: Element | null) => void

  /**
   * The element to render as the component root, `button` by default.
   */
  as?: AsElementType

  /**
   * Specifies if interaction with the `IconButton` is enabled, disabled, or readonly.
   */
  interaction?: 'enabled' | 'disabled' | 'readonly'

  /**
   * Specifies the color for the `IconButton`.
   */
  color?: 'primary' | 'primary-inverse' | 'secondary' | 'success' | 'danger'

  /**
   * Override the `Button`'s default focus outline color.
   */
  focusColor?: 'info' | 'inverse'

  /**
   * Specifies if the `IconButton` shape should be a circle or rectangle.
   */
  shape?: 'rectangle' | 'circle'

  /**
   * Specifies if the `IconButton` should render with a solid background. When false, the background is transparent.
   */
  withBackground?: boolean

  /**
   * Specifies if the `IconButton` should render with a border.
   */
  withBorder?: boolean

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
   * Specifies an href attribute for the `IconButton`'s underlying html element.
   */
  href?: string

  /**
   * Callback fired when the `Button` is clicked.
   */
  onClick?: (
    event: React.KeyboardEvent<ViewProps> | React.MouseEvent<ViewProps>
  ) => void
}

type PropKeys = keyof IconButtonOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type IconButtonProps = IconButtonOwnProps &
  WithStyleProps<BaseButtonTheme, null> &
  OtherHTMLAttributes<IconButtonOwnProps> &
  ToProp

const propTypes: PropValidators<PropKeys> = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  renderIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  screenReaderLabel: PropTypes.string.isRequired,
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
  shape: PropTypes.oneOf(['rectangle', 'circle']),
  withBackground: PropTypes.bool,
  withBorder: PropTypes.bool,
  margin: ThemeablePropTypes.spacing,
  cursor: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func
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
  'withBorder',
  'onClick'
]

export type { IconButtonProps }
export { propTypes, allowedProps }
