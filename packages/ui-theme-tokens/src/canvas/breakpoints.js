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

const onePixel = 0.0625

// base = 16px
const values = {
  xxSmall: 8, // 128px
  xSmall: 16, // 256px
  small: 30, // 480px
  medium: 48, // 768px
  large: 62, // 992px
  xLarge: 75 // 1200px
}

const breakpoints = Object.freeze({
  xxSmall: `${values.xxSmall}em`,
  xSmall: `${values.xSmall}em`,
  small: `${values.small}em`,
  medium: `${values.medium}em`,
  large: `${values.large}em`,
  xLarge: `${values.xLarge}em`,
  maxWidth: `${values.large - onePixel}em`
})

export default breakpoints
export { breakpoints }
