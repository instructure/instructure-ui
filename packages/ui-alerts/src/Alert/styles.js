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
const generateStyle = (theme, themeOverride, props) => {
  const { variant } = props
  const componentTheme = generateComponentTheme(theme, themeOverride)

  const variantStyles = {
    error: {
      alert: { borderColor: componentTheme.dangerBorderColor },
      icon: {
        background: componentTheme.dangerIconBackground,
        borderRightColor: componentTheme.dangerIconBackground
      }
    },
    info: {
      alert: { borderColor: componentTheme.infoBorderColor },
      icon: {
        background: componentTheme.infoIconBackground,
        borderRightColor: componentTheme.infoIconBackground
      }
    },
    success: {
      alert: { borderColor: componentTheme.successBorderColor },
      icon: {
        backgroundColor: componentTheme.successIconBackground,
        borderRightColor: componentTheme.successIconBackground
      }
    },
    warning: {
      alert: { borderColor: componentTheme.warningBorderColor },
      icon: {
        background: componentTheme.warningIconBackground,
        borderRightColor: componentTheme.warningIconBackground
      }
    }
  }

  return {
    alert: {
      label: 'alert',
      color: componentTheme.color,
      background: componentTheme.background,
      boxSizing: 'border-box',
      boxShadow: componentTheme.boxShadow,
      display: 'flex',
      minWidth: '12rem',
      borderWidth: componentTheme.borderWidth,
      borderStyle: componentTheme.borderStyle,
      borderRadius: componentTheme.borderRadius,
      ...variantStyles[variant].alert
    },
    icon: {
      color: componentTheme.iconColor,
      boxSizing: 'border-box',
      flex: '0 0 2.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.125rem',
      borderRight: `${componentTheme.borderWidth} ${componentTheme.borderStyle}`,
      ...variantStyles[variant].icon
    },
    closeButton: {
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'flex-start',
      order: 1,
      marginTop: componentTheme.closeButtonMarginTop,
      marginRight: componentTheme.closeButtonMarginRight
    },
    content: {
      boxSizing: 'border-box',
      flex: 1,
      minWidth: '0.0625rem',
      fontSize: componentTheme.contentFontSize,
      fontFamily: componentTheme.contentFontFamily,
      fontWeight: componentTheme.contentFontWeight,
      lineHeight: componentTheme.contentLineHeight,
      padding: componentTheme.contentPadding
    }
  }
}

export default generateStyle
