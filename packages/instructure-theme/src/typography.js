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

const typography = Object.freeze({
  fontFamily: `"Proxima Nova", "Nunito Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
  "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
  "Helvetica Neue", sans-serif`,
  fontFamilyDisplay: '"Georgia", "Proxima Nova", sans-serif',
  fontFamilyMonospace: 'Menlo, Consolas, Monaco, "Andale Mono", monospace',

  fontSizeXSmall: '0.75rem',
  fontSizeSmall: '0.875rem',
  fontSizeMedium: '1rem',
  fontSizeLarge: '1.25rem',
  fontSizeXLarge: '2.25rem',
  fontSizeXXLarge: '3rem',

  fontWeightLight: 300,
  fontWeightNormal: 400,
  fontWeightBold: 700,

  lineHeight: 1.5,
  lineHeightFit: 1.125,
  lineHeightCondensed: 1.25,
  lineHeightDouble: 2,

  letterSpacingNormal: 0,
  letterSpacingCondensed: '-0.0625rem',
  letterSpacingExpanded: '0.0625rem'
})

export default typography
export { typography }
