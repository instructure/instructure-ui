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

import { Typography } from '@instructure/shared-types'

const typography: Typography = Object.freeze<Typography>({
  fontFamily: 'LatoWeb, Lato, "Helvetica Neue", Helvetica, Arial, sans-serif',
  fontFamilyMonospace: 'Menlo, Consolas, Monaco, "Andale Mono", monospace',

  letterSpacingNormal: 0,
  letterSpacingCondensed: '-0.0625rem',
  letterSpacingExpanded: '0.0625rem',

  // deprecated values

  fontSizeXSmall: '0.75rem', // 12px
  fontSizeSmall: '0.875rem', // 14px
  fontSizeMedium: '1rem', // 16px
  fontSizeLarge: '1.375rem', // 22px
  fontSizeXLarge: '1.75rem', // 28px
  fontSizeXXLarge: '2.375rem', // 38px

  fontWeightLight: 300,
  fontWeightNormal: 400,
  fontWeightBold: 700,

  lineHeight: 1.5, // 24px
  lineHeightFit: 1.125,
  lineHeightCondensed: 1.25,
  lineHeightDouble: 2,

  // new values
  titlePageDesktop: '2.25rem',
  titlePageMobile: '2rem',
  titleSection: '1.75rem',
  titleModule: '1.5rem',
  titleCardLarge: '1.5rem',
  titleCardRegular: '1.25rem',
  titleCardMini: '1rem',
  descriptionPage: '1.25rem',
  descriptionSection: '1rem',
  label: '1rem',
  content: '1rem',
  contentSmall: '0.875rem',
  legend: '0.75rem',

  lineHeight100: 1,
  lineHeight125: 1.25,
  lineHeight150: 1.5,
  weightRegular: 400,
  weightImportant: 700
})

export default typography
export { typography }
