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
  OtherHTMLAttributes,
  PropValidators
} from '@instructure/shared-types'
import type { RGBAType } from '../ColorMixer/props'

type ContrastStrength = 'min' | 'mid' | 'max'
type MessageType = Array<{
  type: 'success' | 'hint' | 'error' | 'screenreader-only'
  text: string
}>

type ColorPresetOwnProps = {
  /**
   * screenReaderLabel for the add new preset button
   */
  addNewPresetButtonScreenReaderLabel: string
  /**
   * Array of HEX strings which are the preset colors. Supports 8 character HEX (with alpha)
   */
  colors: Array<string>
  /**
   * Makes the component uninteractable
   */
  disabled?: boolean
  /**
   * Provides a reference to the component's underlying html element.
   */
  elementRef?: (element: Element | null) => void
  /**
   * Label text of the component
   */
  label?: string

  /**
   * If set, a `plus` button will appear for the preset. Those components whose corresponding keys aren't provided (`colorMixer` or `colorContrast`)
   * will not be rendered.
   * The `onPresetChange` function gets called when a color gets added or removed from the preset list.
   * It will be called with the new list of colors
   */
  colorMixerSettings?: {
    maxHeight: string
    onPresetChange: (colors: ColorPresetOwnProps['colors']) => void
    colorMixer: {
      withAlpha: boolean
      rgbRedInputScreenReaderLabel: string
      rgbGreenInputScreenReaderLabel: string
      rgbBlueInputScreenReaderLabel: string
      rgbAlphaInputScreenReaderLabel: string
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
   * The function gets called when a color gets selected
   */
  onSelect: (selected: string) => void
  /**
   * Sets the ScreenReaderLabel for the popover
   */
  popoverScreenReaderLabel?: string
  /**
   * The currently selected HEX string
   */
  selected: string | null
}

type ColorPresetState = {
  openEditor: boolean | string
  openAddNew: boolean
  newColor: RGBAType
}

type PropKeys = keyof ColorPresetOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type ColorPresetProps = ColorPresetOwnProps &
  WithStyleProps<null, ColorPresetStyle> &
  OtherHTMLAttributes<ColorPresetOwnProps>

type ColorPresetStyle = ComponentStyle<
  | 'colorPreset'
  | 'addNewPresetButton'
  | 'selectedIndicator'
  | 'popoverContent'
  | 'popoverDivider'
  | 'popoverFooter'
  | 'label'
  | 'popoverContrastBlock'
>

const propTypes: PropValidators<PropKeys> = {
  addNewPresetButtonScreenReaderLabel: PropTypes.string,
  colors: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
  elementRef: PropTypes.func,
  label: PropTypes.string,
  colorMixerSettings: PropTypes.object,
  onSelect: PropTypes.func.isRequired,
  popoverScreenReaderLabel: PropTypes.string,
  selected: PropTypes.string.isRequired
}

const allowedProps: AllowedPropKeys = [
  'colors',
  'label',
  'colorMixerSettings',
  'onSelect',
  'selected'
]

export type {
  ColorPresetProps,
  ColorPresetStyle,
  ColorPresetState,
  ContrastStrength,
  MessageType
}
export { propTypes, allowedProps }
