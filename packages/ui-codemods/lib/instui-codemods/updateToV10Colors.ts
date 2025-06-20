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

import { Collection, JSCodeshift } from 'jscodeshift'
import { findImport } from '../utils/codemodHelpers'
import { isIdentifier, isMemberExpression } from '../utils/codemodTypeCheckers'

const colorMapping: { [index: string]: string } = {
  brand: 'blue4570',
  link: 'blue4570',
  electric: 'blue4570',
  shamrock: 'green4570',
  barney: 'blue4570',
  crimson: 'red4570',
  fire: 'orange4570',
  licorice: 'grey125125',
  oxford: 'grey100100',
  ash: 'grey4570',
  slate: 'grey4570',
  tiara: 'grey1214',
  porcelain: 'grey1111',
  white: 'white1010'
}

export function updateToV10Colors(
  j: JSCodeshift,
  root: Collection,
  _filePath: string
) {
  let hasModifications = false
  const canvasImport = findImport(j, root, 'canvas', [
    '@instructure/ui',
    '@instructure/ui-themes',
    '@instructure/canvas-theme'
  ])
  const canvasHighContrastImport = findImport(j, root, 'canvasHighContrast', [
    '@instructure/ui',
    '@instructure/ui-themes',
    '@instructure/canvas-high-contrast-theme'
  ])

  if (canvasImport || canvasHighContrastImport) {
    root.find(j.MemberExpression).forEach((path) => {
      const astNode = path.value
      if (
        isIdentifier(astNode.property) &&
        isMemberExpression(astNode.object) &&
        isIdentifier(astNode.object.property) &&
        astNode.property.name in colorMapping
      ) {
        hasModifications = true
        astNode.object.property.name = 'colors?.contrasts?'
        astNode.property.name = colorMapping[astNode.property.name]
      }
    })
    if (!hasModifications) {
      // eslint-disable-next-line no-console
      console.log(
        'Warning: ' + _filePath + ' might need manual replacement of colors'
      )
    }
  }
  return hasModifications
}
