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
 * category: utilities/react
 * ---
 * Return a props object with only specified propTypes.
 * @module pickProps
 * @param {Object} props React component props
 * @param {Object|Array<string>} propTypes React component propTypes or the list of allowed prop keys
 * @param {Array} include an optional array of prop names to include
 * @returns {Object} props object with only the included props
 * @module pickProps
 */
function pickProps<T extends Record<string, any>>(
  props: T,
  propTypesOrAllowedPropList: Record<string, any> | string[],
  include?: string[]
) {
  const propKeys = Array.isArray(propTypesOrAllowedPropList)
    ? propTypesOrAllowedPropList
    : Object.keys(propTypesOrAllowedPropList || {})
  const combined = include ? propKeys.concat(include) : propKeys

  return pick(props, combined)
}

// this was the fastest implementation from testing: https://jsperf.com/pick-props
function pick(obj: Record<string, unknown>, keys: string[]) {
  const res: Record<string, unknown> = {}
  const len = keys.length
  let idx = -1
  let key

  while (++idx < len) {
    key = keys[idx]
    if (key in obj) {
      res[key] = obj[key]
    }
  }
  return res
}
export default pickProps
export { pickProps }
