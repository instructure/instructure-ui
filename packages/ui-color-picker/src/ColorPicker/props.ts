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

import type { FormMessage } from '@instructure/ui-form-field'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import type {
  ColorPickerTheme,
  OtherHTMLAttributes,
  PropValidators
} from '@instructure/shared-types'

type ContrastStrength = 'min' | 'mid' | 'max'
type MessageType = Array<FormMessage>

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
   * If set, the default popover will appear for the picker. Those components whose corresponding keys aren't provided (e.g. `colorMixer`, `colorPreset` or `colorContrast`)
   * will not be rendered.
   */
  colorMixerSettings?: {
    colorMixer?: {
      withAlpha: boolean
    }
    colorPreset?: {
      colors: Array<string>
      label: string
      addNewPresetButtonScreenReaderLabel: string
    }
    colorContrast?: {
      firstColor: string
      label: string
      successLabel: string
      failureLabel: string
      normalTextLabel: string
      largeTextLabel: string
      graphicsTextLabel: string
      firstColorLabel: string
      secondColorLabel: string
    }
  }
  /**
   * If a child function is provided, the component will render it to the popover.
   */
  children?: (
    value: string,
    onChange: (hex: string) => void,
    handleAdd: () => void,
    handleClose: () => void
  ) => Node
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
   * If set, it will set the popover's max height. Useful when the popover is too big
   */
  popoverMaxHeight?: string
  /**
   * Sets the ScreenReaderLabel for the popover
   */
  popoverScreenReaderLabel?: string
  /**
   * Sets the ScreenReaderLabel for the popover Button
   */
  popoverButtonScreenReaderLabel?: string
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
   * If set, an info icon with a tooltip will be displayed
   */
  tooltip?: React.ReactNode

  /**
   * If set, the component will behave as controlled
   */
  value?: string

  /**
   * The width of the input.
   */
  width?: string
  /**
   * If true, alpha slider will be rendered. Deafults to false
   */
  withAlpha?: boolean
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
  | 'simpleColorContainer'
  | 'hashMarkContainer'
  | 'errorIcons'
  | 'successIcon'
  | 'label'
  | 'popoverContent'
  | 'popoverContentBlock'
  | 'popoverFooter'
  | 'colorMixerButtonContainer'
  | 'popoverContentContainer'
>

const propTypes: PropValidators<PropKeys> = {
  checkContrast: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  colorMixerSettings: PropTypes.object,
  children: PropTypes.func,
  disabled: PropTypes.bool,
  elementRef: PropTypes.func,
  isRequired: PropTypes.bool,
  label: PropTypes.node,
  onChange: PropTypes.func,
  placeholderText: PropTypes.string,
  popoverScreenReaderLabel: PropTypes.string,
  popoverButtonScreenReaderLabel: PropTypes.string,
  popoverMaxHeight: PropTypes.string,
  renderInvalidColorMessage: PropTypes.func,
  renderIsRequiredMessage: PropTypes.func,
  renderMessages: PropTypes.func,
  tooltip: PropTypes.node,
  value: PropTypes.string,
  width: PropTypes.string,
  withAlpha: PropTypes.bool
}

const allowedProps: AllowedPropKeys = [
  'checkContrast',
  'colorMixerSettings',
  'children',
  'disabled',
  'elementRef',
  'isRequired',
  'label',
  'onChange',
  'placeholderText',
  'popoverScreenReaderLabel',
  'popoverButtonScreenReaderLabel',
  'popoverMaxHeight',
  'renderInvalidColorMessage',
  'renderIsRequiredMessage',
  'renderMessages',
  'tooltip',
  'value',
  'width',
  'withAlpha'
]

export type {
  ColorPickerProps,
  ColorPickerStyle,
  ColorPickerState,
  ContrastStrength,
  MessageType
}
export { propTypes, allowedProps }
