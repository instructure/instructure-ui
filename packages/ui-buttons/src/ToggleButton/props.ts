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
  AsElementType,
  OtherHTMLAttributes
} from '@instructure/shared-types'
import type {
  PlacementPropValues,
  PositionConstraint,
  PositionMountNode
} from '@instructure/ui-position'
import type { ViewProps } from '@instructure/ui-view'
import { Renderable } from '@instructure/shared-types'
import type { Spacing } from '@instructure/emotion'

type ToggleButtonOwnProps = {
  /**
   * Text to output only to screen readers
   */
  screenReaderLabel: string

  /**
   * Text to render in the tooltip shown on hover/focus
   */
  renderTooltipContent: React.ReactNode | ((...args: any[]) => any)

  /**
   * An icon or function that returns an icon
   */
  renderIcon: Renderable

  /**
   * Toggles the `aria-pressed` attribute on the button (`true` if `pressed`; `false` if `unpressed`)
   */
  status: 'pressed' | 'unpressed'

  /**
   * The element to render as the component root; `button` by default
   */
  as?: AsElementType

  /**
   * Specifies if interaction with `ToggleButton` is `enabled`, `disabled`, or `readonly`
   */
  interaction?: 'enabled' | 'disabled' | 'readonly'

  /**
   * The size of the `ToggleButton`
   */
  size?: 'small' | 'medium' | 'large'

  /**
   * Provides a reference to `ToggleButton`'s underlying HTML element
   */
  elementRef?: (element: Element | null) => void

  /**
   * Callback fired when the `ToggleButton` is clicked
   */
  onClick?: (
    event: React.KeyboardEvent<ViewProps> | React.MouseEvent<ViewProps>
  ) => void

  /**
   * The color in which to display the icon
   */
  color?: 'primary' | 'primary-inverse' | 'secondary' | 'success' | 'danger'

  /**
   * By default, the tooltip will show on hover/focus. Use this prop if you need to override that behavior.
   */
  isShowingTooltip?: boolean

  /**
   * An element or a function returning an element to use as the mount node
   */
  mountNode?: PositionMountNode

  /**
   * The placement of the tooltip in relation to the button
   */
  placement?: PlacementPropValues

  /**
   * The parent in which to constrain the tooltip.
   * One of: 'window', 'scroll-parent', 'parent', 'none', an element,
   * or a function returning an element.
   */
  constrain?: PositionConstraint

  /**
   * Margin around the component. Accepts a `Spacing` token. See token values and example usage in [this guide](https://instructure.design/#layout-spacing).
   */
  margin?: Spacing
}

type PropKeys = keyof ToggleButtonOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type ToggleButtonProps = ToggleButtonOwnProps &
  OtherHTMLAttributes<ToggleButtonOwnProps>

type ToggleButtonState = {
  isShowingTooltip: boolean
}
const allowedProps: AllowedPropKeys = [
  'as',
  'color',
  'constrain',
  'elementRef',
  'interaction',
  'isShowingTooltip',
  'margin',
  'mountNode',
  'onClick',
  'placement',
  'renderIcon',
  'renderTooltipContent',
  'screenReaderLabel',
  'size',
  'status'
]

export type { ToggleButtonProps, ToggleButtonState }
export { allowedProps }
