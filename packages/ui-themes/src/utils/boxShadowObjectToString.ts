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

// TODO get this type from token types, now its coming from generateComponents.js
type BoxShadowObject = {
  x: string | 0 | number
  y: string | 0 | number
  blur: string | 0 | number
  spread: string | 0 | number
  color: string // CSS color string like "red" or "#f00"
  type: 'dropShadow' | 'innerShadow'
}

/**
 * Converts a BoxShadowObject from Token Studio to a CSS box-shadow string
 */
function boxShadowObjectToString(boxShadowObject: BoxShadowObject) {
  if (boxShadowObject.type === 'innerShadow') {
    return `inset ${boxShadowObject.x}
    ${boxShadowObject.y}
    ${boxShadowObject.blur ? boxShadowObject.blur : ''}
    ${boxShadowObject.spread ? boxShadowObject.spread : ''}
    ${boxShadowObject.color}`
  }
  return `${boxShadowObject.x}
    ${boxShadowObject.y}
    ${boxShadowObject.blur ? boxShadowObject.blur : ''}
    ${boxShadowObject.spread ? boxShadowObject.spread : ''}
    ${boxShadowObject.color}`
}

export default boxShadowObjectToString
export { boxShadowObjectToString }
