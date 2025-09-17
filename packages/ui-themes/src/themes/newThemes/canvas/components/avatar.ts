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

import semantics from '../semantics.js'
import type { Semantics } from '../semantics.js'

export type Avatar = {
  background: Semantics['background']['base']
  border: Semantics['stroke']['base']
  borderWidthSm: Semantics['borderWidth']['sm']
  BorderWidthMd: Semantics['borderWidth']['md']
  boxShadow: {
    x: number
    y: number
    blur: string
    spread: number
    color: string
    type: string
  }
  fontWeight: Semantics['fontWeight']['heading']['strong']
  accent1Background: Semantics['background']['accent']['color1']
  accent1Icon: Semantics['icon']['accent']['color1']
  accent1Text: Semantics['text']['accent']['color1']
  accent2Background: Semantics['background']['accent']['color2']
  accent2Icon: Semantics['icon']['accent']['color2']
  accent2Text: Semantics['text']['accent']['color2']
  accent3Background: Semantics['background']['accent']['color3']
  accent3Icon: Semantics['icon']['accent']['color3']
  accent3Text: Semantics['text']['accent']['color3']
  accent4Background: Semantics['background']['accent']['color4']
  accent4Icon: Semantics['icon']['accent']['color4']
  accent4Text: Semantics['text']['accent']['color4']
  accent5Background: Semantics['background']['accent']['color5']
  accent5Icon: Semantics['icon']['accent']['color5']
  accent5Text: Semantics['text']['accent']['color5']
  accent6Background: Semantics['background']['accent']['color6']
  accent6Icon: Semantics['icon']['accent']['color6']
  accent6text: Semantics['text']['accent']['color6']
  aiTopGradient: Semantics['background']['aiTopGradient']
  aiBottomGradient: Semantics['background']['aiBottomGradient']
  aiFont: Semantics['text']['onColor']
  size2xs: string
  sizeXs: string
  sizeSm: string
  sizeMd: string
  sizeLg: string
  sizeXl: string
  size2xl: string
}

const avatar: Avatar = {
  background: semantics.background.base,
  border: semantics.stroke.base,
  borderWidthSm: semantics.borderWidth.sm,
  BorderWidthMd: semantics.borderWidth.md,
  boxShadow: {
    x: 0,
    y: 0,
    blur: '1rem',
    spread: 0,
    color: 'rgba(45,59,69,0.12)',
    type: 'innerShadow'
  },
  fontWeight: semantics.fontWeight.heading.strong,
  accent1Background: semantics.background.accent.color1,
  accent1Icon: semantics.icon.accent.color1,
  accent1Text: semantics.text.accent.color1,
  accent2Background: semantics.background.accent.color2,
  accent2Icon: semantics.icon.accent.color2,
  accent2Text: semantics.text.accent.color2,
  accent3Background: semantics.background.accent.color3,
  accent3Icon: semantics.icon.accent.color3,
  accent3Text: semantics.text.accent.color3,
  accent4Background: semantics.background.accent.color4,
  accent4Icon: semantics.icon.accent.color4,
  accent4Text: semantics.text.accent.color4,
  accent5Background: semantics.background.accent.color5,
  accent5Icon: semantics.icon.accent.color5,
  accent5Text: semantics.text.accent.color5,
  accent6Background: semantics.background.accent.color6,
  accent6Icon: semantics.icon.accent.color6,
  accent6text: semantics.text.accent.color6,
  aiTopGradient: semantics.background.aiTopGradient,
  aiBottomGradient: semantics.background.aiBottomGradient,
  aiFont: semantics.text.onColor,
  size2xs: '1.5 rem',
  sizeXs: '2 rem',
  sizeSm: '2.5 rem',
  sizeMd: '3 rem',
  sizeLg: '3.5 rem',
  sizeXl: '4 rem',
  size2xl: '5rem'
}
export default avatar
