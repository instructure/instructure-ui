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
import { expect, mount, stub } from '@instructure/ui-test-utils'

import Portal from '../index'
import PortalLocator from '../locator'

describe('<Portal />', async () => {
  it('should render', async () => {
    await mount(
      <Portal open>Hello World</Portal>
    )
    const portal = await PortalLocator.find(':contains(Hello World)')
    expect(portal.getDOMNode()).to.exist()
  })

  it('should be accessible', async () => {
    await mount(
      <Portal open>Hello World</Portal>
    )
    const portal = await PortalLocator.find(':contains(Hello World)')
    expect(await portal.accessible()).to.be.true()
  })

  it('should support onOpen prop', async () => {
    const onOpen = stub()
    await mount(
      <Portal open onOpen={onOpen}>
        Hello World
      </Portal>
    )
    const portal = await PortalLocator.find(':contains(Hello World)')
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
      <Portal open onOpen={onOpen}>
        Hello World
      </Portal>
    )
    const portal = await PortalLocator.find(':contains(Hello World)')
    expect(portal.getAttribute('dir')).to.equal('ltr')
  })

  it('should not render if children are empty', async () => {
    await mount(<Portal open />)
    const portal = await PortalLocator.findAll({ expectEmpty: true })
    expect(portal.length).to.equal(0)
  })

  describe('without a mountNode prop', () => {
    it('should render nothing when closed', async () => {
      await mount(
        <Portal>
          Hello World
        </Portal>
      )
      const portal = await PortalLocator.findAll({ expectEmpty: true })
      expect(portal.length).to.equal(0)
    })

    it('should render children and have a node with a parent when open', async () => {
      const onKeyDown = stub()
      await mount(
        <Portal open>
          <button onKeyDown={onKeyDown}>
            Hello World
          </button>
        </Portal>
      )

      const button = await PortalLocator.find('button:label(Hello World)')

      await button.keyDown('Enter')

      expect(onKeyDown).to.have.been.called()

      expect(button.getParentNode())
        .to.equal(document.body)
    })
  })

  describe('when a mountNode prop is provided', () => {
    it('should render nothing when closed', async () => {
      await mount(
        <div>
          <Portal
            mountNode={() => document.getElementById('portal-mount-node')}
          >
            Hello World
          </Portal>
          <div id="portal-mount-node" />
        </div>
      )
      const portal = await PortalLocator.find({ expectEmpty: true })

      expect(portal).to.not.exist()
    })

    it('should render children and have a node with a parent when open', async () => {
      await mount(
        <div>
          <Portal
            open
            mountNode={() => document.getElementById('portal-mount-node')}
          >
            Hello World
          </Portal>
          <div id="portal-mount-node" />
        </div>
      )

      const portal = await PortalLocator.find(':contains(Hello World)')

      expect(portal.getParentNode())
        .to.equal(document.getElementById('portal-mount-node'))
    })
  })
})
