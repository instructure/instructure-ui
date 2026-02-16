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

import type { TableRowTheme } from '@instructure/shared-types'
import type { TableRowProps, TableRowStyle } from './props'

/**
 * ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param  {Object} componentTheme The theme variable object.
 * @param  {Object} props the props of the component, the style is applied to
 * @param  {Object} extraArgs the state of the component, the style is applied to
 * @return {Object} The final style object, which will be used in the component
 */
const generateStyle = (
  componentTheme: TableRowTheme,
  props: TableRowProps,
  extraArgs: { isStacked: boolean; hover: boolean }
): TableRowStyle => {
  const { setHoverStateTo } = props

  const hoverStyles = {
    borderLeftColor: componentTheme.hoverBorderColor,
    borderRightColor: componentTheme.hoverBorderColor
  }

  return {
    row: {
      label: 'row',
      fontSize: componentTheme.fontSize,
      fontFamily: componentTheme.fontFamily,
      fontWeight: componentTheme.fontWeight,
      color: componentTheme.color,
      background: componentTheme.background,
      boxSizing: 'border-box',
      borderBottomStyle: 'solid',
      borderBottomWidth: '0.0625rem',
      borderBottomColor: componentTheme.borderColor,

      ...((setHoverStateTo ?? extraArgs.hover) && {
        borderLeft: '0.1875rem solid transparent',
        borderRight: '0.1875rem solid transparent',
        ...(setHoverStateTo === true ? hoverStyles : { '&:hover': hoverStyles })
      }),

      ...(extraArgs.isStacked && { padding: componentTheme.padding })
    }
  }
}

export default generateStyle
