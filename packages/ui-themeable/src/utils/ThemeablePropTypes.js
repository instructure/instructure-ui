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

/**
 * ---
 * category: utilities/themes
 * ---
 * Custom prop types for themeable React components.
 * @module ThemeablePropTypes
 */
export default {
  shadow: PropTypes.oneOf(['resting', 'above', 'topmost']),

  stacking: PropTypes.oneOf(['deepest', 'below', 'resting', 'above', 'topmost']),

  borderWidth: shorthandPropType(['0', 'none', 'small', 'medium', 'large']),
  borderRadius: shorthandPropType(['0', 'none', 'small', 'medium', 'large']),

  background: PropTypes.oneOf(['default', 'inverse', 'transparent']),

  size: PropTypes.oneOf(['x-small', 'small', 'medium', 'large', 'x-large']),

  /**
   *
   * Validate spacing prop constraining it to the following enumerated values
   *
   *  - '0'
   *  - 'none'
   *  - 'auto'
   *  - 'xxx-small'
   *  - 'xx-small'
   *  - 'x-small'
   *  - 'small'
   *  - 'medium'
   *  - 'large'
   *  - 'x-large'
   *  - 'xx-large'
   *
   * Valid inputs include a single value or a string with CSS
   * shorthand like syntax with a maximum of 4 values.
   *
   * Examples of valid inputs:
   * 'x-small' (single value)
   * 'small large' (CSS shorthand)
   * '0 small large x-large' (CSS shorthand max 4 values)
   *
   * Examples of invalid inputs:
   * '5px' (must be a string from the enumerated values)
   * '0 large small 0 0' (invalid shorthand syntax w/5 values)
   *
   * @param {Object} props - object containing the component props
   * @param {string} propName - name of the given prop
   * @param {string} componentName - name of the component
   * @param {string} location
   * @param {string} propFullName
   * @returns {Error} if is not one of the enumerated values or the shorthand syntax is incorrect
   */
  spacing: shorthandPropType([
    '0',
    'none',
    'auto',
    'xxx-small',
    'xx-small',
    'x-small',
    'small',
    'medium',
    'large',
    'x-large',
    'xx-large'
  ])
}

export function shorthandPropType (validValues) {
  return function (props, propName, componentName, location) {
    const propValue = props[propName]

    if (typeof propValue === 'undefined') {
      return
    }

    const propValueType = typeof propValue

    if (propValueType !== 'string') {
      return new Error(
        `Invalid ${location} \`${propName}\` of type \`${propValueType}\` supplied to \`${componentName}\`, expected ` +
          `a string.`
      )
    }

    const propValues = propValue.split(' ')
    const valuesLength = propValues.length
    if (valuesLength > 0 && valuesLength < 5) {
      for (let i = 0; i < valuesLength; i++) {
        const valueIndex = validValues.indexOf(propValues[i])
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
          `between one and four of the following valid values: \`${validValues.join(', ')}\`.`
      )
    }
  }
}
