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

import { log } from '@instructure/console/macro'
import { isObject } from 'lodash'

const DEBUG = false
const SUPPORT_PROPS = [
  'float',
  'clear',
  'textAlign',
  'paddingInlineStart',
  'paddingInlineEnd',
  'borderInlineStart',
  'borderInlineEnd',
  'borderInlineStartColor',
  'borderInlineEndColor',
  'borderInlineStartStyle',
  'borderInlineEndStyle',
  'borderInlineStartWidth',
  'borderInlineEndWidth',
  'borderInlineStartTop',
  'borderInlineEndTop',
  'borderTopInlineStartRadius',
  'borderTopInlineEndRadius',
  'borderBottomInlineStartRadius',
  'borderBottomInlineEndRadius',
  'marginInlineStart',
  'marginInlineEnd',
  'offsetInlineStart',
  'offsetInlineEnd',
  'insetInlineStart',
  'insetInlineEnd'
]

function processProps({ originalProp, originalValue }, textDirection) {
  const isLtr = textDirection === 'ltr'

  let prop = originalProp
  let value = originalValue
  let start = isLtr ? 'Left' : 'Right'
  let end = isLtr ? 'Right' : 'Left'

  switch (prop) {
    case 'float':
    case 'clear':
    case 'textAlign':
      if (['start', 'end'].indexOf(value) !== -1) {
        if (value === 'start') {
          value = start.toLowerCase()
        } else {
          value = end.toLowerCase()
        }
      }
      break
    case 'paddingInlineStart':
      prop = 'padding' + start
      break
    case 'paddingInlineEnd':
      prop = 'padding' + end
      break
    case 'borderInlineStart':
      prop = 'border' + start
      break
    case 'borderInlineEnd':
      prop = 'border' + end
      break
    case 'borderInlineStartColor':
      prop = 'border' + start + 'Color'
      break
    case 'borderInlineEndColor':
      prop = 'border' + end + 'Color'
      break
    case 'borderInlineStartWidth':
      prop = 'border' + start + 'Width'
      break
    case 'borderInlineEndWidth':
      prop = 'border' + end + 'Width'
      break
    case 'borderInlineStartStyle':
      prop = 'border' + start + 'Style'
      break
    case 'borderInlineEndStyle':
      prop = 'border' + end + 'Style'
      break
    case 'borderTopInlineStartRadius':
      prop = 'borderTop' + start + 'Radius'
      break
    case 'borderTopInlineEndRadius':
      prop = 'borderTop' + end + 'Radius'
      break
    case 'borderBottomInlineStartRadius':
      prop = 'borderBottom' + start + 'Radius'
      break
    case 'borderBottomInlineEndRadius':
      prop = 'borderBottom' + end + 'Radius'
      break
    case 'marginInlineStart':
      prop = 'margin' + start
      break
    case 'marginInlineEnd':
      prop = 'margin' + end
      break
    case 'insetInlineStart':
    case 'offsetInlineStart':
      prop = start.toLowerCase()
      break
    case 'insetInlineEnd':
    case 'offsetInlineEnd':
      prop = end.toLowerCase()
      break
    default:
      break
  }

  if (DEBUG) log(`${originalProp}: ${originalValue} => ${prop}: ${value}`)

  return { prop, value }
}

const isSupportedProps = (prop) => SUPPORT_PROPS.indexOf(prop) > -1

const processStyleProps = (propsObj, dir) =>
  isObject(propsObj)
    ? Object.entries(propsObj).reduce(
        (accumulator, [originalProp, originalValue]) => {
          if (isObject(originalValue)) {
            return {
              ...accumulator,
              [originalProp]: processStyleProps(originalValue, dir)
            }
          }

          if (isSupportedProps(originalProp) && originalValue !== 'undefined') {
            const { prop, value } = processProps(
              { originalProp, originalValue },
              dir
            )

            return { ...accumulator, [prop]: value }
          }

          return { ...accumulator, [originalProp]: originalValue }
        },
        {}
      )
    : propsObj

export const bidirectionalPolyfill = (styles, dir) =>
  Object.entries(styles).reduce(
    (accumulator, [style, props]) => ({
      ...accumulator,
      [style]: processStyleProps(props, dir)
    }),
    {}
  )
