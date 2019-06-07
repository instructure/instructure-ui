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

import { expect, mount, within, wait } from '@instructure/ui-test-utils'
import { Flex } from '../index'

describe('<Flex />', async () => {
  it('should render Flex.Items as children', async () => {
    const subject = await mount(
      <Flex>
        <Flex.Item align="stretch">Flex item 1</Flex.Item>
        <Flex.Item grow shrink>Flex item 2</Flex.Item>
        <Flex.Item size="100px">Flex item 3</Flex.Item>
        <Flex.Item>Flex item 4</Flex.Item>
      </Flex>
    )

    expect(subject.getDOMNode().children.length).to.equal(4)
  })

  it('should render no markup if there are no children', async () => {
    const subject = await mount(
      <Flex></Flex>
    )

    expect(subject.getDOMNode()).to.not.exist()
  })

  it('should accept width and height as props', async () => {
    const subject = await mount(
      <Flex width="400px" height="200px">
        <Flex.Item align="stretch">Flex item 1</Flex.Item>
        <Flex.Item grow shrink>Flex item 2</Flex.Item>
        <Flex.Item size="100px">Flex item 3</Flex.Item>
        <Flex.Item>Flex item 4</Flex.Item>
      </Flex>
    )

    const flex = within(subject.getDOMNode())

    await wait(() => {
      expect(flex.getComputedStyle().width).to.equal('400px')
      expect(flex.getComputedStyle().height).to.equal('200px')
    })
  })

  it('should set flex-direction with the direction property', async () => {
    const subject = await mount(
      <Flex direction="column">
        <Flex.Item align="stretch">Flex item 1</Flex.Item>
        <Flex.Item grow shrink>Flex item 2</Flex.Item>
        <Flex.Item size="100px">Flex item 3</Flex.Item>
        <Flex.Item>Flex item 4</Flex.Item>
      </Flex>
    )

    const flex = within(subject.getDOMNode())

    await wait(() => {
      expect(flex.getComputedStyle()['flex-direction']).to.equal('column')
    })
  })

  it('should render an inline-flex container with the inline property', async () => {
    const subject = await mount(
      <Flex inline>
        <Flex.Item align="stretch">Flex item 1</Flex.Item>
        <Flex.Item grow shrink>Flex item 2</Flex.Item>
        <Flex.Item size="100px">Flex item 3</Flex.Item>
        <Flex.Item>Flex item 4</Flex.Item>
      </Flex>
    )

    const flex = within(subject.getDOMNode())

    await wait(() => {
      expect(flex.getComputedStyle().display).to.equal('inline-flex')
    })
  })

  it('should set align-items with the alignItems property', async () => {
    const subject = await mount(
      <Flex alignItems="start">
        <Flex.Item align="stretch">Flex item 1</Flex.Item>
        <Flex.Item grow shrink>Flex item 2</Flex.Item>
        <Flex.Item size="100px">Flex item 3</Flex.Item>
        <Flex.Item>Flex item 4</Flex.Item>
      </Flex>
    )
    const flex = within(subject.getDOMNode())

    await wait(() => {
      expect(flex.getComputedStyle()['align-items']).to.equal('flex-start')
    })
  })

  it('should set justify-content with the justifyItems property', async () => {
    const subject = await mount(
      <Flex justifyItems="space-between">
        <Flex.Item align="stretch">Flex item 1</Flex.Item>
        <Flex.Item grow shrink>Flex item 2</Flex.Item>
        <Flex.Item size="100px">Flex item 3</Flex.Item>
        <Flex.Item>Flex item 4</Flex.Item>
      </Flex>
    )

    const flex = within(subject.getDOMNode())

    await wait(() => {
      expect(flex.getComputedStyle()['justify-content']).to.equal('space-between')
    })
  })

  it('should set flex-wrap with the wrapItems property', async () => {
    const subject = await mount(
      <Flex wrapItems={true}>
        <Flex.Item align="stretch">Flex item 1</Flex.Item>
        <Flex.Item grow shrink>Flex item 2</Flex.Item>
        <Flex.Item size="100px">Flex item 3</Flex.Item>
        <Flex.Item>Flex item 4</Flex.Item>
      </Flex>
    )

    const flex = within(subject.getDOMNode())

    await wait(() => {
      expect(flex.getComputedStyle()['flex-wrap']).to.equal('wrap')
    })
  })

  it('should let Flex.Items align themselves with the align property', async () => {
    const subject = await mount(
      <Flex as="div" alignItems="end">
        <Flex.Item align="stretch">Flex item 1</Flex.Item>
        <Flex.Item grow shrink>Flex item 2</Flex.Item>
        <Flex.Item size="100px">Flex item 3</Flex.Item>
        <Flex.Item>Flex item 4</Flex.Item>
      </Flex>
    )

    const flex = within(subject.getDOMNode())
    const item = await flex.findWithText('Flex item 1')

    await wait(() => {
      expect(flex.getComputedStyle()['align-items']).to.equal('flex-end')
      expect(item.getComputedStyle()['align-self']).to.equal('stretch')
    })
  })

  it('should let Flex.Items flex-grow with the grow property', async () => {
    const subject = await mount(
      <Flex as="div">
        <Flex.Item align="stretch">Flex item 1</Flex.Item>
        <Flex.Item grow shrink>Flex item 2</Flex.Item>
        <Flex.Item size="100px">Flex item 3</Flex.Item>
        <Flex.Item>Flex item 4</Flex.Item>
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

  it('should let Flex.Items flex-shrink with the shrink property', async () => {
    const subject = await mount(
      <Flex as="div">
        <Flex.Item align="stretch">Flex item 1</Flex.Item>
        <Flex.Item grow shrink>Flex item 2</Flex.Item>
        <Flex.Item size="100px">Flex item 3</Flex.Item>
        <Flex.Item>Flex item 4</Flex.Item>
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

  it('should set flex-basis and min-width on Flex.Items with the size property', async () => {
    const subject = await mount(
      <Flex as="div">
        <Flex.Item align="stretch">Flex item 1</Flex.Item>
        <Flex.Item grow shrink>Flex item 2</Flex.Item>
        <Flex.Item size="100px">Flex item 3</Flex.Item>
        <Flex.Item>Flex item 4</Flex.Item>
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

  it('should meet a11y standards', async () => {
    const subject = await mount(
      <Flex>
        <Flex.Item align="stretch">Flex item 1</Flex.Item>
        <Flex.Item grow shrink>Flex item 2</Flex.Item>
        <Flex.Item size="100px">Flex item 3</Flex.Item>
        <Flex.Item>Flex item 4</Flex.Item>
      </Flex>
    )

    const flex = within(subject.getDOMNode())

    expect(await flex.accessible()).to.be.true()
  })
})
