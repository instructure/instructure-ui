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
const generateStyle = (theme, themeOverride, props) => {
  const { type, disabled } = props
  const componentTheme = generateComponentTheme(theme, themeOverride)

  const isMenuitemradioOrMenuitemcheckbox =
    type === 'checkbox' || type === 'radio'

  const flyoutIconStyles =
    type === 'flyout'
      ? {
          insetInlineStart: 'auto',
          insetInlineEnd: componentTheme.iconPadding
        }
      : {}

  const roleStyles = isMenuitemradioOrMenuitemcheckbox
    ? {
        paddingInlineStart: componentTheme.labelPadding
      }
    : {}
  const roleIconStyles =
    type === 'flyout'
      ? {
          insetInlineStart: 'auto',
          insetInlineEnd: componentTheme.iconPadding
        }
      : {}
  const disabledStyles = disabled
    ? {
        cursor: 'not-allowed',
        pointerEvents: 'none',
        opacity: 0.5
      }
    : {}
  return {
    menuItem: {
      label: 'menuItem',
      position: 'relative',
      border: 'none',
      outline: 'none',
      padding: componentTheme.padding,
      margin: '0',
      width: '100%',
      borderRadius: 'initial',
      boxSizing: 'border-box',
      textAlign: 'start',
      cursor: 'pointer',
      userSelect: 'none',
      fontFamily: componentTheme.fontFamily,
      fontWeight: componentTheme.fontWeight,
      lineHeight: componentTheme.lineHeight,
      fontSize: componentTheme.fontSize,
      background: componentTheme.background,
      transition: 'background 0.2s',
      display: 'block',
      ...flyoutIconStyles,
      ...roleStyles,
      '&:focus,  &:active,  &:hover': {
        background: componentTheme.activeBackground,
        '[class*="menuItem__label"]': {
          color: componentTheme.activeLabelColor
        },
        '[class*="menuItem__icon"]': {
          color: componentTheme.activeIconColor
        }
      },
      '&::-moz-focus-inner': {
        padding: '0',
        margin: '0',
        border: '0'
      },
      textDecoration: 'none',
      ...disabledStyles
    },
    icon: {
      label: 'menuItem__icon',
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      top: '0',
      width: '1em',
      height: '100%',
      color: componentTheme.iconColor,
      ...roleIconStyles
    },
    label: {
      label: 'menuItem__label',
      color: componentTheme.labelColor
    }
  }
}

export default generateStyle
