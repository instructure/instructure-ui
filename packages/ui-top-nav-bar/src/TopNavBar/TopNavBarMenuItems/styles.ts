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

import type { TopNavBarMenuItemsTheme } from '@instructure/shared-types'
import type { TopNavBarMenuItemsStyle } from './props'

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
  componentTheme: TopNavBarMenuItemsTheme
): TopNavBarMenuItemsStyle => {
  const submenuOptionStyle = {
    display: 'inline-block',
    padding: `0 ${componentTheme.desktopSubmenuActiveOptionIndicatorSpacing}`
  }

  return {
    topNavBarMenuItems: {
      label: 'topNavBarMenuItems',
      flex: '1 1',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch',
      // padding to prevent focus ring getting cropped by `overflow: hidden`
      padding: '0 0.125rem',
      overflow: 'visible'
    },
    submenuOption: {
      label: 'topNavBarMenuItems__submenuOption',
      ...submenuOptionStyle
    },
    submenuOptionActive: {
      label: 'topNavBarMenuItems__submenuOptionActive',
      ...submenuOptionStyle,
      fontWeight: componentTheme.desktopSubmenuActiveOptionFontWeight,
      paddingBlockEnd:
        componentTheme.desktopSubmenuActiveOptionIndicatorSpacing,
      borderBottom: `${componentTheme.desktopSubmenuActiveOptionIndicatorWidth} solid ${componentTheme.desktopSubmenuActiveOptionIndicatorColor}`
    },
    itemSpacing: componentTheme.desktopItemSpacing
  }
}

export default generateStyle
