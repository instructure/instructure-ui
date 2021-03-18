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
const generateStyle = (componentTheme, props, state) => {
  const { isWithinText, renderIcon, iconPlacement, color } = props
  const { containsTruncateText, hasVisibleChildren } = state
  const inverseStyle = color === 'link-inverse'

  // If Link is a button or link, it should look clickable
  const isClickableStyle = {
    cursor: 'pointer',
    color: componentTheme.color,
    textDecoration: isWithinText
      ? componentTheme.textDecorationWithinText
      : componentTheme.textDecorationOutsideText,
    '&:focus': {
      color: componentTheme.color
    },
    '&:hover, &:active': {
      color: componentTheme.hoverColor,
      textDecoration: isWithinText
        ? componentTheme.hoverTextDecorationWithinText
        : componentTheme.hoverTextDecorationOutsideText
    }
  }

  const buttonStyle = {
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

  // If TruncateText is used in Link with icon, align the icon and the text vertically
  const truncateStyle =
    renderIcon && containsTruncateText && hasVisibleChildren
      ? { alignItems: 'center' }
      : {}

  const baseStyle = {
    label: 'link',
    boxSizing: 'border-box',
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

  return {
    link: {
      '&, &:is(a), &:is(button)': {
        ...baseStyle
      },
      '&:is(a), &:is(button)': {
        ...isClickableStyle
      },
      '&:is(button)': {
        ...buttonStyle
      },
      ...(inverseStyle && {
        '&, &:is(a):link, &:is(a):visited, &:is(button)': {
          color: componentTheme.colorInverse,
          '&:focus': {
            outlineColor: componentTheme.focusInverseIconOutlineColor
          },
          '&:hover, &:focus, &:active': {
            color: componentTheme.colorInverse
          }
        }
      })
    },
    icon: {
      label: 'icon',
      ...(renderIcon && {
        fontSize: componentTheme.iconSize,
        boxSizing: 'border-box',
        paddingInlineStart:
          iconPlacement === 'start' ? 0 : componentTheme.iconPlusTextMargin,
        paddingInlineEnd:
          iconPlacement === 'start' ? componentTheme.iconPlusTextMargin : 0
      })
    }
  }
}

export default generateStyle
