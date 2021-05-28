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
import {
  expect,
  mount,
  spy,
  wait,
  wrapQueryResult
} from '@instructure/ui-test-utils'

import { Popover } from '../index'

import { PopoverLocator } from '../PopoverLocator'

describe('<Popover />', async () => {
  it('should not render content by default', async () => {
    await mount(
      <Popover on="click" renderTrigger={<button>Click Me</button>}>
        <h2>Foo Bar Baz</h2>
      </Popover>
    )

    const popover = await PopoverLocator.find(':label(Click Me)')
    const trigger = await popover.findTrigger()
    const content = await popover.findContent({ expectEmpty: true })

    expect(trigger.getTextContent()).to.equal('Click Me')
    expect(content).to.not.exist()
  })

  // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
  testShowContent('click', 'click')
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
  testShowContent('focus', 'focus')
  testShowContent('hover', 'mouseOver', {
    relatedTarget: document.documentElement
  })

  testEventHandler('onClick', 'click')
  testEventHandler('onFocus', 'focus')
  testEventHandler('onBlur', 'focus', 'blur')

  it('should hide content when clicked outside content by default', async () => {
    const onHideContent = spy()
    await mount(
      <Popover
        on="click"
        onHideContent={onHideContent}
        renderTrigger={<button>Click Me</button>}
      >
        <h2>Foo Bar Baz</h2>
        <button>focus me</button>
      </Popover>
    )

    const popover = await PopoverLocator.find(':label(Click Me)')
    const trigger = await popover.findTrigger()

    await trigger.click({
      target: trigger.getOwnerDocument().documentElement
    })

    let content = await popover.findContent()

    await wait(() => {
      expect(content.containsFocus()).to.be.true()
    })
    await (
      wrapQueryResult(trigger.getOwnerDocument().documentElement) as any
    ).click()

    content = await popover.findContent({ expectEmpty: true })

    expect(content).to.not.exist()
    expect((onHideContent.lastCall.args[1] as any).documentClick).to.be.true()
  })

  it('should hide content when trigger is clicked', async () => {
    const onHideContent = spy()
    await mount(
      <Popover
        on="click"
        onHideContent={onHideContent}
        shouldCloseOnDocumentClick={false}
        renderTrigger={<button>Click Me</button>}
      >
        <h2>Foo Bar Baz</h2>
      </Popover>
    )

    const popover = await PopoverLocator.find()
    const trigger = await popover.findTrigger()

    await trigger.click()
    await trigger.click()

    const content = await popover.findContent({ expectEmpty: true })

    expect(content).to.not.exist()
    expect((onHideContent.lastCall.args[1] as any).documentClick).to.be.false()
  })

  it('should show content if defaultIsShowingContent is true', async () => {
    await mount(
      <Popover
        on="click"
        defaultIsShowingContent
        renderTrigger={<button>Click Me</button>}
      >
        <h2>Foo Bar Baz</h2>
      </Popover>
    )
    const popover = await PopoverLocator.find()
    const content = await popover.findContent()

    expect(content.getTextContent()).to.equal('Foo Bar Baz')
  })

  describe('controlled', async () => {
    it('should show content by default if isShowingContent is true', async () => {
      await mount(
        <Popover
          on="click"
          isShowingContent={true}
          renderTrigger={<button>Click Me</button>}
        >
          <h2>Foo Bar Baz</h2>
        </Popover>
      )
      const popover = await PopoverLocator.find()
      const content = await popover.findContent()

      expect(content.getTextContent()).to.equal('Foo Bar Baz')
    })

    it('should not show content is isShowingContent prop is false', async () => {
      const subject = await mount(
        <Popover
          on="click"
          isShowingContent={false}
          renderTrigger={<button>Click Me</button>}
        >
          <h2>Foo Bar Baz</h2>
        </Popover>
      )
      const popover = await PopoverLocator.find()
      let content = await popover.findContent({ expectEmpty: true })

      expect(content).to.not.exist()

      await subject.setProps({ isShowingContent: true })

      content = await popover.findContent()

      expect(content.getTextContent()).to.equal('Foo Bar Baz')
    })

    it('should call onShowContent and onHideContent', async () => {
      const onShowContent = spy()
      const onHideContent = spy()

      const subject = await mount(
        <Popover
          on="click"
          isShowingContent={false}
          shouldCloseOnDocumentClick={false}
          onShowContent={onShowContent}
          onHideContent={onHideContent}
          renderTrigger={<button>Click Me</button>}
        >
          <h2>Foo Bar Baz</h2>
        </Popover>
      )
      const popover = await PopoverLocator.find()
      const trigger = await popover.findTrigger()

      await trigger.click()
      expect(onShowContent).to.have.been.calledOnce()

      await subject.setProps({ isShowingContent: true })

      await trigger.click()
      expect(
        (onHideContent.lastCall.args[1] as any).documentClick
      ).to.be.false()
    })

    it('should not show content on click', async () => {
      await mount(
        <Popover
          on="click"
          isShowingContent={false}
          renderTrigger={<button>Click Me</button>}
        >
          <h2>Foo Bar Baz</h2>
        </Popover>
      )
      const popover = await PopoverLocator.find()
      const trigger = await popover.findTrigger()

      await trigger.click()

      const content = await popover.findContent({ expectEmpty: true })

      expect(content).to.not.exist()
    })
  })

  describe('when shouldFocusContentOnTriggerBlur=true and shouldContainFocus=false', async () => {
    it('should move focus into the content when the trigger is blurred', async () => {
      const onHideContent = spy()

      await mount(
        <span>
          <button>focus me first</button>
          <Popover
            isShowingContent={true}
            onHideContent={onHideContent}
            renderTrigger={<button>focus me</button>}
            on={['hover', 'focus', 'click']}
            mountNode={() => document.getElementById('container')}
            shouldContainFocus={false}
            shouldReturnFocus={false}
            shouldFocusContentOnTriggerBlur
          >
            <button>focus me after trigger</button>
          </Popover>
          <span id="container" />
          <button id="next">focus me last</button>
        </span>
      )

      const popover = await PopoverLocator.find()
      const trigger = await popover.findTrigger()
      const content = await popover.findContent()
      const button = await content.find('button')

      await trigger.focus()
      await wait(() => {
        expect(content.containsFocus()).to.be.false()
        expect(trigger.focused()).to.be.true()
      })

      await trigger.keyDown('tab')
      await wait(() => {
        expect(trigger.focused()).to.be.false()
        expect(content.containsFocus()).to.be.true()
      })

      await button.keyDown('tab')
      expect(onHideContent).to.have.been.calledOnce()
    })
  })
})

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'on' implicitly has an 'any' type.
function testShowContent(on, eventType, eventInit) {
  it(`should show content on ${on}`, async () => {
    const onValue = [on, on === 'hover' ? 'focus' : null]
    await mount(
      <Popover on={onValue} renderTrigger={<button>Click me</button>}>
        <h2>Foo Bar Baz</h2>
      </Popover>
    )

    const popover = await PopoverLocator.find()
    const trigger = await popover.findTrigger()

    await trigger[eventType](eventInit)

    const content = await popover.findContent()

    expect(content.getTextContent()).to.equal('Foo Bar Baz')
  })
}

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'handler' implicitly has an 'any' type.
function testEventHandler(handler, ...eventType) {
  it(`should fire ${handler} handler`, async () => {
    const handlerSpy = spy()
    const props = {
      [handler]: handlerSpy
    }
    await mount(
      <Popover {...props} renderTrigger={<button>focus me</button>}>
        <h2>Foo Bar Baz</h2>
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
