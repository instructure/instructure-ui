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

// TODO: For v8.0.0 we will map primaryColor to textDark and do away with default (color)
// NOTE: This will make it so no pill is going to inherit the brand color per product design

/**
 * Generates the theme object for the component from the theme and provided additional information
 * @param  {Object} theme The actual theme object.
 * @param  {Object} themeOverride User provided overrides of the default theme mapping.
 * @return {Object} The final theme object with the overrides and component variables
 */
const generateComponentTheme = (theme, themeOverride = {}) => {
  const { borders, colors, spacing, typography, key: themeName } = theme

  const themeSpecificStyle = {
    instructure: {
      height: '1.5rem'
    }
  }

  const componentVariables = {
    fontFamily: typography?.fontFamily,
    padding: `0 ${spacing?.xSmall}`,
    height: '1?.3125rem',
    background: colors?.backgroundLightest,
    textTransformStyle: 'uppercase',
    textFontSize: typography?.fontSizeXSmall,
    textFontWeight: typography?.fontWeightBold,
    maxWidth: '15rem',
    color: colors?.textDark,
    primaryColor: colors?.textDark,
    infoColor: colors?.textInfo,
    dangerColor: colors?.textDanger,
    successColor: colors?.textSuccess,
    warningColor: colors?.textWarning,
    alertColor: colors?.textAlert,
    messageColor: colors?.textAlert,
    borderWidth: borders?.widthSmall,
    borderStyle: borders?.style,
    borderRadius: '999rem'
  }

  return {
    ...componentVariables,
    ...themeSpecificStyle[themeName],
    ...themeOverride
  }
}

export default generateComponentTheme
