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

// keyframes have to be outside of 'generateStyle',
// since it is causing problems in style recalculation
const selectedTab = keyframes`
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0) scaleX(1);
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
  const { variant, isSelected, isDisabled } = props

  const variants = {
    default: {
      padding: '1rem 1.25rem', // if horizontal padding changes, update `scrollOverlayWidthDefault` in `Tabs/theme.js`
      lineHeight: 1,
      position: 'relative',
      zIndex: componentTheme.zIndex,
      color: componentTheme.defaultColor,

      ...(isDisabled && { fontWeight: 'normal' }),

      '&::after': {
        content: '""',
        height: '0.25rem',
        width: '100%',
        position: 'absolute',
        insetInlineStart: 0,
        bottom: 0,
        opacity: 0,
        transform: 'translate3d(0, 0, 0) scaleX(0.01)',
        ...(isSelected && {
          backgroundColor: componentTheme.defaultSelectedBorderColor,
          animationName: selectedTab,
          animationDuration: '0.2s',
          animationFillMode: 'forwards',
          animationTimingFunction: 'ease-out'
        })
      },

      '&:hover': {
        ...(!isDisabled &&
          !isSelected && {
            borderBottomColor: componentTheme.defaultHoverBorderColor
          })
      }
    },
    secondary: {
      padding: '0.75rem 1rem', // if horizontal padding changes, update `scrollOverlayWidthSecondary` in `Tabs/theme.js`
      color: componentTheme.secondaryColor,
      marginInlineEnd: '0.2em',
      marginBottom: '-0.0625rem',
      border: '0.0625rem solid transparent',
      borderTopLeftRadius: '0.1875rem',
      borderTopRightRadius: '0.1875rem',
      position: 'relative',

      ...(isSelected && {
        background: componentTheme.secondarySelectedBackground,
        borderColor: componentTheme.secondarySelectedBorderColor,
        zIndex: componentTheme.zIndex,
        borderBottomColor: componentTheme.secondarySelectedBackground
      }),

      ...((isSelected || isDisabled) && {
        color: componentTheme.secondarySelectedColor
      }),

      '&:first-of-type': { marginInlineStart: '0' },

      '&:hover': {
        color: componentTheme.secondarySelectedColor,
        ...(!isDisabled &&
          !isSelected && {
            background: componentTheme.secondarySelectedBackground,
            borderColor: componentTheme.secondarySelectedBorderColor
          })
      }
    }
  }

  return {
    tab: {
      label: 'tab',
      fontFamily: componentTheme.fontFamily,
      fontWeight: componentTheme.fontWeight,
      lineHeight: componentTheme.lineHeight,
      fontSize: componentTheme.fontSize,
      cursor: 'pointer',
      userSelect: 'none',
      whiteSpace: 'nowrap',

      ...((isSelected || isDisabled) && { cursor: 'default' }),
      ...(isDisabled && { opacity: 0.5 }),

      '&:focus': { outline: 'none' },

      ...variants[variant]
    }
  }
}

export default generateStyle
