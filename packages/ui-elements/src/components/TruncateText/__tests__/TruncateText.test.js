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
import { expect, mount, spy, stub, wait, within } from '@instructure/ui-test-utils'

import TruncateText from '../index'
import Text from '../../Text'

describe('<TruncateText />', async () => {
  const defaultText = 'Hello world! This is a long string that should truncate'

  it('should truncate text', async () => {
    const subject = await mount(
      <div style={{width: '200px'}}>
        <TruncateText>{defaultText}</TruncateText>
      </div>
    )

    const renderedContent = within(subject.getDOMNode())
    const text = renderedContent.getTextContent()

    expect(text.indexOf('truncate')).to.equal(-1)
    expect(text.indexOf('\u2026')).to.not.equal(-1)
  })

  it('should recalculate when parent width changes', async () => {
    let container
    const subject = await mount(
      <div style={{width: '200px'}} componentRef={(el) => { container = el }}>
        <TruncateText>{defaultText}</TruncateText>
      </div>
    )

    const renderedContent = within(subject.getDOMNode())
    const text1 = renderedContent.getTextContent()

    container.style.width = '100px'

    let text2
    await wait(() => {
      text2 = renderedContent.getTextContent()
      expect(text1).to.not.equal(text2)
    })

    container.style.width = '400px'

    await wait(() => {
      expect(renderedContent.getTextContent()).to.not.equal(text2)
    })
  })

  it('should preserve node structure', async () => {
    const subject = await mount(
      <div style={{width: '200px'}}>
        <TruncateText>
          <p className="testClass">Hello world! <strong>This is a</strong> long string that <em>should truncate</em></p>
        </TruncateText>
      </div>
    )

    const renderedContent = within(subject.getDOMNode())
    const pQuery = await renderedContent.find({ tag: 'p' })

    expect(await pQuery.find({ tag: 'strong' })).to.exist()
    expect(await pQuery.find({ tag: 'em' })).to.exist()

    const p = pQuery.getDOMNode()
    expect(p.children.length).to.equal(3)
    expect(p.nodeName).to.equal('P')
    expect(p.className).to.equal('testClass')
  })

  it('should recalculate if props change', async () => {
    const subject = await mount(
      <div style={{width: '200px'}}>
        <TruncateText>{defaultText}</TruncateText>
      </div>
    )

    const renderedContent = within(subject.getDOMNode())
    const text = renderedContent.getTextContent()

    await subject.setProps({
      children: (
        <TruncateText position="middle" ellipsis="(...)">
          {defaultText}
        </TruncateText>
      )
    })

    await wait(() => {
      expect(renderedContent.getTextContent()).to.not.equal(text)
    })
  })

  it('should call onUpdate when text changes', async () => {
    const onUpdate = stub()

    let container
    await mount(
      <div style={{width: '700px'}} componentRef={(el) => { container = el }}>
        <TruncateText onUpdate={onUpdate}>{defaultText}</TruncateText>
      </div>
    )

    expect(onUpdate).to.not.have.been.called()

    container.style.width = '100px'
    await wait(() => {
      expect(onUpdate).to.have.been.calledWith(true)
    })

    container.style.width = '800px'
    await wait(() => {
      expect(onUpdate).to.have.been.calledWith(false)
    })
  })

  it('should warn if children prop receives too deep of a node tree', async () => {
    const warning = spy(console, 'warn')

    await mount(
      <div style={{width: '200px'}}>
        <TruncateText>
          Hello world! <strong><span>This is a</span></strong> long string that should truncate
        </TruncateText>
      </div>
    )

    expect(
      warning.lastCall.args[0].includes('Some children are too deep in the node tree and will not render.')
    ).to.be.true()
  })

  it('should render text at any size with no lineHeight set', async () => {
    let stage
    await mount(
      <div style={{width: '200px'}}>
        <span ref={(el) => { stage = el }}>
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
      </div>
    )

    expect(stage.textContent).to.equal('xsmallsmallmediumlargexlargexxlarge')
  })

  it('should meet a11y standards', async () => {
    const subject = await mount(
      <div style={{width: '200px'}}>
        <TruncateText>{defaultText}</TruncateText>
      </div>
    )
    const renderedContent = within(subject.getDOMNode())
    expect(await renderedContent.accessible()).to.be.true()
  })
})
