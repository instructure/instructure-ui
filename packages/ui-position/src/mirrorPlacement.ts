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

import {
  PlacementValueArray,
  PlacementPropValues,
  PlacementStringValues,
  mirrorMap
} from './PositionPropTypes'

import executeMirrorFunction from './executeMirrorFunction'

/**
 * ---
 * category: utilities/position
 * ---
 * Given a string or array of one or two placement values, mirrors the placement
 * vertically or horizontally based on the first value.
 *
 * Examples
 * ```js-comment
 * mirrorPlacement('top start') // input
 * ['bottom', 'start'] // output
 *
 * mirrorPlacement('top start', ' ') // input
 * 'bottom start' //output
 * ```
 *
 * @param {string|Array} placement - a string of the form '`<value>` `<value>`' or array [`<value>`, `<value>`]
 * @param {string} delimiter - when provided, a value with which the result array will be joined
 * @returns {string|Array} - an array of values or, if the delimiter was supplied, a string of
 *  delimiter separated values
 *
 * @module mirrorPlacement
 **/
function mirrorPlacement<D extends string | undefined = undefined>(
  placement: PlacementValueArray | PlacementStringValues,
  delimiter?: D
): D extends string
  ? D extends ' '
    ? PlacementPropValues
    : string
  : PlacementValueArray {
  return executeMirrorFunction(
    placement,
    (first, second) => {
      return [mirrorMap[first], second]
    },
    delimiter
  )
}

export default mirrorPlacement
export { mirrorPlacement }
