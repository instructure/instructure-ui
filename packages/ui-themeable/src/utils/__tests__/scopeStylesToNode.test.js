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

import scopeStylesToNode, { scopeCssText } from '../scopeStylesToNode'

describe('scopeStylesToNode', () => {
  const cssText = `
    .root{
      color: red;
    }
    .background{
      background-color: purple;
    }
  `

  const scopedCss = `
    .root[foo] {
      color: red;
    }
    .background[foo] {
      background-color: purple;
    }
  `

  describe('#scopeStylesToNode', () => {
    const testbed = new Testbed()
    it('should apply scoped css to node', () => {
      const domNode = testbed.rootNode

      scopeStylesToNode(domNode, cssText, 'Foo')

      const styleNode = domNode.querySelector('style')

      if (styleNode.scoped) {
        expect(styleNode.innerText).to.equalIgnoreSpaces(cssText)
      } else {
        expect(styleNode.innerText).to.equalIgnoreSpaces(scopedCss)
        expect(domNode.getAttribute('foo')).to.exist
      }
    })
    it('should remove scoped css from node', () => {
      const domNode = testbed.rootNode

      scopeStylesToNode(domNode, cssText, 'Foo')
      scopeStylesToNode(domNode, '', 'Foo')

      const styleNode = domNode.querySelector('style')

      expect(styleNode).to.not.exist
      expect(domNode.getAttribute('foo')).to.not.exist
    })
  })

  describe('#scopeCssText', () => {
    it('scopes css text', () => {
      expect(scopeCssText(cssText, '[foo]'))
        .to.equalIgnoreSpaces(scopedCss)
    })
    it('should not apply scope to rules with a keyframes selector', () => {
      const cssText = `
        @keyframes contentAnimation {
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
      `
      expect(scopeCssText(cssText, '[foo]'))
        .to.equalIgnoreSpaces(cssText)
    })
    it('should apply scope to rules with a media query selector', () => {
      const cssText = `
      @media screen and (--Component-largeMin) {
        .Component__root {
          color: blue;
          background-color: var(--Component-backgroundColor);
        }
      }
      `
      const scopedCss = `
      @media screen and (--Component-largeMin) {
        .Component__root[foo] {
          color: blue;
          background-color: var(--Component-backgroundColor);
        }
      }
      `
      expect(scopeCssText(cssText, '[foo]'))
        .to.equalIgnoreSpaces(scopedCss)
    })
    it('should not apply scope to rules with a root selector', () => {
      const cssText = `
      html[dir="rtl"] .Component__root {
        color: blue;
        background-color: var(--Component-backgroundColor);
      }
      `
      const scopedCss = `
      html[dir="rtl"] .Component__root[foo] {
        color: blue;
        background-color: var(--Component-backgroundColor);
      }
      `
      expect(scopeCssText(cssText, '[foo]'))
        .to.equalIgnoreSpaces(scopedCss)
    })
  })
})
