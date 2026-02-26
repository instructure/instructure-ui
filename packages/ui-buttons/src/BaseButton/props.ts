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
  OtherHTMLAttributes
} from '@instructure/shared-types'
import type { Cursor } from '@instructure/shared-types'
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
  size?: 'small' | 'medium' | 'large' | 'condensedSmall' | 'condensedMedium'

  /**
   * Provides a reference to the `Button`'s underlying html element.
   */
  elementRef?: (element: HTMLElement | null) => void

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
  color?:
    | 'primary'
    | 'primary-inverse'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'ai-primary'
    | 'ai-secondary'

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

  /**
   * Specifies the tabindex of the `Button`.
   */
  tabIndex?: number

  /**
   * Manually control if the `Button` should display a focus outline.
   *
   * When left `undefined` (which is the default) the focus outline will display
   * if this component is focusable and receives focus.
   */
  withFocusOutline?: boolean
}

type BaseButtonStyleProps = {
  isDisabled: boolean
  hasOnlyIconVisible: boolean
  isEnabled: boolean
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
export { allowedProps }
