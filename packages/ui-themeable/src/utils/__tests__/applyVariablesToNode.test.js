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

import { applyVariablesToNodeStyle, applyVariablesPolyfillToNode } from '../applyVariablesToNode'

describe('applyVariablesToNode', () => {
  const testbed = new Testbed()
  const variables = { color: 'red' }
  const defaults = { color: 'purple', background: 'white' }
  const prefix = 'ThemeableComponent'

  describe('#applyVariablesToNodeStyle', () => {
    it('applies prefixed css variables as custom properties to the node', () => {
      const domNode = testbed.rootNode

      applyVariablesToNodeStyle(domNode, variables, defaults, prefix)

      expect(domNode.style.getPropertyValue('--ThemeableComponent-color')).to.equal('red')
      expect(domNode.style.getPropertyValue('--ThemeableComponent-background')).to.equal('')
    })
  })

  describe('#applyVariablesPolyfillToNode', () => {
    it('injects scoped styles into the node', () => {
      const domNode = testbed.rootNode
      const template = function (theme) {
        return `
          .ThemeableComponent__root {
            font-family: sans-serif;
            color: ${theme.color};
            background: ${theme.background};
          }
        `
      }
      const scope = 'ThemeableComponent'

      applyVariablesPolyfillToNode(
        domNode,
        variables,
        defaults,
        prefix,
        template,
        scope
      )

      const styleNode = domNode.querySelector('style')

      expect(styleNode).to.exist

      if (styleNode.scoped) {
        expect(styleNode.innerText).to.equalIgnoreSpaces(
          `
          .ThemeableComponent__root {
            font-family: sans-serif;
            color: red;
            background: white;
          }
        `)
      } else {
        expect(styleNode.innerText).to.equalIgnoreSpaces(
          `
          .ThemeableComponent__root[themeablecomponent] {
            font-family: sans-serif;
            color: red;
            background: white;
          }
          `)
        expect(domNode.getAttribute('themeablecomponent')).to.exist
      }
    })
  })
})
