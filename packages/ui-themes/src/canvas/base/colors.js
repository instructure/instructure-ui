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

export default Object.freeze({
  // These need to meet 3:1 contrast requirements when used as text against background
  // colors white or when used as a background with text colors white
  brand: '#008EE2',
  electric: '#008EE2',
  shamrock: '#00AC18',
  barney: '#BF32A4',
  crimson: '#EE0612',
  fire: '#FC5E13',

  // these need to meet 3:1 contrast as background with text colors porcelain and white
  // or as text with background porcelain and white
  licorice: '#2D3B45',
  oxford: '#394B58',

  // should meet 3:1 contrast as text with background colors porcelain and white
  // and as background color with text colors porcelain and white
  slate: '#73818C',

  // This needs to meet 3:1 contrast requirements when used as text against background
  // color white or when used as a background with text color white
  ash: '#8B969E',

  tiara: '#C7CDD1', // used only for borders (where contrast with text isn't an issue)

  // these need to meet 3:1 contrast as background with text colors oxford and licorice
  // and as text with backround colors oxford and licorice
  porcelain: '#F5F5F5',
  white: '#FFFFFF'
})
