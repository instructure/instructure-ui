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

import type { CheckboxProps, CheckboxStyle } from './props'

/**
 * ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param  {Object} componentTheme The theme variable object.
 * @param  {Object} props the props of the component, the style is applied to
 * @param  {Object} state the state of the component, the style is applied to
 * @return {Object} The final style object, which will be used in the component
 */
const generateStyle = (
  // @ts-expect-error no theme variables used here
  componentTheme: any,
  props: CheckboxProps
): CheckboxStyle => {
  const { inline, disabled } = props

  return {
    checkbox: {
      label: 'checkbox',
      position: 'relative',
      width: '100%',
      ...(disabled && {
        cursor: 'not-allowed',
        pointerEvents: 'none',
        opacity: 0.5
      }),
      ...(inline && {
        display: 'inline-block',
        verticalAlign: 'middle',
        width: 'auto'
      })
    },
    input: {
      label: 'checkbox__input',
      padding: 0,
      margin: 0,
      fontSize: 'inherit',
      lineHeight: 'inherit',
      width: 'auto',
      position: 'absolute',
      top: 0,
      insetInlineStart: 0,
      insetInlineEnd: 'auto',
      opacity: 0.0001 /* selenium cannot find fully transparent elements */
    },
    control: {
      label: 'checkbox__control',
      all: 'initial',
      display: 'block',
      direction: 'inherit',
      textAlign: 'start'
    }
  }
}

export default generateStyle
