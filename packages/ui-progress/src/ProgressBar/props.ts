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

import type { Spacing, WithStyleProps } from '@instructure/emotion'
import type { PropValidators } from '@instructure/shared-types'
import type { AsElementType } from '@instructure/shared-types'

export type ProgressBarMeterColor =
  | 'info'
  | 'warning'
  | 'danger'
  | 'alert'
  | 'success'
  | 'brand'

type ProgressBarOwnProps = {
  screenReaderLabel: string
  size?: 'x-small' | 'small' | 'medium' | 'large'
  valueMax?: number
  valueNow?: number
  formatScreenReaderValue?: (...args: any[]) => any
  renderValue?: ((...args: any[]) => any) | React.ReactNode
  color?: 'primary' | 'primary-inverse'
  meterColor?:
    | ((...args: any[]) => ProgressBarMeterColor)
    | ProgressBarMeterColor
  margin?: Spacing
  elementRef?: (...args: any[]) => any
  as?: AsElementType
}

type PropKeys = keyof ProgressBarOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type ProgressBarProps = ProgressBarOwnProps & WithStyleProps

const propTypes: PropValidators<PropKeys> = {
  /**
   * A label is required for accessibility
   */
  screenReaderLabel: PropTypes.string.isRequired,
  /**
   * Control the height of the progress bar
   */
  size: PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),
  /**
   * Maximum value (defaults to 100)
   */
  valueMax: PropTypes.number,
  /**
   * Receives the progress of the event
   */
  valueNow: PropTypes.number,
  /**
   * A function for formatting the text provided to screen readers via `aria-valuenow`
   */
  formatScreenReaderValue: PropTypes.func,
  /**
   * A function to format the displayed value. If null the value will not display.
   * Takes `valueNow` and `valueMax` as parameters.
   */
  renderValue: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  /**
   * Controls the overall color scheme of the component
   */
  color: PropTypes.oneOf(['primary', 'primary-inverse']),
  /**
   * Control the color of the progress meter. Defaults to showing theme success
   * color on completion, based on `valueNow` and `valueMax`.
   */
  meterColor: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.oneOf(['info', 'warning', 'danger', 'alert', 'success', 'brand'])
  ]),
  /**
   * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `margin="small auto large"`.
   */
  margin: ThemeablePropTypes.spacing,
  /**
   * Provides a reference to the component's root HTML element
   */
  elementRef: PropTypes.func,
  /**
   * Set the element type of the component's root
   */
  as: PropTypes.elementType
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
  'as'
]

export type { ProgressBarProps }
export { propTypes, allowedProps }
