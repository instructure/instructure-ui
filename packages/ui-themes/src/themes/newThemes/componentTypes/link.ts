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

import type { Semantics } from '../canvas/semantics'

export type Link = {
  textColor: Semantics['text']['interactive']['primary']['base']
  textHoverColor: Semantics['text']['interactive']['primary']['hover']
  textDisabledColor: Semantics['text']['interactive']['disabled']['base']
  iconColor: Semantics['icon']['interactive']['primary']['base']
  iconHoverColor: Semantics['icon']['interactive']['primary']['hover']
  iconDisabledColor: Semantics['icon']['interactive']['disabled']['base']
  onColorTextColor: Semantics['text']['interactive']['primaryOnColor']['base']
  onColorTextHoverColor: Semantics['text']['interactive']['primaryOnColor']['hover']
  onColorTextDisabledColor: Semantics['text']['interactive']['disabled']['onColor']
  onColorIconColor: Semantics['icon']['interactive']['primaryOnColor']['base']
  onColorIconHoverColor: Semantics['icon']['interactive']['primaryOnColor']['hover']
  onColorIconDisabledColor: Semantics['icon']['interactive']['disabled']['onColor']
  fontSizeSm: Semantics['fontSize']['textSm']
  fontSizeMd: Semantics['fontSize']['textBase']
  fontSizeLg: Semantics['fontSize']['text2xl']
  fontWeight: Semantics['fontWeight']['body']['base']
  spaceBetweenElementsMd: Semantics['spacing']['spaceXs']
  spaceBetweenElementsLg: Semantics['spacing']['spaceXs']
  spaceBetweenElementsSm: Semantics['spacing']['space2xs']
  lineHeightSm: Semantics['lineHeight']['standalone']['textSm']
  lineHeightMd: Semantics['lineHeight']['standalone']['textBase']
  lineHeightLg: Semantics['lineHeight']['standalone']['text2xl']
}

export default Link
