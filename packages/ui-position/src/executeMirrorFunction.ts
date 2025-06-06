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
  PlacementPropValues,
  PlacementValueArray,
  PlacementValues,
  PlacementStringValues
} from './PositionPropTypes'

function executeMirrorFunction<D extends string | undefined = undefined>(
  placement: PlacementValueArray | PlacementStringValues,
  mirrorFunction: (
    first: PlacementValues,
    second: PlacementValues
  ) => PlacementValueArray,
  delimiter?: D
): D extends string
  ? D extends ' '
    ? PlacementPropValues
    : string
  : PlacementValueArray {
  const [first, second] = Array.isArray(placement)
    ? (placement as PlacementValueArray)
    : ((placement as PlacementStringValues).split(' ') as PlacementValueArray)
  const result = mirrorFunction(first, second).filter((value) => value)
  return delimiter ? (result.join(delimiter) as any) : (result as any)
}

export default executeMirrorFunction
export { executeMirrorFunction }
