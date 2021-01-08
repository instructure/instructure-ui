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
const generateStyle = (theme, themeOverride, props, state) => {
  const { size } = props
  const { interaction, hasFocus, invalid } = state

  const componentTheme = generateComponentTheme(theme, themeOverride)

  const disabledStyles =
    interaction === 'disabled'
      ? {
          cursor: 'not-allowed',
          pointerEvents: 'none',
          opacity: 0.5
        }
      : {}

  const focusStyles = hasFocus
    ? {
        opacity: 1,
        transform: 'scale(1)'
      }
    : {}

  const invalidStyles = invalid
    ? {
        borderColor: componentTheme.errorOutlineColor
      }
    : {}
  const invalidContainerStyles = invalid
    ? {
        borderColor: componentTheme.errorBorderColor
      }
    : {}
  return {
    numberInput: {
      label: 'numberInput'
    },
    arrowContainer: {
      label: 'numberInput_arrowContainer',
      flex: `0 0 ${componentTheme.arrowsContainerWidth}`,
      display: 'flex',
      flexDirection: 'column',
      ...disabledStyles
    },
    arrow: {
      label: 'numberInput_arrow',
      cursor: 'pointer',
      userSelect: 'none',
      textAlign: 'center',
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: componentTheme.arrowsBackgroundColor,
      borderTop: 'none',
      borderInlineEnd: 'none',
      borderInlineStart: `${componentTheme.borderWidth} ${componentTheme.borderStyle} ${componentTheme.arrowsBorderColor}`,
      borderBottom: `${componentTheme.borderWidth} ${componentTheme.borderStyle} ${componentTheme.arrowsBorderColor}`,
      color: componentTheme.arrowsColor,
      '&:last-child': { borderBottom: 'none' },
      '&:hover': { backgroundColor: componentTheme.arrowsHoverBackgroundColor },
      '&:active': { boxShadow: componentTheme.arrowsActiveBoxShadow }
    },
    inputWidth: {
      label: 'numberInput_inputWidth',
      display: 'block',
      position: 'relative',
      '&::before': {
        content: '""',
        pointerEvents: 'none',
        boxSizing: 'border-box',
        display: 'block',
        position: 'absolute',
        top: '-0.25rem',
        bottom: '-0.25rem',
        left: '-0.25rem',
        right: '-0.25rem',
        border: `${componentTheme.focusOutlineWidth} ${componentTheme.focusOutlineStyle} ${componentTheme.focusOutlineColor}`,
        borderRadius: `calc(${componentTheme.borderRadius} * 1.5)`,
        transition: 'all 0.2s',
        opacity: 0,
        transform: 'scale(0.95)',
        ...focusStyles,
        ...invalidStyles
      }
    },
    inputContainer: {
      label: 'numberInput_inputContainer',
      display: 'flex',
      margin: '0',
      boxSizing: 'border-box',
      transition: 'all 0.2s',
      overflow: 'hidden',
      fontFamily: componentTheme.fontFamily,
      border: `${componentTheme.borderWidth} ${componentTheme.borderStyle} ${componentTheme.borderColor}`,
      borderRadius: componentTheme.borderRadius,
      ...disabledStyles,
      ...invalidContainerStyles,
      ...(size === 'medium'
        ? {
            fontSize: componentTheme.mediumFontSize,
            height: componentTheme.mediumHeight
          }
        : {
            fontSize: componentTheme.largeFontSize,
            height: componentTheme.largeHeight
          })
    },
    input: {
      label: 'numberInput_input',
      all: 'initial',
      textAlign: 'start',
      direction: 'inherit',
      '&::-ms-clear': { display: 'none' },
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      appearance: 'none',
      lineHeight: 1,
      margin: '0',
      flex: 1,
      minWidth: '0.0625rem',
      boxSizing: 'border-box',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      fontWeight: componentTheme.fontWeight,
      color: componentTheme.color,
      background: componentTheme.background,
      padding: componentTheme.padding,
      '&::placeholder': { color: componentTheme.placeholderColor }
    }
  }
}

export default generateStyle
