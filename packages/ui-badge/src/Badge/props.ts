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

import { PositionPropTypes } from '@instructure/ui-position'
import { ThemeablePropTypes } from '@instructure/emotion'

import type {
  AsElementType,
  BadgeTheme,
  PropValidators
} from '@instructure/shared-types'
import type {
  Spacing,
  WithStyleProps,
  ComponentStyle
} from '@instructure/emotion'
import type { PlacementPropValues } from '@instructure/ui-position'
import type { WithDeterministicIdProps } from '@instructure/ui-react-utils'
import type { PropsWithChildren } from 'react'

type BadgeOwnProps = {
  count?: number
  /**
   * The number at which the count gets truncated by
   * formatOverflowText. For example, a countUntil of 100
   * would stop the count at 99.
   */
  countUntil?: number
  /**
   * Render Badge as a counter (`count`) or as a smaller dot (`notification`) with
   * no count number displayed.
   */
  type?: 'count' | 'notification'
  /**
   * Render Badge as an inline html element that is not positioned relative
   * to a child.
   */
  standalone?: boolean
  /**
   * Make the Badge slowly pulse twice to get the user's attention.
   */
  pulse?: boolean
  variant?: 'primary' | 'success' | 'danger' | 'inverse'
  /**
   * provides a reference to the underlying html root element
   */
  elementRef?: (element: Element | null) => void
  formatOverflowText?: (count: number, countUntil: number) => string
  formatOutput?: (formattedCount: string) => JSX.Element | string | number
  as?: AsElementType
  /**
   * Specifies the display property of the container.
   *
   * __Use "block" only when the content inside the Badge also has "block" display.__
   */
  display?: 'inline-block' | 'block'
  /**
   * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `margin="small auto large"`.
   */
  margin?: Spacing
  /**
   * Supported values are `top start`, `top end`, `end center`, `bottom end`,
   * `bottom start`, and `start center`
   */
  placement?: PlacementPropValues
} & PropsWithChildren<unknown> // <unknown is needed for React 17 support

type PropKeys = keyof BadgeOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type BadgeProps = BadgeOwnProps &
  WithStyleProps<BadgeTheme, BadgeStyle> &
  WithDeterministicIdProps

type BadgeStyle = ComponentStyle<'badge' | 'wrapper'>

const propTypes: PropValidators<PropKeys> = {
  count: PropTypes.number,
  countUntil: PropTypes.number,
  children: PropTypes.element,
  type: PropTypes.oneOf(['count', 'notification']),
  standalone: PropTypes.bool,
  pulse: PropTypes.bool,
  variant: PropTypes.oneOf(['primary', 'success', 'danger', 'inverse']),
  placement: PositionPropTypes.placement,
  display: PropTypes.oneOf(['inline-block', 'block']),
  margin: ThemeablePropTypes.spacing,
  elementRef: PropTypes.func,
  formatOverflowText: PropTypes.func,
  formatOutput: PropTypes.func,
  as: PropTypes.elementType // eslint-disable-line react/require-default-props
}

const allowedProps: AllowedPropKeys = [
  'count',
  'countUntil',
  'children',
  'type',
  'standalone',
  'pulse',
  'variant',
  'placement',
  'display',
  'margin',
  'elementRef',
  'formatOverflowText',
  'formatOutput',
  'as'
]

export type { BadgeProps, BadgeStyle }
export { propTypes, allowedProps }
