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

/* Global variables (colors, typography, spacing, etc.) are defined in lib/themes */

import { makeThemeVars } from '@instructure/ui-themeable'

export default function generateComponentTheme(theme, themeOverride = {}) {
  const { key: themeName } = theme

  const themeSpecificStyle = {
    canvas: {
      color: theme['ic-brand-font-color-dark'],
      focusColorInfo: theme['ic-brand-primary'],
      backgroundBrand: theme['ic-brand-primary'],
      backgroundInfo: theme['ic-brand-primary'],
      borderColorBrand: theme['ic-brand-primary'],
      borderColorInfo: theme['ic-brand-primary']
    }
  }

  const componentVariables = {
    fontFamily: theme?.typography?.fontFamily,

    color: theme?.colors?.textDarkest,
    colorPrimaryInverse: theme?.colors?.textLightest,

    borderStyle: theme?.borders?.style,

    borderColorPrimary: theme?.colors?.borderMedium,
    borderColorSecondary: theme?.colors?.borderDark,
    borderColorSuccess: theme?.colors?.borderSuccess,
    borderColorBrand: theme?.colors?.borderBrand,
    borderColorInfo: theme?.colors?.borderInfo,
    borderColorAlert: theme?.colors?.borderAlert,
    borderColorWarning: theme?.colors?.borderWarning,
    borderColorDanger: theme?.colors?.borderDanger,
    borderColorTransparent: 'transparent',

    borderRadiusSmall: theme?.borders?.radiusSmall,
    borderRadiusMedium: theme?.borders?.radiusMedium,
    borderRadiusLarge: theme?.borders?.radiusLarge,

    debugOutlineColor: theme?.colors?.borderDebug,

    backgroundPrimary: theme?.colors?.backgroundLightest,
    backgroundSecondary: theme?.colors?.backgroundLight,
    backgroundPrimaryInverse: theme?.colors?.backgroundDarkest,
    backgroundBrand: theme?.colors?.backgroundBrand,
    backgroundInfo: theme?.colors?.backgroundInfo,
    backgroundAlert: theme?.colors?.backgroundAlert,
    backgroundSuccess: theme?.colors?.backgroundSuccess,
    backgroundDanger: theme?.colors?.backgroundDanger,
    backgroundWarning: theme?.colors?.backgroundWarning,

    arrowSize: '0.5rem',

    focusOutlineStyle: theme?.borders?.style,
    focusOutlineWidth: theme?.borders?.widthMedium,
    focusOutlineOffset: '0.3125rem',
    focusOutlineInset: '0rem', // do not use unitless zero (for CSS calc())

    focusColorInfo: theme?.colors?.borderInfo,
    focusColorDanger: theme?.colors?.borderDanger,
    focusColorSuccess: theme?.colors?.borderSuccess,
    focusColorInverse: theme?.colors?.borderLightest,

    xSmallMaxWidth: theme?.breakpoints?.xSmall,
    smallMaxWidth: theme?.breakpoints?.small,
    mediumMaxWidth: theme?.breakpoints?.medium,
    largeMaxWidth: theme?.breakpoints?.large,

    ...makeThemeVars('margin', theme?.spacing ?? {}),
    ...makeThemeVars('padding', theme?.spacing ?? {}),
    ...makeThemeVars('shadow', theme?.shadows ?? {}),
    ...makeThemeVars('stacking', theme?.stacking ?? {}),
    ...makeThemeVars('border', theme?.borders ?? {}),
    ...themeSpecificStyle[themeName],
    ...themeOverride
  }

  return {
    ...componentVariables,
    ...themeSpecificStyle[themeName],
    ...themeOverride
  }
}
