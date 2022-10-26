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

/* eslint-disable no-restricted-imports */
// @ts-expect-error bypass no type definition found error
import { BaseButtonLocator } from '@instructure/ui-buttons/es/BaseButton/BaseButtonLocator'
// @ts-expect-error bypass no type definition found error
import { TooltipLocator } from '@instructure/ui-tooltip/es/Tooltip/TooltipLocator'
// @ts-expect-error bypass no type definition found error
import { AvatarLocator } from '@instructure/ui-avatar/es/Avatar/AvatarLocator'
// @ts-expect-error bypass no type definition found error
import { DrilldownLocator } from '@instructure/ui-drilldown/es/Drilldown/DrilldownLocator'
// @ts-expect-error bypass no type definition found error
import { PopoverLocator } from '@instructure/ui-popover/es/Popover/PopoverLocator'
/* eslint-enable no-restricted-imports */

import { TopNavBarItem } from './index'

// @ts-expect-error ts-migrate(2339) FIXME: Property 'selector' does not exist on type 'typeof... Remove this comment to see the full error message
export const TopNavBarItemLocator = locator(TopNavBarItem.selector, {
  findButton: (...args: any[]) => {
    return BaseButtonLocator.find(...args)
  },
  getButtonBackground: async () => {
    const buttonContent = await find('[class$="-baseButton__content"]')
    return buttonContent
      ? getComputedStyle(buttonContent.getDOMNode()).backgroundColor
      : undefined
  },
  getButtonBorder: async () => {
    const buttonContent = await find('[class$="-baseButton__content"]')
    return buttonContent
      ? getComputedStyle(buttonContent.getDOMNode()).border
      : undefined
  },
  getButtonOpacity: async () => {
    const buttonContent = await find('[class$="-baseButton__content"]')
    return buttonContent
      ? getComputedStyle(buttonContent.getDOMNode()).opacity
      : undefined
  },
  getFocusRingColor: async () => {
    const buttonContent = await find('[class$="-baseButton"]')
    return buttonContent
      ? getComputedStyle(buttonContent.getDOMNode(), '::before').borderColor
      : undefined
  },
  getActiveIndicatorStyle: async () => {
    const container = await find('[class$="-topNavBarItem__container"]')
    return getComputedStyle(container.getDOMNode(), '::after')
  },
  findContent: (...args: any[]) => {
    return find('[class$="-topNavBarItem__content"]', ...args)
  },
  findSubmenu: (...args: any[]) => {
    return DrilldownLocator.find(...args)
  },
  findCustomPopover: async (...args: any[]) => {
    const popover = await PopoverLocator.find(...args)

    if (popover) {
      const isDrilldown = popover.getAttribute('data-cid').includes('Drilldown')
      return isDrilldown ? null : popover
    } else {
      return popover
    }
  },
  findTooltip: (...args: any[]) => {
    return TooltipLocator.find(...args)
  },
  findIcon: (...args: any[]) => {
    return find('[class*="-baseButton__icon"] [class$="-svgIcon"]', ...args)
  },
  findSubmenuChevron: (...args: any[]) => {
    return find(
      '[class$="-topNavBarItem__submenuIcon"] [class$="-svgIcon"]',
      ...args
    )
  },
  findAvatar: (...args: any[]) => {
    return AvatarLocator.find(...args)
  },
  findScreenReaderLabel: (...args: any[]) => {
    return find('[class$="-screenReaderContent"]', ...args)
  }
})
