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
 * Ensure that a corresponding handler function is provided for the given prop if the
 * component does not manage its own state.
 *
 * ```js
 *  import { controllable } from '@instructure/ui-prop-types'
 *
 *  class Foo extends Component {
 *    static propTypes = {
 *      selected: controllable(PropTypes.bool, 'onSelect', 'defaultSelected'),
 *      onSelect: PropTypes.func,
 *      defaultSelected: PropTypes.bool
 *    }
 *  ...
 * ```
 *
 * This will throw an error if the 'selected' prop is supplied without a corresponding
 * 'onSelect' handler and will recommend using 'defaultSelected' instead.
 * @module controllable
 * @param {function} propType - validates the prop type. Returns null if valid, error otherwise
 * @param {string} handlerName - name of the handler function
 * @param {string} defaultPropName - name of the default prop
 * @returns {Error} if designated prop is supplied without a corresponding handler function
 */
function controllable(
  propType,
  handlerName = 'onChange',
  defaultPropName = 'defaultValue'
) {
  return function (props, propName, componentName) {
    const error = propType.apply(null, arguments)
    if (error) {
      return error
    }

    if (props[propName] && typeof props[handlerName] !== 'function') {
      return new Error(
        [
          `You provided a '${propName}' prop without an '${handlerName}' handler on '${componentName}'. \
This will render a controlled component. \
If the component should be uncontrolled and manage its own state, use '${defaultPropName}'. \
Otherwise, set '${handlerName}'.`
        ].join('')
      )
    }
  }
}

export default controllable
export { controllable }
