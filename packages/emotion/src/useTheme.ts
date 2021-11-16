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

import { useTheme as useEmotionTheme } from '@emotion/react'
import { canvas } from '@instructure/ui-themes'
import { isEmpty } from '@instructure/ui-utils'

import type { ThemeOrOverride } from './EmotionTypes'

/**
 * ---
 * private: true
 * ---
 * A hook that will return the currently applied theme object from the nearest Context.
 * If there is no theme provided to the Context it will return the default `canvas` theme.
 * @returns {object} the theme object
 */
const useTheme = () => {
  let theme = useEmotionTheme() as ThemeOrOverride
  if (isEmpty(theme)) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        `No theme provided for [InstUISettingsProvider], using default <canvas> theme.`
      )
    }
    theme = canvas
  }
  return theme
}

export default useTheme
export { useTheme }
