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

import type { TextInputTheme } from '@instructure/shared-types'
import type {
  TextInputProps,
  TextInputStyleProps,
  TextInputStyle
} from './props'

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
const generateStyle = (
  componentTheme: TextInputTheme,
  props: TextInputProps,
  state: TextInputStyleProps
): TextInputStyle => {
  const { size, textAlign, shouldNotWrap } = props
  const {
    disabled,
    invalid,
    focused,
    afterElementHasWidth,
    beforeElementExists
  } = state

  const sizeVariants = {
    small: {
      fontSize: componentTheme.smallFontSize,
      height: `calc(${componentTheme.smallHeight} - (2 * ${componentTheme.borderWidth}))`,
      lineHeight: `calc(${componentTheme.smallHeight} - (2 * ${componentTheme.borderWidth}))`
    },
    medium: {
      fontSize: componentTheme.mediumFontSize,
      height: `calc(${componentTheme.mediumHeight} - (2 * ${componentTheme.borderWidth}))`,
      lineHeight: `calc(${componentTheme.mediumHeight} - (2 * ${componentTheme.borderWidth}))`
    },
    large: {
      fontSize: componentTheme.largeFontSize,
      height: `calc(${componentTheme.largeHeight} - (2 * ${componentTheme.borderWidth}))`,
      lineHeight: `calc(${componentTheme.largeHeight} - (2 * ${componentTheme.borderWidth}))`
    }
  }
  const disabledStyle = disabled
    ? {
        cursor: 'not-allowed',
        pointerEvents: 'none',
        opacity: '0.5'
      }
    : {}

  const focusedStyle = focused
    ? {
        opacity: 1,
        outlineOffset: '0.15rem'
      }
    : {
        opacity: 0,
        outlineOffset: '-0.9rem'
      }

  const invalidStyle = invalid
    ? {
        borderColor: componentTheme.errorBorderColor
      }
    : {}

  const invalidAndFocusedStyle =
    invalid && focused
      ? {
          borderColor: componentTheme.errorBorderColor
        }
      : {}

  const inputStyle = {
    all: 'initial',
    '&::-ms-clear': {
      display: 'none'
    },
    width: '100%',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    appearance: 'none',
    margin: 0,
    display: 'block',
    boxSizing: 'border-box',
    outline: 'none',
    fontFamily: componentTheme.fontFamily,
    fontWeight: componentTheme.fontWeight,
    color: componentTheme.color,
    padding: `0 ${componentTheme.padding}`,
    background: 'transparent',
    border: 'none',
    verticalAlign: 'baseline',
    '&[autocomplete="off"]::-webkit-contacts-auto-fill-button': {
      display: 'none !important'
    },
    '&:focus': {
      boxShadow: 'initial'
    },
    '&::placeholder': {
      color: componentTheme.placeholderColor
    },
    ...sizeVariants[size!],
    textAlign: textAlign
  }

  const viewBase = {
    boxSizing: 'border-box',
    fontFamily: componentTheme.fontFamily,
    maxWidth: '100%',
    overflow: 'visible',
    unicodeBidi: 'isolate'
  }

  const flexBase = {
    ...viewBase,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  }

  return {
    requiredInvalid: {
      color: componentTheme.requiredInvalidColor
    },
    textInput: {
      label: 'textInput',
      ...inputStyle,
      '&:is(input)[type]': inputStyle,
      '&:-webkit-any(input)[type]': inputStyle
    },
    facade: {
      label: 'textInput__facade',
      position: 'relative',
      display: 'block',
      boxSizing: 'border-box',
      border: `${componentTheme.borderWidth} ${componentTheme.borderStyle} ${componentTheme.borderColor}`,
      borderRadius: componentTheme.borderRadius,
      background: componentTheme.background,
      color: componentTheme.color,

      '&::before': {
        content: '""',
        pointerEvents: 'none',
        position: 'absolute',
        display: 'block',
        boxSizing: 'border-box',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        outline: `${componentTheme.focusOutlineWidth} ${componentTheme.focusOutlineStyle} ${componentTheme.focusOutlineColor}`,
        borderRadius: componentTheme.borderRadius,
        transition: 'opacity 0.2s, outline-offset 0.2s ease-out',

        ...focusedStyle, // properties to transition on :focus
        ...invalidAndFocusedStyle
      },
      ...disabledStyle,
      ...invalidStyle
    },
    layout: {
      label: 'textInput__layout',
      ...viewBase,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: 'row',
      ...(!shouldNotWrap && { flexWrap: 'wrap' }),
      ...(beforeElementExists && { paddingInlineStart: componentTheme.padding })
    },
    inputLayout: {
      label: 'textInput__inputLayout',
      flexGrow: 1,
      ...flexBase
    },
    afterElement: {
      // TODO this is added for the case when there is an IconButton inside a TextInput (like in the DateInput2 component)
      // and the button size makes the whole input 2px larger (because of the borders)
      // this is not the best solution and in the long term we should work with the design team to figure out how to handle such cases
      marginTop: '-1px',
      marginBottom: '-1px',
      label: 'textInput__afterElement',
      ...viewBase,
      flexShrink: 0,
      paddingInlineEnd: componentTheme.padding,
      // we only override the padding once the width is calculated,
      // it needs the padding on render
      ...(afterElementHasWidth === false && {
        paddingInlineEnd: 0
      })
    }
  }
}

export default generateStyle
