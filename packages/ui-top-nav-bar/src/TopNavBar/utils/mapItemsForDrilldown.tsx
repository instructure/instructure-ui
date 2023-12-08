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

import React, { Children } from 'react'

import { warn } from '@instructure/console'
import { generateId } from '@instructure/ui-utils'
import {
  matchComponentTypes,
  generateInstanceCounterMap
} from '@instructure/ui-react-utils'

import { Drilldown } from '@instructure/ui-drilldown'
import type {
  DrilldownPageChild,
  DrilldownOptionChild,
  DrilldownOptionProps
} from '@instructure/ui-drilldown'

import { TopNavBarItem } from '../TopNavBarItem'
import type { ItemChild, TopNavBarItemProps } from '../TopNavBarItem/props'

type ItemMappedForDrilldownOption = {
  item: ItemChild
  optionData: DrilldownOptionProps
  submenuPages?: DrilldownPageChild[]
}

type RenderOptionContent = (
  children: React.ReactNode,
  itemProps: TopNavBarItemProps
) => React.ReactNode

const mapItemsForDrilldown = (
  itemList?: ItemChild | ItemChild[],
  options: {
    currentPageId?: string
    renderOptionContent?: RenderOptionContent
  } = {}
) => {
  const submenus: ItemMappedForDrilldownOption[] = []
  const { currentPageId, renderOptionContent } = options

  const customPopoverIdMap = generateInstanceCounterMap()

  Children.forEach(itemList, (item) => {
    if (!item || !matchComponentTypes(item, [TopNavBarItem])) return

    const {
      renderSubmenu,
      customPopoverConfig,
      id,
      children,
      status,
      variant,
      href,
      onClick,
      shouldCloseOnClick
    } = item.props

    let submenu: TopNavBarItemProps['renderSubmenu'] = renderSubmenu
    let customPopover: TopNavBarItemProps['customPopoverConfig'] =
      customPopoverConfig
    let customPopoverId: string | undefined
    let optionSubPageId: string | undefined

    const submenuPages: DrilldownPageChild[] = []

    if (submenu) {
      if (!matchComponentTypes(submenu, [Drilldown])) {
        warn(
          false,
          `The "renderSubmenu" prop accepts only Drilldown components, but the item with id "${id}" received: "${renderSubmenu}".`
        )

        submenu = undefined
      }

      // if still has submenu...
      if (submenu) {
        optionSubPageId = submenu.props.rootPageId
        submenuPages.push(
          ...(Children.toArray(submenu.props.children) as DrilldownPageChild[])
        )
      }
    }

    if (customPopover) {
      if (!customPopover.children) {
        warn(
          false,
          `Pass the content of the custom Popover as "customPopoverConfig.children" for the item with id: "${id}".`
        )

        customPopover = undefined
      }

      if (submenu) {
        warn(
          false,
          `TopNavBar.Items are not allowed to have both the "renderSubmenu" and "customPopoverConfig" props. For submenus, pass a Drilldown component via the "renderSubmenu" prop, and only use "customPopoverConfig" for custom features. Item with id: "${id}" will ignore the "customPopoverConfig" prop.`
        )

        customPopover = undefined
      }

      // if still has customPopover...
      if (customPopover) {
        customPopoverId = generateId(
          `TopNavBarItem__customPopoverOption`,
          customPopoverIdMap
        )
        optionSubPageId = customPopoverId
        submenuPages.push(
          <Drilldown.Page id={customPopoverId} key={customPopoverId}>
            <Drilldown.Option id={`${customPopoverId}__option`}>
              {customPopover.children}
            </Drilldown.Option>
          </Drilldown.Page>
        )
      }
    }

    let ariaCurrent =
      item.props['aria-current'] || (id === currentPageId ? 'page' : undefined)

    if (ariaCurrent) {
      if (variant !== 'default') {
        warn(
          false,
          `Only \`variant="default"\` items can be set to current/active, but the item with id "${id}" is "${variant}" variant.`
        )

        ariaCurrent = undefined
      }

      if (status === 'disabled') {
        warn(
          false,
          `Disabled items can not be set to current/active, but the item with id "${id}" is disabled.`
        )

        ariaCurrent = undefined
      }
    }

    submenus.push({
      item,
      submenuPages,
      optionData: {
        id,
        disabled: status === 'disabled',
        href,
        onOptionClick: (event) => {
          onClick?.(event as any)
        },
        children:
          typeof renderOptionContent === 'function'
            ? renderOptionContent(children, {
                ...item.props,
                status: ariaCurrent === 'page' ? 'active' : item.props.status
              })
            : children,
        subPageId: optionSubPageId,
        'aria-current': ariaCurrent,
        shouldCloseOnClick: shouldCloseOnClick
      }
    })
  })

  return submenus
}

const renderMappedItemDrilldownSubpages = (
  mappedItems: ItemMappedForDrilldownOption[]
) => {
  const subPages = mappedItems
    .map((option) => option.submenuPages)
    .filter((submenu) => !!submenu) as DrilldownPageChild[][]

  return subPages.flat()
}

const renderMappedItemsAsDrilldownOptions = (
  mappedItems: ItemMappedForDrilldownOption[]
) => {
  return mappedItems.map<DrilldownOptionChild>((mappedItem) => {
    const { optionData } = mappedItem

    return (
      <Drilldown.Option
        {...optionData}
        key={optionData.id}
        afterLabelContentVAlign="center"
      >
        {optionData.children}
      </Drilldown.Option>
    )
  })
}

export default mapItemsForDrilldown
export {
  mapItemsForDrilldown,
  renderMappedItemDrilldownSubpages,
  renderMappedItemsAsDrilldownOptions
}

export type { ItemMappedForDrilldownOption, RenderOptionContent }
