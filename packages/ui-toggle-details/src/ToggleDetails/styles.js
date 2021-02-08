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

import { keyframes } from '@instructure/emotion'
const contentAnimation = keyframes`
    to {
      opacity: 1
    }`
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
  const { fluidWidth, iconPosition, size, variant } = props
  const { animate } = state

  const positionIconAtEnd =
    iconPosition === 'end' && (variant === 'filled' || fluidWidth)
  const fluidWidthStyles = fluidWidth ? { display: 'block', width: '100%' } : {}

  const iconPositionStyles = {
    start: {
      marginInlineEnd: componentTheme.iconMargin,
      marginInlineStart: 0
    },
    end: {
      marginInlineStart: componentTheme.iconMargin,
      marginInlineEnd: 0
    }
  }

  const fontSizeStyles = {
    small: { fontSize: componentTheme.fontSizeSmall },
    medium: { fontSize: componentTheme.fontSizeMedium },
    large: { fontSize: componentTheme.fontSizeLarge }
  }

  const iconSizeStyles = {
    small: { fontSize: componentTheme.smallIconSize },
    medium: { fontSize: componentTheme.mediumIconSize },
    large: { fontSize: componentTheme.largeIconSize }
  }

  const indentDetailsStyles =
    iconPosition === 'start' && !fluidWidth
      ? {
          small: {
            paddingInlineStart: `calc(${componentTheme.smallIconSize} + ${componentTheme.togglePadding})`,
            paddingInlineEnd: '0'
          },
          medium: {
            paddingInlineStart: `calc(${componentTheme.mediumIconSize} + ${componentTheme.togglePadding})`,
            paddingInlineEnd: '0'
          },
          large: {
            paddingInlineStart: `calc(${componentTheme.largeIconSize} + ${componentTheme.togglePadding})`,
            paddingInlineEnd: '0'
          }
        }
      : {
          small: {},
          medium: {},
          large: {}
        }

  return {
    toggleDetails: {
      label: 'toggleDetails',
      fontFamily: componentTheme.fontFamily,
      fontWeight: componentTheme.fontWeight,
      lineHeight: componentTheme.lineHeight
    },
    summary: {
      label: 'toggleDetails__summary',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box',
      textAlign: 'start'
    },
    summaryText: {
      label: 'toggleDetails__summaryText',
      minWidth: '0.0625rem',
      flexGrow: 1,
      ...(positionIconAtEnd ? { flex: 1 } : {})
    },
    toggle: {
      label: 'toggleDetails__toggle',
      fontFamily: componentTheme.fontFamily,
      appearance: 'none',
      cursor: 'pointer',
      userSelect: 'none',
      touchAction: 'manipulation',
      position: 'relative',
      overflow: 'visible',
      boxSizing: 'border-box',
      padding: '0',
      margin: '0',
      outline: 'none',
      border: 'none',
      background: 'transparent',
      color: componentTheme.textColor,
      '&::-moz-focus-inner': { padding: '0', margin: '0' },
      '&::before': {
        content: '""',
        position: 'absolute',
        top: '-0.375rem',
        left: '-0.375rem',
        right: '-0.375rem',
        bottom: '-0.375rem',
        border: `${componentTheme.toggleBorderWidth} ${componentTheme.toggleBorderStyle} ${componentTheme.toggleFocusBorderColor}`,
        borderRadius: `calc(${componentTheme.toggleBorderRadius} * 1.5)`,
        opacity: 0,
        pointerEvents: 'none'
      },
      '&:focus': { '&::before': { opacity: 1 } },
      '&:focus, &:hover,  &:active': {
        textDecoration: 'none',
        color: componentTheme.textColor
      },
      textDecoration: 'none',
      ...fluidWidthStyles,
      ...fontSizeStyles[size]
    },
    icon: {
      label: 'toggleDetails__icon',
      '& > svg': {
        display: 'block' /* fix vertical alignment of icon */
      },
      ...iconPositionStyles[iconPosition],
      ...iconSizeStyles[size]
    },
    details: {
      label: 'toggleDetails__details',
      boxSizing: 'border-box',
      paddingTop: componentTheme.togglePadding,
      color: componentTheme.textColor,
      ...fontSizeStyles[size],
      ...indentDetailsStyles[size]
    },
    content: animate
      ? {
          label: 'toggleDetails__content',
          opacity: 0.01,
          animationName: contentAnimation,
          animationFillMode: 'forwards',
          animationDuration: '.3s'
        }
      : {}
  }
}

export default generateStyle
