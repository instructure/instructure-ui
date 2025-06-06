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
import { canvas, canvasHighContrast, canvasThemeLocal } from '..'
import '@testing-library/jest-dom'
import { ThemeRegistry } from '@instructure/theme-registry'

const themes = [canvas, canvasHighContrast]

describe('themes are backwards compatible', () => {
  it('Local themes are not affected by ".use()"', async () => {
    canvas.use({
      overrides: {
        colors: {
          primitives: {
            white: 'blue'
          }
        }
      }
    })
    expect(ThemeRegistry.getCurrentTheme()?.colors?.primitives?.white).toEqual(
      'blue'
    )
    expect(canvasThemeLocal?.colors?.primitives?.white).toEqual('#FFFFFF')
  })

  describe("should be able to access theme variables with 'theme.variables.x'", () => {
    for (const theme of themes) {
      it(`${theme.key}`, () => {
        const brandColor = theme.colors.contrasts.white1010

        expect(brandColor).toBeDefined()
        expect(brandColor).not.toBe('')
      })
    }
  })

  describe("should be able to access theme variables with 'theme.x'", () => {
    for (const theme of themes) {
      it(`${theme.key}`, () => {
        const brandColor = theme.colors.contrasts.white1010

        expect(brandColor).toBeDefined()
        expect(brandColor).not.toBe('')
      })
    }
  })
})
