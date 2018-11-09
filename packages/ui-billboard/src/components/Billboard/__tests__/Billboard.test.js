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
import { mount, expect, stub, within } from '@instructure/ui-test-utils'

import Billboard from '../index'

describe('<Billboard />', async () => {
  it('should render', async () => {
    const subject = await mount(
      <Billboard />
    )
    const billboard = within(subject.getDOMNode())
    expect(billboard).to.exist()
  })

  it('should render a heading with the correct tag', async () => {
    const subject = await mount(
      <Billboard
        heading='Test heading'
        headingAs='h2'
      />
    )
    const billboard = within(subject.getDOMNode())
    const heading = billboard.find({
      tag: 'h2',
      contains: 'Test heading',
    })
    expect(heading).to.exist()
  })

  it('renders as a link if it has an href prop', async () => {
    const subject = await mount (
      <Billboard
        href='#'
      />
    )
    const billboard = within(subject.getDOMNode())
    const link = await billboard.find({
      tag: 'a'
    })
    expect(link.getAttribute('href')).equal('#')
  })

  it('renders as a button and responds to onClick event', async () => {
    const onClick = stub()
    const subject = await mount (
      <Billboard
        onClick={onClick}
      />
    )
    const billboard = within(subject.getDOMNode())
    const button = await billboard.find({
      tag: 'button'
    })

    await button.click()

    expect(onClick).to.have.been.calledOnce()
  })

  describe('when disabled', async () => {
    it('should apply aria-disabled to link', async () => {
      const subject = await mount(
        <Billboard
          heading='I am disabled'
          href='#'
          disabled={true}
        />
      )
      const billboard = within(subject.getDOMNode())
      const link = await billboard.find({
        tag: 'a'
      })

      expect(link.getAttribute('aria-disabled')).to.equal('true')
    })

    it('should not be clickable', async () => {
      const onClick = stub()
      const subject = await mount (
        <Billboard
          onClick={onClick}
          disabled
        />
      )
      const billboard = within(subject.getDOMNode())

      expect(billboard.click()).to.eventually.throw()
      expect(onClick).to.not.have.been.called()
    })
  })

  describe('when readOnly', async () => {
    it('should apply aria-disabled', async () => {
      const subject = await mount(
        <Billboard
          heading='I am disabled'
          href='#'
          readOnly
        />
      )
      const billboard = within(subject.getDOMNode())
      const link = await billboard.find({
        tag: 'a'
      })

      expect(link.getAttribute('aria-disabled')).to.equal('true')
    })

    it('should not be clickable', async () => {
      const onClick = stub()
      const subject = await mount (
        <Billboard
          onClick={onClick}
          readOnly
        />
      )
      const billboard = within(subject.getDOMNode())

      const event = await billboard.click()

      expect(event.preventDefault).to.have.been.calledOnce()
      expect(onClick).to.not.have.been.called()
    })
  })

  describe('when passing down props to View', async () => {
    it('should support an elementRef prop', async () => {
      const elementRef = stub()
      const subject = await mount(
        <Billboard elementRef={elementRef} />
      )
      const billboard = within(subject.getDOMNode())
      expect(elementRef).to.have.been.calledWith(billboard.getDOMNode())
    })

    it('should support an `as` prop', async () => {
      const subject = await mount(
        <Billboard as='div' />
      )
      const billboard = within(subject.getDOMNode())
      expect(billboard.getTagName()).to.equal('div')
    })
  })

  it('should meet a11y standards', async () => {
    const subject = await mount(
      <Billboard
        heading='Test heading'
        headingAs='h2'
        message='this is what i am testing'
      />
    )
    const billboard = within(subject.getDOMNode())
    expect(await billboard.accessible()).to.be.true()
  })
})
