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
import { element } from '@instructure/ui-prop-types'

import type {
  PropValidators,
  AsElementType,
  TooltipTheme,
  OtherHTMLAttributes
} from '@instructure/shared-types'
import type {
  PlacementPropValues,
  PositionConstraint,
  PositionMountNode
} from '@instructure/ui-position'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import type { PopoverOwnProps } from '@instructure/ui-popover'
import type { WithDeterministicIdProps } from '@instructure/ui-react-utils'
import { Renderable } from '@instructure/shared-types'

type TooltipRenderChildrenArgs = {
  focused: boolean
  getTriggerProps: <TriggerProps extends Record<string, any>>(
    props: TriggerProps
  ) => { 'aria-describedby': string } & TriggerProps
}

type TooltipRenderChildren = (
  args: TooltipRenderChildrenArgs
) => React.ReactNode

type TooltipOwnProps = {
  /**
   * provides a reference to the underlying html root element
   */
  elementRef?: (element: Element | null) => void
  /**
   * A ReactNode or a function that returns a ReactNode with the following params:
   *
   * @param {Boolean} focused - Is the Tooltip trigger focused?
   * @param {Function} getTriggerProps - Props to be spread onto the trigger element
   */
  children: React.ReactNode | TooltipRenderChildren

  /**
   * The content to render in the tooltip
   */
  renderTip: Renderable

  /**
   * Whether or not the tooltip content is shown, when controlled
   */
  isShowingContent?: boolean

  /**
   * Whether or not to show the content by default, when uncontrolled
   */
  defaultIsShowingContent?: boolean

  /**
   * the element type to render as (assumes a single child if 'as' is undefined)
   */
  as?: AsElementType

  /**
   * The action that causes the Content to display (`click`, `hover`, `focus`)
   */
  on?: ('click' | 'hover' | 'focus') | ('click' | 'hover' | 'focus')[]

  /**
   * The color of the tooltip content
   */
  color?: 'primary' | 'primary-inverse'

  /**
   * Specifies where the Tooltip will be placed in relation to the target element.
   * Ex. placement="bottom" will render the Tooltip below the triggering element
   * (Note: if there is not room, it will position opposite. Ex. "top" will
   * automatically switch to "bottom")
   */
  placement?: PlacementPropValues

  /**
   * An element or a function returning an element to use as the mount node
   * for the `<Tooltip />` (defaults to `document.body`)
   */
  mountNode?: PositionMountNode

  /**
   * The parent in which to constrain the tooltip.
   * One of: 'window', 'scroll-parent', 'parent', 'none', an element,
   * or a function returning an element
   */
  constrain?: PositionConstraint

  /**
   * The horizontal offset for the positioned content
   */
  offsetX?: string | number

  /**
   * The vertical offset for the positioned content
   */
  offsetY?: string | number

  /**
   * Target element for positioning the Tooltip (if it differs from children/trigger)
   */
  positionTarget?: PositionMountNode

  /**
   * Callback fired when content is shown. When controlled, this callback is
   * fired when the tooltip expects to be shown
   */
  onShowContent?: (event: React.UIEvent | React.FocusEvent) => void

  /**
   * Callback fired when content is hidden. When controlled, this callback is
   * fired when the tooltip expects to be hidden
   */
  onHideContent?: (
    event: React.UIEvent | React.FocusEvent,
    args: { documentClick: boolean }
  ) => void
}

type PropKeys = keyof TooltipOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

// passes through props for Popover, except the ones set manually
type PropsPassableToPopover = Omit<
  PopoverOwnProps,
  | 'isShowingContent'
  | 'defaultIsShowingContent'
  | 'on'
  | 'shouldRenderOffscreen'
  | 'shouldReturnFocus'
  | 'placement'
  | 'color'
  | 'children'
  | 'mountNode'
  | 'constrain'
  | 'shadow'
  | 'offsetX'
  | 'offsetY'
  | 'positionTarget'
  | 'renderTrigger'
  | 'onShowContent'
  | 'onHideContent'
  | 'onFocus'
  | 'onBlur'
  | 'elementRef'
>

type TooltipProps = PropsPassableToPopover &
  TooltipOwnProps &
  WithStyleProps<TooltipTheme, TooltipStyle> &
  // the OtherHTMLAttributes might be passed to the trigger or Popover
  OtherHTMLAttributes<TooltipOwnProps> &
  WithDeterministicIdProps

type TooltipStyle = ComponentStyle<'tooltip'>

type TooltipState = {
  hasFocus: boolean
}

const propTypes: PropValidators<PropKeys> = {
  elementRef: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  renderTip: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  isShowingContent: PropTypes.bool,
  defaultIsShowingContent: PropTypes.bool,
  as: PropTypes.elementType, // eslint-disable-line react/require-default-props
  on: PropTypes.oneOfType([
    PropTypes.oneOf(['click', 'hover', 'focus']),
    PropTypes.arrayOf(PropTypes.oneOf(['click', 'hover', 'focus']))
  ]),
  color: PropTypes.oneOf(['primary', 'primary-inverse']),
  placement: PositionPropTypes.placement,
  mountNode: PositionPropTypes.mountNode,
  constrain: PositionPropTypes.constrain,
  offsetX: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  offsetY: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  positionTarget: PropTypes.oneOfType([element, PropTypes.func]),
  onShowContent: PropTypes.func,
  onHideContent: PropTypes.func
}

const allowedProps: AllowedPropKeys = [
  'elementRef',
  'children',
  'renderTip',
  'isShowingContent',
  'defaultIsShowingContent',
  'as',
  'on',
  'color',
  'placement',
  'mountNode',
  'constrain',
  'offsetX',
  'offsetY',
  'positionTarget',
  'onShowContent',
  'onHideContent'
]

export type {
  TooltipProps,
  TooltipState,
  TooltipStyle,
  TooltipRenderChildren,
  TooltipRenderChildrenArgs
}
export { propTypes, allowedProps }
