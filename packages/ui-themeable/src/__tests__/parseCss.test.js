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

import { expect } from '@instructure/ui-test-utils'
import { parseCss, ruleTypes } from '../parseCss'

describe('parseCss', () => {
  const cssText = `
    .Component__root {
      color: var(--Component-textColor);
    }
    .Component__background {
      background-color: var(--Component-backgroundColor);
    }
    @keyframes animation {
      to {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
    }
    @media screen and (--Component-mediumMin) {
      .Component__root {
        color: var(--Component-textColor);
      }
    }
  `
  describe('#parseCss', () => {
    it('should parse', () => {
      const result = parseCss(cssText)

      expect(result.rules.length).to.equal(4)
      expect(result.rules[0].cssText).to.equal(
        'color: var(--Component-textColor);'
      )
      expect(result.rules[0].selector).to.equal('.Component__root')
      expect(result.rules[0].type).to.equal(ruleTypes.style)

      expect(result.rules[2].rules.length).to.equal(1)
      expect(result.rules[2].type).to.equal(ruleTypes.keyframes)
      expect(result.rules[2].rules[0].parent.type).to.equal(ruleTypes.keyframes)

      expect(result.rules[3].type).to.equal(ruleTypes.media)
      expect(result.rules[3].rules.length).to.equal(1)
    })
  })
})
