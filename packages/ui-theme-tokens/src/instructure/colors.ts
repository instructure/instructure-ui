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

import { functionalColors } from '../utils/functionalColors'

const values = {
  brand: '#287A9F',
  link: '#287A9F',
  electric: '#287A9F',
  shamrock: '#3D997E',
  barney: '#5B5B5B',
  crimson: '#EA2127',
  fire: '#E17909',
  licorice: '#28282A',
  oxford: '#5B5B5B',
  ash: '#6E6E6E',
  slate: '#6E6E6E',
  tiara: '#CCCCCC',
  porcelain: '#F0F2F3',
  white: '#FFFFFF'
}

// Two Inst colors are not accessible, so adding them for display purposes only
// in decorative elements
const appendInaccessibleColors = {
  ...functionalColors(values),
  inaccessibleAlert: '#fccb0e',
  inaccessibleWarning: '#f68e1f'
}

const colors = Object.freeze(appendInaccessibleColors)

export default colors
export { colors }
