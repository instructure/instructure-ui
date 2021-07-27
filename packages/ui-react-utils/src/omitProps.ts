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
 * Return an object with the remaining props after propTypes (and additionally specified props) omitted.
 *
 * Automatically excludes the following props: 'theme', 'children', 'className', 'style', 'styles', 'makeStyles', 'themeOverride'
 * @module omitProps
 * @param {Object} props React component props
 * @param {Object|Array<string>} propTypes React component propTypes or the list of allowed prop keys
 * @param {Array} exclude an optional array of prop names to exclude
 * @returns {Object} props object without the excluded props
 * @module omitProps
 */
function omitProps<T extends Record<string, any>>(
  props: T,
  propTypesOrAllowedPropList: Record<string, any> | string[],
  exclude?: string[]
) {
  const propKeys = Array.isArray(propTypesOrAllowedPropList)
    ? propTypesOrAllowedPropList
    : Object.keys(propTypesOrAllowedPropList || {})
  const combined = exclude ? propKeys.concat(exclude) : propKeys

  return omit(props, combined)
}

const hasOwnProperty = Object.prototype.hasOwnProperty

const omit = (originalObject: Record<string, unknown>, keys: string[]) => {
  // code based on babel's _objectWithoutProperties
  const newObject: Record<string, unknown> = {}
  for (const key in originalObject) {
    // special case because we always want to omit these and === is faster than concat'ing them in
    if (
      key === 'theme' ||
      key === 'children' ||
      key === 'className' ||
      key === 'style' ||
      key === 'styles' ||
      key === 'makeStyles' ||
      key === 'themeOverride'
    )
      continue

    if (keys.includes(key) || !hasOwnProperty.call(originalObject, key))
      continue
    newObject[key] = originalObject[key]
  }

  return newObject
}
export default omitProps
export { omitProps }
