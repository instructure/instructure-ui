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
import { find, parseQueryArguments } from '@instructure/ui-test-queries'

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@ins... Remove this comment to see the full error message
// eslint-disable-next-line no-restricted-imports
import { TooltipLocator } from '@instructure/ui-tooltip/es/Tooltip/TooltipLocator'

import { ToggleButton } from './index'

// @ts-expect-error ts-migrate(2339) FIXME: Property 'selector' does not exist on type 'typeof... Remove this comment to see the full error message
export const ToggleButtonLocator = locator(ToggleButton.selector, {
  // @ts-expect-error ts-migrate(7019) FIXME: Rest parameter 'args' implicitly has an 'any[]' ty... Remove this comment to see the full error message
  findTooltipContent: async (...args) => {
    const { element, selector, options } = parseQueryArguments(...args)
    const tooltip = await TooltipLocator.find(element, options)
    return tooltip ? tooltip.findContent(selector, options) : null
  },
  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'element' implicitly has an 'any' type.
  click: async (element, ...args) => {
    return (await find(element, 'a,button,[role="button"]')).click(...args)
  }
})
