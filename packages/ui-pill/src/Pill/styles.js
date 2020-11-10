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

const generateStyle = (
  { borders, colors, spacing, typography, key: themeName },
  themeOverride,
  { variant, color }
) => {
  //if any styling should depend on the theme itself, this object should specify it
  const themeSpecificStyle = {
    instructure: {
      height: '1.5rem'
    }
  }
  //maps the theme variables to component specific style variables, and overrides it with theme and user specified overrides
  const componentTheme = {
    fontFamily: typography?.fontFamily,
    padding: `0 ${spacing?.xSmall}`,
    height: '1.3125rem',
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
    borderRadius: '999rem',
    ...themeSpecificStyle[themeName],
    ...themeOverride
  }

  const transformVariant = variant === 'primary' ? 'oldPrimary' : variant
  const actualColor = transformVariant || color

  //optional mappings can be provided based on - for example - props
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

  //return with the css you'd like to apply to the component
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
      lineHeight: componentTheme.height - componentTheme.borderWidth * 2,
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
