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

import PropTypes from 'prop-types'

import { ThemeablePropValues } from './ThemeablePropValues'
import type {
  BorderRadiiValues,
  BorderRadii,
  BorderWidthValues,
  BorderWidth,
  SpacingValues,
  Spacing
} from './ThemeablePropValues'

const {
  SHADOW_TYPES,
  STACKING_TYPES,
  BORDER_WIDTHS,
  BORDER_RADII,
  BACKGROUNDS,
  SIZES
} = ThemeablePropValues

/**
 * ---
 * category: utilities/themes
 * ---
 * Custom prop types for themeable React components.
 * @module ThemeablePropTypes
 */
const ThemeablePropTypes = {
  shadow: PropTypes.oneOf(Object.values(SHADOW_TYPES)),
  stacking: PropTypes.oneOf(Object.values(STACKING_TYPES)),
  borderWidth: shorthandPropType(Object.values(BORDER_WIDTHS)),
  borderRadius: shorthandPropType(Object.values(BORDER_RADII)),
  background: PropTypes.oneOf(Object.values(BACKGROUNDS)),
  size: PropTypes.oneOf(Object.values(SIZES))
}

type ValueKeys =
  | BorderWidthValues[]
  | BorderRadiiValues[]
  | SpacingValues[]
  | string[]

function shorthandPropType<V extends ValueKeys>(
  validValues: V
): PropTypes.Validator<
  V extends BorderWidthValues[]
    ? BorderWidth
    : V extends BorderRadiiValues[]
    ? BorderRadii
    : V extends SpacingValues[]
    ? Spacing
    : string[]
> {
  return function (
    props: Record<string, unknown>,
    propName: string,
    componentName: string,
    location: string
  ) {
    const propValue = props[propName]

    if (typeof propValue === 'undefined') {
      return null
    }

    if (typeof propValue !== 'string') {
      return new Error(
        `Invalid ${location} \`${propName}\` of type \`${typeof propValue}\` supplied to \`${componentName}\`, expected ` +
          `a string.`
      )
    }

    const propValues = propValue.split(' ')
    const valuesLength = propValues.length
    if (valuesLength > 0 && valuesLength < 5) {
      for (let i = 0; i < valuesLength; i++) {
        const valueIndex = (validValues as string[]).indexOf(propValues[i])
        if (valueIndex === -1) {
          return new Error(
            `Invalid ${location} \`${propName}\` \`${propValues[i]}\` supplied to \`${componentName}\`, expected ` +
              `a one of \`${validValues.join(', ')}\`.`
          )
        }
      }
    } else {
      return new Error(
        `Invalid ${location} \`${propName}\` \`${propValue}\` supplied to \`${componentName}\`, expected ` +
          `between one and four of the following valid values: \`${validValues.join(
            ', '
          )}\`.`
      )
    }

    return null
  }
}

export default ThemeablePropTypes
export { ThemeablePropTypes, shorthandPropType }
