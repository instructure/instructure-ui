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
 * Verify that either value is provided as a prop if as="input", and children
 * if provided otherwise
 *
 * ```js
 *  import { childrenOrValue } from '@instructure/ui-prop-types'
 *
 *  class Foo extends Component {
 *    static propTypes = {
 *      children: childrenOrValue,
 *      value: childrenOrValue
 *    }
 *  ...
 * ```
 */
function childrenOrValue (props, propName, componentName) {
  if (props.as === 'input') {
    if ((propName === 'children' && props.children) || props.value == undefined) {
      return new Error(`Prop \`value\` and not \`children\` must be supplied if \`${componentName} as="input"\``)
    }
  } else {
    if ((propName === 'value' && props.value != undefined)) {
      return new Error(`Prop \`children\` and not \`value\` must be supplied unless \`${componentName} as="input"\``)
    } else if (!props.children) {
      return new Error(`Prop \`children\` should be supplied unless \`${componentName} as="input"\`.`)
    }
  }
  return
}
export default childrenOrValue
export { childrenOrValue }
