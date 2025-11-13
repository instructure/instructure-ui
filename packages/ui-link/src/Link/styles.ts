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

import { NewComponentTypes } from '@instructure/ui-themes'
import type { LinkProps, LinkStyleProps, LinkStyle } from './props'

type StyleParams = {
  themeOverride: LinkProps['themeOverride']
  isWithinText: LinkProps['isWithinText']
  renderIcon: LinkProps['renderIcon']
  iconPlacement: LinkProps['iconPlacement']
  color: LinkProps['color']
  variant: LinkProps['variant']
}
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
  state: LinkStyleProps
): LinkStyle => {
  const {
    isWithinText,
    renderIcon,
    iconPlacement = 'start', // TODO workaround needed for react 19 where defaultprops doesn't apply for some reasong
    color,
    variant
  } = params

  const { containsTruncateText, hasVisibleChildren } = state
  const inverseStyle = color === 'link-inverse'

  const variantStyles = {
    inline: {
      fontSize: componentTheme.fontSizeMd,
      lineHeight: componentTheme.lineHeightMd,
      textDecoration: 'underline'
    },
    'inline-small': {
      fontSize: componentTheme.fontSizeSm,
      lineHeight: componentTheme.lineHeightSm,
      textDecoration: 'underline'
    },
    standalone: {
      fontSize: componentTheme.fontSizeMd,
      lineHeight: componentTheme.lineHeightMd,
      textDecoration: 'none'
    },
    'standalone-small': {
      fontSize: componentTheme.fontSizeSm,
      lineHeight: componentTheme.lineHeightSm,
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
    outlineWidth: '0.125rem', // TODO waiting for focusOutlineWidth
    outlineStyle: 'solid', // TODO waiting for focusOutlineStyle
    borderRadius: '0.125rem', // TODO waiting for focusOutlineBorderRadius
    outlineOffset: '0.25rem',
    textUnderlineOffset: 'auto',

    // If TruncateText is used in Link with icon, align the icon and the text vertically
    ...(renderIcon &&
      containsTruncateText &&
      hasVisibleChildren && {
        alignItems: 'center'
      }),
    '&:focus': {
      outlineColor: componentTheme.textColor // TODO waiting for focusOutlineColor
    },
    '&[aria-disabled]': {
      cursor: 'not-allowed',
      pointerEvents: 'none',
      opacity: '1',
      color: componentTheme.textDisabledColor
    },
    '&::-moz-focus-inner': {
      border: 0 // removes default dotted focus outline in Firefox
    }
  }

  // If Link is a button or link, it should look clickable
  const isClickableStyles = {
    ...baseStyles,
    cursor: 'pointer',
    color: componentTheme.textColor,
    '&:focus': {
      color: componentTheme.textColor,
      outlineColor: componentTheme.textColor // TODO waiting for focusOutlineColor
    },
    '&:hover, &:active': {
      color: componentTheme.textHoverColor,
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
    color: componentTheme.onColorTextColor,
    '&:focus': {
      outlineColor: componentTheme.onColorTextColor, // TODO waiting for focusInverseOutlineColor
      color: componentTheme.onColorTextColor
    },
    '&:hover, &:active': {
      color: componentTheme.onColorTextHoverColor
    },
    '&[aria-disabled]': {
      color: componentTheme.onColorTextDisabledColor
    }
  }

  const variantIconStyles = {
    inline: {
      paddingInlineStart: iconPlacement === 'start' ? 0 : componentTheme.gapMd,
      paddingInlineEnd: iconPlacement === 'start' ? componentTheme.gapMd : 0
    },
    'inline-small': {
      paddingInlineStart: iconPlacement === 'start' ? 0 : componentTheme.gapSm,
      paddingInlineEnd: iconPlacement === 'start' ? componentTheme.gapSm : 0
    },
    standalone: {
      paddingInlineStart: iconPlacement === 'start' ? 0 : componentTheme.gapMd,
      paddingInlineEnd: iconPlacement === 'start' ? componentTheme.gapMd : 0
    },
    'standalone-small': {
      paddingInlineStart: iconPlacement === 'start' ? 0 : componentTheme.gapSm,
      paddingInlineEnd: iconPlacement === 'start' ? componentTheme.gapSm : 0
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
        fontSize: '1.125em', // TODO old componentTheme.iconSize to S, M, L
        boxSizing: 'border-box',
        ...(variant
          ? variantIconStyles[variant]
          : {
              paddingInlineStart:
                iconPlacement === 'start' ? 0 : componentTheme.gapMd,
              paddingInlineEnd:
                iconPlacement === 'start' ? componentTheme.gapMd : 0
            })
      })
    }
  }
}

export default generateStyle
