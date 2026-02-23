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
import type {
  Spacing,
  WithStyleProps,
  ComponentStyle
} from '@instructure/emotion'
import type {
  ToProp,
  AsElementType,
  CloseButtonTheme,
  OtherHTMLAttributes
} from '@instructure/shared-types'
import type { Cursor } from '@instructure/shared-types'
import type { ViewProps } from '@instructure/ui-view'

type CloseButtonOwnProps = {
  /**
   * An accessible label for the `CloseButton` (required)
   */
  screenReaderLabel: React.ReactNode

  /**
   * Specifies the color for the `CloseButton`.
   */
  color?: 'primary' | 'primary-inverse'

  /**
   * Specifies if interaction with the `CloseButton` is enabled, disabled, or readonly.
   */
  interaction?: 'enabled' | 'disabled' | 'readonly'

  /**
   * Provides a reference to the `CloseButton`'s underlying html element.
   */
  elementRef?: (element: Element | null) => void

  /**
   * The size of the `CloseButton`
   */
  size?: 'small' | 'medium' | 'large'

  /**
   * Callback fired when the `CloseButton` is clicked.
   */
  onClick?: (
    event: React.KeyboardEvent<ViewProps> | React.MouseEvent<ViewProps>
  ) => void

  /**
   * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `margin="small auto large"`.
   */
  margin?: Spacing

  /**
   * Specifies the placement of the `CloseButton`
   */
  placement?: 'start' | 'end' | 'static'

  /**
   * Specifies the offset distance for the `CloseButton` with respect to both the top and start/end of the container.
   * Note that for this property to have an effect, the `placement` prop must be set to either `start` or `end`. The
   * offset will also be created with respect to a positioned parent. If it does not appear to be working, try setting
   * the `position` of the parent container to `relative`.
   */
  offset?: 'none' | 'x-small' | 'small' | 'medium'

  /**
   * Specifies the type of the `Button`'s underlying html element.
   */
  type?: 'button' | 'submit' | 'reset'

  /**
   * The element to render as the component root, `CloseButton` by default.
   */
  as?: AsElementType

  /**
   * Specifies an href attribute for the `CloseButton`'s underlying html element.
   */
  href?: string

  /**
   * Specify a mouse cursor to use when hovering over the `CloseButton`.
   */
  cursor?: Cursor

  /**
   * Specifies the tabindex of the `CloseButton`.
   *
   */
  tabIndex?: number
}

type PropKeys = keyof CloseButtonOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type CloseButtonProps = CloseButtonOwnProps &
  WithStyleProps<CloseButtonTheme, CloseButtonStyle> &
  OtherHTMLAttributes<CloseButtonOwnProps> &
  ToProp

type CloseButtonStyle = ComponentStyle<'closeButton'>
const allowedProps: AllowedPropKeys = [
  'as',
  'color',
  'cursor',
  'elementRef',
  'href',
  'interaction',
  'margin',
  'offset',
  'onClick',
  'placement',
  'screenReaderLabel',
  'size',
  'tabIndex',
  'type'
]

export type { CloseButtonProps, CloseButtonStyle }
export { allowedProps }
