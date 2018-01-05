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
import Portal from '../index'

describe('<Portal />', () => {
  describe('with or without yo...er a container', () => {
    const testbed = new Testbed(<Portal />)

    it('should support onOpen prop', () => {
      const onOpen = testbed.stub()
      testbed.render({
        open: true,
        children: (
          <ul>
            <li>Bono</li>
            <li>The Edge</li>
            <li>Adam Clayton</li>
            <li>Larry Mullen Jr.</li>
          </ul>
        ),
        onOpen
      })

      testbed.tick()

      expect(onOpen).to.have.been.called
    })

    it('should support onClose prop', (done) => {
      const onClose = testbed.stub()
      const subject = testbed.render({
        onClose,
        open: true,
        children: 'Hello World'
      })

      expect(onClose).to.not.have.been.called

      subject.setProps({ open: false }, () => {
        expect(onClose).to.have.been.called
        done()
      })
    })

    it('should not render if children are empty', () => {
      const subject = testbed.render({ open: true })
      const node = subject.instance().node

      expect(node).to.equal(undefined)
    })
  })

  describe('without a mountNode prop', () => {
    const testbed = new Testbed(<Portal />)

    it('should render nothing and have a node with no parent when closed', () => {
      const subject = testbed.render()
      const node = subject.instance().node

      expect(node).to.equal(undefined)
    })

    it('should render children and have a node with a parent when open', () => {
      const subject = testbed.render({
        open: true,
        children: 'Hello World'
      })
      const node = subject.instance().node

      expect(node.innerHTML).to.contain('Hello World')
      expect(node.nodeName.toUpperCase()).to.equal('SPAN')
      expect(node.parentNode).to.equal(document.body)
    })

    it('should render children elements', () => {
      const subject = testbed.render({
        open: true,
        children: <div>Foo Bar Baz</div>
      })
      const node = subject.instance().node

      expect(node.children.length).to.equal(1)
      expect(node.innerHTML).to.contain('Foo Bar Baz')
    })
  })

  describe('when a mountNode prop is provided', () => {
    const getMountNode = () => document.getElementById('portal-mount-node')
    const testbed = new Testbed(
      <div>
        <Portal
          open
          mountNode={getMountNode}
        >
          Greetings from the Portal
        </Portal>
        <div id="portal-mount-node" />
      </div>
    )

    it('should render into the mount node', () => {
      const subject = testbed.render().find(Portal)
      const node = subject.unwrap().node

      expect(node.parentNode).to.equal(document.getElementById('portal-mount-node'))
    })
  })
})
