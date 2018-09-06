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

import mirrorPlacement, {
  mirrorHorizontalPlacement,
  executeMirrorFunction
} from '../mirrorPlacement'

describe('@mirrorPlacement', () => {
  describe('executeMirrorFunction', () => {
    const mirrorFunction = (first, second) => {
      return [first, second]
    }

    it('accepts input as a string or array', () => {
      expect(executeMirrorFunction('start center', mirrorFunction, ' ')).to.equal('start center')
      expect(executeMirrorFunction(['start', 'center'], mirrorFunction, ' ')).to.equal('start center')
    })

    it('returns array of values when delimiter is not provided', () => {
      const result = executeMirrorFunction('start center', mirrorFunction)
      expect(Array.isArray(result)).to.be.true()
      expect(result.length).to.equal(2)
      expect(result[0]).to.equal('start')
      expect(result[1]).to.equal('center')
    })

    it('returns a string when delimiter is provided', () => {
      const result = executeMirrorFunction('start center', mirrorFunction, ' ')
      expect(typeof result === 'string').to.be.true()
      expect(result).to.equal('start center')
    })

    it('joins with correct delimeter', () => {
      expect(executeMirrorFunction('end bottom', mirrorFunction, ' ')).to.equal('end bottom')
      expect(executeMirrorFunction('end bottom', mirrorFunction, '-')).to.equal('end-bottom')
      expect(executeMirrorFunction('end bottom', mirrorFunction, '__')).to.equal('end__bottom')
    })
  })

  describe('mirrorPlacement', () => {
    it('correctly mirrors values', () => {
      expect(mirrorPlacement('start', ' ')).to.equal('end')
      expect(mirrorPlacement('top', ' ')).to.equal('bottom')
      expect(mirrorPlacement('end bottom', ' ')).to.equal('start bottom')
      expect(mirrorPlacement('top start', ' ')).to.equal('bottom start')
      expect(mirrorPlacement('center end', ' ')).to.equal('center end')
      expect(mirrorPlacement('bottom start', ' ')).to.equal('top start')
      expect(mirrorPlacement('offscreen', ' ')).to.equal('offscreen')
      expect(mirrorPlacement('top stretch', ' ')).to.equal('bottom stretch')
      expect(mirrorPlacement('end stretch', ' ')).to.equal('start stretch')
    })
  })

  describe('mirrorHorizontalPlacement', () => {
    it('correctly mirrors values', () => {
      expect(mirrorHorizontalPlacement('start', ' ')).to.equal('end')
      expect(mirrorHorizontalPlacement('top', ' ')).to.equal('top')
      expect(mirrorHorizontalPlacement('end bottom', ' ')).to.equal('start bottom')
      expect(mirrorHorizontalPlacement('top start', ' ')).to.equal('top end')
      expect(mirrorHorizontalPlacement('center end', ' ')).to.equal('center start')
      expect(mirrorHorizontalPlacement('bottom start', ' ')).to.equal('bottom end')
      expect(mirrorHorizontalPlacement('offscreen', ' ')).to.equal('offscreen')
      expect(mirrorHorizontalPlacement('top stretch', ' ')).to.equal('top stretch')
      expect(mirrorHorizontalPlacement('end stretch', ' ')).to.equal('start stretch')
    })
  })
})
