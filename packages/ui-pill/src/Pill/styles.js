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

const generateStyle = ({ borders, colors, spacing, typography, key: themeName }, themeOverride, { variant, color}) => {
	//if any styling should depend on the theme itself, this object should specify it
	const themeSpecificStlye = {
		instructure: {
			height: '1.5rem'
		}
	}
	//maps the theme variables to component specific style variables, and overrides it with theme and user specified overrides
	const fromTheme = {
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
		...themeSpecificStlye[themeName],
		...themeOverride
	}

  const transformVariant = variant === 'primary' ? 'oldPrimary' : variant
  const actualColor = transformVariant || color

	//optional mappings can be provided based on - for example - props
	const colorStyles = {
    default: {
      color: fromTheme.color,
      borderColor: fromTheme.color
    },
    primary: {
      color: fromTheme.primaryColor,
      borderColor: fromTheme.primaryColor
    },
    oldPrimary: {
      color: fromTheme.infoColor,
      borderColor: fromTheme.infoColor
    },
    info: {
      color: fromTheme.infoColor,
      borderColor: fromTheme.infoColor
    },
    success: {
      color: fromTheme.successColor,
      borderColor: fromTheme.successColor
    },
    danger: {
      color: fromTheme.dangerColor,
      borderColor: fromTheme.dangerColor
    },
    warning: {
      color: fromTheme.warningColor,
      borderColor: fromTheme.warningColor
    },
    message: {
      color: fromTheme.messageColor,
      borderColor: fromTheme.messageColor
    },
    alert: {
      color: fromTheme.alertColor,
      borderColor: fromTheme.alertColor
    }
	}

	//return with the css you'd like to apply to the component
	return {
		root: {
      label: 'root',
      display: "block",
      fontFamily: fromTheme.fontFamily,
      boxSizing: "border-box",
      padding: fromTheme.padding,
      background: fromTheme.background,
      borderWidth: fromTheme.borderWidth,
      borderStyle: fromTheme.borderStyle,
      borderRadius: fromTheme.borderRadius,
      lineHeight: fromTheme.height - (fromTheme.borderWidth * 2),
			...colorStyles[actualColor]
		},
		text: {
      label: 'text',
      boxSizing: "border-box",
      textTransform: fromTheme.textTransformStyle,
      fontSize: fromTheme.textFontSize,
      fontWeight: fromTheme.textFontWeight,
      letterSpacing: "0.0625rem"
    },
    viewMaxWidth: fromTheme.maxWidth
	}
}

export default generateStyle
