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

import PropTypes from 'prop-types'
import { ThemeablePropTypes } from '@instructure/emotion'

import type {
  Spacing,
  WithStyleProps,
  ComponentStyle
} from '@instructure/emotion'
import type {
  AsElementType,
  CloseButtonTheme,
  OtherHTMLAttributes,
  PropValidators
} from '@instructure/shared-types'
import type { Cursor } from '@instructure/ui-prop-types'

type CloseButtonOwnProps = {
  screenReaderLabel: string | React.ReactNode
  color?: 'primary' | 'primary-inverse'
  interaction?: 'enabled' | 'disabled' | 'readonly'
  elementRef?: (element: Element | null) => void
  size?: 'small' | 'medium' | 'large'
  onClick?: (...args: any[]) => any
  margin?: Spacing
  placement?: 'start' | 'end' | 'static'
  offset?: 'none' | 'x-small' | 'small' | 'medium'
  type?: 'button' | 'submit' | 'reset'
  as?: AsElementType
  href?: string
  cursor?: Cursor
  tabIndex?: number | string
}

type PropKeys = keyof CloseButtonOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type CloseButtonProps = CloseButtonOwnProps &
  WithStyleProps<CloseButtonTheme, CloseButtonStyle> &
  OtherHTMLAttributes<CloseButtonOwnProps>

type CloseButtonStyle = ComponentStyle<'closeButton'>

const propTypes: PropValidators<PropKeys> = {
  /**
   * An accessible label for the `CloseButton` (required)
   */
  screenReaderLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
    .isRequired,
  /**
   * Specifies the color for the `CloseButton`.
   */
  color: PropTypes.oneOf(['primary', 'primary-inverse']),
  /**
   * Specifies if interaction with the `CloseButton` is enabled, disabled, or readonly.
   */
  interaction: PropTypes.oneOf(['enabled', 'disabled', 'readonly']),
  /**
   * Provides a reference to the `CloseButton`'s underlying html element.
   */
  elementRef: PropTypes.func,
  /**
   * The size of the `CloseButton`
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Callback fired when the `CloseButton` is clicked.
   */
  onClick: PropTypes.func,
  /**
   * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `margin="small auto large"`.
   */
  margin: ThemeablePropTypes.spacing,
  /**
   * Specifies the placement of the `CloseButton`
   */
  placement: PropTypes.oneOf(['start', 'end', 'static']),
  /**
   * Specifies the offset distance for the `CloseButton` with respect to both the top and start/end of the container.
   * Note that for this property to have an effect, the `placement` prop must be set to either `start` or `end`. The
   * offset will also be created with respect to a positioned parent. If it does not appear to be working, try setting
   * the `position` of the parent container to `relative`.
   */
  offset: PropTypes.oneOf(['none', 'x-small', 'small', 'medium']),
  /**
   * Specifies the type of the `Button`'s underlying html element.
   */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  /**
   * The element to render as the component root, `CloseButton` by default.
   */
  as: PropTypes.elementType,
  /**
   * Specifies an href attribute for the `CloseButton`'s underlying html element.
   */
  href: PropTypes.string,
  /**
   * Specify a mouse cursor to use when hovering over the `CloseButton`.
   */
  cursor: PropTypes.string,
  /**
   * Specifies the tabindex of the `CloseButton`.
   */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

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
export { propTypes, allowedProps }
