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
 * ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param  {Object} componentTheme The theme variable object.
 * @param  {Object} props the props of the component, the style is applied to
 * @param  {Object} state the state of the component, the style is applied to
 * @return {Object} The final style object, which will be used in the component
 */
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'componentTheme' implicitly has an 'any'... Remove this comment to see the full error message
const generateStyle = (componentTheme, props, state) => {
  const { disabled, size } = props

  const fontSizeVariants = {
    small: {
      fontSize: componentTheme.smallFontSize
    },
    medium: {
      fontSize: componentTheme.mediumFontSize
    },
    large: {
      fontSize: componentTheme.largeFontSize
    }
  }

  return {
    textArea: {
      label: 'textArea',
      all: 'initial',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      appearance: 'none',
      height: 'auto',
      margin: 0,
      width: '100%',
      display: 'block',
      boxSizing: 'border-box',
      padding: componentTheme.padding,
      fontFamily: componentTheme.fontFamily,
      fontWeight: componentTheme.fontWeight,
      borderWidth: componentTheme.borderWidth,
      borderStyle: componentTheme.borderStyle,
      borderTopColor: componentTheme.borderTopColor,
      borderRightColor: componentTheme.borderRightColor,
      borderBottomColor: componentTheme.borderBottomColor,
      borderLeftColor: componentTheme.borderLeftColor,
      borderRadius: componentTheme.borderRadius,
      color: componentTheme.color,
      background: componentTheme.background,
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word',
      textAlign: 'start',
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      ...fontSizeVariants[size],
      '&:focus + [class$=-textArea__outline]': {
        transform: 'scale(1)',
        opacity: 1
      },
      '&[aria-invalid], &[aria-invalid]:focus, &[aria-invalid]:focus + [class$=-textArea__outline]': {
        borderColor: componentTheme.errorBorderColor
      },
      '&::placeholder': {
        color: componentTheme.placeholderColor
      },
      ...(disabled && {
        cursor: 'not-allowed',
        pointerEvents: 'none',
        opacity: 0.5
      })
    },
    textAreaLayout: {
      label: 'textArea__layout',
      position: 'relative'
    },
    textAreaOutline: {
      label: 'textArea__outline',
      pointerEvents: 'none',
      position: 'absolute',
      display: 'block',
      boxSizing: 'border-box',
      top: '-0.25rem',
      bottom: '-0.25rem',
      left: '-0.25rem',
      right: '-0.25rem',
      border: `${componentTheme.focusOutlineWidth} ${componentTheme.focusOutlineStyle} ${componentTheme.focusOutlineColor}`,
      borderRadius: `calc(${componentTheme.borderRadius} * 1.5)`,
      transition: 'all 0.2s',
      // properties to transition on :focus
      opacity: 0,
      transform: 'scale(0.95)'
    }
  }
}

export default generateStyle
