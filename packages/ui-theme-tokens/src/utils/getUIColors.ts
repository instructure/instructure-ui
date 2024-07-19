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

import type { Contrasts } from '@instructure/shared-types'

export const getUIColors = (contrasts: Contrasts) => ({
  surfacePagePrimary: contrasts?.white1010,
  surfacePageSecondary: contrasts?.grey1111,
  surfaceCardPrimary: contrasts?.white1010,
  surfaceCardSecondary: contrasts?.grey1111,
  surfaceDark: contrasts?.grey100100,

  textTitle: contrasts?.grey125125,
  textDescription: contrasts?.grey125125,
  textBody: contrasts?.grey125125,
  textTimestamp: contrasts?.grey5782,
  textAuthor: contrasts?.grey5782,
  textDatapoint: contrasts?.grey5782,
  textLink: contrasts?.blue4570,
  textPlaceholder: contrasts?.grey2424,
  textSuccess: contrasts?.green4570,
  textWarning: contrasts?.orange4570,
  textError: contrasts?.red4570,

  stroke: contrasts?.grey1424,
  divider: contrasts?.grey1214
})

export default getUIColors
