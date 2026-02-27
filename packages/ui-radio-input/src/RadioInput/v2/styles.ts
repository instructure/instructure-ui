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

import type { RadioInputProps, RadioInputStyle } from './props'
import type { NewComponentTypes, SharedTokens } from '@instructure/ui-themes'
import { calcFocusOutlineStyles } from '@instructure/emotion'

type StyleParams = {
  disabled: RadioInputProps['disabled']
  context: RadioInputProps['context']
  inline: RadioInputProps['inline']
  hovered: boolean
  readOnly: RadioInputProps['readOnly']
  size: RadioInputProps['size']
  variant: RadioInputProps['variant']
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
  componentTheme: NewComponentTypes['RadioInput'],
  params: StyleParams,
  sharedTokens: SharedTokens
): RadioInputStyle => {
  const { disabled, inline, hovered, size, readOnly } = params
  const variant = 'simple' // TODO read from params when the toggle variant is ready

  // 4*2 states: base, hover, disabled, readonly X none/selected
  const insetSizes = {
    small: componentTheme.checkedInsetSm,
    medium: componentTheme.checkedInsetMd,
    large: componentTheme.checkedInsetLg
  }
  const labelColors = {
    // the states here are mutually exclusive
    color: componentTheme.labelBaseColor,
    ...(hovered && {
      color: componentTheme.labelHoverColor
    }),
    ...(readOnly && {
      color: componentTheme.labelReadonlyColor
    }),
    ...(disabled && {
      color: componentTheme.labelDisabledColor
    })
  }

  // Input colors for different states
  const getInputColors = () => {
    if (disabled) {
      return {
        background: componentTheme.backgroundDisabledColor,
        borderColor: componentTheme.borderDisabledColor,
        checkedBoxShadow: `inset 0 0 0 ${insetSizes[size!]} ${
          componentTheme.borderDisabledColor
        }`
      }
    }
    if (readOnly) {
      return {
        background: componentTheme.backgroundReadonlyColor,
        borderColor: componentTheme.borderReadonlyColor,
        checkedBoxShadow: `inset 0 0 0 ${insetSizes[size!]} ${
          componentTheme.borderSelectedColor
        }`
      }
    }
    if (hovered) {
      return {
        background: componentTheme.backgroundHoverColor,
        borderColor: componentTheme.borderHoverColor,
        checkedBoxShadow: `inset 0 0 0 ${insetSizes[size!]} ${
          componentTheme.borderSelectedColor
        }`
      }
    }
    return {
      background: componentTheme.backgroundColor,
      borderColor: componentTheme.borderColor,
      checkedBoxShadow: `inset 0 0 0 ${insetSizes[size!]} ${
        componentTheme.borderSelectedColor
      }`
    }
  }

  const inputColors = getInputColors()

  const focusOutline = calcFocusOutlineStyles(sharedTokens.focusOutline)
  focusOutline.transition += ', box-shadow 0.2s'

  const inputVariants = {
    simple: {
      base: {
        all: 'initial',
        boxSizing: 'border-box',
        appearance: 'none',
        display: 'block',
        position: 'relative',
        marginInlineEnd: componentTheme.gap,
        marginInlineStart: '0',
        flexShrink: 0,
        minWidth: '1rem',
        borderRadius: '100%',
        borderWidth: componentTheme.borderWidth,
        borderStyle: 'solid',
        background: inputColors.background,
        borderColor: inputColors.borderColor,
        cursor: disabled ? 'not-allowed' : 'pointer',
        '&:checked': {
          borderColor: disabled
            ? componentTheme.borderDisabledColor
            : componentTheme.borderSelectedColor,
          boxShadow: inputColors.checkedBoxShadow
        },
        marginTop: componentTheme.controlVerticalMargin,
        marginBottom: componentTheme.controlVerticalMargin,
        ...focusOutline
      },
      small: {
        width: componentTheme.controlSizeSm,
        height: componentTheme.controlSizeSm
      },
      medium: {
        width: componentTheme.controlSizeMd,
        height: componentTheme.controlSizeMd
      },
      large: {
        width: componentTheme.controlSizeLg,
        height: componentTheme.controlSizeLg
      }
    }
  }

  const labelVariants = {
    simple: {
      base: {},
      small: {
        fontSize: componentTheme.fontSizeSm,
        lineHeight: componentTheme.lineHeightSm
      },
      medium: {
        fontSize: componentTheme.fontSizeMd,
        lineHeight: componentTheme.lineHeightMd
      },
      large: {
        fontSize: componentTheme.fontSizeLg,
        lineHeight: componentTheme.lineHeightLg
      }
    }
    /*toggle: {
      base: {
        position: 'relative',
        zIndex: 1,
        textTransform: 'uppercase',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        lineHeight: 1,
        display: 'flex',
        alignItems: 'center',
        minWidth: '0.0625rem',

        [getInputStateSelector('checked')]: {
          color: componentTheme.toggleHandleText
        },
        [getInputStateSelector('focus')]: {
          textDecoration: 'underline'
        }
      },
      small: {
        fontSize: componentTheme.toggleSmallFontSize,
        height: componentTheme.toggleSmallHeight,
        svg: {
          fontSize: `calc(${componentTheme.toggleSmallFontSize} + 0.375rem)`
        }
      },
      medium: {
        fontSize: componentTheme.toggleMediumFontSize,
        height: componentTheme.toggleMediumHeight,
        svg: {
          fontSize: `calc(${componentTheme.toggleMediumFontSize} + 0.375rem)`
        }
      },
      large: {
        fontSize: componentTheme.toggleLargeFontSize,
        height: componentTheme.toggleLargeHeight,
        svg: {
          fontSize: `calc(${componentTheme.toggleLargeFontSize} + 0.375rem)`
        }
      }
    }*/
  }

  return {
    radioInput: {
      label: 'radioInput',
      position: 'relative',
      display: 'flex',
      alignItems: 'flex-start',
      width: inline ? 'auto' : '100%',
      ...(inline && {
        display: 'inline-flex',
        verticalAlign: 'middle'
      }),

      '&:hover': {
        cursor: 'default',
        ...(disabled && { cursor: 'not-allowed' })
      }
    },
    input: {
      label: 'radioInput__input',
      ...inputVariants[variant!].base,
      ...inputVariants[variant!][size!]
    },
    label: {
      label: 'radioInput__label',
      // flex-grow, flex-shrink, flex-basis
      flex: '1 1 auto',
      alignSelf: 'center',
      ...labelColors,
      fontFamily: componentTheme.fontFamily,
      fontWeight: componentTheme.fontWeight,
      ...labelVariants[variant!].base,
      ...labelVariants[variant!][size!],
      cursor: disabled ? 'not-allowed' : 'pointer'
    }
  }
}

export default generateStyle
