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

import { PositionPropTypes } from '@instructure/ui-position'

import type { AsElementType, PropValidators } from '@instructure/shared-types'
import type {
  PlacementPropValues,
  PositionConstraint,
  PositionMountNode
} from '@instructure/ui-position'

type ToggleButtonOwnProps = {
  screenReaderLabel: string
  renderTooltipContent: React.ReactNode | ((...args: any[]) => any)
  renderIcon: React.ReactNode | ((...args: any[]) => any)
  status: 'pressed' | 'unpressed'
  as?: AsElementType
  interaction?: 'enabled' | 'disabled' | 'readonly'
  size?: 'small' | 'medium' | 'large'
  elementRef?: (element: Element | null) => void
  onClick?: (...args: any[]) => any
  color?: string
  isShowingTooltip?: boolean
  mountNode?: PositionMountNode
  placement?: PlacementPropValues
  constrain?: PositionConstraint
}

type PropKeys = keyof ToggleButtonOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type ToggleButtonProps = ToggleButtonOwnProps

const propTypes: PropValidators<PropKeys> = {
  /**
   * Text to output only to screen readers
   */
  screenReaderLabel: PropTypes.string.isRequired,
  /**
   * Text to render in the tooltip shown on hover/focus
   */
  renderTooltipContent: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
    .isRequired,
  /**
   * An icon or function that returns an icon
   */
  renderIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  /**
   * Toggles the `aria-pressed` attribute on the button (`true` if `pressed`; `false` if `unpressed`)
   */
  status: PropTypes.oneOf(['pressed', 'unpressed']).isRequired,
  /**
   * The element to render as the component root; `button` by default
   */
  as: PropTypes.elementType,
  /**
   * Specifies if interaction with `ToggleButton` is `enabled`, `disabled`, or `readonly`
   */
  interaction: PropTypes.oneOf(['enabled', 'disabled', 'readonly']),
  /**
   * The size of the `ToggleButton`
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Provides a reference to `ToggleButton`'s underlying HTML element
   */
  elementRef: PropTypes.func,
  /**
   * Callback fired when the `ToggleButton` is clicked
   */
  onClick: PropTypes.func,
  /**
   * The color in which to display the icon
   */
  color: PropTypes.string,
  /**
   * By default, the tooltip will show on hover/focus. Use this prop if you need to override that behavior.
   */
  isShowingTooltip: PropTypes.bool,
  /**
   * An element or a function returning an element to use as the mount node
   */
  mountNode: PositionPropTypes.mountNode,
  /**
   * The placement of the tooltip in relation to the button
   */
  placement: PositionPropTypes.placement,
  /**
   * The parent in which to constrain the tooltip.
   * One of: 'window', 'scroll-parent', 'parent', 'none', an element,
   * or a function returning an element.
   */
  constrain: PositionPropTypes.constrain
}

const allowedProps: AllowedPropKeys = [
  'as',
  'color',
  'constrain',
  'elementRef',
  'interaction',
  'isShowingTooltip',
  'mountNode',
  'onClick',
  'placement',
  'renderIcon',
  'renderTooltipContent',
  'screenReaderLabel',
  'size',
  'status'
]

export type { ToggleButtonProps }
export { propTypes, allowedProps }
