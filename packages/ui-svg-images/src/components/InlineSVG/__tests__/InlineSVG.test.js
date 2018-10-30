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

const SVG_SRC = `<svg><circle cx="50" cy="50" r="40" /></svg>`

describe('<InlineSVG />', async () => {
  it('should render', async () => {
    await mount(
      <InlineSVG src={SVG_SRC} />
    )
    const svg = await InlineSVGFixture.find()

    expect(svg).to.exist()
  })

  it('should have role "presentation" when no title is provided', async () => {
    await mount(
      <InlineSVG src={SVG_SRC} />
    )
    const svg = await InlineSVGFixture.find()

    expect(svg.getAttribute('role')).to.equal('presentation')
  })

  it('should have role "img" when a title is provided', async () => {
    await mount(
      <InlineSVG
        src={SVG_SRC}
        title='testIconTitle'
      />
    )
    const svg = await InlineSVGFixture.find()

    expect(svg.getAttribute('role')).to.equal('img')
  })

  it('should add a group with a role "presentation', async () => {
    await mount(
      <InlineSVG
        src={SVG_SRC}
        title='testIconTitle'
      />
    )
    const svg = await InlineSVGFixture.find()
    const group = await svg.find('g')

    expect(group.getAttribute('role')).to.equal('presentation')
  })

  it('should not render title when no title prop is provided', async () => {
    await mount(
      <InlineSVG src={SVG_SRC} />
    )

    const svg = await InlineSVGFixture.find()
    const title = await svg.find({
      tag: 'title',
      expectEmpty: true,
      visible: false
    })

    expect(title).to.not.exist()
  })

  it('should render title when title prop is provided', async () => {
    await mount(
      <InlineSVG
        src={SVG_SRC}
        title='testIconTitle'
      />
    )
    const svg = await InlineSVGFixture.find()
    const title = await svg.find({
      title: 'testIconTitle',
      visible: false
    })

    expect(title).to.exist()
  })

  it('should not render description when no description prop is provided', async () => {
    await mount(
      <InlineSVG
        src={SVG_SRC}
      />
    )

    const svg = await InlineSVGFixture.find()
    const description = await svg.find({
      tag: 'description',
      expectEmpty: true,
      visible: false
    })

    expect(description).to.not.exist()
  })

  it('should render description when description prop is provided', async () => {
    await mount(
      <InlineSVG
        src={SVG_SRC}
        description='testIconDesc'
      />
    )

    const svg = await InlineSVGFixture.find()
    const description = await svg.find({
      tag: 'desc',
      visible: false
    })

    expect(description).to.exist()
  })

  it('should produce null for "labelledBy" when no title or desc are provided', async () => {
    await mount(
      <InlineSVG
        src={SVG_SRC}
      />
    )
    const svg = await InlineSVGFixture.find()

    expect(svg.getAttribute('aria-labelledby')).to.not.exist()
  })

  it('should properly join ids when both title and desc attributes are provided', async () => {
    await mount(
      <InlineSVG
        src={SVG_SRC}
        title='testIconTitle'
        description='testIconDescription'
      />
    )
    const svg = await InlineSVGFixture.find()
    const ids = svg.getAttribute('aria-labelledby').split(' ')

    expect(ids).to.have.length(2)
  })

  it('should set custom width and height properly', async () => {
    await mount(
      <InlineSVG
        src={SVG_SRC}
        width='100px'
        height='200px'
      />
    )
    const svg = await InlineSVGFixture.find()
    const width = svg.getComputedStyle().width
    const height = svg.getComputedStyle().height

    expect(width).to.equal('100px')
    expect(height).to.equal('200px')
  })

  it('should set focusable to false by default', async () => {
    await mount(
      <InlineSVG
        src={SVG_SRC}
      />
    )
    const svg = await InlineSVGFixture.find()

    expect(svg.getAttribute('focusable')).to.equal('false')
  })

  it('should allow focusable to be overridden', async () => {
    await mount(
      <InlineSVG
        src={SVG_SRC}
        focusable={true}
      />
    )
    const svg = await InlineSVGFixture.find()

    expect(svg.getAttribute('focusable')).to.equal('true')
  })

  it('should display block when inline is false', async () => {
    await mount(
      <InlineSVG
        src={SVG_SRC}
        inline={false}
      />
    )
    const svg = await InlineSVGFixture.find()

    expect(svg.getComputedStyle().getPropertyValue('display')).to.equal('block')
  })

  it('should change the SVG color property', async () => {
    await mount(
      <InlineSVG
        src={SVG_SRC}
        color='success'
      />
    )
    const svg = await InlineSVGFixture.find()

    expect(svg.hasClass(styles['color--success'])).to.be.true()
  })

  it('should allow passing in the svg src as a string', async () => {
    await mount(
      <InlineSVG src={`<svg><circle cx="50" cy="50" r="40" /></svg>`} />
    )
    const svg = await InlineSVGFixture.find()
    const group = await svg.find('g')

    expect(group.getDOMNode().innerHTML)
      .to.equal('<circle cx="50" cy="50" r="40"></circle>')
  })

  it('should meet a11y standards', async () => {
    await mount(
      <InlineSVG
        src={SVG_SRC}
      />
    )
    const svg = await InlineSVGFixture.find()
    expect(await svg.accessible()).to.be.true()
  })
})
