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

import { DIRECTION } from '@instructure/ui-i18n'

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
const generateStyle = (componentTheme, props, state) => {
  const { size } = props
  const valueSizeVariants = {
    small: {
      fontSize: componentTheme.valueSmallFontSize,
      padding: componentTheme.valueSmallPadding,
      lineHeight: componentTheme.valueSmallLineHeight
    },
    medium: {
      fontSize: componentTheme.valueMediumFontSize,
      padding: componentTheme.valueMediumPadding,
      lineHeight: componentTheme.valueMediumLineHeight
    },
    large: {
      fontSize: componentTheme.valueLargeFontSize,
      padding: componentTheme.valueLargePadding,
      lineHeight: componentTheme.valueLargeLineHeight
    }
  }
  const trackStyle = {
    borderRadius: '0.312em',
    borderColor: 'transparent',
    color: 'transparent',
    cursor: 'pointer',
    background: componentTheme.trackBackground,
    height: `calc(${componentTheme.handleSize} / 2)`
  }
  const thumbStyle = {
    appearance: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'all 0.15s ease-in-out',
    width: componentTheme.handleSize,
    height: componentTheme.handleSize,
    background: componentTheme.handleBackground,
    boxShadow: `0 0.0625rem 0 ${componentTheme.handleShadowColor}`,
    '&:hover': {
      background: componentTheme.handleHoverBackground
    }
  }
  const thumbFocusActiveStyle = {
    boxShadow: `0 0.0625rem 0 ${componentTheme.handleShadowColor}, 0 0 0 ${componentTheme.handleFocusOutlineWidth} ${componentTheme.handleFocusOutlineColor}`
  }

  return {
    rangeInput: {
      label: 'rangeInput',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: componentTheme.minWidth
    },
    rangeInputInput: {
      label: 'rangeInput__input',
      all: 'initial',
      flex: 'auto',
      boxSizing: 'border-box',
      appearance: 'none',
      width: '100%', // for Firefox
      outline: 'none',
      margin: 0,
      '&::-webkit-slider-thumb': {
        ...thumbStyle,
        marginTop: `calc(-1 * ${componentTheme.handleSize} / 4)`
      },
      '&::-moz-range-thumb': thumbStyle,
      '&:focus, &:active': {
        outline: 'none',
        '&::-webkit-slider-thumb': thumbFocusActiveStyle,
        '&::-moz-range-thumb': thumbFocusActiveStyle
      },
      // remove outline in FF
      '&::-moz-focus-inner, &::-moz-focus-outer': {
        border: 0,
        outline: 'none'
      },
      '&::-webkit-slider-runnable-track': trackStyle,
      '&::-moz-range-track': trackStyle,
      '[dir="rtl"] &': {
        direction: 'rtl'
      }
    },
    rangeInputInputValue: {
      label: 'rangeInput__value',
      all: 'initial',
      boxSizing: 'border-box',
      display: 'block',
      color: 'inherit',
      fontFamily: componentTheme.valueFontFamily,
      fontWeight: componentTheme.valueFontWeight,
      textAlign: 'center',
      ...valueSizeVariants[size]
    }
  }
}

export default generateStyle
