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
import TruncateText from '../index'
import Text from '../../Text'

describe('<TruncateText />', () => {
  const defaultText = 'Hello world! This is a long string that should truncate'
  const testbed = new Testbed(
    <div style={{width: '200px'}}>
      <TruncateText>{defaultText}</TruncateText>
    </div>
  )

  it('should render', () => {
    const subject = testbed.render()

    expect(subject).to.be.present()
  })

  it('should truncate text', () => {
    const subject = testbed.render()
    const tt = subject.find('TruncateText')

    const text = tt.text()

    expect(text.indexOf('truncate')).to.equal(-1)
    expect(text.indexOf('\u2026')).to.not.equal(-1)
  })

  it('should recalculate when parent width changes', () => {
    const subject = testbed.render()
    const tt = subject.find('TruncateText')

    const text1 = tt.text()

    subject.getDOMNode().style.width = '100px'
    testbed.tick()

    const text2 = tt.text()

    expect(text1).to.not.equal(text2)

    subject.getDOMNode().style.width = '400px'
    testbed.tick()

    const text3 = tt.text()
    expect(text2).to.not.equal(text3)
  })

  it('should preserve node structure', () => {
    const subject = testbed.render({
      children: (
        <TruncateText>
          <p className="testClass">Hello world! <strong>This is a</strong> long string that <em>should truncate</em></p>
        </TruncateText>
      )
    })
    const p = subject.unwrap().children[0].firstChild

    expect(p.childNodes[1].nodeType).to.equal(3)
    expect(p.childNodes[3].nodeType).to.equal(1)
    expect(p.children.length).to.equal(3)
    expect(p.nodeName).to.equal('P')
    expect(p.className).to.equal('testClass')
  })

  it('should recalculate if props change', (done) => {
    const subject = testbed.render()
    testbed.tick()

    const text1 = subject.find('TruncateText').text()

    subject.setProps({
      children: (
        <TruncateText position="middle" ellipsis="(...)">{defaultText}</TruncateText>
      )
    }, () => {
      testbed.defer(() => { // wait for re-render
        testbed.tick()
        const text2 = subject.find('TruncateText').text()
        expect(text1).to.not.equal(text2)
        done()
      })
    })
  })

  it('should call onUpdate when text changes', () => {
    const onUpdate = testbed.stub()
    const subject = testbed.render({
      style: {width: '700px'},
      children: (
        <TruncateText onUpdate={onUpdate}>{defaultText}</TruncateText>
      )
    })

    testbed.tick()
    expect(onUpdate).to.not.have.been.called()

    subject.getDOMNode().style.width = '100px'

    testbed.tick()
    expect(onUpdate).to.have.been.calledWith(true)

    subject.getDOMNode().style.width = '800px'

    testbed.tick()
    expect(onUpdate).to.have.been.calledWith(false)
  })

  it('should warn if children prop receives too deep of a node tree', () => {
    const warning = testbed.spy(console, 'warn')

    testbed.render({
      children: (
        <TruncateText>
          Hello world! <strong><span>This is a</span></strong> long string that should truncate
        </TruncateText>
      )
    })

    expect(
      warning.lastCall.args[0].includes('Some children are too deep in the node tree and will not render.')
    ).to.be.true()
  })

  it('should render text at any size with no lineHeight set', () => {
    testbed.render({
      style: {lineHeight: 'normal'},
      children: (
        <span id="stage">
          <Text size="x-small">
            <TruncateText>xsmall</TruncateText>
          </Text>
          <Text size="small">
            <TruncateText>small</TruncateText>
          </Text>
          <Text size="medium">
            <TruncateText>medium</TruncateText>
          </Text>
          <Text size="large">
            <TruncateText>large</TruncateText>
          </Text>
          <Text size="x-large">
            <TruncateText>xlarge</TruncateText>
          </Text>
          <Text size="xx-large">
            <TruncateText>xxlarge</TruncateText>
          </Text>
        </span>
      )
    })
    const stage = document.getElementById('stage')
    expect(stage.textContent).to.equal('xsmallsmallmediumlargexlargexxlarge')
  })

  it('should meet a11y standards', (done) => {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: []
    })
  })
})
