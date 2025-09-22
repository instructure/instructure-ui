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

export type Avatar = {
  backgroundColor: Semantics['background']['base']
  borderColor: Semantics['stroke']['base']
  borderWidthSm: Semantics['borderWidth']['sm']
  borderWidthMd: Semantics['borderWidth']['md']
  boxShadow: {
    x: number
    y: number
    blur: string
    spread: number
    color: string
    type: string
  }
  fontWeight: Semantics['fontWeight']['heading']['strong']
  accent1BackgroundColor: Semantics['background']['accent']['color1']
  accent1IconColor: Semantics['icon']['accent']['color1']
  accent1TextColor: Semantics['text']['accent']['color1']
  accent2BackgroundColor: Semantics['background']['accent']['color2']
  accent2IconColor: Semantics['icon']['accent']['color2']
  accent2TextColor: Semantics['text']['accent']['color2']
  accent3BackgroundColor: Semantics['background']['accent']['color3']
  accent3IconColor: Semantics['icon']['accent']['color3']
  accent3TextColor: Semantics['text']['accent']['color3']
  accent4BackgroundColor: Semantics['background']['accent']['color4']
  accent4IconColor: Semantics['icon']['accent']['color4']
  accent4TextColor: Semantics['text']['accent']['color4']
  accent5BackgroundColor: Semantics['background']['accent']['color5']
  accent5IconColor: Semantics['icon']['accent']['color5']
  accent5TextColor: Semantics['text']['accent']['color5']
  accent6BackgroundColor: Semantics['background']['accent']['color6']
  accent6IconColor: Semantics['icon']['accent']['color6']
  accent6TextColor: Semantics['text']['accent']['color6']
  aiTopGradientColor: Semantics['background']['aiTopGradient']
  aiBottomGradientColor: Semantics['background']['aiBottomGradient']
  aiFontColor: Semantics['text']['onColor']
  size2xs: string
  sizeXs: string
  sizeSm: string
  sizeMd: string
  sizeLg: string
  sizeXl: string
  size2xl: string
}

export default Avatar
