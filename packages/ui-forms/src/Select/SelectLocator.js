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

import { locator } from '@instructure/ui-test-utils'

import { PositionLocator } from '@instructure/ui-layout'

import { Select } from './index'

const InputLocator = locator('input[type="text"]')
const OptionsListLocator = locator('ul')
const OptionsLocator = locator('li')

export const customMethods = {
  findInput: (...args) => InputLocator.find(...args),
  findOptionsList: async (element, ...args) => {
    const content = await PositionLocator.findContent(element)
    return content ? OptionsListLocator.find(content.getDOMNode(), ...args) : null
  },
  findOption: async (element, ...args) => {
    const content = await PositionLocator.findContent(element)
    return content ? OptionsLocator.find(content.getDOMNode(), ...args) : null
  },
  findAllOptions: async (element, ...args) => {
    const content = await PositionLocator.findContent(element)
    return content ? OptionsLocator.findAll(content.getDOMNode(), ...args) : []
  }
}

export const SelectLocator = locator(Select.selector, customMethods)
