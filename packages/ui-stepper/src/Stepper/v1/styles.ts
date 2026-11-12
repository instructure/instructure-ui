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

import { calcSpacingFromShorthand } from '@instructure/emotion'
import type { NewComponentTypes, SharedTokens } from '@instructure/ui-themes'

import type { StepperProps, StepperStyle } from './props.js'

type StyleParams = {
  margin: StepperProps['margin']
  orientation: StepperProps['orientation']
}

/**
 * ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param componentTheme The theme variable object.
 * @param params Additional parameters to customize the style.
 * @param sharedTokens Shared token object that stores common values for the theme.
 * @return The final style object, which will be used in the component
 */
const generateStyle = (
  _componentTheme: ReturnType<NewComponentTypes['Stepper']>,
  params: StyleParams,
  sharedTokens: SharedTokens
): StepperStyle => {
  const { margin, orientation } = params

  return {
    stepper: {
      label: 'stepper',
      margin: calcSpacingFromShorthand(margin, {
        ...sharedTokens.spacing,
        ...sharedTokens.legacy.spacing
      })
    },
    list: {
      label: 'stepper__list',
      display: 'flex',
      flexDirection: orientation === 'vertical' ? 'column' : 'row',
      margin: 0,
      padding: 0,
      listStyleType: 'none'
    }
  }
}

export default generateStyle
