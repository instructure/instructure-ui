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

import type { InteractionType } from '@instructure/ui-react-utils'
import type {
  Spacing,
  WithStyleProps,
  ComponentStyle
} from '@instructure/emotion'
import type {
  AsElementType,
  BaseButtonTheme,
  OtherHTMLAttributes,
  PropValidators
} from '@instructure/shared-types'
import type { Cursor } from '@instructure/ui-prop-types'

type BaseButtonOwnProps = {
  children?: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  size?: 'small' | 'medium' | 'large'
  elementRef?: (element: Element | null) => void
  as?: AsElementType
  interaction?: InteractionType
  color?: 'primary' | 'primary-inverse' | 'secondary' | 'success' | 'danger'
  focusColor?: 'info' | 'inverse'
  display?: 'inline-block' | 'block'
  textAlign?: 'start' | 'center'
  shape?: 'rectangle' | 'circle'
  withBackground?: boolean
  withBorder?: boolean
  isCondensed?: boolean
  margin?: Spacing
  cursor?: Cursor
  href?: string
  onClick?: (...args: any[]) => any
  onKeyDown?: (...args: any[]) => any
  renderIcon?: React.ReactNode | ((...args: any[]) => any)
  tabIndex?: number | string
}

type BaseButtonStyleProps = {
  isDisabled: boolean
  hasOnlyIconVisible: boolean
}

type PropKeys = keyof BaseButtonOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type BaseButtonProps = BaseButtonOwnProps &
  WithStyleProps<BaseButtonTheme, BaseButtonStyle> &
  OtherHTMLAttributes<BaseButtonOwnProps>

type BaseButtonStyle = ComponentStyle<
  | 'baseButton'
  | 'content'
  | 'children'
  | 'iconSVG'
  | 'childrenLayout'
  | 'iconOnly'
  | 'iconWrapper'
  | 'childrenWrapper'
>

const propTypes: PropValidators<PropKeys> = {
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
   * Specifies if the `Button` shape should be a circle or rectangle.
   */
  shape: PropTypes.oneOf(['rectangle', 'circle']),
  /**
   * Specifies if the `Button` should render with a solid background. When false, the background is transparent.
   */
  withBackground: PropTypes.bool,
  /**
   * Specifies if the `Button` should render with a border.
   */
  withBorder: PropTypes.bool,
  /**
   * Designates if the `Button` should render without padding. This option should only be set when `withBorder` and
   * `withBackground` are also set to false.
   */
  isCondensed: PropTypes.bool,
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
   * Callback fired when the `Button` is clicked.
   */
  onClick: PropTypes.func,
  /**
   * Callback fired when the `Button` receives a keydown event.
   */
  onKeyDown: PropTypes.func,
  /**
   * An icon, or function that returns an icon.
   */
  renderIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  /**
   * Specifies the tabindex of the `Button`.
   */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
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
  'isCondensed',
  'margin',
  'onClick',
  'onKeyDown',
  'renderIcon',
  'shape',
  'size',
  'tabIndex',
  'textAlign',
  'type',
  'withBackground',
  'withBorder'
]

export type { BaseButtonProps, BaseButtonStyleProps, BaseButtonStyle }
export { propTypes, allowedProps }
