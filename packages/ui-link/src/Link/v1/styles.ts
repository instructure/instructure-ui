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

import type { LinkTheme } from '@instructure/shared-types'
import type { LinkProps, LinkStyleProps, LinkStyle } from './props'

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
  componentTheme: LinkTheme,
  props: LinkProps,
  state: LinkStyleProps
): LinkStyle => {
  const {
    isWithinText,
    renderIcon,
    iconPlacement = 'start', // TODO workaround needed for react 19 where defaultprops doesn't apply for some reasong
    color,
    variant
  } = props

  const { containsTruncateText, hasVisibleChildren } = state
  const inverseStyle = color === 'link-inverse'

  const variantStyles = {
    inline: {
      fontSize: componentTheme.fontSize,
      lineHeight: componentTheme.lineHeight,
      textDecoration: 'underline'
    },
    'inline-small': {
      fontSize: componentTheme.fontSizeSmall,
      lineHeight: '1.3125rem',
      textDecoration: 'underline'
    },
    standalone: {
      fontSize: componentTheme.fontSize,
      lineHeight: componentTheme.lineHeight,
      textDecoration: 'none'
    },
    'standalone-small': {
      fontSize: componentTheme.fontSizeSmall,
      lineHeight: componentTheme.lineHeight,
      textDecoration: 'none'
    }
  }

  const baseStyles = {
    boxSizing: 'border-box',
    fontFamily: componentTheme.fontFamily,
    fontWeight: componentTheme.fontWeight,
    transition: 'outline-color 0.2s',
    verticalAlign: 'baseline',
    // set up focus styles
    outlineColor: 'transparent',
    outlineOffset: '0.25rem',
    textUnderlineOffset: componentTheme.textUnderlineOffset,

    // If TruncateText is used in Link with icon, align the icon and the text vertically
    ...(renderIcon &&
      containsTruncateText &&
      hasVisibleChildren && {
        alignItems: 'center'
      }),

    '&&&&&&:focus': {
      outlineWidth: componentTheme.focusOutlineWidth,
      outlineStyle: componentTheme.focusOutlineStyle,
      borderRadius: componentTheme.focusOutlineBorderRadius,
      outlineColor: componentTheme.focusOutlineColor
    },
    '&[aria-disabled]': {
      cursor: 'not-allowed',
      pointerEvents: 'none',
      opacity: '0.5'
    },
    '&::-moz-focus-inner': {
      border: 0 // removes default dotted focus outline in Firefox
    }
  }

  // If Link is a button or link, it should look clickable
  const isClickableStyles = {
    ...baseStyles,
    cursor: 'pointer',
    color: componentTheme.color,
    // This needs stronger specificity than `View`
    '&&&&&:focus': {
      color: componentTheme.color,
      outlineColor: componentTheme.focusOutlineColor
    },
    '&:hover, &:active': {
      color: componentTheme.hoverColor,
      textDecoration: isWithinText
        ? componentTheme.hoverTextDecorationWithinText
        : componentTheme.hoverTextDecorationOutsideText
    },
    ...(variant
      ? variantStyles[variant]
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
    ...(variant ? variantStyles[variant] : { fontSize: '1em' })
  }

  const inverseStyles = {
    color: componentTheme.colorInverse,
    '&&&&&:focus': {
      outlineColor: componentTheme.focusInverseOutlineColor
    },
    ...(renderIcon && {
      '&&&&&:focus': {
        outlineColor: componentTheme.focusInverseIconOutlineColor
      }
    }),
    '&:hover, &&&&&:focus, &:active': {
      color: componentTheme.colorInverse
    }
  }
  const variantIconStyles = {
    inline: {
      paddingInlineStart:
        iconPlacement === 'start' ? 0 : componentTheme.iconPlusTextMargin,
      paddingInlineEnd:
        iconPlacement === 'start' ? componentTheme.iconPlusTextMargin : 0
    },
    'inline-small': {
      paddingInlineStart:
        iconPlacement === 'start' ? 0 : componentTheme.iconPlusTextMarginSmall,
      paddingInlineEnd:
        iconPlacement === 'start' ? componentTheme.iconPlusTextMarginSmall : 0
    },
    standalone: {
      paddingInlineStart:
        iconPlacement === 'start' ? 0 : componentTheme.iconPlusTextMargin,
      paddingInlineEnd:
        iconPlacement === 'start' ? componentTheme.iconPlusTextMargin : 0
    },
    'standalone-small': {
      paddingInlineStart:
        iconPlacement === 'start' ? 0 : componentTheme.iconPlusTextMarginSmall,
      paddingInlineEnd:
        iconPlacement === 'start' ? componentTheme.iconPlusTextMarginSmall : 0
    }
  }
  return {
    link: {
      label: 'link',
      ...baseStyles,

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
        fontSize: componentTheme.iconSize,
        boxSizing: 'border-box',
        ...(variant
          ? variantIconStyles[variant]
          : {
              paddingInlineStart:
                iconPlacement === 'start'
                  ? 0
                  : componentTheme.iconPlusTextMargin,
              paddingInlineEnd:
                iconPlacement === 'start'
                  ? componentTheme.iconPlusTextMargin
                  : 0
            })
      })
    }
  }
}

export default generateStyle
