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

import { TokenBoxshadowValueInst } from '../themes/newThemes/commonTypes'

/**
 * Converts a BoxShadowObject from Token Studio to a CSS box-shadow string
 */
function boxShadowToCSSString(boxShadowObject: TokenBoxshadowValueInst) {
  // weird string concatenation is to make it look nice in the debugger
  if (boxShadowObject.type === 'innerShadow') {
    return (
      `inset ${boxShadowObject.x} ` +
      `${boxShadowObject.y} ` +
      `${boxShadowObject.blur ? boxShadowObject.blur : ''} ` +
      `${boxShadowObject.spread ? boxShadowObject.spread : ''} ` +
      `${boxShadowObject.color}`
    )
  }
  return (
    `${boxShadowObject.x} ` +
    `${boxShadowObject.y} ` +
    `${boxShadowObject.blur ? boxShadowObject.blur : ''} ` +
    `${boxShadowObject.spread ? boxShadowObject.spread : ''} ` +
    `${boxShadowObject.color}`
  )
}

function getShadowsInOrder(
  shadowsObj: Record<string, TokenBoxshadowValueInst>
) {
  return Object.keys(shadowsObj)
    .sort((a, b) => {
      const numA = parseInt(a)
      const numB = parseInt(b)
      return numA - numB
    })
    .map((key) => shadowsObj[key])
}

/**
 * Converts a box shadow object that looks like this:
 * ```
 * {
 *   '1': {color: 'rgba(12, 0, 0, 0.2)', x:...},
 *   '2': {color: 'rgba(0, 0, 0, 0.1)', x:...},
 *   '0': {color: 'rgba(0, 0, 0, 0.1)', x:...}
 * }
 * ```
 * to a CSS box-shadow string e.g.
 * ```
 * 0px 0.375rem 0.4375rem 0px rgba(12,0,0,0.2),
 * 0px 0.625rem 1.75rem 0px rgba(0,0,0,0.1),
 * 0px 0.625rem 1.75rem 0px rgba(0,0,0,0.1)
 * ```
 */
function boxShadowObjectsToCSSString(
  shadowObject: Record<string, TokenBoxshadowValueInst>
) {
  const shadows = getShadowsInOrder(shadowObject)
  let result = ''
  for (const shadow of shadows) {
    result += boxShadowToCSSString(shadow) + ',\n'
  }
  return result.slice(0, -2)
}

export { boxShadowToCSSString, boxShadowObjectsToCSSString }
