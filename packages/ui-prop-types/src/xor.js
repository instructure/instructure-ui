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
 * Verify that a prop cannot be given if one or more other props are also
 * given.
 *
 * ```js
 *  import { xor } from '@instructure/ui-prop-types'
 *
 *  class Foo extends Component {
 *    static propTypes = {
 *      decimalPrecision: xor(PropTypes.number, 'significantDigits'),
 *      significantDigits: xor(PropTypes.number, 'decimalPrecision')
 *    }
 *  ...
 * ```
 *
 * This will throw an error if both the `decimalPrecision` and
 * `significantDigits` props are provided.
 *
 * @param {function} propType - validates the prop type. Returns null if valid, error otherwise
 * @param {...string} otherPropNames - reject if any of these other props are also given
 * @returns {Error} if any of the other props are also given
 */
function xor (propType, ...otherPropNames) {
  return function (props, propName, componentName) {
    if (props[propName] != null) {
      const otherProps = otherPropNames.map(name => props[name]).filter(prop => prop != null)
      if (otherProps.length > 0) {
        return new Error(
          `Invalid prop \`${propName}\` supplied to \`${componentName}\`: expected only one of ` +
            `${[propName].concat(otherPropNames).map(name => `\`${name}\``).join(', ')} to be set.`
        )
      }
    }

    return propType.apply(null, arguments)
  }
}

export default xor
export { xor }
