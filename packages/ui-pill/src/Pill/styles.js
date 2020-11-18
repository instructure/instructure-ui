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
const generateStyle = (theme, themeOverride, { variant, color }, state) => {
  const componentTheme = generateComponentTheme(theme, themeOverride)

  const transformVariant = variant === 'primary' ? 'oldPrimary' : variant
  const actualColor = transformVariant || color

  const colorStyles = {
    default: {
      color: componentTheme.color,
      borderColor: componentTheme.color
    },
    primary: {
      color: componentTheme.primaryColor,
      borderColor: componentTheme.primaryColor
    },
    oldPrimary: {
      color: componentTheme.infoColor,
      borderColor: componentTheme.infoColor
    },
    info: {
      color: componentTheme.infoColor,
      borderColor: componentTheme.infoColor
    },
    success: {
      color: componentTheme.successColor,
      borderColor: componentTheme.successColor
    },
    danger: {
      color: componentTheme.dangerColor,
      borderColor: componentTheme.dangerColor
    },
    warning: {
      color: componentTheme.warningColor,
      borderColor: componentTheme.warningColor
    },
    message: {
      color: componentTheme.messageColor,
      borderColor: componentTheme.messageColor
    },
    alert: {
      color: componentTheme.alertColor,
      borderColor: componentTheme.alertColor
    }
  }

  return {
    root: {
      label: 'root',
      display: 'block',
      fontFamily: componentTheme.fontFamily,
      boxSizing: 'border-box',
      padding: componentTheme.padding,
      background: componentTheme.background,
      borderWidth: componentTheme.borderWidth,
      borderStyle: componentTheme.borderStyle,
      borderRadius: componentTheme.borderRadius,

      /* line-height does not account for top/bottom border width */
      lineHeight: `calc(${componentTheme.height} - (${componentTheme.borderWidth} * 2))`,
      ...colorStyles[actualColor]
    },
    text: {
      label: 'text',
      boxSizing: 'border-box',
      textTransform: componentTheme.textTransformStyle,
      fontSize: componentTheme.textFontSize,
      fontWeight: componentTheme.textFontWeight,
      letterSpacing: '0.0625rem'
    },
    viewMaxWidth: componentTheme.maxWidth
  }
}

export default generateStyle
