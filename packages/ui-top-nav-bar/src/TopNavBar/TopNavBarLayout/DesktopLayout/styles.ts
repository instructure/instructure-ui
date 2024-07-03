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

import type { TopNavBarLayoutDesktopTheme } from '@instructure/shared-types'
import type {
  TopNavBarDesktopLayoutProps,
  TopNavBarDesktopLayoutStyleProps,
  TopNavBarDesktopLayoutStyle
} from './props'

/**
 * ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param  {Object} componentTheme The theme variable object.
 * @param  {Object} _props the props of the component, the style is applied to
 * @param  {Object} state the state of the component, the style is applied to
 * @return {Object} The final style object, which will be used in the component
 */
const generateStyle = (
  componentTheme: TopNavBarLayoutDesktopTheme,
  _props: TopNavBarDesktopLayoutProps,
  state: TopNavBarDesktopLayoutStyleProps
): TopNavBarDesktopLayoutStyle => {
  const { inverseColor, hasBrandBlock, hasActionItemsBlock, hasUserBlock } =
    state

  const hasUserSeparator = hasActionItemsBlock && hasUserBlock

  return {
    topNavBarDesktopLayout: {
      label: 'topNavBarDesktopLayout',
      flowMode: 'logical',
      fontSize: componentTheme.desktopFontSize,
      fontFamily: componentTheme.desktopFontFamily,
      fontWeight: componentTheme.desktopFontWeight,
      background: inverseColor
        ? componentTheme.desktopBackgroundInverse
        : componentTheme.desktopBackground,
      borderBlockEnd: inverseColor
        ? componentTheme.desktopBottomBorderInverse
        : componentTheme.desktopBottomBorder,
      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'space-between',
      height: componentTheme.desktopHeight,
      position: 'relative',
      zIndex: componentTheme.desktopZIndex,
      maxWidth: '100%',
      overflow: 'hidden',
      paddingInline: componentTheme.desktopInlinePadding,
      paddingBlock: 0,
      ...(hasBrandBlock && {
        paddingInlineStart: 0
      })
    },
    brandContainer: {
      label: 'topNavBarDesktopLayout__brandContainer',
      display: 'flex',
      flexGrow: 0,
      flexShrink: 0,
      marginBlock: 0,
      marginInline: componentTheme.desktopBrandContainerInlineMargin
    },
    menuItemsContainer: {
      label: 'topNavBarDesktopLayout__menuItemsContainer',
      display: 'flex',
      flexGrow: 1,
      flexShrink: 1,
      marginBlock: 0,
      marginInline: componentTheme.desktopMenuItemsContainerInlineMargin,
      overflow: 'hidden'
    },
    actionItemsContainer: {
      label: 'topNavBarDesktopLayout__actionItemsContainer',
      display: 'flex',
      flexGrow: 0,
      flexShrink: 0,
      marginBlock: 0,
      marginInline: componentTheme.desktopActionItemsContainerInlineMargin
    },
    spacer: {
      flexGrow: '1'
    },
    userContainer: {
      label: 'topNavBarDesktopLayout__userContainer',
      display: 'flex',
      flexGrow: 0,
      flexShrink: 0,
      marginBlock: 0,
      marginInline: componentTheme.desktopUserContainerInlineMargin,

      ...(hasUserSeparator && {
        position: 'relative',
        paddingInlineStart: componentTheme.desktopUserSeparatorGap,

        '&::before': {
          content: '""',
          position: 'absolute',
          insetInlineStart: 0,
          insetBlockStart: '50%',
          marginBlockStart: `calc(-${componentTheme.desktopUserSeparatorHeight} / 2)`,

          height: componentTheme.desktopUserSeparatorHeight,
          width: componentTheme.desktopUserSeparatorWidth,
          background: inverseColor
            ? componentTheme.desktopUserSeparatorColorInverse
            : componentTheme.desktopUserSeparatorColor,
          display: 'block'
        }
      })
    },
    breadcrumbContainer: {
      label: 'topNavBarDesktopLayout__breadcrumbContainer',
      display: 'flex',
      flexGrow: 0,
      flexShrink: 0,
      marginBlock: 0,
      alignItems: 'center'
    }
  }
}

export default generateStyle
