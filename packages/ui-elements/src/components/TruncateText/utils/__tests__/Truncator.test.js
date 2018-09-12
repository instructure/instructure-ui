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
import { truncate } from '../Truncator'

describe('Truncator', () => {
  const defaultText = 'Hello world! This is a long string that should truncate'
  const testbed = new Testbed(
    <div id="truncate-parent" style={{width: '200px'}}>
      <span id="truncate-stage">{defaultText}</span>
    </div>
  )

  it('should truncate text when no options are given', () => {
    testbed.render()

    const stage = document.getElementById('truncate-stage')
    truncate(stage)

    const text = stage.textContent

    expect(text.indexOf('truncate')).to.equal(-1)
    expect(text.indexOf('\u2026')).to.not.equal(-1)
  })

  it('should truncate in the middle of a string', () => {
    testbed.render()

    const stage = document.getElementById('truncate-stage')

    truncate(stage, {position: 'middle'})

    const text = stage.textContent

    expect(text.indexOf('long')).to.equal(-1)
    expect(text.indexOf('Hello')).to.not.equal(-1)
    expect(text.indexOf('truncate')).to.not.equal(-1)
    expect(text.indexOf('\u2026')).to.not.equal(-1)
  })

  it('should truncate at words', () => {
    testbed.render({
      style: {width: '220px'},
    })

    const stage = document.getElementById('truncate-stage')

    truncate(stage, {truncate: 'word'})

    const text = stage.textContent

    expect(text.indexOf('string')).to.equal(-1)
    expect(text.indexOf('st')).to.equal(-1)
    expect(text.indexOf('long')).to.not.equal(-1)
  })

  it('should allow custom ellipsis', () => {
    testbed.render()

    const stage = document.getElementById('truncate-stage')

    truncate(stage, {ellipsis: '(...)'})

    const text = stage.textContent

    expect(text.slice(-5)).to.equal('(...)')
  })

  it('should preserve node structure', () => {
    testbed.render({
      children: (
        <p id="truncate-stage" className="testClass">Hello world! <strong>This is a</strong> long string that <em>should truncate</em></p>
      )
    })

    const stage = document.getElementById('truncate-stage')

    truncate(stage)

    expect(stage.childNodes[1].nodeType).to.equal(1)
    expect(stage.childNodes[2].nodeType).to.equal(3)
    expect(stage.children.length).to.equal(2)
    expect(stage.nodeName).to.equal('P')
    expect(stage.className).to.equal('testClass')
  })

  it('should preserve attributes on nodes', () => {
    testbed.render({
      children: (
        <span id="truncate-stage">
          This is a <a id="text-link" href="http://google.com" className="tester">text link</a> with classes and an href.
        </span>
      )
    })

    const stage = document.getElementById('truncate-stage')

    truncate(stage)

    const link = document.getElementById('text-link')

    expect(link.attributes.length).to.equal(3)
  })

  it('should calculate max width properly', () => {
    const subject = testbed.render({
      id: null,
      style: {width: 'auto'},
      children: (
        <div>
          <span id="text1">{defaultText}</span>
          <div id="truncate-parent" style={{width: '100px'}}>
            <div id="truncate-stage">{defaultText}</div>
          </div>
        </div>
      )
    })

    const stage = document.getElementById('truncate-stage')

    const result = truncate(stage)

    const maxWidth = result.constraints.width
    const actualMax = subject.find('#text1').getDOMNode().getBoundingClientRect().width

    expect(maxWidth).to.equal(actualMax)
  })

  it('should calculate `maxLines: auto` correctly', () => {
    testbed.render({
      style: {width: '50px', height: '180px', lineHeight: 2.8},
      children: (
        <span id="truncate-stage">{defaultText}</span>
      )
    })

    const stage = document.getElementById('truncate-stage')
    const result = truncate(stage, {maxLines: 'auto'})

    const text = stage.textContent

    expect(text).to.not.equal({defaultText})
    expect(text.length).to.not.equal(1)
    expect(result.constraints.lines).to.equal(4)
  })

  it('should calculate height correctly when `maxLines` is not `auto`', () => {
    testbed.render({
      style: {width: '200px', height: '200px', lineHeight: 1.4}
    })

    const stage = document.getElementById('truncate-stage')

    const result = truncate(stage)
    const text = stage.textContent

    expect(text.length).to.not.equal(1)
    expect(result.constraints.height).to.equal(22.4)
  })

  it('should escape node content', () => {
    const log = testbed.spy(console, 'log')
    const content = '"><img src=a onerror=console.log("hello world") />'
    testbed.render({
      style: {width: '1000px', height: '200px'},
      children: (
        <span id="truncate-stage">
          {content}
        </span>
      )
    })

    const stage = document.getElementById('truncate-stage')

    truncate(stage)

    expect(stage.textContent).to.equal(content)
    expect(log).to.not.have.been.calledWith('hello world')
  })
})
