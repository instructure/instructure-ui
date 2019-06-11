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
import { ThemeablePropValues } from '@instructure/ui-themeable'

const {
  SHADOW_TYPES,
  BORDER_WIDTHS,
  BORDER_RADII
} = ThemeablePropValues

export default {
  sectionProp: 'background',
  propValues: {
    shadow: [undefined, ...Object.values(SHADOW_TYPES)],
    borderWidth: [...Object.values(BORDER_WIDTHS)],
    borderRadius: [...Object.values(BORDER_RADII)],
    position: ['relative', 'static']
  },
  getComponentProps: (props) => {
    return {
      padding: 'medium',
      display: 'block',
      children: 'Some content for the View',
      debug: false,
      focusColor: 'info',
      focusPosition: 'offset',
      borderColor: 'info',
      overflowX: 'visible',
      overflowY: 'visible',
      shouldAnimateFocus: false
    }
  },
  excludeProps: ['padding', 'shouldAnimateFocus', 'display', 'debug', 'focusColor', 'focusPosition', 'borderColor', 'overflowX', 'overflowY'],
  filter: (props) => {
    return (
      // Border radius and border width list 0 in addition to none in their object values
      // so we filter those here as they are redundant
      (
        props.borderRadius === 'none' || props.borderWidth === 'none' || props.background === 'transparent' ||
        (props.focusPosition === 'inset' && !props.focused) ||
        (props.focused && props.position !== 'relative')
      )
    )
  }
}
