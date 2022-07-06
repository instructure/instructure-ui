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
import { find } from '@instructure/ui-test-queries'

/* eslint-disable no-restricted-imports */
// @ts-expect-error bypass no type definition found error
import { DrilldownLocator } from '@instructure/ui-drilldown/es/Drilldown/DrilldownLocator'
// @ts-expect-error bypass no type definition found error
import { TooltipLocator } from '@instructure/ui-tooltip/es/Tooltip/TooltipLocator'
// @ts-expect-error bypass no type definition found error
import { PopoverLocator } from '@instructure/ui-popover/es/Popover/PopoverLocator'
/* eslint-enable no-restricted-imports */

import { ColorIndicatorLocator } from '../ColorIndicator/ColorIndicatorLocator'

import { ColorPreset } from './index'

// @ts-expect-error ts-migrate(2339) FIXME: Property 'selector' does not exist on type 'typeof... Remove this comment to see the full error message
export const ColorPresetLocator = locator(ColorPreset.selector, {
  findAllColorIndicators: (...args: any[]) => {
    return ColorIndicatorLocator.findAll(...args)
  },
  findAllColorTooltips: (...args: any[]) => {
    return TooltipLocator.findAll(...args)
  },
  findAllColorMenus: (...args: any[]) => {
    return DrilldownLocator.findAll(...args)
  },
  findSelectedIndicator: async (...args: any[]) => {
    const selected = await find('[aria-label="selected"]', ...args)

    if (!selected) {
      return selected
    }

    return await ColorIndicatorLocator.find(selected.getDOMNode())
  },
  findSelectedIcon: (...args: any[]) => {
    return find('[class$=-colorPreset__selectedIndicator]', ...args)
  },
  findAddColorPopoverContent: (...args: any[]) => {
    return PopoverLocator.findContent(...args)
  },
  getMenuForIndex: async (_element: any, index: number) => {
    const component = await ColorPresetLocator.find()
    const indicators = await component.findAllColorIndicators()
    const menus = await component.findAllColorMenus()

    await indicators[index].click()

    return await menus[index].findPopoverContent()
  }
})
