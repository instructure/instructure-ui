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
import { getComputedStyle } from '@instructure/ui-dom-utils'

import { TopNavBarBrandLocator } from '../../TopNavBarBrand/TopNavBarBrandLocator'
import { TopNavBarMenuItemsLocator } from '../../TopNavBarMenuItems/TopNavBarMenuItemsLocator'
import { TopNavBarActionItemsLocator } from '../../TopNavBarActionItems/TopNavBarActionItemsLocator'
import { TopNavBarUserLocator } from '../../TopNavBarUser/TopNavBarUserLocator'

import { TopNavBarDesktopLayout } from './index'

export const TopNavBarDesktopLayoutLocator = locator(
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'selector' does not exist on type 'typeof... Remove this comment to see the full error message
  TopNavBarDesktopLayout.selector,
  {
    findBrandContainer: (...args: any[]) => {
      return find('[class$=-topNavBarDesktopLayout__brandContainer]', ...args)
    },
    findMenuItemsContainer: (...args: any[]) => {
      return find(
        '[class$=-topNavBarDesktopLayout__menuItemsContainer]',
        ...args
      )
    },
    findActionItemsContainer: (...args: any[]) => {
      return find(
        '[class$=-topNavBarDesktopLayout__actionItemsContainer]',
        ...args
      )
    },
    findUserContainer: (...args: any[]) => {
      return find('[class$=-topNavBarDesktopLayout__userContainer]', ...args)
    },
    findBrand: (...args: any[]) => {
      return TopNavBarBrandLocator.find(...args)
    },
    findMenuItems: (...args: any[]) => {
      return TopNavBarMenuItemsLocator.find(...args)
    },
    findActionItems: (...args: any[]) => {
      return TopNavBarActionItemsLocator.find(...args)
    },
    findUser: (...args: any[]) => {
      return TopNavBarUserLocator.find(...args)
    },
    getActionsUserSeparatorBackground: async (...args: any[]) => {
      try {
        const user = await find(
          '[class$=-topNavBarDesktopLayout__userContainer]',
          ...args
        )
        return user
          ? getComputedStyle(user.getDOMNode(), '::before').backgroundColor
          : 'rgba(0, 0, 0, 0)'
      } catch {
        return 'rgba(0, 0, 0, 0)'
      }
    }
  }
)
