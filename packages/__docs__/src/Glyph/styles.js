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
  return {
    glyph: {
      label: 'glyph',
      textAlign: 'center',
      minWidth: componentTheme.glyphMinWidth,
      flexBasis: componentTheme.glyphMinWidth,
      flexGrow: 1,
      margin: '0.5rem'
    },
    info: {
      label: 'glyph__info',
      color: '#999',
      fontFamily: '"Courier New", Courier, monospace',
      margin: '0.5em 1em'
    },
    variants: {
      label: 'glyph__variants',
      boxSizing: 'border-box',
      padding: componentTheme.padding,
      margin: 0,
      backgroundColor: componentTheme.backgroundColor,
      backgroundImage: `linear-gradient(${componentTheme.gradientCheckerboard}), linear-gradient(${componentTheme.gradientCheckerboard})`,
      backgroundPosition: `0 0, calc(${componentTheme.gradientCheckerboardSize} / 2) calc(${componentTheme.gradientCheckerboardSize} / 2)`,
      backgroundSize: `${componentTheme.gradientCheckerboardSize} ${componentTheme.gradientCheckerboardSize}`,
      border: componentTheme.border,
      borderRadius: componentTheme.borderRadius,
      position: 'relative',
      overflow: 'hidden',
      marginBottom: '0.5rem'
    },
    iconFontWrapper: {
      label: 'glyph__iconFontWrapper',
      height: '1em'
    },
    button: {
      label: 'glyph__button',
      appearance: 'none',
      textDecoration: 'none',
      touchAction: 'manipulation',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
      padding: 0,
      margin: 0,
      border: 0,
      borderRadius: '0.25rem',
      background: 'none',
      color: componentTheme.glyphColor,
      width: '3rem',
      height: '3rem',
      fontSize: '1.625rem',
      lineHeight: 1,
      transition: 'background 0.2s',
      cursor: 'pointer',
      position: 'relative',
      transform: 'none',

      '&::-moz-focus-inner': {
        border: '0' /* removes default dotted focus outline in Firefox */
      },
      '*': {
        pointerEvents:
          'none' /* Ensures that button or link is always the event target */
      },
      '&:focus': {
        outline: 'none',
        transform: 'none',

        '&::before': {
          opacity: 1,
          transform: 'scale(1)'
        }
      },
      '&:hover': {
        backgroundColor: componentTheme.glyphHoverBackgroundColor
      },

      '&::before': {
        pointerEvents: 'none',
        content: '""',
        position: 'absolute',
        borderStyle: 'solid',
        borderWidth: '0.125rem',
        borderColor: componentTheme.glyphFocusBorderColor,
        opacity: 0,
        borderRadius: '0.4327rem',
        top: '-0.3125rem',
        left: '-0.3125rem',
        right: '-0.3125rem',
        bottom: '-0.3125rem',
        transition: 'all 0.2s',
        transform: 'scale(0.95)'
      }
    }
  }
}

export default generateStyle
