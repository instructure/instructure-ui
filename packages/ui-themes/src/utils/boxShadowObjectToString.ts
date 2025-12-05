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
 * Elevation tokens contain multiple layered shadows.
 * Keys "0" and "1" represent the shadow layers.
 */
type ElevationToken = {
  '0': TokenBoxshadowValueInst
  '1': TokenBoxshadowValueInst
}

/**
 * Converts a BoxShadowObject from Token Studio to a CSS box-shadow string
 */
function boxShadowObjectToString(boxShadowObject: TokenBoxshadowValueInst) {
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

/**
 * Converts an elevation token to a valid CSS box-shadow string.
 *
 * Input: sharedTokens.boxShadow.elevation{1,2,3,4} - nested object structure
 * Output: valid CSS box-shadow value (e.g., "0px 2px 4px 0px rgba(0,0,0,0.1), 0px 4px 8px 0px rgba(0,0,0,0.05)")
 *
 * Elevation tokens contain two shadow objects ("0" and "1") that are
 * combined into a comma-separated CSS value for layered shadows.
 *
 * @param elevationToken - Token with "0" and "1" shadow objects from sharedTokens.boxShadow
 * @returns Valid CSS box-shadow string with comma-separated shadows
 */
function elevationTokenToBoxShadow(elevationToken: ElevationToken): string {
  const shadows: string[] = []

  if (elevationToken['0']) {
    shadows.push(boxShadowObjectToString(elevationToken['0']))
  }

  if (elevationToken['1']) {
    shadows.push(boxShadowObjectToString(elevationToken['1']))
  }

  return shadows.join(', ')
}

export default boxShadowObjectToString
export { boxShadowObjectToString, elevationTokenToBoxShadow }
export type { ElevationToken }
