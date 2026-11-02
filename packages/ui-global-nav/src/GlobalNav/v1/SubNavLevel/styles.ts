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

import type { NewComponentTypes } from '@instructure/ui-themes'
import type { SubNavLevelStyle } from './props.js'

/**
 * ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param componentTheme The theme variable object.
 * @return The final style object, which will be used in the component
 */
const generateStyle = (
  componentTheme: ReturnType<NewComponentTypes['SubNav']>
): SubNavLevelStyle => {
  return {
    level: {
      label: 'subNavLevel',
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      minHeight: 0,
      boxSizing: 'border-box',
      gap: componentTheme.gap,
      padding: componentTheme.padding
    },
    header: {
      label: 'subNavLevel__header',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end'
    },
    divider: {
      label: 'subNavLevel__divider',
      // SubNav has no divider width token
      borderTop: `0.0625rem solid ${componentTheme.strokeColor}`
    },
    body: {
      label: 'subNavLevel__body',
      flex: 1,
      minHeight: 0,
      overflowY: 'auto'
    },
    items: {
      label: 'subNavLevel__items',
      display: 'flex',
      flexDirection: 'column',
      gap: componentTheme.navItemsGap,
      listStyle: 'none',
      margin: 0,
      padding: 0
    }
  }
}

export default generateStyle
