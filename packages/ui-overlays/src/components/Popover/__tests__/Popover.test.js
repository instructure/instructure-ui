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
import Button from '@instructure/ui-buttons/lib/components/Button'
import Heading from '@instructure/ui-elements/lib/components/Heading'
import Position from '@instructure/ui-layout/lib/components/Position'
import ContextView from '@instructure/ui-layout/lib/components/ContextView'
import View from '@instructure/ui-layout/lib/components/View'

import Popover, { PopoverTrigger, PopoverContent } from '../index'

describe('<Popover />', () => {
  let content

  const contentRef = (el) => {
    content = el
  }

  const testbed = new Testbed(
    <Popover on="click" contentRef={contentRef}>
      <PopoverTrigger>
        <Button>Click Me</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Heading>Foo Bar Baz</Heading>
      </PopoverContent>
    </Popover>
  )

  function testShowContent (on, eventType) {
    it(`should show content on ${on}`, () => {
      // If on is hover, also add focus to avoid warning
      const onValue = [on, on === 'hover' ? 'focus' : undefined]
      const subject = testbed.render({ on: onValue })
      const button = subject.find(Button)

      button.simulate(eventType)

      expect(content).to.not.be.null
    })
  }

  function testEventHandler (handler, ...eventType) {
    it(`should fire ${handler} handler`, () => {
      const spy = testbed.spy()
      const subject = testbed.render({ [handler]: spy })
      const button = subject.find(Button)

      eventType.forEach((type) => {
        button.simulate(type)
      })

      expect(spy).to.have.been.called
    })
  }

  beforeEach(() => {
    content = null
  })

  it('should not render content by default', () => {
    const subject = testbed.render()

    const button = subject.find(Button)

    expect(button.length).to.equal(1)
    expect(content).to.be.null
  })

  testShowContent('click', 'click')
  testShowContent('focus', 'focus')
  testShowContent('hover', 'mouseOver')

  testEventHandler('onClick', 'click')
  testEventHandler('onFocus', 'focus')
  testEventHandler('onBlur', 'focus', 'blur')

  it('should close when clicked outside content by default', () => {
    const subject = testbed.render()
    const button = subject.find(Button)
    button.simulate('click')

    testbed.tick()

    document.body.click()

    testbed.tick()

    expect(content).to.be.null
  })

  it('should close when trigger is clicked', () => {
    const subject = testbed.render()
    const button = subject.find(Button)

    button.simulate('click')
    button.simulate('click')

    expect(content).to.be.null
  })

  describe('controlled', () => {
    it('should show content if defaultShow is true', () => {
      testbed.render({defaultShow: true})

      expect(content).to.not.be.null
    })

    it('should support show prop', (done) => {
      const onToggle = testbed.spy()
      const subject = testbed.render({ show: false, onToggle })

      subject.setProps({ show: true }, () => {
        expect(content).to.not.be.null
        done()
      })
    })

    it('should call onToggle', () => {
      const onToggle = testbed.spy()
      const subject = testbed.render({ show: false, onToggle })
      const button = subject.find(Button)

      button.simulate('click')

      expect(onToggle).to.have.been.calledWith(true)
    })

    it('should not show content on click', () => {
      const onToggle = testbed.spy()
      const subject = testbed.render({ show: false, onToggle })
      const button = subject.find(Button)

      button.simulate('click')

      expect(content).to.be.null
    })
  })

  describe('withArrow', () => {
    it('should render a ContextView component when withArrow is true', () => {
      const subject = testbed.render({
        withArrow: true
      })

      const button = subject.find('button')
      button.simulate('click')

      testbed.tick()

      expect(subject.instance()._view instanceof ContextView).to.be.true
    })

    it('should render a View component when withArrow is false', () => {
      const subject = testbed.render({
        withArrow: false
      })

      const button = subject.find('button')
      button.simulate('click')

      testbed.tick()
      expect(subject.instance()._view instanceof View).to.be.true
    })
  })

  describe('alignArrow', () => {
    it('sets the offset when alignArrow is true, and placement is not center', () => {
      const subject = testbed.render({
        alignArrow: true,
        placement: 'bottom start',
        defaultShow: true
      })
      testbed.tick()
      const position = subject.find(Position)
      expect(position.prop('offsetX')).to.not.equal(0)
    })

    it('uses the passed offset when alignArrow is false', () => {
      const subject = testbed.render({
        placement: 'bottom start',
        defaultShow: true,
        offsetX: -1,
        offsetY: -2
      })
      testbed.tick()
      const position = subject.find(Position)
      expect(position.prop('offsetX')).to.equal(-1)
      expect(position.prop('offsetY')).to.equal(-2)
    })
  })
})
