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

import { colorIndicatorBorderColor } from '../../ColorIndicator/theme'
import type { SliderStyle, SliderProps } from './props'
import type { ColorMixerSliderTheme } from '@instructure/shared-types'

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
  componentTheme: ColorMixerSliderTheme,
  props: SliderProps,
  state: any
): SliderStyle => {
  const sliderBackground = props.isColorSlider
    ? {
        background:
          'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)'
      }
    : {
        background: componentTheme.checkerboardBackgroundImage,
        backgroundSize: componentTheme.checkerboardBackgroundSize,
        backgroundPosition: componentTheme.checkerboardBackgroundPosition
      }

  return {
    colorSlider: {
      label: 'colorMixerSlider',
      width: props.width,
      height: props.height,
      position: 'relative'
    },
    indicator: {
      label: 'colorMixerSlider__indicator',
      width: `${props.indicatorRadius / 8}rem`,
      height: `${props.indicatorRadius / 8}rem`,
      borderRadius: `${props.indicatorRadius / 8}rem`,
      background: 'white',
      position: 'absolute',
      borderStyle: 'solid',
      borderWidth: componentTheme.smallBorder,
      borderColor: componentTheme.indicatorBorderColor,
      top: `-0.1875rem`,
      left: `${
        (state?.calcSliderPositionFromValue?.(props.value) -
          props.indicatorRadius) /
        16
      }rem`,
      zIndex: componentTheme.stackAbove
    },

    sliderBackground: {
      label: 'colorMixerSlider__sliderBackground',
      borderRadius: `${props.height / 16}rem`,
      width: `${props.width / 16}rem`,
      height: `${props.height / 16}rem`,
      boxSizing: 'border-box',
      ...sliderBackground
    },
    slider: {
      label: 'colorMixerSlider__slider',
      width: `${props.width / 16}rem`,
      height: `${props.height / 16}rem`,
      background: props.isColorSlider
        ? 'transparent'
        : `linear-gradient(to right, rgba(255,0,0,0), ${props.color?.slice(
            0,
            -2
          )})`,
      borderRadius: `${props.height / 16}rem`,

      boxSizing: 'border-box',

      borderStyle: 'solid',
      borderColor: colorIndicatorBorderColor,
      borderWidth: componentTheme.smallBorder
    }
  }
}

export default generateStyle
