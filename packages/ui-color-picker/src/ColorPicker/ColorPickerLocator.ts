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
import {
  find,
  findAll,
  parseQueryArguments,
  findWithText,
  within
} from '@instructure/ui-test-utils'

import { ColorPicker } from '.'

/* eslint-disable no-restricted-imports */
// @ts-ignore: Cannot find module
import { PopoverLocator } from '@instructure/ui-popover/es/Popover/PopoverLocator'
/* eslint-enable no-restricted-imports */

import { ColorIndicatorLocator } from '../ColorIndicator/ColorIndicatorLocator'
import { ColorMixerLocator } from '../ColorMixer/ColorMixerLocator'
import { ColorPresetLocator } from '../ColorPreset/ColorPresetLocator'

async function _findColorPreset(...args: any[]) {
  const popoverContent = await PopoverLocator.findContent(...args)
  const colorPreset = await ColorPresetLocator.find(popoverContent.getDOMNode())

  return ColorIndicatorLocator.findAll(colorPreset.getDOMNode())
}

const customMethods = {
  findTextInput: (...args: any[]) => {
    return find('[id^=TextInput_]', ...args)
  },
  findColorIndicator: (...args: any[]) => {
    return ColorIndicatorLocator.find(...args)
  },
  findInputAfterIcon: (...args: any[]) => {
    return find('[class$=-textInput__afterElement]', ...args)
  },
  findFormMessages: (...args: any[]) => {
    return findAll('[class$=-formFieldMessage]', ...args)
  },
  findPopoverRoot: (...args: any[]) => {
    return PopoverLocator.find(...args)
  },
  findPopoverTrigger: (...args: any[]) => {
    return PopoverLocator.findTrigger(...args)
  },
  findColorMixer: (...args: any[]) => {
    return ColorMixerLocator.find(...args)
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
  },
  findRGBAInputs: async (...args: any[]) => {
    const rgbaInputs = await findAll('[class$=-RGBAInput__rgbInput]', ...args)

    return Promise.all(rgbaInputs.map((span) => span.find('input')))
  },
  findPopoverButtonWithText: async (...args: any[]) => {
    let el = await findWithText(...args)

    while (el.getTagName() !== 'button') {
      const parentNode = el.getParentNode()
      if (!parentNode) {
        break
      }
      el = within(parentNode as Element)
    }

    return el
  },
  findColorPreset: async (...args: []) => {
    return _findColorPreset(...args)
  },
  findColorPresetButtons: async (...args: []) => {
    const colorPresets = await _findColorPreset(...args)

    const colorPresetButtons = []

    for (let el of colorPresets) {
      while (el.getTagName() !== 'button') {
        const parentNode = el.getParentNode()
        if (!parentNode) {
          break
        }
        el = within(parentNode as Element) as any
      }
      colorPresetButtons.push(el)
    }
    return colorPresetButtons
  }
}

//@ts-expect-error no selector on class
export const ColorPickerLocator = locator(ColorPicker.selector, customMethods)
