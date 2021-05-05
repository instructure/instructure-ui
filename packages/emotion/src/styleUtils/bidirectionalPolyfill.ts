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

import { consoleLog as log } from '@instructure/console'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import { isObject } from 'lodash'

/**
 * ---
 * category: utilities/themes
 * ---
 * Polyfills Bi-directional [CSS proposal from W3C](https://drafts.csswg.org/css-logical-props/) to support direction-sensitive rules, a.k.a Left-To-Right (LTR) and Right-To-Left (RTL) in all browsers.
 *
 * Based on formerly used [postcss-bidirection](https://github.com/gasolin/postcss-bidirection) plugin.
 * @module bidirectionalPolyfill
 * @param {object} styles - styles object of a component
 * @param {string} dir - "ltr" of "rtl" direction
 * @returns {{}} styles object with Bi-directional properties polyfilled
 */

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

function processProps(
  { originalProp, originalValue }: any,
  textDirection: any
) {
  const isLtr = textDirection === 'ltr'

  let prop = originalProp
  let value = originalValue
  const start = isLtr ? 'Left' : 'Right'
  const end = isLtr ? 'Right' : 'Left'

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

const isSupportedProps = (prop: any) => SUPPORT_PROPS.indexOf(prop) > -1

const processStyleProps = (propsObj: any, dir: any): any =>
  isObject(propsObj)
    ? Object.entries(propsObj).reduce(
        (accumulator: any, [originalProp, originalValue]) => {
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

export const bidirectionalPolyfill = (styles: any, dir: any) =>
  Object.entries(styles).reduce(
    (accumulator, [style, props]) => ({
      ...accumulator,
      [style]: processStyleProps(props, dir)
    }),
    {}
  )
