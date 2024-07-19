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

import type { Theme, ThemeSpecificStyle } from '@instructure/ui-themes'
import { ProgressCircleTheme } from '@instructure/shared-types'

const radius = {
  xSmall: 1,
  small: 1.8,
  medium: 2.75,
  large: 3.5
}

const size = {
  xSmall: 3,
  small: 5,
  medium: 7,
  large: 9
}

const strokeWidth = {
  xSmall: 0.185,
  small: 0.5,
  medium: 0.625,
  large: 0.875
}

// Necessary to get the 1px border line to go "under" the meter
// strokeWidth is divided in half because SVG strokeWidth is
// centered along the path of the stroke, unlike CSS
const borderWidth = 0.0625
const borderOffsetRadius = {
  xSmall: radius.xSmall - strokeWidth.xSmall / 2 + borderWidth,
  small: radius.small - strokeWidth.small / 2 + borderWidth,
  medium: radius.medium - strokeWidth.medium / 2 + borderWidth,
  large: radius.large - strokeWidth.large / 2 + borderWidth
}

const circumference = function (r: number) {
  return (2 * Math.PI * r).toFixed(3)
}
const transform = function (s: number) {
  return s / 2
}

/**
 * Generates the theme object for the component from the theme and provided additional information
 * @param  {Object} theme The actual theme object.
 * @return {Object} The final theme object with the overrides and component variables
 */
const generateComponentTheme = (theme: Theme): ProgressCircleTheme => {
  const { colors, typography, key: themeName } = theme

  const themeSpecificStyle: ThemeSpecificStyle<ProgressCircleTheme> = {
    canvas: {
      color: theme['ic-brand-font-color-dark'],
      meterColorBrand: theme['ic-brand-primary']
    },
    'canvas-high-contrast': {
      meterColorBrandInverse: colors?.contrasts?.white1010,
      meterColorSuccessInverse: colors?.contrasts?.white1010,
      meterColorInfoInverse: colors?.contrasts?.white1010,
      meterColorAlertInverse: colors?.contrasts?.white1010,
      meterColorWarningInverse: colors?.contrasts?.white1010,
      meterColorDangerInverse: colors?.contrasts?.white1010
    }
  }

  const componentVariables: ProgressCircleTheme = {
    fontFamily: typography?.fontFamily,
    fontWeight: typography?.fontWeightNormal,
    lineHeight: typography?.lineHeightCondensed,

    xSmallSize: `${size.xSmall}em`,
    xSmallRadius: `${radius.xSmall}em`,
    xSmallCircumference: `${circumference(radius.xSmall)}em`,
    xSmallTransform: `${transform(size.xSmall)}em`,
    xSmallStrokeWidth: `${strokeWidth.xSmall}em`,
    xSmallBorderOffset: `${borderOffsetRadius.xSmall}em`,

    smallSize: `${size.small}em`,
    smallRadius: `${radius.small}em`,
    smallCircumference: `${circumference(radius.small)}em`,
    smallTransform: `${transform(size.small)}em`,
    smallStrokeWidth: `${strokeWidth.small}em`,
    smallBorderOffset: `${borderOffsetRadius.small}em`,

    mediumSize: `${size.medium}em`,
    mediumRadius: `${radius.medium}em`,
    mediumCircumference: `${circumference(radius.medium)}em`,
    mediumTransform: `${transform(size.medium)}em`,
    mediumStrokeWidth: `${strokeWidth.medium}em`,
    mediumBorderOffset: `${borderOffsetRadius.medium}em`,

    largeSize: `${size.large}em`,
    largeRadius: `${radius.large}em`,
    largeCircumference: `${circumference(radius.large)}em`,
    largeTransform: `${transform(size.large)}em`,
    largeStrokeWidth: `${strokeWidth.large}em`,
    largeBorderOffset: `${borderOffsetRadius.large}em`,

    color: colors?.contrasts?.grey125125,
    colorInverse: colors?.contrasts?.white1010,

    trackColor: colors?.contrasts?.white1010,
    trackColorInverse: 'transparent',

    trackBorderColor: colors?.contrasts?.grey125125,
    trackBorderColorInverse: colors?.contrasts?.white1010,

    // variables are split out for inverse to allow
    // color value changes for inverse-high-contrast
    meterColorBrand: colors?.contrasts?.blue4570,
    meterColorBrandInverse: colors?.contrasts?.blue4570,

    meterColorInfo: colors?.contrasts?.blue4570,
    meterColorInfoInverse: colors?.contrasts?.blue4570,

    meterColorSuccess: colors?.contrasts?.green4570,
    meterColorSuccessInverse: colors?.contrasts?.green4570,

    meterColorDanger: colors?.contrasts?.red4570,
    meterColorDangerInverse: colors?.contrasts?.red4570,

    meterColorAlert: colors?.contrasts?.blue4570,
    meterColorAlertInverse: colors?.contrasts?.blue4570,

    meterColorWarning: colors?.contrasts?.orange4570,
    meterColorWarningInverse: colors?.contrasts?.orange4570
  }

  return {
    ...componentVariables,
    ...themeSpecificStyle[themeName]
  }
}

export default generateComponentTheme
