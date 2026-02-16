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

import type { TopNavBarLayoutSmallViewportTheme } from '@instructure/shared-types'
import type {
  TopNavBarSmallViewportLayoutProps,
  TopNavBarSmallViewportLayoutStyleProps,
  TopNavBarSmallViewportLayoutStyle
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
  componentTheme: TopNavBarLayoutSmallViewportTheme,
  _props: TopNavBarSmallViewportLayoutProps,
  state: TopNavBarSmallViewportLayoutStyleProps
): TopNavBarSmallViewportLayoutStyle => {
  const {
    isDropdownMenuVisible,
    drilldownId,
    trayId,
    menuBottomPosition,
    inverseColor
  } = state

  const dropdownMenuTopPosition =
    componentTheme.smallViewportTrayFixTopPosition || `${menuBottomPosition}px`

  const dropdownMenuOptionStyle = {
    display: 'inline-block',
    padding: `0 ${componentTheme.smallViewportDropdownMenuActiveOptionIndicatorSpacing}`
  }

  const navBarStyles = {
    fontSize: componentTheme.smallViewportFontSize,
    fontFamily: componentTheme.smallViewportFontFamily,
    fontWeight: componentTheme.smallViewportFontWeight,
    background: inverseColor
      ? componentTheme.smallViewportBackgroundInverse
      : componentTheme.smallViewportBackground,
    borderBlockEnd: inverseColor
      ? componentTheme.smallViewportBottomBorderInverse
      : componentTheme.smallViewportBottomBorder,
    height: componentTheme.smallViewportHeight,
    maxWidth: '100%',
    paddingBlock: 0,
    paddingInline: componentTheme.smallViewportInlinePadding,
    zIndex: componentTheme.smallViewportZIndex,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    overflow: 'hidden'
  }

  return {
    topNavBarSmallViewportLayout: {
      label: 'topNavBarSmallViewportLayout'
    },
    navbar: {
      label: 'topNavBarSmallViewportLayout__navbar',
      ...navBarStyles
    },
    inPlaceDialogContainer: {
      label: 'topNavBarSmallViewportLayout__inPlaceDialogContainer',
      ...navBarStyles,
      alignItems: 'center'
    },
    inPlaceDialogContainerContent: {
      label: 'topNavBarSmallViewportLayout__inPlaceDialogContainerContent',
      flex: '1 1'
    },
    inPlaceDialogContainerButton: {
      label: 'topNavBarSmallViewportLayout__inPlaceDialogContainerButton',
      flex: '0 0'
    },
    menuTriggerContainer: {
      label: 'topNavBarSmallViewportLayout__menuTriggerContainer',
      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      flex: '1 1'
    },
    menuTrigger: {
      label: 'topNavBarSmallViewportLayout__menuTrigger',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    alternativeTitleContainer: {
      label: 'topNavBarSmallViewportLayout__alternativeTitleContainer',
      marginBlock: componentTheme.smallViewportAlternativeTitleBlockMargin,
      marginInline: componentTheme.smallViewportAlternativeTitleInlineMargin
    },
    dropdownMenuOption: {
      label: 'topNavBarSmallViewportLayout__dropdownMenuOption',
      ...dropdownMenuOptionStyle
    },
    dropdownMenuOptionActive: {
      label: 'topNavBarSmallViewportLayout__dropdownMenuOptionActive',
      ...dropdownMenuOptionStyle,
      fontWeight:
        componentTheme.smallViewportDropdownMenuActiveOptionFontWeight,
      paddingBlockEnd:
        componentTheme.smallViewportDropdownMenuActiveOptionIndicatorSpacing,
      borderBottom: `${componentTheme.smallViewportDropdownMenuActiveOptionIndicatorWidth} solid ${componentTheme.smallViewportDropdownMenuActiveOptionIndicatorColor}`
    },
    dropdownMenuOptionWithAvatar: {
      label: 'topNavBarSmallViewportLayout__dropdownMenuOptionWithAvatar',
      ...dropdownMenuOptionStyle,
      display: 'flex',
      alignItems: 'center'
    },
    brandContainer: {
      label: 'topNavBarSmallViewportLayout__brandContainer',
      display: 'flex',
      alignItems: 'stretch'
    },
    trayContainer: {
      label: 'topNavBarSmallViewportLayout__trayContainer',
      width: '100%',
      position: componentTheme.smallViewportTrayPosition,
      insetBlockStart: dropdownMenuTopPosition,
      insetInlineStart: '0px',
      zIndex: componentTheme.smallViewportTrayZIndex,

      ...(isDropdownMenuVisible && {
        height: `calc(100% - ${dropdownMenuTopPosition})`
      })
    },
    globalStyles: {
      // the tray should all have 100% height
      [`#${trayId}`]: {
        height: '100%'
      },
      // removes the focus ring on the drilldown,
      // not needed on the mobile menu
      [`#${drilldownId}`]: {
        height: '100%',

        '&::before': {
          // display: 'none'
          top: '4px',
          left: '4px',
          right: '4px',
          bottom: '4px',
          zIndex: 1
        }
      }
    },
    navbarHeight: componentTheme.smallViewportHeight
  }
}

export default generateStyle
