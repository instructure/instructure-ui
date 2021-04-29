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
import { mount, expect, generateA11yTests } from '@instructure/ui-test-utils'

import { InlineSVG } from '../index'
import { InlineSVGLocator } from '../InlineSVGLocator'
import InlineSVGExamples from '../__examples__/InlineSVG.examples'

const SVG_SRC = `<svg><circle cx="50" cy="50" r="40" /></svg>`

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('<InlineSVG />', async () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should render', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<InlineSVG src={SVG_SRC} />)
    const svg = await InlineSVGLocator.find()

    expect(svg).to.exist()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should have role "presentation" when no title is provided', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<InlineSVG src={SVG_SRC} />)
    const svg = await InlineSVGLocator.find()

    expect(svg.getAttribute('role')).to.equal('presentation')
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should have role "img" when a title is provided', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<InlineSVG src={SVG_SRC} title="testIconTitle" />)
    const svg = await InlineSVGLocator.find()

    expect(svg.getAttribute('role')).to.equal('img')
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should add a group with a role "presentation', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<InlineSVG src={SVG_SRC} title="testIconTitle" />)
    const svg = await InlineSVGLocator.find()
    const group = await svg.find('g')

    expect(group.getAttribute('role')).to.equal('presentation')
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should not render title when no title prop is provided', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<InlineSVG src={SVG_SRC} />)

    const svg = await InlineSVGLocator.find()
    const title = await svg.find('title', { expectEmpty: true })

    expect(title).to.not.exist()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should render title when title prop is provided', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<InlineSVG src={SVG_SRC} title="Test Title" />)
    const svg = await InlineSVGLocator.find()
    const title = await svg.find(':withTitle(Test Title)')

    expect(title).to.exist()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should not render description when no description prop is provided', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<InlineSVG src={SVG_SRC} />)

    const svg = await InlineSVGLocator.find()
    const description = await svg.find('description', {
      expectEmpty: true
    })

    expect(description).to.not.exist()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should render description when description prop is provided', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<InlineSVG src={SVG_SRC} description="testIconDesc" />)

    const svg = await InlineSVGLocator.find()
    const description = await svg.find('desc')

    expect(description).to.exist()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should produce null for "labelledBy" when no title or desc are provided', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<InlineSVG src={SVG_SRC} />)
    const svg = await InlineSVGLocator.find()

    expect(svg.getAttribute('aria-labelledby')).to.not.exist()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should properly join ids when both title and desc attributes are provided', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <InlineSVG
        src={SVG_SRC}
        title="testIconTitle"
        description="testIconDescription"
      />
    )
    const svg = await InlineSVGLocator.find()
    const ids = svg.getAttribute('aria-labelledby').split(' ')

    expect(ids).to.have.length(2)
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should set custom width and height properly', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<InlineSVG src={SVG_SRC} width="100px" height="200px" />)
    const svg = await InlineSVGLocator.find()
    const width = svg.getComputedStyle().width
    const height = svg.getComputedStyle().height

    expect(width).to.equal('100px')
    expect(height).to.equal('200px')
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should not set width/height attributes and styles when value is auto', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<InlineSVG src={SVG_SRC} width="auto" height="auto" />)
    const svg = await InlineSVGLocator.find()

    expect(svg.getDOMNode()).to.have.style('width', '')
    expect(svg.getDOMNode()).to.have.style('height', '')
    expect(svg.getAttribute('width')).to.not.exist()
    expect(svg.getAttribute('height')).to.not.exist()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should set focusable to false by default', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<InlineSVG src={SVG_SRC} />)
    const svg = await InlineSVGLocator.find()

    expect(svg.getAttribute('focusable')).to.equal('false')
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should allow focusable to be overridden', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<InlineSVG src={SVG_SRC} focusable={true} />)
    const svg = await InlineSVGLocator.find()

    expect(svg.getAttribute('focusable')).to.equal('true')
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should display block when inline is false', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<InlineSVG src={SVG_SRC} inline={false} />)
    const svg = await InlineSVGLocator.find()

    expect(svg.getComputedStyle().getPropertyValue('display')).to.equal('block')
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should change the SVG color property', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<InlineSVG src={SVG_SRC} color="success" />)
    const successSvg = await InlineSVGLocator.find()
    const colorSuccess = successSvg.getComputedStyle().color

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<InlineSVG src={SVG_SRC} color="error" />)
    const errorSvg = await InlineSVGLocator.find()
    const colorError = errorSvg.getComputedStyle().color

    expect(colorError).to.not.equal(colorSuccess)
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should allow passing in the svg src as a string', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <InlineSVG src={`<svg><circle cx="50" cy="50" r="40" /></svg>`} />
    )
    const svg = await InlineSVGLocator.find()
    const group = await svg.find('g')

    expect(group.getDOMNode().innerHTML).to.equal(
      '<circle cx="50" cy="50" r="40"></circle>'
    )
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('with generated examples', async () => {
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ sectionProp: string; getCompon... Remove this comment to see the full error message
    generateA11yTests(InlineSVGExamples)
  })
})
