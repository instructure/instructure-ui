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

import { darken } from '@instructure/ui-color-utils'

/**
 * Generates the theme object for the component from the theme and provided additional information
 * @param  {Object} theme The actual theme object.
 * @param  {Object} themeOverride User provided overrides of the default theme mapping.
 * @return {Object} The final theme object with the overrides and component variables
 */
const generateComponentTheme = (theme, themeOverride = {}) => {
  const { colors, borders, typography, spacing, key: themeName } = theme

  // if any styling should depend on the theme itself,
  // this object should specify it
  const themeSpecificStyle = {
    canvas: {
      color: theme['ic-link-color'],
      focusOutlineColor: theme['ic-brand-primary'],
      hoverColor: darken(theme['ic-link-color'], 10)
    },
    'canvas-high-contrast': {
      textDecorationOutsideText: 'underline',
      hoverTextDecorationOutsideText: 'none'
    }
  }

  // maps the theme variables to component specific style variables
  const componentVariables = {
    fontFamily: typography?.fontFamily,
    fontWeight: typography?.fontWeightNormal,
    color: colors?.textLink,

    textDecorationWithinText: 'underline',
    hoverTextDecorationWithinText: 'none',
    textDecorationOutsideText: 'none',
    hoverTextDecorationOutsideText: 'underline',

    focusOutlineWidth: borders?.widthMedium,
    focusOutlineColor: colors?.borderBrand,
    focusOutlineStyle: borders?.style,

    hoverColor: darken(colors?.textLink, 10),

    colorInverse: colors?.textLight,
    focusInverseOutlineColor: colors?.borderLightest,
    focusInverseIconOutlineColor: colors?.borderLightest,

    iconSize: '1.125em', // make icon slightly larger than inherited font-size,
    iconPlusTextMargin: spacing?.xxSmall
  }

  return {
    ...componentVariables,
    ...themeSpecificStyle[themeName],
    ...themeOverride
  }
}

export default generateComponentTheme
