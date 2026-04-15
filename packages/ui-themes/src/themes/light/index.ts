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

import legacySharedThemeTokens from '../../legacySharedThemeTokens'
import { colors } from '../canvas/colors'
import { light } from '../newThemeTokens'
import { Theme } from '../../index'

import type { Colors } from '@instructure/shared-types'
import type { Light } from '../newThemeTokens'

const key = 'light'

export type LightTheme = Theme<Light, 'light'> &
  typeof legacySharedThemeTokens & { colors: Colors }

const theme: LightTheme = {
  newTheme: light,
  key,
  description:
    'Pre v11_7 components will fall back to the canvas theme! This theme meets WCAG 2.1 AA rules for color contrast.',
  // This is needed so 11.6 component don't break when using this theme.
  // They will default to the 'canvas' theme
  ...legacySharedThemeTokens,
  colors
}

export default theme
