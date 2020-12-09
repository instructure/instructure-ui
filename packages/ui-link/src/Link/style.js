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

import generateComponentTheme from './theme'
/**
 * Generates the style object from the theme and provided additional information
 * @param  {Object} theme The actual theme object.
 * @param  {Object} themeOverride User provided overrides of the default theme mapping.
 * @param  {Object} props the props of the component, the style is applied to
 * @param  {Object} state the state of the component, the style is applied to
 * @return {Object} The final style object, which will be used in the component
 */
const generateStyle = (theme, themeOverride, props, state) => {
  // get the theme variables object for the component
  const componentTheme = generateComponentTheme(theme, themeOverride)
  const {
    isWithinText,
    renderIcon,
    iconPlacement,
    elementName,
    variant,
    color
  } = props

  const textDecorationStyle = isWithinText
    ? componentTheme.textDecorationWithinText
    : componentTheme.textDecorationOutsideText

  // If Link is a button or link, it should look clickable
  const buttonOrLinkStyle =
    elementName === 'button' || elementName === 'a'
      ? {
          cursor: 'pointer',
          color: componentTheme.color,
          textDecoration: props.isWithinText
            ? componentTheme.textDecorationWithinText
            : componentTheme.textDecorationOutsideText,
          '&:focus': {
            color: componentTheme.color
          },
          '&:hover, &:active': {
            color: componentTheme.hoverColor,
            textDecoration: props.isWithinText
              ? componentTheme.hoverTextDecorationWithinText
              : componentTheme.hoverTextDecorationOutsideText
          }
        }
      : {}

  const inverseStyle =
    variant === 'inverse' || color === 'link-inverse'
      ? {
          color: componentTheme.colorInverse,
          '&:focus': {
            outlineColor: componentTheme.focusInverseOutlineColor
          },
          '&:hover, &:focus, &:active': {
            color: componentTheme.colorInverse
          }
        }
      : {}

  const buttonStyle =
    elementName === 'button'
      ? {
          appearance: 'none',
          userSelect: 'text',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1em',
          margin: 0,
          padding: 0,
          textAlign: 'inherit'
        }
      : {}

  // If TruncateText is used in Link with icon, align the icon and the text vertically
  const truncateStyle =
    props.renderIcon && state.containsTruncateText && state.hasVisibleChildren
      ? { alignItems: 'center' }
      : {}

  const rootStyles = {
    label: 'link',
    link: {
      textDecoration: textDecorationStyle,
      fontFamily: componentTheme.fontFamily,
      fontWeight: componentTheme.fontWeight,
      transition: 'outline-color 0.2s',
      verticalAlign: 'baseline',
      // set up focus styles
      outlineColor: 'transparent',
      outlineWidth: componentTheme.focusOutlineWidth,
      outlineStyle: componentTheme.focusOutlineStyle,
      outlineOffset: '0.25rem',
      ...truncateStyle,
      ...buttonStyle,
      ...inverseStyle,
      ...buttonOrLinkStyle,
      '&:focus': {
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
  }

  const iconStyles = renderIcon
    ? {
        label: 'icon',
        icon: {
          fontSize: componentTheme.iconSize,
          boxSizing: 'border-box'
        },
        paddingInlineStart:
          iconPlacement === 'start' ? 0 : componentTheme.iconPlusTextMargin,
        paddingInlineEnd:
          iconPlacement === 'start' ? componentTheme.iconPlusTextMargin : 0
      }
    : {}

  return {
    root: {
      ...rootStyles
    },
    icon: {
      ...iconStyles
    }
  }
}

export default generateStyle
