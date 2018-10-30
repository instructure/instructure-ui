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
import { mount, expect, stub } from '@instructure/ui-test-utils'
import Billboard from '../index'
import BillboardFixture from '../fixture'

describe('<Billboard />', async () => {
  it('should render', async () => {
    await mount(
      <Billboard />
    )
    const billboard = await BillboardFixture.find()
    expect(billboard).to.exist()
  })

  it('should render a heading with the correct tag', async () => {
    await mount(
      <Billboard
        heading='Test heading'
        headingAs='h2'
      />
    )
    const billboard = await BillboardFixture.find()
    const heading = billboard.find({
      tag: 'h2',
      contains: 'Test heading',
    })
    expect(heading).to.exist()
  })

  it('renders as a link if it has an href prop', async () => {
    await mount (
      <Billboard
        href='#'
      />
    )
    const billboard = await BillboardFixture.find()
    const link = await billboard.find({
      tag: 'a'
    })
    expect(link.getAttribute('href')).equal('#')
  })

  it('renders as a button and responds to onClick event', async () => {
    const onClick = stub()
    await mount (
      <Billboard
        onClick={onClick}
      />
    )
    const billboard = await BillboardFixture.find()
    const button = await billboard.find({
      tag: 'button'
    })

    await button.click()

    expect(onClick).to.have.been.calledOnce()
  })

  describe('when disabled', async () => {
    it('should apply aria-disabled to link', async () => {
      await mount(
        <Billboard
          heading='I am disabled'
          href='#'
          disabled={true}
        />
      )
      const billboard = await BillboardFixture.find()
      const link = await billboard.find({
        tag: 'a'
      })

      expect(link.getAttribute('aria-disabled')).to.equal('true')
    })

    it('should not be clickable', async () => {
      const onClick = stub()
      await mount (
        <Billboard
          onClick={onClick}
          disabled
        />
      )
      const billboard = await BillboardFixture.find()
      const button = await billboard.find({
        tag: 'button'
      })

      await button.click()

      expect(onClick).to.not.have.been.called()
    })
  })

  describe('when readOnly', async () => {
    it('should apply aria-disabled', async () => {
      await mount(
        <Billboard
          heading='I am disabled'
          href='#'
          readOnly
        />
      )
      const billboard = await BillboardFixture.find()
      const link = await billboard.find({
        tag: 'a'
      })

      expect(link.getAttribute('aria-disabled')).to.equal('true')
    })

    it('should not be clickable', async () => {
      const onClick = stub()
      await mount (
        <Billboard
          onClick={onClick}
          readOnly
        />
      )
      const billboard = await BillboardFixture.find()
      const button = await billboard.find({
        tag: 'button'
      })

      const event = await button.click()

      expect(event.preventDefault).to.have.been.calledOnce()
      expect(onClick).to.not.have.been.called()
    })
  })

  describe('when passing down props to View', async () => {
    it('should support an elementRef prop', async () => {
      const elementRef = stub()
      await mount(
        <Billboard elementRef={elementRef} />
      )
      const billboard = await BillboardFixture.find()
      expect(elementRef).to.have.been.calledWith(billboard.getDOMNode())
    })
    it('should support an `as` prop', async () => {
      await mount(
        <Billboard as='div' />
      )
      const billboard = await BillboardFixture.find()
      expect(billboard.getTagName()).to.equal('div')
    })
  })

  it('should meet a11y standards', async () => {
    await mount(
      <Billboard
        heading='Test heading'
        headingAs='h2'
        message='this is what i am testing'
      />
    )
    const billboard = await BillboardFixture.find()
    expect(await billboard.accessible()).to.be.true()
  })
})
