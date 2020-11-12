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
 * Generates the style object from the theme and provided additional information
 * @param  {Object} theme The actual theme object.
 * @param  {Object} themeOverride User provided overrides of the default theme mapping.
 * @param  {Object} props the props of the component, the style is applied to
 * @param  {Object} state the state of the component, the style is applied to
 * @return {Object} The final style object, which will be used in the component
 */
const generateStyle = (
  { colors, typography, key: themeName },
  themeOverride,
  { size },
  state
) => {
  const themeSpecificStyle = {}

  // maps the theme variables to component specific style variables,
  // and overrides it with theme and user specified overrides
  const componentTheme = {
    fontFamily: typography?.fontFamily,
    separatorColor: colors?.borderDark,

    smallSeparatorFontSize: '0.5rem',
    smallFontSize: typography?.fontSizeSmall,

    mediumSeparatorFontSize: '0.75rem',
    mediumFontSize: typography?.fontSizeMedium,

    largeSeparatorFontSize: '1rem',
    largeFontSize: typography?.fontSizeLarge,

    ...themeSpecificStyle[themeName],
    ...themeOverride
  }

  const crumbSizeVariants = {
    small: {
      fontSize: componentTheme.smallFontSize,
      paddingInlineEnd: `calc(${componentTheme.smallSeparatorFontSize} * 2)`,
      paddingInlineStart: '0'
    },
    medium: {
      fontSize: componentTheme.mediumFontSize,
      paddingInlineEnd: `calc(${componentTheme.mediumSeparatorFontSize} * 2)`,
      paddingInlineStart: '0'
    },
    large: {
      fontSize: componentTheme.largeFontSize,
      paddingInlineEnd: `calc(${componentTheme.largeSeparatorFontSize} * 2)`,
      paddingInlineStart: '0'
    }
  }

  const separatorSizeVariants = {
    small: {
      fontSize: componentTheme.smallSeparatorFontSize,
      insetInlineEnd: `calc(${componentTheme.smallSeparatorFontSize} / 2)`,
      insetInlineStart: 'auto',
      marginTop: `calc(-1 * (${componentTheme.smallSeparatorFontSize} / 2))`
    },
    medium: {
      fontSize: componentTheme.mediumSeparatorFontSize,
      insetInlineEnd: `calc(${componentTheme.mediumSeparatorFontSize} / 2)`,
      insetInlineStart: 'auto',
      marginTop: `calc(-1 * (${componentTheme.mediumSeparatorFontSize} / 2))`
    },
    large: {
      fontSize: componentTheme.largeSeparatorFontSize,
      insetInlineEnd: `calc(${componentTheme.largeSeparatorFontSize} / 2)`,
      insetInlineStart: 'auto',
      marginTop: `calc(-1 * (${componentTheme.largeSeparatorFontSize} / 2))`
    }
  }

  // return with the css you'd like to apply to the component
  return {
    root: {
      fontFamily: componentTheme.fontFamily,
      margin: '0',
      padding: '0',
      listStyleType: 'none',
      overflow: 'visible',
      display: 'flex',
      alignItems: 'center'
    },
    crumb: {
      boxSizing: 'border-box',
      position: 'relative',
      ...crumbSizeVariants[size],

      '&:last-child': {
        paddingInlineEnd: 0
      }
    },
    separator: {
      boxSizing: 'border-box',
      position: 'absolute',
      top: '50%',
      color: componentTheme.separatorColor,
      ...separatorSizeVariants[size]
    }
  }
}
export default generateStyle
