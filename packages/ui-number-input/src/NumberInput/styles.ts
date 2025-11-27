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

import type { NumberInputProps, NumberInputStyle } from './props'
import type { NewComponentTypes, SharedTokens } from '@instructure/ui-themes'
import { calcFocusOutlineStyles } from '@instructure/emotion'

type StyleParams = {
  size: NumberInputProps['size']
  textAlign: NumberInputProps['textAlign']
  interaction: NumberInputProps['interaction']
  invalid: boolean
  success: boolean
}

/**
 * ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param componentTheme The theme variable object.
 * @param params Additional parameters to customize the style.
 * @param sharedTokens Shared token object that stores common values for the theme.
 * @return The final style object, which will be used in the component
 */
const generateStyle = (
  componentTheme: NewComponentTypes['TextInput'],
  params: StyleParams,
  sharedTokens: SharedTokens
): NumberInputStyle => {
  const { size, textAlign, interaction, success, invalid } = params

  const containerInteractionStates = {
    ...(interaction === 'enabled' && {
      backgroundColor: componentTheme.backgroundColor,
      borderColor: componentTheme.borderColor,
      ...(success && {
        borderColor: componentTheme.successBorderColor
      }),
      ...(invalid && {
        borderColor: componentTheme.errorBorderColor
      }),
      '&:hover': {
        backgroundColor: componentTheme.backgroundHoverColor,
        borderColor: componentTheme.borderHoverColor,
        ...(success && {
          borderColor: componentTheme.successBorderColor
        }),
        ...(invalid && {
          borderColor: componentTheme.errorBorderColor
        })
      }
    }),
    ...(interaction === 'readonly' && {
      backgroundColor: componentTheme.backgroundReadonlyColor,
      borderColor: componentTheme.borderReadonlyColor
    }),
    ...(interaction === 'disabled' && {
      cursor: 'not-allowed',
      pointerEvents: 'none',
      backgroundColor: componentTheme.backgroundDisabledColor,
      borderColor: componentTheme.borderDisabledColor
    })
  }
  const arrowInteractionStates = {
    ...(interaction === 'enabled' && {
      backgroundColor: componentTheme.arrowsBackgroundColor,
      borderColor: componentTheme.arrowsBorderColor,
      '&:hover': {
        backgroundColor: componentTheme.arrowsBackgroundHoverColor,
        borderColor: componentTheme.arrowsBorderHoverColor
      },
      '&:active': {
        backgroundColor: componentTheme.arrowsBackgroundActiveColor,
        borderColor: componentTheme.arrowsBorderActiveColor
      }
    }),
    ...(interaction === 'disabled' && {
      cursor: 'not-allowed',
      pointerEvents: 'none',
      backgroundColor: componentTheme.arrowsBackgroundDisabledColor,
      borderColor: componentTheme.arrowsBorderDisabledColor
    })
    // arrow buttons are not rendered in the `readOnly` state
  }
  const inputInteractionStates = {
    ...(interaction === 'enabled' && {
      color: componentTheme.textColor,
      '&::placeholder': {
        color: componentTheme.placeholderColor
      },
      '&:hover::placeholder': {
        color: componentTheme.placeholderHoverColor
      }
      // placeholder is not rendered in the `readOnly` and `disabled` state
    }),
    ...(interaction === 'readonly' && {
      color: componentTheme.textReadonlyColor
    }),
    ...(interaction === 'disabled' && {
      color: componentTheme.textDisabledColor
    })
  }

  const inputStyle = {
    all: 'initial',
    textAlign: textAlign,
    direction: 'inherit',
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
    fontWeight: 'inherit',
    ...(size === 'medium'
      ? {
          padding: componentTheme.paddingHorizontalMd
        }
      : {
          padding: componentTheme.paddingHorizontalLg
        }),
    ...inputInteractionStates
  }

  const focusOutline = calcFocusOutlineStyles(sharedTokens.focusOutline, {
    focusWithin: true
  })
  return {
    requiredInvalid: {
      // color of the small required star
      //color: componentTheme.requiredInvalidColor TODO handle in FormFieldLayout
    },
    numberInput: {
      label: 'numberInput'
    },
    arrowContainer: {
      label: 'numberInput_arrowContainer',
      flex: `0 0 ${componentTheme.arrowsContainerWidth}`,
      display: 'flex',
      flexDirection: 'column'
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
      borderTop: 'none',
      borderInlineEnd: 'none',
      borderInlineStart: `${componentTheme.borderWidth} solid`,
      borderBottom: `${componentTheme.borderWidth} solid`,
      '&:last-child': { borderBottom: 'none' },
      ...arrowInteractionStates
    },
    inputWidth: {
      label: 'numberInput_inputWidth',
      display: 'block',
      position: 'relative'
    },
    inputContainer: {
      label: 'numberInput_inputContainer',
      display: 'flex',
      margin: '0',
      boxSizing: 'border-box',
      overflow: 'hidden',
      fontFamily: componentTheme.fontFamily,
      fontWeight: componentTheme.fontWeight,
      border: `${componentTheme.borderWidth} solid`,
      borderRadius: componentTheme.borderRadius,
      ...containerInteractionStates,
      ...focusOutline,
      ...(size === 'medium'
        ? {
            fontSize: componentTheme.fontSizeMd,
            height: componentTheme.heightMd
          }
        : {
            fontSize: componentTheme.fontSizeLg,
            height: componentTheme.heightLg
          })
    },
    input: {
      label: 'numberInput_input',
      ...inputStyle,
      '&:is(input)[type]': inputStyle,
      '&:-webkit-any(input)[type]': inputStyle,
      '&::-webkit-inner-spin-button': { display: 'none' },
      '&::-webkit-outer-spin-button': { display: 'none' },
      '&:is(input)[type="number"]': { MozAppearance: 'textfield' }
    }
  }
}

export default generateStyle
