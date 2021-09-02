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
import { expect, mount, stub, wait } from '@instructure/ui-test-utils'

import { Overlay } from '../index'

import { OverlayLocator } from '../OverlayLocator'

describe('<Overlay />', async () => {
  it('should render nothing when closed', async () => {
    await mount(<Overlay label="Overlay Example" />)
    const overlay = await OverlayLocator.find({ expectEmpty: true })
    expect(overlay).to.not.exist()
  })

  it('should render children when open', async () => {
    await mount(
      <Overlay open label="Overlay Example">
        Hello World
      </Overlay>
    )
    const overlay = await OverlayLocator.find(':label(Overlay Example)')
    expect(overlay.getTextContent()).to.equal('Hello World')
  })

  it('should fire transition callback props', async () => {
    const onEnter = stub()

    const onEntering = stub()

    const onEntered = stub()
    await mount(
      <Overlay
        open
        transition="fade"
        label="Overlay Example"
        onEnter={onEnter}
        onEntering={onEntering}
        onEntered={onEntered}
      />
    )

    await wait(() => {
      expect(onEnter).to.have.been.calledOnce()
      expect(onEntering).to.have.been.calledOnce()
      expect(onEntered).to.have.been.calledOnce()
    })
  })

  it('should support onOpen prop', async () => {
    const onOpen = stub()
    await mount(<Overlay open label="Overlay Example" onOpen={onOpen} />)

    await wait(() => {
      expect(onOpen).to.have.been.calledOnce()
    })
  })

  it('should support onClose prop', async () => {
    const onClose = stub()

    const subject = await mount(
      <Overlay open label="Overlay Example" onClose={onClose} />
    )

    expect(onClose).to.not.have.been.called()

    await subject.setProps({ open: false })

    await wait(() => {
      expect(onClose).to.have.been.calledOnce()
    })
  })
})
