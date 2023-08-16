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

import type { ColorIndicatorProps, ColorIndicatorStyle } from './props'
import type { ColorIndicatorTheme } from '@instructure/shared-types'
import type { RGBAType } from '@instructure/ui-color-utils'
import { isValid } from '@instructure/ui-color-utils'
import { colorToRGB } from '@instructure/ui-color-utils'

const calcBlendedColor = (c1: RGBAType, c2: RGBAType) => {
  // 0.4 as decided by design
  const c2Alpha = c2.a * 0.4
  const c1Alpha = 1 - c2Alpha
  const alpha = 1 - c1Alpha * (1 - c1Alpha)

  return `rgba(
      ${(c2.r * c2Alpha) / alpha + (c1.r * c1Alpha * (1 - c2Alpha)) / alpha},
      ${(c2.g * c2Alpha) / alpha + (c1.g * c1Alpha * (1 - c2Alpha)) / alpha},
      ${(c2.b * c2Alpha) / alpha + (c1.b * c1Alpha * (1 - c2Alpha)) / alpha},
      ${c2.a < 0.6 ? 0.6 : c2.a})`
}
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
  componentTheme: ColorIndicatorTheme,
  props: ColorIndicatorProps
): ColorIndicatorStyle => {
  const { color, shape } = props

  return {
    colorIndicator: {
      label: 'colorIndicator',
      width:
        shape === 'rectangle'
          ? componentTheme.rectangleIndicatorSize
          : componentTheme.circleIndicatorSize,
      height:
        shape === 'rectangle'
          ? componentTheme.rectangleIndicatorSize
          : componentTheme.circleIndicatorSize,
      borderRadius:
        shape === 'rectangle'
          ? componentTheme.rectangularIndicatorBorderRadius
          : componentTheme.circleIndicatorSize,
      boxSizing: 'border-box',
      borderWidth: componentTheme.borderWidth,
      boxShadow: color ? `inset 0 0 0 1.5rem ${color}` : 'none',
      borderStyle: 'solid',
      backgroundImage: componentTheme.backgroundImage,
      backgroundSize: componentTheme.backgroundSize,
      backgroundPosition: componentTheme.backgroundPosition,
      borderColor: calcBlendedColor(
        colorToRGB(componentTheme.colorIndicatorBorderColor),
        colorToRGB(isValid(color!) ? color! : '#fff')
      )
    }
  }
}

export default generateStyle
