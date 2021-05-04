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

/**
 * ---
 * category: utilities/PropTypes
 * ---
 * Given a validator function, extends the validator functionality to also
 * ensure that the prop has been provided if `.isRequired` is specified.
 *
 * ```js
 * function validator (props, propName, componentName) {
 *   const propValue = props[propName]
 *   if (propValue === 'purple') {
 *     return new Error(`Purple is not accepted in ${componentName}!`)
 *   }
 * }
 *
 * validator.isRequired = makeRequirable(validator)
 * ```
 * @module makeRequirable
 * @param {function} validator - a validator function
 * @returns {Error} if designated prop is not provided
 */
function makeRequirable(validator) {
  return function (props, propName, componentName, ...rest) {
    const propValue = props[propName]

    if (propValue === null || typeof propValue === 'undefined') {
      return new Error(
        `The prop \`${propName}\` is marked as required in \`${componentName}\`, but its value is \`${propValue}\``
      )
    } else {
      return validator(props, propName, componentName, ...rest)
    }
  }
}

export default makeRequirable
export { makeRequirable }
