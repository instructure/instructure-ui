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
import Portal from '@instructure/ui-portal/lib/components/Portal'
import Overlay from '../index'

describe('<Overlay />', () => {
  const testbed = new Testbed(<Overlay label="Overlay Testbed" />)

  it('should render nothing when closed', () => {
    const subject = testbed.render()
    const portal = subject.find(Portal).unwrap()
    expect(portal.node).to.equal(undefined) // eslint-disable-line no-undefined
  })

  it('should render children and have a node with a parent when open', () => {
    const subject = testbed.render({
      open: true
    })
    const node = subject.find(Portal).unwrap().node
    expect(node.parentNode).to.equal(document.body)
  })

  it('should use transition', () => {
    const onEnter = testbed.stub()
    const onEntering = testbed.stub()
    const onEntered = testbed.stub()
    testbed.render({
      open: true,
      transition: 'fade',
      onEnter,
      onEntering,
      onEntered
    })

    testbed.tick()

    expect(onEnter).to.have.been.called()

    testbed.tick()

    expect(onEntering).to.have.been.called()
    expect(onEntered).to.have.been.called()
  })

  it('should support onOpen prop', () => {
    const onOpen = testbed.stub()
    testbed.render({
      open: true,
      onOpen
    })

    testbed.tick()

    expect(onOpen).to.have.been.called()
  })

  it('should support onClose prop', done => {
    const onClose = testbed.stub()

    const subject = testbed.render({
      onClose,
      open: true
    })

    expect(onClose).to.not.have.been.called()

    subject.setProps({ open: false }, () => {
      expect(onClose).to.have.been.called()
      done()
    })
  })
})
