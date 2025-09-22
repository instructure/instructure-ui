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
import type { Avatar } from '../../componentTypes/avatar.js'

const avatar: Avatar = {
  backgroundColor: semantics.background.base,
  borderColor: semantics.stroke.base,
  borderWidthSm: semantics.borderWidth.sm,
  borderWidthMd: semantics.borderWidth.md,
  boxShadow: {
    x: 0,
    y: 0,
    blur: '1rem',
    spread: 0,
    color: 'rgba(45,59,69,0.12)',
    type: 'innerShadow'
  },
  fontWeight: semantics.fontWeight.heading.strong,
  accent1BackgroundColor: semantics.background.accent.color1,
  accent1IconColor: semantics.icon.accent.color1,
  accent1TextColor: semantics.text.accent.color1,
  accent2BackgroundColor: semantics.background.accent.color2,
  accent2IconColor: semantics.icon.accent.color2,
  accent2TextColor: semantics.text.accent.color2,
  accent3BackgroundColor: semantics.background.accent.color3,
  accent3IconColor: semantics.icon.accent.color3,
  accent3TextColor: semantics.text.accent.color3,
  accent4BackgroundColor: semantics.background.accent.color4,
  accent4IconColor: semantics.icon.accent.color4,
  accent4TextColor: semantics.text.accent.color4,
  accent5BackgroundColor: semantics.background.accent.color5,
  accent5IconColor: semantics.icon.accent.color5,
  accent5TextColor: semantics.text.accent.color5,
  accent6BackgroundColor: semantics.background.accent.color6,
  accent6IconColor: semantics.icon.accent.color6,
  accent6TextColor: semantics.text.accent.color6,
  aiTopGradientColor: semantics.background.aiTopGradient,
  aiBottomGradientColor: semantics.background.aiBottomGradient,
  aiFontColor: semantics.text.onColor,
  size2xs: '1.5 rem',
  sizeXs: '2 rem',
  sizeSm: '2.5 rem',
  sizeMd: '3 rem',
  sizeLg: '3.5 rem',
  sizeXl: '4 rem',
  size2xl: '5rem'
}
export default avatar
