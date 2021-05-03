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

import { expect, mount, within, wait, stub } from '@instructure/ui-test-utils'
import { Flex } from '../index'

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('<Flex />', async () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should render Flex.Items as children', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const subject = await mount(
      // @ts-expect-error ts-migrate(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
      <Flex>
        <Flex.Item>Flex item 1</Flex.Item>
        <Flex.Item>Flex item 2</Flex.Item>
        <Flex.Item>Flex item 3</Flex.Item>
        <Flex.Item>Flex item 4</Flex.Item>
      </Flex>
    )

    expect(subject.getDOMNode().children.length).to.equal(4)
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should render other markup as children', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const subject = await mount(
      // @ts-expect-error ts-migrate(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
      <Flex>
        <div>foo</div>
        <div>bar</div>
        <div>baz</div>
      </Flex>
    )

    expect(subject.getDOMNode().children.length).to.equal(3)
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should render children when children is a function', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const subject = await mount(<Flex>{() => <div>hello world</div>}</Flex>)

    const flex = within(subject.getDOMNode())
    expect(await flex.findWithText('hello world')).to.exist()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should render no markup if there are no children', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const subject = await mount(<Flex></Flex>)

    expect(subject.getDOMNode()).to.not.exist()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should accept width and height as props', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const subject = await mount(
      // @ts-expect-error ts-migrate(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
      <Flex width="400px" height="200px">
        <Flex.Item>Flex item 1</Flex.Item>
        <Flex.Item>Flex item 2</Flex.Item>
        <Flex.Item>Flex item 3</Flex.Item>
        <Flex.Item>Flex item 4</Flex.Item>
      </Flex>
    )

    const flex = within(subject.getDOMNode())

    await wait(() => {
      expect(flex.getComputedStyle().width).to.equal('400px')
      expect(flex.getComputedStyle().height).to.equal('200px')
    })
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should set flex-direction with the direction property', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const subject = await mount(
      // @ts-expect-error ts-migrate(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
      <Flex direction="column">
        <Flex.Item>Flex item 1</Flex.Item>
        <Flex.Item>Flex item 2</Flex.Item>
      </Flex>
    )

    const flex = within(subject.getDOMNode())

    await wait(() => {
      expect(flex.getComputedStyle()['flex-direction']).to.equal('column')
    })
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should render an inline-flex container with the display property', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const subject = await mount(
      // @ts-expect-error ts-migrate(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
      <Flex display="inline-flex">
        <Flex.Item>Flex item 1</Flex.Item>
        <Flex.Item>Flex item 2</Flex.Item>
      </Flex>
    )

    const flex = within(subject.getDOMNode())

    await wait(() => {
      expect(flex.getComputedStyle().display).to.equal('inline-flex')
    })
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should set align-items with the alignItems property', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const subject = await mount(
      // @ts-expect-error ts-migrate(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
      <Flex alignItems="start">
        <Flex.Item>Flex item 1</Flex.Item>
        <Flex.Item>Flex item 2</Flex.Item>
      </Flex>
    )
    const flex = within(subject.getDOMNode())

    await wait(() => {
      expect(flex.getComputedStyle()['align-items']).to.equal('flex-start')
    })
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should set justify-content with the justifyItems property', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const subject = await mount(
      // @ts-expect-error ts-migrate(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
      <Flex justifyItems="space-between">
        <Flex.Item>Flex item 1</Flex.Item>
        <Flex.Item>Flex item 2</Flex.Item>
      </Flex>
    )

    const flex = within(subject.getDOMNode())

    await wait(() => {
      expect(flex.getComputedStyle()['justify-content']).to.equal(
        'space-between'
      )
    })
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should set flex-wrap with the wrap property', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const subject = await mount(
      // @ts-expect-error ts-migrate(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
      <Flex wrap="wrap">
        <Flex.Item>Flex item 1</Flex.Item>
        <Flex.Item>Flex item 2</Flex.Item>
      </Flex>
    )

    const flex = within(subject.getDOMNode())

    await wait(() => {
      expect(flex.getComputedStyle()['flex-wrap']).to.equal('wrap')
    })
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should let Flex.Items align themselves with the align property', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const subject = await mount(
      // @ts-expect-error ts-migrate(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
      <Flex alignItems="end">
        <Flex.Item align="stretch">Flex item 1</Flex.Item>
        <Flex.Item>Flex item 2</Flex.Item>
      </Flex>
    )

    const flex = within(subject.getDOMNode())
    const item = await flex.findWithText('Flex item 1')

    await wait(() => {
      expect(flex.getComputedStyle()['align-items']).to.equal('flex-end')
      expect(item.getComputedStyle()['align-self']).to.equal('stretch')
    })
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should let Flex.Items flex-grow with the shouldGrow property', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const subject = await mount(
      // @ts-expect-error ts-migrate(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
      <Flex>
        <Flex.Item>Flex item 1</Flex.Item>
        <Flex.Item shouldGrow>Flex item 2</Flex.Item>
      </Flex>
    )

    const flex = within(subject.getDOMNode())
    const item1 = await flex.findWithText('Flex item 1')
    const item2 = await flex.findWithText('Flex item 2')

    await wait(() => {
      expect(item1.getComputedStyle()['flex-grow']).to.equal('0')
      expect(item2.getComputedStyle()['flex-grow']).to.equal('1')
    })
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should let Flex.Items flex-shrink with the shouldShrink property', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const subject = await mount(
      // @ts-expect-error ts-migrate(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
      <Flex>
        <Flex.Item>Flex item 1</Flex.Item>
        <Flex.Item shouldShrink>Flex item 2</Flex.Item>
      </Flex>
    )

    const flex = within(subject.getDOMNode())
    const item1 = await flex.findWithText('Flex item 1')
    const item2 = await flex.findWithText('Flex item 2')

    await wait(() => {
      expect(item1.getComputedStyle()['flex-shrink']).to.equal('0')
      expect(item2.getComputedStyle()['flex-shrink']).to.equal('1')
    })
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should set flex-basis and min-width on Flex.Items with the size property', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const subject = await mount(
      // @ts-expect-error ts-migrate(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
      <Flex>
        <Flex.Item>Flex item 1</Flex.Item>
        <Flex.Item>Flex item 2</Flex.Item>
        <Flex.Item size="100px">Flex item 3</Flex.Item>
      </Flex>
    )

    const flex = within(subject.getDOMNode())
    const item2 = await flex.findWithText('Flex item 2')
    const item3 = await flex.findWithText('Flex item 3')

    await wait(() => {
      expect(item3.getComputedStyle()['flex-basis']).to.equal('100px')
      expect(item3.getComputedStyle()['min-width']).to.equal('100px')
      expect(item2.getComputedStyle()['flex-basis']).to.equal('auto')
    })
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should support an elementRef prop', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
    const elementRef = stub()
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const subject = await mount(
      <Flex elementRef={elementRef}>
        {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'Element' is not assignable to type 'null | u... Remove this comment to see the full error message */}
        <Flex.Item>Flex item</Flex.Item>
      </Flex>
    )

    await wait(() => {
      expect(elementRef).to.have.been.calledWith(subject.getDOMNode())
    })
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should meet a11y standards', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const subject = await mount(
      // @ts-expect-error ts-migrate(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
      <Flex>
        <Flex.Item>Flex item 1</Flex.Item>
        <Flex.Item>Flex item 2</Flex.Item>
      </Flex>
    )

    const flex = within(subject.getDOMNode())

    expect(await flex.accessible()).to.be.true()
  })
})
