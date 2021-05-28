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
import { find, expect, mount, stub } from '@instructure/ui-test-utils'

import { Portal } from '../index'

describe(`<Portal />`, async () => {
  it('should render', async () => {
    await mount(<Portal open>Hello World</Portal>)
    const portal = await find(':contains(Hello World)')
    expect(portal.getDOMNode()).to.exist()
  })

  it('should be accessible', async () => {
    await mount(
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      <Portal open id="portal">
        Hello World
      </Portal>
    )
    const portal = await find('#portal')
    expect(await portal.accessible()).to.be.true()
  })

  it('should support onOpen prop', async () => {
    const onOpen = stub()
    await mount(
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      <Portal open onOpen={onOpen} id="portal">
        Hello World
      </Portal>
    )
    const portal = await find('#portal')
    expect(onOpen).to.have.been.calledWith(portal.getDOMNode())
  })

  it('should support onClose prop', async () => {
    const onClose = stub()

    const subject = await mount(
      <Portal onClose={onClose} open>
        Hello World
      </Portal>
    )

    expect(onClose).to.not.have.been.called()

    await subject.setProps({ open: false })

    expect(onClose).to.have.been.called()
  })

  it('should add a dir attribute to the root DOM node', async () => {
    const onOpen = stub()
    await mount(
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      <Portal open onOpen={onOpen} id="portal">
        Hello World
      </Portal>
    )
    const portal = await find('#portal')
    expect(portal.getAttribute('dir')).to.equal('ltr')
  })

  it('should not render if children are empty', async () => {
    // @ts-expect-error FIXME remove this line to see the error
    await mount(<Portal open id="portal" />)
    const portal = await find('#portal', { expectEmpty: true })
    expect(portal).to.not.exist()
  })

  describe('without a mountNode prop', () => {
    it('should render nothing when closed', async () => {
      await mount(<Portal>Hello World</Portal>)
      const portal = await find('#portal', { expectEmpty: true })
      expect(portal).to.not.exist()
    })

    it('should render children and have a node with a parent when open', async () => {
      const onKeyDown = stub()

      await mount(
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        <Portal open id="portal">
          <button onKeyDown={onKeyDown}>Hello World</button>
        </Portal>
      )

      const portal = await find('#portal')
      const button = await find('button:label(Hello World)')

      await button.keyDown('Enter')

      expect(onKeyDown).to.have.been.called()

      expect(portal.getParentNode()).to.equal(button.getOwnerDocument().body)
    })
  })

  describe('when a mountNode prop is provided', () => {
    it('should render nothing when closed', async () => {
      await mount(
        <div>
          <Portal
            mountNode={() => document.getElementById('portal-mount-node')}
            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            id="portal"
          >
            Hello World
          </Portal>
          <div id="portal-mount-node" />
        </div>
      )
      const portal = await find('#portal', { expectEmpty: true })

      expect(portal).to.not.exist()
    })

    it('should render children and have a node with a parent when open', async () => {
      const mountNode = document.createElement('div')
      mountNode.setAttribute('id', 'portal-mount-node')
      document.body.appendChild(mountNode)

      await mount(
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        <Portal open mountNode={mountNode} id="portal">
          Hello World
        </Portal>
      )

      const portal = await find('#portal')

      expect(portal).to.have.exactly(1).ancestors('#portal-mount-node')
    })
  })
})
