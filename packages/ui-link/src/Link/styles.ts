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

import { NewComponentTypes, SharedTokens } from '@instructure/ui-themes'
import type { LinkProps, LinkStyleProps, LinkStyle } from './props'
import { calcFocusOutlineStyles } from '@instructure/emotion'

type StyleParams = Pick<
  LinkProps,
  | 'themeOverride'
  | 'isWithinText'
  | 'renderIcon'
  | 'iconPlacement'
  | 'color'
  | 'size'
  | 'variant'
>
/**
 * ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param  {Object} componentTheme The theme variable object.
 * @param  {Object} params the props of the component, the style is applied to
 * @param  {Object} state the state of the component, the style is applied to
 * @return {Object} The final style object, which will be used in the component
 */
const generateStyle = (
  componentTheme: NewComponentTypes['Link'],
  params: StyleParams,
  state: LinkStyleProps,
  sharedTokens: SharedTokens
): LinkStyle => {
  const {
    isWithinText,
    renderIcon,
    iconPlacement = 'start', // TODO workaround needed for react 19 where defaultprops doesn't apply for some reasong
    color,
    size,
    variant
  } = params

  const { containsTruncateText, hasVisibleChildren } = state
  const inverseStyle = color === 'link-inverse'

  // Size mappings for font size, line height, and icon gaps
  const sizeStyles = {
    small: {
      fontSize: componentTheme.fontSizeSm,
      lineHeight: componentTheme.lineHeightSm,
      gap: componentTheme.gapSm
    },
    medium: {
      fontSize: componentTheme.fontSizeMd,
      lineHeight: componentTheme.lineHeightMd,
      gap: componentTheme.gapMd
    },
    large: {
      fontSize: componentTheme.fontSizeLg,
      lineHeight: componentTheme.lineHeightLg,
      gap: componentTheme.gapLg
    }
  }

  // Variant mappings for text decoration only
  const variantStyles = {
    inline: {
      textDecoration: 'underline'
    },
    standalone: {
      textDecoration: 'none'
    }
  }

  // Get size styles or use inherit if no size is provided
  const currentSize = size
    ? sizeStyles[size]
    : {
        fontSize: 'inherit',
        lineHeight: 'inherit',
        gap: componentTheme.gapMd // Default gap for icons when no size is specified
      }

  const baseStyles = {
    boxSizing: 'border-box',
    fontFamily: componentTheme.fontFamily,
    fontWeight: componentTheme.fontWeight,
    transition: 'outline-color 0.2s',
    verticalAlign: 'baseline',

    // set up focus styles
    borderRadius: '0.125rem',

    // If TruncateText is used in Link with icon, align the icon and the text vertically
    ...(renderIcon &&
      containsTruncateText &&
      hasVisibleChildren && {
        alignItems: 'center'
      }),

    '&[aria-disabled]': {
      cursor: 'not-allowed',
      pointerEvents: 'none',
      opacity: '1',
      color: componentTheme.textDisabledColor
    }
  }

  // If Link is a button or link, it should look clickable
  const isClickableStyles = {
    ...baseStyles,
    cursor: 'pointer',
    color: componentTheme.textColor,
    fontSize: currentSize.fontSize,
    lineHeight: currentSize.lineHeight,
    '&:hover, &:active': {
      color: componentTheme.textHoverColor,
      textDecoration: isWithinText
        ? componentTheme.hoverTextDecorationWithinText
        : componentTheme.hoverTextDecorationOutsideText
    },
    ...(variant && variantStyles[variant as keyof typeof variantStyles]
      ? variantStyles[variant as keyof typeof variantStyles]
      : {
          textDecoration: isWithinText
            ? componentTheme.textDecorationWithinText
            : componentTheme.textDecorationOutsideText
        })
  }

  const buttonStyle = {
    appearance: 'none',
    userSelect: 'text',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    margin: 0,
    padding: 0,
    textAlign: 'inherit',
    fontSize: currentSize.fontSize,
    lineHeight: currentSize.lineHeight,
    ...(variant &&
      variantStyles[variant as keyof typeof variantStyles] &&
      variantStyles[variant as keyof typeof variantStyles])
  }

  const inverseStyles = {
    color: componentTheme.onColorTextColor,
    '&:hover, &:active': {
      color: componentTheme.onColorTextHoverColor
    },
    '&[aria-disabled]': {
      color: componentTheme.onColorTextDisabledColor
    }
  }

  // Icon styles based on size
  const iconStyles = {
    paddingInlineStart: iconPlacement === 'start' ? 0 : currentSize.gap,
    paddingInlineEnd: iconPlacement === 'start' ? currentSize.gap : 0
  }
  return {
    link: {
      label: 'link',
      ...baseStyles,
      ...calcFocusOutlineStyles(sharedTokens.focusOutline),

      // NOTE: needs separate groups for `:is()` and `:-webkit-any()` because of css selector group validation (see https://www.w3.org/TR/selectors-3/#grouping)
      '&:is(a), &:is(button)': isClickableStyles,
      '&:-webkit-any(a), &:-webkit-any(button)': isClickableStyles,

      '&:is(button)': buttonStyle,
      '&:-webkit-any(button)': buttonStyle,

      ...(inverseStyle && {
        ...inverseStyles,
        '&:is(a):link, &:is(a):visited, &:is(button)': inverseStyles,
        '&:-webkit-any(a):link, &:-webkit-any(a):visited, &:-webkit-any(button)':
          inverseStyles
      })
    },
    icon: {
      label: 'icon',
      ...(renderIcon && {
        fontSize: '1.125em', // TODO old componentTheme.iconSize to S, M, L icon comatibility
        boxSizing: 'border-box',
        ...iconStyles
      })
    }
  }
}

export default generateStyle
