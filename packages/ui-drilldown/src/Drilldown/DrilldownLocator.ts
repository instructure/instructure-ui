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
import { find, findAll, parseQueryArguments } from '@instructure/ui-test-utils'

/* eslint-disable no-restricted-imports */
// @ts-expect-error bypass no type definition found error
import { OptionsItemLocator } from '@instructure/ui-options/es/Options/Item/OptionsItemLocator'
// @ts-expect-error bypass no type definition found error
import { PopoverLocator } from '@instructure/ui-popover/es/Popover/PopoverLocator'
/* eslint-enable no-restricted-imports */

import { Drilldown } from './index'

const customMethods = {
  // return the wrapper Option.Items
  findAllOptions: async (...args: any[]) => {
    return await findAll(
      '[class$=-optionItem__container]:not([role="presentation"])',
      ...args
    )
  },
  findAllOptionWrappers: async (...args: any[]) => {
    return await OptionsItemLocator.findAll(...args)
  },
  findOptionWrapperByOptionId: async (
    _element: any,
    optionId: string,
    ...args: any[]
  ) => {
    return OptionsItemLocator.find(`:has(#${optionId})`, ...args)
  },
  findSizableContainer: async (...args: any[]) => {
    return await find('[class$=-drilldown__container]', ...args)
  },
  findSelectableContainer: async (...args: any[]) => {
    return await find('[id^=Selectable_][id$=-list]', ...args)
  },
  findHeaderTitle: async (...args: any[]) => {
    return await find('[id^=DrilldownHeader-Title]', ...args)
  },
  findHeaderActionOption: async (...args: any[]) => {
    return await find('[id^=DrilldownHeader-Action]', ...args)
  },
  findHeaderBackOption: async (...args: any[]) => {
    return await find('[id^=DrilldownHeader-Back]', ...args)
  },
  findHeaderSeparator: async (...args: any[]) => {
    return await find('[id^=DrilldownHeader-Separator]', ...args)
  },
  findAllSeparators: async (...args: any[]) => {
    return await findAll('[class$=-separator]', ...args)
  },
  findAllGroupLabels: async (...args: any[]) => {
    return await findAll('[class$=-options__label]', ...args)
  },
  findLabelInfo: async (...args: any[]) => {
    return await find('[class$=-drilldown__optionLabelInfo]', ...args)
  },
  findDescription: async (...args: any[]) => {
    return await find('[class$=__description]', ...args)
  },
  findPopoverRoot: (...args: any[]) => {
    return PopoverLocator.find(...args)
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
export const DrilldownLocator = locator(Drilldown.selector, customMethods)
