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
import type { Theme } from '@instructure/ui-themes'
import { AvatarTheme } from '@instructure/shared-types'

/**
 * Generates the theme object for the component from the theme and provided additional information
 * @param theme The current theme object.
 * @return The final theme object with the overrides and component variables
 */
const generateComponentTheme = (theme: Theme): AvatarTheme => {
  const { colors, borders, typography } = theme

  const componentVariables: AvatarTheme = {
    background: colors?.contrasts?.white1010,
    borderWidthSmall: borders?.widthSmall,
    borderWidthMedium: borders?.widthMedium,
    borderColor: colors?.contrasts?.grey3045,
    boxShadowColor: alpha('#2d3b45', 12),
    boxShadowBlur: '1rem',
    fontFamily: typography?.fontFamily,
    fontWeight: typography?.fontWeightBold,

    // these colors have sufficient contrast with the white background
    // in the normal and high contrast themes
    color: colors?.contrasts.blue4570,
    colorShamrock: colors?.contrasts?.green4570,
    colorBarney: colors?.contrasts?.blue4570,
    colorCrimson: colors?.contrasts?.red4570,
    colorFire: colors?.contrasts?.orange4570,
    colorLicorice: colors?.contrasts?.grey125125,
    colorAsh: colors?.contrasts?.grey4570,

    aiTopGradientColor: colors?.contrasts?.violet4570,
    aiBottomGradientColor: colors?.contrasts?.sea4570,
    aiFontColor: colors?.contrasts?.white1010
  }

  return {
    ...componentVariables
  }
}

export default generateComponentTheme
