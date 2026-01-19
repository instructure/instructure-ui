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

import type { NewComponentTypes, SharedTokens } from '@instructure/ui-themes'
import { TextInputProps, TextInputStyle, TextInputStyleProps } from './props'
import { calcFocusOutlineStyles } from '@instructure/emotion'

/**
 * ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param componentTheme The theme variable object.
 * @param props the props of the component, the style is applied to
 * @param sharedTokens Shared token object that stores common values for the theme.
 * @param state the state of the component, the style is applied to
 * @return The final style object, which will be used in the component
 */
const generateStyle = (
  componentTheme: NewComponentTypes['TextInput'],
  props: TextInputProps,
  sharedTokens: SharedTokens,
  state: TextInputStyleProps
): TextInputStyle => {
  const { size, textAlign, shouldNotWrap } = props
  const {
    interaction,
    success,
    invalid,
    afterElementHasWidth,
    beforeElementExists
  } = state

  const sizeVariants = {
    small: {
      fontSize: componentTheme.fontSizeSm,
      height: `calc(${componentTheme.heightSm} - (2 * ${componentTheme.borderWidth}))`,
      lineHeight: `calc(${componentTheme.heightSm} - (2 * ${componentTheme.borderWidth}))`
    },
    medium: {
      fontSize: componentTheme.fontSizeMd,
      height: `calc(${componentTheme.heightMd} - (2 * ${componentTheme.borderWidth}))`,
      lineHeight: `calc(${componentTheme.heightMd} - (2 * ${componentTheme.borderWidth}))`
    },
    large: {
      fontSize: componentTheme.fontSizeLg,
      height: `calc(${componentTheme.heightLg} - (2 * ${componentTheme.borderWidth}))`,
      lineHeight: `calc(${componentTheme.heightLg} - (2 * ${componentTheme.borderWidth}))`
    }
  }
  const paddingHorizontalVariants = {
    small: componentTheme.paddingHorizontalSm,
    medium: componentTheme.paddingHorizontalMd,
    large: componentTheme.paddingHorizontalLg
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
    // padding of the text in the input
    padding: `0 ${componentTheme.gapContent} 0  ${componentTheme.gapContent}`,
    background: 'transparent',
    border: 'none',
    verticalAlign: 'baseline',
    '&[autocomplete="off"]::-webkit-contacts-auto-fill-button': {
      display: 'none !important'
    },
    '&:focus': {
      boxShadow: 'initial'
    },
    ...sizeVariants[size!],
    textAlign: textAlign,
    ...inputInteractionStates
  }

  const viewBase = {
    boxSizing: 'border-box',
    fontFamily: componentTheme.fontFamily,
    maxWidth: '100%',
    overflow: 'visible',
    unicodeBidi: 'isolate'
  }

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

  const focusOutline = calcFocusOutlineStyles(sharedTokens.focusOutline, {
    focusColor: invalid ? 'danger' : success ? 'success' : undefined,
    // Only display the focus outline when the input is focused.
    // This is to prevent double focus ring when e.g., a Button is rendered in
    // `renderBeforeInput`
    customCSSSelector: '&:has(input:focus)'
  })

  return {
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
      border: `${componentTheme.borderWidth} solid`,
      borderRadius: componentTheme.borderRadius,
      color: componentTheme.textColor,
      ...containerInteractionStates,
      ...focusOutline
    },
    layout: {
      label: 'textInput__layout',
      ...viewBase,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: 'row',
      ...(!shouldNotWrap && { flexWrap: 'wrap' }),
      // left padding of the `renderBeforeInput` element
      ...(beforeElementExists && {
        paddingInlineStart: paddingHorizontalVariants[size!]
      })
    },
    inputLayout: {
      label: 'textInput__inputLayout',
      flexGrow: 1,
      ...viewBase,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: 'row'
    },
    afterElement: {
      // the next couple lines (until the `label`) is needed so the IconButton looks OK inside the TextInput
      // explanation: if the content inside is not a button or a popover (which could contain a button) it should have some padding on the right
      // lineHeight is only needed if it is not popover or button
      '& > :not(button):not([data-position^="Popover"])': {
        marginRight: paddingHorizontalVariants[size!]
        // TODO check if it looks OK with the new buttons. With this it does not look OK with new icons
        //...(sizeVariants[size!] && {
        //  lineHeight: sizeVariants[size!]?.lineHeight
        //})
      },
      display: 'flex',
      alignItems: 'center',
      // Spread all sizeVariants except lineHeight (handled above)
      ...(sizeVariants[size!]
        ? // eslint-disable-next-line @typescript-eslint/no-unused-vars
          (({ lineHeight, ...rest }) => rest)(sizeVariants[size!])
        : {}),
      label: 'textInput__afterElement',
      ...viewBase,
      borderRadius: componentTheme.borderRadius,
      flexShrink: 0,
      // we only override the padding once the width is calculated,
      // it needs the padding on render
      ...(afterElementHasWidth === false && {
        paddingInlineEnd: 0
      })
    }
  }
}

export default generateStyle
