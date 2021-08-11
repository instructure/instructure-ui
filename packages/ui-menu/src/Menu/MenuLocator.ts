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
import { parseQueryArguments } from '@instructure/ui-test-queries'

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@ins... Remove this comment to see the full error message
// eslint-disable-next-line no-restricted-imports
import { PopoverLocator } from '@instructure/ui-popover/es/Popover/PopoverLocator'

import { Menu } from './index'

import { MenuItemLocator } from './MenuItem/MenuItemLocator'
import { MenuItemGroupLocator } from './MenuItemGroup/MenuItemGroupLocator'

const customMethods = {
  findAllItems: (...args: any[]) => {
    return MenuItemLocator.findAll(...args)
  },
  findItem: (...args: any[]) => {
    return MenuItemLocator.find(...args)
  },
  findAllGroups: (...args: any[]) => {
    return MenuItemGroupLocator.findAll(...args)
  },
  findGroup: (...args: any[]) => {
    return MenuItemGroupLocator.find(...args)
  },
  findPopoverTrigger: (...args: any[]) => {
    return PopoverLocator.findTrigger(...args)
  },
  findPopoverContent: (...args: any[]) => {
    const { element, selector, options } = parseQueryArguments(...args)
    return PopoverLocator.findContent(element, selector, {
      ...options,
      customMethods: {
        ...options.customMethods,
        ...customMethods
      }
    })
  }
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'selector' does not exist on type 'typeof... Remove this comment to see the full error message
const MenuLocator = locator(Menu.selector, customMethods)

export { MenuLocator, MenuItemLocator, MenuItemGroupLocator }
