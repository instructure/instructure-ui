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

import type { InteractionType } from '@instructure/ui-react-utils'
import type {
  Spacing,
  WithStyleProps,
  ComponentStyle
} from '@instructure/emotion'
import type {
  ToProp,
  AsElementType,
  BaseButtonTheme,
  OtherHTMLAttributes,
  PropValidators
} from '@instructure/shared-types'
import type { Cursor } from '@instructure/ui-prop-types'
import type { ViewProps } from '@instructure/ui-view'
import { Renderable } from '@instructure/shared-types'

type BaseButtonOwnProps = {
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
  interaction?: InteractionType

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
   * Specifies if the `Button` shape should be a circle or rectangle.
   */
  shape?: 'rectangle' | 'circle'

  /**
   * Specifies if the `Button` should render with a solid background. When false, the background is transparent.
   */
  withBackground?: boolean

  /**
   * Specifies if the `Button` should render with a border.
   */
  withBorder?: boolean

  /**
   * Designates if the `Button` should render without padding. This option should only be set when `withBorder` and
   * `withBackground` are also set to false.
   */
  isCondensed?: boolean

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
   * Callback fired when the `Button` is clicked.
   */
  onClick?: (
    event: React.KeyboardEvent<ViewProps> | React.MouseEvent<ViewProps>
  ) => void

  /**
   * Callback fired when the `Button` receives a keydown event.
   */
  onKeyDown?: (event: React.KeyboardEvent<ViewProps>) => void

  /**
   * An icon, or function that returns an icon.
   */
  renderIcon?: Renderable

  // Deprecated `string` tabIndex type
  /**
   * Specifies the tabindex of the `Button`.
   *
   * (`string` type is __deprecated__, use `number`)
   */
  tabIndex?: number | string // TODO: remove string type in v9
}

type BaseButtonStyleProps = {
  isDisabled: boolean
  hasOnlyIconVisible: boolean
}

type PropKeys = keyof BaseButtonOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type BaseButtonProps = BaseButtonOwnProps &
  WithStyleProps<BaseButtonTheme, BaseButtonStyle> &
  OtherHTMLAttributes<BaseButtonOwnProps> &
  ToProp

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
  shape: PropTypes.oneOf(['rectangle', 'circle']),
  withBackground: PropTypes.bool,
  withBorder: PropTypes.bool,
  isCondensed: PropTypes.bool,
  margin: ThemeablePropTypes.spacing,
  cursor: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  renderIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  // Deprecated `string` tabIndex type
  // TODO: remove string type in v9
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

export type {
  BaseButtonProps,
  BaseButtonOwnProps,
  BaseButtonStyleProps,
  BaseButtonStyle
}
export { propTypes, allowedProps }
