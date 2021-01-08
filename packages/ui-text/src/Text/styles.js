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
 * @param  {Object} componentTheme The theme variable object.
 * @param  {Object} props the props of the component, the style is applied to
 * @param  {Object} state the state of the component, the style is applied to
 * @return {Object} The final style object, which will be used in the component
 */
const generateStyle = (componentTheme, props, state) => {
  const {
    size,
    wrap,
    weight,
    fontStyle,
    transform,
    lineHeight,
    letterSpacing,
    color,
    as
  } = props

  const colorVariants = {
    primary: { color: componentTheme.primaryColor },
    secondary: { color: componentTheme.secondaryColor },
    'primary-inverse': { color: componentTheme.primaryInverseColor },
    'secondary-inverse': { color: componentTheme.secondaryInverseColor },
    success: { color: componentTheme.successColor },
    brand: { color: componentTheme.brandColor },
    warning: { color: componentTheme.warningColor },
    danger: { color: componentTheme.dangerColor },
    alert: { color: componentTheme.alertColor }
  }

  const wrapStyle = {
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
    hyphens: 'auto'
  }

  const weightStyle = {
    normal: { fontWeight: componentTheme.fontWeightNormal },
    light: { fontWeight: componentTheme.fontWeightLight },
    bold: { fontWeight: componentTheme.fontWeightBold }
  }

  const fontSizeVariants = {
    'x-small': componentTheme.fontSizeXSmall,
    small: componentTheme.fontSizeSmall,
    medium: componentTheme.fontSizeMedium,
    large: componentTheme.fontSizeLarge,
    'x-large': componentTheme.fontSizeXLarge,
    'xx-large': componentTheme.fontSizeXXLarge
  }

  const lineHeightVariants = {
    default: { lineHeight: componentTheme.lineHeight },
    fit: { lineHeight: componentTheme.lineHeightFit },
    condensed: { lineHeight: componentTheme.lineHeightCondensed },
    double: { lineHeight: componentTheme.lineHeightDouble }
  }

  const letterSpacingVariants = {
    normal: componentTheme.letterSpacingNormal,
    condensed: componentTheme.letterSpacingNormal,
    expanded: componentTheme.letterSpacingNormal
  }

  const inputAndTextStyle = {
    '&:focus': {
      outline: 'none'
    },
    ...(color ? colorVariants[color] : {}),
    ...(wrap === 'break-word' ? wrapStyle : {}),
    ...(weight ? weightStyle[weight] : {}),
    ...(fontStyle ? { fontStyle: fontStyle } : {}),
    fontSize: fontSizeVariants[size],
    ...(lineHeight ? lineHeightVariants[lineHeight] : {}),
    letterSpacing: letterSpacingVariants[letterSpacing],
    ...(transform ? { textTransform: transform } : {})
  }

  // NOTE: the input styles exist to accommodate the InPlaceEdit component
  const inputStyle = {
    outline: 0,
    appearance: 'none',
    boxSizing: 'border-box',
    background: 'none',
    border: 'none',
    borderRadius: 0,
    padding: 0,
    margin: 0,
    color: 'inherit',
    height: 'auto',
    width: '100%',
    lineHeight: 'inherit',
    textAlign: 'start',
    boxShadow: 'none',
    display: 'block',
    ...inputAndTextStyle
  }

  return {
    text: {
      label: 'text',
      fontFamily: componentTheme.fontFamily,
      'sub, sup': {
        fontSize: '75%',
        lineHeight: 0,
        position: 'relative',
        verticalAlign: 'baseline'
      },
      sup: {
        top: '-0.4em'
      },
      sub: {
        bottom: '-0.4em'
      },
      'pre, code': {
        all: 'initial',
        fontFamily: componentTheme.fontFamilyMonospace
      },
      'i, em': {
        fontStyle: 'italic'
      },
      'b, strong': {
        fontWeight: componentTheme.fontWeightBold
      },
      p: {
        display: 'block',
        padding: 0,
        margin: componentTheme.paragraphMargin
      },
      ...inputAndTextStyle,
      ...(as === 'input' && inputStyle),
      '&[type]': inputStyle
    }
  }
}

export default generateStyle
