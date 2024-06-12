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

import type { TopNavBarItemTheme } from '@instructure/shared-types'
import type {
  TopNavBarItemProps,
  TopNavBarItemStyleProps,
  TopNavBarItemStyle
} from './props'

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
  componentTheme: TopNavBarItemTheme,
  props: TopNavBarItemProps,
  state: TopNavBarItemStyleProps
): TopNavBarItemStyle => {
  const { status, variant, renderSubmenu, renderAvatar, customPopoverConfig } =
    props
  const { layout, inverseColor } = state

  const isSmallViewport = layout === 'smallViewport'
  const isActive = renderAvatar
    ? false
    : status === 'active' && variant === 'default'
  const hasPopover = renderSubmenu || customPopoverConfig

  const activeIndicatorPosition = `calc(${componentTheme.itemInlinePadding} - ${componentTheme.activeItemIndicatorSpacing})`

  return {
    topNavBarItem: {
      label: 'topNavBarItem',
      padding: `0 calc(${componentTheme.itemSpacing} / 2)`,
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: hasPopover ? 'stretch' : 'center'
    },
    container: {
      label: 'topNavBarItem__container',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',

      ...(isActive && {
        '&::after': {
          content: '""',
          position: 'absolute',
          insetBlockEnd: 0,
          insetInlineStart: activeIndicatorPosition,
          insetInlineEnd: activeIndicatorPosition,
          height: componentTheme.activeIndicatorWidth,
          background: inverseColor
            ? componentTheme.activeIndicatorColorInverse
            : componentTheme.activeIndicatorColor,
          display: 'block'
        }
      }),

      '& a': {
        textDecoration: 'none'
      }
    },
    content: {
      label: 'topNavBarItem__content',
      fontSize: componentTheme.fontSize,
      fontFamily: componentTheme.fontFamily,
      fontWeight: componentTheme.fontWeight,
      appearance: 'none',
      border: 0,
      outline: 0,
      margin: 0,
      textDecoration: 'none',
      whiteSpace: 'nowrap',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: inverseColor ? componentTheme.colorInverse : componentTheme.color,

      ...(isActive && {
        fontWeight: componentTheme.activeItemFontWeight,
        letterSpacing: -0.1818
      }),

      '*': {
        pointerEvents: 'none'
      }
    },
    avatarContainer: {
      label: 'topNavBarItem__avatarContainer',
      display: 'flex',
      alignItems: 'center',
      paddingInlineEnd: `calc(${componentTheme.iconTextGap} * 1.5)`
    },
    submenuTriggerContainer: {
      label: 'topNavBarItem__submenuTriggerContainer',
      height: '100%',
      display: 'flex',
      alignItems: 'center'
    },
    submenuIcon: {
      label: 'topNavBarItem__submenuIcon',
      fontSize: '0.875em',
      display: 'flex',
      alignItems: 'center',
      paddingInlineStart: componentTheme.iconTextGap
    },
    focusOutlineOffset: isSmallViewport ? '0.375rem' : '0.625rem',
    itemInlinePadding: componentTheme.itemInlinePadding
  }
}

export default generateStyle
