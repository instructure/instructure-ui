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

import omit from 'object.omit'
import pick from 'object.pick'
/**
 * ---
 * category: utilities/react
 * ---
 * @module passthroughProps
 */


const ALWAYS_EXCLUDE = ['theme', 'children', 'className', 'style']
 /**
  * Return a props object with the specified propTypes omitted.
  * Automatically excludes ('theme', 'children', 'className', 'style')
  *
  * @param {Object} props React component props
  * @param {Object} propTypes React component propTypes
  * @param {Array} exclude an optional array of prop names to exclude
  * @returns {Object} props object without the excluded props
  */
export function omitProps (props, propTypes = {}, exclude = []) {
  const keys = Object.keys(propTypes)
    .concat(ALWAYS_EXCLUDE)
    .concat(exclude)

  return omit(props, keys)
}

/**
 * Return a props object with only specified propTypes.
 *
 * @param {Object} props React component props
 * @param {Object} propTypes React component propTypes
 * @param {Array} include an optional array of prop names to include
 * @returns {Object} props object with only the included props
 */
export function pickProps (props, propTypes = {}, include = []) {
  return pick(props, Object.keys(propTypes).concat(include))
}
