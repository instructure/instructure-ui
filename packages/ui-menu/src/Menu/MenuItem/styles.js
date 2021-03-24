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
  const { type, disabled } = props

  const isRadioOrCheckbox = type === 'checkbox' || type === 'radio'

  const flyoutIconStyles =
    type === 'flyout'
      ? {
          insetInlineStart: 'auto',
          insetInlineEnd: componentTheme.iconPadding
        }
      : {}

  const roleStyles = isRadioOrCheckbox
    ? {
        paddingInlineStart: componentTheme.labelPadding
      }
    : {}

  const roleIconStyles = isRadioOrCheckbox
    ? {
        insetInlineStart: componentTheme.iconPadding,
        insetInlineEnd: 'auto'
      }
    : {}

  const disabledStyles = disabled
    ? {
        cursor: 'not-allowed',
        pointerEvents: 'none',
        opacity: 0.5
      }
    : {}

  const linkStyles = { textDecoration: 'none' }

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
      // Changing the following to display: flex; causes a VO
      // bug where items with role menuitem, menuitemcheckbox
      // and menuitemradio are selected twice with control+
      // option+space. So we set the display to block.
      display: 'block',
      textDecoration: 'none',
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
      //removes extra ff button spacing
      '&::-moz-focus-inner': {
        padding: '0',
        margin: '0',
        border: '0'
      },
      ...disabledStyles,

      // NOTE: needs separate groups for `:is()` and `:-webkit-any()` because of css selector group validation (see https://www.w3.org/TR/selectors-3/#grouping)
      '&:is(a)': {
        '&, &:link, &:visited, &:active, &:hover, &:focus': linkStyles
      },
      '&:-webkit-any(a)': {
        '&, &:link, &:visited, &:active, &:hover, &:focus': linkStyles
      }
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
      ...roleIconStyles,
      ...flyoutIconStyles
    },
    label: {
      label: 'menuItem__label',
      color: componentTheme.labelColor
    }
  }
}

export default generateStyle
