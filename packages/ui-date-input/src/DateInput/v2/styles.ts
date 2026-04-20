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

import type { DateInputStyle, DateInputStyleParams } from './props'

/**
 * ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param  _componentTheme The theme variable object (unused — DateInput has no theme variables).
 * @param  params Style parameters derived from props and state.
 * @return The final style object, which will be used in the component
 */
const generateStyle = (
  _componentTheme: Record<string, never>,
  params: DateInputStyleParams
): DateInputStyle => {
  const { calculatedPopoverMaxHeight, popoverMaxHeight, isHeightCalculated } =
    params

  return {
    popoverContentContainer: {
      label: 'dateInput__popoverContentContainer',
      maxHeight: calculatedPopoverMaxHeight || popoverMaxHeight,
      overflowY: 'auto',
      overflowX: 'hidden',
      scrollbarGutter: 'stable',
      opacity: isHeightCalculated ? 1 : 0,
      transition: 'opacity 150ms ease-in'
    }
  }
}

export default generateStyle
