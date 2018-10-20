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
import {
  locator,
  findAllByQuery,
  querySelectorAll,
  firstOrNull,
  parseQueryArguments,
  mergeCSSIntoSelector
} from '@instructure/ui-test-utils'

import Menu from './index'

import MenuItem from './MenuItem/locator'
import MenuItemGroup from './MenuItemGroup/locator'

const customMethods = {
  findAllItems: async (...args) => {
    return MenuItem.findAll(...args)
  },
  findItem: async (...args) => {
    return MenuItem.find(...args)
  },
  findAllGroups: async (...args) => {
    return MenuItemGroup.findAll(...args)
  },
  findGroup: async (...args) => {
    return MenuItemGroup.find(...args)
  }
}

const MenuFixture = locator(Menu.displayName, customMethods)

MenuFixture.findAllMenus = async (...args) => {
  const { element, selector, options } = parseQueryArguments(...args)

  const query = (element, selector, options) => {

    // this gets all of the menus rendered in place...
    const menus = MenuFixture.query(element, mergeCSSIntoSelector('[role="menu"]', selector), options)

    // there are likely menus rendered in portals,
    // so we get them via their triggers...
    const triggers = MenuFixture.query(element, { css: '[aria-haspopup]' }, options)

    return triggers.reduce((menus, trigger) => {
      const matches = querySelectorAll(
        element,
        mergeCSSIntoSelector(`[role="menu"][aria-labelledby="${trigger.getId()}"]`, selector),
        options
      )
      return [...menus, ...matches]
    }, menus)
  }

  return findAllByQuery(query, element, selector, {
    ...options,
    customMethods: {
      ...options.customMethods,
      ...customMethods
    }
  })
}

MenuFixture.findMenu = async (...args) => {
  return firstOrNull(await MenuFixture.findAllMenus(...args))
}

export default MenuFixture

export { default as MenuItem } from './MenuItem/locator'
export { default as MenuItemGroup } from './MenuItemGroup/locator'
