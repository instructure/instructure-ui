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
import Container from '@instructure/ui-container/lib/components/Container'
import IconX from '@instructure/ui-icons/lib/Solid/IconX'
import Tag from '../index'

describe('<Tag />', () => {
  const testbed = new Testbed(<Tag text="Summer" />)

  it('should render as a button and respond to onClick event', () => {
    const onClick = testbed.stub()
    const tag = testbed.render({onClick})
    tag.find('button').simulate('click')
    expect(onClick).to.have.been.called
  })

  it('should render a close icon when it is dismissible and clickable', () => {
    const onClick = testbed.stub()
    const tag = testbed.render({onClick, dismissible: true})
    const svg = tag.find(IconX)
    expect(svg.length).to.equal(1)
  })

  it('should not allow padding to be added as a propery', () => {
    const subject = testbed.render({
      padding: 'small medium large small'
    })
    expect(subject.find(Container).props().padding).to.not.exist
  })

  it('should meet a11y standards', (done) => {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: []
    })
  })
})
