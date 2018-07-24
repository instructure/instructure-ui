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

import px from '@instructure/ui-utils/lib/px'
import jsonToMediaQuery from '../jsonToMediaQuery'

describe('@jsonToMediaQuery', () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
    document.body.appendChild(node)
  })

  afterEach(() => {
    node && node.parentNode && node.parentNode.removeChild(node)
    node = null
  })

  describe('should convert json to properly formatted media queries', () => {
    it('should convert standard query', () => {
        const value = 200
        const query = { minWidth: value }
        expect(jsonToMediaQuery(query)).to.equal(`(min-width: ${value}px)`)
    })

    it('should convert query with px value', () => {
        const value = '10px'
        const query = { maxWidth: value }
        expect(jsonToMediaQuery(query)).to.equal(`(max-width: ${value})`)
    })

    it('should convert query with rem value', () => {
        const value = '50rem'
        const query = { minHeight: value }
        expect(jsonToMediaQuery(query)).to.equal(`(min-height: ${px(value)}px)`)
    })

    it('should convert query with em value', () => {
        node.style.fontSize = '24px'
        const value = '25em'
        const query = { minHeight: value }
        expect(jsonToMediaQuery(query, node)).to.equal(`(min-height: ${px(value, node)}px)`)
    })
  })

  describe('should throw exceptions for invalid queries', () => {
    it('should error if query key is not camel cased', () => {
        let error = false
        try {
          const query = { maxwidth: 20 }
          jsonToMediaQuery(query)
        } catch (e) {
          error = true
        }

        expect(error).to.be.true
    })

    it('should error if query has more than one key', () => {
      let error = false
      try {
        const query = { maxWidth: 20, minWidth: 30 }
        jsonToMediaQuery(query)
      } catch (e) {
        error = true
      }

      expect(error).to.be.true
    })

    it('should error if query value is not a string or number', () => {
      let error = false
      try {
        const query = { maxWidth: ['20px', '19px'] }
        jsonToMediaQuery(query)
      } catch (e) {
        error = true
      }

      expect(error).to.be.true
    })

    it('should error if query has no value', () => {
      let error = false
      try {
        const query = { maxWidth: '' }
        jsonToMediaQuery(query)
      } catch (e) {
        error = true
      }

      expect(error).to.be.true
    })
  })
})
