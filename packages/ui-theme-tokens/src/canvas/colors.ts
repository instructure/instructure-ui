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
import { BaseColors, Colors } from '@instructure/shared-types'

const baseColors: BaseColors = {
  brand: '#0390E2',
  link: '#0390E2',
  electric: '#0390E2',
  shamrock: '#009E15',
  barney: '#CF44B6',
  crimson: '#FA4242',
  fire: '#FC7C40',
  licorice: '#F5F5F5',
  oxford: '#C7CDD1',
  ash: '#6B7780',
  slate: '#8B969E',
  tiara: '#2D3B45',
  porcelain: '#232D34',
  white: '#212121'
}

const colors: Colors = Object.freeze(functionalColors(baseColors))
export default colors
export { colors }
