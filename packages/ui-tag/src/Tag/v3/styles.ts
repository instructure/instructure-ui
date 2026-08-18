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
import type { TagProps, TagStyle } from './props'
import { calcFocusOutlineStyles } from '@instructure/emotion'

/**
 * ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param  {Object} componentTheme The theme variable object.
 * @param  {Object} props the props of the component, the style is applied to
 * @param  {Object} sharedTokens the state of the component, the style is applied to
 * @return {Object} The final style object, which will be used in the component
 */
const generateStyle = (
  componentTheme: ReturnType<NewComponentTypes['Tag']>,
  props: TagProps,
  sharedTokens: SharedTokens
): TagStyle => {
  const { size, onClick, href, dismissible, disabled, readOnly } = props

  const isInteractive = !!href || !!onClick
  const isDisabled = !!disabled || !!readOnly
  const isWholeTagButton = !!onClick && !href && !dismissible
  const isBodyInteractive = isInteractive && !isWholeTagButton

  const focusOutline = calcFocusOutlineStyles(sharedTokens.focusOutline)

  const sizeVariants = {
    small: {
      height: componentTheme.heightSmall,
      paddingLeft: componentTheme.paddingHorizontalSmall,
      paddingRight: componentTheme.paddingHorizontalSmall,
      fontSize: componentTheme.fontSizeSmall
    },
    medium: {
      height: componentTheme.heightMedium,
      paddingLeft: componentTheme.paddingHorizontal,
      paddingRight: componentTheme.paddingHorizontal,
      fontSize: `calc(${componentTheme.fontSizeMedium} - 0.0625rem)`
    },
    large: {
      height: componentTheme.heightLarge,
      paddingLeft: componentTheme.paddingHorizontalSmall,
      paddingRight: componentTheme.paddingHorizontal,
      fontSize: `calc(${componentTheme.fontSizeLarge} - 0.0625rem)`
    }
  }

  return {
    tag: {
      label: 'tag',
      boxSizing: 'border-box',
      fontFamily: componentTheme.fontFamily,
      display: 'inline-flex',
      alignItems: 'center',
      textAlign: 'center',
      verticalAlign: 'middle',
      userSelect: 'none',
      backgroundColor: componentTheme.defaultBackground,
      border: `${componentTheme.defaultBorderWidth} ${componentTheme.defaultBorderStyle} ${componentTheme.defaultBorderColor}`,
      borderRadius: componentTheme.defaultBorderRadius,
      color: componentTheme.defaultColor,
      ...(isInteractive && {
        transition: `background-color ${componentTheme.transitionTiming}`,
        '&:hover': { backgroundColor: componentTheme.defaultBackgroundHover }
      }),
      ...(isWholeTagButton && {
        appearance: 'none',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        ...focusOutline,
        transition: `background-color ${componentTheme.transitionTiming}, outline-color 0.2s, outline-offset 0.25s`
      }),
      ...sizeVariants[size!],
      ...(isDisabled && {
        cursor: 'not-allowed',
        pointerEvents: 'none',
        opacity: 0.5
      })
    },
    body: {
      label: 'tag__body',
      boxSizing: 'border-box',
      display: 'inline-flex',
      alignItems: 'center',
      minWidth: 0,
      color: 'inherit',
      font: 'inherit',
      ...(isBodyInteractive && {
        appearance: 'none',
        background: 'none',
        border: 0,
        margin: 0,
        padding: 0,
        textDecoration: 'none',
        touchAction: 'manipulation',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        borderRadius: componentTheme.inlineBorderRadius,
        ...focusOutline
      })
    },
    leadIcon: {
      label: 'tag__leadIcon',
      display: 'inline-flex',
      alignItems: 'center',
      marginInlineEnd: componentTheme.iconMargin,
      marginInlineStart: 0
    },
    text: {
      label: 'tag__text',
      lineHeight: 'normal',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: componentTheme.maxWidth,
      ...(href && { textDecoration: 'underline' })
    },
    closeButton: {
      label: 'tag__closeButton',
      boxSizing: 'border-box',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      appearance: 'none',
      background: 'none',
      border: 0,
      margin: 0,
      padding: 0,
      marginInlineStart: componentTheme.iconMargin,
      marginInlineEnd: 0,
      color: 'inherit',
      touchAction: 'manipulation',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      borderRadius: componentTheme.inlineBorderRadius,
      ...focusOutline
    },
    closeIcon: {
      label: 'tag__closeIcon',
      display: 'inline-flex',
      alignItems: 'center',
      transition: `all ${componentTheme.transitionTiming}`
    }
  }
}

export default generateStyle
