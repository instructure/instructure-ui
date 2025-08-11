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
  borderColor: Semantics['stroke']['base']
  borderWidthSmall: Semantics['borderWidth']['sm']
  BorderWidthMedium: Semantics['borderWidth']['md']
  boxShadow: {
    x: number
    y: number
    blur: string
    spread: number
    color: string
    type: string
  }
  fontFamily: Semantics['fontFamily']['heading']
  fontWeight: Semantics['fontWeight']['heading']['strong']
  color: Semantics['background']['interactive']['primary']['base']
  colorShamrock: Semantics['icon']['success']
  colorBarney: Semantics['icon']['info']
  colorCrimson: Semantics['icon']['error']
  colorFire: Semantics['icon']['warning']
  colorLicorice: Semantics['icon']['base']
  colorAsh: Semantics['icon']['muted']
  aiTopGradientColor: Semantics['background']['aiTopGradient']
  aiBottomGradientColor: Semantics['background']['aiBottomGradient']
  aiFontColor: Semantics['text']['onColor']
}

const avatar: Avatar = {
  background: semantics.background.base,
  borderColor: semantics.stroke.base,
  borderWidthSmall: semantics.borderWidth.sm,
  BorderWidthMedium: semantics.borderWidth.md,
  boxShadow: {
    x: 0,
    y: 0,
    blur: '1rem',
    spread: 0,
    color: 'rgba(45,59,69,0.12)',
    type: 'innerShadow'
  },
  fontFamily: semantics.fontFamily.heading,
  fontWeight: semantics.fontWeight.heading.strong,
  color: semantics.background.interactive.primary.base,
  colorShamrock: semantics.icon.error,
  colorBarney: semantics.icon.info,
  colorCrimson: semantics.icon.error,
  colorFire: semantics.icon.warning,
  colorLicorice: semantics.icon.base,
  colorAsh: semantics.icon.muted,
  aiTopGradientColor: semantics.background.aiTopGradient,
  aiBottomGradientColor: semantics.background.aiBottomGradient,
  aiFontColor: semantics.text.onColor
}
export default avatar
