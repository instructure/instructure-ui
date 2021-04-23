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

const { SHADOW_TYPES, BORDER_WIDTHS, BORDER_RADII } = ThemeablePropValues

export default {
  maxExamplesPerPage: 50,
  sectionProp: 'background',
  propValues: {
    shadow: [undefined, ...Object.values(SHADOW_TYPES)],
    borderWidth: [...Object.values(BORDER_WIDTHS)],
    borderRadius: [...Object.values(BORDER_RADII)],
    borderColor: [
      'transparent',
      'primary',
      'secondary',
      'brand',
      'info',
      'success',
      'warning',
      'alert',
      'danger'
    ],
    background: [
      'transparent',
      'primary',
      'secondary',
      'primary-inverse',
      'brand',
      'info',
      'alert',
      'success',
      'danger',
      'warning'
    ]
  },
  getComponentProps: (props) => {
    return {
      position: 'relative',
      padding: 'medium',
      display: 'block',
      children: 'Some content for the View',
      focusColor: 'info',
      focusPosition: 'offset',
      overflowX: 'visible',
      overflowY: 'visible',
      shouldAnimateFocus: false,
      ...(props.background !== 'primary' && {
        borderColor: 'info',
        borderRadius: undefined,
        borderWidth: undefined,
        shadow: undefined
      }),
      ...((props.borderRadius !== '0' ||
        props.borderWidth !== '0' ||
        props.borderColor !== 'info' ||
        props.shadow !== undefined) && {
        textAlign: 'start'
      }),
      ...((props.borderRadius !== '0' ||
        props.borderWidth !== 'small' ||
        props.textAlign !== 'start' ||
        props.shadow !== undefined) && {
        borderColor: 'info'
      })
    }
  },
  excludeProps: [
    'as',
    'position',
    'elementRef',
    'padding',
    'margin',
    'shouldAnimateFocus',
    'display',
    'withVisualDebug',
    'focusColor',
    'focusPosition',
    'overflowX',
    'overflowY',
    'visualDebug',
    'focused'
  ],
  filter: (props) => {
    return (
      // Border radius and border width list 0 in addition to none in their object values
      // so we filter those here as they are redundant
      props.borderRadius === 'none' ||
      props.borderWidth === 'none' ||
      props.borderColor === 'transparent' ||
      props.background === 'transparent' ||
      (props.focusPosition === 'inset' && !props.withFocusOutline) ||
      (props.withFocusOutline && props.position !== 'relative')
    )
  }
}
