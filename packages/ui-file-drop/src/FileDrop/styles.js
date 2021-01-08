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
  // get the theme variables object for the component
  const componentTheme = generateComponentTheme(theme, themeOverride)
  const { height } = props
  const {
    functionallyDisabled,
    visuallyDisabled,
    dragRejected,
    dragAccepted
  } = state

  const dragAcceptedStyle = dragAccepted
    ? {
        borderColor: componentTheme.acceptedColor
      }
    : {}

  const dragRejectedStyle = dragRejected
    ? {
        borderColor: componentTheme.rejectedColor
      }
    : {}

  const functionallyDisabledStyle = functionallyDisabled
    ? {
        cursor: 'not-allowed',
        pointerEvents: 'none'
      }
    : {}

  const visuallyDisabledStyle = visuallyDisabled
    ? {
        opacity: 0.5
      }
    : {}

  // Force the content to fill the space set with the 'height' React prop
  const heightStyle = height
    ? {
        height: '100%'
      }
    : {}

  // border color precedence: normal hover < dragRejected OR dragAccepted
  const hoverBorderColor =
    !dragAccepted && !dragRejected
      ? { borderColor: componentTheme.hoverBorderColor }
      : {}

  return {
    fileDropLabel: {
      label: 'fileDrop__label',
      display: 'block',
      boxSizing: 'border-box',
      position: 'relative',
      ...heightStyle,
      ...functionallyDisabledStyle,
      ...visuallyDisabledStyle
    },
    fileDropInput: {
      label: 'fileDrop__input',
      width: '0.0625rem',
      height: '0.0625rem',
      margin: '-0.0625rem',
      padding: 0,
      position: 'absolute',
      overflow: 'hidden',
      clip: 'rect(0 0 0 0)',
      border: 0
    },
    fileDropLabelContent: {
      label: 'fileDrop__labelContent',
      display: 'block',
      boxSizing: 'border-box',
      zIndex: 1,
      textAlign: 'center',
      borderRadius: componentTheme.borderRadius,
      border: `${componentTheme.borderWidth} ${componentTheme.borderStyle} ${componentTheme.borderColor}`,
      cursor: 'pointer',
      '&:hover': {
        ...hoverBorderColor
      },
      ...heightStyle,
      ...dragAcceptedStyle,
      ...dragRejectedStyle
    },
    fileDropLayout: {
      label: 'fileDrop__layout',
      display: 'block',
      overflow: 'hidden',
      borderRadius: componentTheme.borderRadius,
      ...heightStyle
    }
  }
}

export default generateStyle
