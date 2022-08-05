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

import type {
  ColorPaletteStyle,
  ColorPaletteProps,
  ColorPaletteState
} from './props'
import type { ColorMixerPaletteTheme } from '@instructure/shared-types'
import { px } from '@instructure/ui-utils'

/**
 * ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param  {Object} componentTheme The theme variable object.
 * @param  {Object} props the props of the component, the style is applied to
 * @param  {Object} state the state of the component, the style is applied to
 * @return {Object} The final style object, which will be used in the component
 */
const generateStyle = (
  componentTheme: ColorMixerPaletteTheme,
  props: ColorPaletteProps,
  state: ColorPaletteState
): ColorPaletteStyle => {
  return {
    ColorPalette: {
      label: 'ColorPalette'
    },
    indicator: {
      label: 'ColorPalette__indicator',
      width: `${props.indicatorRadius / 8}rem`,
      height: `${props.indicatorRadius / 8}rem`,
      borderRadius: `${props.indicatorRadius / 8}rem`,
      background: componentTheme.whiteColor,
      position: 'absolute',
      borderStyle: 'solid',
      borderWidth: componentTheme.indicatorBorderWidth,
      borderColor: componentTheme.indicatorBorderColor,
      top: `${
        state?.colorPosition?.y - 1 - px(`${props.indicatorRadius / 16}rem`)
      }px`,
      left: `${
        state?.colorPosition?.x - 1 - px(`${props.indicatorRadius / 16}rem`)
      }px`
    },
    palette: {
      label: 'ColorPalette__palette',
      width: `${props.width / 16}rem`,
      height: `${props.height / 16}rem`,
      borderRadius: componentTheme.paletteBorderRadius,
      borderStyle: 'solid',
      borderWidth: componentTheme.paletteBorderWidth,
      boxSizing: 'border-box',
      borderColor: componentTheme.colorIndicatorBorderColor,
      background: `linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1)),
      linear-gradient(to right, white, hsl(${props.hue},100%,50%))`
    },
    disabledOverlay: {
      label: 'ColorPalette__disabledOverlay',
      background: 'rgba(255,255,255,.5)',
      zIndex: componentTheme.disabledOverlayZIndex,
      width: `${props.width / 16 + 1}rem`,
      height: `${props.height / 16 + 1}rem`,
      position: 'absolute',
      top: '-.5rem',
      left: '-.5rem'
    }
  }
}

export default generateStyle
