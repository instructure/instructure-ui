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

import { alpha } from '@instructure/ui-color-utils'

/**
 * Generates the theme object for the component from the theme and provided additional information
 * @param  {Object} theme The actual theme object.
 * @return {Object} The final theme object with the overrides and component variables
 */
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'theme' implicitly has an 'any' type.
const generateComponentTheme = (theme) => {
  const { colors, borders, typography } = theme

  const { brand, shamrock, barney, crimson, fire, licorice, ash } = colors


  const componentVariables = {
    background: colors?.backgroundLightest,
    borderWidthSmall: borders?.widthSmall,
    borderWidthMedium: borders?.widthMedium,
    borderColor: colors?.borderMedium,
    boxShadowColor: alpha(colors?.backgroundDarkest, 12),
    boxShadowBlur: '1rem',
    fontFamily: typography?.fontFamily,
    fontWeight: typography?.fontWeightBold,

    // these colors have sufficient contrast with the white background
    // in the normal and high contrast themes
    color: brand,
    colorShamrock: shamrock,
    colorBarney: barney,
    colorCrimson: crimson,
    colorFire: fire,
    colorLicorice: licorice,
    colorAsh: ash
  }

  return {
    ...componentVariables
  }
}

export default generateComponentTheme
