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

import { calcFocusOutlineStyles } from '@instructure/emotion'
import type { NewComponentTypes, SharedTokens } from '@instructure/ui-themes'
import type { MainNavItemStyle } from './props.js'

type StyleParams = {
  collapsed: boolean
  current: boolean
  open: boolean
  isLegacy: boolean
}

/**
 * ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param componentTheme The theme variable object.
 * @param params Additional parameters to customize the style.
 * @return The final style object, which will be used in the component
 */
const generateStyle = (
  componentTheme: ReturnType<NewComponentTypes['MainNavItem']>,
  params: StyleParams,
  sharedTokens: SharedTokens
): MainNavItemStyle => {
  const { collapsed, current, open, isLegacy } = params

  return {
    item: {
      label: 'mainNavItem',
      display: 'flex',
      alignItems: 'center',
      // MainNavItem has no gap token
      gap: componentTheme.horizontalPadding,
      boxSizing: 'border-box',
      width: collapsed ? componentTheme.minimizedItemSize : '100%',
      height: collapsed ? componentTheme.minimizedItemSize : undefined,
      justifyContent: collapsed ? 'center' : undefined,
      margin: 0,
      padding: collapsed
        ? 0
        : `${componentTheme.verticalPadding} ${componentTheme.horizontalPadding}`,
      border: 'none',
      borderRadius: componentTheme.borderRadius,
      backgroundColor: current
        ? componentTheme.currentBackgroundColor
        : open
        ? componentTheme.activeBackgroundColor
        : componentTheme.backgroundColor,
      color: current
        ? componentTheme.currentTextColor
        : componentTheme.fontColor,
      fontFamily: componentTheme.fontFamily,
      fontSize: componentTheme.fontSize,
      fontWeight: componentTheme.fontWeight,
      lineHeight: componentTheme.lineHeight,
      textAlign: 'start',
      textDecoration: componentTheme.linkTextDecoration,
      cursor: 'pointer',
      '&:hover': {
        // a page-wide a:hover rule is more specific than the base class
        textDecoration: componentTheme.linkTextDecoration,
        ...(!current &&
          !open && { backgroundColor: componentTheme.hoverBackgroundColor })
      },
      ...(!current &&
        !open && {
          '&:active': {
            backgroundColor: componentTheme.activeBackgroundColor
          }
        }),
      // in the Canvas theme the focus ring in inset and has inverse color
      // when not selected
      ...(current
        ? calcFocusOutlineStyles(sharedTokens.focusOutline, {
            //innerColor: componentTheme.selectedInnerFocusOutlineColor, TODO not needed, delete
            focusColor: 'info',
            focusPosition: isLegacy ? 'inset' : 'offset'
          })
        : calcFocusOutlineStyles(sharedTokens.focusOutline, {
            //innerColor: componentTheme.innerFocusOutlineColor, TODO not needed, delete
            focusColor: isLegacy ? 'inverse' : 'info',
            focusPosition: isLegacy ? 'inset' : 'offset'
          }))
    },
    icon: {
      label: 'mainNavItem__icon',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      flexShrink: 0,
      height: componentTheme.iconWrapperHeight
    },
    badge: {
      label: 'mainNavItem__badge',
      position: 'absolute',
      top: 0,
      // the badge starts at the icon's center, so a longer count grows away from the icon
      insetInlineStart: '50%',
      // flex, so the item's line height doesn't push the badge down
      display: 'flex'
    },
    label: {
      label: 'mainNavItem__label',
      flex: 1
    },
    chevron: {
      label: 'mainNavItem__chevron',
      display: 'flex',
      flexShrink: 0
    },
    tooltipTrigger: {
      label: 'mainNavItem__tooltipTrigger',
      display: 'block'
    }
  }
}

export default generateStyle
