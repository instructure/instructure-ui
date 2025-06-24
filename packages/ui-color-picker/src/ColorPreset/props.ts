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
  PropValidators,
  ColorPresetTheme
} from '@instructure/shared-types'
import type { RGBAType } from '@instructure/ui-color-utils'

type ContrastStrength = 'min' | 'mid' | 'max'

type ColorPresetOwnProps = {
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
    /**
     * screenReaderLabel for the add new preset button
     */
    addNewPresetButtonScreenReaderLabel: string
    selectColorLabel: string
    removeColorLabel: string
    onPresetChange: (colors: ColorPresetOwnProps['colors']) => void
    popoverAddButtonLabel: string
    popoverCloseButtonLabel: string
    maxHeight?: string
    colorMixer: {
      withAlpha?: boolean
      rgbRedInputScreenReaderLabel: string
      rgbGreenInputScreenReaderLabel: string
      rgbBlueInputScreenReaderLabel: string
      rgbAlphaInputScreenReaderLabel: string
      colorSliderNavigationExplanationScreenReaderLabel: string
      alphaSliderNavigationExplanationScreenReaderLabel: string
      colorPaletteNavigationExplanationScreenReaderLabel: string
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
  selected?: string
  /**
   * A function for formatting the text provided to screen readers about the color.
   *
   * @param {string} hexCode - The hexadecimal color code (e.g., "#FFFFFF") of the current color option. Provided by the component - treat as read-only.
   *
   * @param {boolean} isSelected - Indicates whether this color is currently selected. Provided by the component - treat as read-only.
   *
   * Sets the aria-label attribute of the color.
   *
   * If not set, aria-label defaults to the hex code of the color.
   */
  colorScreenReaderLabel?: (hexCode: string, isSelected: boolean) => string
}

type ColorPresetState = {
  openEditor: boolean | string
  openAddNew: boolean
  newColor: RGBAType
}

type PropKeys = keyof ColorPresetOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type ColorPresetProps = ColorPresetOwnProps &
  WithStyleProps<ColorPresetTheme, ColorPresetStyle> &
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
  colors: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.string,
  disabled: PropTypes.bool,
  elementRef: PropTypes.func,
  label: PropTypes.string,
  popoverScreenReaderLabel: PropTypes.string,
  colorScreenReaderLabel: PropTypes.func,
  colorMixerSettings: PropTypes.shape({
    addNewPresetButtonScreenReaderLabel: PropTypes.string.isRequired,
    selectColorLabel: PropTypes.string.isRequired,
    removeColorLabel: PropTypes.string.isRequired,
    onPresetChange: PropTypes.func,
    popoverAddButtonLabel: PropTypes.string.isRequired,
    popoverCloseButtonLabel: PropTypes.string.isRequired,
    maxHeight: PropTypes.string,
    colorMixer: PropTypes.shape({
      withAlpha: PropTypes.bool,
      rgbRedInputScreenReaderLabel: PropTypes.string.isRequired,
      rgbGreenInputScreenReaderLabel: PropTypes.string.isRequired,
      rgbBlueInputScreenReaderLabel: PropTypes.string.isRequired,
      rgbAlphaInputScreenReaderLabel: PropTypes.string.isRequired,
      colorSliderNavigationExplanationScreenReaderLabel:
        PropTypes.string.isRequired,
      alphaSliderNavigationExplanationScreenReaderLabel:
        PropTypes.string.isRequired,
      colorPaletteNavigationExplanationScreenReaderLabel:
        PropTypes.string.isRequired
    }).isRequired,
    colorContrast: PropTypes.shape({
      firstColor: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      successLabel: PropTypes.string.isRequired,
      failureLabel: PropTypes.string.isRequired,
      normalTextLabel: PropTypes.string.isRequired,
      largeTextLabel: PropTypes.string.isRequired,
      graphicsTextLabel: PropTypes.string.isRequired,
      firstColorLabel: PropTypes.string.isRequired,
      secondColorLabel: PropTypes.string.isRequired
    })
  })
}

const allowedProps: AllowedPropKeys = [
  'colors',
  'disabled',
  'elementRef',
  'label',
  'colorMixerSettings',
  'onSelect',
  'popoverScreenReaderLabel',
  'selected',
  'colorScreenReaderLabel'
]

export type {
  ColorPresetProps,
  ColorPresetStyle,
  ColorPresetState,
  ContrastStrength
}
export { propTypes, allowedProps }
