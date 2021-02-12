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
  stub,
  spy,
  wait,
  generateA11yTests
} from '@instructure/ui-test-utils'
import { Tooltip } from '../index'

import { TooltipLocator } from '../TooltipLocator'
import TooltipExamples from '../__examples__/Tooltip.examples'

describe('<Tooltip />', async () => {
  it('should render', async () => {
    await mount(
      <Tooltip renderTip="Hello">
        <a href="example.html">Hover or focus me</a>
      </Tooltip>
    )

    const tip = await TooltipLocator.find()

    expect(tip).to.exist()
  })

  it('should render children', async () => {
    await mount(
      <Tooltip renderTip="Hello">
        <a href="example.html">Hover or focus me</a>
      </Tooltip>
    )

    const tip = await TooltipLocator.find()
    const trigger = await tip.findTrigger()
    const content = await tip.findContent()

    expect(trigger).to.have.text('Hover or focus me')
    expect(content).to.have.text('Hello')
  })

  it('should render the tip offscreen', async () => {
    const subject = await mount(
      <Tooltip renderTip="Hello" isShowingContent>
        <a href="example.html">Hover or focus me</a>
      </Tooltip>
    )

    const tip = await TooltipLocator.find()
    let content = await tip.findContent()

    expect(content.getComputedStyle().display).to.equal('block')
    expect(content).to.have.text('Hello')

    await subject.setProps({ isShowingContent: false })
    content = await tip.findContent()

    expect(content.getComputedStyle().display).to.equal('none')
    expect(content).to.have.text('Hello')
  })

  it('should have an aria-describedby attribute', async () => {
    await mount(
      <Tooltip renderTip={<h2>Hello</h2>}>
        <a href="example.html">Hover or focus me</a>
      </Tooltip>
    )
    const tip = await TooltipLocator.find()
    const trigger = await tip.findTrigger()

    await trigger.focus()

    const content = await tip.findContent()

    await wait(() => {
      expect(content).to.contain(`#${trigger.getAttribute('aria-describedby')}`)
    })
  })

  it('should accept a function for renderTip', async () => {
    await mount(
      <Tooltip renderTip={() => 'Hello'}>
        <a href="example.html">Hover or focus me</a>
      </Tooltip>
    )

    const tip = await TooltipLocator.find()
    const content = await tip.findContent()

    expect(content).to.have.text('Hello')
  })

  it('should show tip by default when defaultIsShowingContent is true', async () => {
    await mount(
      <Tooltip renderTip="Hello" defaultIsShowingContent>
        <a href="example.html">Hover or focus me</a>
      </Tooltip>
    )

    const tip = await TooltipLocator.find()
    const content = await tip.findContent()

    expect(content).to.have.text('Hello')
  })

  describe('using as', async () => {
    it('should render children', async () => {
      await mount(
        <Tooltip
          renderTip={<h2>Hello</h2>}
          placement="end"
          as="a"
          href="example.html"
        >
          Hover or focus me
        </Tooltip>
      )

      const tip = await TooltipLocator.find()
      const trigger = await tip.findTrigger()

      const content = await tip.findContent()

      await wait(() => {
        expect(trigger).to.have.text('Hover or focus me')
        expect(content).to.have.text('Hello')
      })
    })

    it('should have an aria-describedby attribute', async () => {
      await mount(
        <Tooltip
          renderTip={<h2>Hello</h2>}
          placement="end"
          as="a"
          href="example.html"
        >
          Hover or focus me
        </Tooltip>
      )
      const tip = await TooltipLocator.find()
      const trigger = await tip.findTrigger()

      await trigger.focus()

      const content = await tip.findContent()

      await wait(() => {
        expect(content).to.contain(
          `#${trigger.getAttribute('aria-describedby')}`
        )
      })
    })

    it('should pass down the href attribute', async () => {
      await mount(
        <Tooltip
          renderTip={<h2>Hello</h2>}
          placement="end"
          as="a"
          href="example.html"
        >
          Hover or focus me
        </Tooltip>
      )
      const tip = await TooltipLocator.find()
      const link = await tip.find('a')

      expect(link.getAttribute('href')).to.equal('example.html')
    })
  })

  describe('when controlled', async () => {
    it('should show tip when isShowingContent is true', async () => {
      await mount(
        <Tooltip renderTip={<h2>Hello</h2>} isShowingContent>
          <a href="example.html">Hover or focus me</a>
        </Tooltip>
      )
      const tip = await TooltipLocator.find()
      const content = await tip.findContent()

      expect(content).to.exist()
    })

    it('should call onShowContent and on onHideContent', async () => {
      const onShowContent = spy()
      const onHideContent = spy()
      const subject = await mount(
        <Tooltip
          renderTip={<h2>Hello</h2>}
          isShowingContent={false}
          onShowContent={onShowContent}
          onHideContent={onHideContent}
        >
          <a href="example.html">Hover or focus me</a>
        </Tooltip>
      )
      const tip = await TooltipLocator.find()
      const trigger = await tip.findTrigger()

      await trigger.focus()
      await wait(() => {
        expect(onShowContent).to.have.been.calledOnce()
      })

      await subject.setProps({ isShowingContent: true })

      await trigger.mouseOut()
      await wait(() => {
        expect(onHideContent).to.have.been.calledOnce()
      })
    })
  })

  describe('using children', async () => {
    it('should call onClick of child', async () => {
      const onClick = spy()
      await mount(
        <Tooltip renderTip={<h2>Hello</h2>}>
          <button onClick={onClick}>Hover or focus me</button>
        </Tooltip>
      )

      const tip = await TooltipLocator.find()
      const button = await tip.find('button')

      await button.click()

      expect(onClick).to.have.been.calledOnce()
    })
  })

  describe('with generated examples', async () => {
    generateA11yTests(TooltipExamples)
  })
})
