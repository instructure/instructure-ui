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
import { mount, expect } from '@instructure/ui-test-utils'

import InlineSVG from '../index'
import InlineSVGFixture from '../fixture'

import styles from '../styles.css'

describe('<InlineSVG />', async () => {
  it('should render', async () => {
    await mount(
      <InlineSVG
        src={`<svg><path d="M962" stroke="none" strokeWidth="1" fillRule="evenodd" /></svg>`}
      />
    )
    const subject = await InlineSVGFixture.find()
    expect(subject).to.exist()
  })

  it('should have role "presentation" when no title is provided', async () => {
    await mount(
      <InlineSVG
        src={`<svg><path d="M962" stroke="none" strokeWidth="1" fillRule="evenodd" /></svg>`}
      />
    )
    const noTitle = await InlineSVGFixture.find({
      attribute: 'role'
    })
    expect(noTitle.getAttribute('role')).to.equal('presentation')
  })

  it('should have role "img" when a title is provided', async () => {
    await mount(
      <InlineSVG
        src={`<svg><path d="M962" stroke="none" strokeWidth="1" fillRule="evenodd" /></svg>`}
        title='testIconTitle'
      />
    )
    const title = await InlineSVGFixture.find({
      attribute: 'role'
    })
    expect(title.getAttribute('role')).to.equal('img')
  })

  it('should add a group with a role "presentation', async () => {
    await mount(
      <InlineSVG
        src={`<svg><path d="M962" stroke="none" strokeWidth="1" fillRule="evenodd" /></svg>`}
        title='testIconTitle'
      />
    )
    const group = await InlineSVGFixture.find({
      tag: 'g'
    })
    expect(group.getAttribute('role')).to.equal('presentation')
  })

  it('should not render title when no title prop is provided', async () => {
    await mount(
      <InlineSVG
        src={`<svg><path d="M962" stroke="none" strokeWidth="1" fillRule="evenodd" /></svg>`}
      />
    )

    const emptyTitle = await InlineSVGFixture.find({
      tag: 'title',
      expectEmpty: true,
      visible: false
    })
    expect(emptyTitle).to.not.exist()
  })

  it('should render title when title prop is provided', async () => {
    await mount(
      <InlineSVG
        src={`<svg><path d="M962" stroke="none" strokeWidth="1" fillRule="evenodd" /></svg>`}
        title='testIconTitle'
      />
    )
    const titles = await InlineSVGFixture.findAll({
      title: 'testIconTitle',
      visible: false
    })

    expect(titles).to.have.length(1)
  })

  it('should not render description when no description prop is provided', async () => {
    await mount(
      <InlineSVG
        src={`<svg><path d="M962" stroke="none" strokeWidth="1" fillRule="evenodd" /></svg>`}
      />
    )

    const emptyDescription = await InlineSVGFixture.find({
      tag: 'description',
      expectEmpty: true,
      visible: false
    })
    expect(emptyDescription).to.not.exist()
  })

  it('should render description when description prop is provided', async () => {
    await mount(
      <InlineSVG
        src={`<svg><path d="M962" stroke="none" strokeWidth="1" fillRule="evenodd" /></svg>`}
        description='testIconDesc'
      />
    )

    const description = await InlineSVGFixture.findAll({
      tag: 'desc',
      visible: false
    })
    expect(description).to.have.length(1)
  })

  it('should produce null for "labelledBy" when no title or desc are provided', async () => {
    await mount(
      <InlineSVG
        src={`<svg><path d="M962" stroke="none" strokeWidth="1" fillRule="evenodd" /></svg>`}
      />
    )
    const labelled = await InlineSVGFixture.find()
    expect(labelled.getAttribute('aria-labelledby')).to.not.exist()
  })

  it('should properly join ids when both title and desc attributes are provided', async () => {
    await mount(
      <InlineSVG
        src={`<svg><path d="M962" stroke="none" strokeWidth="1" fillRule="evenodd" /></svg>`}
        title='testIconTitle'
        description='testIconDescription'
      />
    )
    const subject = await InlineSVGFixture.find()
    const ids = subject.getAttribute('aria-labelledby').split(' ')

    expect(ids).to.have.length(2)
  })

  it('should set custom width and height properly', async () => {
    await mount(
      <InlineSVG
        src={`<svg><path d="M962" stroke="none" strokeWidth="1" fillRule="evenodd" /></svg>`}
        width='100px'
        height='200px'
      />
    )
    const subject = await InlineSVGFixture.find()
    const width = subject.getComputedStyle().width
    const height = subject.getComputedStyle().height

    expect(width).to.equal('100px')
    expect(height).to.equal('200px')
  })

  it('should set focusable to false by default', async () => {
    await mount(
      <InlineSVG
        src={`<svg><path d="M962" stroke="none" strokeWidth="1" fillRule="evenodd" /></svg>`}
      />
    )
    const focus = await InlineSVGFixture.find({
      attribute: 'focusable'
    })
    expect(focus.getAttribute('focusable')).to.equal('false')
  })

  it('should allow focusable to be overridden', async () => {
    await mount(
      <InlineSVG
        src={`<svg><path d="M962" stroke="none" strokeWidth="1" fillRule="evenodd" /></svg>`}
        focusable={true}
      />
    )
    const focus = await InlineSVGFixture.find({
      attribute: 'focusable'
    })
    expect(focus.getAttribute('focusable')).to.equal('true')
  })

  it('should display block when inline is false', async () => {
    await mount(
      <InlineSVG
        src={`<svg><path d="M962" stroke="none" strokeWidth="1" fillRule="evenodd" /></svg>`}
        inline={false}
      />
    )
    const block = await InlineSVGFixture.find({
      attribute: 'class'
    })
    expect(block.getComputedStyle().getPropertyValue('display')).to.equal('block')
  })

  it('should change the SVG color property', async () => {
    await mount(
      <InlineSVG
        src={`<svg><path d="M962" stroke="none" strokeWidth="1" fillRule="evenodd" /></svg>`}
        color='success'
      />
    )
    const color = await InlineSVGFixture.find()
    expect(color.hasClass(styles['color--success'])).to.be.true()
  })

  it('should allow passing in the svg src as a string', async () => {
    await mount(
      <InlineSVG
        src='<svg><path d="M962" stroke="none" strokeWidth="1" fillRule="evenodd" /></svg>'
      />
    )
    const subject = await InlineSVGFixture.find({
      tag: 'g'
    })
    expect(subject.getDOMNode().innerHTML).to.equal('<path d="M962" stroke="none" strokewidth="1" fillrule="evenodd"></path>')
  })

  it('should meet a11y standards', async () => {
    await mount(
      <InlineSVG
        src={`<svg><path d="M962" stroke="none" strokeWidth="1" fillRule="evenodd" /></svg>`}
      />
    )
    const subject = await InlineSVGFixture.find()
    expect(await subject.accessible()).to.be.true()
  })
})
