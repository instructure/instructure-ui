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
import type { LinkProps, LinkStyle, LinkStyleProps } from './props'
import {
  calcFocusOutlineStyles,
  calcMarginFromShorthand
} from '@instructure/emotion'
/**
 * ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param  {Object} componentTheme The theme variable object.
 * @param  {Object} props the props of the component, the style is applied to
 * @param  {Object} sharedTokens Shared token object that stores common values for the theme.
 * @param  {Object} state the state of the component, the style is applied to
 * @return {Object} The final style object, which will be used in the component
 */
const generateStyle = (
  componentTheme: NewComponentTypes['Link'],
  props: LinkProps,
  sharedTokens: SharedTokens,
  state: Partial<
    LinkStyleProps & {
      variant?: 'inline' | 'standalone'
      size?: 'small' | 'medium' | 'large'
    }
  > = {}
): LinkStyle => {
  const {
    isWithinText,
    renderIcon,
    iconPlacement = 'start', // TODO workaround needed for react 19 where defaultprops doesn't apply for some reasong
    color,
    margin
  } = props

  // Get size and variant from state (passed from makeStyleProps) or fall back to props
  const size = state.size ?? props.size
  const variant = state.variant ?? props.variant
  const hasVisibleChildren = state.hasVisibleChildren ?? false
  const isInverseStyle = color === 'link-inverse'

  const inlineLinkSizeStyles = {
    small: {
      fontFamily: componentTheme.inlineLink.small.fontFamily,
      fontWeight: componentTheme.inlineLink.small.fontWeight,
      fontSize: componentTheme.inlineLink.small.fontSize,
      lineHeight: componentTheme.inlineLink.small.lineHeight,
      textDecoration: componentTheme.inlineLink.small.textDecoration,
      gap: componentTheme.gapSm
    },
    medium: {
      fontFamily: componentTheme.inlineLink.medium.fontFamily,
      fontWeight: componentTheme.inlineLink.medium.fontWeight,
      fontSize: componentTheme.inlineLink.medium.fontSize,
      lineHeight: componentTheme.inlineLink.medium.lineHeight,
      textDecoration: componentTheme.inlineLink.medium.textDecoration,
      gap: componentTheme.gapMd
    },
    large: {
      fontFamily: componentTheme.inlineLink.large.fontFamily,
      fontWeight: componentTheme.inlineLink.large.fontWeight,
      fontSize: componentTheme.inlineLink.large.fontSize,
      lineHeight: componentTheme.inlineLink.large.lineHeight,
      textDecoration: componentTheme.inlineLink.large.textDecoration,
      gap: componentTheme.gapLg
    }
  }

  // For standalone variant, use the base component theme tokens
  const standaloneLinkSizeStyles = {
    small: {
      fontFamily: componentTheme.fontFamily,
      fontWeight: componentTheme.fontWeight,
      fontSize: componentTheme.fontSizeSm,
      lineHeight: componentTheme.lineHeightSm,
      textDecoration: 'none',
      gap: componentTheme.gapSm
    },
    medium: {
      fontFamily: componentTheme.fontFamily,
      fontWeight: componentTheme.fontWeight,
      fontSize: componentTheme.fontSizeMd,
      lineHeight: componentTheme.lineHeightMd,
      textDecoration: 'none',
      gap: componentTheme.gapMd
    },
    large: {
      fontFamily: componentTheme.fontFamily,
      fontWeight: componentTheme.fontWeight,
      fontSize: componentTheme.fontSizeLg,
      lineHeight: componentTheme.lineHeightLg,
      textDecoration: 'none',
      gap: componentTheme.gapLg
    }
  }

  // Get proper styles based on variant and size
  let variantStyles
  if (size && variant === 'inline') {
    variantStyles = inlineLinkSizeStyles[size]
  } else if (size && variant === 'standalone') {
    variantStyles = standaloneLinkSizeStyles[size]
  } else if (size) {
    // Fallback if variant is not specified but size is
    variantStyles = standaloneLinkSizeStyles[size]
  } else {
    // No size provided, use inherit
    variantStyles = {
      fontSize: 'inherit' as const,
      lineHeight: 'inherit' as const,
      textDecoration: undefined,
      gap: componentTheme.gapMd // Default gap for icons when no size is specified
    }
  }

  const baseStyles = {
    boxSizing: 'border-box',
    fontFamily: componentTheme.fontFamily,
    fontWeight: componentTheme.fontWeight,
    verticalAlign: 'baseline',
    fontSize: variantStyles.fontSize,
    lineHeight: variantStyles.lineHeight,

    // set up focus styles
    borderRadius: '0.125rem',

    // If icon is present, use flex to align icon with text
    // Use 'flex' for standalone variant (block-level), 'inline-flex' for inline variant
    ...(renderIcon &&
      hasVisibleChildren && {
        display: variant === 'standalone' ? 'flex' : 'inline-flex',
        alignItems: 'baseline'
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
    fontSize: variantStyles.fontSize,
    lineHeight: variantStyles.lineHeight,
    ...(variantStyles.fontFamily && { fontFamily: variantStyles.fontFamily }),
    ...(variantStyles.fontWeight && { fontWeight: variantStyles.fontWeight }),
    '&:hover, &:active': {
      color: componentTheme.textHoverColor,
      textDecoration: isWithinText
        ? componentTheme.hoverTextDecorationWithinText
        : componentTheme.hoverTextDecorationOutsideText
    },
    // Use textDecoration from variantStyles if available (from inlineLink token), otherwise fallback
    ...(variantStyles.textDecoration
      ? { textDecoration: variantStyles.textDecoration }
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
    fontSize: variantStyles.fontSize,
    lineHeight: variantStyles.lineHeight,
    ...(variantStyles.textDecoration && {
      textDecoration: variantStyles.textDecoration
    })
  }

  const inverseStyles = {
    color: componentTheme.onColorTextColor,
    // TODO remove double (here with the util and in View) focus ring calculations
    // in the future after the View refactor is complete
    // This needs stronger specificity than `View`
    '&&&&&:focus': {
      outlineColor: sharedTokens.focusOutline.onColor
    },
    '&:hover, &:active': {
      color: componentTheme.onColorTextHoverColor
    },
    '&[aria-disabled]': {
      color: componentTheme.onColorTextDisabledColor
    }
  }

  // Icon styles based on size - use gap from variantStyles
  const iconStyles = {
    paddingInlineStart:
      iconPlacement === 'start' ? 0 : variantStyles.gap || componentTheme.gapMd,
    paddingInlineEnd:
      iconPlacement === 'start' ? variantStyles.gap || componentTheme.gapMd : 0
  }

  return {
    link: {
      label: 'link',
      ...baseStyles,
      // TODO handle the merging on tokens inside the util
      margin: calcMarginFromShorthand(margin, {
        ...sharedTokens.spacing,
        ...sharedTokens.legacySpacing
      }),
      ...calcFocusOutlineStyles(
        sharedTokens.focusOutline,
        isInverseStyle ? { focusColor: 'inverse' } : undefined
      ),
      // NOTE: needs separate groups for `:is()` and `:-webkit-any()` because of css selector group validation (see https://www.w3.org/TR/selectors-3/#grouping)
      '&:is(a), &:is(button)': isClickableStyles,
      '&:-webkit-any(a), &:-webkit-any(button)': isClickableStyles,

      '&:is(button)': buttonStyle,
      '&:-webkit-any(button)': buttonStyle,

      ...(isInverseStyle && {
        ...inverseStyles,
        '&:is(a):link, &:is(a):visited, &:is(button)': inverseStyles,
        '&:-webkit-any(a):link, &:-webkit-any(a):visited, &:-webkit-any(button)':
          inverseStyles
      })
    },
    icon: {
      label: 'icon',
      ...(renderIcon && {
        boxSizing: 'border-box',
        display: 'flex',
        alignSelf: 'center',
        ...iconStyles
      })
    }
  }
}

export default generateStyle
