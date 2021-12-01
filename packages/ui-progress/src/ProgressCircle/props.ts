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
  PropValidators,
  AsElementType,
  ProgressCircleTheme,
  OtherHTMLAttributes
} from '@instructure/shared-types'

export type ProgressCircleMeterColor =
  | 'info'
  | 'warning'
  | 'danger'
  | 'alert'
  | 'success'
  | 'brand'

export type Values = { valueNow: number; valueMax: number }

type ProgressCircleOwnProps = {
  /**
   * A label is required for accessibility
   */
  screenReaderLabel: string
  /**
   * Control the size of the progress circle
   */
  size?: 'x-small' | 'small' | 'medium' | 'large'
  /**
   * Maximum value (defaults to 100)
   */
  valueMax?: Values['valueMax']
  /**
   * Receives the progress of the event
   */
  valueNow?: Values['valueNow']
  /**
   * A function for formatting the text provided to screen readers via `aria-valuenow`
   */
  formatScreenReaderValue?: (values: Values) => string
  /**
   * A function to format the displayed value. If null the value will not display.
   * Takes `valueNow` and `valueMax` as parameters.
   */
  renderValue?: ((values: Values) => React.ReactNode) | React.ReactNode
  /**
   * Controls the overall color scheme of the component
   */
  color?: 'primary' | 'primary-inverse'
  /**
   * Control the color of the progress meter. Defaults to showing theme success
   * color on completion, based on `valueNow` and `valueMax`.
   */
  meterColor?:
    | ((values: Values) => ProgressCircleMeterColor)
    | ProgressCircleMeterColor
  /**
   * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `margin="small auto large"`.
   */
  margin?: Spacing
  /**
   * Provides a reference to the component's root HTML element
   */
  elementRef?: (element: Element | null) => void
  /**
   * Set the element type of the component's root
   */
  as?: AsElementType
  shouldAnimateOnMount?: boolean
  animationDelay?: number
}

export type ProgressCircleState = {
  shouldAnimateOnMount: boolean
}

type PropKeys = keyof ProgressCircleOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type ProgressCircleProps = ProgressCircleOwnProps &
  WithStyleProps<ProgressCircleTheme, ProgressCircleStyle> &
  OtherHTMLAttributes<ProgressCircleOwnProps>

type ProgressCircleStyle = ComponentStyle<
  | 'progressCircle'
  | 'center'
  | 'value'
  | 'circle'
  | 'track'
  | 'border'
  | 'meter'
  | 'dashOffset'
> & { radii: { radius: string; borderOffsetRadius: string } }

const propTypes: PropValidators<PropKeys> = {
  screenReaderLabel: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),
  valueMax: PropTypes.number,
  valueNow: PropTypes.number,
  formatScreenReaderValue: PropTypes.func,
  renderValue: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  color: PropTypes.oneOf(['primary', 'primary-inverse']),
  meterColor: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.oneOf(['info', 'warning', 'danger', 'alert', 'success', 'brand'])
  ]),
  margin: ThemeablePropTypes.spacing,
  elementRef: PropTypes.func,
  as: PropTypes.elementType,
  shouldAnimateOnMount: PropTypes.bool,
  animationDelay: PropTypes.number
}

const allowedProps: AllowedPropKeys = [
  'screenReaderLabel',
  'size',
  'valueMax',
  'valueNow',
  'formatScreenReaderValue',
  'renderValue',
  'color',
  'meterColor',
  'margin',
  'elementRef',
  'as',
  'shouldAnimateOnMount',
  'animationDelay'
]

export type { ProgressCircleProps, ProgressCircleStyle }
export { propTypes, allowedProps }
