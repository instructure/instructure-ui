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

import { locator } from '@instructure/ui-test-locator'
import { find } from '@instructure/ui-test-utils'

/* eslint-disable no-restricted-imports */
// @ts-expect-error bypass no type definition found error
import { DrilldownLocator } from '@instructure/ui-drilldown/es/Drilldown/DrilldownLocator'
// @ts-expect-error bypass no type definition found error
import { TrayLocator } from '@instructure/ui-tray/es/Tray/TrayLocator'
// @ts-expect-error bypass no type definition found error
import { TruncateListLocator } from '@instructure/ui-truncate-list/es/TruncateList/TruncateListLocator'
/* eslint-enable no-restricted-imports */

import { TopNavBarItemLocator } from '../../TopNavBarItem/TopNavBarItemLocator'
import { TopNavBarBrandLocator } from '../../TopNavBarBrand/TopNavBarBrandLocator'
import { TopNavBarActionItemsLocator } from '../../TopNavBarActionItems/TopNavBarActionItemsLocator'

import { TopNavBarSmallViewportLayout } from './index'

export const TopNavBarSmallViewportLayoutLocator = locator(
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'selector' does not exist on type 'typeof... Remove this comment to see the full error message
  TopNavBarSmallViewportLayout.selector,
  {
    findNavBar: (...args: any[]) => {
      return find('[class$=-topNavBarSmallViewportLayout__navbar]', ...args)
    },
    findDropdownMenuTriggerWrapper: (...args: any[]) => {
      return find(
        '[class*=-topNavBarSmallViewportLayout__menuTrigger]',
        ...args
      )
    },
    findAlternativeTitleContainer: (...args: any[]) => {
      return find(
        '[class*=-topNavBarSmallViewportLayout__alternativeTitleContainer]',
        ...args
      )
    },
    findDropdownMenuTriggerItem: async (...args: any[]) => {
      const triggerExists = await find(
        '[id^=TopNavBarSmallViewportLayout-menuTrigger_]',
        ...args
      )

      if (triggerExists) {
        return TopNavBarItemLocator.find(
          '[id^=TopNavBarSmallViewportLayout-menuTrigger_]'
        )
      } else {
        return triggerExists
      }
    },
    findDropdownMenuTriggerButton: async (...args: any[]) => {
      const triggerExists = await find(
        '[id^=TopNavBarSmallViewportLayout-menuTrigger_]',
        ...args
      )

      if (triggerExists) {
        const menuItem = await TopNavBarItemLocator.find(
          '[id^=TopNavBarSmallViewportLayout-menuTrigger_]'
        )
        return menuItem.findButton()
      } else {
        return triggerExists
      }
    },
    findBrandContainer: (...args: any[]) => {
      return find(
        '[class$=-topNavBarSmallViewportLayout__brandContainer]',
        ...args
      )
    },
    findBrand: (...args: any[]) => {
      return TopNavBarBrandLocator.find(...args)
    },
    findActionItems: (...args: any[]) => {
      return TopNavBarActionItemsLocator.find(...args)
    },
    findTruncateList: (...args: any[]) => {
      return TruncateListLocator.find(...args)
    },
    findDropdownMenuTray: (...args: any[]) => {
      return TrayLocator.find(...args)
    },
    findDropdownMenu: (...args: any[]) => {
      return DrilldownLocator.find(...args)
    },
    findInPlaceDialog: (...args: any[]) => {
      return find(
        '[class$=-topNavBarSmallViewportLayout__inPlaceDialogContainer]',
        ...args
      )
    },
    findInPlaceDialogCloseButton: (...args: any[]) => {
      return find(
        '[id^=TopNavBarSmallViewportLayout-inPlaceDialogCloseButton_]',
        ...args
      )
    }
  }
)
