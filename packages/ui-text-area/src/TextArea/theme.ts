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

/**
 * Generates the theme object for the component from the theme and provided additional information
 * @param  {Object} theme The actual theme object.
 * @return {Object} The final theme object with the overrides and component variables
 */
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'theme' implicitly has an 'any' type.
const generateComponentTheme = (theme) => {
  const { colors, typography, borders, spacing, forms, key: themeName } = theme

  const themeSpecificStyle = {
    canvas: {
      color: theme['ic-brand-font-color-dark'],
      focusOutlineColor: theme['ic-brand-primary']
    }
  }

  const componentVariables = {
    fontFamily: typography?.fontFamily,
    fontWeight: typography?.fontWeightNormal,
    color: colors?.textDarkest,

    background: colors?.backgroundLightest,

    borderWidth: borders?.widthSmall,
    borderStyle: borders?.style,
    borderTopColor: colors?.borderMedium,
    borderRightColor: colors?.borderMedium,
    borderBottomColor: colors?.borderMedium,
    borderLeftColor: colors?.borderMedium,
    borderRadius: borders?.radiusMedium,

    padding: spacing?.small,

    focusOutlineColor: colors?.borderBrand,
    focusOutlineWidth: borders?.widthMedium,
    focusOutlineStyle: borders?.style,

    errorBorderColor: colors?.borderDanger,
    errorOutlineColor: colors?.borderDanger,

    placeholderColor: colors?.textDark,

    smallFontSize: typography?.fontSizeSmall,
    smallHeight: forms?.inputHeightSmall,

    mediumFontSize: typography?.fontSizeMedium,
    mediumHeight: forms?.inputHeightMedium,

    largeFontSize: typography?.fontSizeLarge,
    largeHeight: forms?.inputHeightLarge
  }

  return {
    ...componentVariables,
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    ...themeSpecificStyle[themeName]
  }
}

export default generateComponentTheme
