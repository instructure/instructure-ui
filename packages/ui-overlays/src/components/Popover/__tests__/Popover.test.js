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
import { expect, mount, spy, within, wait } from '@instructure/ui-test-utils'

import Popover, { PopoverTrigger, PopoverContent } from '../index'

import PopoverLocator from '../locator'

describe('<Popover />', async () => {
  it('should not render content by default', async () => {
    await mount(
      <Popover on="click">
        <PopoverTrigger>
          <button>Click Me</button>
        </PopoverTrigger>
        <PopoverContent>
          <h2>Foo Bar Baz</h2>
        </PopoverContent>
      </Popover>
    )

    const popover = await PopoverLocator.find(':label(Click Me)')
    const trigger = await popover.findTrigger()
    const content = await popover.findContent({ expectEmpty: true })

    expect(trigger.getTextContent()).to.equal('Click Me')
    expect(content).to.not.exist()
  })

  testShowContent('click', 'click')
  testShowContent('focus', 'focus')
  testShowContent('hover', 'mouseOver', { relatedTarget: document.documentElement })

  testEventHandler('onClick', 'click')
  testEventHandler('onFocus', 'focus')
  testEventHandler('onBlur', 'focus', 'blur')

  it('should close when clicked outside content by default', async () => {
    await mount(
      <Popover on="click">
        <PopoverTrigger>
          <button>Click Me</button>
        </PopoverTrigger>
        <PopoverContent>
          <h2>Foo Bar Baz</h2>
        </PopoverContent>
      </Popover>
    )

    const popover = await PopoverLocator.find(':label(Click Me)')
    const trigger = await popover.findTrigger()

    await trigger.click()

    let content = await popover.findContent()

    expect(content).to.exist()

    await within(trigger.getOwnerDocument().body)
      .click()

    content = await popover.findContent({ expectEmpty: true })

    expect(content).to.not.exist()
  })

  it('should close when trigger is clicked', async () => {
    await mount(
      <Popover on="click">
        <PopoverTrigger>
          <button>Click Me</button>
        </PopoverTrigger>
        <PopoverContent>
          <h2>Foo Bar Baz</h2>
        </PopoverContent>
      </Popover>
    )

    const popover = await PopoverLocator.find()
    const trigger = await popover.findTrigger()

    await trigger.click()
    await trigger.click()

    const content = await popover.findContent({ expectEmpty: true })

    expect(content).to.not.exist()
  })

  describe('controlled', async () => {
    it('should show content if defaultShow is true', async () => {
      await mount(
        <Popover on="click" defaultShow>
          <PopoverTrigger>
            <button>Click Me</button>
          </PopoverTrigger>
          <PopoverContent>
            <h2>Foo Bar Baz</h2>
          </PopoverContent>
        </Popover>
      )
      const popover = await PopoverLocator.find()
      const content = await popover.findContent()

      expect(content.getTextContent()).to.equal('Foo Bar Baz')
    })

    it('should support show prop', async () => {
      const onToggle = spy()
      const subject = await mount(
        <Popover on="click" show={false} onToggle={onToggle}>
          <PopoverTrigger>
            <button>Click Me</button>
          </PopoverTrigger>
          <PopoverContent>
            <h2>Foo Bar Baz</h2>
          </PopoverContent>
        </Popover>
      )
      const popover = await PopoverLocator.find()
      let content = await popover.findContent({ expectEmpty: true })

      expect(content).to.not.exist()

      await subject.setProps({ show: true })

      content = await popover.findContent()

      expect(content.getTextContent()).to.equal('Foo Bar Baz')
    })

    it('should call onToggle', async () => {
      const onToggle = spy()
      await mount(
        <Popover on="click" show={false} onToggle={onToggle}>
          <PopoverTrigger>
            <button>Click Me</button>
          </PopoverTrigger>
          <PopoverContent>
            <h2>Foo Bar Baz</h2>
          </PopoverContent>
        </Popover>
      )
      const popover = await PopoverLocator.find()
      const trigger = await popover.findTrigger()

      await trigger.click()

      expect(onToggle).to.have.been.calledWith(true)
    })

    it('should not show content on click', async () => {
      const onToggle = spy()
      await mount(
        <Popover on="click" show={false} onToggle={onToggle}>
          <PopoverTrigger>
            <button>Click Me</button>
          </PopoverTrigger>
          <PopoverContent>
            <h2>Foo Bar Baz</h2>
          </PopoverContent>
        </Popover>
      )
      const popover = await PopoverLocator.find()
      const trigger = await popover.findTrigger()

      await trigger.click()

      const content = await popover.findContent({ expectEmpty: true })

      expect(content).to.not.exist()
    })
  })
})

function testShowContent (on, eventType, eventInit) {
  it(`should show content on ${on}`, async () => {
    const onValue = [on, on === 'hover' ? 'focus' : null]
    await mount(
      <Popover on={onValue}>
        <PopoverTrigger>
          <button>Click Me</button>
        </PopoverTrigger>
        <PopoverContent>
          <h2>Foo Bar Baz</h2>
        </PopoverContent>
      </Popover>
    )

    const popover = await PopoverLocator.find()
    const trigger = await popover.findTrigger()

    await trigger[eventType](eventInit)

    const content = await popover.findContent()

    expect(content.getTextContent()).to.equal('Foo Bar Baz')
  })
}

function testEventHandler (handler, ...eventType) {
  it(`should fire ${handler} handler`, async () => {
    const handlerSpy = spy()
    const props = {
      [handler]: handlerSpy
    }
    await mount(
      <Popover {...props}>
        <PopoverTrigger>
          <button>Click Me</button>
        </PopoverTrigger>
        <PopoverContent>
          <h2>Foo Bar Baz</h2>
        </PopoverContent>
      </Popover>
    )

    const popover = await PopoverLocator.find()
    const trigger = await popover.findTrigger()

    eventType.forEach(async (type) => {
      await trigger[type]()
    })

    await wait(() => {
      expect(handlerSpy).to.have.been.calledOnce()
    })
  })
}
