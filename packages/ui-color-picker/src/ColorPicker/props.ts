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

import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import type {
  ColorPickerTheme,
  OtherHTMLAttributes,
  PropValidators
} from '@instructure/shared-types'

type ContrastStrength = 'min' | 'mid' | 'max'
type MessageType = Array<{
  type: 'success' | 'hint' | 'error' | 'screenreader-only'
  text: string
}>

type ColorPickerOwnProps = {
  /**
   * Configures the contrast checker. If false, there will be no checking.
   *
   *
   * isStrict: if it's true, it will display an error if false, a warning
   *
   * contrastStrength: can be one of ('min','mid','max'), which translates to 3:1, 4.5:1, 7:1 contrast, defalts to 'mid'
   *
   * contrastAgainst: is the color which the component checks the contrast against. Accepts hex, defaults to #ffffff
   *
   * renderContrastSuccessMessage: if set and the contrast is high enough, it will display the message
   *
   * renderContrastErrorMessage: if set and the contrast is not high enough, it will display the message
   *
   *
   * MessageType: Array<{
   *   type: 'success' | 'hint' | 'error' | 'screenreader-only'
   *   text: string
   * }>
   */
  checkContrast?: {
    isStrict: boolean
    contrastStrength?: ContrastStrength
    contrastAgainst?: string
    renderContrastSuccessMessage?: (
      contrast: number,
      minContrast: number
    ) => MessageType

    renderContrastErrorMessage?: (
      contrast: number,
      minContrast: number
    ) => MessageType
  }

  /**
   * Sets the input to disabled state
   */
  disabled?: boolean

  /**
   * provides a reference to the underlying html root element
   */
  elementRef: (element: Element | null) => void

  /**
   * If true, it will display a red error ring or a message after a blur event and remove it after a change event
   */
  isRequired?: boolean

  /**
   * The label of the component
   */
  label: string

  /**
   * If 'value' is set, this must be set. It'll be called on every change
   */
  onChange?: (value: string) => void

  /**
   * Placeholder for the inputfield
   */
  placeholderText: string

  /**
   * If set and the hex is invalid, it will display the message after a blur event and remove it after a change event
   *
   * MessageType: Array<{
   *   type: 'success' | 'hint' | 'error' | 'screenreader-only'
   *   text: string
   * }>
   */
  renderInvalidColorMessage?: (hexCode: string) => MessageType

  /**
   * If set, isRequired is true and the input is empty, it will display the message after a blur event and remove it after a change event
   *
   * MessageType: Array<{
   *   type: 'success' | 'hint' | 'error' | 'screenreader-only'
   *   text: string
   * }>
   */
  renderIsRequiredMessage?: () => MessageType

  /**
   * If set, it will display the message it returns
   *
   * MessageType: Array<{
   *   type: 'success' | 'hint' | 'error' | 'screenreader-only'
   *   text: string
   * }>
   */
  renderMessages?: (
    hexCode: string,
    isValidHex: boolean,
    minContrast: number,
    contrast?: number
  ) => MessageType

  /**
   * If set, the color picker will act as a color input only`
   */
  simpleView: boolean

  /**
   * If set, an info icon with a tooltip will be displayed
   */
  tooltip?: Node

  /**
   * If set, the component will behave as controlled
   */
  value?: string

  /**
   * The width of the input.
   */
  width?: string
}

type ColorPickerState = {
  hexCode: string
  showHelperErrorMessages: boolean
  openColorPicker: boolean
  mixedColor: string
}

type PropKeys = keyof ColorPickerOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type ColorPickerProps = ColorPickerOwnProps &
  WithStyleProps<ColorPickerTheme, ColorPickerStyle> &
  OtherHTMLAttributes<ColorPickerOwnProps>

type ColorPickerStyle = ComponentStyle<
  | 'colorPicker'
  | 'colorCircle'
  | 'simpleColorContainer'
  | 'hashMarkContainer'
  | 'errorIcons'
  | 'successIcon'
  | 'label'
  | 'tooltip'
>

const propTypes: PropValidators<PropKeys> = {
  checkContrast: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  disabled: PropTypes.bool,
  elementRef: PropTypes.func,
  isRequired: PropTypes.bool,
  label: PropTypes.node,
  onChange: PropTypes.func,
  placeholderText: PropTypes.string,
  renderInvalidColorMessage: PropTypes.func,
  renderIsRequiredMessage: PropTypes.func,
  renderMessages: PropTypes.func,
  simpleView: PropTypes.bool,
  tooltip: PropTypes.node,
  value: PropTypes.string,
  width: PropTypes.string
}

const allowedProps: AllowedPropKeys = [
  'checkContrast',
  'disabled',
  'elementRef',
  'isRequired',
  'label',
  'onChange',
  'placeholderText',
  'renderInvalidColorMessage',
  'renderIsRequiredMessage',
  'renderMessages',
  'simpleView',
  'tooltip',
  'value',
  'width'
]

export type {
  ColorPickerProps,
  ColorPickerStyle,
  ColorPickerState,
  ContrastStrength,
  MessageType
}
export { propTypes, allowedProps }
