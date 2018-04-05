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

import React from 'react'
import measureText from '../measureText'

describe('measureText', () => {
  const testbed = new Testbed(
    <div id="measure-stage">Lorem ipsum <span>DOLOR SIT AMET.</span></div>
  )

  const getNodes = (root) => {
    let arr = []
    for (let i = 0; i < root.childNodes.length; i++) {
      const node = root.childNodes[i]
      if (node.nodeType === 1 || node.nodeType === 3) {
        arr.push(node)
      }
    }
    return arr
  }

  it('should calculate width', () => {
    testbed.render()
    const stage = document.getElementById('measure-stage')
    const nodes = getNodes(stage)

    const width = measureText(nodes, stage)
    expect(width).to.not.equal(0)
  })

  it('should account for different nodes', (done) => {
    const subject = testbed.render()

    const stage = document.getElementById('measure-stage')
    const nodes = getNodes(stage)

    const width = measureText(nodes, stage)

    subject.setProps({
      children: 'Lorem ipsum DOLOR SIT AMET.'
    }, () => {
      testbed.defer(() => { // wait for re-render
        testbed.tick()
        const nodes = getNodes(stage)
        const width2 = measureText(nodes, stage)
        expect(Math.floor(width)).to.equal(Math.floor(width2))
        done()
      })
    })
  })

  it('should account for font size styles', (done) => {
    const subject = testbed.render()

    const stage = document.getElementById('measure-stage')
    const nodes = getNodes(stage)

    const width = measureText(nodes, stage)

    subject.setProps({
      style: {fontSize: '24px'}
    }, () => {
      testbed.defer(() => { // wait for re-render
        testbed.tick()
        const width2 = measureText(nodes, stage)
        expect(width).to.not.equal(width2)
        done()
      })
    })
  })

  it('should account for letter spacing styles', (done) => {
    const subject = testbed.render()

    const stage = document.getElementById('measure-stage')
    const nodes = getNodes(stage)

    const width = measureText(nodes, stage)

    subject.setProps({
      style: {letterSpacing: '5px'}
    }, () => {
      testbed.defer(() => { // wait for re-render
        testbed.tick()
        const width2 = measureText(nodes, stage)
        expect(width).to.not.equal(width2)
        done()
      })
    })
  })
})
