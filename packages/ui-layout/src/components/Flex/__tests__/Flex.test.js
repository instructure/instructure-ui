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
import Flex, { FlexItem } from '../index'

describe('<Flex />', () => {
  const testbed = new Testbed(
    <Flex>
      <FlexItem align="stretch">Flex item 1</FlexItem>
      <FlexItem grow shrink>Flex item 2</FlexItem>
      <FlexItem size="100px">Flex item 3</FlexItem>
      <FlexItem>Flex item 4</FlexItem>
    </Flex>
  )

  it('should render FlexItems as children', () => {
    const subject = testbed.render()
    expect(subject.find(FlexItem).length).to.eq(4)
  })

  it('should render no markup if there are no children', () => {
    const subject = testbed.render({
      children: []
    })
    expect(subject.getDOMNode()).to.not.exist
  })

  it('should accept width and height as props', () => {
    const subject = testbed.render({
      width: '400px',
      height: '200px'
    })
    expect(subject.getComputedStyle().getPropertyValue('width')).to.contain('400')
    expect(subject.getComputedStyle().getPropertyValue('height')).to.contain('200')
  })

  it('should set flex-direction with the direction property', () => {
    const subject = testbed.render({
      direction: 'column'
    })
    expect(subject.getComputedStyle().getPropertyValue('flex-direction')).to.contain('column')
  })

  it('should render an inline-flex container with the inline property', () => {
    const subject = testbed.render({
      inline: true
    })
    expect(subject.getComputedStyle().getPropertyValue('display')).to.contain('inline-flex')
  })

  it('should set align-items with the alignItems property', () => {
    const subject = testbed.render({
      alignItems: 'start'
    })
    expect(subject.getComputedStyle().getPropertyValue('align-items')).to.contain('flex-start')
  })

  it('should set justify-content with the justifyItems property', () => {
    const subject = testbed.render({
      justifyItems: 'space-between'
    })
    expect(subject.getComputedStyle().getPropertyValue('justify-content')).to.contain('space-between')
  })

  it('should set flex-wrap with the wrapItems property', () => {
    const subject = testbed.render({
      wrapItems: true
    })
    expect(subject.getComputedStyle().getPropertyValue('flex-wrap')).to.contain('wrap')
  })

  it('should let FlexItems align themselves with the align property', () => {
    const subject = testbed.render({
      alignItems: 'end'
    })
    expect(subject.getComputedStyle().getPropertyValue('align-items')).to.contain('flex-end')
    const item = subject.childAt(0)
    expect(item.getComputedStyle().getPropertyValue('align-self')).to.contain('stretch')
  })

  it('should let FlexItems flex-grow with the grow property', () => {
    const subject = testbed.render()
    const item = subject.childAt(1)
    expect(item.getComputedStyle().getPropertyValue('flex-grow')).to.contain('1')
  })

  it('should let FlexItems flex-shrink with the shrink property', () => {
    const subject = testbed.render()
    const item = subject.childAt(1)
    expect(item.getComputedStyle().getPropertyValue('flex-shrink')).to.contain('1')
  })

  it('should set flex-basis and min-width on FlexItems with the size property', () => {
    const subject = testbed.render()
    const item = subject.childAt(2)
    expect(item.getComputedStyle().getPropertyValue('flex-basis')).to.contain('100')
    expect(item.getComputedStyle().getPropertyValue('min-width')).to.contain('100')
  })

  it('should meet a11y standards', (done) => {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: []
    })
  })
})
