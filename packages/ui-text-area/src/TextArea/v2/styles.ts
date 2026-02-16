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

import type { TextAreaProps, TextAreaStyle } from './props'
import { NewComponentTypes, SharedTokens } from '@instructure/ui-themes'
import { calcFocusOutlineStyles } from '@instructure/emotion'

type StyleParams = {
  disabled: TextAreaProps['disabled']
  readOnly: TextAreaProps['readOnly']
  size: TextAreaProps['size']
  success: boolean
  invalid: boolean
}

/**
 * ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param  {Object} componentTheme The theme variable object.
 * @param  {Object} params Additional parameters to customize the style.
 * @return {Object} The final style object, which will be used in the component
 */
const generateStyle = (
  componentTheme: NewComponentTypes['TextArea'],
  params: StyleParams,
  sharedTokens: SharedTokens
): TextAreaStyle => {
  const { disabled, size, success, invalid, readOnly } = params

  const fontSizeVariants = {
    small: {
      fontSize: componentTheme.fontSizeSm
    },
    medium: {
      fontSize: componentTheme.fontSizeMd
    },
    large: {
      fontSize: componentTheme.fontSizeLg
    }
  }

  const focusColor =
    disabled || readOnly
      ? 'info'
      : invalid
      ? 'danger'
      : success
      ? 'success'
      : 'info'

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
      borderStyle: 'solid',
      borderColor: componentTheme.borderColor,
      borderRadius: componentTheme.borderRadius,
      color: componentTheme.textColor,
      background: componentTheme.backgroundColor,
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word',
      textAlign: 'start',
      ...(!disabled &&
        !readOnly && {
          '&:hover': {
            background: componentTheme.backgroundHoverColor,
            borderColor: componentTheme.borderHoverColor,
            '&::placeholder': {
              color: componentTheme.placeholderHoverColor
            }
          }
        }),
      ...(readOnly && {
        color: componentTheme.textReadonlyColor,
        background: componentTheme.backgroundReadonlyColor,
        borderColor: componentTheme.borderReadonlyColor
      }),
      ...(disabled && {
        color: componentTheme.textDisabledColor,
        background: componentTheme.backgroundDisabledColor,
        borderColor: componentTheme.borderDisabledColor,
        cursor: 'not-allowed',
        pointerEvents: 'none',
        opacity: 0.5
      }),
      ...(!disabled &&
        !readOnly &&
        success && {
          borderColor: componentTheme.successBorderColor
        }),
      ...fontSizeVariants[size!],
      ...calcFocusOutlineStyles(sharedTokens.focusOutline, {
        focusColor
      }),
      ...(!disabled &&
        !readOnly && {
          '&[aria-invalid], &[aria-invalid]:focus': {
            borderColor: componentTheme.errorBorderColor
          }
        }),
      '&::placeholder': {
        color: componentTheme.placeholderColor
      },
      '&::-webkit-resizer': {
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
          '<svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M8.35352 0.353516L0.353516 8.35352M8.35352 4.35352L4.35352 8.35352" stroke="#8D959F"/></svg>'
        )}")`,
        backgroundColor: 'transparent',
        backgroundPosition: 'bottom 2px right 2px', // Position away from edges
        backgroundRepeat: 'no-repeat',
        backgroundSize: '10px 10px'
      }
    },
    textAreaLayout: {
      label: 'textArea__layout',
      position: 'relative'
    }
  }
}

export default generateStyle
