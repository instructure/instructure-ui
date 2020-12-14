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

import generateComponentTheme from './theme'
/**
 * Generates the style object from the theme and provided additional information
 * @param  {Object} theme The actual theme object.
 * @param  {Object} themeOverride User provided overrides of the default theme mapping.
 * @param  {Object} props the props of the component, the style is applied to
 * @param  {Object} state the state of the component, the style is applied to
 * @return {Object} The final style object, which will be used in the component
 */
const generateStyle = (
  theme,
  themeOverride,
  { level, color, ellipsis, border }
) => {
  const componentTheme = generateComponentTheme(theme, themeOverride)

  const levelStyles = {
    h1: {
      fontFamily: componentTheme.h1FontFamily,
      fontSize: componentTheme.h1FontSize,
      fontWeight: componentTheme.h1FontWeight
    },
    h2: {
      fontFamily: componentTheme.h2FontFamily,
      fontSize: componentTheme.h2FontSize,
      fontWeight: componentTheme.h2FontWeight
    },
    h3: {
      fontFamily: componentTheme.h3FontFamily,
      fontSize: componentTheme.h3FontSize,
      fontWeight: componentTheme.h3FontWeight
    },
    h4: {
      fontFamily: componentTheme.h4FontFamily,
      fontSize: componentTheme.h4FontSize,
      fontWeight: componentTheme.h4FontWeight
    },
    h5: {
      fontFamily: componentTheme.h5FontFamily,
      fontSize: componentTheme.h5FontSize,
      fontWeight: componentTheme.h5FontWeight
    },
    reset: {
      margin: '0',
      fontSize: 'inherit',
      fontWeight: 'inherit',
      lineHeight: 'inherit'
    }
  }

  const colorStyles = {
    inherit: { color: 'inherit' },
    primary: { color: componentTheme.primaryColor },
    secondary: { color: componentTheme.secondaryColor },
    'primary-inverse': { color: componentTheme.primaryInverseColor },
    'secondary-inverse': { color: componentTheme.secondaryInverseColor }
  }
  const ellipsisStyle = ellipsis
    ? {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: 'block'
      }
    : {}

  const borderStyles = {
    top: {
      paddingTop: componentTheme.borderPadding,
      borderTop: `${componentTheme.borderWidth} ${componentTheme.borderStyle} ${componentTheme.borderColor}`
    },
    bottom: {
      paddingBottom: componentTheme.borderPadding,
      borderBottom: `${componentTheme.borderWidth} ${componentTheme.borderStyle} ${componentTheme.borderColor}`
    }
  }
  return {
    root: {
      label: 'root',
      lineHeight: componentTheme.lineHeight,
      margin: 0,
      ...levelStyles[level],
      ...colorStyles[color],
      ...ellipsisStyle,
      ...borderStyles[border]
    }
  }
}
export default generateStyle
