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

import { getCssTextWithPolyfill, getCssTextWithVariables } from '../getCssText'

describe('getCssText', () => {
  const prefix = 'ThemeableComponent'

  describe('#getCssTextWithVariables', () => {
    it('namespaces variable names and appends the defaults', () => {
      const template = function (theme) {
        return `
          .ThemeableComponent__root {
            color: ${theme.color};
            background: ${theme.background};
          }
        `
      }
      const variables = { color: 'purple', background: 'white' }

      expect(getCssTextWithVariables(template, variables, prefix))
        .to.equalIgnoreSpaces(`
          .ThemeableComponent__root {
            color: var(--ThemeableComponent-color);
            background: var(--ThemeableComponent-background);
          }
          :root {
            --ThemeableComponent-color: purple;
            --ThemeableComponent-background: white;
          }
        `)
    })
    it('replaces custom media with values', () => {
      const template = function (theme) {
        return `
          .ThemeableComponent__root {
            @media screen and (--largeMin) {
              width: 100%;
            }
          }

          @media screen and (--largeMin) {
            .ThemeableComponent__root {
              width: 100%;
            }
          }
        `
      }
      const variables = { largeMin: 'min-width: 62em' }
      expect(getCssTextWithVariables(template, variables, prefix))
        .to.equalIgnoreSpaces(`
          .ThemeableComponent__root {
            @media screen and (min-width: 62em) {
              width: 100%;
            }
          }

          @media screen and (min-width: 62em) {
            .ThemeableComponent__root {
              width: 100%;
            }
          }

          :root {
            --ThemeableComponent-largeMin: min-width: 62em;
          }
        `)
    })
  })

  describe('#getCssTextWithPolyfill', () => {
    it('inserts default values', () => {
      const template = function (theme) {
        return `
          .ThemeableComponent__root {
            color: ${theme.color};
            background: ${theme.background};
          }
        `
      }
      const variables = { color: 'purple', background: 'white' }

      expect(getCssTextWithPolyfill(template, variables))
        .to.equalIgnoreSpaces(`
          .ThemeableComponent__root {
            color: purple;
            background: white;
          }
        `)
    })
    it('replaces custom media with values', () => {
      const template = function (theme) {
        return `
          .ThemeableComponent__root {
            @media screen and (--largeMin) {
              width: 100%;
            }
          }
        `
      }
      const variables = { largeMin: 'min-width: 62em' }
      expect(getCssTextWithPolyfill(template, variables))
        .to.equalIgnoreSpaces(`
          .ThemeableComponent__root {
            @media screen and (min-width: 62em) {
              width: 100%;
            }
          }
        `)
    })
  })
})
